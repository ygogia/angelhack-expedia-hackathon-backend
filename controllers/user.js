var Trip = require('../models/trip');
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
			newUser.d_id = req.body.d_id;
			newUser.trips = undefined;

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
  	user.password = undefined;
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
Array.prototype.removeValue = function(name, value){
   var array = $.map(this, function(v,i){
      return v[name] === value ? null : v;
   });
   this.length = 0; //clear original array
   this.push.apply(this, array); //push all elements except the one we want to delete
}
exports.addTrip = function(req, res) {
  User.findOne({'email':req.body.email}, function(err, user) {
    if (err)
      res.send(err);
  	if(!user)
  	  res.json({isSuccess:false,message:'User Not Found'});
  	if(user){
  		    Trip.findOne({'handle':req.body.handle},function(err, trip){
  			  if (err)
      			res.send(err);
      		if(trip){
            var tripExists = false
            for(var i in user.trips){
              if (user.trips[i].handle==req.body.handle.trim())
                tripExists = true
            }
            if(tripExists)
              res.json({isSuccess:false,message:'Trip Already Exists.'});
            else{
            trip.users.push({'user':req.body.email,'isAdmin':req.body.isAdmin,'d_id':user.d_id});
            trip.save(function(err){
              if(err) 
                res.send(err);
              if(undefined==user.trips){
                var trips = [];
                trips.push({'handle':req.body.handle,'isAdmin':req.body.isAdmin});
                user.trips = trips;
              }else{
                user.trips.push({'handle':req.body.handle,'isAdmin':req.body.isAdmin});
              }
              user.save(function(err){
              if(err)  res.send(err);
                res.json({isSuccess: true});
              });
              res.json({isSuccess:true,message:'Trip Addition Successful',user:user});
            });
            }
          }

          if(!trip){
            var newTrip = new Trip();
            newTrip.handle = req.body.handle;
            newTrip.isBooked = false;
            newTrip.admin = req.body.email;
            newTrip.users.push({'user':req.body.email,'isAdmin':req.body.isAdmin,'d_id':user.d_id});
            newTrip.save(function(err){
            if(err) 
              res.send(err);
            if(undefined==user.trips){
              var trips = [];
              trips.push({'handle':req.body.handle,'isAdmin':req.body.isAdmin});
              user.trips = trips;
              }else{
                user.trips.push({'handle':req.body.handle,'isAdmin':req.body.isAdmin});              
              }
              user.save(function(err){
              if(err)  res.send(err);
                res.json({isSuccess: true});
              });
              res.json({isSuccess:true,message:'Trip Addition Successful',user:user});
            });
          }
      });
  	}
  });
};

exports.deleteTrip = function(req, res) {
  User.findOne({'email':req.body.email}, function(err, user) {
    if (err)
      res.send(err);
    if(!user)
      res.json({isSuccess:false,message:'User does Not Exists.'});
    if(user){
          Trip.findOne({'handle':req.body.handle},function(err, trip){
          if (err)
            res.send(err);
          if(trip){
            var tripExists = false
            for(var i in user.trips){
              if (user.trips[i].handle==req.body.handle.trim())
                tripExists = true
            }
            if(tripExists){
              var tripArray = [];
              var tripUsersIndex;
              var userTripsIndex;
              var userArray = [];
              for(var i in user.trips){
                if (user.trips[i].handle==req.body.handle.trim())
                  userTripsIndex = i;    
              }
              for(var i in trip.users){
                if (trip.users[i].user==req.body.email.trim())
                 tripUsersIndex = i; 
              }
              trip.users.splice(tripUsersIndex,1);
              user.trips.splice(userTripsIndex,1);

              trip.save(function(err){
                if(err) 
                  res.send(err);
                user.save(function(err){
                if(err)  res.send(err);
                  res.json({isSuccess: true});
                });
                res.json({isSuccess:true,message:'Trip Deleted',user:user});
              });
            }
            else{
              res.json({isSuccess:false,message:'Trip Not Added to user'});
            }
          }

          if(!trip){
              res.json({isSuccess:false,message:'Trip Does not Exists.'});
          }

      });
    }
  });
};