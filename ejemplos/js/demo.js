// Utilidades compartidas por las variantes de diseño: carrito simple + selector de estilos.
const Demo = (() => {
  const CART_KEY = "sunflowers-cart";
  const money = (n) => "$" + n.toLocaleString("es-AR");

  const VARIANTS = [
    { href: "index.html", name: "Orgánico" },
    { href: "editorial.html", name: "Editorial" },
    { href: "mercado.html", name: "Mercado" },
    { href: "atardecer.html", name: "Atardecer" },
  ];

  function read() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch { return {}; }
  }
  function count() {
    return Object.values(read()).reduce((a, b) => a + b, 0);
  }
  function refresh() {
    document.querySelectorAll("[data-cart-count]").forEach((el) => (el.textContent = count()));
  }
  function add(id) {
    const cart = read();
    cart[id] = (cart[id] || 0) + 1;
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch {}
    refresh();
    const p = PRODUCTS.find((x) => x.id === id);
    toast(`🌻 ${p.name} agregado al carrito`);
  }

  let timer;
  function toast(msg) {
    let t = document.getElementById("demoToast");
    if (!t) {
      t = document.createElement("div");
      t.id = "demoToast";
      t.style.cssText = "position:fixed;left:50%;bottom:84px;transform:translate(-50%,40px);opacity:0;transition:.3s;background:#2f4a2c;color:#fbf5e9;padding:.8rem 1.3rem;border-radius:999px;font:500 15px system-ui,sans-serif;z-index:100;max-width:calc(100% - 32px);text-align:center";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.style.opacity = "1"; t.style.transform = "translate(-50%,0)";
    clearTimeout(timer);
    timer = setTimeout(() => { t.style.opacity = "0"; t.style.transform = "translate(-50%,40px)"; }, 2200);
  }

  function switcher() {
    const here = location.pathname.split("/").pop() || "index.html";
    const bar = document.createElement("nav");
    bar.setAttribute("aria-label", "Estilos de ejemplo");
    bar.style.cssText = "position:fixed;left:50%;bottom:16px;transform:translateX(-50%);z-index:90;display:flex;gap:4px;padding:5px;border-radius:999px;background:rgba(43,42,34,.88);backdrop-filter:blur(8px);box-shadow:0 8px 24px -8px rgba(0,0,0,.4);font:500 13px system-ui,sans-serif;max-width:calc(100% - 32px);overflow-x:auto";
    bar.innerHTML = VARIANTS.map((v) => {
      const on = v.href === here;
      return `<a href="${v.href}" style="padding:.5rem .9rem;border-radius:999px;white-space:nowrap;text-decoration:none;color:${on ? "#2f4a2c" : "#fbf5e9"};background:${on ? "#f5b82e" : "transparent"}">${v.name}</a>`;
    }).join("");
    document.body.appendChild(bar);
  }

  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-add]");
    if (b && !window.SUNFLOWERS_MAIN) add(b.dataset.add);
  });
  document.addEventListener("DOMContentLoaded", () => { switcher(); refresh(); });

  return { money, add, refresh, toast };
})();
