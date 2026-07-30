function isPageScrollable() {
  return document.documentElement.scrollHeight > window.innerHeight + 1;
}

function initFooterReveal() {
  var footer = document.querySelector("footer.site-footer");
  if (!footer) return;

  function evaluate() {
    if (isPageScrollable()) {
      footer.classList.remove("is-static");
    } else {
      footer.classList.add("is-visible", "is-static");
    }
  }

  evaluate();

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(evaluate, 150);
  });
  window.addEventListener("load", evaluate);

  if (!("IntersectionObserver" in window)) {
    footer.classList.add("is-visible");
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (footer.classList.contains("is-static")) return;
        if (entry.isIntersecting) {
          footer.classList.add("is-visible");
        } else {
          footer.classList.remove("is-visible");
        }
      });
    },
    { threshold: 0.15 },
  );

  observer.observe(footer);
}

document.addEventListener("DOMContentLoaded", initFooterReveal);
