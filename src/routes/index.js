const homeRoutes = require('../routes/homeRoutes')
const managerMenuRoutes = require('../routes/managementRoutes')
const statusTableRoutes = require('../routes/statusTable')
const loginRoutes = require('../routes/login/login')
const historyRoute = require('../routes/history')
const validateMiddleware = require('../app/middleware/login.middleware')

function route(app){
    app.use('/manager-table',validateMiddleware.verifyTokenAndUser,statusTableRoutes)
    app.use('/manager-menu',validateMiddleware.verifyTokenAndUser,managerMenuRoutes)
    app.use('/history',validateMiddleware.verifyTokenAndUser, historyRoute)
    app.use('/home',validateMiddleware.verifyTokenAndUser,homeRoutes)
    app.use('/',loginRoutes)
    
}

module.exports = route