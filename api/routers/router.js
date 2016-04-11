var express= require ('express');
var bodyparser= require ('body-parser');
var mongoose = require ('mongoose');
var settings =require ('../../config/settings.js');
var Person=require ('../../api/model/Person.js');
var Address=require ('../../api/model/Address.js');

var router=express();
var router=express.Router();
router.use(bodyparser.json())

router.get('/refresh',function(req,res){
    Person.find(function (err,docs) {
        res.json(docs);
    });
});

router.post('/add',function(req,res){
    delete req.body._id;
    delete req.body.__v;
    console.log(req.body);
    var newPerson=new Person({
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname
    });
    newPerson.save(function (err, docs){
        if (err) return err;
        else console.log("saved"+docs);
    })
});


router.delete('/delete/:id',function(req,res){
    console.log(req.params.id);
    Address.find({personId:req.params.id}).remove().exec();
    Person.find({_id:req.params.id}).remove().exec();
    Person.find(function (err,docs) {
        res.json(docs);
    });
});

router.post('/find/:id',function(req,res){
    //console.log(req.params.id);
    Person.findOne({_id:req.params.id}, function(err,docs){
        console.log(docs);
        res.json(docs);
    });
});

router.post('/addAddressToPerson/:id', function(req,res){
    console.log(req.params.id);
    var newAddress=new Address({
        personId: req.params.id,
        number: req.body.number,
        street: req.body.street,
        baranggay: req.body.baranggay,
        city: req.body.city,
        region: req.body.region
    });
    newAddress.save(function (err, docs){
        if (err) return err;
        else console.log("saved"+docs);
    });
});
router.post('/findAddress/:id', function(req,res){
    console.log(req.params.id);
    Address.findOne({personId:req.params.id},function(err,docs){
        console.log(docs);
        res.json(docs);
    });
});

// router.post('/update/:id',function(req,res){
//   var id=req.params.id;
//   delete req.body._id;
//   delete req.body.__v;
//   console.log(id);
//   console.log(req.body);
//   List.update({_id:id},req.body,{upsert:false},function(err, docs){
//     console.log(req.body+"inserted");
//   });
//   List.find(function (err,docs) {
//     res.json(docs);
//   });
// });
//
// router.post('/edit/:id',function(req,res){
//   console.log(req.params.id);
//   List.findOne({_id:req.params.id},function (err,docs) {
//     res.json(docs);
//   });
// });
//
// router.post('/toggle/:id',function(req,res){
//   console.log(req.body.done);
//   delete req.body._id;
//   List.update({_id:req.params.id},req.body,{upsert:true},function(err, docs){
//     console.log(docs+"inserted");
//   });
module.exports=router;
