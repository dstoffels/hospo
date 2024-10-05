'use client';

import { resetDB } from '@/app/admin/actions';
import { Button } from '@mui/material';
import * as React from 'react';

export type ResetBtnProps = object;

const ResetBtn: React.FC<ResetBtnProps> = ({}) => {
	return (
		<Button onClick={() => resetDB()} className="mt-2" variant="contained" color="error">
			RESET ORDERS
		</Button>
	);
};

export default ResetBtn;
