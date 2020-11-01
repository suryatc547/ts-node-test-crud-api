import { mongooseObject } from './model';
const mongoose: any = mongooseObject.mongoose;
const connection: any = mongooseObject.connection;
const upper = (str: string) => str.toUpperCase();
export default function CategoriesModel(){
	const Schema: any = mongoose.Schema;
	const categoriesSchema = new Schema({
		category: {type:String,default:'',get:upper,required:true},
		status: {type:Number,default:0,required:true},
		credate:{type:Date,default:Date.now()}
	},{versionKey:false,autoCreate:true});
	return connection.model('categories',categoriesSchema);
}