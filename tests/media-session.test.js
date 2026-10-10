import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';
import { connectMediaSession } from '../src/media-session.js';

const source = readFileSync(new URL('../src/main.js', import.meta.url), 'utf8');

function createPlayer({ unsupported = [], browserOverrides = {} } = {}) {
  const audio = new EventTarget();
  Object.assign(audio, {
    paused: true, currentTime: 0, src: '',
    play() { this.paused = false; this.dispatchEvent(new Event('play')); return Promise.resolve(); },
    pause() { this.paused = true; this.dispatchEvent(new Event('pause')); },
  });
  const actions = new Map();
  const session = {
    setActionHandler(action, handler) {
      if (unsupported.includes(action)) throw new Error('Unsupported action');
      actions.set(action, handler);
    },
  };
  const browser = {
    navigator: { mediaSession: session },
    MediaMetadata: class { constructor(metadata) { Object.assign(this, metadata); } },
    ...browserOverrides,
  };
  const tracks = [
    { index: 0, title: 'Primera', group: 'Tuna', album: 'Disco', audio_url: 'first.mp3' },
    { index: 1, title: 'Externa', availability: 'external' },
    { index: 2, title: 'Segunda', group: 'Tuna', album: 'Disco', audio_url: 'second.mp3' },
    { index: 3, title: 'Sin audio', availability: 'missing' },
    { index: 4, title: 'Tercera', group: 'Tuna', album: 'Otro disco', audio_url: 'third.mp3' },
  ];
  const buttons = new Map(['#prev', '#next'].map(id => [id, { click() { this.onclick(); } }]));
  const context = vm.createContext({
    audio, tracks, selected: tracks[0], playbackQueue: [], playbackQueuePosition: -1,
    repeatMode: 'off', shuffleMode: false,
    document: { querySelector: id => buttons.get(id) },
    resolveAssetUrl: value => new URL(value, 'https://stunafy.example/').href,
    coverFor: () => 'cover.png',
    connectMediaSession: options => connectMediaSession(options, browser),
  });
  context.selectTrack = index => {
    context.selected = tracks[index];
    const position = context.playbackQueue.indexOf(index);
    if (position >= 0) context.playbackQueuePosition = position;
    audio.src = tracks[index].audio_url;
    audio.currentTime = 0;
    audio.play();
  };
  // Exercise the actual navigation functions and Media Session wiring from the app.
  for (const name of ['isPlayableIndex', 'clearPlaybackQueue', 'findPlayable', 'playNext']) {
    const line = source.split(/\r?\n/).find(line => line.startsWith(`function ${name}(`));
    assert.ok(line, `Missing player function: ${name}`);
    vm.runInContext(line, context);
  }
  for (const id of ['prev', 'next']) {
    const line = source.split(/\r?\n/).find(line => line.startsWith(`document.querySelector('#${id}').onclick=`));
    assert.ok(line, `Missing player control: ${id}`);
    vm.runInContext(line, context);
  }
  const wiring = source.match(/connectMediaSession\(\{[\s\S]*?\n\}\);/);
  assert.ok(wiring, 'Missing Media Session integration');
  vm.runInContext(wiring[0], context);
  return { audio, actions, session, context };
}

test('car next/previous controls skip unavailable tracks and update song metadata', () => {
  const { actions, context, session } = createPlayer();
  actions.get('nexttrack')();
  assert.equal(context.selected.index, 2);
  assert.equal(session.metadata.title, 'Segunda');
  assert.equal(session.metadata.artist, 'Tuna');
  assert.equal(session.metadata.album, 'Disco');
  assert.equal(session.metadata.artwork[0].src, 'https://stunafy.example/cover.png');
  actions.get('previoustrack')();
  assert.equal(context.selected.index, 0);
  assert.equal(session.metadata.title, 'Primera');
});

test('remote controls follow the favorites/playlist queue and stop at its end', () => {
  const { actions, context, audio } = createPlayer();
  Object.assign(context, { playbackQueue: [4, 0, 2], playbackQueuePosition: 1 });
  actions.get('previoustrack')();
  assert.equal(context.selected.index, 4);
  actions.get('nexttrack')();
  assert.equal(context.selected.index, 0);
  actions.get('nexttrack')();
  assert.equal(context.selected.index, 2);
  actions.get('nexttrack')();
  assert.equal(context.selected.index, 2);
  assert.equal(audio.paused, true);
});

test('previous preserves the existing restart behavior after three seconds', () => {
  const { actions, audio, context } = createPlayer();
  context.selectTrack(2);
  audio.currentTime = 12;
  actions.get('previoustrack')();
  assert.equal(context.selected.index, 2);
  assert.equal(audio.currentTime, 0);
  actions.get('previoustrack')();
  assert.equal(context.selected.index, 0);
});

test('remote next preserves repeat-track, repeat-album and shuffled queue behavior', () => {
  const { actions, context, audio } = createPlayer();
  context.selectTrack(2);
  context.repeatMode = 'track';
  audio.currentTime = 20;
  actions.get('nexttrack')();
  assert.equal(context.selected.index, 2);
  assert.equal(audio.currentTime, 0);
  Object.assign(context, { repeatMode: 'album', shuffleMode: true, playbackQueue: [2, 4, 0], playbackQueuePosition: 0 });
  actions.get('nexttrack')();
  assert.equal(context.selected.index, 4);
  actions.get('nexttrack')();
  assert.equal(context.selected.index, 0);
  actions.get('nexttrack')();
  assert.equal(context.selected.index, 2);
});

test('remote play/pause are explicit commands and synchronize playback state', () => {
  const { actions, audio, session, context } = createPlayer();
  actions.get('play')();
  assert.equal(context.selected.index, 0);
  assert.equal(audio.paused, false);
  assert.equal(session.playbackState, 'playing');
  actions.get('play')();
  assert.equal(audio.paused, false);
  actions.get('pause')();
  assert.equal(audio.paused, true);
  assert.equal(session.playbackState, 'paused');
  actions.get('pause')();
  assert.equal(audio.paused, true);
  actions.get('play')();
  assert.equal(session.playbackState, 'playing');
});

test('unsupported actions do not prevent the remaining controls from working', () => {
  const { actions, context } = createPlayer({ unsupported: ['pause', 'previoustrack'] });
  actions.get('nexttrack')();
  assert.equal(context.selected.index, 2);
  assert.equal(actions.has('play'), true);
});

test('browsers without Media Session preserve the normal player controls', () => {
  const { actions, context } = createPlayer({ browserOverrides: { navigator: {} } });
  assert.equal(actions.size, 0);
  vm.runInContext("document.querySelector('#next').click()", context);
  assert.equal(context.selected.index, 2);
});

test('missing or failing metadata support does not break song changes', () => {
  for (const MediaMetadata of [undefined, class { constructor() { throw new Error('Unsupported metadata'); } }]) {
    const { actions, context } = createPlayer({ browserOverrides: { MediaMetadata } });
    actions.get('nexttrack')();
    assert.equal(context.selected.index, 2);
  }
});

test('a rejected remote resume is handled without an unhandled promise rejection', async () => {
  const { actions, audio } = createPlayer();
  audio.src = 'first.mp3';
  audio.play = () => Promise.reject(new Error('Playback blocked'));
  actions.get('play')();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(audio.paused, true);
});
