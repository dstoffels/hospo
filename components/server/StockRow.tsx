import { Bus, StockItemType, User } from '@/app/types';
import { auth } from '@/utils/auth';
import { TableCell, TableRow } from '@mui/material';
import * as React from 'react';
import StockForm from '../client/StockForm';
import EditBtn from '../client/EditBtn';
import { fetchMainDB } from '@/utils/db';

export type StockRowProps = {
	bus: Bus;
	item: StockItemType;
	isAdmin: boolean;
	user: User | null;
};

const StockRow: React.FC<StockRowProps> = async ({ item, bus }) => {
	const { isAdmin, sessionId, user } = await auth();
	const { users } = await fetchMainDB();
	const isOwner = item.user.id === user?.id;

	return (
		<TableRow>
			<TableCell padding="normal">{item.item}</TableCell>
			{isAdmin && <TableCell align="right">{item.user.name}</TableCell>}
			{isOwner && (
				<TableCell align="right">
					<StockForm
						MainButton={EditBtn}
						sessionId={sessionId}
						busId={bus.id}
						user={user}
						users={users}
						existingItem={item}
					/>
				</TableCell>
			)}
		</TableRow>
	);
};

export default StockRow;
