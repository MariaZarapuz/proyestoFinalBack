var nodemailer = require('nodemailer');
//funcion de enviar email
exports.enviarEmail = function (req, res) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'sitienescasatienesdestino@gmail.com',
            pass: 'MakMak2020'
        }
    });

    //definimos el email
    var mailOptions = {
        from: 'SiTienesCasaTienesDestino@gmail.com',
        to: 'mariazarapuz@gmail.com',
        subject: '',
        text: 'para resetear su contraseña haz click <a href="http://localhost:4200/resetPassword">aqui</a>'
    };
    //enviamos el email
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
            res.send(500, err.mensaje);
        } else {
            console.log("mensaje enviado");
            res.status(200).jsonp(req.body);
        }
    });
}