//dependecies
var express= require ('express');
var bodyparser= require ('body-parser');
var mongoose = require ('mongoose');
var settings =require ('./config/settings.js');
//var router = require('./api/routers/router');
var app=express();
var router = express.Router();
var params=
{
    express     :express,
    bodyparser  :bodyparser,
    mongoose    :mongoose,
    settings    :settings,
    Person      :require ('./api/model/Person.js'),
    Address     :require ('./api/model/Address.js'),
    router      :router
}
app.use(express.static(__dirname+"/public"));
app.use(bodyparser.json());
app.use('/',require('./api/routers/contact-router.js')(params));
app.use('/',require('./api/routers/address-router.js')(params));
//server actions


app.listen(1235);
console.log("server started: port 1235")
//server init
