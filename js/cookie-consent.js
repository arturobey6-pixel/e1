/* ============================================================
   CleanRide Garage — Cookie Consent Banner (GDPR / Google Ads)
   Stores choice for 12 months. Integrates with Google Consent
   Mode: analytics/ad cookies stay OFF until the user accepts.
   ============================================================ */
(function () {
  'use strict';

  var COOKIE_NAME = 'crg_cookie_consent';

  function getConsent() {
    var m = document.cookie.match(new RegExp('(?:^|; )' + COOKIE_NAME + '=([^;]*)'));
    return m ? m[1] : null;
  }

  function setConsent(value) {
    document.cookie = COOKIE_NAME + '=' + value + '; max-age=31536000; path=/; SameSite=Lax';
  }

  function applyConsent(value) {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        analytics_storage: value === 'accepted' ? 'granted' : 'denied',
        ad_storage: value === 'accepted' ? 'granted' : 'denied',
        ad_user_data: value === 'accepted' ? 'granted' : 'denied',
        ad_personalization: value === 'accepted' ? 'granted' : 'denied'
      });
    }
  }

  var saved = getConsent();
  if (saved) { applyConsent(saved); return; }

  /* ---------- styles ---------- */
  var css = ''
    + '#crg-cookie-banner{position:fixed;left:0;right:0;bottom:0;z-index:99999;'
    + 'background:#1B1B1B;color:#eee;border-top:2px solid #F5C518;'
    + 'box-shadow:0 -6px 24px rgba(0,0,0,.55);padding:18px 20px;'
    + "font-family:inherit;font-size:15px;line-height:1.55;}"
    + '#crg-cookie-banner .crg-inner{max-width:1140px;margin:0 auto;display:flex;'
    + 'flex-wrap:wrap;align-items:center;gap:16px;justify-content:space-between;}'
    + '#crg-cookie-banner .crg-text{flex:1 1 520px;min-width:260px;color:#cfcfcf;margin:0;}'
    + '#crg-cookie-banner .crg-text strong{color:#fff;}'
    + '#crg-cookie-banner a{color:#F5C518;text-decoration:underline;}'
    + '#crg-cookie-banner .crg-actions{display:flex;gap:10px;flex-wrap:wrap;}'
    + '#crg-cookie-banner button{cursor:pointer;border-radius:8px;font-weight:700;'
    + 'padding:10px 22px;font-size:14px;border:2px solid #F5C518;transition:opacity .2s;}'
    + '#crg-cookie-banner button:hover{opacity:.85;}'
    + '#crg-accept-btn{background:#F5C518;color:#111;}'
    + '#crg-decline-btn{background:transparent;color:#F5C518;}'
    + '@media (max-width:576px){#crg-cookie-banner{padding:14px 14px;font-size:14px;}'
    + '#crg-cookie-banner .crg-actions{width:100%;}'
    + '#crg-cookie-banner button{flex:1 1 auto;}}';

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  /* ---------- banner ---------- */
  var banner = document.createElement('div');
  banner.id = 'crg-cookie-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-live', 'polite');
  banner.setAttribute('aria-label', 'Cookie consent');
  banner.innerHTML = ''
    + '<div class="crg-inner">'
    + '  <p class="crg-text"><strong>🍪 We value your privacy.</strong> '
    + 'We use cookies to analyze site traffic (Google Analytics) and improve your experience. '
    + 'You can accept or decline non-essential cookies. Read our '
    + '<a href="cookie-policy.html">Cookie Policy</a> and '
    + '<a href="privacy-policy.html">Privacy Policy</a>.</p>'
    + '  <div class="crg-actions">'
    + '    <button type="button" id="crg-decline-btn">Decline</button>'
    + '    <button type="button" id="crg-accept-btn">Accept All</button>'
    + '  </div>'
    + '</div>';

  function choose(value) {
    setConsent(value);
    applyConsent(value);
    var el = document.getElementById('crg-cookie-banner');
    if (el) el.parentNode.removeChild(el);
  }

  function mount() {
    document.body.appendChild(banner);
    document.getElementById('crg-accept-btn').addEventListener('click', function () { choose('accepted'); });
    document.getElementById('crg-decline-btn').addEventListener('click', function () { choose('declined'); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
