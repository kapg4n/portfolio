(function () {
  "use strict";
  var S = window.SITE;
  var $ = function (sel) { return document.querySelector(sel); };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Colour panel or image for a project
  function art(p, i) {
    var src = p.images && p.images[i || 0];
    if (src) {
      return '<div class="art art--img"><img src="' + esc(src) + '" alt="' + esc(p.title) + ', image ' + ((i || 0) + 1) + '" loading="lazy"></div>';
    }
    return '<div class="art" style="background:' + esc(p.color) + ';color:' + esc(p.ink) + '" aria-hidden="true">' + esc(p.title) + '</div>';
  }

  /* ---------- fill simple text ---------- */
  document.title = S.name + ", " + S.role.toLowerCase();
  document.querySelectorAll("[data-bind]").forEach(function (el) {
    el.textContent = S[el.getAttribute("data-bind")] || "";
  });
  $("#year").textContent = new Date().getFullYear();

  /* ---------- works list ---------- */
  $("#works-count").textContent = S.projects.length + " projects";
  $("#works-list").innerHTML = S.projects.map(function (p, i) {
    return '<li class="work"><button class="work__btn" type="button" data-i="' + i + '">' +
      '<span class="work__title">' + esc(p.title) + '</span>' +
      '<span class="work__type">' + esc(p.type) + '</span>' +
      '<span class="work__year">' + esc(p.year) + '</span>' +
      '</button></li>';
  }).join("");

  /* ---------- services ---------- */
  $("#services-list").innerHTML = S.services.map(function (s) {
    return '<div class="service"><dt>' + esc(s.title) + '</dt><dd>' + esc(s.text) + '</dd></div>';
  }).join("");

  /* ---------- about ---------- */
  $("#about-body").innerHTML = S.about.map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
  $("#clients").textContent = S.clients.join(", ");
  var portrait = $("#portrait");
  portrait.setAttribute("aria-label", "Portrait of " + S.name);
  if (S.portrait) portrait.style.backgroundImage = 'url("' + S.portrait + '")';

  /* ---------- contact ---------- */
  var mail = $("#mail");
  mail.href = "mailto:" + S.email;
  mail.textContent = S.email;
  $("#socials").innerHTML = S.socials.map(function (s) {
    return '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.label) + '</a>';
  }).join("");

  /* ---------- wordmark fits the full width ---------- */
  var mark = $("#wordmark");
  function fitWordmark() {
    var box = mark.parentElement;
    var cs = getComputedStyle(box);
    var avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    mark.style.fontSize = "100px";
    var w = mark.scrollWidth;
    if (w > 0) mark.style.fontSize = Math.floor((100 * avail / w) * 0.995 * 100) / 100 + "px";
  }
  fitWordmark();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitWordmark);
  window.addEventListener("resize", fitWordmark);

  /* ---------- hover preview following the cursor ---------- */
  var peek = $("#peek");
  var list = $("#works-list");
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var current = -1, x = 0, y = 0, px = 0, py = 0, raf = null;
  function loop() {
    px += (x - px) * 0.18;
    py += (y - py) * 0.18;
    peek.style.transform = "translate(" + (px + 24) + "px," + (py - peek.offsetHeight / 2) + "px)";
    raf = requestAnimationFrame(loop);
  }
  if (fine) {
    list.addEventListener("mousemove", function (e) {
      x = e.clientX; y = e.clientY;
      var btn = e.target.closest(".work__btn");
      if (!btn) return;
      var i = +btn.dataset.i;
      if (i !== current) {
        current = i;
        peek.innerHTML = art(S.projects[i], 0);
      }
      if (!peek.classList.contains("is-on")) {
        px = x; py = y;
        peek.classList.add("is-on");
        if (!raf) raf = requestAnimationFrame(loop);
      }
    });
    list.addEventListener("mouseleave", function () {
      peek.classList.remove("is-on");
      cancelAnimationFrame(raf); raf = null; current = -1;
    });
  }

  /* ---------- project overlay, routed by #work/slug ---------- */
  var overlay = $("#project");
  var lastFocus = null;

  function openProject(i) {
    var p = S.projects[i];
    var next = S.projects[(i + 1) % S.projects.length];
    $("#project-title").textContent = p.title;
    $("#project-facts").innerHTML =
      "<div><dt>Work</dt><dd>" + esc(p.type) + "</dd></div>" +
      "<div><dt>Place</dt><dd>" + esc(p.location || "") + "</dd></div>" +
      "<div><dt>Year</dt><dd>" + esc(p.year) + "</dd></div>";
    $("#project-summary").textContent = p.summary;
    var n = Math.max(p.images.length, 3);
    var g = "";
    for (var k = 0; k < n; k++) g += art(p, p.images.length ? k : 0);
    $("#project-gallery").innerHTML = g;
    $("#project-next").innerHTML = '<a href="#work/' + esc(next.slug) + '"><span>Next project</span>' + esc(next.title) + "</a>";
    if (overlay.hidden) lastFocus = document.activeElement;
    overlay.hidden = false;
    overlay.scrollTop = 0;
    document.body.classList.add("is-locked");
    document.title = p.title + ", " + S.name;
    $("#project-close").focus();
    peek.classList.remove("is-on");
  }

  function closeProject() {
    if (overlay.hidden) return;
    overlay.hidden = true;
    document.body.classList.remove("is-locked");
    document.title = S.name + ", " + S.role.toLowerCase();
    if (lastFocus) lastFocus.focus();
  }

  function route() {
    var m = location.hash.match(/^#work\/(.+)$/);
    if (m) {
      var slug = decodeURIComponent(m[1]);
      var i = S.projects.findIndex(function (p) { return p.slug === slug; });
      if (i > -1) return openProject(i);
    }
    closeProject();
  }

  list.addEventListener("click", function (e) {
    var btn = e.target.closest(".work__btn");
    if (btn) location.hash = "work/" + S.projects[+btn.dataset.i].slug;
  });
  $("#project-close").addEventListener("click", function () {
    history.pushState("", document.title, location.pathname + location.search + "#works");
    route();
    var w = document.getElementById("works");
    if (w) w.scrollIntoView({ block: "start" });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !overlay.hidden) $("#project-close").click();
  });
  window.addEventListener("hashchange", route);
  route();
})();
