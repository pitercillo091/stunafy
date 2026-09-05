# Decisiones, pendientes y validación

## Confirmado por el promotor

| ID | Decisión |
|---|---|
| D-01 | Stunafy cubrirá música de tuna, rondalla y estudiantina |
| D-02 | Oyentes y músicos tendrán el mismo peso en la primera versión |
| D-03 | Android y web primero; ejecutable Windows en una fase posterior |
| D-04 | Documentación funcional y técnica antes de escribir código |
| D-05 | Preferencia inicial por Flutter, API propia y datos estructurados |
| D-06 | Múltiples fuentes, trazabilidad, prevención de duplicados y derechos desde el diseño |
| D-07 | El hilo «Planificar APK musical» es la referencia principal; leído y comparado en la revisión 0.2 |
| D-08 | Se autoriza investigar y revisar documentos, sin código de aplicación, contratación, importación ni publicación |
| D-09 | Instrucción posterior: priorizar diseño visual, generar tres logos y maqueta de escucha de escritorio/móvil; nombre confirmado Stunafy |
| D-10 | Logo elegido provisionalmente: pandereta española circular negra con ondas rojas, procedente de la referencia compartida por el promotor |

## Propuestas de arquitectura pendientes de revisión

| ID | Propuesta | Consecuencia |
|---|---|---|
| P-01 | Separar obra, arreglo, grabación y recurso | Más relaciones iniciales; evita mezclar interpretaciones y material |
| P-02 | PostgreSQL y API modular propia | Integridad relacional y control central de publicación |
| P-03 | Supabase como candidato gestionado | Comparar costes, región y recuperación frente a PostgreSQL + Firebase Auth |
| P-04 | Importadores con área de propuestas y revisión | Dependencia de trabajo editorial; reduce publicación de errores |
| P-05 | Reproducción interna de audio con permisos suficientes | Requiere conseguir material; no depende de extraer audio de plataformas |
| P-06 | Offline, afinador y metrónomo después de la primera versión | Validar por separado permisos, dispositivos y sincronización |
| P-07 | Flutter web para la app; web pública adicional si SEO lo exige | Puede añadir una interfaz mantenida por separado, compartiendo API |
| P-08 | Secuencia original de modelo antes de diseño, modificada por D-09 | Adelantar exploración visual; proveedores y modelo definitivo siguen pendientes |
| P-09 | Ficha enriquecida con variantes, partes, tutoriales y contexto | Verificar correspondencias y permisos por material |
| P-10 | Ofertas de acceso separadas para enlaces, integración oficial y alojamiento | Capacidades propias por proveedor, sin cola universal asumida |
| P-11 | Crear versión vectorial y variantes del logo elegido antes de implementar | La imagen compartida es raster y no define todavía tamaños, fondos ni usos de producción |

## Información pendiente

El hilo ya se ha leído y contrastado. La [comparación](09-alineacion-hilo.md) documenta coincidencias, diferencias, verificaciones y cambios aplicados. La prioridad inmediata pasa a revisar la ficha maestra y el alcance de la primera versión.

Después: contenido propio o autorizado disponible; agrupaciones colaboradoras; responsable y país del servicio; territorios de lanzamiento; presupuesto mensual y de desarrollo; conocimientos/equipo que mantendrá la app; monetización; importancia del posicionamiento web. Las URL de UCN y Pulso y Púa Digital ya se recuperaron; quedan pendientes validación de adjuntos, acceso y permisos según el registro de fuentes.

La respuesta «tengo un plan de implementación» no confirma posesión de grabaciones ni permisos. La disponibilidad de contenido sigue pendiente.

## Riesgos y respuesta propuesta

| Riesgo | Respuesta |
|---|---|
| Catálogo abundante sin derechos suficientes | Piloto con aportación directa y permisos demostrables |
| Fusión equivocada de obras/arreglos | Revisión humana, afirmaciones conservadas y fusiones reversibles |
| Letra/partitura incorrecta para una grabación | Relación de compatibilidad explícita y aviso si se desconoce |
| Dependencia o cierre de una fuente | Conectores aislados, catálogo propio y varias procedencias |
| Diferencias de audio entre Android y navegador | Pruebas de viabilidad antes del desarrollo completo |
| Costes de audio o edición no previstos | Estimación por consumo y carga editorial antes de contratar |
| Alcance demasiado amplio | Alcance por fases y aceptación de cada fase |
| Retirada con dispositivos desconectados | Vigencia offline acotada y condiciones contractuales explícitas |

## Qué debe quedar cerrado antes de programar

- Plan previo incorporado: completado. Cambios y diferencias documentados; aprobación de decisiones de alcance pendiente.
- Alcance inicial y pantallas revisados con el promotor.
- Modelo validado con homónimos, alias, popurrí, varios arreglos y varias grabaciones.
- Estrategia de contenido de prueba definida, con permisos o material creado expresamente para pruebas.
- Primera fuente piloto identificada y método de acceso aprobado; la arquitectura puede probarse con datos propios si no hay acuerdo.
- Tecnología propuesta aceptada tras comparar operación, equipo y presupuesto.
- Plan de pruebas de audio, navegador, lectura y derechos preparado.

Esta lista permite decidir cuándo iniciar la implementación. No impide seguir afinando la documentación.

## Pruebas futuras de viabilidad

Después de autorizar código: reproducción con bloqueo de pantalla e interrupciones en Android; comportamiento en Chrome, Edge y Safari con límites documentados; letra con acordes y cejilla; lectura de partes PDF; validación de acceso por recurso y retirada; importador idempotente con datos autorizados.

No se han ejecutado estas pruebas. No se han elegido todavía versiones de paquetes ni mínimos definitivos de sistemas operativos.

## Definición de completado de la fase documental

Los nueve documentos cubren producto, arquitectura, datos, fuentes, importación, experiencia, derechos, decisiones y alineación con el hilo. La fase estará aprobada cuando el promotor haya revisado el alcance y las decisiones necesarias para implementar estén resueltas o aplazadas con motivo explícito. El contraste con el hilo ya está realizado.

Estado actual: **v0.1 ejecutable web alineado con el diseño; Android nativo, API propia y permisos de catálogo pendientes**. La implementación web usa el reproductor oficial de Spotify mostrado por Tuna UPV.
