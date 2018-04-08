var express = require('express');
var router = express.Router();
const sec = require('search-engine-client');
/* GET home page. */
router.get('/dashboard', function(req, res, next) {
  res.json('Search Engine');	
});

router.get('/google', function(req, res, next) {
	console.log(req.query)
	
	var keyword = req.query.q;
	var fileType = req.query.FileType;
	if(fileType !== undefined){
		console.log('comes')
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
	if(fileType !== undefined){
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
	if(fileType !== undefined){
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
	if(fileType !== undefined){
		keyword += " filetype:"+fileType;
	}	
	sec.ask(keyword).then(function(result){
    res.json(result);	
	console.log(result);
	});
});

router.post('/search', function(req, res, next) {	
	var keyword = req.body.searchKey;
	var userId;
	if(req.body.id !== null){
		userId = req.body.id;
	}else{
		userId = 0;
	}		
	var search = {            
				search_keyword  : keyword,
				user_id  : userId
			};
			
		var Insert_query = "INSERT INTO search SET ?";
		req.getConnection(function(err, connection){
			
			var query = connection.query(Insert_query, search, function(err, result){
				if(err){				
					res.json({'status':false, 'message' : 'Database Error'});	
				}else{
					res.json({'status':true, 'message': 'search keyword added!'});	
				}
			});		
		});
});


router.get('/keywords', function(req, res, next) {
	req.getConnection(function(err, connection){		
		var query = connection.query('SELECT DISTINCT search_keyword FROM search',function(err, rows){
			if(err){				
			  res.json({'status':false, 'message': err});
			}
			res.json(rows);
		});
	});
});

router.get('/searchHistory', function(req, res, next) {
	var userId = req.query.id;          
	req.getConnection(function(err, connection){		
		var query = connection.query(`SELECT search_keyword, created_at FROM search WHERE user_id = ${userId}`,function(err, rows){
			if(err){				
			  res.json({'status':false, 'message': err});
			}			
			res.json(rows);
		});
	});
});

module.exports = router;
