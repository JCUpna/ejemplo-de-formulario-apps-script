# Formulario de comentarios de clientes

Formulario web para recoger opiniones de clientes con preguntas condicionales según la categoría elegida (Producto, Atención, Envío, Web/App, Otro). Alojado en GitHub Pages y con envíos guardados en una hoja de Google Sheets mediante Google Apps Script.

**URL pública:** <https://jcupna.github.io/ejemplo-de-formulario-apps-script/>

***

## Qué incluye el formulario

-   Datos de contacto (nombre, email opcional)
-   Selector de categoría con 5 opciones
-   Preguntas específicas que aparecen según la categoría seleccionada
-   Valoración general del 1 al 5
-   Campo libre para comentarios
-   Checkbox para autorizar contacto posterior

La lógica condicional hace que cada usuario solo vea las preguntas relevantes a su caso, sin abrumarle con un formulario largo.

***

## Stack técnico

-   **HTML + CSS + JavaScript** en un único archivo (`index.html`), sin dependencias ni frameworks
-   **Tipografías:** Fraunces y IBM Plex (Google Fonts)
-   **Hosting:** GitHub Pages (gratis)
-   **Backend de envíos:** Google Apps Script + Google Sheets

***

## Cómo está desplegado

1.  El archivo `index.html` está en la raíz del repositorio
2.  GitHub Pages está activado en Settings → Pages con la rama `main` y carpeta `/ (root)`
3.  Cada vez que se haga `commit` a `main`, la web se actualiza automáticamente en 1-2 minutos

***

## Configuración del backend — Google Apps Script

1.  Hoja de Google Sheets privada en mi Drive donde se guardan las respuestas
2.  Script pegado en Extensiones → Apps Script (ver código en `apps-script-code.gs`)
3.  Desplegado como aplicación web con acceso "Cualquier usuario"
4.  URL pública del endpoint `/exec`: <https://script.google.com/macros/s/AKfycbxqW9KZ3mKDxpqRBtXn93P5bCveiIuda_HmZMKqtjDgNvx3z0tOL6ugjBiU6xwSsxoK/exec>
5.  **Sin límite de envíos**

### Cómo funciona

Cuando se envía el formulario, JavaScript hace una petición POST con los datos en JSON a la URL del Apps Script. El script los recibe, y los añade como una nueva fila en la hoja. Si detecta campos nuevos, crea columnas automáticamente.

### Protección contra spam

El endpoint es público (tiene que serlo para recibir envíos desde el navegador). Si recibo spam, opciones:

-   Añadir un campo honeypot oculto en el HTML (solo los bots lo rellenan)
-   Validar un token simple en el script
-   Limitar envíos por IP o franja horaria dentro del script

***

## Cómo actualizar el script

Si necesito cambiar la lógica del script:

1.  Abrir la hoja de Google Sheets
2.  Extensiones → Apps Script
3.  Editar el código
4.  Guardar y **Implementar → Gestionar implementaciones → Editar → Nueva versión**

⚠️ Importante: cada nueva implementación genera una URL nueva. Para mantener la misma URL, usar "Editar" sobre el despliegue existente y seleccionar "Nueva versión".

***

## Cómo modificar el formulario

### Cambiar textos o campos

Editar directamente `index.html`. Los campos de cada categoría están en los bloques `<div class="conditional" id="cond-XXX">`.

### Añadir una nueva categoría

1.  Añadir una nueva `<label class="cat-card">` en el grid
2.  Crear el `<div class="conditional">` correspondiente con las preguntas nuevas
3.  Añadir la referencia en el objeto `conds` del script al final del archivo
4.  El script de Apps Script detectará los campos nuevos y creará columnas automáticamente

### Cambiar colores o tipografía

En el bloque `<style>`, las variables CSS están en `:root`. Los colores principales son `--paper`, `--ink` y `--accent`.

***

## Revisar las respuestas

Abrir la hoja de Google Sheets vinculada. Cada fila es una respuesta, con columnas por cada campo del formulario.

***

## Solución de problemas habituales

**La web no carga tras hacer cambios** Esperar 1-2 minutos, GitHub Pages tarda en actualizarse. Vaciar caché (Ctrl+F5) si sigue sin verse.

**Los envíos no llegan a la hoja** El formulario usa `mode: 'no-cors'`, lo que significa que muestra "éxito" aunque falle. Para diagnosticar:

-   Enviar una respuesta de prueba y confirmar que aparece en la hoja
-   Si no aparece, revisar en Apps Script que el despliegue tenga acceso "Cualquier usuario"
-   Revisar el registro de ejecuciones en Apps Script (menú "Ejecuciones") para ver errores

**Cambié el script y ahora no funciona** Los cambios en el script no se aplican hasta que se crea una nueva versión del despliegue. Implementar → Gestionar implementaciones → Editar → Nueva versión.

***

## Histórico

-   **Abril 2026** — Creación del formulario y primer despliegue en GitHub Pages con Apps Script
