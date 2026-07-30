document.addEventListener("DOMContentLoaded", function () {
  var footerYearEl = document.getElementById("footerYear");
  if (footerYearEl) footerYearEl.textContent = new Date().getFullYear();
});
