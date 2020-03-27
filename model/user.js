const getById = ptoken => {
  console.log(ptoken, 2);
  return new Promise((resolve, reject) => {
    db.query(
      "select * from  usuarios where token= ?",
      [ptoken],
      (err, rows) => {
        if (err) reject(err);
        console.log(rows);
        resolve(rows);
      }
    );
  });
};

const getUserById = pUserId => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from usuarios where id = ?",
      [pUserId],
      (err, rows) => {
        if (err) reject(err);
        console.log(rows)
        if (rows.length === 0) {
          resolve(null);
        }
        resolve(rows);
      }
    )
  });
};

const create = (nombre, apellidos, fecha_nacimiento, email, contraseña) => {
  console.log(nombre);
  return new Promise((resolve, reject) => {
    db.query(
      "insert into usuarios (nombre,apellidos,fecha_nacimiento,email,contraseña) values ( ?, ?, ?, ?, ? )",
      [nombre, apellidos, fecha_nacimiento, email, contraseña],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const updateToken = (token, id) => {
  console.log(token, id, "update");
  return new Promise((resolve, reject) => {
    db.query(
      "update usuarios set token =? where id=?",
      [token, id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const updateProfile = (pUser, token) => {
  console.log(token, 'madre mia que malo es', pUser)
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE usuarios SET nombre=?,apellidos=?,fecha_nacimiento=?,email=? WHERE id=(SELECT id FROM usuarios WHERE token= ?)",
      [pUser.nombre, pUser.apellidos, pUser.fecha_nacimiento, pUser.email, token],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
  });
};

const deleteByToken = (token) => {
  console.log(token);
  return new Promise((resolve, reject) => {
    db.query("delete from usuarios where token = ?", [token], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const emailExists = pEmail => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from usuarios where usuarios.email = ?",
      [pEmail],
      (err, rows) => {
        if (err) return reject(err);
        if (rows.length === 0) return resolve(null);
        resolve(rows[0]);
        /* console.log(rows[0]); */
      }
    );
  });
};

module.exports = {
  getById: getById,
  getUserById: getUserById,
  create: create,
  deleteByToken: deleteByToken,
  updateProfile: updateProfile,
  emailExists: emailExists,
  updateToken: updateToken
};