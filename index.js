// ============================================
// PRELOADER
// ============================================
window.addEventListener('load', () => {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }
    }, 1200);
});

// ============================================
// STICKY NAVBAR
// ============================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (navbar) {
        navbar.classList.toggle('scrolled', window.scrollY > 40);
    }
    
    const backBtn = document.getElementById('backToTop');
    if (backBtn) {
        backBtn.classList.toggle('show', window.scrollY > 300);
    }
});

// ============================================
// MOBILE MENU
// ============================================
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-open');
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-open');
        });
    });
}

// ============================================
// SCROLL FADE-UP OBSERVER
// ============================================
const fadeElements = document.querySelectorAll('.fade-up');

if (fadeElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => observer.observe(el));
}

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(message) {
    const toast = document.getElementById('toastMsg');
    if (toast) {
        toast.textContent = message || "✨ Subscribed successfully!";
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
}

// ============================================
// BACK TO TOP
// ============================================
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ============================================
// "COMING SOON" MODAL
// ============================================
function openModal() {
    const modal = document.getElementById('comingSoonModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('comingSoonModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

const modalOverlay = document.getElementById('comingSoonModal');
if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === e.currentTarget) closeModal();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// ============================================
// UPDATES FORM SUBMISSION
// ============================================
const updatesForm = document.getElementById('updatesForm');

if (updatesForm) {
    updatesForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = document.getElementById('submitBtn');
        if (!btn) return;
        
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '<span class="spinner"></span> Subscribing...';
        btn.disabled = true;
        
        const nameInput = document.getElementById('fullName');
        const name = nameInput ? nameInput.value : 'guest';
        
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.disabled = false;
            showToast(`Thank you, ${name || 'guest'}! You're now subscribed.`);
            updatesForm.reset();
        }, 1200);
    });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== "#" && href !== "#!" && href !== "#book") {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

// ============================================
// EXPOSE FUNCTIONS TO GLOBAL SCOPE
// ============================================
window.openModal = openModal;
window.closeModal = closeModal;
window.showToast = showToast;
