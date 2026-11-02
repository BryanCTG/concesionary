// Import Dynasty CTG — interacciones
(function () {
    'use strict';

    // Header: fondo al hacer scroll
    var header = document.querySelector('.site-header');
    function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 30); }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Menú móvil
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if (toggle) {
        toggle.addEventListener('click', function () {
            var open = links.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', open);
        });
        links.addEventListener('click', function (e) {
            if (e.target.tagName === 'A') { links.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }
        });
    }

    // Reveal al scroll
    var items = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
            });
        }, { threshold: 0.12 });
        items.forEach(function (el) { io.observe(el); });
    } else {
        items.forEach(function (el) { el.classList.add('is-visible'); });
    }

    // Contadores del hero
    document.querySelectorAll('[data-count]').forEach(function (el) {
        var target = parseInt(el.dataset.count, 10), start = null;
        function step(t) {
            if (!start) start = t;
            var p = Math.min((t - start) / 1400, 1);
            el.textContent = Math.floor(p * target) + (el.dataset.suffix || '');
            if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    });

    // Lightbox de galería
    var lb = document.querySelector('.lightbox');
    if (lb) {
        var lbImg = lb.querySelector('img');
        document.querySelectorAll('.galeria button').forEach(function (b) {
            b.addEventListener('click', function () {
                var img = b.querySelector('img');
                lbImg.src = img.src; lbImg.alt = img.alt; lb.classList.add('is-open');
            });
        });
        lb.addEventListener('click', function () { lb.classList.remove('is-open'); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('is-open'); });
    }

    // Formulario: abre el correo/WhatsApp con los datos (sin backend)
    var form = document.querySelector('#form-contacto');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var d = new FormData(form);
            var msg = 'Hola Import Dynasty CTG, soy ' + d.get('nombre') + '.\n' +
                'Me interesa: ' + d.get('interes') + '.\n' + d.get('mensaje') +
                '\nMi correo: ' + d.get('correo');
            // TODO: reemplazar por el número real de WhatsApp (formato internacional sin +)
            var numero = '573000000000';
            window.open('https://wa.me/' + numero + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
            form.querySelector('.form-msg').textContent = 'Abriendo WhatsApp con tu mensaje…';
        });
    }
})();
