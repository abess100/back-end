const express = require("express")
const router = express.Router()
const mysql = require('mysql2');
const session = require('express-session')
const connection = require('../controller/bd')

router.use(session({
    nom_session: "azerty",
    resave: false,
    saveUninitialized: true,
    secret: 'azertyuiopqsdfghjklm',
    cookie: { secure: true },
}))


//APIREST pour les admins
router.get('/', (req,res) =>{
    connection.query('SELECT * FROM admin ',(error,data) =>{
        if(error){
            res.status(500).send("erreur de requête get")
            console.log('erreur');
        }else{
            res.status(200).json(data)
            console.log('succés');
            console.log(req.session);
        }
    })
})





router.post('/',(req,res) =>{
    const {nom, password} = req.body
    connection.query('insert into admin (nom, password) value ( ? , ?)', [nom,password],(error,data)=>{
        if(error){
            res.status(500).send('erreur de post')
        }else{
            res.status(200).send(data)
            console.log('post succés');
        }
    })
})

router.put('/:id',(req,res)=>{
    const {id}=req.body
    const {nom, password} = req.body
    connection.query('UPDATE admin SET nom = ?, password =? where id_admin=?', [nom,password,id], (error) =>{
        if(error){
            res.status(500).send('erreur de requet put')
            console.log('erreur');
        }else{
            console.log('succès put');
            res.status(200).send("update succès")
        }
    }) 
})

router.delete('/:id',(req,res)=>{
    const {id} = req.params;
    
    connection.query('DELETE FROM admin WHERE id_admin= ?', [id], (error)=>{
        if(error){
            res.status(500).send('Donnée non supprimée');
            console.log("il y a une erreur");
        }else{
            res.status(200).send('Donnée supprimée');
            console.log("donnée supprimé");

        }
    })
})



// express-session


module.exports = router;