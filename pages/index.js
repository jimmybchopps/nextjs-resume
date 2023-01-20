import Head from 'next/head';
import styles from '@/styles/Home.module.css';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import Header from '../components/header';
import Education from '../components/education';
import Skills from '../components/skills';
import Hobbies from '../components/hobbies';

import data from '../pages/api/data';

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: 'left',
	color: theme.palette.text.secondary,
}));

export default function Home() {
	return (
		<>
			<Head>
				<title>{data.contact.name}</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<main className={styles.main}>
				<Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={2}>
						<Header contactInfo={data.contact} />
						<Grid item container xs={12} md={3}>
							<Grid item xs={12}>
								<Item>
									<Education
										education={data.education}
										certs={data.certifications}
									/>
								</Item>
							</Grid>
							<Grid item xs={12}>
								<Item>
									<Skills skills={data.skills} />
								</Item>
							</Grid>
							<Grid item xs={12}>
								<Item>
									<Hobbies hobbies={data.hobbies} />
								</Item>
							</Grid>
						</Grid>
						<Grid item container xs={12} md={9}>
							<Grid item xs={12}>
								<Item>Work History Graph Here (Center me!)</Item>
							</Grid>
						</Grid>
					</Grid>
				</Box>
			</main>
		</>
	);
}
