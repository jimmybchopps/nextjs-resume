import { useState } from 'react';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import WorkIcon from '@mui/icons-material/Work';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

import WorkAdditionalInfo from './workAdditional';

const WorkHistoryMobile = (props) => {
	const [activeStep, setActiveStep] = useState(0);
	const [open, setOpen] = useState(false);
	const [currentJob, setCurrentJob] = useState('');

	const jobs = props.jobs;

	const handleReset = () => {
		setActiveStep(0);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleNext = () => {
		if (activeStep != jobs.length - 1) {
			setActiveStep((prevActiveStep) => prevActiveStep + 1);
		} else {
			console.log(activeStep);
			console.log(jobs.length);
			handleReset();
		}
	};

	const handleOpen = (jobId) => {
		console.log({ jobId });
		setCurrentJob(
			jobs.find((job) => {
				return jobId === job.id;
			})
		);
		setOpen(true);
	};

	const renderIcon = (endDate) => {
		return endDate ? <WorkHistoryIcon /> : <WorkIcon />;
	};

	return (
		<Box sx={{ maxWidth: 1500 }}>
			<Stepper activeStep={activeStep} orientation='vertical'>
				{jobs.map((job, index) => (
					<Step key={job.id}>
						<StepLabel StepIconComponent={() => renderIcon(job.endDate)}>
							<Typography variant='h6' component='span'>
								<a href={job.companyLink}>{job.company}</a>: {job.jobTitle}
							</Typography>
							<Typography>
								{job.startDate} - {job.endDate || 'Present'}
							</Typography>
						</StepLabel>
						<StepContent>
							<Typography>{job.jobDescription}</Typography>
							<Box sx={{ mb: 2 }}>
								<div>
									<Button
										variant='contained'
										onClick={handleNext}
										sx={{ mt: 1, mr: 1 }}
									>
										{index === jobs.length - 1
											? 'Return to Current Position'
											: 'View Next'}
									</Button>
									<Button
										disabled={index === 0}
										onClick={handleBack}
										sx={{ mt: 1, mr: 1 }}
									>
										View Previous
									</Button>
									{job.additionalInfo && (
										<>
											<Button
												variant='contained'
												sx={{ mt: 1, mr: 1 }}
												onClick={() => handleOpen(job.id)}
											>
												...Click to see more!
											</Button>
											<WorkAdditionalInfo
												open={open}
												job={currentJob}
												setOpen={setOpen}
												transition={props.transition}
											/>
										</>
									)}
								</div>
							</Box>
						</StepContent>
					</Step>
				))}
			</Stepper>
		</Box>
	);
};

export default WorkHistoryMobile;
