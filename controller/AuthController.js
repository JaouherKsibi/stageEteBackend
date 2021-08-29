const Admin=require('../model/Admin');
const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');

const { getMaxListeners } = require('../model/Admin');
module.exports={
    register(req,res,next){
        bcrypt.hash("123456789",10,function (err,hashedPass){
            if(err){
                res.json({error:err})
            }
            else{
                let user=new Admin({
                    email:"ksibijaouher@gmail.com",
                    password:hashedPass
                })
                user.save().then(()=>res.json({message:'ok'})).catch(error=>res.json(error))
            }
        })
    },
    login(req,res,next){
        //console.log(JSON.parse(req.body.data))
        var userReact = req.body
        /*const email='ksibijaouher@gmail.com';
        const password ='123456789'*/
        Admin.findOne({email:userReact.email}).then(
            user=>{
                if(user){
                    bcrypt.compare(userReact.password,user.password,(err,result)=>{
                        if(err){
                            
                            res.json({error:err});
                        }
                        if(result){
                            let token=jwt.sign({email:user.email},'verySecretValue')//,{expiresIn:'30s'}
                            res.cookie('nToken', token, { maxAge: 900000});
                            res.json({
                                message:'login Successfull',
                                token
                            })
                            console.log('user logged in ')
                        }
                        else{
                            console.log('asef')
                            res.json({
                                message:'password does not match'
                            })
                        }
                    })
                }
                else{
                    res.json({message:'admin Not Found'});
                }
            }
        ).catch(error=>res.json({message:'not ok '}))
    },
    logout(req,res,next){
        res.clearCookie('nToken');
        res.json({message:'logged Out'});
    }
}