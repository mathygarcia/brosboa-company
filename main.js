/* ===========================================================
   BROS BALBOA — interactions (vanilla, IIFE, no deps)
   =========================================================== */
(function () {
  "use strict";

  // run an init in isolation: one failure never breaks the rest
  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[BB] init failed:", name, e); }
  }

  // ---- splash safety net (CSS hides at 2.4s; JS backstops it) ----
  safe(function splash() {
    var s = document.getElementById("splash");
    if (!s) return;
    function hide() { s.classList.add("is-hidden"); }
    window.setTimeout(hide, 3200);
    window.addEventListener("load", function () { window.setTimeout(hide, 2400); });
  }, "splash");

  // ---- year ----
  safe(function year() {
    var y = document.getElementById("year");
    if (y) y.textContent = String(new Date().getFullYear());
  }, "year");

  // ---- nav scrolled state + scroll progress ----
  safe(function scrollState() {
    var nav = document.getElementById("nav");
    var bar = document.querySelector(".scroll-progress i");
    function onScroll() {
      var sc = window.pageYOffset || document.documentElement.scrollTop;
      if (nav) nav.classList.toggle("is-scrolled", sc > 40);
      if (bar) {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (h > 0 ? (sc / h) * 100 : 0) + "%";
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }, "scrollState");

  // ---- hero entrance ----
  safe(function hero() {
    var h = document.querySelector(".hero");
    if (h) window.setTimeout(function () { h.classList.add("is-in"); }, 200);
  }, "hero");

  // ---- reveal on scroll (threshold low + safety reveal) ----
  safe(function reveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-in"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("is-in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -8% 0px" });

    els.forEach(function (el, i) {
      // light stagger inside the same container row
      el.style.transitionDelay = (Math.min(i % 4, 3) * 0.07) + "s";
      io.observe(el);
    });

    // safety: anything still hidden after 6s gets revealed
    window.setTimeout(function () {
      els.forEach(function (el) { el.classList.add("is-in"); });
    }, 6000);
  }, "reveal");

  // ---- count up stats ----
  safe(function counters() {
    var nums = Array.prototype.slice.call(document.querySelectorAll(".stat__num[data-count]"));
    if (!nums.length || !("IntersectionObserver" in window)) {
      nums.forEach(function (n) { n.textContent = n.getAttribute("data-count"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        io.unobserve(el);
        var target = parseInt(el.getAttribute("data-count"), 10) || 0;
        var start = null, dur = 1400;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target);
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.4 });
    nums.forEach(function (n) { io.observe(n); });
  }, "counters");

  // ---- smooth anchor scroll ----
  safe(function anchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (id.length < 2) return;
        var t = document.querySelector(id);
        if (!t) return;
        e.preventDefault();
        window.scrollTo({ top: t.getBoundingClientRect().top + window.pageYOffset - 60, behavior: "smooth" });
        closeMenu();
      });
    });
  }, "anchors");

  // ---- mobile menu ----
  var burger = document.getElementById("burger");
  var menu = document.getElementById("mobilemenu");
  function closeMenu() {
    if (burger) { burger.classList.remove("is-open"); burger.setAttribute("aria-expanded", "false"); }
    if (menu) menu.classList.remove("is-open");
  }
  safe(function mobile() {
    if (!burger || !menu) return;
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
    menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  }, "mobile");

  // ---- custom cursor (desktop only) ----
  safe(function cursor() {
    if (window.matchMedia("(hover:none)").matches) return;
    var c = document.querySelector(".cursor");
    if (!c) return;
    var x = 0, y = 0, cx = 0, cy = 0, active = false;
    window.addEventListener("mousemove", function (e) {
      x = e.clientX; y = e.clientY;
      if (!active) { active = true; c.classList.add("is-active"); cx = x; cy = y; }
    });
    document.querySelectorAll("a,button,.magnetic,.service,.plan,.bro").forEach(function (el) {
      el.addEventListener("mouseenter", function () { c.classList.add("is-hover"); });
      el.addEventListener("mouseleave", function () { c.classList.remove("is-hover"); });
    });
    (function loop() {
      cx += (x - cx) * 0.18; cy += (y - cy) * 0.18;
      c.style.transform = "translate(" + cx + "px," + cy + "px) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    })();
  }, "cursor");

  // ---- magnetic buttons ----
  safe(function magnetic() {
    if (window.matchMedia("(hover:none)").matches) return;
    document.querySelectorAll(".magnetic").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var mx = e.clientX - r.left - r.width / 2;
        var my = e.clientY - r.top - r.height / 2;
        el.style.transform = "translate(" + mx * 0.25 + "px," + my * 0.35 + "px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }, "magnetic");

  // ---- 3D tilt on cards (desktop only) ----
  safe(function tilt() {
    if (window.matchMedia("(hover:none)").matches) return;
    var cards = Array.prototype.slice.call(document.querySelectorAll(".service,.plan,.bro"));
    cards.forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform =
          "perspective(900px) rotateX(" + (-py * 5) + "deg) rotateY(" + (px * 5) + "deg) translateY(-6px)";
      });
      el.addEventListener("mouseleave", function () { el.style.transform = ""; });
    });
  }, "tilt");

  // ---- service card glow follows mouse ----
  safe(function serviceGlow() {
    document.querySelectorAll(".service").forEach(function (el) {
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty("--mx", (e.clientX - r.left) + "px");
        el.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    });
  }, "serviceGlow");

})();
