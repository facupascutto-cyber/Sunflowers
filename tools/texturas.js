// Genera el bloque "Texturas" del final de css/catalogo.css. Uso: node tools/texturas.js (reemplazar ese bloque con la salida)
// Elección del cliente (ejemplos/texturas.html): fondo lino · etiquetas papel de acuarela · pizarra lino verde ·
// bordes papel rasgado · ramitas y girasoles suaves · extras: cinta, sombras marcadas, fotos irregulares, subrayado a mano.
const uri = (svg) => `url("data:image/svg+xml,${encodeURIComponent(svg.replace(/\s+/g, " ").trim())}")`;
const noise = (size, freq, oct, matrix) => uri(`<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='${oct}' stitchTiles='stitch'/><feColorMatrix values='${matrix}'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`);
const brown = (a) => `0 0 0 0 .4 0 0 0 0 .3 0 0 0 0 .1 0 0 0 ${a} 0`;

// Fondo: lino (trama de hilos) + grano suave
const lino = "repeating-linear-gradient(0deg, rgba(120, 90, 30, .07) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(120, 90, 30, .06) 0 1px, transparent 1px 4px)";
const grano = noise(160, ".9", 3, brown(.1));
// Etiquetas y polaroids: papel de acuarela
const acuarela = noise(180, ".45", 4, brown(.22));
// Pie de página: lino verde
const linoVerde = "repeating-linear-gradient(0deg, rgba(255, 255, 255, .05) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(255, 255, 255, .04) 0 1px, transparent 1px 4px)";

// Borde de papel rasgado (amarillo girasol)
const alturas = [3, 7, 2, 8, 4, 9, 1, 6, 5, 8, 2, 7, 3, 9, 4, 6, 2, 8, 5, 7, 1, 9, 3, 6, 4, 8];
const pts = [];
for (let x = 0, i = 0; x <= 200; x += 8, i++) pts.push(`${x},${alturas[i % alturas.length]}`);
const rasgado = uri(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 10' preserveAspectRatio='none'><polygon fill='#fecf07' points='0,10 ${pts.join(" ")} 200,10'/></svg>`);

// Dibujos botánicos en trazo
const trazo = "fill='none' stroke='#2b524f' stroke-opacity='.2' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'";
const ramita = uri(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 260'><g ${trazo}>
  <path d='M40 250 C 60 190, 90 130, 170 30'/>
  <path d='M62 196 C 30 190, 18 168, 20 146 C 44 150, 60 170, 62 196 Z'/><path d='M62 196 C 48 180, 34 164, 22 148'/>
  <path d='M84 152 C 92 120, 116 108, 138 112 C 132 136, 112 152, 84 152 Z'/><path d='M84 152 C 102 138, 118 124, 136 114'/>
  <path d='M106 118 C 80 108, 72 84, 78 62 C 100 72, 110 94, 106 118 Z'/><path d='M106 118 C 96 98, 88 80, 80 64'/>
  <path d='M136 74 C 146 52, 166 46, 186 52 C 176 72, 158 80, 136 74 Z'/><path d='M136 74 C 152 64, 168 58, 184 54'/>
</g></svg>`);
let petalos = "";
for (let i = 0; i < 14; i++) {
  const a = (i / 14) * Math.PI * 2;
  const P = (r, d = 0) => `${(90 + Math.cos(a + d) * r).toFixed(1)} ${(80 + Math.sin(a + d) * r).toFixed(1)}`;
  petalos += `<path d='M${P(26)} Q${P(44, .22)} ${P(56)} Q${P(44, -.22)} ${P(26)}'/>`;
}
const girasol = uri(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 250'><g ${trazo}>
  ${petalos}<circle cx='90' cy='80' r='22'/><circle cx='84' cy='76' r='2'/><circle cx='95' cy='84' r='2'/><circle cx='92' cy='72' r='2'/><circle cx='83' cy='88' r='2'/>
  <path d='M90 136 C 92 170, 86 205, 92 248'/>
  <path d='M91 190 C 110 172, 136 172, 150 182 C 132 198, 108 198, 91 190 Z'/><path d='M89 214 C 70 198, 44 200, 32 212 C 50 226, 74 224, 89 214 Z'/>
</g></svg>`);

// Subrayado a mano para los títulos
const garabato = uri(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 20' preserveAspectRatio='none'><path d='M4 12 C 40 4, 70 18, 110 10 S 180 4, 220 12 S 280 14, 296 8' fill='none' stroke='#f28242' stroke-width='4' stroke-linecap='round'/></svg>`);

process.stdout.write(`
/* ---------- Texturas ---------- */
body { background-image: ${lino}, ${grano}; background-size: auto, auto, 160px; }
.tag, .photo, .steps li, .note, .sheet, .drawer, .chip, .btn--paper { background-image: ${acuarela}; background-size: 180px; }
.footer { background-image: ${linoVerde}; }
.strip { position: relative; }
.strip::before, .strip::after { content: ""; position: absolute; left: 0; right: 0; height: 9px; background: ${rasgado} repeat-x; background-size: 200px 9px; }
.strip::before { top: -8px; }
.strip::after { bottom: -8px; transform: scaleY(-1); }

/* Cinta adhesiva en etiquetas y pasos (reemplaza el agujerito de la etiqueta) */
.tag::before { width: 76px; height: 22px; top: 2px; margin-left: -38px; border-radius: 2px; background: rgba(242, 130, 66, .55); box-shadow: none; rotate: -4deg; }
.tag:nth-child(even)::before { background: rgba(95, 143, 132, .5); rotate: 3deg; }
.steps li::before { content: ""; position: absolute; top: -10px; right: 18px; width: 64px; height: 20px; background: rgba(254, 207, 7, .7); rotate: 6deg; }

/* Sombras de papel despegado */
.tag { filter: drop-shadow(0 14px 14px rgba(58, 47, 34, .32)); }
.photo, .steps li, .note { box-shadow: 0 18px 26px -10px rgba(58, 47, 34, .55); }

/* Fotos con borde irregular */
.tag__art img, .photo img { clip-path: polygon(1% 2%, 20% 0, 45% 1.5%, 70% 0, 99% 1%, 100% 25%, 98.5% 50%, 100% 78%, 99% 99%, 75% 100%, 50% 98.5%, 25% 100%, 0 99%, 1.5% 75%, 0 50%, 1% 25%); }

/* Subrayado a mano en los títulos de sección */
.title h2 { display: inline-block; padding-bottom: 14px; background: ${garabato} no-repeat bottom / 100% 14px; }

/* Dibujos botánicos en las esquinas */
.section { position: relative; }
.section > .wrap { position: relative; z-index: 1; }
.deco::before, .deco::after { content: ""; position: absolute; pointer-events: none; background-repeat: no-repeat; background-size: contain; }
.deco--ramita-izq::before { left: max(0px, calc(50% - 700px)); top: 1.5rem; width: 190px; height: 225px; background-image: ${ramita}; }
.deco--girasol-der::after { right: max(0px, calc(50% - 690px)); top: 2rem; width: 150px; height: 210px; background-image: ${girasol}; rotate: 8deg; }
.deco--girasol-izq::before { left: max(0px, calc(50% - 690px)); bottom: 1.5rem; width: 140px; height: 195px; background-image: ${girasol}; rotate: -10deg; }
.deco--ramita-der::after { right: max(0px, calc(50% - 700px)); bottom: 1rem; width: 180px; height: 215px; background-image: ${ramita}; transform: scaleX(-1); }
@media (max-width: 960px) { .deco::before, .deco::after { opacity: .6; scale: .65; transform-origin: top; } }
@media print {
  .deco::before, .deco::after, .strip::before, .strip::after, .tag::before, .steps li::before { display: none; }
  .title h2 { background: none; }
}
`);
