import { initAurora } from "./background/aurora.js";
import { initNodes } from "./background/nodes.js";
import { initScan } from "./background/scan.js";

const VARIANTS = ["aurora", "grid", "nodes", "scan"];

const BUILDERS = {
  aurora: initAurora,
  nodes: initNodes,
  scan: initScan,
};

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function initBackdrop() {
  const root = document.getElementById("siteBackdrop");
  if (!root) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const variant = pick(VARIANTS);
  const accent = document.documentElement.dataset.accent || "mauve";
  root.classList.add("site-backdrop--" + variant);

  const build = BUILDERS[variant];
  if (build) build(root, reduced, accent);
}

document.addEventListener("DOMContentLoaded", initBackdrop);
