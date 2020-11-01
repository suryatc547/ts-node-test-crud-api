import crypto from 'crypto';

const encryptKey: string = 'aes-128-cbc';
const encryptSecret: string = 'Bz8Y3z1898';

export let encrypt = (str: string):string => {
	const createKey: any = crypto.createCipher(encryptKey,encryptSecret);
	let myString: string = createKey.update(str, 'utf8', 'hex');
	myString += createKey.final('hex');
	return myString;
}

export let decrypt = (str: string):string => {
	const createKey: any = crypto.createDecipher(encryptKey,encryptSecret);
	let myString: string = createKey.update(str, 'hex', 'utf8');
	myString += createKey.final('utf8');
	return myString;
}