var mongoose = require('mongoose');

var Schema 	 = mongoose.Schema;

var TripSchema = new Schema({
		handle: {type:String, required:true, unique:true},
		users: {type:Array},
		places: {type:Array},
		moods: {type:Array},
		isBooked: {type: Boolean}
	});
module.exports =  mongoose.model('trip',TripSchema);