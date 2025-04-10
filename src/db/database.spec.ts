import { describe, it, expect } from 'vitest';
import { createUser, getUserByEmail } from './database.js';

describe('Database functions', () => {
  it('createUser и getUserByEmail', async () => {
    const timestamp = Date.now();
    const email = `dbtest_${timestamp}@example.com`;
    const username = `DBTestUser_${timestamp}`;
    const passwordHash = 'hashedpassword';

    await createUser(username, email, passwordHash);
    const user = await getUserByEmail(email);

    expect(user).not.toBeNull();
    expect(user.email).toBe(email);
    expect(user.username).toBe(username);
    expect(user.password_hash).toBe(passwordHash);
  });
});
