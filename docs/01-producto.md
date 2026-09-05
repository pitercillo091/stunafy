# Producto y alcance

Estado: propuesta para revisión, salvo decisiones confirmadas en el README.

## Objetivo

Permitir descubrir una canción, elegir una interpretación y acceder a material musical que corresponda al arreglo seleccionado. Una persona podrá escuchar; otra podrá preparar esa misma obra para su instrumento sin confundir grabaciones ni partituras.

La unidad de experiencia es la ficha de canción del catálogo maestro. Reúne aportaciones de fuentes especializadas sin perder sus diferencias: letras alternativas, acordes de varios arreglos, partes numeradas, guías de ensayo, MIDI/MuseScore, álbumes y referencias históricas. El catálogo contempla España, Portugal y Latinoamérica; esa cobertura cultural no equivale a tener derechos de distribución mundial.

La investigación del [hilo de referencia](https://chatgpt.com/share/6a9c3582-0188-83eb-856c-772781f3a065) orienta el proyecto. Las cantidades de repertorio que allí se sugieren son potencial de investigación, no inventario de obras únicas ni compromiso de lanzamiento.

## Usuarios y permisos

| Perfil | Necesidad | Acceso propuesto |
|---|---|---|
| Visitante | Descubrir y escuchar | Catálogo publicado y recursos habilitados para visitantes |
| Usuario registrado | Conservar su biblioteca y estudiar | Favoritos, playlists, historial opcional y repertorios privados |
| Representante de agrupación | Mantener su perfil y aportar material | Solicitudes de cambios y aportaciones propias, sujetas a revisión |
| Editor | Corregir catálogo y vincular versiones | Revisión editorial; no concede derechos sin evidencia |
| Responsable de derechos | Evaluar permisos y retiradas | Decisiones documentadas por uso y recurso |
| Administrador | Operar el servicio | Roles, fuentes, incidencias y auditoría |

Una cuenta puede escuchar y tocar sin cambiar de perfil. El instrumento preferido es opcional. Los perfiles públicos de agrupaciones pueden existir antes de que una persona verificada los gestione; no se atribuye verificación automáticamente.

## Primera versión propuesta

Se busca una primera experiencia completa tanto de escucha como de estudio. El tamaño del catálogo dependerá de los permisos, sin un mínimo artificial de canciones públicas.

| Área | Comportamiento previsto |
|---|---|
| Catálogo | Obras, variantes de título, arreglos, grabaciones, álbumes y agrupaciones |
| Enriquecimiento | Varias letras/acordes conservados por procedencia; historia y origen cuando estén documentados; tutoriales y recursos externos identificados |
| Búsqueda | Título, alias, autores, agrupación e instrumento; filtros por idioma, género/categoría, región de agrupación y material disponible |
| Escucha | Audio autorizado, cola, pausa, avance y reproducción en segundo plano en Android |
| Biblioteca | Favoritos separados de obras y grabaciones; playlists de grabaciones; historial desactivable y borrable |
| Estudio | Letras y acordes estructurados, selector de arreglo y parte instrumental, visor PDF autorizado |
| Modo músico | Lectura amplia, transposición de acordes, autoscroll manual y conservación de ajustes personales |
| Actuaciones | Repertorios privados ordenados con arreglo, tono y notas por tema |
| Administración | Alta manual, importación a revisión, resolución de duplicados, evidencias y retirada de recursos |

La primera versión debe demostrar una ficha enriquecida desde varias procedencias, al menos dos grabaciones distinguibles y un arreglo con partes instrumentales. Es un criterio de aceptación con material autorizado o creado para pruebas, no una afirmación sobre contenido conseguido. Un registro válido puede contener solo referencias externas; no contará como audio reproducible dentro de Stunafy.

El audio interno sigue siendo necesario para validar la experiencia de escucha prevista. Si no se consigue material autorizado, se revisará expresamente el alcance del lanzamiento; no se presentará una biblioteca de enlaces como si cumpliera el reproductor prometido.

MIDI y MuseScore se catalogan como recursos desde el comienzo. Abrirlos externamente o descargarlos requiere permiso; su edición y reproducción integrada quedan para una fase posterior. Transponer acordes no transpone automáticamente un PDF ni la grabación.

## Evolución

| Fase | Resultado | Dependencia |
|---|---|---|
| Definición actual | Visión, modelo maestro y alcance inicial contrastados con el hilo | Revisión del promotor; hilo ya incorporado |
| Validación documental del catálogo | Muestra de fichas y relaciones, mapa priorizado de fuentes, duplicados y permisos | Revisión manual; sin importación ni código |
| Validación previa | Maquetas de detalle y pruebas acotadas de viabilidad | Modelo y alcance revisados; autorización posterior para programar pruebas |
| Primera versión | Escucha y estudio según alcance anterior | Catálogo de prueba autorizado y resultados de viabilidad |
| Herramientas y offline | Afinador, metrónomo, práctica MIDI por pistas/tempo, descargas autorizadas y sincronización robusta | Archivos aptos, permisos y validación de audio/micrófono |
| Comunidad y escritorio | Gestión de agrupaciones, repertorios compartidos, Windows | Moderación, permisos y demanda confirmada |

El modelo admite estas funciones futuras sin afirmar que estarán todas implementadas en el lanzamiento.

## Historias y aceptación

- **Descubrimiento:** al buscar un alias aprobado aparece la obra canónica; dos obras homónimas siguen separadas y muestran autoría o contexto suficiente.
- **Enriquecimiento:** si una fuente aporta una letra y otra aporta acordes, se conservan ambas procedencias. Solo se muestran juntos como material compatible tras verificar variante, estructura y arreglo.
- **Historia:** una fecha de publicación de una página no se muestra como fecha de composición. Una grabación antigua localizada no se etiqueta «primera grabación» sin evidencia suficiente.
- **Escucha:** al reproducir una grabación autorizada se identifica la agrupación y se conserva la cola al navegar. En Android se prueba pantalla bloqueada, auriculares, interrupciones y reconexión.
- **Versión correcta:** cambiar de grabación no asocia automáticamente una partitura de otro arreglo. Si se desconoce la correspondencia se indica expresamente.
- **Estudio:** cambiar el tono altera la vista personal de acordes; el original permanece recuperable. El bajo de un acorde invertido también se transpone.
- **Repertorio:** el músico guarda un arreglo concreto con tono y notas; una nueva revisión editorial se ofrece como actualización y no modifica silenciosamente su preparación.
- **Derechos:** un recurso sin permiso confirmado no se reproduce ni descarga aunque su URL sea conocida. El resto de la ficha puede seguir visible si está autorizado.
- **Biblioteca:** al retirar una grabación de una playlist se mantiene su posición como elemento no disponible, sin sustituirla por otra interpretación.

## Requisitos de calidad propuestos

Objetivos para validar con dispositivos y carga acordados, no resultados medidos: búsqueda p95 inferior a 500 ms en API; comienzo del audio p95 inferior a 3 s en la red de prueba; restauración de catálogo en menos de 4 h y pérdida máxima de 24 h de datos. Los objetivos no incluyen las latencias de servicios externos.

Todas las fichas publicadas deberán tener procedencia consultable. Todos los recursos servidos deberán tener una decisión vigente de permisos. El objetivo de accesibilidad será WCAG 2.2 AA para la experiencia aplicable, con comprobaciones manuales en Android y navegador.

La primera versión no dependerá de recomendaciones automáticas, pagos ni aportaciones públicas sin moderación. Su incorporación necesita una decisión de producto y costes.
