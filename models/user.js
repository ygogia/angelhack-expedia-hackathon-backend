var mongoose = require('mongoose');

var Schema 	 = mongoose.Schema;

var UserSchema = new Schema({
		name: {type:String, required:true},
		email: {type:String, required:true, unique:true},
		password: {type:String, required:true},
		d_id: {type:String},
		trips:{type:Array}
	});
module.exports =  mongoose.model('user',UserSchema);