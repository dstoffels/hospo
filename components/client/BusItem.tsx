'use client';

import { Bus } from '@/app/types';
import * as React from 'react';
import EditField from './EditField';
import { useState } from 'react';
import { deleteBus, updateBus } from '@/app/busstock/actions';

export type BusItemProps = {
	bus: Bus;
	i: number;
};

const BusItem: React.FC<BusItemProps> = ({ bus, i }) => {
	const [name, setName] = useState(bus.name || '');

	const handleEdit = () => {
		updateBus({ ...bus, name }, i);
	};

	const handleDelete = () => {
		deleteBus(i);
	};

	return (
		<>
			<EditField
				size="small"
				variant="standard"
				value={name}
				onChange={(e) => setName(e.target.value)}
				onEdit={handleEdit}
				onDelete={handleDelete}
			></EditField>
		</>
	);
};

export default BusItem;
