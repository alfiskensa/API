var express = require('express');
var App = express.Router();
var bodyParser = require('body-parser');
var Session = require('express-session');
var Session= Session({
	secret:'secrettokenhere',
	saveUninitialized: true,
	resave: true
});
var sessionInfo;

//create
App.post('/api', function(req, res) {
 	 
      var insert_data = req.body; 
      
	req.getConnection(function(err,connection){
		connection.query('INSERT INTO user SET ?',[insert_data],function(err,result){
			if(err) return res.status(400).json(err);

			return res.status(200).json(result);
		});
	});
});

// read
App.get('/api', function(req, res) {
	req.getConnection(function(err,connection){
		connection.query('SELECT * FROM user',[],function(err,result){
			if(err) return res.status(400).json();

			return res.status(200).json(result);
		});
	});
});

// read by id
App.get('/api/:id',  function(req, res) {
 	var id = req.params.id;

	req.getConnection(function(err,connection){
		connection.query('SELECT * FROM user WHERE id = ?',[id],function(err,result){
			if(err) return res.status(400).json(err);

			return res.status(200).json(result[0]);
		});
	});
});

//update
App.put('/api/:id', function(req, res) {
 	var data = req.body,
 		id 	   = req.params.id;

	req.getConnection(function(err,connection){
		connection.query('UPDATE user SET ? WHERE id = ? ',[data, id],function(err,result){
			if(err) return res.status(400).json(err);

			return res.status(200).json(result);
		});
	});
});

//delete
App.delete('/api/:id', function(req, res) {
 	var id = req.params.id;

	req.getConnection(function(err,connection){
		connection.query('DELETE FROM user WHERE id = ? ',[id],function(err,result){
			if(err) return res.status(400).json(err);

			return res.status(200).json(result);
		});
	});
});

//login
App.post('/api/admin', function(req, res) {
     sessionInfo=req.session;
     var username = req.body.username;
     var password = req.body.password;
	 req.getConnection(function(err,connection){
		connection.query('SELECT * FROM admin WHERE username = ? and password = ?',[username],[password],function(err,result){
			if(err) return res.status(400).json();
            if(result.length>0) {
            var uid="";			
			result.forEach(function(element, index, array){
				uid=element.id;
			});
            sessionInfo.uid = uid;
			return res.status(200).json(result);
            }
		});
        
	});
});
/*
exports.create = function(req, res) {
 	 
      var insert_data = req.body; 
      
	req.getConnection(function(err,connection){
		connection.query('INSERT INTO user SET ?',[insert_data],function(err,result){
			if(err) return res.status(400).json(err);

			return res.status(200).json(result);
		});
	});
   };


exports.profile = function(req, res) {
 	var id = req.params.id;

	req.getConnection(function(err,connection){
		connection.query('SELECT * FROM user WHERE id = ?',[id],function(err,result){
			if(err) return res.status(400).json(err);

			return res.status(200).json(result[0]);
		});
	});
};

exports.update = function(req, res) {
 	var data = req.body,
 		id 	   = req.params.id;

	req.getConnection(function(err,connection){
		connection.query('UPDATE user SET ? WHERE id = ? ',[data, id],function(err,result){
			if(err) return res.status(400).json(err);

			return res.status(200).json(result);
		});
	});
};

exports.delete = function(req, res) {
 	var id = req.params.id;

	req.getConnection(function(err,connection){
		connection.query('DELETE FROM user WHERE id = ? ',[id],function(err,result){
			if(err) return res.status(400).json(err);

			return res.status(200).json(result);
		});
	});
};
 
*/

/* GET home page. 
App.route('/api')
	.get(Lembretes.read)
	.post(Lembretes.create);
    
App.route('/api/admin')    
    .post(Admin.create)
    .post(Admin.login);


App.route('/api/:id')
	.get(Lembretes.profile)
	.put(Lembretes.update)
	.delete(Lembretes.delete);

*/
module.exports = App;
