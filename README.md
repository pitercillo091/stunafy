# Stunafy

Documentación funcional y técnica · v0.1 ejecutable web · 5 de septiembre de 2026.

**Prioridad actual:** diseño visual, por indicación posterior del promotor. El nombre confirmado es **Stunafy**. La identidad elegida y las pantallas actualizadas se documentan en [Diseño visual v1](design/v1/README.md); el modelo y los proveedores siguen pendientes de aprobación.

Stunafy será una aplicación para escuchar, estudiar y preparar música de tuna, rondalla y estudiantina. Oyentes y músicos tienen el mismo peso. Las primeras plataformas serán Android y web; Windows queda para una fase posterior.

La referencia principal es el [hilo «Planificar APK musical»](https://chatgpt.com/share/6a9c3582-0188-83eb-856c-772781f3a065), leído en navegador el 5 de septiembre de 2026. Su enfoque se incorpora como **catálogo maestro musical que reúne materiales de varias fuentes alrededor de cada canción**: grabaciones, letras alternativas, acordes, partes instrumentales, tutoriales, discografía y contexto histórico. El primer trabajo será cerrar visión, modelo maestro y alcance inicial; después, diseño detallado e implementación.

La primera entrega funcional está disponible como aplicación web responsive. Incluye 718 pistas de audio enlazadas desde 59 fichas públicas de Tuna UPV. No se han descargado ni alojado audios de terceros; el navegador los reproduce mediante una transmisión proxy temporal que conserva el origen.

El catálogo se puede refrescar con `npm run import:tuna`. El importador vuelve a leer las fichas públicas y comprueba cada enlace sin guardar los audios.

## Documentos

| Documento | Contenido |
|---|---|
| [Alineación con el hilo](docs/09-alineacion-hilo.md) | Síntesis, decisiones del usuario, comparación y correcciones verificadas |
| [Producto](docs/01-producto.md) | Alcance, usuarios, fases y criterios funcionales |
| [Arquitectura](docs/02-arquitectura.md) | Aplicaciones, API, almacenamiento, seguridad y operación |
| [Modelo de datos](docs/03-modelo-de-datos.md) | Obras, arreglos, grabaciones, recursos y procedencia |
| [Fuentes](docs/04-fuentes.md) | Fuentes fundamentales, complementarias y de grabaciones; 33 candidatos con distintos niveles de verificación |
| [Importación](docs/05-importacion.md) | Conectores, revisión, deduplicación y publicación |
| [Experiencia y diseño](docs/06-experiencia.md) | Navegación, pantallas y modo músico |
| [Derechos y privacidad](docs/07-derechos.md) | Permisos por recurso, plataformas externas y Google Play |
| [Decisiones y validación](docs/08-decisiones.md) | Propuestas, pendientes y condiciones para empezar a programar |
| [Implementación v0.1](docs/10-implementacion-v0.1.md) | Catálogo inicial, reproducción legal y ejecución local |

## Base propuesta

Catálogo independiente de las fuentes, con importadores que proponen coincidencias y enriquecimiento revisable. Cada material puede catalogarse/enlazarse, integrarse mediante un proveedor o alojarse con permisos suficientes; esas vías se evalúan por separado. Flutter, PostgreSQL, API modular y servicios gestionados son la propuesta técnica para sostener ese modelo. Supabase sigue siendo candidato, no una elección impuesta por el hilo.

La canción se representa como una obra. Sus arreglos, grabaciones y archivos tienen identidad propia. La procedencia se conserva por dato y los permisos se evalúan por recurso y uso.

## Estado de las decisiones

- **Confirmado:** hilo compartido como orientación principal; documentación antes de programar; igual prioridad para oyentes y músicos; Android y web primero; Windows después; catálogo con múltiples fuentes; aplicación real con identidad propia.
- **Propuesto:** arquitectura, alcance de la primera versión, diseño y criterios cuantitativos de calidad descritos en estos documentos.
- **Pendiente:** revisar juntos el alcance inicial ya alineado; confirmar contenido disponible y permisos, presupuesto, responsable del servicio, territorios y monetización. El hilo ya está incorporado y comparado.

Los hallazgos de fuentes son una revisión inicial, no una autorización de reutilización. Las páginas consultadas y sus limitaciones constan junto a cada hallazgo. No se han auditado todos sus contenidos, contratos, interfaces ni archivos robots.txt.
