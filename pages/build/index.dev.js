import * as React from 'react';
import { useState } from 'react';

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
import Slide from '@mui/material/Slide';

import data from '../../pages/api/data.js';
import {
	validateItem,
	validateResumeStructure,
} from '../../utils/resumeDataHelper';

import EducationList from '@/components/build/educationList.js';
import WorkHistoryList from '@/components/build/workHistoryList';
import CertificationList from '@/components/build/certificationList.js';
import HobbyList from '@/components/build/hobbyList.js';
import SkillList from '@/components/build/skillList.js';
import SubmitItem from '@/components/build/submitItem.js';
import ValidationDialog from '@/components/build/validationDialog.js';

const StyledBox = styled(Box)(({ theme }) => ({
	...theme.typography.body2,
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'flex-start',
	alignSelf: 'space-around',
}));

const contactItems = [
	'name',
	'email',
	'phone',
	'githubUrl',
	'linkedInUrl',
	'genericUrl',
];

const Build = () => {
	const [resumeData, setResumeData] = useState(data);
	const [certsOpen, setCertsOpen] = useState(
		resumeData.certifications.length > 0 ? true : false
	);
	const [workItemOpen, setWorkItemOpen] = useState(false);
	const [educationItemOpen, setEducationItemOpen] = useState(false);
	const [certItemOpen, setCertItemOpen] = useState(false);
	const [hobbyItemOpen, setHobbyItemOpen] = useState(false);
	const [skillItemOpen, setSkillItemOpen] = useState(false);
	const [submitItemOpen, setSubmitItemOpen] = useState(false);
	const [isValid, setIsValid] = useState(true);
	const [isResumeValid, setIsResumeValid] = useState(true);

	const dialogTransition = React.forwardRef(function Transition(props, ref) {
		return <Slide direction='up' ref={ref} {...props} />;
	});

	const certificationMessage =
		'You have selected not to include certifications, but there are certifications listed.  Would you like to delete them?';

	const validationFailedMessage =
		'The following sections require at least one entry: Education, Hobbies, Skills, Work History.  Additionally, the "name" property is required under the Basic Info section.';

	const handleContactUpdate = (event) => {
		let contactData = {
			...resumeData.contact,
			[event.target.id]: event.target.value,
		};
		setResumeData({ ...resumeData, contact: contactData });
		console.log({ resumeData });
	};

	const handleEducationUpdate = (education) => {
		setResumeData({ ...resumeData, education: education });
	};

	const handleCertificationsUpdate = (certifications) => {
		setResumeData({ ...resumeData, certifications: certifications });
	};

	const handleHobbiesUpdate = (hobbies) => {
		setResumeData({ ...resumeData, hobbies: hobbies });
	};

	const handleSkillsUpdate = (skills) => {
		setResumeData({ ...resumeData, skills: skills });
	};

	const handleWorkHistoryUpdate = (workHistory) => {
		setResumeData({ ...resumeData, workHistory: workHistory });
	};

	const handleValidate = () => {
		var itemIsValid = validateItem(resumeData.contact, ['name']);
		setIsValid(itemIsValid);
		if (itemIsValid) {
			handleValidateResume();
		}
	};

	const handleValidateResume = () => {
		var resumeIsValid = validateResumeStructure(resumeData);
		setIsResumeValid(resumeIsValid);
		if (resumeIsValid) {
			handleSubmit();
		}
	};

    const removeCertifications = () => {
        setResumeData({ ...resumeData, certifications: [] });
        setCertsOpen(false);
    }

	const handleSubmit = () => {
		if (certsOpen == false && resumeData.certifications.length > 0) {
			setResumeData({ ...resumeData, certifications: [] });
		}
		setSubmitItemOpen(true);
	};

	return (
		<main>
			<Paper sx={{ width: '100%', textAlign: 'left' }}>
				<Typography variant='h1' sx={{ textAlign: 'center' }}>
					Resume Data Builder
				</Typography>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Typography variant='h3' ml={5} mb={1} mt={1}>
							Basic Info
						</Typography>
						<StyledBox>
							{contactItems.map((contactItem, index) => (
								<div key={index}>
									<TextField
										key={index}
										required={contactItem == 'name'}
										error={contactItem == 'name' && !isValid}
										id={contactItem}
										label={contactItem}
										defaultValue={resumeData.contact[contactItem]}
										onChange={handleContactUpdate}
										sx={{ ml: 5, mt: 2, width: '36rem' }}
									/>
								</div>
							))}
						</StyledBox>
					</Grid>
					<Grid item xs={12}>
						<EducationList
							education={resumeData.education}
							open={educationItemOpen}
							setOpen={setEducationItemOpen}
							transition={dialogTransition}
							handleUpdate={handleEducationUpdate}
						/>
						<FormGroup sx={{ ml: 5 }}>
							<FormControlLabel
								control={<Switch checked={certsOpen} color='secondary' />}
								label='Add Certifications'
								onChange={() => setCertsOpen(!certsOpen)}
							/>
						</FormGroup>
						{certsOpen && <CertificationList
							certifications={resumeData.certifications}
							open={certItemOpen}
							setOpen={setCertItemOpen}
							transition={dialogTransition}
							handleUpdate={handleCertificationsUpdate}
						/>}
					</Grid>
					<Grid item xs={12}>
						<HobbyList
							hobbies={resumeData.hobbies}
							open={hobbyItemOpen}
							setOpen={setHobbyItemOpen}
							transition={dialogTransition}
							handleUpdate={handleHobbiesUpdate}
						/>
					</Grid>
					<Grid item xs={12}>
						<SkillList
							skills={resumeData.skills}
							open={skillItemOpen}
							setOpen={setSkillItemOpen}
							transition={dialogTransition}
							handleUpdate={handleSkillsUpdate}
						/>
					</Grid>
					<Grid item xs={12}>
						<WorkHistoryList
							workHistory={resumeData.workHistory}
							open={workItemOpen}
							setOpen={setWorkItemOpen}
							transition={dialogTransition}
							handleUpdate={handleWorkHistoryUpdate}
						/>
					</Grid>
					<Grid item>
						<ValidationDialog
							message={certificationMessage}
                            open={!certsOpen && resumeData.certifications.length > 0}
                            setOpen={removeCertifications}
                            setCertsOpen={setCertsOpen}
                            valiation='item'
						/>
                        <ValidationDialog
							message={validationFailedMessage}
                            open={!isResumeValid || !isValid}
                            setOpen={removeCertifications}
                            setFormValidation={setIsResumeValid}
                            validation='form'
						/>
						<SubmitItem
							resumeData={resumeData}
							open={submitItemOpen}
							setOpen={setSubmitItemOpen}
						/>
						<Button sx={{ mt: 1, mb: 1, ml: 5 }} onClick={handleValidate}>
							Generate Resume Data
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</main>
	);
};

export default Build;
