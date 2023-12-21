const express = require('express');
const router = express.Router()
const mysql = require('mysql2');
const connection = require('../controller/bd')


router.get('/', (req, res) =>{
    // console.log(req.session);
    connection.query("select * from apprenant", (error,data) =>{
        if(error){
            res.status(500).send("erreur de recupérartion de donnée")
        }else{
            res.json(data)
            console.log(data);
        }
    })
})

router.post('/', (req, res) =>{
    const {nom , sexe, date_de_naissance, prenom, email, niveau, activite_extrascolaire, filiere, num_tel } = req.body
    connection.query('insert into apprenant (nom , sexe, date_de_naissance, prenom, email, niveau, activite_extrascolaire, filiere, num_tel) values (?,?,?,?,?,?,?,?,?)',[nom , sexe, date_de_naissance,prenom, email,niveau,activite_extrascolaire , filiere,num_tel], (error) =>{
        if(error){
            console.error(error);
            res.status(500).send("erreur de création d'apprenant")
        }else{
            res.send("apprenant crée avec succés")
        }
    })
})

router.put('/:id', (req,res) =>{
    const {id_apprenant} =req.body
    const {nom , sexe, date_de_naissance, prenom, email, niveau, activite_extrascolaire, filiere, num_tel} = req.body
    connection.query('update apprenant set nom = ? , sexe = ?, date_de_naissance = ?, prenom =?, email=?, niveau=?, activite_extrascolaire=?, filiere = ?, num_tel=? where id_apprenant= ?', [nom , sexe, date_de_naissance, prenom, email, niveau, activite_extrascolaire , filiere ,num_tel,id_apprenant], (error) =>{
        if(error){
            console.error(error);
            res.status(500).send('erreur de modification')
        }else{
            res.send('la modification à été effectué avec succés ')
        }
    })
})

router.delete('/:id', (req,res) =>{
    const {Id_apprenant} = req.params.id
    connection.query('delete from apprenant where Id_apprenant = ?', [req.params.id],(error,data) =>{
        if(error){
            console.log(error);
            res.send("erreur de suppression de l'apprenant ")
        }else{
            res.send("suppression de l'apprenant effectué avec succés")
            console.log(data);
        }
    })
})

module.exports = router