module.exports = function (params){
    var router     = params.router;
    var ctrl       = require ('../controllers/Persons-Controller')(params);

    router.get('/refresh',ctrl.refresh);
    router.post('/add',ctrl.add);
    router.delete('/delete/:id',ctrl.delete);
    router.post('/find/:id',ctrl.find);
    return router;
};
