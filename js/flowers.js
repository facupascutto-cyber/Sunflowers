// Ilustraciones SVG generadas: reemplazables por fotos reales más adelante.
const Flowers = (() => {
  const C = {
    stem: "#5f7f45",
    leaf: "#7c9b5c",
    leafDark: "#4f6b3a",
    seed: "#6b3e1f",
    kraft: "#d9b88a",
    kraftDark: "#c49d6c",
  };

  const deg = (a) => (a * Math.PI) / 180;

  function petals(x, y, r, n, color, rx, ry, offset = 0) {
    let s = "";
    for (let i = 0; i < n; i++) {
      const a = (360 / n) * i + offset;
      const px = x + Math.cos(deg(a)) * r * 0.62;
      const py = y + Math.sin(deg(a)) * r * 0.62;
      s += `<ellipse cx="${px}" cy="${py}" rx="${rx}" ry="${ry}" fill="${color}" transform="rotate(${a + 90} ${px} ${py})"/>`;
    }
    return s;
  }

  const heads = {
    sunflower(x, y, r, color = "#f5b82e") {
      let s = petals(x, y, r, 16, "#e98a3a", r * 0.22, r * 0.5, 11);
      s += petals(x, y, r, 16, color, r * 0.22, r * 0.48);
      s += `<circle cx="${x}" cy="${y}" r="${r * 0.42}" fill="${C.seed}"/>`;
      for (let i = 0; i < 10; i++) {
        const a = i * 137.5;
        const d = r * 0.11 * Math.sqrt(i + 1);
        s += `<circle cx="${x + Math.cos(deg(a)) * d}" cy="${y + Math.sin(deg(a)) * d}" r="${r * 0.05}" fill="#3e2412"/>`;
      }
      return s;
    },
    daisy(x, y, r, color = "#fffaf0") {
      return petals(x, y, r, 14, color, r * 0.16, r * 0.44) +
        `<circle cx="${x}" cy="${y}" r="${r * 0.28}" fill="#f5b82e"/>`;
    },
    rose(x, y, r, color = "#e98a3a") {
      const k = r * 0.85;
      return `<circle cx="${x}" cy="${y}" r="${k}" fill="${color}"/>
        <path d="M${x - k * 0.6} ${y} a${k * 0.6} ${k * 0.6} 0 0 1 ${k * 1.2} 0 a${k * 0.45} ${k * 0.45} 0 0 1 -${k * 0.9} 0 a${k * 0.3} ${k * 0.3} 0 0 1 ${k * 0.55} 0"
          fill="none" stroke="rgba(0,0,0,.18)" stroke-width="${r * 0.1}" stroke-linecap="round"/>`;
    },
    tulip(x, y, r, color = "#e9673a") {
      const w = r * 0.7, h = r;
      return `<path d="M${x - w} ${y - h * 0.4} Q${x - w * 1.05} ${y + h * 0.75} ${x} ${y + h * 0.75}
        Q${x + w * 1.05} ${y + h * 0.75} ${x + w} ${y - h * 0.4} L${x + w * 0.45} ${y - h * 0.05}
        L${x} ${y - h * 0.6} L${x - w * 0.45} ${y - h * 0.05} Z" fill="${color}"/>
        <path d="M${x} ${y - h * 0.6} Q${x - w * 0.3} ${y + h * 0.2} ${x} ${y + h * 0.75}" fill="none" stroke="rgba(0,0,0,.12)" stroke-width="${r * 0.08}"/>`;
    },
    wild(x, y, r, color = "#f3a6a0") {
      let s = "";
      for (let i = 0; i < 5; i++) {
        const a = 72 * i - 90;
        s += `<circle cx="${x + Math.cos(deg(a)) * r * 0.45}" cy="${y + Math.sin(deg(a)) * r * 0.45}" r="${r * 0.42}" fill="${color}"/>`;
      }
      return s + `<circle cx="${x}" cy="${y}" r="${r * 0.22}" fill="#f5b82e"/>`;
    },
    filler(x, y, r, color = "#9db38a") {
      let s = "";
      for (let i = 0; i < 7; i++) {
        const a = i * 51;
        s += `<circle cx="${x + Math.cos(deg(a)) * r * 0.55}" cy="${y + Math.sin(deg(a)) * r * 0.55}" r="${r * 0.28}" fill="${color}"/>`;
      }
      return s;
    },
  };

  // Posiciones de cabezas de flor en un viewBox de 200x200
  const slots = [
    [100, 62, 22], [66, 78, 19], [134, 78, 19], [82, 40, 16],
    [118, 40, 16], [48, 104, 14], [152, 104, 14], [100, 96, 15],
  ];

  function leaf(x, y, angle, size = 1) {
    return `<path d="M0 0 Q${14 * size} ${-10 * size} ${30 * size} 0 Q${14 * size} ${10 * size} 0 0Z"
      fill="${C.leaf}" transform="translate(${x} ${y}) rotate(${angle})"/>`;
  }

  const vessels = {
    wrap(color = C.kraft) {
      return `<path d="M42 104 L158 104 L116 192 L84 192 Z" fill="${color}"/>
        <path d="M42 104 L100 192 L84 192 Z" fill="rgba(0,0,0,.08)"/>
        <path d="M80 158 Q100 150 120 158 L114 168 Q100 162 86 168 Z" fill="#e98a3a"/>`;
    },
    vase(color = "#9db38a") {
      return `<path d="M72 128 Q66 128 68 140 Q60 176 80 192 L120 192 Q140 176 132 140 Q134 128 128 128 Z" fill="${color}"/>
        <ellipse cx="100" cy="129" rx="29" ry="5" fill="rgba(0,0,0,.12)"/>
        <path d="M78 150 Q100 158 122 150" stroke="rgba(255,255,255,.4)" stroke-width="3" fill="none"/>`;
    },
    box(color = "#2f4a2c") {
      return `<rect x="52" y="126" width="96" height="66" rx="6" fill="${color}"/>
        <rect x="48" y="120" width="104" height="14" rx="4" fill="${color}" opacity=".85"/>
        <rect x="94" y="120" width="12" height="72" fill="#f5b82e"/>`;
    },
    basket(color = "#c49d6c") {
      let s = `<path d="M46 124 L154 124 L140 190 L60 190 Z" fill="${color}"/>`;
      for (let i = 0; i < 4; i++) s += `<path d="M${50 + i * 1.5} ${138 + i * 14} L${150 - i * 1.5} ${138 + i * 14}" stroke="rgba(0,0,0,.12)" stroke-width="3"/>`;
      return s + `<path d="M58 124 Q100 60 142 124" stroke="${color}" stroke-width="6" fill="none"/>`;
    },
  };

  function bouquet({ flowers, vessel = "wrap", vesselColor, bg }) {
    const baseY = vessel === "wrap" ? 150 : 140;
    let stems = "", leaves = "", headsSvg = "";
    flowers.slice(0, slots.length).forEach(([type, color], i) => {
      const [x, y, r] = slots[i];
      stems += `<path d="M${x} ${y} Q${(x + 100) / 2} ${(y + baseY) / 2 + 6} 100 ${baseY}" stroke="${C.stem}" stroke-width="3" fill="none"/>`;
      headsSvg += heads[type](x, y, r, color);
    });
    leaves += leaf(70, 112, -150, 1.1) + leaf(130, 112, -30, 1.1) + leaf(82, 100, -120, 0.8) + leaf(118, 100, -60, 0.8);
    const back = bg ? `<circle cx="100" cy="100" r="92" fill="${bg}"/>` : "";
    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${back}${stems}${leaves}${headsSvg}${vessels[vessel](vesselColor)}</svg>`;
  }

  function single(type, color) {
    return `<svg viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${heads[type](30, 30, 26, color)}</svg>`;
  }

  const presets = {
    "girasol-mini": () => single("sunflower"),
    hero: () => bouquet({
      flowers: [["sunflower"], ["rose", "#e98a3a"], ["sunflower"], ["daisy"], ["tulip", "#f5b82e"], ["filler"], ["wild", "#f7c873"], ["rose", "#c45a2a"]],
      bg: "#fde9b3",
    }),
    about: () => bouquet({
      flowers: [["sunflower"], ["sunflower"], ["sunflower"], ["filler"], ["filler"], ["daisy"], ["daisy"]],
      vessel: "vase", vesselColor: "#4f6b3a",
    }),
  };

  function mount(root = document) {
    root.querySelectorAll("[data-flower]").forEach((el) => {
      const p = presets[el.dataset.flower];
      if (p) el.innerHTML = p();
    });
  }

  return { bouquet, single, mount };
})();
