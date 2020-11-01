import * as http from 'http';
import express from 'express';
import ejs from 'ejs';
import path from 'path';
import Common from './router/common';
import UserModel from './model/users';
import CategoriesModel from './model/categories';
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';

declare global {
	namespace NodeJS {
		interface Global {
			Users: any;
			Category: any;
		}
	}
}

global.Users = UserModel();
global.Category = CategoriesModel();
const app: any = express();
const port: number = 8081;
const server: any = http.createServer(app);
server.listen(port, () => {
	console.log('server listening port',port)
})
app.use(cors({
	origin:['http://localhost:3000']
}))
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'../view'));
// app.use(bodyParser());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
// app.use(multer().none());

app.use((req: any,res: any,next: any):void => {
	res.locals.baseUrl = `http://localhost:${port}/`;
	next()
})

app.use('/assets',express.static(path.join(__dirname,'../view')));
app.use('/jsassets',express.static(path.join(__dirname,'../node_modules')));

app.use('/',Common)

app.use((req: any, res: any, next: any):void => {
	res.status(404)
	res.render('app',{render:'404-override',title:'app 404',sub:{}})
})