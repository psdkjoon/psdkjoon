const PALETTE = [
  "rosewater",
  "flamingo",
  "pink",
  "mauve",
  "red",
  "maroon",
  "peach",
  "yellow",
  "green",
  "teal",
  "sky",
  "sapphire",
  "blue",
  "lavender",
];

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

export function initAurora(root, reduced, accent) {
  const pool = accent ? PALETTE.concat(accent, accent) : PALETTE;
  const count = reduced ? 3 : 5;
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    const orb = document.createElement("div");
    orb.className = "bg-orb";

    const size = Math.round(Math.random() * 220 + 220);
    orb.style.width = size + "px";
    orb.style.height = size + "px";
    orb.style.left = Math.random() * 100 + "%";
    orb.style.top = Math.random() * 100 + "%";
    orb.style.background = "radial-gradient(circle, var(--" + pick(pool) + "), transparent 70%)";
    orb.style.setProperty("--dx", Math.round(Math.random() * 120 - 60) + "px");
    orb.style.setProperty("--dy", Math.round(Math.random() * 120 - 60) + "px");
    orb.style.setProperty("--dur", Math.round(Math.random() * 20 + 30) + "s");
    orb.style.animationDelay = "-" + Math.round(Math.random() * 30) + "s";

    fragment.appendChild(orb);
  }

  root.appendChild(fragment);
}
