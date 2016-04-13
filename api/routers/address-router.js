module.exports = function (params){
    var router     = params.router;
    var ctrl       = require ('../controllers/Address-Controller')(params);

    router.post('/addAddressToPerson/:id',ctrl.addAddress);
    router.post('/findAddress/:id',ctrl.findAddress);    
    return router;
};
