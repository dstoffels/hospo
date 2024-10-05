'use client';

import { completeOrder } from '@/app/admin/actions';
import { order } from '@/app/types';
import { Checkbox } from '@mui/material';
import * as React from 'react';

export type CompleteCheckboxProps = {
	order: order;
};

const CompleteCheckbox: React.FC<CompleteCheckboxProps> = ({ order }) => {
	return <Checkbox checked={order.completed} onChange={() => completeOrder(order)} />;
};

export default CompleteCheckbox;
