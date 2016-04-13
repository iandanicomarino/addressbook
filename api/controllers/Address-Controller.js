module.exports = function (params){
    var express     = params.express;
    var bodyparser  = params.bodyparser;
    var mongoose    = params.mongoose;
    var Person      = params.Person;
    var Address     = params.Address;
    var controllers ={};

    controllers.addAddress  = function(req,res){
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
    };
    controllers.findAddress =function(req,res){
        console.log(req.params.id);
        Address.findOne({personId:req.params.id},function(err,docs){
            console.log(docs);
            res.json(docs);
        });
    };

    return controllers;
}
