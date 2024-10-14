// Databases
export type FoodDB = {
	menuLinks: MenuLink[];
	orders: Order[];
	message: string;
	open: boolean;
};

export type BusStockDB = {
	buses: Bus[];
	message: string;
};

export type MainDB = {
	message: string;
	users: User[];
};

export type DBname = 'food' | 'busstock' | 'main';

// Models
export type Model = {
	id: string;
	name: string;
};
export type User = Model & {
	sessions: string[];
};

export type Bus = Model & {
	stock: Order[];
};

export type Order = {
	id: string;
	user: User;
	order: string;
	fulfilled: boolean;
};

export type MenuLink = {
	url: string;
	useIframe: boolean;
};
