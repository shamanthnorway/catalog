var express = require('express');
var bodyParser = require('body-parser');
var Links = require('./../model/links');
var bodyParser = require('body-parser');
var linkRouter = express.Router();
linkRouter.use(bodyParser.json());

linkRouter.route('/')
.get(function (req, res, next) {
    Links.find({}, function (err, software) {
        if (err) throw err;
        res.json(software);
    });
})
.delete(function (req, res, next) {
    // var ObjectId = mongoose.Schema.Types.ObjectId;
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
    console.log('post msg: ',req.body );
    if(req.body.type === 'comment') {
        console.log('@ post itemID: ',req.body.itemID);
        Links.findOneAndUpdate({_id:req.body.itemID, "description":{$elemMatch: { "servername":req.body.ItemDetailID }}},
        { $pull:{ "description.$.comments":{"comment":req.body.oldComment} }}, 
        { safe: true },
        function(err, res){
            if(err) {
                console.log('err: ',err);
            }
        });
        Links.findOneAndUpdate({_id:req.body.itemID, "description":{$elemMatch: { "servername":req.body.ItemDetailID }}},
        { $push:{ "description.$.comments":{"username":req.body.username, "comment":req.body.newComment, } }}, 
        { safe: true },
        function(err, res){
            if(err) {
                console.log('err: ',err);
            }
        });
    }
    else if( req.body.type === 'item') {
        // console.log('Item to be deleted');
        Links.findOneAndUpdate(
            {
                _id: req.body.itemID, 
                "description":{
                    $elemMatch: {
                        "servername":req.body.oldServername
                    }
                }
            },
            { $set:{ "description.$.servername":req.body.newServername, "description.$.link":req.body.newLink }}, 
            { safe: true },
        function(err, res){
            if(err) {
                console.log(err);
            }
        });
    }
    else if( req.body.type === 'addItem') {
        console.log('add new item');
        Links.findOneAndUpdate(
            { _id: req.body.itemID },
            { $push:{ "description":{ "servername":req.body.newServername, "link":req.body.newLink }}}, 
            { safe: true },
        function(err, res){
            if(err) {
                console.log(err);
            } else console.log(res);
        });
    }
})

module.exports = linkRouter;
