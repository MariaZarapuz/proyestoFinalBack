const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from casas", (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

const getById = houseId => {
  return new Promise((resolve, reject) => {
    db.query("select * from casas where id =?", [houseId], (err, rows) => {
      if (err) reject(err);
      if (rows.length === 0) {
        resolve(null);
      }
      resolve(rows[0]);
    });
  });
};

const create = ({
  tipo,
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
  imagenes,
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
  fk_usuarios
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into casas (tipo,direccion,latitud,longitud,piso,puerta,poblacion,provincia, pais,cp,fecha_entrada,fecha_salida,capacidad,habitaciones,camas,banos,imagenes,descripcion,lavadora,secadora,aireAcondicionado,calefaccion,teleCable,plancha,horno,wifi,microondas,lavavajillas,secador,tostador,ascensor,parking,piscina,terraza,balcon,fk_usuarios) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        tipo,
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
        imagenes,
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
  tipo,
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
  imagenes,
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
  fk_usuarios,

}, idHouse) => {
  return new Promise((resolve, reject) => {
    db.query(
      "update casas set tipo=?,direccion=?,latitud=?,longitud=?,piso=?,puerta=?,poblacion=?,provincia=?, pais=?,cp=?,fecha_entrada=?,fecha_salida=?,capacidad=?,habitaciones=?,camas=?,banos=?,imagenes=?,descripcion=?,lavadora=?,secadora=?,aireAcondicionado=?,calefaccion=?,teleCable=?,plancha=?,horno=?,wifi=?,microondas=?,lavavajillas=?,secador=?,tostador=?,ascensor=?,parking=?,piscina=?,terraza=?,balcon=?,fk_usuarios=? where id=?",
      [
        tipo,
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
        imagenes,
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
        fk_usuarios,
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
    db.query('delete from casas where id=?', [houseid], (err, result) => {
      if (err) reject(err);
      resolve(result);
    })
  })
}

module.exports = {
  getAll: getAll,
  getById: getById,
  create: create,
  editbyId: editbyId,
  deleteById: deleteById
};