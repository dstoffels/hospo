export type DB = {
	id: string;
	menu_link: string;
	orders: order[];
	message: string;
	open: boolean;
};

export type order = {
	name: string;
	order: string;
	token: string;
	completed: boolean;
	id: string;
};
