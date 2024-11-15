'use client';

import { MenuLinkType } from '@/app/types';
import { SelectChangeEvent, Typography } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import Panel from '../server/Panel';
import MenuSelect from './MenuSelect';
import Column from '../server/Column';

export type SiteIframeProps = {
	menuLinks: MenuLinkType[];
};

const SiteIframe: React.FC<SiteIframeProps> = ({ menuLinks }) => {
	const [menuLink, setMenuLink] = useState<MenuLinkType | null>(menuLinks[0] || null);

	const iframeRef = React.useRef<HTMLIFrameElement>(null);

	const handleChange = (e: SelectChangeEvent<unknown>) => {
		const selected = menuLinks.find(({ title }) => title === e.target.value);
		setMenuLink(selected || null);
	};

	return (
		menuLink && (
			<Column>
				<MenuSelect value={menuLink?.title} menuLinks={menuLinks} onChange={handleChange} />
				{menuLink?.useIframe ? (
					<iframe
						ref={iframeRef}
						id="menu-iframe"
						src={menuLink.url}
						className="flex-grow relative"
						sandbox="allow-scripts allow-same-origin allow-modals allow-top-navigation-by-user-activation allow-popups allow-popups-to-escape-sandbox"
					></iframe>
				) : (
					<a
						href={menuLink?.url}
						target="_blank"
						className="flex flex-col flex-grow justify-center"
					>
						<Panel>
							<div className="flex justify-between mb-2">
								<div className="flex space-x-2 items-center overflow-hidden">
									{menuLink?.favicon && (
										<img src={menuLink?.favicon} alt="" style={{ height: '1rem' }} />
									)}
									<Typography
										className="whitespace-nowrap overflow-hidden text-ellipsis"
										color="textDisabled"
										variant="caption"
									>
										{menuLink?.title}
									</Typography>
								</div>
								<OpenInNewIcon color="info" />
							</div>
							{menuLink?.thumbnail && <img className="mb-2" src={menuLink?.thumbnail} alt="" />}
							<Typography color="textDisabled">{menuLink?.description}</Typography>
						</Panel>
					</a>
				)}
			</Column>
		)
	);
};

export default SiteIframe;
