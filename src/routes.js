const LoginController = require('../src/controllers/LoginController')

module.exports = (app) => {
    app.post('/login', 
        LoginController.Login)
}