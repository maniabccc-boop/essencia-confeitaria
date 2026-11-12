/* ==========================================================================
   DOCE ENCANTO CONFEITARIA — main.js
   Interações: header, menu mobile, filtros, galeria/lightbox,
   slider de depoimentos, reveal on scroll, WhatsApp, fallback de imagens.
   ========================================================================== */

(function () {
  "use strict";

  var WHATSAPP_NUMBER = "5542984244337"; // Essência da Confeitaria — (42) 98424-4337

  /* ------------------------------------------------------------------
     Header: estado ao rolar
  ------------------------------------------------------------------ */
  var header = document.querySelector(".header");

  function onScrollHeader() {
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ------------------------------------------------------------------
     Menu mobile
  ------------------------------------------------------------------ */
  var navToggle = document.getElementById("navToggle");
  var nav = document.getElementById("nav");

  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    header.classList.toggle("menu-open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    document.body.style.overflow = open ? "hidden" : "";
  }

  navToggle.addEventListener("click", function () {
    setMenu(!nav.classList.contains("is-open"));
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () { setMenu(false); });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setMenu(false);
      navToggle.focus();
    }
  });

  /* ------------------------------------------------------------------
     Link ativo na navegação conforme a seção visível
  ------------------------------------------------------------------ */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  /* ------------------------------------------------------------------
     Reveal on scroll
  ------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll("[data-reveal]");

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ------------------------------------------------------------------
     Filtro do cardápio
  ------------------------------------------------------------------ */
  var filterButtons = document.querySelectorAll(".filter__btn");
  var menuCards = Array.prototype.slice.call(document.querySelectorAll(".menu-card"));

  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var filter = btn.dataset.filter;

      filterButtons.forEach(function (b) {
        var active = b === btn;
        b.classList.toggle("is-active", active);
        b.setAttribute("aria-pressed", String(active));
      });

      menuCards.forEach(function (card, index) {
        var match = filter === "todos" || card.dataset.category === filter;
        card.classList.toggle("is-hidden", !match);
        card.classList.remove("is-dimmed");
        if (match) {
          card.style.animation = "none";
          void card.offsetWidth;
          card.style.animation = "cardIn 0.45s cubic-bezier(0.22,0.61,0.36,1) " + (index % 4) * 0.06 + "s both";
        }
      });
    });
  });

  /* ------------------------------------------------------------------
     Links de WhatsApp por produto (mensagem pré-preenchida)
  ------------------------------------------------------------------ */
  var waLinks = document.querySelectorAll("[data-wa-link]");

  waLinks.forEach(function (link) {
    var card = link.closest("[data-product]");
    var product = card ? card.dataset.product : "";
    var message = product
      ? "Ol\u00e1! Gostaria de encomendar: " + product + ". Vim pelo site da Ess\u00eancia da Confeitaria."
      : "Ol\u00e1! Vim pelo site da Ess\u00eancia da Confeitaria e gostaria de fazer uma encomenda.";
    link.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
    link.target = "_blank";
    link.rel = "noopener";
  });

  /* ------------------------------------------------------------------
     Galeria + Lightbox
  ------------------------------------------------------------------ */
  var galleryItems = Array.prototype.slice.call(document.querySelectorAll(".gallery__item"));
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxCaption = document.getElementById("lightboxCaption");
  var btnClose = document.getElementById("lightboxClose");
  var btnPrev = document.getElementById("lightboxPrev");
  var btnNext = document.getElementById("lightboxNext");
  var currentIndex = 0;
  var lastFocused = null;

  function openLightbox(index) {
    currentIndex = index;
    var item = galleryItems[currentIndex];
    lightboxImg.src = item.dataset.full;
    lightboxImg.alt = item.querySelector("img").alt;
    lightboxCaption.textContent = item.dataset.caption || "";
    lastFocused = document.activeElement;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    btnClose.focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  function moveLightbox(step) {
    var next = (currentIndex + step + galleryItems.length) % galleryItems.length;
    openLightbox(next);
  }

  galleryItems.forEach(function (item, index) {
    item.addEventListener("click", function () { openLightbox(index); });
  });

  btnClose.addEventListener("click", closeLightbox);
  btnPrev.addEventListener("click", function () { moveLightbox(-1); });
  btnNext.addEventListener("click", function () { moveLightbox(1); });

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") moveLightbox(-1);
    if (e.key === "ArrowRight") moveLightbox(1);
  });

  /* ------------------------------------------------------------------
     Slider de depoimentos
  ------------------------------------------------------------------ */
  var track = document.getElementById("sliderTrack");
  var slides = track ? Array.prototype.slice.call(track.children) : [];
  var dotsWrap = document.getElementById("sliderDots");
  var currentSlide = 0;
  var autoplayTimer = null;

  function goToSlide(index) {
    currentSlide = (index + slides.length) % slides.length;
    track.style.transform = "translateX(-" + currentSlide * 100 + "%)";
    dotsWrap.querySelectorAll(".slider__dot").forEach(function (dot, i) {
      dot.classList.toggle("is-active", i === currentSlide);
      dot.setAttribute("aria-selected", String(i === currentSlide));
    });
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(function () { goToSlide(currentSlide + 1); }, 6000);
  }

  function stopAutoplay() {
    if (autoplayTimer) { clearInterval(autoplayTimer); autoplayTimer = null; }
  }

  if (track && slides.length > 1) {
    slides.forEach(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slider__dot" + (i === 0 ? " is-active" : "");
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", "Depoimento " + (i + 1) + " de " + slides.length);
      dot.setAttribute("aria-selected", String(i === 0));
      dot.addEventListener("click", function () { goToSlide(i); startAutoplay(); });
      dotsWrap.appendChild(dot);
    });

    document.getElementById("prevSlide").addEventListener("click", function () {
      goToSlide(currentSlide - 1); startAutoplay();
    });
    document.getElementById("nextSlide").addEventListener("click", function () {
      goToSlide(currentSlide + 1); startAutoplay();
    });

    var slider = document.getElementById("depoSlider");
    slider.addEventListener("mouseenter", stopAutoplay);
    slider.addEventListener("mouseleave", startAutoplay);

    var startX = null;
    track.addEventListener("touchstart", function (e) {
      startX = e.touches[0].clientX;
      stopAutoplay();
    }, { passive: true });
    track.addEventListener("touchend", function (e) {
      if (startX === null) return;
      var delta = e.changedTouches[0].clientX - startX;
      if (Math.abs(delta) > 50) goToSlide(currentSlide + (delta < 0 ? 1 : -1));
      startX = null;
      startAutoplay();
    }, { passive: true });

    startAutoplay();
  }

  /* ------------------------------------------------------------------
     Fallback elegante caso alguma imagem não carregue
  ------------------------------------------------------------------ */
  document.querySelectorAll("img").forEach(function (img) {
    img.addEventListener("error", function () {
      img.style.display = "none";
      var parent = img.parentElement;
      if (parent && !parent.classList.contains("img-fallback")) {
        parent.classList.add("img-fallback");
      }
    });
  });

  /* ------------------------------------------------------------------
     Ano atual no rodapé
  ------------------------------------------------------------------ */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ------------------------------------------------------------------
     Animação de entrada dos cards do cardápio (usada no filtro)
  ------------------------------------------------------------------ */
  var style = document.createElement("style");
  style.textContent =
    "@keyframes cardIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}";
  document.head.appendChild(style);
})();
