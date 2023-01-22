var express = require('express');
var router = express.Router();
var pool = require('./pool');
var multer = require('./multer');
const upload = require('./multer');
var fs = require('fs')

router.post('/vehiclesubmit', upload.single('icon'), function (req, res, next) {
   console.log(req.file)
   pool.query("insert into vehicle(categoryid,subcategoryid,companyid,modelid,vendorid,registrationno,rentperhour,color,fueltype,ratings,average,remark,capacity,status,feature,icon) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [
      req.body.categoryid,
      req.body.subcategoryid,
      req.body.companyid,
      req.body.modelid,
      req.body.vendorid,
      req.body.registrationno,
      req.body.rentperhour,
      req.body.color,
      req.body.fueltype,
      req.body.ratings,
      req.body.average,
      req.body.remark,
      req.body.capacity,
      req.body.status,
      req.body.feature,
      req.file.filename], function (error, result) {
         if (error) {
            console.log(error)
            res.status(500).json({ status: false, message: 'Server Error' })
         }
         else {

            res.status(200).json({ status: true, message: 'vehicle Submitted Successfully' })
         }



      })
});


router.post('/edit_picture', upload.single('icon'), function (req, res, next) {
   console.log(req.file)
   pool.query("update vehicle set icon=? where vehicleid=?", [req.file.filename, req.body.vehicleid], function (error, result) {
      if (error) {
         console.log(error)
         res.status(500).json({ status: false, message: 'Server Error' })
      }
      else {
         fs.unlinkSync(`D:/paynrent_backend/public/images/${req.body.oldicon}`)

         res.status(200).json({ status: true, message: 'Icon Updated Successfully' })
      }



   })

});


router.get('/display_vehicle', function (req, res, next) {
   console.log(req.file)
   pool.query("select V.*, ( select C.categoryname from category C where C.categoryid=V.categoryid) as categoryname,( select S.subcategoryname from subcategory S where S.subcategoryid=V.subcategoryid) as subcategoryname,( select CM.companyname from company CM where CM.companyid=V.companyid) as companyname,( select M.modelname from model M where M.modelid=V.modelid) as modelname from vehicle V", function (error, result) {
      if (error) {
         console.log(error)
         res.status(500).json({ status: false, message: 'Server Error' })
      }
      else {

         res.status(200).json({ status: true, data: result })
      }



   })

});

router.post('/edit_data', function (req, res, next) {
   console.log(req.file)
   pool.query("update vehicle set vendorid=? subcategoryid=? categoryid=? companyid=? modelid=? registrationno=? rentperhour=? color=? capacity=? average=? remarks=? rating=? status=? feature=?  where vehicleid=?",
      [req.body.vendorid,
      req.body.subcategoryid,
      req.body.categoryid,
      req.body.modelid,
      req.body.companyid,
      req.body.registrationno,
      req.body.rentperhour,
      req.body.color,
      req.body.capacity,
      req.body.average,
      req.body.remark,
      req.body.rating,
      req.body.status,
      req.body.feature,
      req.body.vehicleid], function (error, result) {
         if (error) {
            console.log(error)
            res.status(500).json({ status: false, message: 'Server Error' })
         }
         else {

            res.status(200).json({ status: true, message: 'Vehicle Updated Successfully' })
         }



      })

});


router.post('/delete_data', function (req, res, next) {
   console.log(req.file)
   pool.query("delete from vehicle where vehicleid=?", [req.body.vehicleid], function (error, result) {
      if (error) {
         console.log(error)
         res.status(500).json({ status: false, message: 'Server Error' })
      }
      else {
         fs.unlinkSync(`D:/paynrent_backend/public/images/${req.body.oldicon}`)
         res.status(200).json({ status: true, message: 'Model Deleted Successfully' })
      }



   })

});
module.exports = router