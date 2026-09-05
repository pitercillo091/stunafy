# Alineación con el hilo de referencia

Revisión 0.2 · 5 de septiembre de 2026.

Referencia principal: [Planificar APK musical](https://chatgpt.com/share/6a9c3582-0188-83eb-856c-772781f3a065). La consulta web inicial solo permitió obtener el título; posteriormente se leyó el contenido visible del enlace compartido mediante navegador. La síntesis se limita a esa copia: no presupone mensajes anteriores que no aparecen en ella.

## Síntesis del planteamiento

El hilo contiene dos investigaciones de fuentes y una propuesta para iniciar la definición del proyecto. Plantea una ficha maestra que reúna información musical procedente de varios sitios: letra, acordes, partes por instrumento, archivos musicales, tutoriales, historia y grabaciones de distintas agrupaciones.

Prioriza fuentes especializadas de España, Portugal y Latinoamérica. Distingue las fuentes fundamentales del catálogo, las complementarias y los servicios útiles para localizar grabaciones. Propone estudiar primero visión, modelo de datos y alcance mínimo, antes de desarrollar la aplicación. Diferencia referencias externas, integraciones oficiales y alojamiento autorizado.

La documentación 0.2 adopta esa orientación. El nombre vigente es **Stunafy**; «Aquí Está la Tuna» aparece en partes del hilo como denominación anterior y no se recupera como nombre del producto.

## Decisiones del usuario y sugerencias de ChatGPT

| Procedencia | Contenido | Tratamiento |
|---|---|---|
| Usuario en el hilo | Solicita una segunda investigación y limitarse de momento a ella | Confirma la secuencia de investigar antes de desarrollar; la solicitud actual autoriza revisar documentación |
| Usuario en el hilo | Pregunta cómo iniciar el proyecto en Work | Solicitud de orientación, sin elección de proveedor ni autorización de código |
| ChatGPT en el hilo | Mapa de fuentes, clasificación y posibles cantidades de repertorio | Base de investigación que debe verificarse |
| ChatGPT en el hilo | Ficha maestra, estructura de carpetas y propuesta de fases | Orientación adoptada con los ajustes documentados abajo |
| ChatGPT en el hilo | Redacta una instrucción de proyecto con Flutter y funcionalidades futuras | Sus requisitos pasan a ser instrucciones del usuario al reutilizarlos en esta conversación; no por estar escritos por ChatGPT |
| Usuario en esta conversación | Android y web primero, Windows después; oyentes y músicos con igual peso | Decisiones confirmadas que prevalecen sobre énfasis o ambigüedades del hilo |
| Usuario en la solicitud actual | Usar el hilo como referencia principal y verificar afirmaciones | Autoriza esta revisión documental, sin código, importación, contratación ni publicación |

El hilo no establece un presupuesto, licencias obtenidas, un catálogo deduplicado ni un stack cerrado. Supabase, PostgreSQL y FastAPI proceden de la propuesta técnica local y siguen abiertos a revisión.

## Comparación y cambios aplicados

| Tema | Documentación 0.1 | Orientación del hilo | Resultado en 0.2 |
|---|---|---|---|
| Centro del producto | Escucha y estudio, con énfasis inicial en arquitectura | Catálogo maestro enriquecido como primer trabajo | Visión, modelo maestro y alcance inicial encabezan la secuencia |
| Canción y versiones | Obra, arreglo, grabación y archivo separados | Ficha única con materiales y versiones | Se mantiene la separación interna y se explicita la ficha agregada para el usuario |
| Letras/acordes | Recursos y procedencias, poco visibles como alternativas | Varias fuentes para completar materiales | Selección de variantes y revisión de compatibilidad antes de combinarlas |
| Historia y procedencia cultural | Principalmente notas y trazabilidad | Historia, género, origen y fechas musicales | Entidades de clasificación, asociaciones culturales y acontecimientos con evidencia |
| Partes y aprendizaje | Partes, PDF y MIDI/MuseScore | Partes numeradas, guías, tutoriales y otros formatos | Material didáctico y formatos extensibles; práctica MIDI por pistas en fase futura |
| Fuentes | 17 fuentes, varias sin URL precisa | Mapa más amplio y fuentes especializadas | 33 candidatos registrados; fundamentales, complementarias y grabaciones externas |
| Prioridad de investigación | Aportación directa primero | Cruce entre fuentes especializadas | Prioridad del catálogo múltiple; aportación directa como vía complementaria de permisos |
| Reproducción externa | Enlaces al principio, audio propio autorizado | Enlazar, integrar o alojar según proceda | Ofertas de acceso y capacidades por proveedor; integración oficial pendiente de validación |
| Cruce automático | Revisión humana e idempotencia | Detectar canciones nuevas y completar datos automáticamente | Automatizar candidatos y cobertura; conservar revisión de fusiones y conflictos |
| Diseño | Navegación y paleta propuestas | Modelo maestro antes de diseño detallado | Paleta opcional; ficha musical, versiones, partes e historia antes de maquetas definitivas |
| Primera versión | Amplia propuesta de escucha y estudio | Definir MVP después de la visión/modelo | Se conserva como propuesta, con aceptación explícita de enriquecimiento y contenido autorizado |

## Verificaciones que afectan al diseño

**Tuna UCN:** se confirma la estructura instrumental en [Venecia sin ti](https://tunaucn.wixsite.com/tunaucn/venecia-sin-ti). La otra [ruta citada](https://tunaucn.wixsite.com/tunaucn/reina-del-tamarugal) presenta una discrepancia entre dirección/título de página y encabezado del contenido. No se resuelve atribuyendo los archivos a una canción por conjetura. Es un caso de revisión obligatoria para el importador. No se han descargado ni validado los adjuntos.

**TunaEspaña:** se recalculó la suma de los contadores visibles A–Z del [índice](https://www.tunaespana.es/?cat=406): 4.959. Se confirma la suma observada, no el número de obras únicas, la integridad del catálogo ni su reutilización. Stunafy medirá entradas, obras, grabaciones y recursos por separado.

**Repertunas:** el [repertorio](https://repertunas.pt/repertorio/) permite comprobar filtros; [Rastos de Sabor](https://repertunas.pt/musica/rastos-de-sabor/) muestra tono, texto/acordes y referencia audiovisual. Esto respalda estudiar clasificación y presentación de materiales. No demuestra permiso de importación.

**Medicina Murcia:** la [discografía](https://www.murcia.com/tunamedicina/discografia.asp) aporta estructura de álbum, títulos y créditos y anuncia escucha/letras. La disponibilidad real de archivos y permisos sigue pendiente; la clasificación anterior de «solo identidad verificada» se actualiza.

**Bandurriator:** la [ficha citada](https://bandurriator.com/node/368) está descrita en un resultado indexado de la propia fuente con PDF, tablatura, Encore y MIDI. La apertura directa mostró una verificación de acceso. Se distinguen evidencia indexada y comprobación actual de los archivos.

**Salafranca:** el [archivo](https://jidumicodi.jimdofree.com/) declara 772 partituras con fecha de actualización de noviembre de 2024. Es una cifra declarada por el sitio, no un recuento realizado aquí. Se incorpora como candidato diferenciado de Pulso y Púa Digital.

**Pulso y Púa Digital y Valladolid:** el hilo permite recuperar [canal](https://www.youtube.com/channel/UCS8z_CCxM4ItQtTS_ivWzhw) y [PDF](https://tunaderecho.com/wp-content/uploads/2015/12/CANCIONERO-TUNA-DE-DERECHO.pdf) exactos. No se pudieron verificar sus contenidos en la consulta actual. Ya no es necesario pedir al promotor que identifique las URL; sí queda pendiente verificar acceso y material.

**Spotify:** la posibilidad sugerida de descubrir agrupaciones mediante artistas relacionados no puede darse por disponible en una API nueva. El [anuncio oficial de cambios](https://developer.spotify.com/blog/2024-11-27-changes-to-the-web-api) restringe Related Artists para nuevos casos de uso. El catálogo no dependerá de esa función.

Las limitaciones de integración y offline se contrastaron con las políticas oficiales de [Spotify](https://developer.spotify.com/policy), [YouTube](https://developers.google.com/youtube/terms/developer-policies) y [SoundCloud](https://developers.soundcloud.com/docs/api/terms-of-use). Se mantienen las decisiones por recurso y por vía de acceso descritas en el documento de derechos.

## Ajustes técnicos que conviene mantener

- Un único campo de tono en la canción no basta: el arreglo, la grabación y la práctica pueden diferir.
- Una única midi_url no describe varias ediciones, procedencias, pistas y permisos. Se utilizan recursos y ofertas de acceso.
- Una letra de una fuente y unos acordes de otra no son compatibles automáticamente por compartir título.
- Un enlace a Spotify o YouTube identifica una publicación externa; no habilita su audio en la cola propia ni el modo offline.
- Miles de entradas sugieren potencial de crecimiento, pero la viabilidad del catálogo depende de identidad, permisos, coste y revisión editorial.

Estos ajustes mantienen la idea del hilo y evitan convertir ejemplos simplificados en restricciones del sistema.

## Alcance y siguiente decisión

La revisión conserva la primera versión propuesta de escucha y estudio, Android/web e igual prioridad para ambos públicos. El alcance musical gana variantes, referencias didácticas, clasificación y contexto histórico cuando existan. MIDI por pistas, herramientas de ensayo, offline y Windows siguen en evolución posterior.

La próxima decisión de producto es revisar la ficha maestra y el tamaño funcional de esa primera versión. Siguen pendientes presupuesto, responsable, territorios, monetización y contenido autorizado. La revisión del hilo está completada; la aprobación del alcance y la viabilidad de las fuentes no se dan por concluidas.
