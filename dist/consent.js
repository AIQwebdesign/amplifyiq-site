import { KEY, VERSION, defaults, createConsent, parseConsent } from './consent-core.mjs?v=20261003';

let consent = null, opener = null, expiryTimer;
try { consent = parseConsent(localStorage.getItem(KEY)); if (!consent) localStorage.removeItem(KEY); } catch {}
const inventory = `<div class="cookie-inventory"><h3>Technologies on this website</h3><dl><dt>amplifyiq_consent · AmplifyIQ</dt><dd>Strictly Necessary · First-party local storage · 180 days. Remembers your categories, choice date and policy version. It is not a tracking identifier.</dd><dt>Google Maps embedded map · Google</dt><dd>Functional · Third-party embed. Loaded only with Functional consent. Google receives technical data and may use cookies or similar storage; names and lifespans vary with Google’s service and your Google/browser settings. No fixed cookie names are asserted here. <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener">Google’s cookie information</a>.</dd></dl><p>No analytics or marketing tools are installed. The hero video, images, animations and fonts are served by this website. Social and portfolio links load other websites only when you follow them.</p></div>`;
const banner = document.createElement('section');
banner.className = 'cookie-banner'; banner.setAttribute('aria-label', 'Cookie choices');
banner.innerHTML = `<div><h2>We value your privacy</h2><p>We remember your privacy choices. With your permission, we also load Google Maps. No analytics or marketing trackers are installed. Change your choice anytime in Cookie Settings.</p><p class="cookie-policy-links"><a href="/cookie-policy">Cookie Policy</a><a href="/privacy-policy">Privacy Policy</a></p></div><div class="cookie-actions"><button data-choice="accept">Accept All</button><button data-choice="reject">Reject Non-Essential</button><button data-cookie-settings>Manage Preferences</button></div>`;
if (document.body.classList.contains('legal-page')) document.querySelector('main').prepend(banner);
else document.body.append(banner);
const dialog = document.createElement('dialog');
dialog.className = 'cookie-dialog'; dialog.setAttribute('aria-labelledby', 'privacy-title');
dialog.innerHTML = `<div class="cookie-dialog-heading"><span class="mono">AMPLIFYIQ / YOUR CHOICE</span><button class="cookie-close" aria-label="Close cookie settings">×</button></div><h2 id="privacy-title">Privacy Preferences</h2><p>Choose which optional features can load. You can change or withdraw your consent at any time. Closing this panel does not give consent.</p><div class="cookie-category"><div><h3>Strictly Necessary</h3><p>Remembers your privacy choices using first-party local storage.</p></div><strong>Always Active</strong></div><label class="cookie-category"><span><strong>Functional</strong><small>Allows the Google Maps embed. Google may process technical data and use cookies.</small></span><input type="checkbox" name="functional" aria-label="Functional cookies"></label><label class="cookie-category"><span><strong>Analytics</strong><small>Not in use. No analytics tools are installed.</small></span><input type="checkbox" name="analytics" aria-label="Analytics cookies — not in use" disabled></label><label class="cookie-category"><span><strong>Marketing</strong><small>Not in use. No marketing tools are installed.</small></span><input type="checkbox" name="marketing" aria-label="Marketing cookies — not in use" disabled></label>${inventory}<p class="cookie-record"></p><div class="cookie-actions"><button data-choice="save">Save Preferences</button><button data-choice="reject">Reject Non-Essential</button><button data-choice="accept">Accept All</button></div><p class="cookie-policy-links"><a href="/cookie-policy">Cookie Policy</a><a href="/privacy-policy">Privacy Policy</a></p>`;
document.body.append(dialog);
const status = document.createElement('p'); status.className = 'cookie-status'; status.setAttribute('role','status'); document.body.append(status);
function apply() {
  const enabled = consent?.categories.functional === true;
  document.querySelectorAll('[data-consent-map]').forEach(host => {
    const fallback = host.querySelector('.map-consent-message');
    let frame = host.querySelector('iframe');
    if (enabled && !frame) {
      frame = document.createElement('iframe'); frame.title = 'Google Maps: Clare, County Mayo, F12 W7W9';
      frame.referrerPolicy = 'no-referrer-when-downgrade'; frame.allowFullscreen = true;
      frame.src = host.dataset.consentMap; host.prepend(frame);
    } else if (!enabled && frame) frame.remove();
    fallback.hidden = enabled;
  });
  banner.hidden = !!consent;
  document.documentElement.classList.toggle('cookie-choice-pending', !consent);
  clearTimeout(expiryTimer);
  if (consent) expiryTimer = setTimeout(checkExpiry, Math.min(consent.expiresAt - Date.now(), 86400000));
}
function checkExpiry() {
  if (consent && !parseConsent(JSON.stringify(consent))) {
    consent = null; try { localStorage.removeItem(KEY); } catch {}
  }
  apply();
}
function openSettings(trigger) {
  checkExpiry(); opener = trigger || document.activeElement;
  dialog.querySelector('[name=functional]').checked = consent?.categories.functional === true;
  dialog.querySelector('.cookie-record').textContent = consent ? `Choice saved ${new Date(consent.timestamp).toLocaleDateString('en-IE')}. Renew by ${new Date(consent.expiresAt).toLocaleDateString('en-IE')}. Policy version ${VERSION}.` : 'Optional features are off until you choose. We ask again after 180 days or when our cookie configuration changes.';
  if (!dialog.open) dialog.showModal();
  dialog.querySelector('.cookie-close').focus();
}
function closeSettings() { dialog.close(); if (opener?.isConnected && !opener.closest('[hidden]')) opener.focus({ preventScroll: true }); }
function save(functional) {
  consent = createConsent(functional);
  let stored = true; try { localStorage.setItem(KEY, JSON.stringify(consent)); } catch { stored = false; }
  apply(); if (dialog.open) closeSettings();
  status.textContent = stored ? 'Cookie preferences saved. You can change them in Cookie Settings.' : 'Preferences applied for this page. Your browser prevented storage, so we will ask again on your next visit.';
  // No optional first-party cookies exist to delete. Removing the Google iframe
  // stops further use; this origin cannot delete cookies owned by Google.
}
document.addEventListener('click', event => {
  const enableMap = event.target.closest('[data-enable-map]');
  if (enableMap) { event.preventDefault(); save(true); return; }
  const settings = event.target.closest('[data-cookie-settings]');
  if (settings) { event.preventDefault(); openSettings(settings); return; }
  const button = event.target.closest('[data-choice]');
  if (!button || (!banner.contains(button) && !dialog.contains(button))) return;
  save(button.dataset.choice === 'accept' || (button.dataset.choice === 'save' && dialog.querySelector('[name=functional]').checked));
});
dialog.querySelector('.cookie-close').addEventListener('click', closeSettings);
dialog.addEventListener('cancel', event => { event.preventDefault(); closeSettings(); });
addEventListener('storage', event => { if (event.key === KEY || event.key === null) { consent = parseConsent(event.newValue); apply(); } });
addEventListener('pageshow', checkExpiry);
document.addEventListener('visibilitychange', () => { if (!document.hidden) checkExpiry(); });
document.querySelectorAll('[data-cookie-inventory]').forEach(node => { node.innerHTML = inventory; });
apply();
