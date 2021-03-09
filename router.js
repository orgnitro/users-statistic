const express = require('express')
const userRoutes = require('./controllers.js')

const router = express.Router()

router.get('/conditionSearch/:table_name/:select/:column/:value', userRoutes.conditionSearch)
router.get('/getFromTable/:table_name/:select', userRoutes.getFromTable)
router.post('/viewsAndClicks', userRoutes.viewsAndClicks)
router.post('/addUsers', userRoutes.addUsers)
router.post('/addUsersStatistic', userRoutes.addUsersStatistic)

module.exports = router
