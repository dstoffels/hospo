'use client';

import { toggleOpen } from '@/app/admin/actions';
import { DB } from '@/app/types';
import { Switch, Typography } from '@mui/material';
import * as React from 'react';

export type OpenSwitchProps = {
	db: DB;
};

const OpenSwitch: React.FC<OpenSwitchProps> = ({ db }) => {
	return (
		<div className="flex justify-between">
			<Typography variant="overline">Individual Ordering</Typography>
			<Switch size="medium" checked={db.open} onClick={() => toggleOpen()} />
		</div>
	);
};

export default OpenSwitch;
