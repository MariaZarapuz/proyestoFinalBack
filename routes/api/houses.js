const router = require("express").Router();
const House = require("../../model/house");
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const fs = require('fs');
const path = require('path');
const middlewares = require("../middlewares");

// GET http://localhost:3000/api/houses
router.get("/", async (req, res) => {
  const houses = await House.getAll();
  res.json(houses);

});


// GET http://localhost:3000/api/houses/:houseid
router.get("/:housefk", async (req, res) => {
  const house = await House.getByFk(req.params.housefk);
  res.json(house);
});


//POST http://localhost:3000/api/houses/filter
router.post('/filter', async (req, res) => {
  const filter = req.body.poblacion;
  const filterHouses = await House.getByFilter(filter)
  res.json(filterHouses);

})


//POST http://localhost:3000/api/houses
router.post("/", middlewares.checkToken, multipartMiddleware, async (req, res) => {
  //console.log('que pasa', req.files.imagen)
  let index = 1
  for (let ruta of req.files.imagen) {

    let content = fs.readFileSync(ruta.path);
    console.log(content)
    let ahora = new Date();
    let nombreArchivo = ahora.getMilliseconds();

    let directorio = "./public/images/" + req.payload.usuarioId;

    req.body['imagen' + index] = "http://" + req.get('host') + "/images/" + req.payload.usuarioId + "/" + nombreArchivo + ".jpg";
    console.log('hola', req.body);
    //console.log('adios', req.body.imagen[index]);
    req.body.fk_usuarios = req.payload.usuarioId;
    if (fs.existsSync(directorio)) {
      fs.writeFileSync(`./public/images/${req.payload.usuarioId}/${nombreArchivo}.jpg`, content)
    } else {
      fs.mkdirSync(directorio);
      fs.writeFileSync(`./public/images/${req.payload.usuarioId}/${nombreArchivo}.jpg`, content)
    }
    index++
  }
  console.log(req.body)
  const result = await House.create(req.body)
  if (result['affectedRows'] === 1) {

    res.json({
      success: "todo bien"
    })
  } else {
    res.json({
      error: 'El cliente no se ha introducido bien'
    })
  }

});

// PUT http://localhost:3000/api/houses/:id
router.put('/:id', async (req, res) => {
  const result = await House.editbyId(req.body, req.params.id)
  if (result['affectedRows'] === 1) {
    const house = await House.getByFk(result['insertId'])
    res.json(house)

  } else {
    res.json({
      error: 'No se ha podido editar la casa'
    })
  }
});


// DELETE http://localhost:3000/api/houses/:id
router.delete('/:idHouse', async (req, res) => {
  const house = await House.deleteById(req.params.idHouse);
  if (house['affectedRows'] === 1) {
    res.json({
      success: 'Se ha borrado correctamente'
    });
  } else {
    res.json({
      error: 'No se ha borrado correctamente'
    })
  }
});

module.exports = router;