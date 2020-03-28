const router = require("express").Router();
const Contact = require('../../model/contact')


// GET http://localhost:3000/api/contacts

router.get('/:recept', async (req, res) => {
    const coments = await Contact.getComentsRecept(req.params.recept)
    res.json(coments);
    //POST http://localhost:3000/api/contacts
})
router.post('/', async (req, res) => {
    console.log(req.body)
    const result = await Contact.insertComent(req.body.comentario, req.body.user_emit, req.body.user_recep)

    if (result['affectedRows'] === 1) {
        res.json({
            success: "todo bien"
        })
    } else {
        res.json({
            error: 'El comentaro no introducido bien'
        })
    }

});



module.exports = router