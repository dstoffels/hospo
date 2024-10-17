import Column from '@/components/lib/Column';
import Page from '@/components/Page';
import UserSelect from '@/components/UserSelect';
import { auth } from '@/utils/auth';
import { fetchMainDB } from '@/utils/db';
import { Paper, Typography } from '@mui/material';

export default async function HomePage({}) {
	const { message, users } = await fetchMainDB();

	const { sessionId } = await auth();

	const user = users.find((u) => u.sessions.includes(sessionId));

	return (
		<Page className="flex flex-col flex-grow">
			<Column className="">
				{user && <Typography variant="h4">Hi {user.name}!</Typography>}
				<UserSelect sessionId={sessionId} users={users} user={user} />
				<Paper elevation={2} className="p-1">
					<Typography color="textDisabled">{message}</Typography>
				</Paper>
			</Column>
		</Page>
	);
}
