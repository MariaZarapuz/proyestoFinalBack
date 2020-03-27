const getAll = pUser_recep => {
    return new Promise((resolve, reject) => {
        db.query("select * from comentarios where user_recep=? ", [pUser_recep], (err, row) => {
            if (err) reject(err);
            resolve(rows);
        });
    })
}

const insertComent = ({
    comentario,
    user_emit,
    user_recep
}) => {
    return new Promise((resolve, reject) => {
        db.query("insert to comentarios(comentario,user_emit,user_recep) values(?,?,?)", [comentario, user_emit, user_recep], (err, result) => {
            if (err) reject(err);
            resolve(result)
        });
    });

}