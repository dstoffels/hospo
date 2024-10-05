import { fetchDB } from './actions';
import SiteIframe from '@/components/SiteIframe';
import OrderModal from '@/components/OrderModal';
import { getTokens } from '@/utils/cookies';
import { Button, Paper, Stack, Typography } from '@mui/material';
import { Add } from '@mui/icons-material';
import OrderTable from '@/components/OrderTable';

export default async function AftershowPage({}) {
	const { sessionId } = getTokens();

	const db = await fetchDB();

	const validateIframe = async () => {
		'use server';
		try {
			const res = await fetch(db.menu_link, { method: 'HEAD' });
			return !Boolean(res.headers.get('content-security-policy')?.includes('frame-ancestors'));
		} catch (error) {
			console.log('fetch error', error);
			return false;
		}
	};

	const canFrameSite = await validateIframe();

	const orders = db.orders.filter((o) => o.token === sessionId);

	return (
		<div className="flex-grow flex-col flex p-2">
			<Paper elevation={4} className="p-2 bg-slate-300">
				<Stack spacing={1}>
					<OrderTable heading="My Items" orders={orders} />
					<OrderModal btnTxt="Add Order" token={sessionId as string}>
						<Button variant="contained" color="primary" size="large" className="w-full">
							<span>Add Your Order </span>
							<Add />
						</Button>
					</OrderModal>
				</Stack>
			</Paper>
			<SiteIframe db={db} canFrameSite={canFrameSite} />
		</div>
	);
}
