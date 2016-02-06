'use strict'

var mongoose = require('mongoose');

var albumSchema = new mongoose.Schema({
	owner:{type: mongoose.Schema.Types.ObjectId, ref:"User", required: true},
	album:{type:String, require:true}
});

var Album = mongoose.model('Items', albumSchema);


module.exports = Album; 

