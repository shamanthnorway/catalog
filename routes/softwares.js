var express = require('express');
var bodyParser = require('body-parser');
var Links = require('./../model/links');
var bodyParser = require('body-parser');
var linkRouter = express.Router();
var mongoose = require('mongoose');
linkRouter.use(bodyParser.json());

linkRouter.route('/')
.get(function (req, res, next) {
    Links.find({}, function (err, software) {
        if (err) throw err;
        res.json(software);
    });
})
.delete(function (req, res, next) {
    var ObjectId = mongoose.Schema.Types.ObjectId;
    // console.log('Request: ',req.body);
    if(req.body.type === 'comment') {
        // console.log('itemID: ',req.body.itemID);
        Links.findOneAndUpdate({_id:req.body.itemID, "description":{$elemMatch: { "servername":req.body.ItemDetailID }}},
        { $pull:{ "description.$.comments":{"comment":req.body.commentID} }}, 
        { safe: true },
        function(err, res){
            if(err) {
                console.log('err: ',err);
            }
            else 
                console.log('res: ',res);
        });
    }
    else if( req.body.type === 'item' && req.body.ItemDetailID) {
        // console.log('Item to be deleted');
        Links.findOneAndUpdate({_id:req.body.itemID},
        { $pull:{ "description":{"servername":req.body.ItemDetailID} }}, 
        { safe: true },
        function(err, res){
            if(err) {
                console.log(err);
            }
            else 
                console.log(res);
        });
    }
})

.post(function (req, res, next) {
    var ObjectId = mongoose.Schema.Types.ObjectId;
    console.log('Request: ',req.body);
    if(req.body.type === 'comment') {
        Links.findOneAndUpdate({_id:req.body.commentID, "description":{$elemMatch: { _id:req.body.ItemDetailID }}},
        { $push:{ "description.$.comments":{_id:req.body.itemID} }}, 
        { safe: true },
        function(err, res){
            if(err) {
                console.log(err);
            }
            else 
                console.log(res);
        });
    }
    else if( req.body.type === 'item' ) {
        console.log('Item to be deleted');
    }
})

module.exports = linkRouter;
