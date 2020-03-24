const router = require("express").Router();
const House = require("../../model/house");
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const fs = require('fs');
const path = require('path');

router.get("/", async (req, res) => {
  const houses = await House.getAll();
  res.json(houses);
});

router.get("/:houseid", async (req, res) => {
  const house = await House.getById(req.params.houseid);
  res.json(house);
});

router.post("/", multipartMiddleware, async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  const result = await House.create(req.body)
  //res.json('palante')
  // res.json(result)
  if (result['affectedRows'] === 1) {
    const house = await House.getById(result['insertId']);
    let content = fs.readFileSync(req.files.imagen.path);

    fs.writeFileSync(`./public/images/${house.id}.jpg`, content)
    res.json(house)
  } else {
    res.json({
      error: 'El cliente no se ha introducido bien'
    })
  }
  // let content = fs.readFileSync(req.files.imagen.path)
  // fs.writeFileSync ('./image/imagen1.jpg',content)
  // res.json({success:"todo bien"})
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