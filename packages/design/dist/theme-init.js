(function () {
  try {
    var stored = localStorage.getItem('vds:theme');
    var mode = localStorage.getItem('vds:mode');
    var html = document.documentElement;
    if (stored) html.setAttribute('data-theme', stored);
    if (mode) html.setAttribute('data-mode', mode);
  } catch (e) {}
})();
