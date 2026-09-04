# Tarjeta Digital — Fabián Rincón C. (FRC · Alianza Legal)

Tarjeta digital profesional para **Fabián Rincón C.**, abogado con
especialización en Derecho Laboral y Seguridad Social (en curso).

Diseño y estructura inspirados en la tarjeta **DTA Abogados** (referencia del
mismo portafolio KONFIO ZINC): tarjeta oscura premium, tipografía
**Playfair Display + Montserrat**, botones de acción circulares con brillo,
servicios con **hoja inferior detallada** y **WhatsApp flotante**. Sin
frameworks: HTML + CSS puro + JavaScript vanilla, en un solo archivo.

> **Nota:** esta tarjeta **no usa nada del proyecto Colsabor** (ni su
> arquitectura de datos ni su estilo claro). Es una tarjeta independiente,
> estática y autocontenida.

## 📁 Estructura

```
AbogadoFabianRinconCast/
├── index.html                ← tarjeta completa (HTML + CSS + JS en un archivo)
├── manifest.json             ← instalación PWA
├── service-worker.js         ← caché offline
├── data/
│   ├── configuracion.json    ← espejo de datos de contacto, horario y galería
│   └── servicios.json        ← espejo de las 4 áreas de práctica
├── assets/
│   ├── logo/
│   │   ├── frc.jpg           ← LOGO REAL FRC · Alianza Legal (imagen circular del hero)
│   │   ├── icon-192.png      ← ícono PWA 192 (generado del logo)
│   │   └── icon-512.png      ← ícono PWA 512 (generado del logo)
│   ├── perfil/
│   │   └── foto-perfil.svg   ← avatar de respaldo (opcional: foto real de Fabián)
│   └── galeria/
│       ├── foto1.svg         ← placeholder "Oficina"
│       ├── foto2.svg         ← placeholder "Atención"
│       └── foto3.svg         ← placeholder "Equipo"
└── README.md
```

## 🎨 Identidad visual

- Paleta: **azul marino** (`#1A2A4A` y tonos `#22365F` / `#101D35` / `#0A1122`)
  + **dorado** `#D4AF37`, sobre fondo oscuro.
- Tipografías (Google Fonts): **Playfair Display** (nombres, citas, énfasis) +
  **Montserrat** (etiquetas y textos), mismo lenguaje visual que DTA Abogados.

## ✏️ Personalización (dónde editar)

La tarjeta es **100% estática**: los textos están en el propio `index.html`.
Los archivos `data/configuracion.json` y `data/servicios.json` son el
**espejo/documentación** de esos datos (cámbialos y refleja el cambio en
`index.html`, o viceversa).

| Dato | Dónde está hoy | Dónde cambiarlo en `index.html` |
|---|---|---|
| 📱 WhatsApp / teléfono | `+57 311 781 1684` | Enlaces `wa.me/573117811684` (hero, horario, flotante, cada servicio) y `tel:+573117811684` |
| ✉️ Correo | `fabian.rincon.c@example.com` (placeholder) | Acción "Correo" y ficha vCard |
| 📍 Ubicación | Cali, coords. aprox. `3.4516,-76.5320` | Enlace "Ubicación" (`google.com/maps`) |
| 🕘 Horario | Lun–Vie · 8:00 AM – 6:00 PM · cita previa | Sección "Horario de atención" |
| 🖼️ Imagen del hero | `assets/logo/frc.jpg` | Reemplaza ese archivo (o cambia `src` del `<img class="logo-img">`) |
| 🖼️ Galería | 3 placeholders SVG | Reemplaza `assets/galeria/fotoN.svg` por fotos reales (mismo nombre o actualiza los `<img>`) |
| ⚖️ Áreas de práctica | 4 áreas | Ítems de "Áreas de práctica" + hojas `svc_*` (descripción, puntos y enlace WhatsApp) |
| ✨ Lema | "Compromiso, estrategia y justicia." | Hero, "Sobre mí" y bloque "Motto" |
| 🌐 Enlace KONFIO ZINC | texto en pie | `.konfio-badge` (si se publica bajo otra agencia) |

## 📲 Funciones incluidas

- Hero con logo levitante, nombre, título y especialización.
- **6 acciones circulares** (glass dorado con brillo animado):
  WhatsApp (mensaje predefinido *"Hola Fabián, necesito una asesoría laboral"*),
  Llamar, Correo, Ubicación (mapa de Cali), Compartir y Guardar contacto (.vcf).
- **Sobre mí** con descripción profesional.
- **Áreas de práctica** (4): cada una abre una hoja inferior con descripción,
  puntos de "¿Cómo podemos ayudarle?" y botón *"Consultar este servicio"* por
  WhatsApp con mensaje específico del área.
- **Horario de atención** + botón "Agendar cita por WhatsApp".
- **Galería** con espacio para fotos profesionales.
- **WhatsApp flotante** con anillos y brillo.
- Modal **Compartir** (WhatsApp · SMS · Email · Copiar enlace).
- Animaciones de entrada, ripple y cierre por deslizamiento.
- **PWA**: manifest + service worker (caché offline e instalación).

## 🚀 Publicar (GitHub Pages u otro hosting estático)

1. Sube **todo el contenido de la carpeta** a la raíz del repositorio.
2. Activa GitHub Pages (rama `main` / raíz): el `index.html` debe quedar en la
   raíz o dará 404.
3. Abre la URL publicada. La instalación como app y el offline requieren HTTPS.

> Para probar en local basta abrir `index.html` (doble clic): al ser estática
> funciona por `file://`; el service worker solo se activa con servidor
> (HTTP/HTTPS).

## ✅ Pendientes sugeridos

- Confirmar que `assets/logo/frc.jpg` es el logo definitivo (viene de
  `Descargas/frc.jpeg`).
- Correo electrónico real (hoy `@example.com`) y dirección/mapa exactos.
- Foto real de Fabián (hero o sección) y fotos de galería.
- Redes sociales cuando existan (la tarjeta DTA de referencia las muestra;
  esta versión no las incluye porque no hay enlaces aún).
