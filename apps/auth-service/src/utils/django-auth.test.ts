import { describe, expect, test } from 'vitest';
import { djangoPassword } from './django-auth.js';

describe('djangoPassword', () => {
  const example =
    'pbkdf2_sha256$600000$gHuhSlVuJpdyosldF0gHZZ$432Oxf84IlTBxLKOF2G/li62G++vXMxUlqDixWG6K70='; // "password1"

  test('password match', async () => {
    const result = await djangoPassword.verify({
      password: 'password1',
      hash: example,
    });
    expect(result).toBe(true);
  });

  test('password mismatch', async () => {
    const result = await djangoPassword.verify({
      password: 'wrong-password',
      hash: example,
    });
    expect(result).toBe(false);
  });

  test('hashes password', async () => {
    const password = 'password-new!';
    const hash = await djangoPassword.hash(password);
    const result = await djangoPassword.verify({
      password,
      hash,
    });
    expect(result).toBe(true);
    expect(hash.split('$').length).toBe(4);
  });
});
