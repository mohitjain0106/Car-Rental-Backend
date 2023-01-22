var express = require('express');
var router = express.Router();
var pool = require('./pool');
var multer = require('./multer');
const upload = require('./multer');
var fs=require('fs')


router.post('/companysubmit',upload.single('icon'),function(req, res, next) {
    console.log(req.file)
   pool.query("insert into company(companyname,categoryid,subcategoryid,icon) values(?,?,?,?)",[req.body.companyname,req.body.categoryid,req.body.subcategoryid,req.file.filename],function(error,result){
    if(error)
    { console.log(error)
       res.status(500).json({status:false,message:'Server Error'})
    }
    else
    {
  
       res.status(200).json({status:true,message:'Category Submitted Successfully'})
    }
  
  
  
   })
  
  });



  router.get('/display_company',function(req, res, next) {
    console.log(req.file)
   pool.query("select Cmp.*,(select categoryname from category C where C.categoryid=Cmp.categoryid)as categoryname,(select subcategoryname from subcategory SC where SC.subcategoryid=Cmp.subcategoryid )as subcategoryname from company Cmp",function(error,result){
    if(error)
    { console.log(error)
       res.status(500).json({status:false,message:'Server Error'})
    }
    else
    {
  
       res.status(200).json({status:true ,data:result})
    }
  
  
  
   })
  
  });


  router.post('/edit_picture',upload.single('icon'),function(req, res, next) {
   console.log(req.file)
  pool.query("update company set icon=? where companyid=?",[req.file.filename,req.body.companyid],function(error,result){
   if(error)
   { console.log(error)
      res.status(500).json({status:false,message:'Server Error'})
   }
   else
   {fs.unlinkSync(`D:/paynrent_backend/public/images/${req.body.oldicon}`)
 
      res.status(200).json({status:true,message:'Icon Updated Successfully'})
   }
 
 
 
  })
 
 });




 router.post('/edit_data',function(req, res, next) {
   console.log(req.file)
  pool.query("update company set companyname=? where companyid=?",[req.body.subcategoryname,req.body.companyid],function(error,result){
   if(error)
   { console.log(error)
      res.status(500).json({status:false,message:'Server Error'})
   }
   else
   {  
 
      res.status(200).json({status:true,message:'SubCategory Updated Successfully'})
   }
 
 
 
  })
 
 });


 router.post('/delete_data',function(req, res, next) {
   console.log(req.file)
  pool.query("delete from company where companyid=?",[req.body.companyid],function(error,result){
   if(error)
   { console.log(error)
      res.status(500).json({status:false,message:'Server Error'})
   }
   else
   {
      fs.unlinkSync(`D:/paynrent_backend/public/images/${req.body.oldicon}`)
      res.status(200).json({status:true,message:'SubCategory Deleted Successfully'})
   }
 
 
 
  })
 
 });

 router.post('/fetch_all_company_by_subcategory',function(req,res,next){
   pool.query("select S.*,(select C.subcategoryname from subcategory C where C.subcategoryid=S.subcategoryid) as subcategoryname from company S where S.subcategoryid=?",[req.body.subcategoryid],function(error,result){
      if(error)
      { console.log(error)
         res.status(500).json({status:false,message:'Server Error',result:[]})
      }
      else
      {
 
         res.status(200).json({status:true,result:result})
      }
   })
});



  module.exports=router;