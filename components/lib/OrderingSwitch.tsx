'use client';

import { toggleOrdering } from '@/app/admin/actions';
// import { toggleOpen } from '@/app/admin/actions';
// import { DB } from '@/app/types';
import { Switch, Typography } from '@mui/material';
import * as React from 'react';

export type OpenSwitchProps = {
	checked: boolean;
};

const OrderingSwitch: React.FC<OpenSwitchProps> = ({ checked }) => {
	return (
		<div className="flex justify-between">
			<Typography variant="overline">Individual Ordering</Typography>
			<Switch size="medium" checked={checked} onClick={() => toggleOrdering()} />
		</div>
	);
};

export default OrderingSwitch;
