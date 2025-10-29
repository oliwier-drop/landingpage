// Test entry point
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
        duration: 0.3, opacity: 1, y: 0, ease: 'power2.inOut',
        onComplete: () => {
          setTimeout(() => {
            if (currentIndex < words.length - 1) {
              gsap.to(changingWord, {
                duration: 0.3, opacity: 0, y: -20, ease: 'power2.inOut',
                onComplete: () => { currentIndex++; animateWord() }
              })
            }
          }, 1000)
        }
      })
    }
    setTimeout(animateWord, 1000)
  }
}

onReady(init)

// Hero pinned; About slides up proportionally to scroll
function initAbout() {
  const stack = document.querySelector('.stack-hero-about');
  const about = document.getElementById('about');
  
  if (!stack || !about) {
    return;
  }

  // start: about pod ekranem
  gsap.set(about, { 
    yPercent: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '90vh'  // Explicit wysokość
  });
  
  // Ustaw wysokość całego stack
  gsap.set(stack, { height: '180vh' }); // hero (100vh) + about (80vh)

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
      pinSpacing: false,        // wyłącz dodatkową przestrzeń
      invalidateOnRefresh: true,
    }
  });

  // about wjeżdża z dołu i przykrywa hero
  tl.to(about, { 
    yPercent: 0,
    duration: 1,  // 100% viewportu - cała strona zasłania hero
    onComplete: () => {
      console.log('About animation completed, yPercent:', about.style.transform);
    }
  }, 0);

  // po inicjalizacji
  ScrollTrigger.refresh();
}

onReady(initAbout)

// Header background animation on scroll
function initHeaderBackground() {
  const header = document.getElementById('main-header')
  
  if (header) {
    // Check if we're on homepage (has hero-pin) or subpage
    const heroPin = document.getElementById('hero-pin')
    const heroSubpage = document.getElementById('hero-subpage')
    
    if (heroPin) {
      // Homepage - use stack-hero-about as trigger
      const stack = document.querySelector('.stack-hero-about')
      if (stack) {
        ScrollTrigger.create({
          trigger: stack,
          start: 'top top',
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
    } else if (heroSubpage) {
      // Subpage - use hero-subpage as trigger
      ScrollTrigger.create({
        trigger: heroSubpage,
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
        setTimeout(() => ScrollTrigger.refresh(), 50);
      });
    }, 150);
  });
}

onReady(initClientsSlider)

// Universal fade in animation function
function animateFadeIn(selector, options = {}) {
  const element = document.querySelector(selector);
  if (!element) {
    return;
  }
  
  const {
    delay = 0,
    duration = 1,
    yStart = 50,
    ease = "power2.out",
    startTrigger = "top 85%",
    trigger: triggerElement,
    markers: showMarkers = false
  } = options;
  
  // Ustaw początkowy stan z force3D dla lepszej wydajności
  gsap.set(element, { 
    opacity: 0, 
    y: yStart,
    visibility: "visible",
    force3D: true
  });
  
  // Animacja z delay
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerElement || element,
      start: startTrigger,
      markers: showMarkers,
      toggleActions: "play none none none"
    }
  });
  
  tl.to(element, {
    opacity: 1,
    y: 0,
    duration: duration,
    ease: ease,
    force3D: true,
    delay: delay
  });
}

// Initialize all fade in animations
function initFadeInAnimations() {
  // Clients section (use IntersectionObserver like CTA)
  initClientsFadeWithIO();
  
  // CTA section handled by IntersectionObserver (robust w.r.t. pins/parallax)
  initCTAFadeWithIO();
  
  // Partners section
  initPartnersFadeWithIO();
}

// Initialize with small delay to ensure DOM is ready
onReady(() => {
  initFadeInAnimations();
  // Force refresh after a short delay to catch dynamically loaded content
  setTimeout(() => ScrollTrigger.refresh(), 200);
})

// IntersectionObserver-based CTA fade (not affected by ScrollTrigger calculations)
function initCTAFadeWithIO() {
  const cta = document.getElementById('contact-cta');
  if (!cta) return;
  const title = cta.querySelector('.cta-title-animate');
  const desc  = cta.querySelector('.cta-description-animate');
  const btn   = cta.querySelector('.cta-button-animate');
  if (!title || !desc || !btn) return;

  // initial state
  gsap.set([title, desc, btn], { opacity: 0, y: 50 });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.8 } });
        tl.to(title, { opacity: 1, y: 0 })
          .to(desc,  { opacity: 1, y: 0 }, '+=0.1')
          .to(btn,   { opacity: 1, y: 0 }, '+=0.1');
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 }); // 20% CTA widoczne -> animuj

  observer.observe(cta);
}

// IntersectionObserver-based Clients fade
function initClientsFadeWithIO() {
  const container = document.getElementById('clients-viewport')?.closest('#clients');
  const header = document.querySelector('.clients-header-animate');
  const slider = document.querySelector('.clients-slider-animate');
  if (!container || !header || !slider) return;

  gsap.set([header, slider], { opacity: 0, y: 60 });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.9 } });
        tl.to(header, { opacity: 1, y: 0 })
          .to(slider, { opacity: 1, y: 0 }, '+=0.1');
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  observer.observe(container);
}

// IntersectionObserver-based Partners fade
function initPartnersFadeWithIO() {
  const section = document.getElementById('partners');
  const header = document.querySelector('.partners-header-animate');
  if (!section || !header) return;
  
  gsap.set(header, { opacity: 0, y: 60 });
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        gsap.to(header, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out' });
        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });
  
  observer.observe(section);
}

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

// About page specific functionality
function initAboutPage() {
  // Only run on about page
  if (!document.getElementById('experience-section')) return;
  
  // Counter animation function
  function animateCounter(element, targetValue, suffix = '') {
    gsap.to(element, {
      innerHTML: targetValue,
      duration: 2,
      ease: "power2.out",
      snap: { innerHTML: 1 },
      onUpdate: function() {
        element.innerHTML = Math.ceil(this.targets()[0].innerHTML) + suffix;
      }
    });
  }
  
  // Values section
  const valuesCards = document.querySelectorAll('#values .bg-gray-100');
  if (valuesCards.length) {
    gsap.fromTo(valuesCards, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#values",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }
  
  // Experience section title and description
  const experienceTitle = document.querySelector('#experience-section h2');
  const experienceDesc = document.querySelector('#experience-section p');
  if (experienceTitle && experienceDesc) {
    gsap.fromTo([experienceTitle, experienceDesc], 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "#experience-section",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }
  
  // Counters animation (only when section is visible)
  ScrollTrigger.create({
    trigger: "#experience-section",
    start: "top 80%",
    onEnter: function() {
      animateCounter(document.getElementById('years-counter'), 14, '+');
      animateCounter(document.getElementById('projects-counter'), 100, '+');
      animateCounter(document.getElementById('clients-counter'), 50, '+');
    }
  });
  
  // Certificates
  const certificates = document.querySelectorAll('#experience-section .bg-white\\/10');
  if (certificates.length) {
    gsap.fromTo(certificates, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: certificates[0],
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }
  
  // Team section title and description
  const teamTitle = document.querySelector('section:has(#team-slider) h2');
  const teamDesc = document.querySelector('section:has(#team-slider) p');
  if (teamTitle && teamDesc) {
    gsap.fromTo([teamTitle, teamDesc], 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: teamTitle,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }
  
  // Team slider functionality
  const slider = document.getElementById('team-slider');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const dots = document.querySelectorAll('.flex.space-x-2 > div');
  const navControls = document.querySelector('.flex.justify-center.items-center.mt-8');
  
  if (!slider || !prevBtn || !nextBtn) return;
  
  // Count original cards before cloning (only cards with min-w-[300px] class)
  const originalCardsCount = slider.querySelectorAll('.min-w-\\[300px\\]').length;
  
  // Generate dots dynamically based on number of cards
  const dotsContainer = document.querySelector('.flex.space-x-2');
  if (dotsContainer && originalCardsCount > dots.length) {
    // Remove existing dots
    dotsContainer.innerHTML = '';
    // Generate new dots based on actual card count
    for (let i = 0; i < originalCardsCount; i++) {
      const dot = document.createElement('div');
      dot.className = i === 0 ? 'w-2 h-2 bg-brand-orange-main rounded-full' : 'w-2 h-2 bg-gray-600 rounded-full';
      dotsContainer.appendChild(dot);
    }
  }
  
  // Re-select dots after generating them
  const updatedDots = document.querySelectorAll('.flex.space-x-2 > div');
  
  // Team cards fade in animation with onComplete callback
  const originalTeamCards = document.querySelectorAll('#team-slider > div');
  if (originalTeamCards.length) {
    const cardsToAnimate = Array.from(originalTeamCards);
    
    // Set initial state for navigation controls
    if (navControls) {
      gsap.set(navControls, { opacity: 0, y: 30 });
    }
    
    // Timeline for team cards animation
    const teamCardsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#team-slider",
        start: "top 70%",
        toggleActions: "play none none none"
      },
      onComplete: function() {
        // Clone all cards to create infinite loop
        const originalCards = Array.from(slider.children);
        originalCards.forEach(card => {
          const clone = card.cloneNode(true);
          gsap.set(clone, { opacity: 1, y: 0 });
          slider.appendChild(clone);
        });
        
        // Initialize slider functionality immediately
        initSliderFunctionality();
      }
    });
    
    teamCardsTimeline.fromTo(cardsToAnimate, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.05
      }
    );
    
    // Add navigation controls animation to the same timeline
    if (navControls) {
      teamCardsTimeline.to(navControls, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.3"); // Start slightly before cards finish (overlap)
    }
    
    // Start slider initialization after a short delay (faster than waiting for full animation)
    setTimeout(() => {
      if (!slider.querySelector('.min-w-\\[300px\\]').nextElementSibling) {
        // Clone all cards to create infinite loop
        const originalCards = Array.from(slider.children);
        originalCards.forEach(card => {
          const clone = card.cloneNode(true);
          gsap.set(clone, { opacity: 1, y: 0 });
          slider.appendChild(clone);
        });
        
        // Initialize slider functionality
        initSliderFunctionality();
      }
    }, 100); // Start after 200ms instead of waiting for full animation
  }
  
  // Slider functionality
  function initSliderFunctionality() {
    let currentIndex = 0;
    // Use the original cards count (before cloning)
    const totalCards = originalCardsCount;
    // Re-select dots in case they were regenerated
    const dots = document.querySelectorAll('.flex.space-x-2 > div');
    const cardsPerView = 3;
    const cardWidth = 300 + 32;
    let isAnimating = false;
    let currentAnimation = null;
    
    gsap.set(slider, { x: 0 });
    
    function updateSlider(isInstant = false) {
      // Normalize currentIndex to handle loops
      if (currentIndex >= totalCards) {
        // We're on clones - adjust position
        const cloneOffset = currentIndex - totalCards;
        const translateX = -(totalCards * cardWidth + cloneOffset * cardWidth);
        
        if (isInstant) {
          gsap.set(slider, { x: translateX });
          // Reset to equivalent original position
          currentIndex = cloneOffset;
          gsap.set(slider, { x: -currentIndex * cardWidth });
        } else {
          isAnimating = true;
          currentAnimation = gsap.to(slider, {
            x: translateX,
            duration: 0.3,
            ease: "power2.out",
            onComplete: function() {
              // After reaching clone, instantly jump to equivalent original position (invisible to user)
              const originalIndex = cloneOffset;
              gsap.set(slider, { x: -originalIndex * cardWidth });
              currentIndex = originalIndex;
              isAnimating = false;
              currentAnimation = null;
              
              // Update dots after reset
              dots.forEach((dot, index) => {
                dot.classList.remove('bg-brand-orange-main');
                dot.classList.add('bg-gray-600');
              });
              if (dots[originalIndex]) {
                dots[originalIndex].classList.remove('bg-gray-600');
                dots[originalIndex].classList.add('bg-brand-orange-main');
              }
            }
          });
        }
      } else {
        const translateX = -currentIndex * cardWidth;
        
        if (isInstant) {
          gsap.set(slider, { x: translateX });
        } else {
          isAnimating = true;
          currentAnimation = gsap.to(slider, {
            x: translateX,
            duration: 0.3,
            ease: "power2.out",
            onComplete: function() {
              isAnimating = false;
              currentAnimation = null;
            }
          });
        }
      }
      
      const actualCardIndex = currentIndex % totalCards;
      dots.forEach((dot, index) => {
        dot.classList.remove('bg-brand-orange-main');
        dot.classList.add('bg-gray-600');
      });
      if (dots[actualCardIndex]) {
        dots[actualCardIndex].classList.remove('bg-gray-600');
        dots[actualCardIndex].classList.add('bg-brand-orange-main');
      }
    }
    
    function nextSlide() {
      if (isAnimating) return; // Prevent multiple animations
      
      currentIndex++;
      updateSlider();
    }
    
    function prevSlide() {
      if (isAnimating) return; // Prevent multiple animations
      
      currentIndex--;
      
      if (currentIndex < 0) {
        // Jump to clone position at the end
        currentIndex = totalCards * 2 - 1;
      }
      
      updateSlider();
    }
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
      });
    });
    
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    setInterval(nextSlide, 3000);
    
    updateSlider();
  }
}

onReady(initAboutPage)

// Contact page specific functionality
function initContactPage() {
  // Only run on contact page
  if (!document.getElementById('contact-form')) return;
  
  // Project info section
  const projectInfoTitle = document.querySelector('#project-info h2');
  const projectInfoDesc = document.querySelectorAll('#project-info p');
  if (projectInfoTitle && projectInfoDesc.length) {
    gsap.fromTo([projectInfoTitle, ...projectInfoDesc], 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "#project-info",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }
  
  // Contact info section
  const contactInfoTitle = document.querySelector('#contact-info h2');
  const contactCards = document.querySelectorAll('#contact-info .bg-gray-50');
  if (contactInfoTitle && contactCards.length) {
    gsap.fromTo(contactInfoTitle, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#contact-info",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate each card with its internal elements
    contactCards.forEach((card, index) => {
      const cardElements = card.querySelectorAll('div, h3, p, svg');
      gsap.fromTo(cardElements, 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }
  
  // Management team section
  const managementTitle = document.querySelector('#contact-info h3');
  const managementDesc = document.querySelector('#contact-info p');
  const managementCards = document.querySelectorAll('#contact-info .grid.md\\:grid-cols-2 .bg-gray-50');
  if (managementTitle && managementDesc && managementCards.length) {
    gsap.fromTo([managementTitle, managementDesc], 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: managementTitle,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // Animate each management card with its internal elements
    managementCards.forEach((card, index) => {
      const cardElements = card.querySelectorAll('div, h4, p, svg');
      gsap.fromTo(cardElements, 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    });
  }
  
  // Contact form section
  const formTitle = document.querySelector('#contact-form h2');
  const formDesc = document.querySelector('#contact-form p');
  const form = document.querySelector('#contact-form form');
  if (formTitle && formDesc && form) {
    gsap.fromTo([formTitle, formDesc], 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: "#contact-form",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
    
    gsap.fromTo(form, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: form,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
    
    // AJAX form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      const formData = new FormData(form);
      
      // Disable button and show loading state
      submitButton.disabled = true;
      submitButton.textContent = 'Wysyłanie...';
      
      // Remove previous messages
      const previousMessages = document.querySelectorAll('#contact-form .bg-green-600, #contact-form .bg-red-600');
      previousMessages.forEach(msg => msg.remove());
      
      // Remove previous error messages
      const previousErrors = form.querySelectorAll('.text-red-400, .border-red-500');
      previousErrors.forEach(err => {
        if (err.classList.contains('text-red-400')) err.remove();
        if (err.classList.contains('border-red-500')) {
          err.classList.remove('border-red-500');
          err.classList.add('border-gray-600');
        }
      });
      
      try {
        const response = await fetch('/kontakt', {
          method: 'POST',
          body: formData,
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        });
        
        const data = await response.json();
        
        if (data.success) {
          // Success message
          const successDiv = document.createElement('div');
          successDiv.className = 'mb-6 p-4 bg-green-600 text-white rounded-lg';
          successDiv.textContent = data.message || 'Wiadomość została wysłana pomyślnie!';
          form.parentElement.insertBefore(successDiv, form);
          
          // Reset form
          form.reset();
          
          // Scroll to success message
          successDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          // Error message
          const errorDiv = document.createElement('div');
          errorDiv.className = 'mb-6 p-4 bg-red-600 text-white rounded-lg';
          errorDiv.textContent = data.message || 'Wystąpił błąd podczas wysyłania wiadomości.';
          form.parentElement.insertBefore(errorDiv, form);
          
          // Show field errors
          if (data.errors) {
            Object.keys(data.errors).forEach(field => {
              const input = form.querySelector(`[name="${field}"]`);
              if (input) {
                input.classList.remove('border-gray-600');
                input.classList.add('border-red-500');
                
                const errorMsg = document.createElement('p');
                errorMsg.className = 'mt-1 text-sm text-red-400';
                errorMsg.textContent = data.errors[field];
                input.parentElement.appendChild(errorMsg);
              }
            });
          }
        }
      } catch (error) {
        console.error('Error:', error);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'mb-6 p-4 bg-red-600 text-white rounded-lg';
        errorDiv.textContent = 'Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie.';
        form.parentElement.insertBefore(errorDiv, form);
      } finally {
        // Re-enable button
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }
    });
  }
  
  // Location section
  const locationTitle = document.querySelector('#location h2');
  const locationMap = document.querySelector('#location iframe');
  if (locationTitle && locationMap) {
    gsap.fromTo(locationTitle, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#location",
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
    
    gsap.fromTo(locationMap, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: locationMap,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );
  }
}

onReady(initContactPage)
