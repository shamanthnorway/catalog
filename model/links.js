//model/comments.js
'use strict';
//import dependency
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//create new instance of the mongoose.schema. the schema takes an 
//object that shows the shape of your database entries.
var CommentsSchema = new Schema({
	username:String,
	comment:String
});

var DescriptionSchema = new Schema({
	servername:String,
	link:String,
	comments:[CommentsSchema]
});

var SoftwareSchema = new Schema({
 name: String,
 description: [DescriptionSchema]
});

//export our module to use in server.js
module.exports = mongoose.model('Software', SoftwareSchema);