exports.create = function(req, res) {
 	var data = req.body;

	req.getConnection(function(err,connection){
		connection.query('INSERT INTO admin SET ?',[data],function(err,result){
			if(err) return res.status(400).json(err);

			return res.status(200).json(result);
		});
	});
 };
 
 exports.login = function(req, res) {
     var username = req.body.username;
     var password = req.body.password;

	req.getConnection(function(err,connection){
		connection.query('SELECT * FROM admin WHERE username = ? and password = ?',[username],[password],function(err,result){
			if(err) return res.status(400).json(err);

			return res.status(200).json(result[0]);
		});
	});
 };