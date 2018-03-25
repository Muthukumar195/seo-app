var express = require('express');
var router = express.Router();
const sec = require('search-engine-client');
/* GET home page. */
router.get('/dashboard', function(req, res, next) {
  res.json('Welcome to search engine');	
});

router.get('/google', function(req, res, next) {
	console.log(req.query)
	
	var keyword = req.query.q;
	var fileType = req.query.FileType;
	if(fileType !== undefined){
		keyword += " filetype:"+fileType;
	}	
	sec.google(keyword).then(function(result){
    res.json(result);	
	console.log(result);
	});
});

router.get('/yahoo', function(req, res, next) {
	console.log(req.query)
	var keyword = req.query.q;
	var fileType = req.query.FileType;
	if(fileType !== ""){
		keyword += " filetype:"+fileType;
	}	
	sec.yahoo(keyword).then(function(result){
    res.json(result);	
	console.log(result);
	});
});

router.get('/bing', function(req, res, next) {
	console.log(req.query)
	var keyword = req.query.q;
	var fileType = req.query.FileType;
	if(fileType !== ""){
		keyword += " filetype:"+fileType;
	}	
	sec.bing(keyword).then(function(result){
    res.json(result);	
	console.log(result);
	});
});

router.get('/ask', function(req, res, next) {
	console.log(req.query)
	var keyword = req.query.q;
	var fileType = req.query.FileType;
	if(fileType !== ""){
		keyword += " filetype:"+fileType;
	}	
	sec.ask(keyword).then(function(result){
    res.json(result);	
	console.log(result);
	});
});

module.exports = router;
