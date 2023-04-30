
const controller = require('../controller/index')

function router(app) {
    app.post('/login', controller.login)
    app.post('/signIn', controller.signIn)
    app.get('/logout', controller.logout)
    app.get('/note', controller.isLogged, controller.getNote)
    app.put('/note', controller.isLogged, controller.editNote)
    app.post('/note', controller.isLogged, controller.addNote)
    app.delete('/note', controller.isLogged, controller.deleteNote)
}

module.exports = router
