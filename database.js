const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: 'database.sqlite'
  },
  useNullAsDefault: true
})

knex.schema
.hasTable('users')
.then((exists) => {
  if (!exists) {
    return new Promise(resolve => {
      resolve(
       knex.schema.createTable('users', (table) => {
      table.integer('id').primary()
      table.string('first_name')
      table.string('last_name')
      table.string('email')
      table.string('gender')
      table.integer('ip_address')
      table.integer('total_clicks')
      table.integer('total_views')
    }))
  })
    .then(() => {
      console.log('Table "users" created')
    })
    .then()
    .then(() => console.log('data from json was added to "users" table'))
    .catch(err => {
      console.log('Error when creating table:', err)
    })
  }
})
.then(() => {
  knex.schema
  .hasTable('users_statistic')
  .then((exists) => {
    if (!exists) {
      return knex.schema.createTable('users_statistic', (table) => {
        table.integer('user_id')
        table.string('date')
        table.integer('page_views')
        table.integer('clicks')
      })
      .then(() => {
        console.log('Table "users_statistic" created')
      })
      .then(() => console.log('data from json was added to "users_statistic" table'))
      .catch(err => {
        console.log('Error when creating table:', err)
      })
    }
  })
})
.catch(err => {
  console.log('Error when setting up the database:', err)
})

module.exports = knex