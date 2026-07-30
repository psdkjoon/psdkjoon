function hexToRgba(hex, alpha) {
  var h = hex.replace("#", "").trim();
  if (h.length === 3) {
    h = h
      .split("")
      .map(function (c) {
        return c + c;
      })
      .join("");
  }
  var r = parseInt(h.substring(0, 2), 16);
  var g = parseInt(h.substring(2, 4), 16);
  var b = parseInt(h.substring(4, 6), 16);
  return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
}

export function initNodes(root, reduced, accent) {
  const canvas = document.createElement("canvas");
  canvas.className = "bg-canvas";
  root.appendChild(canvas);

  const styles = getComputedStyle(document.documentElement);
  const accentHex = styles.getPropertyValue("--" + accent).trim() || "#89b4fa";
  const textHex = styles.getPropertyValue("--text").trim() || "#cdd6f4";
  const dotColor = hexToRgba(textHex, 0.5);
  const lineColor = hexToRgba(accentHex, 0.18);

  const ctx = canvas.getContext("2d");
  let nodes = [];
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function seed() {
    const count = Math.min(60, Math.round((width * height) / 28000));
    nodes = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = dotColor;
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 1;

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (!reduced) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
      for (let j = i + 1; j < nodes.length; j++) {
        const m = nodes[j];
        const dx = n.x - m.x;
        const dy = n.y - m.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.globalAlpha = 1 - dist / 140;
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.lineTo(m.x, m.y);
          ctx.stroke();
        }
      }
    }

    ctx.globalAlpha = 1;
    for (let i = 0; i < nodes.length; i++) {
      ctx.beginPath();
      ctx.arc(nodes[i].x, nodes[i].y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function loop() {
    draw();
    if (!reduced) requestAnimationFrame(loop);
  }

  resize();
  seed();
  loop();

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      seed();
      if (reduced) draw();
    }, 200);
  });
}
