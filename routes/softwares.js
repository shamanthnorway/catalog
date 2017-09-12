var express = require('express');
var bodyParser = require('body-parser');
var Links = require('./../model/links');
var linkRouter = express.Router();
linkRouter.use(bodyParser.json());

linkRouter.route('/')
.get(function (req, res, next) {
    Links.find({}, function (err, software) {
        if (err) throw err;
        res.json(software);
    });
})

.post(function (req, res, next) {
    Links.create(req.body, function (err, software) {
        if (err) throw err;
        console.log('Dish created!');
        var id = software._id;
		res.writeHead(200,{'Content-Type':'text/plain'});
        res.end('Added the software with id: ' + id);
    });
})

module.exports = linkRouter;
