/**
 * Миграция: создание всех таблиц проекта
 */

export async function up(knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('username').notNullable();
    table.string('email').notNullable().unique();
    table.string('password_hash').notNullable();
    table.string('full_name');
    table.string('role');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('posts', (table) => {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('title').notNullable();
    table.text('content');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('comments', (table) => {
    table.increments('id').primary();
    table.integer('post_id').references('id').inTable('posts').onDelete('CASCADE');
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.text('content');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.boolean('is_edited').defaultTo(false);
  });

  await knex.schema.createTable('friends', (table) => {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.integer('friend_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('status');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('messages', (table) => {
    table.increments('id').primary();
    table.integer('sender_id').references('id').inTable('users').onDelete('CASCADE');
    table.integer('receiver_id').references('id').inTable('users').onDelete('CASCADE');
    table.text('content');
    table.timestamp('sent_at').defaultTo(knex.fn.now());
    table.boolean('is_read').defaultTo(false);
  });

  await knex.schema.createTable('items', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.text('description');
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('comments');
  await knex.schema.dropTableIfExists('messages');
  await knex.schema.dropTableIfExists('friends');
  await knex.schema.dropTableIfExists('posts');
  await knex.schema.dropTableIfExists('items');
  await knex.schema.dropTableIfExists('users');
}
