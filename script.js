// ===== 3 Silos Scripts =====

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initScrollReveal();
    initContactForm();
});

// Navbar scroll
function initNavbar() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Mobile menu
function initMobileMenu() {
    const toggle = document.getElementById('nav-toggle');
    const menu = document.getElementById('nav-menu');
    const links = document.querySelectorAll('.nav-link');

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Smooth scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const offset = document.getElementById('navbar').offsetHeight;
                const pos = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: pos, behavior: 'smooth' });
            }
        });
    });
}

// Scroll reveal
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const elements = document.querySelectorAll('.intro-content, .servicios-column, .galeria-text, .contacto-info, .contacto-form');

    elements.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(24px)';
        el.style.transition = `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`;
        observer.observe(el);
    });
}

// Contact form
function initContactForm() {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const data = new FormData(form);
        const name = data.get('name');
        const phone = data.get('phone') || 'No especificado';
        const email = data.get('email');
        const message = data.get('message') || 'Sin mensaje';

        const text = `Hola! Quiero consultar sobre un evento.

Nombre: ${name}
Email: ${email}
Teléfono: ${phone}
Mensaje: ${message}`;

        const url = `https://wa.me/5426XXXXXXXX?text=${encodeURIComponent(text)}`;

        const btn = form.querySelector('button[type="submit"]');
        btn.textContent = 'Abriendo WhatsApp...';
        btn.style.background = '#25D366';

        setTimeout(() => {
            window.open(url, '_blank');
            btn.textContent = 'Enviar consulta';
            btn.style.background = '';
            form.reset();
        }, 800);
    });
}
