describe('Аутентификация', () => {
  it('Регистрирует нового пользователя и входит', () => {
    cy.visit('/');

    const uniqueEmail = `testuser_${Date.now()}@example.com`;

    cy.contains('Регистрация').click();
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="email"]').type(uniqueEmail);
    cy.get('input[name="password"]').type('password123');
    cy.get('form').submit();

    // Ждём закрытия модалки
    cy.wait(500);

    // После регистрации сразу выполняем вход
    cy.contains('Войти').click({ force: true });
    cy.get('input[name="email"]').type(uniqueEmail);
    cy.get('input[name="password"]').type('password123');
    cy.get('form').submit();

  });

  it('Входит существующим пользователем', () => {
    cy.visit('/');

    cy.contains('Войти').click();
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('form').submit();

    cy.contains('testuser@example.com');
  });

  it('Выходит из аккаунта', () => {
    cy.visit('/');

    cy.contains('Войти').click();
    cy.get('input[name="email"]').type('testuser@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('form').submit();

    cy.contains('Выйти').click();
    cy.contains('Войти');
    cy.contains('Регистрация');
  });
});
