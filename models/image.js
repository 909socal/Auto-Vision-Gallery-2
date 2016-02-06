'use strict'
/// setting up aws and delete and more


var mongoose = require('mongoose');
var uuid = require('node-uuid'); 
var async = require('async'); 
var aws = require('aws-sdk'); 

var s3 = new aws.S3(); 
var Image; 

var imageSchema = new mongoose.Schema({
  filename: {type:String, require:true},
  url: {type:String, require:true}
});
 



 imageSchema.statics.upload = function(files, done){
  async.map(files, uploadFile, done); 
 };


 function uploadFile(file, cb){
  var filename = file.originalname; 
  var data = file.buffer; 
  var match = filename.match(/\.\w*$/); 
  var ext = match ? match[0] : '';
  var key = uuid.v1() + ext; 

  var params = {
    Bucket: process.env.AWS_BUCKET, 
    Key: key, 
    Body: data
  }; 

  s3.putObject(params, function(err){
    if(err) return cb(err); 
    var url = process.env.AWS_URL + process.env.AWS_BUCKET + '/' + key;
    var image = new Image({filename: filename, url: url}); 
    image.save(function(err, savedImage){
      if (err) return cb(err); 
      cb(null, savedImage);
    });
  });
 } 

imageSchema.statics.findByIdAndRemoveFromAWS = function(imageId, cb){

  Image.findById(imageId, function(err, image){
    if(err || !image) return cb(err || 'image not found');

    var params = {
      Bucket: process.env.AWS_BUCKET,
      Key: image.url.match(/[^\/]*$/)[0]
    };
    s3.deleteObject(params, function(err, data){
      if(err) return cb(err); 
      image.remove(function(err){
      cb(err, data);
      });
    });
  });
};



 Image = mongoose.model('Image', imageSchema);


module.exports = Image; 