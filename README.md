# BrosBoa Company — sitio web

Sitio estático premium (negro texturizado + dorado) de BrosBoa Company, para vender páginas web.
Sin build, sin dependencias: solo HTML, CSS y JavaScript.

## Ver el sitio
Abre `index.html` con doble clic en tu navegador. Listo.

## Archivos
- `index.html` — contenido y estructura.
- `404.html` — página de error. Es autocontenida (estilos dentro del archivo) para
  que se vea bien aunque el visitante llegue a una ruta profunda.
- `styles.css` — estilos, colores y animaciones.
- `main.js` — interacciones (reveals, contador, cursor, menú móvil).
- `.htaccess` — caché y error 404 para Hostinger. GitHub Pages lo ignora (es solo de Apache);
  allá el `404.html` se toma solo, por estar en la raíz del repo.
- `.nojekyll` — le dice a GitHub Pages que publique los archivos tal cual.

## Editar lo más común
- **Textos**: en `index.html`.
- **Colores**: variables `--gold-*` y `--bg` al inicio de `styles.css`.
- **Planes / servicios**: bloques `<article class="plan">` y `<article class="service">` en `index.html`.
- **Precios**: dentro de cada plan, el bloque `<div class="plan__price">`
  (`plan__amount` = valor, `plan__unit` = "pago único", `plan__monthly` = mantención mensual).
- **Botones "Lo quiero"**: cada uno abre WhatsApp con el mensaje del plan ya escrito.
  Si cambias un precio, acuérdate de cambiarlo también en el texto del enlace `wa.me`.

## Contactos configurados
- WhatsApp: +56 9 4967 8021
- Correo: brosboacompany@gmail.com
- Instagram: https://www.instagram.com/brosboacompany/
- Facebook: https://www.facebook.com/share/182vARegCW/

## Publicar en GitHub Pages
1. Crea un repositorio **público** en GitHub (ej. `brosbalboa`).
2. Sube **todos** los archivos de esta carpeta a la **raíz** del repo
   (no dentro de una subcarpeta, o el sitio no cargará).
3. En el repo: **Settings → Pages → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)`.
4. Espera 1–2 minutos. Tu sitio queda en `https://TU-USUARIO.github.io/brosbalboa/`.

Si el repo se llama `TU-USUARIO.github.io`, la dirección será directamente `https://TU-USUARIO.github.io`.

## Publicar en Hostinger
Arrastra **todos** los archivos (incluido `.htaccess`) a la carpeta `public_html`.
Al hacer cambios, sube el archivo nuevo y, si no ves el cambio, sube `index.html`
con un número distinto en `?v=` (ej. `styles.css?v=20260801`).

## Nombre de marca
El sitio usa **BrosBoa Company**. El apellido *Balboa* aparece solo en la sección
"Nosotros", porque es el apellido real de Benjamín y Mathías.
