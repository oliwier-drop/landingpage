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
    const headerLogoContainer = document.getElementById('header-logo-slot')

    gsap.set(animatedLogo, { filter: 'grayscale(100%)', scale: 1, y: 0 })
    gsap.set(mainContent, { opacity: 0 })
    gsap.set(mainHeader, { opacity: 0 })

    // Oblicz pozycję docelową w nawigacji
    let targetX = 0
    let targetY = 0
    if (headerLogoContainer) {
      const headerRect = headerLogoContainer.getBoundingClientRect()
      const overlayRect = logoOverlay.getBoundingClientRect()
      targetX = (headerRect.left + headerRect.width / 2) - (overlayRect.left + overlayRect.width / 2)
      targetY = (headerRect.top + headerRect.height / 2) - (overlayRect.top + overlayRect.height / 2)
    }

    const computeTarget = () => {
      const header = document.getElementById('header-logo-slot')
      if (!header) return { x: 0, y: 0 }
      const headerRect = header.getBoundingClientRect()
      const overlayRect = logoOverlay.getBoundingClientRect()
      return {
        x: (headerRect.left + headerRect.width / 2) - (overlayRect.left + overlayRect.width / 2),
        y: (headerRect.top + headerRect.height / 2) - (overlayRect.top + overlayRect.height / 2)
      }
    }

    logoTimeline
      .to(animatedLogo, { duration: 1.2, filter: 'grayscale(0%)', scale: 1.1, ease: 'power2.out' })
      .to(mainContent, { duration: 1, opacity: 1, ease: 'power2.out' }, '-=0.8')
      .to(mainHeader, { duration: 0.8, opacity: 1, ease: 'power2.out' }, '-=0.8')
      .to(animatedLogo, {
        duration: 1.5,
        scale: 0.5,
        x: () => computeTarget().x,
        y: () => computeTarget().y,
        ease: 'power2.inOut'
      }, '-=0.5')
      .to(logoOverlay, {
        duration: 0.8,
        backgroundColor: 'rgba(0,0,0,0)',
        ease: 'power2.out',
        onComplete: () => {
          const headerLogoContainer = document.getElementById('header-logo-slot')
          if (headerLogoContainer && animatedLogo) {
            const logoLink = document.createElement('a')
            logoLink.href = '/'
            logoLink.className = 'block transition-transform duration-300 hover:scale-105'
            animatedLogo.style.transform = ''
            animatedLogo.style.filter = ''
            animatedLogo.style.opacity = '1'
            animatedLogo.className = 'h-16'
            logoLink.appendChild(animatedLogo)
            headerLogoContainer.innerHTML = ''
            headerLogoContainer.appendChild(logoLink)
            ScrollTrigger.refresh()
            try { document.dispatchEvent(new CustomEvent('corpotech:logoIntroFinished')) } catch (_) {}
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

// Services page: expandable cards
function initServicesPage() {
  const cards = document.querySelectorAll('.service-card')
  if (!cards.length) return

  cards.forEach(card => {
    const toggle = card.querySelector('.service-toggle')
    const extra = card.querySelector('.service-extra')
    if (!toggle) return

    toggle.addEventListener('click', () => openServiceModal(card, extra))
  })
}

onReady(initServicesPage)

function openServiceModal(card, extra) {
  // Dane z atrybutów data-
  const title = card.dataset.title || (card.querySelector('h3')?.textContent.trim() || '')
  const details = card.dataset.details || ''
  const tech = (card.dataset.tech || '').split(',').map(s => s.trim()).filter(Boolean)
  const points = (card.dataset.points || '').split(';').map(s => s.trim()).filter(Boolean)
  const imgEl = card.querySelector('img')
  const imgSrc = imgEl ? imgEl.getAttribute('src') : ''
  const imgAlt = imgEl ? imgEl.getAttribute('alt') || '' : ''

  // Overlay i modal (prosty modal, bez animacji FLIP)
  const overlay = document.createElement('div')
  overlay.className = 'fixed inset-0 z-[1000] bg-black/60 opacity-0'
  const modal = document.createElement('div')
  modal.className = 'fixed z-[1001] bg-white rounded-2xl shadow-2xl opacity-0 max-w-[960px] w-[92%] max-h-[90vh] overflow-auto'

  modal.innerHTML = `
    <div class="relative">
      <button type="button" aria-label="Zamknij" class="absolute top-3 right-3 rounded-full bg-black/60 text-white w-9 h-9 flex items-center justify-center hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-white/50">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="w-5 h-5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
      <div class="w-full max-h-[40vh] overflow-hidden bg-gray-200">
        ${imgSrc ? `<img src="${imgSrc}" alt="${imgAlt}" class="w-full h-full object-cover">` : ''}
      </div>
    </div>
    <div class="p-6">
      <h3 class="text-2xl font-bold text-brand-navy-main mb-3">${title}</h3>
      ${details ? `<p class=\"text-brand-navy-main/80 mb-5 leading-relaxed\">${details}</p>` : ''}
      ${points.length ? `
        <ul class=\"text-brand-navy-main mb-5 space-y-2\">
          ${points.map(p => `<li class=\"flex items-start\"><span class=\"text-brand-orange-main mr-2 text-lg leading-none\">→</span><span>${p}</span></li>`).join('')}
        </ul>
      ` : ''}
      ${tech.length ? `<div class=\"flex flex-wrap gap-2\">${tech.map(t => `<span class=\"px-3 py-1 rounded-full bg-gray-100 text-brand-navy-main text-xs font-medium border border-gray-200\">${t}</span>`).join('')}</div>` : ''}
    </div>
  `

  document.body.appendChild(overlay)
  document.body.appendChild(modal)

  // Wyśrodkowanie modala
  const reposition = () => {
    const mw = modal.offsetWidth
    const mh = modal.offsetHeight
    const left = (window.innerWidth - mw) / 2
    const top = Math.max(24, (window.innerHeight - mh) / 2)
    gsap.set(modal, { left, top })
  }
  reposition()
  window.addEventListener('resize', reposition, { passive: true })

  // Wejście
  gsap.to(overlay, { duration: 0.2, opacity: 1, ease: 'power2.out' })
  gsap.to(modal, { duration: 0.3, opacity: 1, ease: 'power2.out' })

  const close = () => {
    window.removeEventListener('resize', reposition)
    gsap.timeline({ defaults: { ease: 'power2.inOut' } })
      .to(modal, { duration: 0.2, opacity: 0 })
      .to(overlay, { duration: 0.2, opacity: 0 }, '<')
      .add(() => { overlay.remove(); modal.remove() })
  }

  overlay.addEventListener('click', close)
  const closeBtn = modal.querySelector('button[aria-label="Zamknij"]')
  if (closeBtn) closeBtn.addEventListener('click', close)
  const onKey = (e) => { if (e.key === 'Escape') { close(); window.removeEventListener('keydown', onKey) } }
  window.addEventListener('keydown', onKey)
}

// Services page fade-in animations
function initServicesAnimations() {
  const section = document.getElementById('services-list')
  if (!section) return

  const title = section.querySelector('h2')
  const cards = section.querySelectorAll('.service-card')

  if (title) {
    gsap.fromTo(title,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    )
  }

  if (cards.length) {
    cards.forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      )
    })
  }
}

onReady(initServicesAnimations)

// Usunięto initContactCTAAnimations() - elementy nie istnieją na stronie kontaktowej

// Hero pinned; About slides up proportionally to scroll
// Only on desktop/large screens - on mobile/tablet use normal grid layout
function initAbout() {
  const stack = document.querySelector('.stack-hero-about');
  const about = document.getElementById('about');

  if (!stack || !about) {
    return;
  }

  // Disable animation on mobile/tablet - use normal layout instead
  if (window.innerWidth < 868 || window.innerHeight < 700) {
    // On small screens, ensure about section uses normal flow
    // Clear all GSAP transforms and inline styles
    gsap.set(about, { 
      clearProps: "all",
      yPercent: 0,
      xPercent: 0,
      transform: "none",
      position: "static",
      top: "auto",
      left: "auto",
      right: "auto",
      width: "auto",
      height: "auto"
    });
    gsap.set(stack, { 
      clearProps: "all",
      height: "auto"
    });
    // Also clear inline styles directly
    about.style.cssText = '';
    stack.style.cssText = '';
    return; // Exit - no animation on mobile
  }

  // Desktop only: Animation with pinning
  // start: about pod ekranem
  gsap.set(about, { 
    yPercent: 100,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: '90vh'  // Fixed height on desktop
  });
  
  // Ustaw wysokość całego stack
  gsap.set(stack, { height: '180vh' }); // hero (100vh) + about (90vh)

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
  }, 0);

  // po inicjalizacji
  ScrollTrigger.refresh();
}

// Re-run on resize to handle mobile/desktop switch
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const stack = document.querySelector('.stack-hero-about');
    const about = document.getElementById('about');
    if (stack && about) {
      // Kill existing ScrollTriggers for this section
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.trigger === stack) {
          trigger.kill();
        }
      });
      // Clear any GSAP animations
      gsap.killTweensOf(about);
      gsap.killTweensOf(stack);
      // Re-initialize
      initAbout();
    }
  }, 250);
});

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

// Mobile menu toggle
function initMobileMenu() {
  const button = document.getElementById('mobile-menu-button')
  const panel = document.getElementById('mobile-menu')
  const header = document.getElementById('main-header')
  if (!button || !panel) return

  let headerState = null

  const solidHeader = () => {
    if (!header) return
    if (!headerState) {
      headerState = {
        backgroundColor: header.style.backgroundColor || '',
        backdropFilter: header.style.backdropFilter || ''
      }
    }
    header.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'
    header.style.backdropFilter = 'blur(10px)'
  }

  const restoreHeader = () => {
    if (!header || !headerState) return
    header.style.backgroundColor = headerState.backgroundColor
    header.style.backdropFilter = headerState.backdropFilter
    headerState = null
  }

  const open = () => {
    panel.classList.remove('hidden')
    button.setAttribute('aria-expanded', 'true')
    document.body.style.overflow = 'hidden'
    solidHeader()
    if (header) {
      const headerHeight = header.getBoundingClientRect().height || 80
      panel.style.paddingTop = `${headerHeight + 24}px`
    }
    try {
      gsap.fromTo(panel, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.2, ease: 'power2.out' })
    } catch (_) {}
  }

  const close = () => {
    try {
      gsap.to(panel, { autoAlpha: 0, duration: 0.2, ease: 'power2.out', onComplete: () => {
        panel.classList.add('hidden')
        button.setAttribute('aria-expanded', 'false')
        document.body.style.overflow = ''
        panel.style.paddingTop = ''
        restoreHeader()
      } })
    } catch (_) {
      panel.classList.add('hidden')
      button.setAttribute('aria-expanded', 'false')
      document.body.style.overflow = ''
      panel.style.paddingTop = ''
      restoreHeader()
    }
  }

  const toggle = () => {
    if (panel.classList.contains('hidden')) open(); else close()
  }

  button.addEventListener('click', toggle)
  panel.addEventListener('click', (e) => {
    const link = e.target.closest('a')
    if (link) close()
  })
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') close() })
}

onReady(initMobileMenu)

// Back to Top Button
function initBackToTop() {
  const backToTopButton = document.getElementById('back-to-top')
  
  if (backToTopButton) {
    // Check if we're on homepage (has hero-pin) or subpage (has hero-subpage)
    const heroPin = document.getElementById('hero-pin')
    const heroSubpage = document.getElementById('hero-subpage')
    
    const setupScrollTrigger = (triggerElement) => {
      if (!triggerElement) return
      ScrollTrigger.create({
        trigger: triggerElement,
        start: 'bottom top',
        end: 'bottom top',
        onEnter: () => backToTopButton.classList.add('show'),
        onLeaveBack: () => backToTopButton.classList.remove('show')
      })
    }

    if (heroPin) {
      // On homepage: delay initialization until intro overlay finishes
      backToTopButton.classList.remove('show')
      const onIntroDone = () => {
        setupScrollTrigger(heroPin)
        // If user has already scrolled past the trigger before intro finished, ensure correct state
        ScrollTrigger.refresh()
      }
      document.addEventListener('corpotech:logoIntroFinished', onIntroDone, { once: true })
    } else if (heroSubpage) {
      setupScrollTrigger(heroSubpage)
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
  // Clients section (use IntersectionObserver)
  initClientsFadeWithIO();
  
  // CTA/Form section handled by initContactPage() - removed duplicate initCTAFadeWithIO()
  
  // Partners section
  initPartnersFadeWithIO();
}

// Initialize with small delay to ensure DOM is ready
onReady(() => {
  initFadeInAnimations();
  // Force refresh after a short delay to catch dynamically loaded content
  setTimeout(() => ScrollTrigger.refresh(), 200);
})

// Usunięto initCTAFadeWithIO() - elementy nie istnieją na stronie kontaktowej
// Animacja formularza jest obsługiwana przez initContactPage()

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
  // Disable horizontal scroll animation on small screens to prevent overflow
  ScrollTrigger.matchMedia({
    "(min-width: 1024px)": () => {
      const panels = gsap.utils.toArray('.service-panel');
      if (!panels.length) return;
      const totalX = -100 * (panels.length - 1);
      const scrollTween = gsap.to(panels, {
        xPercent: totalX,
        ease: 'none',
        scrollTrigger: {
          trigger: '.services-section',
          pin: true,
          scrub: 0.1,
          end: () => '+=' + (window.innerWidth * (panels.length - 1)),
          markers: false,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

      panels.forEach((panel, index) => {
        const logos = panel.querySelectorAll('.brand-logo');
        logos.forEach((logo, logoIndex) => {
          gsap.fromTo(logo,
            { y: 50, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out',
              scrollTrigger: { trigger: logo, containerAnimation: scrollTween, start: 'left 90%', toggleActions: 'play none none reset' } }
          );
          gsap.to(logo, { scale: 1.05, duration: 3 + logoIndex * 0.3, ease: 'power2.inOut', yoyo: true, repeat: -1 });
        });

        const serviceInfo = panel.querySelector('.service-info');
        const isFirstPanel = index === 0;
        if (isFirstPanel) {
          gsap.fromTo(serviceInfo, { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: panel, start: 'top 60%', toggleActions: 'play none none reset' } });
        } else {
          gsap.fromTo(serviceInfo, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: panel, containerAnimation: scrollTween, start: 'left 90%', toggleActions: 'play none none reset' } });
        }
      });
    },
    "(max-width: 1023px)": () => {
      // Ensure no horizontal overflow on mobile
      try { gsap.set(document.documentElement, { overflowX: 'hidden' }); gsap.set(document.body, { overflowX: 'hidden' }); } catch(_) {}
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
  const dotsContainer = document.querySelector('.flex.space-x-2');
  const navControls = document.querySelector('.flex.justify-center.items-center.mt-8');
  
  if (!slider || !prevBtn || !nextBtn) return;
  
  // Count original cards - use direct children count
  const originalCardsCount = slider.children.length;
  let sliderInitialized = false;
  
  // Generate dots dynamically based on number of cards
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    // Generate dots based on actual card count
    for (let i = 0; i < originalCardsCount; i++) {
      const dot = document.createElement('div');
      dot.className = i === 0 ? 'w-2 h-2 bg-brand-orange-main rounded-full cursor-pointer' : 'w-2 h-2 bg-gray-600 rounded-full cursor-pointer';
      dotsContainer.appendChild(dot);
    }
  }
  
  // Team cards fade in animation with onComplete callback
  const originalTeamCards = Array.from(slider.children);
  if (originalTeamCards.length) {
    const cardsToAnimate = originalTeamCards;
    
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
        initializeSlider();
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
    
    // Initialize slider after a short delay as fallback
    setTimeout(() => {
      if (!sliderInitialized) {
        initializeSlider();
      }
    }, 300);
  }
  
  // Initialize slider (clone cards and setup functionality)
  function initializeSlider() {
    if (sliderInitialized) return;
    
    // Nie klonujemy tutaj - initTeamSlider() tworzy tylko 2 klony (head i tail)
    sliderInitialized = true;
    initTeamSlider();
  }
  
  // Team Slider - Full featured with autoplay, swipe, and accessibility
  function initTeamSlider() {
    const slider = document.getElementById('team-slider');
    const viewport = document.getElementById('team-slider-viewport') || slider?.parentElement;
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dotsWrap = document.getElementById('team-dots');
    if (!slider || !viewport) return;

    // GUARD: inicjuj tylko raz
    if (slider.dataset.initialized === 'true') return;
    slider.dataset.initialized = 'true';

    // --- konfiguracja ---
    const AUTOPLAY_MS = 3000; // czas między krokami
    const STEP_BY_VIEW = false; // true = przesuwa o cały "widok" (1/2/3 karty), false = o 1 kartę

    // --- stan ---
    const originals = Array.from(slider.children);         // tylko oryginalne karty
    const originalCount = originals.length;
    if (!originalCount) return;

    // dobuduj head/tail (po jednym klonie)
    const head = originals[originalCount - 1].cloneNode(true);
    head.dataset.clone = 'head';
    const tail = originals[0].cloneNode(true);
    tail.dataset.clone = 'tail';
    slider.insertBefore(head, slider.firstChild);
    slider.appendChild(tail);

    let cards = Array.from(slider.children);               // [cloneHead, ...originals, cloneTail]
    let index = 1;                                         // start: 1 = pierwszy oryginał
    let anim = null;
    let isAnimating = false;

    // kropki (auto-generate)
    if (dotsWrap) {
      dotsWrap.innerHTML = '';
      for (let i = 0; i < originalCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'w-2 h-2 rounded-full bg-gray-600 cursor-pointer';
        dot.addEventListener('click', () => goTo(i + 1));
        dotsWrap.appendChild(dot);
      }
    }

    const getPerView = () => {
      const w = window.innerWidth;
      if (w < 640) return 1;
      if (w < 1024) return 2;
      return 3;
    };

    const cardWidth = () => {
      // łap szerokość "pierwszego realnego" elementu (index 1)
      const firstReal = cards[1] || cards[0];
      const rect = firstReal.getBoundingClientRect();
      const gap = parseFloat(getComputedStyle(slider).columnGap || getComputedStyle(slider).gap || 0) || 16;
      return rect.width + gap;
    };

    const activeDot = () => {
      if (!dotsWrap) return;
      const dots = dotsWrap.querySelectorAll(':scope > div');
      const real = ((index - 1) % originalCount + originalCount) % originalCount;
      dots.forEach((d, i) => {
        if (i === real) { d.classList.remove('bg-gray-600'); d.classList.add('bg-brand-orange-main'); }
        else { d.classList.add('bg-gray-600'); d.classList.remove('bg-brand-orange-main'); }
      });
    };

    const jumpNoAnimate = () => {
      const x = -index * cardWidth();
      gsap.set(slider, { x });
      activeDot();
    };

    const goTo = (nextIndex) => {
      if (isAnimating) return;
      isAnimating = true;
      const x = -nextIndex * cardWidth();
      if (anim) anim.kill();
      anim = gsap.to(slider, {
        x, duration: 0.35, ease: 'power2.out',
        onComplete() {
          index = nextIndex;
          // teleport na klonach, by utrzymać nieskończoną pętlę
          if (index === cards.length - 1) { // cloneTail
            index = 1;
            jumpNoAnimate();
          } else if (index === 0) {         // cloneHead
            index = originalCount;
            jumpNoAnimate();
          } else {
            activeDot();
          }
          isAnimating = false;
        }
      });
    };

    const step = () => (STEP_BY_VIEW ? getPerView() : 1);
    const next = () => goTo(index + step());
    const prev = () => goTo(index - step());

    // autoplay z poszanowaniem prefers-reduced-motion i widoczności strony
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let timer = reduce ? null : setInterval(next, AUTOPLAY_MS);

    const pause = () => { if (timer) { clearInterval(timer); timer = null; } };
    const resume = () => { if (!timer && !reduce) { timer = setInterval(next, AUTOPLAY_MS); } };

    const holder = slider.closest('.relative') || viewport;
    holder.addEventListener('mouseenter', pause);
    holder.addEventListener('mouseleave', resume);
    holder.addEventListener('touchstart', pause, { passive: true });
    holder.addEventListener('touchend', resume, { passive: true });

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) pause(); else resume();
    });

    // przyciski
    prevBtn?.addEventListener('click', prev);
    nextBtn?.addEventListener('click', next);

    // swipe/drag (opcjonalny, lekki)
    let startX = 0, deltaX = 0, dragging = false;
    const onDown = (e) => { dragging = true; startX = (e.touches?.[0]?.clientX ?? e.clientX); deltaX = 0; pause(); };
    const onMove = (e) => {
      if (!dragging) return;
      const x = (e.touches?.[0]?.clientX ?? e.clientX);
      deltaX = x - startX;
      gsap.set(slider, { x: -index * cardWidth() + deltaX });
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      const threshold = Math.max(40, cardWidth() * 0.15);
      if (deltaX > threshold) prev();
      else if (deltaX < -threshold) next();
      else gsap.to(slider, { x: -index * cardWidth(), duration: 0.2, ease: 'power2.out' });
      resume();
    };
    viewport.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    viewport.addEventListener('touchstart', onDown, { passive: true });
    viewport.addEventListener('touchmove', onMove, { passive: true });
    viewport.addEventListener('touchend', onUp, { passive: true });

    // stabilny resize (ResizeObserver + rAF)
    const ro = new ResizeObserver(() => {
      if (initTeamSlider._raf) cancelAnimationFrame(initTeamSlider._raf);
      initTeamSlider._raf = requestAnimationFrame(() => jumpNoAnimate());
    });
    ro.observe(viewport);
    ro.observe(slider);

    // start
    // podmień listę (gdy dodałeś klony) i ustaw pozycję początkową
    cards = Array.from(slider.children);
    jumpNoAnimate();
  }
  
  // Equalize card heights to prevent jumping during scroll
  function equalizeTeamCardHeights() {
    const slider = document.getElementById('team-slider');
    if (!slider) return;

    // Bierzemy tylko oryginały – pomiń head/tail
    const originals = Array.from(slider.children)
      .filter(el => !el.firstElementChild?.dataset?.clone);

    if (!originals.length) return;

    // Zmierz wysokości .team-card w oryginałach
    let maxH = 0;
    originals.forEach(wrap => {
      const card = wrap.querySelector('.team-card');
      if (!card) return;
      // Na czas pomiaru usuń inline min-height, żeby nie zaniżać/nie zawyżać
      const prev = card.style.minHeight;
      card.style.minHeight = '';
      const h = card.getBoundingClientRect().height;
      if (h > maxH) maxH = h;
      card.style.minHeight = prev;
    });

    // Ustaw wspólne minimum przez zmienną CSS (ładnie współgra z responsywnością)
    if (maxH > 0) {
      slider.style.setProperty('--card-min-h', Math.ceil(maxH) + 'px');
    }
  }

  // Debounce helper
  function debounce(fn, t = 120) {
    let id; return (...args) => { clearTimeout(id); id = setTimeout(() => fn(...args), t); };
  }

  // Wywołaj po załadowaniu
  setTimeout(() => {
    equalizeTeamCardHeights();
    
    // Reakcja na resize / orientację
    window.addEventListener('resize', debounce(equalizeTeamCardHeights, 100), { passive: true });
    
    // Stabilizacja po załadowaniu obrazów
    const slider = document.getElementById('team-slider');
    const imgs = slider ? slider.querySelectorAll('img') : [];
    imgs.forEach(img => {
      if (!img.complete) img.addEventListener('load', debounce(equalizeTeamCardHeights, 50), { once: true });
    });
    
    // Jeśli używasz fontów webowych
    if ('fonts' in document) {
      document.fonts.ready.then(() => equalizeTeamCardHeights()).catch(()=>{});
    }
  }, 500);
}

onReady(initAboutPage)

onReady(initContactPage)

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

  // Contact form section animation
  const formSectionEl = document.getElementById('contact-form');
  if (formSectionEl) {
    const formElements = [
      formSectionEl.querySelector('h2'),
      formSectionEl.querySelector('p'),
      formSectionEl.querySelector('form')
    ].filter(Boolean);

    if (formElements.length) {
      gsap.fromTo(
        formElements,
        {
          autoAlpha: 0,
          y: 40
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: formSectionEl,
            start: 'top 80%',
            toggleActions: 'play none none none',
            once: true
          }
        }
      );
    }
  }

  // AJAX form submission
  const form = document.querySelector('#contact-form form');
  if (form) {
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
        
        // Bezpieczne parsowanie odpowiedzi – obsługa przypadków gdy backend zwróci HTML/tekst zamiast JSON
        let data;
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          try {
            data = await response.json();
          } catch (e) {
            // JSON zapowiedziany, ale niepoprawny – pobierz jako tekst do diagnostyki
            const text = await response.text();
            throw new Error(`Niepoprawny JSON z serwera (status ${response.status}). Podgląd: ${text.substring(0, 300)}`);
          }
        } else {
          // Nie-JSON – pobierz tekst i rzuć błąd aby trafić do catch
          const text = await response.text();
          throw new Error(`Serwer zwrócił nie-JSON (status ${response.status}, content-type: ${contentType}). Podgląd: ${text.substring(0, 300)}`);
        }
        
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

function initContactCTA() {
  const section = document.getElementById('contact-cta');
  if (!section) {
    return;
  }

  const elements = [
    section.querySelector('.cta-title-animate'),
    section.querySelector('.cta-description-animate'),
    section.querySelector('.cta-button-animate')
  ].filter(Boolean);

  if (!elements.length) {
    return;
  }

  gsap.fromTo(
    elements,
    {
      autoAlpha: 0,
      y: 40
    },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
        once: true
      }
    }
  );
}

onReady(initContactPage)
onReady(initContactCTA)