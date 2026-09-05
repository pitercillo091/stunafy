# Importación, deduplicación y publicación

## Enriquecimiento del catálogo maestro

Se adopta la propuesta del [hilo compartido](https://chatgpt.com/share/6a9c3582-0188-83eb-856c-772781f3a065) de cruzar fuentes especializadas. El cruce genera dos resultados distintos: propuestas de nuevas obras y propuestas de materiales adicionales para obras ya existentes. Cada candidato indica qué añade, con qué evidencia y si su compatibilidad musical está verificada.

Ejemplo conceptual: una fuente aporta una grabación, otra una letra y otra una parte de laúd. Tras identificar la obra pueden figurar en la misma ficha, conservando variantes y fuentes. Solo se presentarán como conjunto para ensayar esa grabación si se verifica el arreglo correspondiente.

El panel muestra cobertura por obra e instrumento: material identificado, referenciado, autorizado, accesible y compatible. Estos estados no se reducen a un único indicador de «tenemos partitura». La ausencia de contenido en una fuente no elimina lo aportado por otra.

## Flujo propuesto

1. **Aprobar la fuente:** registrar método y usos permitidos antes de obtener contenido automáticamente.
2. **Descubrir cambios:** consultar el mecanismo autorizado, con límites y cursor persistente.
3. **Recoger evidencia mínima:** URL, ID, fecha, cabeceras relevantes y huella. Conservar copias solo si el alcance lo permite, con retención definida.
4. **Interpretar:** convertir el formato externo al contrato común sin publicar.
5. **Normalizar:** títulos para búsqueda, idioma, nombres e instrumentos, conservando valores originales.
6. **Proponer coincidencias:** buscar obras, arreglos, grabaciones y archivos ya existentes por separado.
7. **Revisar:** resolver identidad, datos contradictorios y correspondencia musical.
8. **Evaluar derechos:** comprobar permiso por recurso y acción; una aprobación editorial no es aprobación legal.
9. **Publicar:** transacción auditada y actualización de índices/cachés mediante trabajos durables.
10. **Revisar cambios posteriores:** restricciones, retiradas, enlaces rotos, correcciones y expiración de permisos.

## Contrato del importador

Cada conector declara nombre, versión, fuente, dominios permitidos, capacidades, política de acceso y responsable. Recibe configuración y cursor; devuelve candidatos y un nuevo cursor.

Cada candidato contiene: source_id, external_id, source_url, retrieved_at, parser_version, tipo sugerido, campos extraídos con evidencia, relaciones sugeridas, referencias a recursos, estado de derechos y advertencias. Un importador nunca puede conceder permiso por defecto ni escribir directamente en el catálogo publicado.

Añadir campos para título del documento/página y título dentro de la ficha, género/ritmo original, idioma, contexto histórico, fechas tipadas, partes numeradas, tutoriales y formato declarado. Si difieren URL, encabezado y contenido, el candidato queda retenido para revisión; no elegir la identidad solo por la ruta.

Se distinguirán resultados sin cambios, propuestos, inválidos, limitados por origen y fallidos. Reintentos con espera creciente, respeto a Retry-After, límites de concurrencia y parada por fuente. Cambios de formato que disparen campos vacíos o resultados anómalos detienen la publicación de ese lote.

Idempotencia por fuente, ID remoto y huella/versionado relevante. Reejecutar el mismo lote no crea entidades ni revisiones duplicadas. Los datos crudos autorizados permiten reprocesar con otra versión de parser sin volver a solicitar la fuente.

## Resolución de identidad

| Señal | Uso | Limitación |
|---|---|---|
| ID remoto ya vinculado | Actualizar el registro de origen | Vigilar reutilización de IDs por la fuente |
| Identificador musical externo | Evidencia fuerte si está validado | Puede faltar o estar mal asignado |
| Hash del archivo | Evitar guardar bytes idénticos | No identifica la obra ni acredita licencia |
| Título normalizado y autoría | Proponer coincidencia de obra | Homónimos, atribuciones erróneas y traducciones |
| Intérprete, fecha, duración y álbum | Proponer coincidencia de grabación | No basta para distinguir tomas o ediciones |
| Arreglista, instrumentación y estructura | Proponer coincidencia de arreglo | El mismo tono no implica el mismo arreglo |

En el piloto, ninguna fusión por similitud será automática. Solo se actualiza automáticamente un vínculo de origen ya confirmado si no altera decisiones editoriales protegidas. La automatización posterior requiere un conjunto de casos revisados y medir falsos positivos.

Una fuente nueva no gana por ser más reciente. Cada campo mantiene sus afirmaciones; la selección canónica registra quién decide y por qué. Una edición humana confirmada genera un conflicto revisable si la fuente difiere.

## Seguridad de la obtención

Dominios aprobados, validación de redirecciones y bloqueo de direcciones internas para evitar solicitudes a sistemas privados. Límites de tamaño, duración, profundidad y tipos MIME. Escaneo y procesamiento aislado de PDF, XML, ZIP/MuseScore y MIDI. No ejecutar contenido de archivos ni seguir enlaces internos arbitrarios.

No sortear autenticación, bloqueos, captchas ni límites. Un conector inaccesible queda pausado; las fichas existentes conservan su trazabilidad y se revisa su disponibilidad.

## Retiradas y caducidad

La ausencia en una consulta no equivale automáticamente a una retirada jurídica. Se marca como inaccesible y se revisa según la política de origen. Una revocación acreditada suspende las acciones afectadas, invalida entregas y derivados, y conserva solo la evidencia permitida.

Revisiones y retiradas deben propagarse a API, búsqueda, almacenamiento/CDN y manifiestos offline. El panel mostrará lo pendiente de propagar. La revocación offline tiene el límite físico descrito en arquitectura.

## Casos que deben probarse al implementar

- Dos obras diferentes con el mismo título y una obra con títulos alternativos en dos idiomas.
- Dos arreglos de una obra, varias grabaciones del mismo arreglo y un popurrí.
- Reejecución de un lote y reintento después de una caída entre revisión y publicación.
- Fuente que cambia su HTML, devuelve 429 o elimina un recurso.
- Dos fuentes que discrepan sobre autoría; una corrección manual que debe sobrevivir al siguiente lote.
- Discrepancia observada en UCN: la ruta [reina-del-tamarugal](https://tunaucn.wixsite.com/tunaucn/reina-del-tamarugal) muestra el encabezado «Romances del mediterráneo». Debe retenerse como conflicto de identidad sin asociar automáticamente sus partes a ninguna de las dos obras.
- Archivo idéntico desde dos procedencias con permisos diferentes; no heredar permisos entre ellas.
- Retirada de una grabación usada en playlists y recuperación tras una fusión incorrecta.

Estos son criterios de validación pendientes, no pruebas ejecutadas.

## Medición del catálogo

Registrar por separado entradas observadas en una fuente, obras canónicas, arreglos, grabaciones, recursos, relaciones confirmadas y recursos habilitados para cada uso. La suma de índices alfabéticos sirve para estimar trabajo de revisión; no se presenta como número de canciones únicas de Stunafy. Medir también falsos positivos de coincidencia, desacuerdos y horas editoriales por lote antes de ampliar la automatización.
