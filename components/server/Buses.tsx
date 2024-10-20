import { fetchBusDB } from '@/utils/db';
import * as React from 'react';
import { Typography } from '@mui/material';
import BusItem from '../client/BusItem';
import NewBusBtn from '../client/NewBusBtn';

export type BusesProps = object;

const Buses: React.FC<BusesProps> = async ({}) => {
	const db = await fetchBusDB();

	const buses = db.buses.map((bus, i) => <BusItem key={bus.id} bus={bus} i={i} />);

	return (
		<div>
			<Typography variant="overline">Buses</Typography>
			{buses}
			<div className="flex justify-end">
				<NewBusBtn />
			</div>
		</div>
	);
};

export default Buses;
