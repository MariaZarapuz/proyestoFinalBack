const router = require("express").Router();
const House = require("../../model/house");
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const fs = require('fs');
const path = require('path');
const middlewares = require("../middlewares");

router.get("/", async (req, res) => {
  const houses = await House.getAll();

  res.json(houses);

});

router.get("/:houseid", async (req, res) => {
  const house = await House.getById(req.params.houseid);
  res.json(house);
});

router.post('/filter', async (req, res) => {
  const filter = req.body.poblacion;
  console.log(req.body, 'Hola amigo')

  const filterHouses = await House.getByFilter(filter)
  res.json(filterHouses);

})

router.post("/", middlewares.checkToken, multipartMiddleware, async (req, res) => {

  // console.log(req.files, 'holaaaaa');
  // console.log(req.payload.usuarioId);
  let content = fs.readFileSync(req.files.imagen.path);
  console.log(content, 'maria')
  let ahora = new Date();
  let nombreArchivo = ahora.getMilliseconds();
  // console.log(nombreArchivo);
  // console.log(req.files.fieldName);
  let directorio = "./public/images/" + req.payload.usuarioId;
  req.body.imagen1 = req.get('host') + "/images/" + req.payload.usuarioId + "/" + nombreArchivo + ".jpg";
  req.body.fk_usuarios = req.payload.usuarioId;
  fs.mkdirSync(directorio);
  fs.writeFileSync(`./public/images/${req.payload.usuarioId}/${nombreArchivo}.jpg`, content)


  console.log(req.body)
  const result = await House.create(req.body)
  console.log(result)
  //res.json('palante')
  // res.json(result)
  if (result['affectedRows'] === 1) {


    res.json({
      success: "todo bien"
    })
  } else {
    res.json({
      error: 'El cliente no se ha introducido bien'
    })
  }
  // let content = fs.readFileSync(req.files.imagen.path)
  // fs.writeFileSync ('./image/imagen1.jpg',content)

});

router.put('/:id', async (req, res) => {
  const result = await House.editbyId(req.body, req.params.id)
  res.json(result)
  if (result['affectedRows'] === 1) {
    const house = await House.getById(result['InsertId']);
    res.json(house)
  } else {
    res.json({
      error: 'El cliente no se ha introducido bien'
    })
  }
});

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