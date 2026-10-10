// Connect the existing player to phone, headset and car media controls.
export function connectMediaSession({ audio, resume, previous, next, getMetadata }, browser = globalThis) {
  const session = browser.navigator?.mediaSession;
  if (!session?.setActionHandler) return;

  const handlers = {
    play: () => { Promise.resolve(resume()).catch(() => {}); },
    pause: () => audio.pause(),
    previoustrack: previous,
    nexttrack: next,
  };
  function registerHandlers() {
    for (const [action, handler] of Object.entries(handlers)) {
      // A browser may support Media Session but only some of its actions.
      try { session.setActionHandler(action, handler); } catch {}
    }
  }
  function updateMetadata() {
    if (!browser.MediaMetadata) return;
    try { session.metadata = new browser.MediaMetadata(getMetadata()); } catch {}
  }
  function updatePlaybackState() {
    try { session.playbackState = audio.paused ? 'paused' : 'playing'; } catch {}
  }

  registerHandlers();
  audio.addEventListener('play', () => {
    registerHandlers();
    updateMetadata();
    updatePlaybackState();
  });
  audio.addEventListener('loadedmetadata', updateMetadata);
  audio.addEventListener('pause', updatePlaybackState);
  audio.addEventListener('ended', updatePlaybackState);
}
