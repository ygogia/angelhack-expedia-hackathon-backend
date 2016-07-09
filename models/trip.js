var mongoose = require('mongoose');

var Schema 	 = mongoose.Schema;

var TripSchema = new Schema({
		handle: {type:String, required:true, unique:true},
		moods: {type:Array},
		places: {type:Array},
		users: {type:Array}
	});
module.exports =  mongoose.model('trip',TripSchema);