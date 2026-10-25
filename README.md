# Sunflowers · Catálogo para empresas

Catálogo web de propuestas florales para enviar a leads y empresas. Quien lo recibe arma una cotización y la envía por WhatsApp o email.

## Levantarlo en local

```
node server.js            # http://localhost:3000
$env:PORT='4173'; node server.js   # otro puerto (PowerShell)
```

## Editar contenido

Todo el contenido está en **`js/catalogo-data.js`**:

- `TIENDA`: WhatsApp, email, Instagram, dirección y horario.
- `LINEAS`: líneas de servicio (los filtros).
- `PROPUESTAS`: cada propuesta con descripción, qué incluye, opciones y precios (`precio: null` = "a cotizar"), unidad y pedido mínimo.
- `TESTIMONIOS` y `PREGUNTAS`.

## Links personalizados para leads

| Link | Resultado |
|---|---|
| `/?empresa=Acme` | "¡Hola, equipo de Acme!" y la empresa precargada en la cotización |
| `/?empresa=Acme&nombre=Laura` | "¡Hola Laura! Preparamos este catálogo para Acme." |
| `/?ver=regalos` | Abre filtrado en una línea (`oficinas`, `regalos`, `eventos`, `fechas`, `experiencias`) |

Se pueden combinar: `/?empresa=Acme&nombre=Laura&ver=eventos`

## Fotos

Las fotos de `img/` son **de muestra** (Unsplash, licencia libre). Para cambiarlas, reemplazá el archivo manteniendo el nombre, o editá el campo `foto` de cada propuesta y la lista `GALERIA` en `js/catalogo-data.js`. Recomendado: fotos cuadradas de 800×800 px en JPG.

## PDF

El botón "Descargar PDF" abre la impresión del navegador con un diseño preparado para guardar como PDF.

## Estructura

```
index.html            catálogo
css/catalogo.css      estilos
js/catalogo-data.js   contenido editable
js/catalogo.js        lógica (filtros, detalle, cotización)
js/carrusel.js        carrusel curvo de la portada (usa las fotos de las propuestas)
img/logo.png          logo (extraído del PDF original) · favicon.png · apple-touch-icon.png
js/flowers.js         ilustraciones SVG (reemplazables por fotos)
tools/texturas.js     genera el bloque de texturas (papel, tiza, bordes rasgados, dibujos) de catalogo.css
ejemplos/             estilos, tipografías y paletas explorados (+ respaldos de CSS)
```
