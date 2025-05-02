"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const database_js_1 = require("./database.js");
(0, vitest_1.describe)('Database functions', () => {
    (0, vitest_1.it)('createUser и getUserByEmail', async () => {
        const timestamp = Date.now();
        const email = `dbtest_${timestamp}@example.com`;
        const username = `DBTestUser_${timestamp}`;
        const passwordHash = 'hashedpassword';
        await (0, database_js_1.createUser)(username, email, passwordHash);
        const user = await (0, database_js_1.getUserByEmail)(email);
        (0, vitest_1.expect)(user).not.toBeNull();
        (0, vitest_1.expect)(user.email).toBe(email);
        (0, vitest_1.expect)(user.username).toBe(username);
        (0, vitest_1.expect)(user.password_hash).toBe(passwordHash);
    });
});
