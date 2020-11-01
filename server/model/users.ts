import { mongooseObject } from './model';
const mongoose: any = mongooseObject.mongoose;
const connection: any = mongooseObject.connection;
export default function UserModel(){
	const Schema: any = mongoose.Schema;
	const userSchema = new Schema({
		username: {type:String, default:'', required:true},
		email: {type:String, default:'', required:true},
		password: {type:String, default:'', required:true},
		date: {type:Date, default: Date.now}
	},{versionKey:false});
	return connection.model('users',userSchema);
}