// =====================================================================
//  CATÁLOGO SUNFLOWERS · Este es el único archivo que hace falta editar
//  para cambiar datos de contacto, propuestas, precios y fechas.
// =====================================================================

const TIENDA = {
  nombre: "Sunflowers",
  whatsapp: "543757520044", // formato internacional, sin + ni espacios
  whatsappVisible: "+54 3757 52-0044",
  email: "empresas@sunflowers.com.ar",
  instagram: "sunflowers.ba",
  direccion: "Palermo, CABA",
  horario: "Lun a Sáb · 9 a 19 hs",
  temporada: "Catálogo 2026",
};

// Líneas de servicio (filtros del catálogo). El id se usa en el link: ?ver=regalos
const LINEAS = [
  { id: "oficinas", nombre: "Oficinas", desc: "Flores y plantas todas las semanas" },
  { id: "regalos", nombre: "Regalos", desc: "Para clientes y colaboradores" },
  { id: "eventos", nombre: "Eventos", desc: "Ambientación y centros de mesa" },
  { id: "fechas", nombre: "Fechas especiales", desc: "Campañas para fechas especiales" },
  { id: "experiencias", nombre: "Experiencias", desc: "Talleres para equipos" },
];

// unidad: "unidad" | "mes" | "persona" | "evento"
// precio: null = "a cotizar"
// foto: ruta a la imagen en /img. Si se borra, se muestra la ilustración (arte).
const PROPUESTAS = [
  {
    id: "recepcion-viva", linea: "oficinas", nombre: "Recepción Viva", tag: "Más pedido",
    foto: "img/recepcion-viva.jpg",
    desc: "Un arreglo de estación en tu recepción, renovado cada semana por nuestro equipo.",
    incluye: ["Entrega y recambio semanal", "Florero o jarrón en comodato", "Mantenimiento de agua y poda", "Diseño en los colores de tu marca"],
    unidad: "mes", minimo: 1,
    opciones: [{ nombre: "Arreglo mediano", precio: 85000 }, { nombre: "Arreglo alto", precio: 120000 }],
    arte: { flowers: [["tulip", "#f5b82e"], ["tulip", "#e9673a"], ["tulip", "#f5b82e"], ["filler"], ["filler"], ["tulip", "#e98a3a"], ["tulip", "#c45a2a"]], vessel: "vase", vesselColor: "#e98a3a" },
  },
  {
    id: "oficina-completa", linea: "oficinas", nombre: "Oficina Completa",
    foto: "img/oficina-completa.jpg",
    desc: "Recepción, salas de reunión y puestos de trabajo con flores frescas todos los lunes.",
    incluye: ["Arreglo principal para recepción", "Floreros chicos para salas y puestos", "Recambio semanal", "Ejecutivo de cuenta dedicado"],
    unidad: "mes", minimo: 1,
    opciones: [{ nombre: "Hasta 10 puestos", precio: 190000 }, { nombre: "Hasta 25 puestos", precio: 320000 }, { nombre: "Más de 25 puestos", precio: null }],
    arte: { flowers: [["sunflower"], ["daisy"], ["sunflower"], ["filler"], ["wild", "#f7c873"], ["daisy"], ["filler"]], vessel: "vase", vesselColor: "#4f6b3a" },
  },
  {
    id: "plantas-interior", linea: "oficinas", nombre: "Plantas de Interior",
    foto: "img/plantas-interior.jpg",
    desc: "Instalamos plantas en macetas de barro y las cuidamos por vos. Verde que dura.",
    incluye: ["Relevamiento de luz y espacios", "Macetas de barro o cerámica", "Visita quincenal de mantenimiento", "Reposición sin cargo"],
    unidad: "mes", minimo: 1,
    opciones: [{ nombre: "Pack 5 plantas", precio: 60000 }, { nombre: "Pack 12 plantas", precio: 125000 }],
    arte: { flowers: [["filler", "#7c9b5c"], ["filler", "#9db38a"], ["filler", "#4f6b3a"], ["filler"], ["filler", "#7c9b5c"]], vessel: "vase", vesselColor: "#c45a2a" },
  },
  {
    id: "ramo-corporativo", linea: "regalos", nombre: "Ramo Corporativo", tag: "Con tu logo",
    foto: "img/ramo-corporativo.jpg",
    desc: "Ramos envueltos en papel kraft con tarjeta impresa con tu marca y mensaje.",
    incluye: ["Flores de estación", "Tarjeta personalizada con logo", "Envío a múltiples direcciones", "Seguimiento de cada entrega"],
    unidad: "unidad", minimo: 10,
    opciones: [{ nombre: "Chico", precio: 22000 }, { nombre: "Mediano", precio: 32000 }, { nombre: "Grande", precio: 45000 }],
    arte: { flowers: [["rose", "#e98a3a"], ["tulip", "#f5b82e"], ["sunflower"], ["rose", "#c45a2a"], ["tulip", "#e9673a"], ["filler"]] },
  },
  {
    id: "caja-girasol", linea: "regalos", nombre: "Caja Girasol",
    foto: "img/caja-girasol.jpg",
    desc: "Caja rígida con girasoles y cinta amarilla. Un regalo que se recuerda.",
    incluye: ["Caja rígida con tapa", "Cinta y sticker con tu logo", "Tarjeta personalizada", "Envío en CABA incluido"],
    unidad: "unidad", minimo: 10,
    opciones: [{ nombre: "Caja estándar", precio: 38000 }, { nombre: "Caja + bombones", precio: 46000 }],
    arte: { flowers: [["sunflower"], ["sunflower"], ["sunflower"], ["daisy"], ["daisy"]], vessel: "box" },
  },
  {
    id: "kit-bienvenida", linea: "regalos", nombre: "Kit Bienvenida",
    foto: "img/kit-bienvenida.jpg",
    desc: "Para recibir a quienes se suman al equipo: una planta chica, maceta y tarjeta.",
    incluye: ["Suculenta o potus en maceta", "Tarjeta de bienvenida", "Bolsa kraft con logo", "Entrega en oficina o domicilio"],
    unidad: "unidad", minimo: 5,
    opciones: [{ nombre: "Kit simple", precio: 18000 }, { nombre: "Kit + taza de cerámica", precio: 27000 }],
    arte: { flowers: [["filler", "#7c9b5c"], ["filler", "#9db38a"], ["filler"]], vessel: "basket" },
  },
  {
    id: "centros-de-mesa", linea: "eventos", nombre: "Centros de Mesa",
    foto: "img/centros-de-mesa.jpg",
    desc: "Arreglos bajos para cenas, almuerzos de equipo y eventos con clientes.",
    incluye: ["Diseño según la paleta del evento", "Recipientes incluidos", "Entrega y armado en el lugar", "Retiro al finalizar"],
    unidad: "unidad", minimo: 10,
    opciones: [{ nombre: "Bajo clásico", precio: 18000 }, { nombre: "Bajo abundante", precio: 26000 }],
    arte: { flowers: [["rose", "#f3a6a0"], ["sunflower"], ["daisy"], ["filler"], ["rose", "#e98a3a"], ["filler"], ["wild", "#f7c873"]], vessel: "basket", vesselColor: "#c49d6c" },
  },
  {
    id: "ambientacion", linea: "eventos", nombre: "Ambientación de Eventos", tag: "A medida",
    foto: "img/ambientacion.jpg",
    desc: "Lanzamientos, aniversarios y fiestas de fin de año. Diseñamos la escenografía floral completa.",
    incluye: ["Visita técnica al lugar", "Propuesta de diseño con bocetos", "Montaje y desmontaje", "Equipo presente durante el evento"],
    unidad: "evento", minimo: 1,
    opciones: [{ nombre: "Hasta 100 personas", precio: null }, { nombre: "Más de 100 personas", precio: null }],
    arte: { flowers: [["sunflower"], ["rose", "#e98a3a"], ["sunflower"], ["daisy"], ["tulip", "#f5b82e"], ["filler"], ["wild", "#f7c873"], ["rose", "#c45a2a"]] },
  },
  {
    id: "dia-de-la-mujer", linea: "fechas", nombre: "Una Flor por Persona",
    foto: "img/dia-de-la-mujer.jpg",
    desc: "Una flor envuelta con tarjeta para cada persona del equipo. Ideal para el 8M o el Día de la Secretaria.",
    incluye: ["Flor individual envuelta", "Tarjeta con mensaje de la empresa", "Entrega en oficina", "Distribución por piso o área"],
    unidad: "unidad", minimo: 20,
    opciones: [{ nombre: "Girasol", precio: 6500 }, { nombre: "Rosa", precio: 7500 }],
    arte: { flowers: [["sunflower"]] },
  },
  {
    id: "caja-fin-de-ano", linea: "fechas", nombre: "Caja Fin de Año", tag: "Temporada",
    foto: "img/caja-fin-de-ano.jpg",
    desc: "Caja navideña con flores, vela de soja y una tarjeta para cerrar el año con clientes y equipo.",
    incluye: ["Flores de estación", "Vela artesanal de soja", "Tarjeta con logo", "Envío a múltiples direcciones"],
    unidad: "unidad", minimo: 10,
    opciones: [{ nombre: "Caja clásica", precio: 52000 }, { nombre: "Caja premium + vino", precio: 78000 }],
    arte: { flowers: [["rose", "#c45a2a"], ["rose", "#e98a3a"], ["daisy"], ["rose", "#f7c873"], ["daisy"], ["filler"]], vessel: "box", vesselColor: "#c45a2a" },
  },
  {
    id: "workshop-floral", linea: "experiencias", nombre: "Workshop Floral",
    foto: "img/workshop-floral.jpg",
    desc: "Un taller de armado de ramos para equipos. Cada persona se lleva el suyo.",
    incluye: ["2 horas con florista", "Todas las flores y materiales", "En tu oficina o en nuestro taller", "Café y algo dulce"],
    unidad: "persona", minimo: 8,
    opciones: [{ nombre: "En nuestro taller", precio: 28000 }, { nombre: "En tu oficina", precio: 32000 }],
    arte: { flowers: [["wild", "#f3a6a0"], ["daisy"], ["wild", "#f7c873"], ["filler"], ["daisy"], ["wild", "#e98a3a"]] },
  },
];

// Fotos de la sección "del taller"
const GALERIA = [
  { foto: "img/taller-1.jpg", texto: "tulipanes recién llegados" },
  { foto: "img/taller-2.jpg", texto: "armando ramos de otoño" },
  { foto: "img/taller-3.jpg", texto: "rosas para un aniversario" },
  { foto: "img/taller-4.jpg", texto: "cosmos de estación" },
  { foto: "img/taller-5.jpg", texto: "hortensias para una recepción" },
  { foto: "img/taller-6.jpg", texto: "amapolas del campo" },
];

const TESTIMONIOS = [
  { texto: "Todos los lunes llegan flores nuevas a la oficina. Cambió el clima del equipo.", autor: "Estudio Norte", detalle: "Arquitectura · Palermo" },
  { texto: "Nos armaron 120 cajas de fin de año con nuestra tarjeta. Llegaron todas, impecables.", autor: "Agencia Brote", detalle: "Marketing · Núñez" },
  { texto: "El workshop fue la mejor actividad de equipo del año. Todavía hablan de eso.", autor: "Fintech Ceibo", detalle: "Tecnología · Microcentro" },
];

const PREGUNTAS = [
  { q: "¿Con cuánta anticipación tengo que pedir?", a: "Para regalos hasta 50 unidades, 72 hs. Para cantidades mayores o eventos, recomendamos 2 semanas. En fechas pico (fin de año, Día de la Madre) conviene reservar con un mes." },
  { q: "¿Hacen envíos a varias direcciones?", a: "Sí. Nos pasás una planilla con direcciones y mensajes, y te mandamos el seguimiento de cada entrega." },
  { q: "¿Dónde entregan?", a: "CABA y GBA norte y oeste sin costo adicional en pedidos corporativos. Consultanos por otras zonas." },
  { q: "¿Los precios son finales?", a: "Son precios de referencia, sin IVA. Cada propuesta se ajusta según cantidades, fechas y flores de estación." },
];
