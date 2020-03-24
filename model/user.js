const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('select * from usuarios', (err, row) => {
            if (err) reject(err);
            console.log(err)
            resolve(row);
        });
    });
};

const getById = (pId) => {
    console.log(pId);
    return new Promise((resolve, reject) => {
        db.query('select * from  usuarios where id = ?', [pId], (err, rows) => {

            if (err) reject(err);
            if (rows.length === 0) {
                resolve(null);
            }
            resolve(rows[0]);
        })
    });
};

const create = (nombre, apellidos, fecha_nacimiento, email, contraseña) => {
    console.log(nombre);
    return new Promise((resolve, reject) => {
        db.query('insert into usuarios (nombre,apellidos,fecha_nacimiento,email,contraseña) values ( ?, ?, ?, ?, ? )', [nombre, apellidos, fecha_nacimiento, email, contraseña], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
};

const updateById = (pUser, pId) => {
    return new Promise((resolve, reject) => {
        db.query('update usuarios set ? where id =?', [pUser, pId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })

};

const deleteById = (pId) => {
    console.log(pId);
    return new Promise((resolve, reject) => {
        db.query('delete from usuarios where id = ?', [pId], (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    });
};


const emailExists = (pEmail) => {
    return new Promise((resolve, reject) => {
        db.query('select * from usuarios where usuarios.email = ?', [pEmail], (err, rows) => {
            if (err) return reject(err)
            if (rows.length === 0) return resolve(null)
            resolve(rows[0])
            /* console.log(rows[0]); */
        })
    })
}

module.exports = {
    getAll: getAll,
    getById: getById,
    create: create,
    deleteById: deleteById,
    updateById: updateById,
    emailExists: emailExists,
}