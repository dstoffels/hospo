import { fetchFoodDB } from '@/utils/db';
import * as React from 'react';
import MenuLink from './lib/MenuLink';
import NewMenuLinkBtn from './lib/NewMenuLinkBtn';
import { Typography } from '@mui/material';

export type MenuLinksProps = object;

const MenuLinks: React.FC<MenuLinksProps> = async ({}) => {
	const db = await fetchFoodDB();

	const menuLinks = db.menuLinks.map((m, i) => <MenuLink key={m.url} menuLink={m} i={i} />);

	return (
		<div>
			<Typography variant="overline">Menu Links</Typography>
			{menuLinks}
			<div className="flex justify-end">
				<NewMenuLinkBtn />
			</div>
		</div>
	);
};

export default MenuLinks;
