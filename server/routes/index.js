var express = require('express');
var router = express.Router();
const sec = require('search-engine-client');
var stemmer = require('stemmer');
sw = require('stopword');
var Scraper = require ('images-scraper')
var google = new Scraper.Google();
var default_options={ 
    agent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36",
    lang: "en-US,en;q=0.9",
    show: true,
};
/* GET home page. */
router.get('/dashboard', function(req, res, next) {
  res.json('Search Engine');	
});

router.get('/google', function(req, res, next) {
	
	var keyword = keywordStemming(req.query.q);
	var fileType = req.query.FileType;
	if(fileType !== undefined){
		console.log('comes')
		keyword += " filetype:"+fileType;
	}	
	sec.google(keyword, default_options).then(function(result){
    res.json(result);	
	console.log(result);
	});
});

router.get('/yahoo', function(req, res, next) {
	console.log(req.query)
	var keyword = keywordStemming(req.query.q);
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
	var keyword = keywordStemming(req.query.q);
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
	var keyword = keywordStemming(req.query.q);
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
	var keyword = keywordStemming(req.body.searchKey);
	console.log('result rewoersd', keyword)
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

function keywordStemming(keyword){
	var stemmings = [];
// console.log(stemmings);	
var stopWord = keyword.split(' ');
var newWords = sw.removeStopwords(stopWord)
	newWords.forEach((words, i)=>{	
		var stemmingWord = stemmer(words);
		stemmings.push(stemmingWord);
	});
	var stemmingCombine = stemmings.join(" ");
	return stemmingCombine;
}


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

router.post('/imageSearch', function(req, res, next) {
	var keyword = req.body.searchKey;
	console.log(keyword)
	google.list({
	    keyword: keyword,
	    num: 50,
	    detail: true,
	    nightmare: {
	      //  show: true
	    }
	})
	.then(function (result) {
	     res.json(result);
	  	 console.log('first 10 results from google', results);
	}).catch(function(err) {
	    console.log('err', err);
	});
 
});

module.exports = router;
