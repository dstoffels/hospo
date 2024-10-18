// 'use client';

// import { updateMsg } from '@/app/admin/actions';
// import { DB } from '@/app/types';
// import { Close } from '@mui/icons-material';
// import { IconButton, InputAdornment, TextField } from '@mui/material';
// import * as React from 'react';

// export type MessageFieldProps = {
// 	db: DB;
// };

// const MessageField: React.FC<MessageFieldProps> = ({ db }) => {
// 	const [message, setMessage] = React.useState(db.message);

// 	React.useEffect(() => {
// 		const handler = setTimeout(() => {
// 			if (message !== db.message) {
// 				updateMsg(message);
// 			}
// 		}, 300);

// 		return () => {
// 			clearTimeout(handler);
// 		};
// 	}, [message, db.message]);

// 	return (
// 		<TextField
// 			value={message}
// 			onChange={(e) => setMessage(e.target.value)}
// 			name="message"
// 			label="Message"
// 			multiline
// 			variant="standard"
// 			slotProps={{
// 				input: {
// 					endAdornment: (
// 						<InputAdornment position="end">
// 							<IconButton onClick={() => setMessage('')}>
// 								<Close />
// 							</IconButton>
// 						</InputAdornment>
// 					),
// 				},
// 			}}
// 		/>
// 	);
// };

// export default MessageField;
