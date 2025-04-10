/**
 * Knex configuration file
 */

export default {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './database.sqlite'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './migrations'
    }
  }
};
