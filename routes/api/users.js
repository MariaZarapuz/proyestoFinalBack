const router = require("express").Router();
const bcrypt = require("bcryptjs");
const moment = require("moment");
const jwt = require("jwt-simple");
const middlewares = require("../middlewares");
const User = require("../../model/user");
const EmailCtrl = require("../../model/mailCtrl");
//Get http://localhost:3000/api/users
router.get("/", async (req, res) => {
  const token = req.headers["user-token"];
  const rows = await User.getById(token);
  res.json(rows);
});

//GET http://localhost:3000/api/users/user/:idUser
router.get("/user/:idUser", async (req, res) => {
  const user = await User.getUserById(req.params.idUser)
  res.json(user)
})

//POST http://localhost:3000/api/users
router.post("/", async (req, res) => {
  const contraseñaEnc = bcrypt.hashSync(req.body.contraseña, 10);
  req.body.contraseña = contraseñaEnc;
  const result = await User.create(
    req.body.nombre,
    req.body.apellidos,
    req.body.fecha_nacimiento,
    req.body.email,
    req.body.contraseña
  );
  res.json(result);
});

// POST http://localhost:3000/api/users/login
router.post("/login", async (req, res) => {
  try {
    const user = await User.emailExists(req.body.email);
    if (!user) {
      return res.status(401).json({
        error: "Error en email y/o password1"
      });
    }
    const iguales = bcrypt.compareSync(req.body.contraseña, user.contraseña);
    if (iguales) {
      let token = createToken(user);
      const result = await User.updateToken(token, user.id);
      res.json({
        success: token,
        id: user.id,
        nombre: user.nombre
      });
    } else {
      res.status(401).json({
        error: "Error en email y/o password"
      });
    }
  } catch (err) {
    console.log(err);
  }
});

const createToken = pUser => {
  const payload = {
    usuarioId: pUser.id,
    fechaCreacion: moment().unix(),
    fechaExpiracion: moment()
      .add(1, "day")
      .unix()
  };

  return jwt.encode(payload, process.env.SECRET_KEY);
};

router.post("/saveToken", async (req, res) => {

  const result = await User.updateToken(req.body.token, req.body.id);

});
//POST http://localhost:3000/api/users/email
router.post('/email', EmailCtrl.enviarEmail);

//PUT http://localhost:3000/api/users/:email
router.put('/:email', async (req, res) => {
  const contraseñaEnc = bcrypt.hashSync(req.body.contraseña, 10);
  req.body.contraseña = contraseñaEnc;
  const result = await User.updatePassword(req.body.contraseña, req.params.email);
  console.log(req.body.contraseña)
  res.json(result);


})

//PUT http://localhost:3000/api/users/:pUserId
router.put("/updateProfile", middlewares.checkToken, async (req, res) => {
  const result = await User.updateProfile(req.body, req.headers['user-token']);
  res.json(result);
});

//DELETE http://localhost:3000/api/users
router.delete("/", middlewares.checkToken, async (req, res) => {
  const result = await User.deleteByToken(req.headers['user-token']);
  if (result["affectedRows"] === 1) {
    res.json({
      success: "El usuario se ha eliminado"
    });
  } else {
    res.json({
      error: "El usuario no ha sido eliminado"
    });
  }
});

module.exports = router;