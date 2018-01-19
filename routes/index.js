var express = require('express');
var router = express.Router();
var getFilmes = require("../get_filmes");

/* GET films listing. */
router.get('/', function(req, res, next) {
    
    res.render('index');

});

router.get('/api/:id?*', async function(req, res, next){
  
    var id = req.params.id || 1;
    let films = await getFilmes(id);
    res.send(films);

});

module.exports = router;