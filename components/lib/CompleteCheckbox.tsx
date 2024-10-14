'use client';

import { completeOrder } from '@/app/admin/actions';
import { Order } from '@/app/types';
import { Checkbox } from '@mui/material';
import * as React from 'react';

export type CompleteCheckboxProps = {
	order: Order;
};

const CompleteCheckbox: React.FC<CompleteCheckboxProps> = ({ order }) => {
	return <Checkbox checked={order.fulfilled} onChange={() => completeOrder(order)} />;
};

export default CompleteCheckbox;
