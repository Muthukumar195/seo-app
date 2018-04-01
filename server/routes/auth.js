var express = require('express');
var router = express.Router();

/* GET home page. */


router.post('/register', function(req, res, next) {
console.log(req.body) 

	var input = JSON.parse(JSON.stringify(req.body));		
		var users = {            
				first_name  : input.firstName,
				last_name  : input.lastName,
				email  : input.email,
				password  : input.password
			};
			
		var Insert_query = "INSERT INTO users SET ?";
		req.getConnection(function(err, connection){
			
			var query = connection.query(Insert_query, users, function(err, result){
				if(err){				
					res.json({'authdicated':false, 'message' : 'Database Error'});	
				}else{	
				console.log();
				var authUsers = {            
					first_name  : input.firstName,
					last_name  : input.lastName,
					email  : input.email,
					id : result.insertId	
				};	   			
				   
					res.json({'authdicated':true, 'message': 'Registered successfully!', 'user': authUsers});	
				}
			});
			console.log(query.sql);	
		});
});

router.post('/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
   req.getConnection(function(err, connection){
			
			var query = connection.query("SELECT id, first_name, last_name, email, password FROM users WHERE email = ?",username, function(err, result, fields){
				if(err){
					console.log(err);
				}
				else{					
					if(result.length > 0){
						console.log(result)
						if(result[0].password === password){	
							res.json({'authdicated':true, 'message': 'Login successfully!', 'user': result[0]});
						}
						else{
						  res.json({'authdicated':false, 'message': 'Invaid Username and password'});
						}
					}
					else{						
						res.json({'authdicated':false, 'message': 'Email does not exits'});
					}			
			}

		});
	});
	
});

module.exports = router;
