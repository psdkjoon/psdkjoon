(function () {
  var ACCENTS = [
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

  var name = ACCENTS[Math.floor(Math.random() * ACCENTS.length)];
  var hover = ACCENTS[(ACCENTS.indexOf(name) + 1) % ACCENTS.length];
  var root = document.documentElement;

  root.style.setProperty("--accent", "var(--" + name + ")");
  root.style.setProperty("--accent-hover", "var(--" + hover + ")");
  root.dataset.accent = name;
})();
