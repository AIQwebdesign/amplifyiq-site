import test from 'node:test';
import assert from 'node:assert/strict';
import { createConsent, parseConsent, MAX_AGE } from '../dist/consent-core.mjs';
const now = Date.UTC(2026, 8, 30);
test('default/rejected choices do not enable optional services', () => {
  assert.deepEqual(createConsent(false, now).categories, { necessary:true, functional:false, analytics:false, marketing:false });
});
test('accept enables only deployed optional services', () => {
  assert.deepEqual(createConsent(true, now).categories, { necessary:true, functional:true, analytics:false, marketing:false });
});
test('valid choices survive serialization until expiry', () => {
  const choice = createConsent(true, now);
  assert.deepEqual(parseConsent(JSON.stringify(choice), now + MAX_AGE - 1), choice);
  assert.equal(parseConsent(JSON.stringify(choice), now + MAX_AGE), null);
});
test('changed policy, malformed values, future or extended records require a new choice', () => {
  for (const record of [null, 'broken', '{}', JSON.stringify({...createConsent(true,now),version:'old'}), JSON.stringify(createConsent(true,now+1)), JSON.stringify({...createConsent(true,now),expiresAt:now+MAX_AGE+1}), JSON.stringify({...createConsent(true,now),categories:{necessary:true,functional:'true',analytics:false,marketing:false}})]) assert.equal(parseConsent(record, now), null);
});
test('withdrawal is persisted with optional functionality disabled', () => {
  const withdrawn = createConsent(false, now + 5000);
  assert.equal(parseConsent(JSON.stringify(withdrawn),now+6000).categories.functional,false);
});
