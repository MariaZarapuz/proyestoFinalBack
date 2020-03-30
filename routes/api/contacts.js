const router = require("express").Router();
const Contact = require('../../model/contact')



router.get("/", async (req, res) => {
    const coments = await Contact.getAll();
    res.json(coments);

});

// GET http://localhost:3000/api/contacts

router.get('/:recept', async (req, res) => {

    const coments = await Contact.getComentsRecept(req.params.recept)
    res.json(coments);
})

//POST http://localhost:3000/api/contacts

router.post('/', async (req, res) => {
    console.log(req.body)
    const result = await Contact.insertComent(req.body.comentario, req.body.emit, req.body.recep, req.body.nombre)

    if (result['affectedRows'] === 1) {
        res.json(
            result['affectedRows'] === 1
        )
    } else {
        res.json({
            error: 'El comentaro no introducido bien'
        })
    }
    console.log(result)

});



module.exports = router