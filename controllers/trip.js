var Trip = require('../models/trip');
var User = require('../models/user');
exports.postTrip = function(req,res){
Trip.findOne({'trip':req.body.handle},function(err,trip){
    if(err) res.send(err);
    if(trip) {
        res.json({isSuccess:false,message:'Trip Already Exists'});
    }
    if(!trip){
        var newTrip = new Trip();
        newTrip.handle = req.body.handle;

        newTrip.save(function(err){
            if(err) res.send(err);
                res.json({isSuccess:true,message:'Trip Created'});
        });
    }
});
};

exports.tripDetailsAdd = function(req,res){
Trip.findOne({'trip':req.body.handle},function(err,trip){
    if(err) res.send(err);
    if(!trip) {
        res.json({isSuccess:false,message:'Trip Does`nt Exist'});
    }
    if(trip){
        trip.pickup = req.body.pickup;
        trip.start = req.body.start;
        trip.end = req.body.end;
        trip.step = req.body.step;
        trip.places = req.body.places==undefined?[]:req.body.places;
        trip.moods = req.body.moods==undefined?[]:req.body.moods;

        newTrip.save(function(err){
            if(err) res.send(err);
                res.json({isSuccess:true,message:'Trip Updated'});
        });
    }
});
};

exports.changeStatus= function(req,res){
Trip.findOne({'trip':req.body.handle},function(err,trip){
    if(err) res.send(err);
    if(!trip) {
        res.json({isSuccess:false,message:'Trip Does`nt Exist'});
    }
    if(trip){
        trip.step = req.body.step;

        newTrip.save(function(err){
            if(err) res.send(err);
                res.json({isSuccess:true,message:'Trip Updated'});
        });
    }
});
};



exports.createTrip = function(req,res){
Trip.findOne({'trip':req.body.handle},function(err,trip){
    if(err) res.send(err);
    if(trip) {
        res.json({isSuccess:false,message:'Trip Already Exists'});
    }
    if(!trip){
        var newTrip = new Trip();
        newTrip.handle = req.body.handle;

        newTrip.save(function(err){
            if(err) res.send(err);
                res.json({isSuccess:true,message:'Trip Created'});
        });
    }
});
};

exports.getTrip = function(req, res) {
Trip.findOne({'handle':req.params.handle}, function(err, trip) {
if (err)
  res.send(err);
res.json(trip);
});
};
exports.updateTrip = function(req, res){
function isInArray(value, array) {
    return array.indexOf(value) > -1;
}
Trip.findOne({'handle':req.body.handle},function(err,trip){
if (err){
  res.send(err);
}
if(!trip) {
res.json({isSuccess:false,message:'tripname Does Not Exist'});
}
if(trip){
    var updatedTrip = new Trip();
    updatedTrip.handle = trip.handle;
    if(req.body.hasOwnProperty('users')){
        if(trip.users!==undefined){
            if(!isInArray(req.body.users, trip.users)) {
                User.findOne({'email':req.body.users}, function(err, user) {
                if (err){
                    console.log(err);
                    res.json({isSuccess:false,message:err});
                }
                if(!user){
                    res.json({isSuccess:false,message:'No User'+req.body.users});
                }
                if(user){
                    user.trip = trip;
                    User.findOneAndUpdate({'email':req.body.users},user,function(err) {
                      if (err){
                        console.log(err);
                    }
                    trip.users.push(req.body.users);
                    console.log(trip.users);
                    if(req.body.moods!==undefined ){
                        if(trip.moods!==undefined){
                            trip.moods.push(req.body.moods);
                        }else{
                            var tripMoods = [req.body.moods];
                            trip.moods = tripMoods;
                        }
                    }
                    if(req.body.places!=undefined ){
                        if(trip.places!=undefined){
                            trip.places.push(req.body.places);
                        }else{
                            var tripPlaces = [req.body.places];
                            trip.places = tripPlaces;
                        }
                    }
                    var options = {upsert: true};
                    Trip.findOneAndUpdate({'handle':req.body.handle},trip,options,function(err) {
                      if (err)
                        res.json({isSuccess:false,message:err});
                      res.json({isSuccess:true,message:'trip Updated'});
                    });
                });
            }  
          });
        }else{
            res.json({isSuccess:false,message:"User Already Exists"});
        }
        }else{
            var tripUsers = [req.body.users];
            trip.users = tripUsers;

            if(req.body.moods!==undefined ){
                        if(trip.moods!==undefined){
                            trip.moods.push(req.body.moods);
                        }else{
                            var tripMoods = [req.body.moods];
                            trip.moods = tripMoods;
                        }
                    }
                    if(req.body.places!=undefined ){
                        if(trip.places!=undefined){
                            trip.places.push(req.body.places);
                        }else{
                            var tripPlaces = [req.body.places];
                            trip.places = tripPlaces;
                        }
                    }
                    var options = {upsert: true};
                    Trip.findOneAndUpdate({'handle':req.body.handle},trip,options,function(err) {
                      if (err)
                        res.send(err);
                      res.json({isSuccess:true,message:'trip Updated'});
                    });
        }
    }
    if(req.body.moods!==undefined ){
                        if(trip.moods!==undefined){
                            trip.moods.push(req.body.moods);
                        }else{
                            var tripMoods = [req.body.moods];
                            trip.moods = tripMoods;
                        }
                    }
                    if(req.body.places!=undefined ){
                        if(trip.places!=undefined){
                            trip.places.push(req.body.places);
                        }else{
                            var tripPlaces = [req.body.places];
                            trip.places = tripPlaces;
                        }
                    }
                    var options = {upsert: true};
                    Trip.findOneAndUpdate({'handle':req.body.handle},trip,options,function(err) {
                      if (err)
                        res.send(err);
                      res.json({isSuccess:true,message:'trip Updated'});
                    });
}
});
};
process.on('uncaughtException', function(err) {
console.log('Caught exception: ' + err);
});