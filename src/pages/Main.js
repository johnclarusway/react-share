import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, capitalize } from '@material-ui/core';
import axios from 'axios';
import MediaCard from '../components/MediaCard';
import { fetchData } from '../helper/FetchData';

const stylesFunc = makeStyles((theme) => ({
	wrapper: {
		paddingTop: '5rem',
		height: 'calc(100vh - 9.0625rem)',
		textAlign: 'center',
		overflow : 'auto',
		backgroundColor : '#bdbdbd',
	},
	avatar: {
		margin: '1rem auto',
		backgroundColor: theme.palette.secondary.main,
	},
}));

function Main() {
	const [userList, setUserList] = useState();
	const mainStyles = stylesFunc();
	const { REACT_APP_API_BASE_URL, REACT_APP_API_TOKEN } = process.env;


	useEffect(() => {
		fetchData('/user').then((response) => setUserList(response.data));
	}, []);

	return (
		<Container className={mainStyles.wrapper}>
			<Grid container spacing={1}>
				{userList?.map((user) => {
					return (
						<Grid item sm={3} xs={6} key={user?.id}>
							<MediaCard
								id={user.id}
								userImage={user?.picture}
								userName={`${capitalize(user?.title)} ${
									user?.firstName
								} ${user?.lastName}`}
								userEmail={user?.email}
							/>
						</Grid>
					);
				})}
			</Grid>
		</Container>
	);
}

export default Main;
