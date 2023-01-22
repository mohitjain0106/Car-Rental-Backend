var express= require('express')
var router=express.Router();
var pool= require('./pool')
var jwt=require('jsonwebtoken')

router.post('/check_admin_login',function(req,res,next){
pool.query("select * from administrator where (emailid=? or mobileno=?) and password=?",[req.body.emailid,req.body.emailid,req.body.password],function(error,result){

    if(error)
    {
        res.status(500).json({status:false,message:'server Error'})
    }

    else
    {
        if(result.length==1)
       /* {   const token =jwt.sign({ emailid:result[0].emailid},"jwtSecret",{
            expiresIn:"1h",
        });*/
        {
        res.status(200).json({status:true});
        }
        else

        res.status(200).json({status:false,message:'invalid emailid/Mobile Number/password'})
    }
})

})

module.exports=router;