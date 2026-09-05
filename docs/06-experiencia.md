# Experiencia y diseño de Stunafy

Propuesta funcional de pantallas, acompañada ahora por [maquetas visuales v1](../design/v1/README.md). Son imágenes de diseño pendientes de aprobación, no una aplicación implementada.

La referencia del [hilo compartido](https://chatgpt.com/share/6a9c3582-0188-83eb-856c-772781f3a065) es una ficha musical que agrupa materiales y versiones. El promotor ha indicado posteriormente comenzar por el diseño visual: se adelantan logo y pantalla de escucha, conservando el modelo como contexto. Las decisiones técnicas y el alcance funcional no quedan aprobados por estas maquetas.

## Identidad

Una biblioteca musical contemporánea que reconozca los instrumentos y las agrupaciones. La exploración v1 propone fondo #101413, superficies #171B19 y jade #38D9A9 para la interfaz principal; los logos exploran también cobre y marfil. El rosetón instrumental se fusiona con ondas musicales. La paleta anterior de azul tinta/cobre queda como antecedente, sustituida provisionalmente por esta exploración. Se comprobará el contraste de los componentes implementados antes de aprobarlos.

Portadas y fotografías solo con derechos suficientes. Para fichas sin imagen, composición tipográfica propia con nombre e instrumento; evitar escudos inventados o portadas que sugieran material oficial. El logotipo y la disponibilidad de la marca Stunafy quedan pendientes de estudio.

## Navegación

En móvil: Inicio, Buscar, Biblioteca y Tocar. El mini reproductor se sitúa sobre la navegación. Inicio concede espacios equivalentes a descubrir música y retomar estudio. No exige declarar si se es oyente o músico.

En web: navegación lateral, contenido central y panel de cola/estudio cuando haya anchura. Los enlaces a obras, arreglos y grabaciones son estables. Atrás/adelante del navegador conserva navegación y no reinicia el reproductor.

## Pantallas y acciones

| Pantalla | Contenido y acciones principales |
|---|---|
| Inicio | Descubrir agrupaciones, álbumes y obras; continuar escuchando o preparar un repertorio |
| Buscar | Consulta, filtros y resultados separados por obras, grabaciones, álbumes y agrupaciones |
| Obra | Título, créditos, otras denominaciones; Escuchar y Tocar con igual jerarquía; letras alternativas, tutoriales e historia con fuentes |
| Grabación | Agrupación, álbum, fecha si se conoce, reproductor y material compatible verificado |
| Arreglo | Instrumentación, tono, arreglista, revisión; letra, acordes y partes disponibles |
| Modo músico | Documento, selector de parte, tamaño, tono, cejilla y autoscroll; herramientas plegadas |
| Biblioteca | Favoritos, playlists, repertorios e historial con controles de privacidad |
| Agrupación | Perfil, ubicación general, grabaciones y álbumes; verificación visible cuando corresponda |
| Repertorio | Lista ordenada, tono y arreglo por tema; notas y avance al siguiente |
| Fuentes y créditos | Procedencia de los datos, responsables conocidos, atribuciones y acción para comunicar un error |

«Tocar» distingue letras, acordes, partituras, partes numeradas y archivos editables. «Aprender» ofrece guías y tutoriales relacionados, indicando instrumento y compatibilidad. «Historia» presenta texto editorial con evidencia y fechas bien identificadas; puede no existir para muchas obras sin impedir el resto de la experiencia.

Cada material muestra su fuente y variante. Se puede consultar una letra vinculada solo a la obra sin elegir un arreglo ficticio. Para ensayar con partes se selecciona el arreglo; materiales cuya correspondencia se desconoce aparecen como alternativas de la obra, no como acompañamiento confirmado de la grabación actual.

## Esquema de ficha de obra

```text
Atrás                   Stunafy                 Favorito

Título de la obra
Autoría conocida · otros títulos

ESCUCHAR                              TOCAR
Grabaciones disponibles               Arreglos disponibles
Agrupación · álbum · duración         Instrumentos · arreglista
Reproducir / Abrir en servicio        Abrir material

Fuentes y créditos                    Comunicar un error

Letras y acordes alternativos · partes por instrumento
Aprender: guías y tutoriales · Historia y discografía

Mini reproductor: grabación actual · pausa · cola
Inicio        Buscar        Biblioteca        Tocar
```

El botón «Reproducir» aparece cuando Stunafy puede servir ese audio. Un enlace a una plataforma dice «Abrir en YouTube», «Abrir en Spotify» o equivalente. No se mezcla un enlace externo con una pista reproducible en la cola interna.

Materiales alojados y referencias externas comparten ficha, con acciones claras: «Ver partitura», «Consultar en origen» o «Comprar en el proveedor» cuando corresponda. La presencia de una referencia no activa descarga u offline. Las integraciones oficiales futuras respetarán sus reproductores y capacidades específicas.

## Recorrido de escucha

Buscar → obra → elegir grabación → reproducir → guardar o añadir a playlist. Si solo existe una grabación autorizada, se ofrece reproducción directa indicando cuál es. Nunca elegir silenciosamente una grabación distinta cuando falla la seleccionada.

## Recorrido musical

Buscar → obra → elegir arreglo → seleccionar instrumento/parte → ajustar lectura → guardar en repertorio. Si el usuario entra desde una grabación cuya relación con el arreglo no está verificada, ve «No tenemos material confirmado para esta grabación» y puede explorar otros arreglos.

Cambiar de instrumento mantiene el arreglo si existe esa parte; no lo sustituye por otro. Se muestra «Parte no disponible» y la opción de volver al conjunto de materiales.

## Herramientas

Transposición: distancia en semitonos, notación latina/anglosajona, bemoles/sostenidos según contexto y bajo de acordes invertidos. Separar tono sonoro de posiciones con cejilla. Conservar acordes no reconocidos y avisar que no se han transpuesto; no inventar equivalencias.

Autoscroll: control de velocidad, pausa táctil/teclado y posición recuperable. La sincronización con audio solo aparece si existe un mapa temporal validado para esa grabación y revisión del texto.

Partituras: zoom, página, orientación y selector de parte. Un PDF no ofrece transposición de notas por el mero hecho de tener acordes transponibles.

Afinador futuro: solicitar micrófono al activarlo, procesar localmente como propuesta y no conservar audio; escoger instrumento y afinación. Metrónomo futuro: tempo, compás, acento y control de volumen; validar estabilidad temporal y convivencia con el reproductor.

## Estados y accesibilidad

Diseñar carga, sin resultados, recurso ausente, recurso retirado, permiso territorial, enlace externo caído, sesión caducada y sin conexión. Distinguir «no existe material» de «material temporalmente no disponible».

Lectura con tamaño ajustable, foco visible, teclado en web y etiquetas para lector de pantalla. Controles musicales utilizables sin depender solo del color. Movimiento reducido y autoscroll siempre cancelable. El modo de actuación puede mantener pantalla encendida con activación explícita y salida clara.

## Validación de diseño pendiente

Propuesta: probar los recorridos con cuatro oyentes y cuatro músicos, incluyendo bandurria, laúd y guitarra. Observar si encuentran una grabación, identifican el arreglo y guardan un repertorio sin ayuda. Revisar las confusiones antes de aprobar pantallas. El número es un plan de prueba, no usuarios ya reclutados.
