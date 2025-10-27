// Test entry point
console.log('APP_ENTRY', import.meta.env.MODE)
window.__VITE_APP_MARK__ = 'LOADED'

// Import Alpine.js
import Alpine from 'alpinejs'

// Import GSAP
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Import CSS
import '../css/app.css'

// Import Flowbite
import 'flowbite'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// Make GSAP globally available
window.gsap = gsap
window.ScrollTrigger = ScrollTrigger
window.Alpine = Alpine
Alpine.start()

function onReady(fn) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn, { once: true });
  } else {
    fn();
  }
}

function init() {
  // Ustawienia brand
  const root = document.documentElement
  root.style.setProperty('--brand-orange', '#FF5500')
  root.style.setProperty('--brand-navy', '#000A2E')
  root.style.setProperty('--brand-white', '#FFFFFF')

  const logoTimeline = gsap.timeline()
  const logoOverlay   = document.getElementById('logo-overlay')
  const animatedLogo  = document.getElementById('animated-logo')
  const logoContainer = document.getElementById('logo-container')
  const mainContent   = document.getElementById('main-content')
  const mainHeader    = document.getElementById('main-header')

  if (logoOverlay && animatedLogo && logoContainer && mainContent && mainHeader) {
    gsap.set(animatedLogo, { filter: 'grayscale(100%)', scale: 1, y: 0 })
    gsap.set(mainContent, { opacity: 0 })
    gsap.set(mainHeader, { opacity: 0 })

    // Oblicz pozycję docelową w nawigacji przed rozpoczęciem animacji
    const headerLogoContainer = document.getElementById('header-logo-slot')
    let targetX = 0
    let targetY = 0
    
    if (headerLogoContainer) {
      const headerRect = headerLogoContainer.getBoundingClientRect()
      const overlayRect = logoOverlay.getBoundingClientRect()
      
      // Oblicz różnicę pozycji
      targetX = (headerRect.left + headerRect.width/2) - (overlayRect.left + overlayRect.width/2)
      targetY = (headerRect.top + headerRect.height/2) - (overlayRect.top + overlayRect.height/2)
    }

    // Animacja logo - najpierw kolor i scale, potem płynne przejście do nawigacji
    logoTimeline
      .to(animatedLogo, { 
        duration: 1.2, 
        filter: 'grayscale(0%)', 
        scale: 1.1,
        ease: 'power2.out' 
      })
      .to(mainContent, { 
        duration: 1, 
        opacity: 1, 
        ease: 'power2.out' 
      }, '-=0.8')
      .to(mainHeader, { 
        duration: 0.8, 
        opacity: 1, 
        ease: 'power2.out' 
      }, '-=0.8')
      // Płynne przejście logo do pozycji w nawigacji
      .to(animatedLogo, {
        duration: 1.5,
        scale: 0.5, // h-32 (128px) -> h-16 (64px) = 0.5
        x: targetX, // przesuń do pozycji X nawigacji
        y: targetY, // przesuń do pozycji Y nawigacji
        ease: 'power2.inOut'
      }, '-=0.5')
      .to(logoOverlay, {
        duration: 0.8,
        backgroundColor: 'rgba(0,0,0,0)',
        ease: 'power2.out',
        onComplete: () => {
          const headerLogoContainer = document.getElementById('header-logo-slot')
          if (headerLogoContainer && animatedLogo) {
            // Tworzenie linku do strony głównej
            const logoLink = document.createElement('a')
            logoLink.href = '/'
            logoLink.className = 'block transition-transform duration-300 hover:scale-105'
            
            // Resetowanie stylów logo do finalnej pozycji w nawigacji
            animatedLogo.style.transform = ''
            animatedLogo.style.filter = ''
            animatedLogo.style.opacity = '1'
            animatedLogo.className = 'h-16'
            
            // Dodanie logo do linku
            logoLink.appendChild(animatedLogo)
            
            // Wstawienie linku do kontenera
            headerLogoContainer.innerHTML = ''
            headerLogoContainer.appendChild(logoLink)
            
            ScrollTrigger.refresh()
          }
        }
      }, '-=0.5')
  }

  const fadeInElements = document.querySelectorAll('.fade-in')
  if (fadeInElements.length) {
    gsap.from(fadeInElements, { duration: 1, opacity: 0, y: 50, stagger: 0.2, ease: 'power2.out' })
  }

  const words = ['Cyberbezpieczeństwo,','Konsultacje,','Serwerownia,','Sieci,','Rozwiązania IT,']
  const changingWord = document.getElementById('changing-word')
  if (changingWord) {
    let currentIndex = 0
    const animateWord = () => {
      changingWord.textContent = words[currentIndex]
      gsap.fromTo(changingWord, { opacity: 0, y: 20 }, {
        duration: 0.5, opacity: 1, y: 0, ease: 'power2.inOut',
        onComplete: () => {
          setTimeout(() => {
            if (currentIndex < words.length - 1) {
              gsap.to(changingWord, {
                duration: 0.5, opacity: 0, y: -20, ease: 'power2.inOut',
                onComplete: () => { currentIndex++; animateWord() }
              })
            }
          }, 1500)
        }
      })
    }
    setTimeout(animateWord, 2000)
  }
}

onReady(init)

// Hero pinned; About slides up proportionally to scroll
function initAbout() {
  const stack = document.querySelector('.stack-hero-about');
  const about = document.getElementById('about');
  
  console.log('initAbout called', { stack, about });
  
  if (!stack || !about) {
    console.error('Missing elements:', { stack, about });
    return;
  }

  // start: about pod ekranem
  gsap.set(about, { 
    yPercent: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%'
  });

  // pinujemy wrapper, nie hero
  const dur = () => window.innerHeight; // 100% viewportu = 1 ekran
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: stack,
      start: 'top top',
      end: () => `+=${dur()}`, // pin na 1 ekran przewinięcia
      scrub: true,
      pin: true,
      pinSpacing: true,        // zostaw miejsce niżej (płynne przejście)
      invalidateOnRefresh: true,
    }
  });

  // about wjeżdża z dołu i przykrywa hero
  tl.to(about, { 
    yPercent: 0,
    duration: 1
  }, 0);

  // po inicjalizacji
  ScrollTrigger.refresh();
}

onReady(initAbout)

// Header background animation on scroll
function initHeaderBackground() {
  const header = document.getElementById('main-header')
  
  if (header) {
    ScrollTrigger.create({
      trigger: '#hero-pin',
      start: 'bottom top',
      end: 'bottom top',
      onEnter: () => {
        gsap.to(header, {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(10px)',
          duration: 0.1,
          ease: 'power2.out'
        })
      },
      onLeaveBack: () => {
        gsap.to(header, {
          backgroundColor: 'transparent',
          backdropFilter: 'none',
          duration: 0.1,
          ease: 'power2.out'
        })
      }
    })
  }
}

onReady(initHeaderBackground)

// Back to Top Button
function initBackToTop() {
  const backToTopButton = document.getElementById('back-to-top')
  
  if (backToTopButton) {
    // Check if we're on homepage (has hero-pin) or subpage (has hero-subpage)
    const heroPin = document.getElementById('hero-pin')
    const heroSubpage = document.getElementById('hero-subpage')
    
    let triggerElement = heroPin || heroSubpage
    
    if (triggerElement) {
      // Show/hide button based on scroll position
      ScrollTrigger.create({
        trigger: triggerElement,
        start: 'bottom top',
        end: 'bottom top',
        onEnter: () => {
          backToTopButton.classList.add('show')
        },
        onLeaveBack: () => {
          backToTopButton.classList.remove('show')
        }
      })
    } else {
      // Fallback: show button after scrolling down 300px
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          backToTopButton.classList.add('show')
        } else {
          backToTopButton.classList.remove('show')
        }
      })
    }
    
    // Scroll to top functionality
    backToTopButton.addEventListener('click', () => {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: 0, autoKill: false },
        ease: 'power2.inOut'
      })
    })
  }
}

onReady(initBackToTop)

// Smooth scroll for navigation links
function initSmoothScroll() {
  // Handle all anchor links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]')
    
    if (link) {
      e.preventDefault()
      const href = link.getAttribute('href')
      const targetId = href.substring(1) // remove # from href
      const targetElement = document.getElementById(targetId)
      
      console.log('Link clicked:', href, 'Target ID:', targetId, 'Element found:', targetElement)
      
      if (targetElement) {
        gsap.to(window, {
          duration: 1.2,
          scrollTo: { 
            y: targetElement, 
            autoKill: false,
            offsetY: 80 // offset for fixed header
          },
          ease: 'power2.inOut'
        })
      } else {
        console.warn('Target element not found:', targetId)
      }
    }
  })
}

onReady(initSmoothScroll)

// Client logos slider animation - PROFESSIONAL VERSION
function imagesReady(container) {
  const imgs = Array.from(container.querySelectorAll('img'));
  if (imgs.length === 0) return Promise.resolve();
  const pending = imgs.map(img => img.complete ? Promise.resolve() :
    new Promise(res => img.addEventListener('load', res, { once:true })));
  return Promise.all(pending);
}

function initClientsSlider() {
  const viewport = document.getElementById('clients-viewport');
  const track    = document.getElementById('clients-track');
  const firstSet = track?.querySelector('.logo-set');
  if (!viewport || !track || !firstSet) return;

  let anim;

  const build = () => {
    // sprzątanie przy re-init
    if (anim) { anim.kill(); anim = null; }
    // zostaw tylko pierwszy set
    Array.from(track.children).forEach((ch, idx) => { if (idx>0) ch.remove(); });
    gsap.set(track, { clearProps: 'x' });

    const vw = viewport.offsetWidth;

    // policz szerokość pierwszego setu
    const setW = firstSet.offsetWidth;
    if (setW === 0) return; // zabezpieczenie

    // dokładamy pełne moduły setW + odstęp między zestawami
    const gap = 64; // 4rem = 64px
    let total = setW;
    while (total < vw + setW) {
      track.appendChild(firstSet.cloneNode(true));
      total += setW + gap; // dodaj odstęp między zestawami
    }

    // bezkońcowa animacja z „owijaniem"
    const moduleWidth = setW + gap; // szerokość jednego modułu (set + odstęp)
    const wrap = gsap.utils.wrap(-moduleWidth, 0);
    anim = gsap.to(track, {
      x: -moduleWidth,
      duration: 20,
      ease: 'none',
      repeat: -1,
      force3D: true,
      autoRound: false,
      modifiers: {
        x: (x) => wrap(parseFloat(x)) + 'px'
      }
    });
  };

  imagesReady(firstSet).then(() => {
    build();
    ScrollTrigger.refresh();
  });

  // re-init po resize (debounce)
  let t;
  window.addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(() => {
      imagesReady(firstSet).then(() => {
        build();
        ScrollTrigger.refresh();
      });
    }, 150);
  });
}

onReady(initClientsSlider)

// Services horizontal scroll animation
function initServicesHorizontalScroll() {
  const panels = gsap.utils.toArray(".service-panel");
  
  // szerokość przewinięcia = (liczba paneli - 1) * 100% szerokości
  const totalX = -100 * (panels.length - 1);
  
  // Main horizontal scroll animation
  const scrollTween = gsap.to(panels, {
    xPercent: totalX,
    ease: "none",
    scrollTrigger: {
      trigger: ".services-section",
      pin: true,
      scrub: 0.1,
      end: () => "+=" + (window.innerWidth * (panels.length - 1)), // dynamicznie
      markers: false,
      anticipatePin: 1,
      invalidateOnRefresh: true
    }
  });

  // Brand logos animations for each panel
  panels.forEach((panel, index) => {
    const logos = panel.querySelectorAll('.brand-logo');
    
    // Animate brand logos
    logos.forEach((logo, logoIndex) => {
      gsap.fromTo(logo, 
        { 
          y: 50,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: logo,
            containerAnimation: scrollTween,
            start: "left 90%",
            toggleActions: "play none none reset"
          }
        }
      );
      
      // Subtle breathing animation
      gsap.to(logo, {
        scale: 1.05,
        duration: 3 + logoIndex * 0.3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    });
    
    // Panel content animation - different for first panel (cybersecurity)
    const serviceInfo = panel.querySelector('.service-info');
    const isFirstPanel = index === 0; // First panel is cybersecurity
    
    if (isFirstPanel) {
      // First panel: independent vertical trigger (no containerAnimation)
      gsap.fromTo(serviceInfo,
        {
          y: -100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            start: "top 60%",
            toggleActions: "play none none reset"
          }
        }
      );
    } else {
      // Other panels: horizontal scroll with containerAnimation
      gsap.fromTo(serviceInfo,
        {
          x: -100,
          opacity: 0
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: "left 90%",
            toggleActions: "play none none reset"
          }
        }
      );
    }
  });
}

onReady(initServicesHorizontalScroll)

// Projects parallax animation
function initProjectsParallax() {
  // Parallax effect for content
  gsap.to(".pContent", {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
      trigger: ".pSection",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }, 
  });

  // Parallax effect for images
  gsap.to(".pImage", {
    yPercent: -50,
    ease: "none",
    scrollTrigger: {
      trigger: ".pSection",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }, 
  });
}

onReady(initProjectsParallax)

// Header background animation for subpages
function initSubpageHeaderBackground() {
  const header = document.getElementById('main-header')
  const heroSection = document.getElementById('hero-subpage')
  
  if (header && heroSection) {
    // Set initial state
    header.style.backgroundColor = 'transparent'
    header.style.backdropFilter = 'none'
    
    // Create scroll trigger
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Hero is visible - transparent header
          header.style.backgroundColor = 'transparent'
          header.style.backdropFilter = 'none'
        } else {
          // Hero is not visible - dark header
          header.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
          header.style.backdropFilter = 'blur(10px)'
        }
      })
    }, {
      threshold: 0.1
    })
    
    observer.observe(heroSection)
  }
}

onReady(initSubpageHeaderBackground)
