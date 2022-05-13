const express = require('express');
const router = express.Router();

const conexion = require('./database/db');

router.get('/listar' , (req, res) => {
    conexion.query("SELECT * FROM productos", (err, result) => {
        if(err) {
            throw err;
        }else{
            res.render('listar' , {result: result});
        }
    }); 
    
});
router.get('/pago' , (req, res) => {
    conexion.query("SELECT * FROM tipo_pago", (err, resultado) => {
        if(err) {
            throw err;
        }else{
            res.render('pago' , {resultado: resultado});
        }
    });
});
router.get('/', (req, res) => {
    res.render('index');
});
router.get('/editar/:codigo', (req, res) => {
    const id = req.params.codigo;
    
    conexion.query("SELECT * FROM productos WHERE codigo = ?", [id], (err, result) => {
        if(err) {
            throw err;
        }else{
            res.render('edit' , {row:result[0]});
        }

    });
    
});
router.get('/delete/:codigo', (req, res) => {
    const id = req.params.codigo;
    
    conexion.query("DELETE FROM productos WHERE codigo = ?", [id], (err, result) => {
        if(err) {
            throw err;
        }else{
            res.redirect('/listar');
        }

    });
});


const crud = require('./controllers/crud');
router.post('/save', crud.save);
router.post('/update',crud.update);
router.post('/detalle_venta', crud.detalle_venta);
module.exports = router;