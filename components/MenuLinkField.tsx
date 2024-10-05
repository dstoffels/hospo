'use client';

import { updateMenuLink } from '@/app/admin/actions';
import { DB } from '@/app/types';
import { TextField } from '@mui/material';
import * as React from 'react';

export type MenuLinkFieldProps = {
	db: DB;
};

const MenuLinkField: React.FC<MenuLinkFieldProps> = ({ db }) => {
	const [menuLink, setMenuLink] = React.useState(db.menu_link);

	React.useEffect(() => {
		const handler = setTimeout(() => {
			if (menuLink !== db.menu_link) {
				updateMenuLink(menuLink); // Call your update function after debouncing
			}
		}, 500); // 500ms debounce delay

		return () => {
			clearTimeout(handler); // Clear the timeout on each re-render
		};
	}, [menuLink, db.menu_link]);

	return (
		<TextField
			value={menuLink}
			onChange={(e) => setMenuLink(e.target.value)}
			variant="standard"
			name="menu_link"
			label="Menu Link"
		/>
	);
};

export default MenuLinkField;
