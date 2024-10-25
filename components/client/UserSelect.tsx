'use client';

import { setUser } from '@/app/actions';
import { User } from '@/app/types';
import { Autocomplete, createFilterOptions, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { v4 } from 'uuid';

export type UserSelectProps = {
	sessionId: string;
	users: User[];
	user: User | null;
};

const UserSelect: React.FC<UserSelectProps> = ({ sessionId, users, user }) => {
	const [showSelect, setShowSelect] = useState(!Boolean(user));
	const [selectedUser, setSelectedUser] = useState<User | null>(user || null);

	useEffect(() => {
		if (selectedUser && selectedUser.id !== user?.id) setUser(selectedUser as User, sessionId);
		setShowSelect(!user);
	}, [selectedUser, user]);

	const newId = v4();

	const filter = createFilterOptions<UserOption>();

	const handleChange = (e: React.SyntheticEvent<Element, Event>, newVal: UserOption | null) => {
		if (newVal) {
			if (newVal.inputValue) {
				// create new user
				const newUser = { ...newVal, name: newVal.inputValue };
				setSelectedUser(newUser);
			} else {
				// select existing user
				const newUser = { ...newVal, sessions: [...newVal.sessions, sessionId] } as User;
				setSelectedUser(newUser);
			}
		}
	};

	return (
		<div className="w-full">
			{user ? (
				!showSelect && (
					<Typography onClick={() => setShowSelect(true)} color="primary" variant="caption">
						Not {user.name}?
					</Typography>
				)
			) : (
				<Typography variant="caption" color="error">
					Select your name from the dropdown, or type it in to add yourself to the list.
				</Typography>
			)}

			{showSelect && (
				<Autocomplete
					fullWidth
					options={users}
					value={selectedUser}
					onChange={handleChange}
					getOptionLabel={(u) => u.name}
					filterOptions={(options, params) => {
						const filtered = filter(options, params);
						const names = options.map(({ name }) => name.toLowerCase());

						if (params.inputValue !== '' && !names.includes(params.inputValue.toLowerCase())) {
							filtered.push({
								id: newId,
								name: `Add "${params.inputValue}"`,
								sessions: [sessionId],
								inputValue: params.inputValue,
								busId: '',
							});
						}

						return filtered;
					}}
					renderInput={(params) => (
						<TextField {...params} fullWidth variant="standard" label="Name" />
					)}
				/>
			)}
		</div>
	);
};

export default UserSelect;

type UserOption = User & {
	inputValue?: string;
};
