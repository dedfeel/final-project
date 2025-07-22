let express = require('express')
const { users, login, register } = require('../controllers/authControllers')
const { loginLimited, authenticateToken } = require('../middlewere/authMiddlewere')

let router = express.Router()

router.get('/users', users)

router.post('/login',loginLimited, login)

router.post('/register',loginLimited, register)

module.exports = router