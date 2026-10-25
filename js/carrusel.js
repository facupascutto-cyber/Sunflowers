// Carrusel curvo de la portada: tarjetas que se deslizan de derecha a izquierda,
// se pueden arrastrar (con inercia) y se deforman como el interior de un cilindro.
// Geometría en "unidades" de un marco de 1440 de ancho (640 en celulares).
const Carrusel = (() => {
  const PITCH = 196;      // separación entre centros
  const SPEED = 50;       // unidades por segundo
  const DECAY = 0.05;     // la inercia pierde 95% por segundo
  const R = 15;           // radio de las esquinas

  function roundedPath(pts, r) {
    let d = "";
    pts.forEach((p, i) => {
      const prev = pts[(i + pts.length - 1) % pts.length];
      const next = pts[(i + 1) % pts.length];
      const toward = (q) => {
        const dx = q[0] - p[0], dy = q[1] - p[1], len = Math.hypot(dx, dy) || 1;
        return [p[0] + (dx / len) * r, p[1] + (dy / len) * r];
      };
      const a = toward(prev), b = toward(next);
      d += `${i ? "L" : "M"}${a[0].toFixed(1)} ${a[1].toFixed(1)} Q${p[0].toFixed(1)} ${p[1].toFixed(1)} ${b[0].toFixed(1)} ${b[1].toFixed(1)} `;
    });
    return `path("${d}Z")`;
  }

  function init(band, items, onSelect) {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const loop = items.length * PITCH;

    band.innerHTML = items.map((it, i) =>
      `<div class="reel" data-i="${i}">${it.html}<span class="reel__label">${it.label}</span></div>`).join("");
    const cards = [...band.querySelectorAll(".reel")];
    band.querySelectorAll("img").forEach((img) => (img.draggable = false));

    let offset = 0, velocity = 0, dragging = false, lastX = 0, lastT = 0, moved = 0, pressed = null, prev = performance.now();

    // Ancho del marco en unidades (1440 en escritorio, 640 en celulares)
    const frameWidth = () => (band.clientWidth <= 560 ? 520 : band.clientWidth <= 820 ? 640 : 1440);
    const unit = () => band.clientWidth / frameWidth();

    function layout() {
      const u = unit();
      const W = frameWidth();
      const C = W / 2, H = band.clientHeight / u;
      const span = W / 2 - 14;
      cards.forEach((el, i) => {
        let t = ((i * PITCH - offset) % loop + loop) % loop;
        if (t > loop / 2) t -= loop;
        const x = C + t * (1 + 0.083 * (t / span) ** 2);
        const d = Math.min(Math.abs(x - C) / span, 1.15);   // limitado: fuera del marco no sigue creciendo
        const w = 170 + 48 * d * d;
        const xl = x - w / 2, xr = x + w / 2;
        if (xr < -40 || xl > W + 40) { el.style.visibility = "hidden"; return; }
        const hEdge = (xe) => 280 + 92 * Math.min(Math.abs(xe - C) / span, 1.15) ** 2.6;
        const hL = hEdge(xl), hR = hEdge(xr), hMax = Math.max(hL, hR);
        const cy = H / 2 + 12 - 12 * d * d;
        el.style.visibility = "visible";
        el.style.left = xl * u + "px";
        el.style.top = (cy - hMax / 2) * u + "px";
        el.style.width = w * u + "px";
        el.style.height = hMax * u + "px";
        el.style.setProperty("--u", u + "px");
        el.style.setProperty("--bl", ((hMax - hL) / 2) * u + "px");
        const pts = [[0, (hMax - hL) / 2], [w, (hMax - hR) / 2], [w, (hMax + hR) / 2], [0, (hMax + hL) / 2]]
          .map(([a, b]) => [a * u, b * u]);
        el.style.clipPath = roundedPath(pts, R * u);
      });
    }

    function frame(now) {
      const dt = Math.min((now - prev) / 1000, 0.1);
      prev = now;
      if (!dragging) {
        offset += (reduced ? 0 : SPEED) * dt + velocity * dt;
        velocity *= DECAY ** dt;
      }
      layout();
      requestAnimationFrame(frame);
    }

    band.addEventListener("pointerdown", (e) => {
      dragging = true; moved = 0; velocity = 0;
      lastX = e.clientX; lastT = performance.now();
      pressed = e.target.closest(".reel");
      band.setPointerCapture(e.pointerId);
      band.classList.add("grabbing");
    });
    band.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const now = performance.now(), u = unit();
      const du = (e.clientX - lastX) / u;
      const dt = Math.max((now - lastT) / 1000, 0.001);
      offset -= du;
      velocity = 0.8 * (-du / dt) + 0.2 * velocity;
      moved += Math.abs(e.clientX - lastX);
      lastX = e.clientX; lastT = now;
    });
    const release = () => {
      if (!dragging) return;
      dragging = false;
      band.classList.remove("grabbing");
      if (performance.now() - lastT > 80) velocity = 0; // soltó quieto: sin inercia
      if (moved < 6 && pressed) onSelect(items[pressed.dataset.i]);
      pressed = null;
    };
    band.addEventListener("pointerup", release);
    band.addEventListener("pointercancel", release);

    requestAnimationFrame(frame);
  }

  return { init };
})();
