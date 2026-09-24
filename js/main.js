(function () {
  "use strict";
  var S = window.SITE;
  var $ = function (sel) { return document.querySelector(sel); };
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  // Layered thumbnail for a grid card. Wide cards use images[0] (16:9) with
  // images[1] as the hover image; regular cards use images[1] with images[2].
  function workMedia(p, wide) {
    var imgs = p.images || [];
    var primary = wide ? imgs[0] : imgs[1];
    var secondary = wide ? imgs[1] : imgs[2];
    if (!primary) {
      return '<div class="art" style="background:' + esc(p.color) + ';color:' + esc(p.ink) + '" aria-hidden="true">' + esc(p.title) + '</div>';
    }
    var html = '<img class="work__img work__img--a" src="' + esc(primary) + '" alt="' + esc(p.title) + '" loading="lazy">';
    if (secondary && secondary !== primary) {
      html += '<img class="work__img work__img--b" src="' + esc(secondary) + '" alt="" aria-hidden="true" loading="lazy">';
    }
    return html;
  }

  /* ---------- fill simple text ---------- */
  document.title = S.name + ", " + S.role.toLowerCase();
  document.querySelectorAll("[data-bind]").forEach(function (el) {
    el.textContent = S[el.getAttribute("data-bind")] || "";
  });
  $("#year").textContent = new Date().getFullYear();

  /* ---------- featured project ---------- */
  var featuredSlug = "";
  (function () {
    var cfg = S.featured;
    var sec = $("#featured");
    if (!sec || !cfg) return;
    var fp = S.projects.filter(function (p) { return p.slug === cfg.slug; })[0];
    if (!fp) return;
    featuredSlug = fp.slug;

    var media = $("#featured-media");
    if (cfg.video) {
      if (reduce) {
        var still = cfg.poster || (fp.images && fp.images[0]);
        media.innerHTML = still ? '<img src="' + esc(still) + '" alt="' + esc(fp.title) + '">' : "";
      } else {
        media.innerHTML = '<video muted autoplay loop playsinline preload="metadata"' +
          (cfg.poster ? ' poster="' + esc(cfg.poster) + '"' : "") +
          '><source src="' + esc(cfg.video) + '"></video>';
      }
    } else {
      var imgs = (fp.images || []).filter(Boolean);
      if (!imgs.length) {
        media.innerHTML = '<div class="art" style="background:' + esc(fp.color) + ';color:' + esc(fp.ink) + '" aria-hidden="true">' + esc(fp.title) + '</div>';
      } else if (reduce || imgs.length === 1) {
        media.innerHTML = '<img src="' + esc(imgs[0]) + '" alt="' + esc(fp.title) + '">';
      } else {
        media.innerHTML = imgs.map(function (src, i) {
          return '<img class="featured__slide' + (i === 0 ? " is-active" : "") + '" src="' + esc(src) + '"' +
            (i === 0 ? ' alt="' + esc(fp.title) + '"' : ' alt="" aria-hidden="true"') + ' loading="lazy">';
        }).join("");
      }
    }

    $("#featured-h").textContent = fp.title;
    $("#featured-facts").textContent = [fp.type, fp.year].filter(Boolean).join(" · ");
    $("#featured-link").setAttribute("href", "#work/" + fp.slug);
    sec.hidden = false;

    // pause the crossfade / video while the section is off screen
    if ("IntersectionObserver" in window) {
      var slides = media.querySelectorAll(".featured__slide");
      var vid = media.querySelector("video");
      var timer = null, idx = 0;
      new IntersectionObserver(function (entries) {
        var on = entries[0].isIntersecting;
        if (vid) { on ? (vid.play && vid.play().catch(function () {})) : (vid.pause && vid.pause()); }
        if (slides.length > 1 && !reduce) {
          if (on && !timer) {
            timer = setInterval(function () {
              slides[idx].classList.remove("is-active");
              idx = (idx + 1) % slides.length;
              slides[idx].classList.add("is-active");
            }, 3500);
          } else if (!on && timer) { clearInterval(timer); timer = null; }
        }
      }, { threshold: 0.2 }).observe(sec);
    }
  })();

  /* ---------- works grid ---------- */
  var vi = -1; // visible index (featured is skipped) drives the wide/pair rhythm
  $("#works-list").innerHTML = S.projects.map(function (p, i) {
    if (p.slug === featuredSlug) return "";
    vi++;
    var wide = (vi % 3 === 0);
    var meta = [p.type, p.year, p.location].filter(Boolean).join(" · ");
    return '<li class="work' + (wide ? " work--wide" : "") + '"><button class="work__card" type="button" data-i="' + i + '">' +
      '<span class="work__media">' + workMedia(p, wide) + '</span>' +
      '<span class="work__title">' + esc(p.title) + '</span>' +
      '<span class="work__desc">' + esc(meta) + '</span>' +
      '</button></li>';
  }).join("");

  /* ---------- services ---------- */
  $("#services-list").innerHTML = S.services.map(function (s) {
    var items = (s.items && s.items.length)
      ? '<p class="service__items">' + s.items.map(esc).join(" · ") + '</p>' : "";
    return '<div class="service"><dt class="service__title">' + esc(s.title) + '</dt>' +
      '<dd class="service__text">' + (s.text ? esc(s.text) : "") + items + '</dd>' +
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

  /* ---------- header CTA (mailto with prefilled subject) ---------- */
  var ctaHref = "mailto:" + S.email + "?subject=" + encodeURIComponent("New project enquiry");
  document.querySelectorAll(".site-header__cta").forEach(function (a) { a.href = ctaHref; });

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

  /* ---------- "recalibrating" letter scramble on the wordmark ---------- */
  (function () {
    var word = $("#intro-word");
    if (!word) return;
    if (reduce) return;
    var final = word.getAttribute("data-final") || word.textContent;
    var glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%*+=/<>";
    var lockAt = [];
    for (var i = 0; i < final.length; i++) lockAt[i] = 10 + i * 3;
    var last = lockAt[final.length - 1];
    var frame = 0;
    function tick() {
      var out = "";
      for (var j = 0; j < final.length; j++) {
        if (final[j] === " ") { out += " "; continue; }
        out += frame >= lockAt[j] ? final[j] : glyphs[(Math.random() * glyphs.length) | 0];
      }
      word.textContent = out;
      if (frame++ < last) requestAnimationFrame(tick); else word.textContent = final;
    }
    setTimeout(function () { requestAnimationFrame(tick); }, 260);
  })();

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
