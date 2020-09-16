const router = require('express').Router();
let user = require('../Models/user.model');
const User = require('../Models/user.model');
const brcypt = require('bcrypt');
const saltFactor = 10;

/**
 * Preposito: Buscar todos os clientes da base de dados
 */
router.route('/').get((req,res)=>{
    User.find()
        .then(users => {
            if(err){
                res.send({
                    success: false,
                    message: 'Error: Server error'
                })
            }
            else{
                res.send({
                     success: true,
                    message: 'Good',
                    users
                })
            }
        })
})

/** 
 * Preposito: adicionar user a base de dados.
 * Funcionalidade: Recebe como parametros Name, Email e Password.
 * Antes de adicionar o user encripta a password usando a livraria bcrypt.
 * **/
router.route('/add').post((req,res)=>{
    const Name = req.body.Name;
    const Email = req.body.Email;
    let Password = req.body.Password;
    brcypt.genSalt(saltFactor, function(err,salt){
        if(err){
            return(err);
        }
        brcypt.hash(Password,salt, function(err,hash){
            if(err){
                return(err);
            }
            Password = hash;
            const newUser = new User({Name,Email,Password});
                newUser.save()
                    .then(()=>{
                        if(err){
                            res.send({
                                success:false,
                                message: err
                            })
                        }
                        else{
                            res.json(user)
                        }
                    })
        })
    })
})

module.exports = router;

