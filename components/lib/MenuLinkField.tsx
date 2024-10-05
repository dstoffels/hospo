'use client';

import { updateMenuLink } from '@/app/admin/actions';
import { DB } from '@/app/types';
import { Close } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import * as React from 'react';

export type MenuLinkFieldProps = {
	db: DB;
};

const MenuLinkField: React.FC<MenuLinkFieldProps> = ({ db }) => {
	const [menuLink, setMenuLink] = React.useState(db.menu_link);

	React.useEffect(() => {
		const handler = setTimeout(() => {
			if (menuLink !== db.menu_link) {
				updateMenuLink(menuLink);
			}
		}, 300);

		return () => {
			clearTimeout(handler);
		};
	}, [menuLink, db.menu_link]);

	return (
		<TextField
			value={menuLink}
			onChange={(e) => setMenuLink(e.target.value)}
			variant="standard"
			name="menu_link"
			label="Menu Link"
			slotProps={{
				input: {
					endAdornment: (
						<InputAdornment position="end">
							<IconButton onClick={() => setMenuLink('')}>
								<Close />
							</IconButton>
						</InputAdornment>
					),
				},
			}}
		/>
	);
};

export default MenuLinkField;
