const conexion = require('../database/db');

exports.save = (req, res) => {
    const codigo = req.body.txt_codigo;
    const nombre = req.body.txt_nombre;
    const cantidad = req.body.txt_cantidad;
    const precio_compra = req.body.txt_precio_compra;
    const precio_venta = req.body.txt_precio_venta;
    const comentario = req.body.txt_comentario;
    const estado = 1;
    let sql = 'INSERT INTO productos (codigo, nom_producto,cant_producto,precio_venta,precio_compra,comen_producto ,estado) VALUES (?,?,?,?,?,?,?);';

    conexion.query(sql, [codigo, nombre, cantidad, precio_venta, precio_compra, comentario , estado], (err, result) => {
        if(err) {
            console.log(err);
        }else{
            
            res.redirect('/listar');
        }
    });
};

exports.update = (req, res) => {
    const codigo = req.body.txt_codigo_e;
    const nombre = req.body.txt_nombre_e;
    const cantidad = req.body.txt_cantidad_e;
    const precio_compra = req.body.txt_precio_compra_e;
    const precio_venta = req.body.txt_precio_venta_e;
    const comentario = req.body.txt_comentario_e;
    let queryupdate = 'UPDATE productos SET  nom_producto = ? , cant_producto = ? , precio_compra = ? , precio_venta = ? , comen_producto = ? WHERE codigo = ?;';
    conexion.query(queryupdate,[nombre ,cantidad , precio_compra,precio_venta,comentario, codigo],(err, result) => {
        if(err) {
            console.log(err);
        }else{
            res.redirect('/listar');
        }
    })
};

exports.detalle_venta = (req, res) => {
    const boleta = req.body.num_boleta;
    const codigo = req.body.id_producto;
    let queryprodu = 'SELECT * FROM productos WHERE codigo = ?;';
    conexion.query(queryprodu , [codigo], (err, result) => {
        if(err) {
            console.log(err);
        }else{
            let precioventa = result[0].precio_venta;
            let queryinsert = 'INSERT INTO detalle_venta (id_venta,id_producto,precio_venta) VALUES (?,?,?);';
            conexion.query(queryinsert, [boleta, codigo, precioventa], (err, result) => {
                if(err) {
                    console.log(err);
                }else{
                    let queryselect = 'SELECT * FROM detalle_venta WHERE id_venta = ?;';
                    conexion.query(queryselect, [boleta], (err, result) => {
                        if(err) {
                            console.log(err);
                        }else{
                            res.render('pago', {result: result});
                        }
                    });
                }
            });
        }
    });
}