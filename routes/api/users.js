const router = require('express').Router();
const User = require('../../model/user');
const bcrypt = require('bcryptjs')


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
    const result = await User.create(req.body.nombre, req.body.apellidos, req.body.fecha_nacimiento, req.body.email, req.body.contraseña, req.body.repite_contraseña)
    res.json(result)

});

//PUT http://localhost:3000/api/users/:pUserId
router.put('/:pUserId', async (req, res) => {

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
