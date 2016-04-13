module.exports = function (params){
    var express     = params.express;
    var bodyparser  = params.bodyparser;
    var mongoose    = params.mongoose;
    var Person      = params.Person;
    var Address     = params.Address;
    var controllers ={};

    controllers.refresh = function(req,res){
        Person.find(function (err,docs) {
            res.json(docs);
        });
    };
    controllers.add = function(req,res){
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
    };
    controllers.delete = function(req,res){
        console.log(req.params.id);
        Address.find({personId:req.params.id}).remove().exec();
        Person.find({_id:req.params.id}).remove().exec();
        Person.find(function (err,docs) {
            res.json(docs);
        });
    };
    controllers.find = function(req,res){
        //console.log(req.params.id);
        Person.findOne({_id:req.params.id}, function(err,docs){
            console.log(docs);
            res.json(docs);
        });
    };
    return controllers;
}
