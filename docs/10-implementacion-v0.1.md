# Implementación funcional v0.1

La primera entrega ejecutable de Stunafy está implementada como aplicación web responsive con Vite. Se puede abrir en escritorio y móvil desde el navegador y conserva la navegación visual aprobada.

## Catálogo inicial

El catálogo contiene 718 registros procedentes de 59 fichas de CD que Tuna UPV publica en su sección de CDs. En la comprobación del 5 de septiembre de 2026, 706 pistas respondieron con audio MPEG y 12 aparecen publicadas pero devuelven 404 incluso probando la variante de extensión en mayúsculas; estas últimas se muestran como no disponibles y no se intentan reproducir.

## Reproducción

El audio se reproduce con el elemento HTML5 `audio`, usando la ruta pública de cada pista en Tuna UPV. Durante el desarrollo, Vite hace de proxy de transmisión y añade el referente que el servidor de Tuna UPV exige; no guarda archivos ni crea una copia persistente. La versión de producción deberá mantener este proxy en un backend propio o conseguir autorización para acceso directo desde el navegador. El proxy de producción reintenta hasta tres veces los errores 5xx o cortes temporales, conserva las peticiones `Range` para permitir avance y devuelve los 404 sin ocultarlos.

La selección de una fila actualiza el título seleccionado, carga su URL de audio y comienza la reproducción cuando el navegador lo permite. El usuario conserva controles de pausa, progreso, volumen y reproducción en segundo plano según las capacidades del navegador.

Las filas cuyo archivo devuelve 404 siguen siendo seleccionables: Stunafy permite cargar en el navegador una copia autorizada mediante el selector local. El archivo se guarda en IndexedDB del propio navegador para que siga disponible en futuras sesiones; no se sube al servidor ni se incorpora al catálogo público.

La pantalla principal incluye además carga masiva de una carpeta local. Los nombres `CD0043-10.mp3`, `CD0048-5.mp3` y `CD0059-1.mp3` (y equivalentes) se asocian automáticamente a sus pistas y quedan guardados de forma local.

Las 12 pistas sin archivo entregado por la fuente son: CD0043 pista 10; CD0048 pista 5; y las pistas 1, 2, 4, 5, 6, 8, 9, 11, 12 y 13 del CD0059. Se mantienen en el catálogo para poder reactivarlas automáticamente si Tuna UPV restaura sus archivos.

La consulta de capturas públicas de Internet Archive realizada el 5 de septiembre de 2026 no devolvió copias archivadas de esas rutas. No se sustituye una grabación por otra de YouTube, Audiomack o Spotify sin identificar la misma interpretación y obtener permiso.

También se revisaron las páginas de versiones del Cancionero de Tuna UPV. Para `Carnaval del 98` y `Wayayay/Llorando se fue` solo aparece la misma ruta ausente; `Malagueña`, `TunAmérica Mix 2`, `TunAmérica Mix 3` y `Tuno panderetero` no ofrecen una versión de audio alternativa en ese índice.

Se conserva una incidencia del origen en CD0006: dos títulos distintos (”Málaga Reina Calé” y ”Málaga”) apuntan a la misma ruta de audio y número de pista. Stunafy mantiene ambos metadatos para no perder información, pero los trata como una única fuente de audio hasta que Tuna UPV aclare la ficha.

## Ejecución

1. Instalar Node.js 20 o posterior.
2. Ejecutar `npm install`.
3. Ejecutar `npm run dev`.
4. Abrir la dirección local que muestra Vite.

`npm run build` genera la versión estática en `dist/`. `npm start` sirve esa versión y mantiene el proxy de audio necesario para que Tuna UPV acepte la transmisión.

## Actualizar el catálogo

El importador independiente `scripts/import-tuna-upv.py` vuelve a leer las fichas CD públicas y comprueba cada audio con una petición parcial. Para actualizar el catálogo se ejecuta `npm run import:tuna`; el resultado se escribe en `src/catalog.json`. El proceso solo recopila metadatos y estados de disponibilidad: no descarga ni almacena archivos de audio.

La auditoría del servicio ya generado se ejecuta con `npm run validate:tuna`; prueba las 718 rutas a través del proxy local, limita la concurrencia a cuatro conexiones y diferencia audio válido, 404 y errores temporales.

## Pendiente para Android nativo

El entorno actual no tiene Flutter ni Android SDK. La siguiente fase debe crear el cliente Flutter y conectar este mismo catálogo a una API propia. Para reproducir Spotify de forma nativa será necesario evaluar su SDK oficial, autenticación y requisitos de cuenta; una WebView no se considera la arquitectura final.
