// Konfiguracja Cookie Banner dla Corpotech
(function() {
  const cfg = {
    background: { showBackground: true },
    cookieIcon: { position: 'bottomLeft', colorScheme: '' },
    cookieTypes: [
      {
        id: 'niezb_dne',
        name: 'Niezbędne',
        description: '<p>Te pliki cookie są niezbędne do prawidłowego działania strony i nie mogą być wyłączone. Obejmują m.in. ustawienia prywatności i podstawową funkcjonalność serwisu.</p>',
        required: true,
        onAccept: function () {}
      },
      {
        id: 'analityczne',
        name: 'Analityczne',
        description: '<p>Te pliki cookie pomagają nam ulepszać stronę poprzez analizę ruchu i zachowań użytkowników. Dzięki nim wiemy, które treści są najczęściej odwiedzane.</p>',
        required: false,
        onAccept: function () {
          if (typeof gtag === 'function') {
            gtag('consent', 'update', { analytics_storage: 'granted' })
          }
          if (typeof window.dataLayer !== 'undefined' && Array.isArray(window.dataLayer)) {
            window.dataLayer.push({ event: 'consent_accepted_analityczne' })
          }
        },
        onReject: function () {
          if (typeof gtag === 'function') {
            gtag('consent', 'update', { analytics_storage: 'denied' })
          }
        }
      },
      {
        id: 'marketingowe',
        name: 'Marketingowe',
        description: '<p>Te pliki cookie służą do personalizacji oraz dopasowania treści marketingowych. Mogą być ustawiane przez nas lub naszych partnerów.</p>',
        required: false,
        onAccept: function () {
          if (typeof gtag === 'function') {
            gtag('consent', 'update', {
              ad_storage: 'granted',
              ad_user_data: 'granted',
              ad_personalization: 'granted'
            })
          }
          if (typeof window.dataLayer !== 'undefined' && Array.isArray(window.dataLayer)) {
            window.dataLayer.push({ event: 'consent_accepted_marketingowe' })
          }
        },
        onReject: function () {
          if (typeof gtag === 'function') {
            gtag('consent', 'update', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied'
            })
          }
        }
      }
    ],
    text: {
      banner: {
        description: '<p>Używamy plików cookies, aby zapewnić najlepsze doświadczenia podczas przeglądania naszej strony. Więcej informacji znajdziesz w <a href="/polityka-prywatnosci">Polityce prywatności</a>.</p>',
        acceptAllButtonText: 'Zaakceptuj wszystkie',
        acceptAllButtonAccessibleLabel: 'Zaakceptuj wszystkie pliki cookies',
        rejectNonEssentialButtonText: 'Odrzuć nieistotne',
        rejectNonEssentialButtonAccessibleLabel: 'Odrzuć nieistotne pliki cookies',
        preferencesButtonText: 'Ustawienia plików cookies',
        preferencesButtonAccessibleLabel: 'Otwórz ustawienia plików cookies'
      },
      preferences: {
        title: 'Ustawienia plików cookies',
        description: '<p>Szanujemy Twoją prywatność. W każdej chwili możesz zmienić preferencje dotyczące plików cookies. Ustawienia będą stosowane w obrębie tej witryny.</p>',
        creditLinkText: '',
        creditLinkAccessibleLabel: ''
      }
    },
    position: { banner: 'bottomLeft' }
  }

  function applyConfig() {
    if (window.silktideCookieBannerManager && typeof window.silktideCookieBannerManager.updateCookieBannerConfig === 'function') {
      window.silktideCookieBannerManager.updateCookieBannerConfig(cfg)
    } else {
      setTimeout(applyConfig, 50)
    }
  }

  const isHome = !!document.getElementById('logo-overlay')
  if (isHome) {
    // Zaczekaj na koniec animacji intro na stronie głównej
    document.addEventListener('corpotech:logoIntroFinished', () => {
      applyConfig()
    }, { once: true })
  } else {
    // Na podstronach konfiguruj od razu
    applyConfig()
  }
})();
