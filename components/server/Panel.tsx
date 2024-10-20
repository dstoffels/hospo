import { Paper } from '@mui/material';
import * as React from 'react';

export type PanelProps = React.PropsWithChildren & {
	className?: string;
	elevation?: number;
};

const Panel: React.FC<PanelProps> = ({ children, className, elevation = 4 }) => {
	return (
		<Paper elevation={elevation} className={'p-2 max-w-xl w-full ' + className}>
			{children}
		</Paper>
	);
};

export default Panel;
