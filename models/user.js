var mongoose = require('mongoose');

var Schema 	 = mongoose.Schema;

var UserSchema = new Schema({
		name: {type:String, required:true},
		email: {type:String, required:true, unique:true},
		password: {type:String, required:true},
		trip:{type:String}
	});
module.exports =  mongoose.model('user',UserSchema);