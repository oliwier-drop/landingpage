(function(){
  const KEY_PREFIX = 'cmx';
  const ID_PREFIX = 'cmx';

  class CookieBanner {
    constructor(config) {
      this.config = config;
      this.wrapper = null;
      this.banner = null;
      this.modal = null;
      this.cookieIcon = null;
      this.backdrop = null;

      this.createWrapper();
      if (this.shouldShowBackdrop()) this.createBackdrop();
      this.createCookieIcon();
      this.createModal();
      if (this.shouldShowBanner()) {
        this.createBanner();
        this.showBackdrop();
      } else {
        this.showCookieIcon();
      }
      this.setupEventListeners();
      if (this.hasSetInitialCookieChoices()) {
        this.loadRequiredCookies();
        this.runAcceptedCookieCallbacks();
      }
    }

    destroyCookieBanner() {
      if (this.wrapper && this.wrapper.parentNode) this.wrapper.parentNode.removeChild(this.wrapper);
      this.allowBodyScroll();
      this.wrapper = null; this.banner = null; this.modal = null; this.cookieIcon = null; this.backdrop = null;
    }

    createWrapper() {
      this.wrapper = document.createElement('div');
      this.wrapper.id = `${ID_PREFIX}-wrapper`;
      document.body.insertBefore(this.wrapper, document.body.firstChild);
    }

    createWrapperChild(htmlContent, id) {
      const child = document.createElement('div');
      child.id = id;
      child.innerHTML = htmlContent;
      if (!this.wrapper || !document.body.contains(this.wrapper)) this.createWrapper();
      this.wrapper.appendChild(child);
      return child;
    }

    createBackdrop() {
      this.backdrop = this.createWrapperChild(null, `${ID_PREFIX}-backdrop`);
    }
    showBackdrop() { if (this.backdrop) this.backdrop.style.display = 'block'; if (typeof this.config.onBackdropOpen === 'function') this.config.onBackdropOpen(); }
    hideBackdrop() { if (this.backdrop) this.backdrop.style.display = 'none'; if (typeof this.config.onBackdropClose === 'function') this.config.onBackdropClose(); }
    shouldShowBackdrop() { return this.config?.background?.showBackground || false; }

    updateCheckboxState(saveToStorage = false) {
      const preferencesSection = this.modal.querySelector('#cookie-preferences');
      const checkboxes = preferencesSection.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((checkbox) => {
        const [, cookieId] = checkbox.id.split('cookies-');
        const cookieType = this.config.cookieTypes.find(type => type.id === cookieId);
        if (!cookieType) return;
        if (saveToStorage) {
          const currentState = checkbox.checked;
          if (cookieType.required) {
            localStorage.setItem(`${KEY_PREFIX}CookieChoice_${cookieId}${this.getBannerSuffix()}`, 'true');
          } else {
            localStorage.setItem(`${KEY_PREFIX}CookieChoice_${cookieId}${this.getBannerSuffix()}`, currentState.toString());
            if (currentState && typeof cookieType.onAccept === 'function') cookieType.onAccept();
            else if (!currentState && typeof cookieType.onReject === 'function') cookieType.onReject();
          }
        } else {
          if (cookieType.required) {
            checkbox.checked = true; checkbox.disabled = true;
          } else {
            const storedValue = localStorage.getItem(`${KEY_PREFIX}CookieChoice_${cookieId}${this.getBannerSuffix()}`);
            checkbox.checked = storedValue !== null ? storedValue === 'true' : !!cookieType.defaultValue;
          }
        }
      });
    }

    setInitialCookieChoiceMade() { window.localStorage.setItem(`${KEY_PREFIX}CookieBanner_InitialChoice${this.getBannerSuffix()}`, 1); }

    handleCookieChoice(accepted) {
      this.setInitialCookieChoiceMade();
      this.removeBanner();
      this.hideBackdrop();
      this.toggleModal(false);
      this.allowBodyScroll();
      this.showCookieIcon();
      this.config.cookieTypes.forEach((type) => {
        if (type.required == true) {
          localStorage.setItem(`${KEY_PREFIX}CookieChoice_${type.id}${this.getBannerSuffix()}`, 'true');
          if (typeof type.onAccept === 'function') type.onAccept();
        } else {
          localStorage.setItem(`${KEY_PREFIX}CookieChoice_${type.id}${this.getBannerSuffix()}`, accepted.toString());
          if (accepted) { if (typeof type.onAccept === 'function') type.onAccept(); }
          else { if (typeof type.onReject === 'function') type.onReject(); }
        }
      });
      if (accepted && typeof this.config.onAcceptAll === 'function') this.config.onAcceptAll();
      else if (typeof this.config.onRejectAll === 'function') this.config.onRejectAll();
      this.updateCheckboxState();
    }

    getAcceptedCookies() {
      return (this.config.cookieTypes || []).reduce((acc, cookieType) => {
        acc[cookieType.id] = localStorage.getItem(`${KEY_PREFIX}CookieChoice_${cookieType.id}${this.getBannerSuffix()}`) === 'true';
        return acc;
      }, {});
    }

    runAcceptedCookieCallbacks() {
      if (!this.config.cookieTypes) return;
      const acceptedCookies = this.getAcceptedCookies();
      this.config.cookieTypes.forEach((type) => {
        if (type.required) return;
        if (acceptedCookies[type.id] && typeof type.onAccept === 'function') type.onAccept();
      });
    }

    runStoredCookiePreferenceCallbacks() {
      if (!this.config || !Array.isArray(this.config.cookieTypes)) return;
      this.config.cookieTypes.forEach((type) => {
        const accepted = localStorage.getItem(`${KEY_PREFIX}CookieChoice_${type.id}${this.getBannerSuffix()}`) === 'true';
        if (accepted) { if (typeof type.onAccept === 'function') type.onAccept(); }
        else { if (typeof type.onReject === 'function') type.onReject(); }
      });
    }

    loadRequiredCookies() {
      if (!this.config.cookieTypes) return;
      this.config.cookieTypes.forEach((cookie) => {
        if (cookie.required && typeof cookie.onAccept === 'function') cookie.onAccept();
      });
    }

    getBannerContent() {
      const bannerDescription = this.config.text?.banner?.description || '<p>We use cookies on our site to enhance your user experience, provide personalized content, and analyze our traffic.</p>';
      const acceptAllButtonText = this.config.text?.banner?.acceptAllButtonText || 'Accept all';
      const acceptAllButtonLabel = this.config.text?.banner?.acceptAllButtonAccessibleLabel;
      const acceptAllButton = `<button class="accept-all st-button st-button--primary"${acceptAllButtonLabel && acceptAllButtonLabel !== acceptAllButtonText ? ` aria-label="${acceptAllButtonLabel}"` : ''}>${acceptAllButtonText}</button>`;
      const rejectNonEssentialButtonText = this.config.text?.banner?.rejectNonEssentialButtonText || 'Reject non-essential';
      const rejectNonEssentialButtonLabel = this.config.text?.banner?.rejectNonEssentialButtonAccessibleLabel;
      const rejectNonEssentialButton = `<button class="reject-all st-button st-button--primary"${rejectNonEssentialButtonLabel && rejectNonEssentialButtonLabel !== rejectNonEssentialButtonText ? ` aria-label="${rejectNonEssentialButtonLabel}"` : ''}>${rejectNonEssentialButtonText}</button>`;
      const preferencesButtonText = this.config.text?.banner?.preferencesButtonText || 'Preferences';
      const preferencesButtonLabel = this.config.text?.banner?.preferencesButtonAccessibleLabel;
      const preferencesButton = `<button class="preferences"${preferencesButtonLabel && preferencesButtonLabel !== preferencesButtonText ? ` aria-label="${preferencesButtonLabel}"` : ''}><span>${preferencesButtonText}</span></button>`;
      const bannerContent = `
        ${bannerDescription}
        <div class="actions">
          ${acceptAllButton}
          ${rejectNonEssentialButton}
          <div class="actions-row">
            ${preferencesButton}
          </div>
        </div>
      `;
      return bannerContent;
    }

    hasSetInitialCookieChoices() { return !!localStorage.getItem(`${KEY_PREFIX}CookieBanner_InitialChoice${this.getBannerSuffix()}`); }

    createBanner() {
      this.banner = this.createWrapperChild(this.getBannerContent(), `${ID_PREFIX}-banner`);
      if (this.banner && this.config.position?.banner) this.banner.classList.add(this.config.position.banner);
      if (this.banner && typeof this.config.onBannerOpen === 'function') this.config.onBannerOpen();
    }
    removeBanner() {
      if (this.banner && this.banner.parentNode) {
        this.banner.parentNode.removeChild(this.banner); this.banner = null;
        if (typeof this.config.onBannerClose === 'function') this.config.onBannerClose();
      }
    }
    shouldShowBanner() { if (this.config.showBanner === false) return false; return (localStorage.getItem(`${KEY_PREFIX}CookieBanner_InitialChoice${this.getBannerSuffix()}`) === null); }

    getModalContent() {
      const preferencesTitle = this.config.text?.preferences?.title || 'Customize your cookie preferences';
      const preferencesDescription = this.config.text?.preferences?.description || '<p>We respect your right to privacy. You can choose not to allow some types of cookies. Your cookie preferences will apply across our website.</p>';
      const preferencesButtonLabel = this.config.text?.banner?.preferencesButtonAccessibleLabel;
      const closeModalButton = `<button class="modal-close"${preferencesButtonLabel ? ` aria-label="${preferencesButtonLabel}"` : ''}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.4081 3.41559C20.189 2.6347 20.189 1.36655 19.4081 0.585663C18.6272 -0.195221 17.3591 -0.195221 16.5782 0.585663L10 7.17008L3.41559 0.59191C2.6347 -0.188974 1.36655 -0.188974 0.585663 0.59191C-0.195221 1.37279 -0.195221 2.64095 0.585663 3.42183L7.17008 10L0.59191 16.5844C-0.188974 17.3653 -0.188974 18.6335 0.59191 19.4143C1.37279 20.1952 2.64095 20.1952 3.42183 19.4143L10 12.8299L16.5844 19.4081C17.3653 20.189 18.6335 20.189 19.4143 19.4081C20.1952 18.6272 20.1952 17.3591 19.4143 16.5782L12.8299 10L19.4081 3.41559Z"/></svg>
      </button>`;
      const cookieTypes = this.config.cookieTypes || [];
      const acceptedCookieMap = this.getAcceptedCookies();
      const acceptAllButtonText = this.config.text?.banner?.acceptAllButtonText || 'Accept all';
      const acceptAllButtonLabel = this.config.text?.banner?.acceptAllButtonAccessibleLabel;
      const acceptAllButton = `<button class="preferences-accept-all st-button st-button--primary"${acceptAllButtonLabel && acceptAllButtonLabel !== acceptAllButtonText ? ` aria-label="${acceptAllButtonLabel}"` : ''}>${acceptAllButtonText}</button>`;
      const rejectNonEssentialButtonText = this.config.text?.banner?.rejectNonEssentialButtonText || 'Reject non-essential';
      const rejectNonEssentialButtonLabel = this.config.text?.banner?.rejectNonEssentialButtonAccessibleLabel;
      const rejectNonEssentialButton = `<button class="preferences-reject-all st-button st-button--primary"${rejectNonEssentialButtonLabel && rejectNonEssentialButtonLabel !== rejectNonEssentialButtonText ? ` aria-label="${rejectNonEssentialButtonLabel}"` : ''}>${rejectNonEssentialButtonText}</button>`;
      const creditLinkText = this.config.text?.preferences?.creditLinkText || '';
      const creditLinkAccessibleLabel = this.config.text?.preferences?.creditLinkAccessibleLabel;
      const creditLink = creditLinkText ? `<a href="#" rel="nofollow"${creditLinkAccessibleLabel && creditLinkAccessibleLabel !== creditLinkText ? ` aria-label="${creditLinkAccessibleLabel}"` : ''}>${creditLinkText}</a>` : '';
      const modalContent = `
        <header>
          <h1>${preferencesTitle}</h1>
          ${closeModalButton}
        </header>
        ${preferencesDescription}
        <section id="cookie-preferences">
          ${cookieTypes.map((type) => {
            const accepted = acceptedCookieMap[type.id];
            let isChecked = false;
            if (accepted) { isChecked = true; }
            if (!accepted && !this.hasSetInitialCookieChoices()) { isChecked = type.defaultValue; }
            return `
              <fieldset>
                <legend>${type.name}</legend>
                <div class="cookie-type-content">
                  <div class="cookie-type-description">${type.description}</div>
                  <label class="switch" for="cookies-${type.id}">
                    <input type="checkbox" id="cookies-${type.id}" ${type.required ? 'checked disabled' : isChecked ? 'checked' : ''} />
                    <span class="switch__pill" aria-hidden="true"></span>
                    <span class="switch__dot" aria-hidden="true"></span>
                    <span class="switch__off" aria-hidden="true">Wył.</span>
                    <span class="switch__on" aria-hidden="true">Wł.</span>
                  </label>
                </div>
              </fieldset>
            `;
          }).join('')}
        </section>
        <footer>
          ${acceptAllButton}
          ${rejectNonEssentialButton}
          ${creditLink}
        </footer>
      `;
      return modalContent;
    }

    createModal() { this.modal = this.createWrapperChild(this.getModalContent(), `${ID_PREFIX}-modal`); }
    toggleModal(show) {
      if (!this.modal) return;
      this.modal.style.display = show ? 'flex' : 'none';
      if (show) {
        this.showBackdrop(); this.hideCookieIcon(); this.removeBanner(); this.preventBodyScroll();
        const modalCloseButton = this.modal.querySelector('.modal-close');
        if (window.innerWidth >= 768) {
          try { modalCloseButton.focus(); } catch (_) {}
        }
        if (typeof this.config.onPreferencesOpen === 'function') this.config.onPreferencesOpen();
        this.updateCheckboxState(false);
      } else {
        this.setInitialCookieChoiceMade();
        this.updateCheckboxState(true);
        this.hideBackdrop(); this.showCookieIcon(); this.allowBodyScroll();
        if (typeof this.config.onPreferencesClose === 'function') this.config.onPreferencesClose();
      }
    }

    getCookieIconContent() { return `<svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.1172 1.15625C19.0547 0.734374 18.7344 0.390624 18.3125 0.328124C16.5859 0.0859365 14.8281 0.398437 13.2813 1.21875L7.5 4.30469C5.96094 5.125 4.71875 6.41406 3.95313 7.98437L1.08594 13.8906C0.320314 15.4609 0.0703136 17.2422 0.375001 18.9609L1.50781 25.4297C1.8125 27.1562 2.64844 28.7344 3.90625 29.9531L8.61719 34.5156C9.875 35.7344 11.4766 36.5156 13.2031 36.7578L19.6875 37.6719C21.4141 37.9141 23.1719 37.6016 24.7188 36.7812L30.5 33.6953C32.0391 32.875 33.2813 31.5859 34.0469 30.0078L36.9141 24.1094C37.6797 22.5391 37.9297 20.7578 37.625 19.0391C37.5547 18.625 37.2109 18.3125 36.7969 18.25C32.7734 17.6094 29.5469 14.5703 28.6328 10.6406C28.4922 10.0469 28.0078 9.59375 27.4063 9.5C23.1406 8.82031 19.7734 5.4375 19.1094 1.15625H19.1172ZM15.25 10.25C15.913 10.25 16.5489 10.5134 17.0178 10.9822C17.4866 11.4511 17.75 12.087 17.75 12.75C17.75 13.413 17.4866 14.0489 17.0178 14.5178C16.5489 14.9866 15.913 15.25 15.25 15.25C14.587 15.25 13.9511 14.9866 13.4822 14.5178C13.0134 14.0489 12.75 13.413 12.75 12.75C12.75 12.087 13.0134 11.4511 13.4822 10.9822C13.9511 10.5134 14.587 10.25 15.25 10.25ZM10.25 25.25C10.25 24.587 10.5134 23.9511 10.9822 23.4822C11.4511 23.0134 12.087 22.75 12.75 22.75C13.413 22.75 14.0489 23.0134 14.5178 23.4822C14.9866 23.9511 15.25 24.587 15.25 25.25C15.25 25.913 14.9866 26.5489 14.5178 27.0178C14.0489 27.4866 13.413 27.75 12.75 27.75C12.087 27.75 11.4511 27.4866 10.9822 27.0178C10.5134 26.5489 10.25 25.913 10.25 25.25ZM27.75 20.25C28.413 20.25 29.0489 20.5134 29.5178 20.9822C29.9866 21.4511 30.25 22.087 30.25 22.75C30.25 23.413 29.9866 24.0489 29.5178 24.5178C29.0489 24.9866 28.413 25.25 27.75 25.25C27.087 25.25 26.4511 24.9866 25.9822 24.5178C25.5134 24.0489 25.25 23.413 25.25 22.75C25.25 22.087 25.5134 21.4511 25.9822 20.9822C26.4511 20.5134 27.087 20.25 27.75 20.25Z"/></svg>`; }

    createCookieIcon() {
      this.cookieIcon = document.createElement('button');
      this.cookieIcon.id = `${ID_PREFIX}-cookie-icon`;
      this.cookieIcon.title = 'Zarządzaj swoimi preferencjami plików cookies';
      this.cookieIcon.innerHTML = this.getCookieIconContent();
      if (this.config.text?.banner?.preferencesButtonAccessibleLabel) this.cookieIcon.ariaLabel = this.config.text?.banner?.preferencesButtonAccessibleLabel;
      if (!this.wrapper || !document.body.contains(this.wrapper)) this.createWrapper();
      this.wrapper.appendChild(this.cookieIcon);
      if (this.cookieIcon && this.config.cookieIcon?.position) this.cookieIcon.classList.add(this.config.cookieIcon.position);
      if (this.cookieIcon && this.config.cookieIcon?.colorScheme) this.cookieIcon.classList.add(this.config.cookieIcon.colorScheme);
    }
    showCookieIcon() { if (this.cookieIcon) this.cookieIcon.style.display = 'flex'; }
    hideCookieIcon() { if (this.cookieIcon) this.cookieIcon.style.display = 'none'; }

    handleClosedWithNoChoice() {
      this.config.cookieTypes.forEach((type) => {
        let accepted = true;
        if (type.required == true || type.defaultValue) {
          localStorage.setItem(`${KEY_PREFIX}CookieChoice_${type.id}${this.getBannerSuffix()}`, accepted.toString());
        } else {
          accepted = false;
          localStorage.setItem(`${KEY_PREFIX}CookieChoice_${type.id}${this.getBannerSuffix()}`, accepted.toString());
        }
        if (accepted) { if (typeof type.onAccept === 'function') type.onAccept(); }
        else { if (typeof type.onReject === 'function') type.onReject(); }
        this.setInitialCookieChoiceMade();
        this.updateCheckboxState();
      });
    }

    getFocusableElements(element) { return element.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'); }

    setupEventListeners() {
      if (this.banner) {
        const acceptButton = this.banner.querySelector('.accept-all');
        const rejectButton = this.banner.querySelector('.reject-all');
        const preferencesButton = this.banner.querySelector('.preferences');
        acceptButton?.addEventListener('click', () => this.handleCookieChoice(true));
        rejectButton?.addEventListener('click', () => this.handleCookieChoice(false));
        preferencesButton?.addEventListener('click', () => { this.showBackdrop(); this.toggleModal(true); });
        const focusableElements = this.getFocusableElements(this.banner);
        const firstFocusableEl = focusableElements[0];
        const lastFocusableEl = focusableElements[focusableElements.length - 1];
        this.banner.addEventListener('keydown', (e) => {
          if (e.key === 'Tab') {
            if (e.shiftKey) { if (document.activeElement === firstFocusableEl) { lastFocusableEl.focus(); e.preventDefault(); } }
            else { if (document.activeElement === lastFocusableEl) { firstFocusableEl.focus(); e.preventDefault(); } }
          }
        });
        if (this.config.mode !== 'wizard' && window.innerWidth >= 768) {
          try { acceptButton?.focus(); } catch (_) {}
        }
      }

      if (this.modal) {
        const closeButton = this.modal.querySelector('.modal-close');
        const acceptAllButton = this.modal.querySelector('.preferences-accept-all');
        const rejectAllButton = this.modal.querySelector('.preferences-reject-all');
        closeButton?.addEventListener('click', () => {
          this.toggleModal(false);
          const hasMadeFirstChoice = this.hasSetInitialCookieChoices();
          if (hasMadeFirstChoice) this.runStoredCookiePreferenceCallbacks();
          else this.handleClosedWithNoChoice();
        });
        acceptAllButton?.addEventListener('click', () => this.handleCookieChoice(true));
        rejectAllButton?.addEventListener('click', () => this.handleCookieChoice(false));
        const focusableElements = this.getFocusableElements(this.modal);
        const firstFocusableEl = focusableElements[0];
        const lastFocusableEl = focusableElements[focusableElements.length - 1];
        this.modal.addEventListener('keydown', (e) => {
          if (e.key === 'Tab') {
            if (e.shiftKey) { if (document.activeElement === firstFocusableEl) { lastFocusableEl.focus(); e.preventDefault(); } }
            else { if (document.activeElement === lastFocusableEl) { firstFocusableEl.focus(); e.preventDefault(); } }
          }
          if (e.key === 'Escape') this.toggleModal(false);
        });
        if (window.innerWidth >= 768) {
          try { closeButton?.focus(); } catch (_) {}
        }
        const preferencesSection = this.modal.querySelector('#cookie-preferences');
        const checkboxes = preferencesSection.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
          checkbox.addEventListener('change', (event) => {
            const [, cookieId] = event.target.id.split('cookies-');
            const isAccepted = event.target.checked;
            const previousValue = localStorage.getItem(`${KEY_PREFIX}CookieChoice_${cookieId}${this.getBannerSuffix()}`) === 'true';
            if (isAccepted !== previousValue) {
              const cookieType = this.config.cookieTypes.find(type => type.id === cookieId);
              if (cookieType) {
                localStorage.setItem(`${KEY_PREFIX}CookieChoice_${cookieId}${this.getBannerSuffix()}`, isAccepted.toString());
                if (isAccepted && typeof cookieType.onAccept === 'function') cookieType.onAccept();
                else if (!isAccepted && typeof cookieType.onReject === 'function') cookieType.onReject();
              }
            }
          });
        });
      }

      if (this.cookieIcon) {
        this.cookieIcon.addEventListener('click', () => {
          if (!this.modal) { this.createModal(); this.toggleModal(true); this.hideCookieIcon(); }
          else if (this.modal.style.display === 'none' || this.modal.style.display === '') { this.toggleModal(true); this.hideCookieIcon(); }
          else { this.toggleModal(false); }
        });
      }
    }

    getBannerSuffix() { return this.config.bannerSuffix ? '_' + this.config.bannerSuffix : ''; }
    // Only control vertical scrolling so we don't break any custom overflow-x settings
    preventBodyScroll() { document.documentElement.style.overflowY = 'hidden'; document.body.style.overflowY = 'hidden'; }
    allowBodyScroll() { document.documentElement.style.overflowY = ''; document.body.style.overflowY = ''; }
  }

  window.silktideCookieBannerManager = {};
  let config = {
    background: { showBackground: true },
    position: { banner: 'bottomLeft' },
    cookieIcon: { position: 'bottomLeft' },
    cookieTypes: [],
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
    }
  };
  let cookieBanner;

  function updateCookieBannerConfig(userConfig = {}) {
    config = {
      background: { showBackground: true },
      position: { banner: 'bottomLeft' },
      cookieIcon: { position: 'bottomLeft' },
      cookieTypes: [],
      text: config.text,
      ...config,
      ...userConfig
    };
    if (cookieBanner) { cookieBanner.destroyCookieBanner(); cookieBanner = null; }
    if (document.body) initCookieBanner();
    else document.addEventListener('DOMContentLoaded', initCookieBanner, {once: true});
  }

  function initCookieBanner() { if (!cookieBanner) cookieBanner = new CookieBanner(config); }

  function injectScript(url, loadOption) {
    const existingScript = document.querySelector(`script[src="${url}"]`);
    if (existingScript) return;
    const script = document.createElement('script');
    script.src = url;
    if (loadOption === 'async') script.async = true; else if (loadOption === 'defer') script.defer = true;
    document.head.appendChild(script);
  }

  window.silktideCookieBannerManager.initCookieBanner = initCookieBanner;
  window.silktideCookieBannerManager.updateCookieBannerConfig = updateCookieBannerConfig;
  window.silktideCookieBannerManager.injectScript = injectScript;
})();


