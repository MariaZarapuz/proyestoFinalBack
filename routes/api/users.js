const router = require('express').Router();
const bcrypt = require('bcryptjs')
const moment = require('moment');
const jwt = require('jwt-simple')
const middlewares = require('../middlewares')


const User = require('../../model/user');


//Get http://localhost:3000/api/users
router.get('/', async (req, res) => {
    // console.log(req.payload);
    const rows = await User.getAll()
    res.json(rows);
});

//POST http://localhost:3000/api/users
router.post('/', async (req, res) => {
    const contraseñaEnc = bcrypt.hashSync(req.body.contraseña, 10);
    req.body.contraseña = contraseñaEnc
    const result = await User.create(req.body.nombre, req.body.apellidos, req.body.fecha_nacimiento, req.body.email, req.body.contraseña)
    res.json(result)

});

// POST http://localhost:3000/api/users/login
router.post('/login', async (req, res) => {
    try {
        const user = await User.emailExists(req.body.email);
        /* console.log(user); */
        if (!user) {
            return res.status(401).json({ error: 'Error en email y/o password1' })
        }
        /* console.log(user, 'ey que pasa loko') */
        console.log(req.body.contraseña, user.contraseña);

        const iguales = bcrypt.compareSync(req.body.contraseña, user.contraseña);
        if (iguales) {
            console.log(iguales);
            res.json({ success: createToken(user) })
        } else {
            res.status(401).json({ error: 'Error en email y/o password' })
        }
    } catch (err) {
        console.log(err)
    }
})

const createToken = (pUser) => {
    console.log(pUser)
    const payload = {
        usuarioId: pUser.id,
        fechaCreacion: moment().unix(),
        fechaExpiracion: moment().add(1, 'day').unix()
    }
    console.log(payload)
    return jwt.encode(payload, process.env.SECRET_KEY)
};


//PUT http://localhost:3000/api/users/:pUserId
router.put('/:pUserId', middlewares.checkToken, async (req, res) => {
    console.log(req.body);
    console.log(req.params);
    const result = await User.updateById(req.body, req.params.pUserId);
    //  console.log(result);
    res.json(result)
});

//DELETE http://localhost:3000/api/users
router.delete('/', async (req, res) => {
    console.log(req.body);
    const result = await User.deleteById(req.body.id);
    if (result['affectedRows'] === 1) {
        res.json({ success: 'El usuario ha sido borrado' });
    } else {
        res.json({ error: 'el usuario no ha sido eliminado' })
    }
});
module.exports = router;
