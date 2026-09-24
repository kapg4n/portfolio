(function () {
  "use strict";
  var S = window.SITE;
  var $ = function (sel) { return document.querySelector(sel); };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Colour panel or image for a project, at image index i
  function art(p, i) {
    var src = p.images && p.images[i || 0];
    if (src) {
      return '<div class="art art--img"><img src="' + esc(src) + '" alt="' + esc(p.title) + ', image ' + ((i || 0) + 1) + '" loading="lazy"></div>';
    }
    return '<div class="art" style="background:' + esc(p.color) + ';color:' + esc(p.ink) + '" aria-hidden="true">' + esc(p.title) + '</div>';
  }

  // 4:5 thumbnail for the works grid — prefers a portrait plate, falls back to the panel
  function thumb(p) {
    var src = (p.images && (p.images[1] || p.images[0]));
    if (src) return '<img src="' + esc(src) + '" alt="' + esc(p.title) + '" loading="lazy">';
    return '<div class="art" style="background:' + esc(p.color) + ';color:' + esc(p.ink) + '" aria-hidden="true">' + esc(p.title) + '</div>';
  }

  /* ---------- fill simple text ---------- */
  document.title = S.name + ", " + S.role.toLowerCase();
  document.querySelectorAll("[data-bind]").forEach(function (el) {
    el.textContent = S[el.getAttribute("data-bind")] || "";
  });
  $("#year").textContent = new Date().getFullYear();

  /* ---------- works grid ---------- */
  $("#works-list").innerHTML = S.projects.map(function (p, i) {
    return '<li class="work"><button class="work__card" type="button" data-i="' + i + '">' +
      '<span class="work__media">' + thumb(p) + '</span>' +
      '<span class="work__title">' + esc(p.title) + '</span>' +
      '<span class="work__desc">' + esc(p.type) + '</span>' +
      '</button></li>';
  }).join("");

  /* ---------- services ---------- */
  $("#services-list").innerHTML = S.services.map(function (s) {
    return '<div class="service"><dt class="service__title">' + esc(s.title) + '</dt>' +
      (s.text ? '<dd class="service__text">' + esc(s.text) + '</dd>' : '<dd></dd>') +
      '</div>';
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

  /* ---------- mobile menu ---------- */
  var toggle = $("#menu-toggle");
  var nav = $("#site-nav");
  function closeMenu() {
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "Menu";
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
    });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) closeMenu(); });
  }

  /* ---------- header goes solid once the page slides over the cover ---------- */
  var header = $("#site-header");
  var page = $("#page");
  function syncHeader() {
    if (!header) return;
    var trigger = (page ? page.offsetTop : window.innerHeight) - header.offsetHeight;
    header.classList.toggle("is-solid", window.scrollY >= trigger - 1);
  }
  window.addEventListener("scroll", syncHeader, { passive: true });
  window.addEventListener("resize", syncHeader);
  syncHeader();

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

  $("#works-list").addEventListener("click", function (e) {
    var btn = e.target.closest(".work__card");
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
    if (e.key === "Escape" && document.body.classList.contains("nav-open")) closeMenu();
  });
  window.addEventListener("hashchange", route);
  route();
})();
