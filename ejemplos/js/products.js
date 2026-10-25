// Catálogo de ejemplo. Precios en ARS.
const CATEGORIES = ["Todos", "Ramos", "Arreglos", "Girasoles", "Cajas", "Plantas"];

const PRODUCTS = [
  {
    id: "sol-de-campo", name: "Sol de Campo", category: "Girasoles", price: 32000, tag: "Más vendido",
    desc: "Girasoles de estación con eucalipto y papel kraft.",
    art: { flowers: [["sunflower"], ["sunflower"], ["sunflower"], ["filler"], ["filler"]], bg: "#fde9b3" },
  },
  {
    id: "atardecer-porteno", name: "Atardecer Porteño", category: "Ramos", price: 38500,
    desc: "Rosas naranjas, tulipanes y girasoles en tonos cálidos.",
    art: { flowers: [["rose", "#e98a3a"], ["tulip", "#f5b82e"], ["sunflower"], ["rose", "#c45a2a"], ["tulip", "#e9673a"], ["filler"]], bg: "#fbe2c8" },
  },
  {
    id: "pradera", name: "Pradera", category: "Ramos", price: 27000,
    desc: "Flores silvestres, margaritas y follaje fresco.",
    art: { flowers: [["daisy"], ["wild", "#f7c873"], ["daisy"], ["wild", "#f3a6a0"], ["filler"], ["daisy"], ["wild", "#e98a3a"]], bg: "#dfe8d3" },
  },
  {
    id: "canasta-otono", name: "Canasta de Otoño", category: "Arreglos", price: 46000, tag: "Nuevo",
    desc: "Arreglo en canasta de mimbre con flores de estación.",
    art: { flowers: [["sunflower"], ["rose", "#c45a2a"], ["rose", "#e98a3a"], ["filler"], ["wild", "#f7c873"], ["filler"]], vessel: "basket", bg: "#f6dcc0" },
  },
  {
    id: "jarron-recepcion", name: "Jarrón Recepción", category: "Arreglos", price: 58000,
    desc: "Arreglo alto en jarrón de cerámica, ideal para recepciones.",
    art: { flowers: [["tulip", "#f5b82e"], ["tulip", "#e9673a"], ["tulip", "#f5b82e"], ["filler"], ["filler"], ["tulip", "#e98a3a"], ["tulip", "#c45a2a"]], vessel: "vase", vesselColor: "#e98a3a", bg: "#fdf0d0" },
  },
  {
    id: "caja-girasol", name: "Caja Girasol", category: "Cajas", price: 42000,
    desc: "Caja de regalo con girasoles y lazo amarillo.",
    art: { flowers: [["sunflower"], ["sunflower"], ["sunflower"], ["daisy"], ["daisy"]], vessel: "box", bg: "#dfe8d3" },
  },
  {
    id: "caja-dulce", name: "Caja Dulce", category: "Cajas", price: 49500, tag: "Regalo",
    desc: "Rosas y margaritas en caja + bombones artesanales.",
    art: { flowers: [["rose", "#f3a6a0"], ["rose", "#e98a3a"], ["daisy"], ["rose", "#f7c873"], ["daisy"], ["filler"]], vessel: "box", vesselColor: "#c45a2a", bg: "#fbe2c8" },
  },
  {
    id: "girasol-xl", name: "Girasoles XL", category: "Girasoles", price: 54000,
    desc: "Ramo abundante de 12 girasoles. Para sorprender en grande.",
    art: { flowers: [["sunflower"], ["sunflower"], ["sunflower"], ["sunflower"], ["sunflower"], ["sunflower"], ["sunflower"], ["sunflower"]], bg: "#fde9b3" },
  },
  {
    id: "maceta-verde", name: "Maceta Verde", category: "Plantas", price: 24000,
    desc: "Planta de interior en maceta de barro. Fácil cuidado.",
    art: { flowers: [["filler", "#7c9b5c"], ["filler", "#9db38a"], ["filler", "#4f6b3a"], ["filler"], ["filler", "#7c9b5c"]], vessel: "vase", vesselColor: "#c45a2a", bg: "#dfe8d3" },
  },
];

const PLANS = [
  {
    name: "Oficina Viva", icon: ["filler", "#9db38a"],
    price: "desde <strong>$85.000</strong>/mes",
    desc: "Flores frescas todas las semanas para recepción y espacios comunes.",
    items: ["Entrega semanal programada", "Recambio y mantenimiento", "Diseño según tu marca"],
  },
  {
    name: "Eventos", icon: ["sunflower"], featured: true,
    price: "cotización a medida",
    desc: "Centros de mesa, ambientación y escenografía floral para tu evento.",
    items: ["Visita y propuesta de diseño", "Montaje y desmontaje", "Desde 20 hasta 500 personas"],
  },
  {
    name: "Regalos Empresariales", icon: ["rose", "#e98a3a"],
    price: "desde <strong>$22.000</strong>/unidad",
    desc: "Ramos y cajas para clientes, colaboradores y fechas especiales.",
    items: ["Tarjeta con tu logo", "Envíos masivos a múltiples direcciones", "Descuento por volumen"],
  },
];
