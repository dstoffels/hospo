// Databases
export type FoodDB = {
	menuLinks: MenuLinkType[];
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
	busId: string;
};

export type Bus = Model & {
	stock: StockItemType[];
};

export type Order = {
	id: string;
	user: User;
	order: string;
	fulfilled: boolean;
};

export type StockItemType = {
	id: string;
	user: User;
	item: string;
};

export type MenuLinkType = {
	url: string;
	useIframe: boolean;
	title: string;
	description: string;
	favicon: string;
	thumbnail: string;
	meal: MealOptions;
};

export const mealOptions = ['Lunch', 'Dinner', 'Aftershow'] as const;
export type MealOptions = (typeof mealOptions)[number];
