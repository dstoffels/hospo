import { Paper } from '@mui/material';
import * as React from 'react';

export type PanelProps = React.PropsWithChildren & {
	className?: string;
};

const Panel: React.FC<PanelProps> = ({ children, className }) => {
	return <Paper className={'p-2 max-w-xl w-full ' + className}>{children}</Paper>;
};

export default Panel;
