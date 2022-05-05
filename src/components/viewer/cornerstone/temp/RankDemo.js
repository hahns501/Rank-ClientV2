// import React from 'react'
//
// import './Rank.css'
//
// const Rank = () => {
//     return (
//         <div className={'rank'}>
//             <h2>How noisey is the image?</h2>
//         </div>
//     )
// }
//
// export default Rank

import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Slider from '@mui/material/Slider';

const steps = [
    {
        label: 'Question: 1',
        description: `How noisey is the image?`,
    },
    {
        label: 'Create an ad group',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'Create an ad',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
];

export default function Rank() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={{ maxWidth: 'inherit', minHeight: 'inherit'}}>
            {/*<Paper*/}
            {/*    square*/}
            {/*    elevation={0}*/}
            {/*    sx={{*/}
            {/*        display: 'flex',*/}
            {/*        alignItems: 'center',*/}
            {/*        height: 60,*/}
            {/*        pl: 2,*/}
            {/*        bgcolor: 'background.default',*/}
            {/*    }}*/}
            {/*>*/}
            {/*    <Typography>{steps[activeStep].label}</Typography>*/}
            {/*</Paper>*/}
            {/*<Box sx={{ height: 660, maxWidth: 400, width: '100%', p: 2, fontSize: 30}}>*/}
            {/*    {steps[activeStep].description}*/}
            {/*</Box>*/}
            {steps[activeStep].description}

            <Box sx={{ width: '80%', margin: 'auto', marginBottom: 3}}>
                <Slider
                    aria-label="Temperature"
                    defaultValue={5}
                    step={1}
                    marks
                    min={0}
                    max={10}
                    valueLabelDisplay="on"
                />
            </Box>

            <MobileStepper
                variant="text"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button
                        size="large"
                        onClick={handleNext}
                        disabled={activeStep === maxSteps - 1}
                    >
                        Next
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowLeft />
                        ) : (
                            <KeyboardArrowRight />
                        )}
                    </Button>
                }
                backButton={
                    <Button size="large" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? (
                            <KeyboardArrowRight />
                        ) : (
                            <KeyboardArrowLeft />
                        )}
                        Back
                    </Button>
                }
            />
        </Box>
    );
}