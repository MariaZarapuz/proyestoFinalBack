const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from casas", (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

const getByFk = pFk_usuarios => {
  return new Promise((resolve, reject) => {
    db.query("select * from casas where fk_usuarios = ?", [pFk_usuarios], (err, rows) => {
      if (err) reject(err);
      if (rows.length === 0) {
        resolve(null);
      }
      resolve(rows[0]);
    });
  });
};

const getByFilter = filter => {
  return new Promise((resolve, reject) => {
    db.query("select * from casas where poblacion =?", [filter], (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
}

const create = ({
  titulo,
  direccion,
  latitud,
  longitud,
  piso,
  puerta,
  poblacion,
  provincia,
  pais,
  cp,
  fecha_entrada,
  fecha_salida,
  capacidad,
  habitaciones,
  camas,
  banos,
  descripcion,
  lavadora,
  secadora,
  aireAcondicionado,
  calefaccion,
  teleCable,
  plancha,
  horno,
  wifi,
  microondas,
  lavavajillas,
  secador,
  tostador,
  ascensor,
  parking,
  piscina,
  terraza,
  balcon,
  imagen1,
  imagen2,
  imagen3,
  imagen4,
  imagen5,
  fk_usuarios
}) => {
  console.log(imagen5)
  return new Promise((resolve, reject) => {

    db.query(
      "insert into casas (titulo,direccion,latitud,longitud,piso,puerta,poblacion,provincia, pais,cp,fecha_entrada,fecha_salida,capacidad,habitaciones,camas,banos,descripcion,lavadora,secadora,aireAcondicionado,calefaccion,teleCable,plancha,horno,wifi,microondas,lavavajillas,secador,tostador,ascensor,parking,piscina,terraza,balcon,imagen1,imagen2,imagen3,imagen4,imagen5,fk_usuarios) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        titulo,
        direccion,
        latitud,
        longitud,
        piso,
        puerta,
        poblacion,
        provincia,
        pais,
        cp,
        fecha_entrada,
        fecha_salida,
        capacidad,
        habitaciones,
        camas,
        banos,
        descripcion,
        lavadora,
        secadora,
        aireAcondicionado,
        calefaccion,
        teleCable,
        plancha,
        horno,
        wifi,
        microondas,
        lavavajillas,
        secador,
        tostador,
        ascensor,
        parking,
        piscina,
        terraza,
        balcon,
        imagen1,
        imagen2,
        imagen3,
        imagen4,
        imagen5,
        fk_usuarios
      ],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};


const editbyId = ({
  titulo,
  direccion,
  latitud,
  longitud,
  piso,
  puerta,
  poblacion,
  provincia,
  pais,
  cp,
  fecha_entrada,
  fecha_salida,
  capacidad,
  habitaciones,
  camas,
  banos,
  descripcion,
  lavadora,
  secadora,
  aireAcondicionado,
  calefaccion,
  teleCable,
  plancha,
  horno,
  wifi,
  microondas,
  lavavajillas,
  secador,
  tostador,
  ascensor,
  parking,
  piscina,
  terraza,
  balcon,
  imagen1,

}, idHouse) => {
  return new Promise((resolve, reject) => {
    db.query(
      "update casas set titulo=?,direccion=?,latitud=?,longitud=?,piso=?,puerta=?,poblacion=?,provincia=?, pais=?,cp=?,fecha_entrada=?,fecha_salida=?,capacidad=?,habitaciones=?,camas=?,banos=?,descripcion=?,lavadora=?,secadora=?,aireAcondicionado=?,calefaccion=?,teleCable=?,plancha=?,horno=?,wifi=?,microondas=?,lavavajillas=?,secador=?,tostador=?,ascensor=?,parking=?,piscina=?,terraza=?,balcon=?,imagen1=? where id=?",
      [
        titulo,
        direccion,
        latitud,
        longitud,
        piso,
        puerta,
        poblacion,
        provincia,
        pais,
        cp,
        fecha_entrada,
        fecha_salida,
        capacidad,
        habitaciones,
        camas,
        banos,
        descripcion,
        lavadora,
        secadora,
        aireAcondicionado,
        calefaccion,
        teleCable,
        plancha,
        horno,
        wifi,
        microondas,
        lavavajillas,
        secador,
        tostador,
        ascensor,
        parking,
        piscina,
        terraza,
        balcon,
        imagen1,
        idHouse
      ],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const deleteById = houseid => {
  return new Promise((resolve, reject) => {
    db.query('delete from casas where id = ?', [houseid], (err, result) => {
      if (err) reject(err);
      resolve(result);
    })
  })
}

module.exports = {
  getAll: getAll,
  getByFk: getByFk,
  getByFilter: getByFilter,
  create: create,
  editbyId: editbyId,
  deleteById: deleteById
};