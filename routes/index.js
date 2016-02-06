var express = require('express');
var router = express.Router();
var Image = require('../models/image');

var authMiddleware = require('../config/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: "Auto Vision Gallery" });
});

router.get('/login', function(req, res, next) {
  res.render('login');
})

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/secret', authMiddleware, function(req, res, next) {
  console.log('req.user:', req.user);
  res.send('Wooo!  Secret stuff!!!');
});



router.get('/editItem/:itemId', function(req, res, next) {
  Item.findById(req.params.itemId, function(err, item){
    if(err) res.status(400).send(err);
    res.render('editItem', {itemId:item._id, model:item.model, make:item.make , price:item.price, year:item.year, image:item.image});
  });
});

router.post('/editItem/:itemId', function(req, res, next) {
  Item.findByIdAndUpdate(req.params.itemId,{$set:req.body},  function(err, item){
    if(err) res.status(400).send(err);
    console.log(item)
    res.redirect('/myAlbums')
  });
});


router.get('/itemDetails/:itemId', function(req, res, next) {
  Item.findById(req.params.itemId, function(err, item){
    if(err) res.status(400).send(err);
    res.render('itemDetails', {itemId:item._id, model:item.model, make:item.make , price:item.price, year:item.year, image:item.image});
  });
});


module.exports = router;
