import {Document} from 'mongoose';

export interface RenderData{
	title: string;
	render: any;
	sub?: any;
	category?: any;
};

export interface CategoryData extends Document{
	category?: string;
	status?: number;
	date?: string;
};