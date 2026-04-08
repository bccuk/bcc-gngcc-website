/* ============================================================
   GNG Cricket Club — Main JS
   ============================================================ */

(function () {
    'use strict';

    const analyticsId = 'G-4L1MZ7V119';
    const cookieConsentKey = 'gng_cookie_consent';
    const installBannerDismissedKey = 'gng_install_banner_dismissed_at';
    const installBannerCooldownMs = 1000 * 60 * 60 * 24 * 7;
    let deferredInstallPrompt = null;

    function loadAnalytics() {
        if (document.getElementById('gng-ga-script')) return;

        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function () {
            window.dataLayer.push(arguments);
        };

        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + analyticsId;
        gaScript.id = 'gng-ga-script';
        document.head.appendChild(gaScript);

        window.gtag('js', new Date());
        window.gtag('config', analyticsId, {
            page_path: window.location.pathname,
        });
    }

    function clearAnalyticsCookies() {
        const host = window.location.hostname;
        const baseDomain = host.split('.').slice(-2).join('.');
        const cookieNames = ['_ga', '_gid', '_gat'];

        document.cookie.split(';').forEach(function (item) {
            const name = item.split('=')[0].trim();
            if (name === '_ga' || name.indexOf('_ga_') === 0 || cookieNames.indexOf(name) !== -1) {
                [
                    'path=/',
                    'path=/;domain=' + host,
                    'path=/;domain=.' + host,
                    baseDomain && baseDomain !== host ? 'path=/;domain=' + baseDomain : '',
                    baseDomain && baseDomain !== host ? 'path=/;domain=.' + baseDomain : '',
                ].filter(Boolean).forEach(function (scope) {
                    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; ' + scope + '; SameSite=Lax';
                });
            }
        });
    }

    function getCookieConsent() {
        return window.localStorage.getItem(cookieConsentKey);
    }

    function setCookieConsent(value) {
        window.localStorage.setItem(cookieConsentKey, value);
    }

    function ensureCookieBanner() {
        let banner = document.getElementById('cookie-banner');
        if (banner) return banner;

        banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.className = 'cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-live', 'polite');
        banner.setAttribute('aria-label', 'Cookie preferences');
        banner.hidden = true;
        banner.innerHTML = [
            '<p class="font-headline font-black text-lg mb-2">Cookie preferences</p>',
            '<p class="text-sm text-white/80 leading-relaxed">We use analytics cookies to understand how visitors use the site and improve it. You can accept or reject non-essential cookies. Read our <a href="cookie-policy.html">Cookie Policy</a> for details.</p>',
            '<div class="cookie-banner__actions">',
            '<button type="button" class="cookie-banner__button cookie-banner__button--primary" data-cookie-choice="accepted">Accept Analytics</button>',
            '<button type="button" class="cookie-banner__button cookie-banner__button--secondary" data-cookie-choice="rejected">Reject Non-Essential</button>',
            '</div>'
        ].join('');

        document.body.appendChild(banner);

        banner.querySelectorAll('[data-cookie-choice]').forEach(function (button) {
            button.addEventListener('click', function () {
                applyCookieConsent(button.getAttribute('data-cookie-choice'));
            });
        });

        return banner;
    }

    function showCookieBanner() {
        ensureCookieBanner().hidden = false;
    }

    function hideCookieBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) banner.hidden = true;
    }

    function applyCookieConsent(choice) {
        setCookieConsent(choice);

        if (choice === 'accepted') {
            loadAnalytics();
        } else {
            clearAnalyticsCookies();
        }

        hideCookieBanner();
    }

    function isStandaloneMode() {
        return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    }

    function isIosDevice() {
        return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
    }

    function installBannerWasDismissedRecently() {
        const value = Number(window.localStorage.getItem(installBannerDismissedKey) || '0');
        return value && (Date.now() - value) < installBannerCooldownMs;
    }

    function dismissInstallBanner() {
        window.localStorage.setItem(installBannerDismissedKey, String(Date.now()));
        const banner = document.getElementById('install-banner');
        if (banner) banner.hidden = true;
    }

    function ensureInstallBanner() {
        let banner = document.getElementById('install-banner');
        if (banner) return banner;

        banner = document.createElement('div');
        banner.id = 'install-banner';
        banner.className = 'install-banner';
        banner.hidden = true;
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-live', 'polite');
        document.body.appendChild(banner);
        return banner;
    }

    function showInstallBanner(mode) {
        if (isStandaloneMode() || installBannerWasDismissedRecently()) return;

        const banner = ensureInstallBanner();
        const message = mode === 'ios'
            ? 'Install GNG Cricket Club on your iPhone or iPad from Safari: tap Share, then choose "Add to Home Screen".'
            : 'Install GNG Cricket Club for faster access, a full-screen experience, and offline support.';
        const primaryLabel = mode === 'ios' ? 'Got It' : 'Install App';

        banner.innerHTML = [
            '<div class="install-banner__title">',
            '<img src="assets/images/icon-192.png" alt="GNG Cricket Club app icon" class="install-banner__icon" />',
            '<div>',
            '<p class="font-headline font-black text-lg leading-tight">Install GNG Cricket Club</p>',
            '<p class="text-xs uppercase tracking-[0.22em] text-white/60 mt-1">Web App</p>',
            '</div>',
            '</div>',
            '<p class="text-sm text-white/80 leading-relaxed">' + message + '</p>',
            '<div class="install-banner__actions">',
            '<button type="button" class="install-banner__button install-banner__button--primary" data-install-action="primary">' + primaryLabel + '</button>',
            '<button type="button" class="install-banner__button install-banner__button--secondary" data-install-action="dismiss">Not Now</button>',
            '</div>'
        ].join('');

        banner.querySelector('[data-install-action="dismiss"]').addEventListener('click', dismissInstallBanner);
        banner.querySelector('[data-install-action="primary"]').addEventListener('click', async function () {
            if (mode === 'ios') {
                dismissInstallBanner();
                return;
            }

            if (!deferredInstallPrompt) return;

            deferredInstallPrompt.prompt();
            try {
                await deferredInstallPrompt.userChoice;
            } finally {
                deferredInstallPrompt = null;
                dismissInstallBanner();
            }
        });

        banner.hidden = false;
    }

    function registerServiceWorker() {
        if (!('serviceWorker' in navigator)) return;

        window.addEventListener('load', function () {
            navigator.serviceWorker.register('service-worker.js').catch(function () {
                // Keep registration failure silent on this static brochure site.
            });
        });
    }

    /* ── Mobile nav toggle ─────────────────────────────────── */
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIconOpen = document.getElementById('menu-icon-open');
    const menuIconClose = document.getElementById('menu-icon-close');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function () {
            const isOpen = mobileMenu.classList.toggle('open');
            if (menuIconOpen) menuIconOpen.style.display = isOpen ? 'none' : 'inline';
            if (menuIconClose) menuIconClose.style.display = isOpen ? 'inline' : 'none';
        });

        // Close menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileMenu.classList.remove('open');
                if (menuIconOpen) menuIconOpen.style.display = 'inline';
                if (menuIconClose) menuIconClose.style.display = 'none';
            });
        });
    }

    /* ── Formspree AJAX form submission ────────────────────── */
    document.querySelectorAll('form[data-formspree]').forEach(function (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            const btn = form.querySelector('[type="submit"]');
            const successMsg = form.parentElement ? form.parentElement.querySelector('.form-success') : null;
            const originalText = btn ? btn.innerHTML : '';

            if (btn) {
                btn.disabled = true;
                btn.innerHTML = 'Sending…';
            }

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    form.reset();
                    form.style.display = 'none';
                    if (successMsg && successMsg.classList.contains('form-success')) {
                        successMsg.classList.add('show');
                    }
                } else {
                    const data = await response.json();
                    const errorMsg = (data.errors || []).map(function (e) { return e.message; }).join(', ');
                    alert('There was a problem: ' + (errorMsg || 'Please try again.'));
                    if (btn) {
                        btn.disabled = false;
                        btn.innerHTML = originalText;
                    }
                }
            } catch (err) {
                alert('Network error — please check your connection and try again.');
                if (btn) {
                    btn.disabled = false;
                    btn.innerHTML = originalText;
                }
            }
        });
    });

    /* ── Scroll-based nav shadow ───────────────────────────── */
    const siteHeader = document.getElementById('site-header');
    if (siteHeader) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 20) {
                siteHeader.classList.add('shadow-md');
            } else {
                siteHeader.classList.remove('shadow-md');
            }
        }, { passive: true });
    }

    /* ── Cookie consent + analytics ────────────────────────── */
    const cookieConsent = getCookieConsent();
    if (cookieConsent === 'accepted') {
        loadAnalytics();
    } else if (cookieConsent === 'rejected') {
        clearAnalyticsCookies();
    } else {
        showCookieBanner();
    }

    document.querySelectorAll('[data-cookie-settings]').forEach(function (button) {
        button.addEventListener('click', function () {
            showCookieBanner();
        });
    });

    /* ── PWA registration + install UX ────────────────────── */
    registerServiceWorker();

    window.addEventListener('beforeinstallprompt', function (event) {
        event.preventDefault();
        deferredInstallPrompt = event;
        showInstallBanner('installable');
    });

    window.addEventListener('appinstalled', function () {
        dismissInstallBanner();
        deferredInstallPrompt = null;
    });

    if (isIosDevice() && !isStandaloneMode()) {
        showInstallBanner('ios');
    }

})();
