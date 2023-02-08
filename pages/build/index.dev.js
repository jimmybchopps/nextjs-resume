import { useState, useStateCallback } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

const StyledBox = styled(Box)(({ theme }) => ({
	...theme.typography.body2,
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'space-around',
	alignSelf: 'flex-start',
}));

const contactItems = [
	'name',
	'email',
	'phone',
	'githubUrl',
	'linkedInUrl',
	'genericUrl',
];

const educationItems = [
	'School Name',
	'School Url',
	'Degree',
	'Graduation Year',
];

const certificationItems = [
	'Certification Name',
	'Certification Url',
	'Date Achieved',
];

const hobbyIcons = [
	'bbq',
	'beer',
	'outdoor',
	'family',
	'music',
	'tech',
	'hiking',
	'music',
	'other',
];

const skillItems = ['Skill Name', 'Skill Details'];

const workHistoryItems = [
	'Company Name',
	'Company Link',
	'Start Date',
	'End Date',
	'Description',
	'Achievements',
];

const Build = () => {
    const [resumeData, setResumeData] = useState({contact: {}, education: [], certifications: [], hobbies: [], skills: [], workHistory: []})
	const [skillsOpen, setSkillsOpen] = useState(false);
	const [icon, setIcon] = useState('');

	const handleChange = (event) => {
		setIcon(event.target.value);
	};

    const handleContactUpdate = (event) => {
        let contactData = {...resumeData.contact, [event.target.id]: event.target.value}
        setResumeData({...resumeData, "contact": contactData})
        console.log({resumeData});
    }

    const handleSubmit = () => {
        console.log({resumeData});
    }

	return (
		<main>
			<Paper sx={{ width: '100%', textAlign: 'left' }}>
				<Typography variant='h1' sx={{ textAlign: 'center' }}>
					Resume Data Builder
				</Typography>
				<Grid container>
					<Grid container item xs={6} spacing={1}>
						<Grid item>
							<Typography variant='h3' ml={5} mb={1} mt={1}>
								Basic Info
							</Typography>
							<StyledBox>
								{contactItems.map((contactItem, index) => (
									<div key={index}>
										<TextField
											key={index}
											required={contactItem == 'name'}
											id={contactItem}
											label={contactItem}
											defaultValue={resumeData.contact[contactItem]}
                                            onChange={handleContactUpdate}
										/>
									</div>
								))}
							</StyledBox>
						</Grid>
						<Grid item>
							<Typography variant='h3' ml={5} mb={1} mt={1}>
								Education
							</Typography>
							<StyledBox>
								{educationItems.map((educationItem, index) => (
									<div key={index}>
										<TextField
											key={index}
											required={true}
											id={educationItem}
											label={educationItem}
											defaultValue=''
										/>
									</div>
								))}
							</StyledBox>
							<FormGroup>
								<FormControlLabel
									control={<Switch defaultChecked color='secondary' />}
									label='Add Certifications'
								/>
								<Typography variant='h3' ml={5} mb={1} mt={1}>
									Certifications
								</Typography>
								<StyledBox>
									{certificationItems.map((certificationItem, index) => (
										<div key={index}>
											<TextField
												key={index}
												required={true}
												id={certificationItem}
												label={certificationItem}
												defaultValue=''
											/>
										</div>
									))}
								</StyledBox>
							</FormGroup>
						</Grid>
						<Grid item></Grid>
						<Grid item>
							<Typography variant='h3' ml={5} mb={1} mt={1}>
								Hobbies
							</Typography>
							<StyledBox>
								<TextField
									required
									id='HobbyName'
									label='Hobby Name'
									defaultValue=''
								/>
								<FormControl>
									<InputLabel id='hobby-icon-select-label'>
										Hobby Icon
									</InputLabel>
									<Select
										labelId='hobby-icon-select-label'
										id='hobby-icon-select'
										value={icon}
										label='Icon'
										onChange={handleChange}
									>
										{hobbyIcons.map((hobbyIcon, index) => (
											<MenuItem key={index} value={hobbyIcon}>
												{hobbyIcon}
											</MenuItem>
										))}
									</Select>
								</FormControl>
							</StyledBox>
						</Grid>
					</Grid>
					<Grid container item xs={6}>
						<Grid item>
							<Typography variant='h3' ml={5} mb={1} mt={1}>
								Work History
							</Typography>
						</Grid>
						<Grid item>
							<Button mb={1} mt={1} onClick={handleSubmit}>
								Generate Resume Data
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</main>
	);
};

export default Build;
