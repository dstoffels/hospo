'use client';

import { DB } from '@/app/types';
import { Button, Paper } from '@mui/material';
import * as React from 'react';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export type SiteIframeProps = {
	db: DB;
	canFrameSite: boolean;
};

const SiteIframe: React.FC<SiteIframeProps> = ({ db, canFrameSite }) => {
	return (
		db.menu_link && (
			<Paper className="w-full h-full flex-grow flex flex-col mt-1 p-2">
				<iframe
					id="menu-iframe"
					src={db.menu_link + '?nocache=' + Date.now()}
					className={`w-full h-full flex-grow ${canFrameSite ? '' : 'hidden'}`}
					sandbox="allow-scripts allow-same-origin"
				></iframe>
				<a
					className={`w-full h-full flex flex-col justify-center mt-2 ${
						canFrameSite ? 'hidden' : ''
					}`}
					href={db.menu_link}
					target="_blank"
				>
					<Button fullWidth variant="contained" size="large">
						{`Open Menu  `}
						<OpenInNewIcon />
					</Button>
				</a>
			</Paper>
		)
	);
};

export default SiteIframe;
