const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

// REGISTER

const createUser = async (req, res = response) => {



    const { userEmail, userPass } = req.body;


    try {

        const email = await User.findOne({ userEmail });
        if (email) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales NO válidas'
            });
        }


        const user = new User(req.body);


        // Crypt Key
        const salt = bcrypt.genSaltSync();
        user.userPass = bcrypt.hashSync(userPass, salt);


        await user.save();


        const token = await generateJWT(user.id);

        // Response

        res.status(200).json({
            ok: true,
            user,
            token
        });


    } catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'ERROR en la creación de Usuario. Comuníquese con un administrador'
        })
    }

}

// LOGIN

const loginUser = async (req, res = response) => {


    const { userEmail, userPass } = req.body;



    try {


        const userDB = await User.findOne({ userEmail });


        // Verificar si existe usuario
        if (!userDB) {

            return res.status(404).json({
                ok: false,
                msg: 'Credenciales NO válidas'
            });

        }

        // Comprobar password
        const validatePass = bcrypt.compareSync(userPass, userDB.userPass);
        if (!validatePass) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales NO válidas'
            });
        }

        // Generar JWT

        const token = await generateJWT(userDB.id);

        // Response

        res.status(200).json({
            ok: true,
            user: userDB,
            token
        });



    } catch (error) {
        return res.status(500).json({
            ok: true,
            msg: 'Comuníquese con un administrador',
        });

    }

}

// RENEW TOKEN

const renewToken = async (req, res = response) => {

    const userId = req.userId;

    const token = await generateJWT(userId);

    const user = await User.findById(userId);

    return res.json({
        ok: true,
        user,
        token
    });
}

module.exports = {
    createUser,
    loginUser,
    renewToken
}