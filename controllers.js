const knex = require('./database')

exports.conditionSearch = async (req, res) => {
  let {table_name, select, column, value} = req.params
  knex.select(...select.split('&'))
  .from(table_name)
  .where(column, value)
  .then(userData => res.json(userData))
}
exports.getFromTable = async (req, res) => {
  knex
    .select(req.params.select)
    .from(req.params.table_name)
    .then(userData => {
      res.json(userData)
    })
    .catch(err => {
      res.json({ message: `There was an error retrieving users: ${err}` })
    })
}


exports.viewsAndClicks = async (req, res) => {
  knex('users')
    .join('users_statistic', 'users_statistic.user_id', '=', 'users.id')
    .select(req.params.select.split('&'))
    .whereIn('user_id', req.params.ids.split('&'))

    .then(response => res.json(response))
    .catch(err => {
      res.json({ message: `There was an error retrieving users: ${err}` })
    })
}


exports.addUsers = async (req, res) => {
  knex('users')
    .insert(req.body.data)
    .onConflict('id')
    .ignore('id', 'first_name', 'last_name', 'email', 'gender', 'ip_address', 'total_views', 'total_clicks')
    .then(() => {
      res.json({ message: `${req.body.data.length} users was added` })
    })
    .catch(err => {
      res.json({
        message: `There was an error creating user 
      ${req.body.first_name} ${req.body.last_name}: ${err}`
      })
    })
}

exports.addUsersStatistic = async (req, res) => {
  knex('users_statistic')
    .insert(req.body.data)
    .then(() => {
      res.json({ message: `${req.body.data.length} users was added` })
    })
    .catch(err => {
      res.json({ message: `There was an error creating user '${req.body.id} : ${err}` })
    })
}
