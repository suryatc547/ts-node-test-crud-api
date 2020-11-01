import express,{Request,Response,Router} from 'express';
import {encrypt,decrypt} from '../helper/helper';
import validator from 'validator';
import {RenderData,CategoryData} from './render-type';

const router:Router = express.Router();

class Common{
	private testVar: number;
	constructor(){
		this.testVar = 1;
	}
	public async index(req: Request, res: Response):Promise<void>{
		console.log(this.testVar)
		const Category: any = global.Category;
		const category: CategoryData[] = await Category.find();
		const data: RenderData = {title:'app',render:'index',category};
		data.sub = data;
		res.render('app',data);
	}
	public async register(req: Request,res: Response):Promise<void>{
		if(validator.isEmpty(req.body.username))
			res.redirect('/');
		else if(validator.isEmpty(req.body.email) || !validator.isEmail(req.body.email))
			res.redirect('/');
		else if(validator.isEmpty(req.body.password))
			res.redirect('/');
		else {
			const Users: any = global.Users;
			const existsUsername: any = Users.find({username:req.body.username}).countDocuments();
			const existsMail: any = Users.find({email:req.body.email}).countDocuments();
			const exists: number[] = await Promise.all([existsUsername,existsMail])
			if(exists[0] > 0) res.redirect('/');
			else if(exists[1] > 0) res.redirect('/');
			else {
				const result: any = await Users.create({
				username: req.body.username,
				email: req.body.email,
				password: encrypt(req.body.password)
				});
				if(result) res.redirect('/');
			}
		}
	}
	public async category(req: Request,res: Response):Promise<void>{
		if(validator.isEmpty(req.body.category)){
			res.redirect('/');
		} else if(validator.isEmpty(req.body.status)){
			res.redirect('/');
		} else {
			const Category = global.Category;
			const where: object = req.params.id?{_id:req.params.id}:{category:''};
			const result: any = await Category.findOneAndUpdate(where,{
				category: req.body.category,
				status: req.body.status,
			},{upsert:true,rawResult:true});
			console.log(result)
			res.redirect('/');
		}
	}
}

const CommonRouter:Common = new Common();
router.get('/',(req:Request,res:Response):Promise<void> => CommonRouter.index(req,res))
router.post('/register',(req:Request,res:Response):Promise<void> => CommonRouter.register(req,res))
router.post('/category',(req:Request,res:Response):Promise<void> => CommonRouter.category(req,res))

export default router;