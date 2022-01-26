const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validateToken } = require('../middlewares/validate-jwt');
const { validateProperties } = require('../middlewares/validate-properties');

const router = Router();

// REGISTER

router.post('/new',
    [
        check('userName', 'Nombre de usuario es obligatorio').not().isEmpty(),
        check('userEmail', 'Email de usuario es obligatorio').isEmail(),
        check('userPass', 'Contraseña de usuario es obligatorio').not().isEmpty(),
        validateProperties

    ],
    createUser);


// LOGIN

router.post('/',
    [
        check('userEmail', 'Email de usuario es obligatorio').isEmail(),
        check('userPass', 'Contraseña de usuario es obligatorio').not().isEmpty(),
        validateProperties
    ],
    loginUser);

// JWT

router.get('/renew', validateToken, renewToken)

module.exports = router;