'use client';

import { setUser } from '@/app/actions';
import { User } from '@/app/types';
import { Autocomplete, Button, createFilterOptions, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { v4 } from 'uuid';

export type UserSelectProps = {
	sessionId: string;
	users: User[];
	user: User | undefined;
};

const UserSelect: React.FC<UserSelectProps> = ({ sessionId, users, user }) => {
	const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
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
				const { inputValue, ...props } = newVal;
				const newUser = { ...props, name: newVal.inputValue };
				setSelectedUser(newUser);
			} else {
				// select existing user
				const newUser = { ...newVal, sessions: [...newVal.sessions, sessionId] } as User;
				setSelectedUser(newUser);
			}
		}
	};

	return (
		<div>
			{user ? (
				!showSelect && (
					<Typography onClick={() => setShowSelect(true)} color="primary" variant="caption">
						Not {user.name}?
					</Typography>
				)
			) : (
				<Typography variant="caption" color="error">
					Ope, I don't recognize this device, select or add your name below.
				</Typography>
			)}

			{showSelect && (
				<Autocomplete
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
							});
						}

						return filtered;
					}}
					renderInput={(params) => <TextField {...params} variant="standard" label="Name" />}
				/>
			)}
		</div>
	);
};

export default UserSelect;

type UserOption = User & {
	inputValue?: string;
};
