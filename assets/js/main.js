/* ============================================================
   GNG Cricket Club — Main JS
   ============================================================ */

(function () {
    'use strict';

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

})();
