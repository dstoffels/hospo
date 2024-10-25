import Column from '@/components/server/Column';
import Page from '@/components/server/Page';
import UserSelect from '@/components/client/UserSelect';
import { auth } from '@/utils/auth';
import { fetchBusDB, fetchMainDB } from '@/utils/db';
import { Divider, Typography } from '@mui/material';
import BusSelect from '@/components/client/BusSelect';

export default async function HomePage({}) {
	const { message, users } = await fetchMainDB();

	const { buses } = await fetchBusDB();

	const { sessionId } = await auth();

	const user = users.find((u) => u.sessions.includes(sessionId)) || null;

	return (
		<Page className="flex flex-col flex-grow">
			{message && (
				<>
					<div className="mb-4">
						<Typography whiteSpace="break-spaces" color="">
							{message}
						</Typography>
					</div>
					<Divider />
				</>
			)}
			<Column className="space-y-2 mt-2">
				{user && <Typography variant="h4">Hi {user.name}!</Typography>}
				<UserSelect sessionId={sessionId} users={users} user={user} />
				{!user?.busId && (
					<div>
						<div className="mb-1">
							<Typography color="warning" variant="caption">
								Select the bus you ride
							</Typography>
						</div>
						<BusSelect buses={buses} user={user} />
					</div>
				)}
			</Column>
		</Page>
	);
}
