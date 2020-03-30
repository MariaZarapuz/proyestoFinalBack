const getAll = () => {
    return new Promise((resolve, reject) => {
        db.query("select * from comentario", (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const getComentsRecept = pUser_recep => {
    return new Promise((resolve, reject) => {
        db.query(
            "select * from comentario where user_recep=? OR user_emit=?",
            [pUser_recep, pUser_recep],
            (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            }
        );
    });
};

const insertComent = (comentario, user_emit, user_recep, nombre_emi) => {
    console.log(comentario, user_emit, user_recep);
    return new Promise((resolve, reject) => {
        db.query(
            "insert into comentario(comentario,user_emit,user_recep, nombre_emi) values(?,?,?,?)",
            [comentario, user_emit, user_recep, nombre_emi],
            (err, result) => {
                if (err) reject(err);
                resolve(result);
            }
        );
    });
};

module.exports = {
    getAll: getAll,
    getComentsRecept: getComentsRecept,
    insertComent: insertComent
};