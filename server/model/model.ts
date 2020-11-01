import mongoose from 'mongoose';

mongoose.set('useFindAndModify',false);
mongoose.set('useUnifiedTopology',true);

const connect = mongoose.createConnection('mongodb://localhost:27017/choco',{
	useNewUrlParser: true
});

export const mongooseObject = {mongoose,connection:connect};