// Theme toggle: cycles system → dark → light. Preference kept in localStorage.
(function () {
  var KEY = "theme";
  var root = document.documentElement;
  var btn = document.getElementById("themeBtn");
  if (!btn) return;

  function apply(v) {
    if (v === "dark" || v === "light") root.setAttribute("data-theme", v);
    else root.removeAttribute("data-theme");
  }
  function saved() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function systemDark() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  apply(saved());

  btn.addEventListener("click", function () {
    var current = root.getAttribute("data-theme") || (systemDark() ? "dark" : "light");
    var next = current === "dark" ? "light" : "dark";
    apply(next);
    try { localStorage.setItem(KEY, next); } catch (e) {}
  });
})();
