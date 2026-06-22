// ===== FIREBASE CONFIGURATION & INITIALIZATION =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDPBuFW0pc-lK_iJS7Ath2Hp4rJ5Lb-8Kw",
  authDomain: "ma-ma-arif-kalikuning.firebaseapp.com",
  projectId: "ma-ma-arif-kalikuning",
  storageBucket: "ma-ma-arif-kalikuning.appspot.com",
  messagingSenderId: "154109120016",
  appId: "1:154109120016:web:1ae921725ce0be8848c495"
};

// Inisialisasi Firebase & Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fungsi pengujian koneksi otomatis saat halaman dimuat
async function testFirebaseConnection() {
  try {
    const docRef = await addDoc(collection(db, "tes_koneksi"), {
      status: "Terhubung!",
      waktu: new Date(),
      sumber: "Main JS File"
    });
    console.log("Koneksi Sukses! Dokumen ditulis dengan ID: ", docRef.id);
  } catch (e) {
    console.error("Gagal terhubung ke Firebase: ", e);
  }
}

// Jalankan tes koneksi
testFirebaseConnection();


// ===== PRELOADER DENGAN JEDA LEBIH LAMA & MEMUDAR ELEGAN =====
function hilangkanPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('fade-out')) {
        
        // Menahan logo selama 2000ms (2 detik) agar terlihat jelas dan mantap
        setTimeout(() => {
            preloader.classList.add('fade-out');
            
            // Mengubah display setelah transisi memudar (1000ms / 1 detik) selesai sepenuhnya
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1000); 
            
            console.log("Preloader selesai memudar dengan halus.");
        }, 2000); 
    }
}

// Jalankan fungsi setelah struktur halaman siap dimuat
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', hilangkanPreloader);
} else {
    hilangkanPreloader();
}

// ===== MOBILE NAVIGATION ENHANCED =====
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
        
        const icon = this.querySelector('i');
        if (navMenu.classList.contains('active')) {
            if (icon) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
            document.body.style.overflow = 'hidden';
        } else {
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            document.body.style.overflow = '';
            closeAllDropdowns();
        }
    });

    const allNavLinks = document.querySelectorAll('.nav-link, .dropdown-menu a');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const parentDropdown = this.closest('.dropdown');
            if (parentDropdown && window.innerWidth <= 992) {
                if (this.getAttribute('href') === '#') {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleDropdown(parentDropdown);
                    return;
                }
            }
            
            navMenu.classList.remove('active');
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            document.body.style.overflow = '';
            closeAllDropdowns();
        });
    });

    document.addEventListener('click', function(e) {
        if (navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                if (mobileToggle) {
                    mobileToggle.classList.remove('active');
                    const icon = mobileToggle.querySelector('i');
                    if (icon) {
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                }
                document.body.style.overflow = '';
                closeAllDropdowns();
            }
        }
    });
}

// ===== DROPDOWN MOBILE =====
function closeAllDropdowns() {
    const dropdownMenus = document.querySelectorAll('.dropdown-menu');
    dropdownMenus.forEach(menu => {
        menu.style.display = 'none';
    });
}

window.closeAllDropdowns = closeAllDropdowns;

function toggleDropdown(dropdown) {
    const menu = dropdown.querySelector('.dropdown-menu');
    if (!menu) return;
    
    if (window.innerWidth <= 992) {
        const allDropdowns = document.querySelectorAll('.dropdown');
        allDropdowns.forEach(d => {
            if (d !== dropdown) {
                const otherMenu = d.querySelector('.dropdown-menu');
                if (otherMenu) {
                    otherMenu.style.display = 'none';
                }
            }
        });
        
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    }
}

window.toggleDropdown = toggleDropdown;

function initMobileDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        if (link) {
            const newLink = link.cloneNode(true);
            link.parentNode.replaceChild(newLink, link);
            
            newLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleDropdown(dropdown);
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', initMobileDropdowns);
window.addEventListener('resize', function() {
    setTimeout(initMobileDropdowns, 100);
    if (window.innerWidth > 992) {
        const dropdownMenus = document.querySelectorAll('.dropdown-menu');
        dropdownMenus.forEach(menu => {
            menu.style.display = '';
        });
    }
});

// ===== SWIPER SLIDER =====
if (typeof Swiper !== 'undefined') {
    const heroSwiper = new Swiper('.heroSwiper', {
        loop: true,
        speed: 800,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
    });
}

// ===== AOS INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 100,
        });
    }
});

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');
const speed = 200;

const startCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;
    
    if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => startCounter(counter), 10);
    } else {
        counter.innerText = target.toLocaleString();
    }
};

if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');

if (backToTop) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');

function activeNavLink() {
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (sectionId) {
            const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        }
    });
}

window.addEventListener('scroll', activeNavLink);

// ===== AGENDA ITEM ANIMATION =====
const agendaItems = document.querySelectorAll('.agenda-item');

agendaItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(10px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// ===== NEWSLETTER FORM =====
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input');
        const email = emailInput ? emailInput.value : '';
        
        if (email && email.includes('@') && email.includes('.')) {
            localStorage.setItem('newsletter_email', email);
            
            const button = this.querySelector('button');
            if (button) {
                const originalHTML = button.innerHTML;
                button.innerHTML = '<i class="fas fa-check"></i>';
                button.style.backgroundColor = '#27ae60';
                
                setTimeout(() => {
                    button.innerHTML = originalHTML;
                    button.style.backgroundColor = '';
                    if (emailInput) emailInput.value = '';
                }, 2000);
            }
        } else if (email) {
            alert('Masukkan email yang valid!');
        }
    });
}

// ===== CURRENT YEAR IN FOOTER =====
document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.querySelector('.current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const targetId = href;
        if (targetId && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ===== FORM VALIDATION =====
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', function(e) {
        const requiredFields = this.querySelectorAll('[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.style.borderColor = '#e74c3c';
                
                setTimeout(() => {
                    field.style.borderColor = '';
                }, 3000);
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            alert('Harap lengkapi semua field yang wajib diisi!');
        }
    });
});

// ===== FIX: TUTUP DROPDOWN SAAT KLIK DI LUAR =====
document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
        const dropdownMenus = document.querySelectorAll('.dropdown-menu');
        dropdownMenus.forEach(menu => {
            menu.style.display = 'none';
        });
    }
});