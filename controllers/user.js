var User = require('../models/user');
exports.postUser = function(req,res){
	User.findOne({'email':req.body.email},function(err,user){
		if(err) res.send(err);
		if(user) {
			res.json({isSuccess:false,message:'User Already Exists'});
		}
		if(!user){
			var newUser = new User();
			newUser.email = req.body.email;
			newUser.password = req.body.password;
			newUser.name	 = req.body.name;

			newUser.save(function(err){
				if(err) res.send(err);
				newUser.password=undefined;
				newUser.isSuccess=true;
				res.json({isSuccess:true,message:'User Created'});
			});
		}
	});
};
exports.getUser = function(req, res) {
  User.findOne({'email':req.params.email}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};
exports.login = function(req, res) {
  User.findOne({'email':req.body.email,'password':req.body.password}, function(err, user) {
    if (err)
      res.send(err);
  	if(!user)
  	  res.json({isSuccess:false,message:'Invalid Username/password'});
  	if(user)
  	  res.json({isSuccess:true,message:'Login Successful',user:user});
  });
};
exports.addTrip = function(email,trip) {
  
};
process.on('uncaughtException', function(err) {
  console.log('Caught exception: ' + err);
});