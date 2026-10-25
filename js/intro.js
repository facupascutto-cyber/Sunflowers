// Intro de bienvenida: el logo aparece y el nombre se escribe letra por letra.
(() => {
  const root = document.documentElement;
  const intro = document.getElementById("intro");
  if (!root.classList.contains("intro-on") || !intro) { intro?.remove(); return; }

  const texto = document.getElementById("introText");
  const sub = document.getElementById("introSub");
  const empresa = new URLSearchParams(location.search).get("empresa");
  const nombre = TIENDA.nombre;
  const timers = [];
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));

  sub.textContent = empresa ? `preparado para ${empresa}` : "flores hechas a mano";

  // Escribe el nombre: arranca cuando el logo terminó de aparecer
  const INICIO = 750, POR_LETRA = 115;
  [...nombre].forEach((letra, i) => later(() => (texto.textContent += letra), INICIO + i * POR_LETRA));
  const finEscritura = INICIO + nombre.length * POR_LETRA;
  later(() => intro.classList.add("intro--sub"), finEscritura + 150);
  later(salir, finEscritura + 1300);

  function salir() {
    timers.forEach(clearTimeout);
    texto.textContent = nombre;
    intro.classList.add("intro--out");
    root.classList.remove("intro-on");
    setTimeout(() => intro.remove(), 800);
    removeEventListener("keydown", salir);
  }

  // Se puede saltear con un toque o una tecla
  intro.addEventListener("click", salir);
  addEventListener("keydown", salir);
})();
