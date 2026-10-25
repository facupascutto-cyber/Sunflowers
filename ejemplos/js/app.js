(() => {
  const $ = (s) => document.querySelector(s);
  const money = (n) => "$" + n.toLocaleString("es-AR");
  const CART_KEY = "sunflowers-cart";

  // ---------- Estado del carrito ----------
  let cart = load();

  function load() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch { return {}; }
  }
  function save() {
    try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch {}
  }
  const findProduct = (id) => PRODUCTS.find((p) => p.id === id);
  const cartTotal = () => Object.entries(cart).reduce((t, [id, q]) => t + findProduct(id).price * q, 0);
  const cartCount = () => Object.values(cart).reduce((a, b) => a + b, 0);

  function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    save(); renderCart();
    const btn = $("#cartOpen");
    btn.classList.remove("bump"); void btn.offsetWidth; btn.classList.add("bump");
    toast(`🌻 ${findProduct(id).name} agregado al carrito`);
  }
  function setQty(id, q) {
    if (q <= 0) delete cart[id]; else cart[id] = q;
    save(); renderCart();
  }

  // ---------- Render ----------
  let activeCat = "Todos";

  function renderFilters() {
    $("#filters").innerHTML = CATEGORIES.map((c) =>
      `<button class="chip ${c === activeCat ? "is-active" : ""}" data-cat="${c}">${c}</button>`).join("");
  }

  function renderProducts() {
    const list = activeCat === "Todos" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCat);
    $("#productGrid").innerHTML = list.map((p, i) => `
      <article class="card" style="animation-delay:${i * 60}ms">
        <div class="card__art">
          ${p.tag ? `<span class="card__tag">${p.tag}</span>` : ""}
          ${Flowers.bouquet(p.art)}
        </div>
        <div class="card__body">
          <span class="card__cat">${p.category}</span>
          <h3 class="card__title">${p.name}</h3>
          <p class="card__desc">${p.desc}</p>
          <div class="card__foot">
            <span class="price">${money(p.price)}</span>
            <button class="add-btn" data-add="${p.id}" aria-label="Agregar ${p.name}">+</button>
          </div>
        </div>
      </article>`).join("");
  }

  function renderPlans() {
    $("#plans").innerHTML = PLANS.map((p) => `
      <div class="plan ${p.featured ? "plan--featured" : ""}">
        <div class="plan__icon">${Flowers.single(...p.icon)}</div>
        <h3>${p.name}</h3>
        <p class="plan__price">${p.price}</p>
        <p>${p.desc}</p>
        <ul>${p.items.map((i) => `<li>${i}</li>`).join("")}</ul>
      </div>`).join("");
  }

  function renderCart() {
    $("#cartCount").textContent = cartCount();
    $("#cartTotal").textContent = money(cartTotal());
    $("#checkoutBtn").disabled = cartCount() === 0;
    const ids = Object.keys(cart);
    $("#cartItems").innerHTML = ids.length === 0
      ? `<div class="empty">${Flowers.single("daisy")}<p>Tu carrito está vacío.<br>¡Sumale unas flores!</p></div>`
      : ids.map((id) => {
          const p = findProduct(id);
          return `<div class="cart-item">
            <div class="cart-item__art">${Flowers.bouquet(p.art)}</div>
            <div>
              <h4>${p.name}</h4>
              <span class="price">${money(p.price)}</span>
              <div class="qty">
                <button data-qty="${id}" data-d="-1">−</button><span>${cart[id]}</span><button data-qty="${id}" data-d="1">+</button>
              </div>
            </div>
            <button class="remove" data-remove="${id}">Quitar</button>
          </div>`;
        }).join("");
  }

  // ---------- UI ----------
  function openDrawer(open) {
    $("#drawer").classList.toggle("is-open", open);
    $("#overlay").classList.toggle("is-open", open);
  }
  function openModal(open) {
    $("#checkoutModal").classList.toggle("is-open", open);
  }

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("is-show"), 2400);
  }

  document.addEventListener("click", (e) => {
    const t = e.target.closest("button, a");
    if (!t) return;
    if (t.dataset.cat) { activeCat = t.dataset.cat; renderFilters(); renderProducts(); }
    if (t.dataset.add) addToCart(t.dataset.add);
    if (t.dataset.qty) setQty(t.dataset.qty, cart[t.dataset.qty] + Number(t.dataset.d));
    if (t.dataset.remove) setQty(t.dataset.remove, 0);
    if (t.hasAttribute("data-close")) openModal(false);
    if (t.closest("#navLinks")) $("#navLinks").classList.remove("is-open");
  });

  $("#cartOpen").addEventListener("click", () => openDrawer(true));
  $("#cartClose").addEventListener("click", () => openDrawer(false));
  $("#overlay").addEventListener("click", () => openDrawer(false));
  $("#menuBtn").addEventListener("click", () => $("#navLinks").classList.toggle("is-open"));
  $("#checkoutModal").addEventListener("click", (e) => { if (e.target.id === "checkoutModal") openModal(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { openDrawer(false); openModal(false); } });

  $("#checkoutBtn").addEventListener("click", () => {
    $("#checkoutTotal").textContent = money(cartTotal());
    const fecha = $("#checkoutForm").fecha;
    fecha.min = fecha.value = new Date().toISOString().slice(0, 10);
    openDrawer(false);
    openModal(true);
  });

  $("#checkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value.split(" ")[0];
    cart = {}; save(); renderCart();
    e.target.reset();
    openModal(false);
    toast(`¡Gracias ${nombre}! Tu pedido fue recibido 🌻`);
  });

  $("#b2bForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const empresa = e.target.empresa.value;
    e.target.reset();
    toast(`¡Gracias! Te enviamos la propuesta para ${empresa} en menos de 24 hs.`);
  });

  // ---------- Init ----------
  Flowers.mount();
  renderFilters();
  renderProducts();
  renderPlans();
  renderCart();
  if (location.hash === "#carrito") openDrawer(true);
})();
