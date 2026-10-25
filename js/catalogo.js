(() => {
  const $ = (s) => document.querySelector(s);
  const money = (n) => "$" + n.toLocaleString("es-AR");
  const QUOTE_KEY = "sunflowers-cotizacion";
  const UNIDAD = { unidad: "por unidad", mes: "por mes", persona: "por persona", evento: "por evento" };

  const findProp = (id) => PROPUESTAS.find((p) => p.id === id);
  const lineaNombre = (id) => LINEAS.find((l) => l.id === id)?.nombre || "";
  // Foto de la propuesta, o la ilustración si no tiene
  const media = (p, opts = {}) => p.foto
    ? `<img src="${p.foto}" alt="${p.nombre}" loading="lazy" width="800" height="800">`
    : Flowers.bouquet(opts.sinFondo ? { ...p.arte, bg: null } : p.arte);
  const desde = (p) => {
    const precios = p.opciones.map((o) => o.precio).filter((x) => x != null);
    return precios.length ? Math.min(...precios) : null;
  };

  // ---------- Link personalizado: ?empresa=Acme&nombre=Laura&ver=regalos ----------
  const params = new URLSearchParams(location.search);
  const empresa = params.get("empresa");
  const nombre = params.get("nombre");
  let filtro = LINEAS.some((l) => l.id === params.get("ver")) ? params.get("ver") : "todas";

  // ---------- Cotización (se guarda en el navegador) ----------
  let quote = load();
  function load() {
    try { return JSON.parse(localStorage.getItem(QUOTE_KEY)) || []; } catch { return []; }
  }
  function save() {
    try { localStorage.setItem(QUOTE_KEY, JSON.stringify(quote)); } catch {}
  }
  // Ignora ítems guardados que ya no existen en el catálogo
  quote = quote.filter((q) => findProp(q.id)?.opciones[q.opcion]);

  function addToQuote(id, opcion, cantidad) {
    const item = quote.find((q) => q.id === id && q.opcion === opcion);
    if (item) item.cantidad += cantidad; else quote.push({ id, opcion, cantidad });
    save(); renderQuote();
    const btn = $("#quoteOpen");
    btn.classList.remove("bump"); void btn.offsetWidth; btn.classList.add("bump");
    toast(`✿ ${findProp(id).nombre} sumado a tu cotización`);
  }

  // ---------- Render ----------
  function renderTienda() {
    document.querySelectorAll("[data-tienda]").forEach((el) => (el.textContent = TIENDA[el.dataset.tienda]));
    const wa = `https://wa.me/${TIENDA.whatsapp}`;
    $("#contact").innerHTML = `<div class="contact">
      <a href="${wa}" target="_blank" rel="noopener">WhatsApp · ${TIENDA.whatsappVisible}</a>
      <a href="mailto:${TIENDA.email}">${TIENDA.email}</a>
      <a href="https://instagram.com/${TIENDA.instagram}" target="_blank" rel="noopener">Instagram · @${TIENDA.instagram}</a>
      <span>${TIENDA.direccion} · ${TIENDA.horario}</span>
    </div>`;
    const saludo = empresa ? `¡Hola ${TIENDA.nombre}! Soy de ${empresa}, vi el catálogo y quiero hacer una consulta.` : `¡Hola ${TIENDA.nombre}! Vi el catálogo y quiero hacer una consulta.`;
    $("#waBtn").href = `${wa}?text=${encodeURIComponent(saludo)}`;
  }

  function renderGreeting() {
    if (!empresa) return;
    const g = $("#greeting");
    g.textContent = nombre
      ? `¡Hola ${nombre}! Preparamos este catálogo para ${empresa}.`
      : `¡Hola, equipo de ${empresa}! Preparamos este catálogo para ustedes.`;
    g.hidden = false;
    document.title = `${TIENDA.nombre} · Propuesta para ${empresa}`;
    const f = $("#quoteForm");
    f.empresa.value = empresa;
    if (nombre) f.contacto.value = nombre;
  }

  function renderChips() {
    const all = [{ id: "todas", nombre: "Todas" }, ...LINEAS];
    $("#chips").innerHTML = all.map((l) =>
      `<button class="chip ${l.id === filtro ? "on" : ""}" data-linea="${l.id}">${l.nombre}</button>`).join("");
  }

  function renderTags() {
    const list = filtro === "todas" ? PROPUESTAS : PROPUESTAS.filter((p) => p.linea === filtro);
    $("#tags").innerHTML = list.map((p, i) => {
      const d = desde(p);
      return `<article class="tag" style="animation-delay:${i * 50}ms">
        ${p.tag ? `<span class="tag__ribbon">${p.tag}</span>` : ""}
        <div class="tag__art" data-ver="${p.id}">${media(p)}</div>
        <span class="tag__linea">${lineaNombre(p.linea)}</span>
        <h3>${p.nombre}</h3>
        <p>${p.desc}</p>
        <div class="tag__foot">
          <span class="price">${d == null ? "a cotizar" : `<small>desde</small>${money(d)}`}<small>${d == null ? "propuesta a medida" : UNIDAD[p.unidad]}</small></span>
          <span class="tag__btns">
            <button class="mini mini--line" data-ver="${p.id}">ver</button>
            <button class="mini mini--fill" data-ver="${p.id}">sumar</button>
          </span>
        </div>
      </article>`;
    }).join("");
  }

  function renderGallery() {
    $("#gallery").innerHTML = GALERIA.map((g) =>
      `<figure class="photo"><img src="${g.foto}" alt="${g.texto}" loading="lazy" width="600" height="600"><figcaption>${g.texto}</figcaption></figure>`).join("");
  }

  function renderNotes() {
    $("#notes").innerHTML = TESTIMONIOS.map((t) =>
      `<blockquote class="note">“${t.texto}”<cite>— ${t.autor}<small>${t.detalle}</small></cite></blockquote>`).join("");
  }

  function renderFaq() {
    $("#faq").innerHTML = PREGUNTAS.map((p) => `<details><summary>${p.q}</summary><p>${p.a}</p></details>`).join("");
  }

  function renderQuote() {
    const count = quote.length;
    $("#quoteCount").textContent = count;
    if (!count) {
      $("#quoteItems").innerHTML = `<div class="empty">${Flowers.single("daisy")}<p>Tu cotización está vacía.<br>Sumá las propuestas que te interesen.</p></div>`;
      $("#quoteTotal").innerHTML = "";
      return;
    }
    let total = 0, aCotizar = 0;
    $("#quoteItems").innerHTML = quote.map((q, i) => {
      const p = findProp(q.id), o = p.opciones[q.opcion];
      const sub = o.precio == null ? null : o.precio * q.cantidad;
      if (sub == null) aCotizar++; else total += sub;
      return `<div class="q-item">
        <div class="q-item__art">${media(p)}</div>
        <div>
          <h4>${p.nombre}</h4>
          <small>${o.nombre}</small>
          <div class="q-item__qty">
            <button data-qty="${i}" data-d="-1" aria-label="Restar">−</button>
            <span>${q.cantidad} ${p.unidad === "unidad" ? "u." : p.unidad === "persona" ? "pers." : p.unidad}</span>
            <button data-qty="${i}" data-d="1" aria-label="Sumar">+</button>
          </div>
        </div>
        <div class="q-item__right">
          <span class="price">${sub == null ? "a cotizar" : money(sub)}</span>
          <button data-remove="${i}">quitar</button>
        </div>
      </div>`;
    }).join("");
    $("#quoteTotal").innerHTML = `<span>Total estimado${aCotizar ? ` <small>(+ ${aCotizar} a cotizar)</small>` : ""}</span><span class="price">${money(total)}</span>`;
  }

  // ---------- Modal de detalle ----------
  let current = null;
  function openDetail(id) {
    const p = (current = findProp(id));
    $("#detailArt").innerHTML = media(p, { sinFondo: true });
    $("#detailLinea").textContent = lineaNombre(p.linea);
    $("#detailTitle").textContent = p.nombre;
    $("#detailDesc").textContent = p.desc;
    $("#detailIncluye").innerHTML = p.incluye.map((x) => `<li>${x}</li>`).join("");
    $("#detailOpciones").innerHTML = p.opciones.map((o, i) => `
      <label class="option"><span><input type="radio" name="opcion" value="${i}" ${i === 0 ? "checked" : ""}>${o.nombre}</span>
      <b>${o.precio == null ? "a cotizar" : money(o.precio)}</b></label>`).join("");
    const cant = $("#detailCantidad");
    cant.min = 1; cant.value = p.minimo;
    $("#detailUnidad").textContent = `(${UNIDAD[p.unidad]})`;
    $("#detailMin").textContent = p.minimo > 1 ? `Pedido mínimo: ${p.minimo} ${p.unidad === "persona" ? "personas" : "unidades"}.` : "";
    $("#detail").classList.add("open");
  }
  const closeDetail = () => $("#detail").classList.remove("open");

  function openDrawer(open) {
    $("#drawer").classList.toggle("open", open);
    $("#overlay").classList.toggle("open", open);
  }

  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2500);
  }

  // ---------- Mensaje de cotización ----------
  function buildMessage(data) {
    const lines = quote.map((q) => {
      const p = findProp(q.id), o = p.opciones[q.opcion];
      const precio = o.precio == null ? "a cotizar" : money(o.precio * q.cantidad);
      return `• ${q.cantidad} x ${p.nombre} (${o.nombre}) — ${precio}`;
    });
    const total = quote.reduce((t, q) => t + (findProp(q.id).opciones[q.opcion].precio || 0) * q.cantidad, 0);
    return [
      `¡Hola ${TIENDA.nombre}! Quiero pedir una cotización para ${data.get("empresa")}.`,
      "",
      ...lines,
      "",
      `Total estimado: ${money(total)}`,
      "",
      `Contacto: ${data.get("contacto")}`,
      `Email: ${data.get("email")}`,
      data.get("telefono") ? `Teléfono: ${data.get("telefono")}` : null,
      data.get("fecha") ? `Para cuándo: ${data.get("fecha")}` : null,
      data.get("comentarios") ? `Comentarios: ${data.get("comentarios")}` : null,
    ].filter((l) => l !== null).join("\n");
  }

  // ---------- Eventos ----------
  document.addEventListener("click", (e) => {
    const t = e.target.closest("button, [data-ver]");
    if (!t) return;
    if (t.dataset.linea) {
      filtro = t.dataset.linea; renderChips(); renderTags();
    }
    if (t.dataset.ver) openDetail(t.dataset.ver);
    if (t.dataset.qty) {
      const q = quote[t.dataset.qty];
      q.cantidad = Math.max(1, q.cantidad + Number(t.dataset.d));
      save(); renderQuote();
    }
    if (t.dataset.remove) { quote.splice(t.dataset.remove, 1); save(); renderQuote(); }
    if (t.hasAttribute("data-close")) closeDetail();
  });

  $("#detail").addEventListener("click", (e) => { if (e.target.id === "detail") closeDetail(); });
  $("#detailForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const cantidad = Math.max(1, parseInt($("#detailCantidad").value, 10) || 1);
    if (cantidad < current.minimo) {
      toast(`El mínimo para ${current.nombre} es ${current.minimo}`);
      return;
    }
    addToQuote(current.id, Number(e.target.opcion.value), cantidad);
    closeDetail();
  });

  $("#quoteOpen").addEventListener("click", () => openDrawer(true));
  $("#quoteClose").addEventListener("click", () => openDrawer(false));
  $("#overlay").addEventListener("click", () => openDrawer(false));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeDetail(); openDrawer(false); } });

  $("#quoteForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!quote.length) { toast("Sumá al menos una propuesta ✿"); return; }
    const msg = buildMessage(new FormData(e.target));
    if (e.submitter?.dataset.via === "email") {
      const subject = `Cotización · ${e.target.empresa.value}`;
      location.href = `mailto:${TIENDA.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg)}`;
    } else {
      window.open(`https://wa.me/${TIENDA.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    }
    toast("¡Gracias! Te respondemos en menos de 24 hs ✿");
  });

  $("#printBtn").addEventListener("click", () => window.print());
  window.addEventListener("beforeprint", () => {
    filtro = "todas"; renderChips(); renderTags();
    document.querySelectorAll("details").forEach((d) => (d.open = true));
  });

  // ---------- Init ----------
  Flowers.mount();
  renderTienda();
  // Copia de la franja para que en el celular pase como cinta continua (oculta en escritorio)
  const strip = $(".strip__inner");
  strip.insertAdjacentHTML("beforeend", [...strip.children].map((s) => `<span class="strip__clone" aria-hidden="true">${s.innerHTML}</span>`).join(""));
  renderGreeting();
  renderChips();
  renderTags();
  Carrusel.init($("#reels"), PROPUESTAS.map((p) => ({ id: p.id, label: p.nombre, html: media(p) })), (it) => openDetail(it.id));
  renderGallery();
  renderNotes();
  renderFaq();
  renderQuote();
})();
