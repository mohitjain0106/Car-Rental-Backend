var express= require('express')
var router=express.Router();
var pool= require('./pool')
var jwt=require('jsonwebtoken')

const verifyJWT=(req,res,next)=>{
    console.log(req.headers);
    const token =req.headers.authorization;
    console.log('Token',token)


        if(!token){
            res.json({auth:false,message:'We need a token, please give it to us new'});

        
        }
        else
        {
            jwt.verify(token,'jwtSecret',(err,decoded)=>{
                console.log(decoded);
                if(err){
                    console.log(err)
                    res.json({auth:false,message:'you are failed to authenticate'});
                }
                    else
                    
                    {
                        res.userId=decoded.id;
                        next();
                    }
                });
                }
            };


router.get("/isUserAuth",verifyJWT,(req,res)=>{
    res.json({auth:true,message:'you are failed to authenticate'});

});

/*router.get("/logiun",(req,res)=>{
    if(req.session.ser){
        res.send({loggedIn:true,user:req.session.user});
    }else{
        res.send({loggedIn:false});
    }
})*/


router.post('/check_admin_login',function(req,res,next){
pool.query("select * from administrator where (emailid=? or mobileno=?) and password=?",[req.body.emailid,req.body.emailid,req.body.password],function(error,result){

    if(error)
    {
        res.status(500).json({status:false,message:'server Error'})
    }

    else
    {
        if(result.length==1)
        {   const token =jwt.sign({ emailid:result[0].emailid},"jwtSecret",{
            expiresIn:"1h",
        });
        
        res.status(200).json({status:true,admin:result[0],token:token});
        }
        else

        res.status(200).json({status:false,message:'invalid emailid/Mobile Number/password'})
    }
})

})

module.exports=router;