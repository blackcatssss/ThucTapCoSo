const homeRoutes = require('../routes/homeRoutes')
const managerMenuRoutes = require('../routes/managementRoutes')
const statusTableRoutes = require('../routes/statusTable')

function route(app){
    app.use('/manager-table',statusTableRoutes)
    app.use('/manager-menu',managerMenuRoutes)
    app.use('/home',homeRoutes)
    app.use('/',homeRoutes)
    
}

module.exports = route