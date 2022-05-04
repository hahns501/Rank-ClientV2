import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Slider from '@mui/material/Slider';
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";


import './Rank.css'

export default function Rank({steps}) {
    const theme = useTheme();
    let defaultVal = 5;
    const [activeStep, setActiveStep] = useState(0);
    const [slideValue, setSlideValue] = useState(defaultVal);
    const maxSteps = steps.length;
    const [numSel, setNumSel] = useState(null);

    useEffect(() => {
        // console.log(steps);
        console.log(activeStep);
        setNumSel(steps[activeStep].answer);
    },[activeStep])

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        // setNumSel(null);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        // setNumSel(null);
    };

    const range = (size, startAt = 0) => {
        return [...Array(size).keys()].map((i) => i + startAt)
    }

    const handleSel = (event, newSel) => {
        setNumSel(newSel);
        steps[activeStep].answer = newSel;
        if(activeStep !== maxSteps - 1){
            handleNext();
        }
    };

    const handleChange = (e, newValue) => {
        setSlideValue(newValue);
    }

    return (
        <div className={'ranker'}>
            <div className={'question'}>
                {steps[activeStep].question}
            </div>
            <div className={'rankerSlider'}>
                {/*<Slider*/}
                {/*    aria-label="Temperature"*/}
                {/*    defaultValue={5}*/}
                {/*    step={1}*/}
                {/*    marks*/}
                {/*    min={steps[activeStep].min}*/}
                {/*    max={steps[activeStep].max}*/}
                {/*    valueLabelDisplay="on"*/}
                {/*    value={slideValue}*/}
                {/*    onChange={handleChange}*/}
                {/*/>*/}
                <ToggleButtonGroup
                    color={"primary"}
                    value={numSel}
                    exclusive
                    onChange={handleSel}
                    aria-label="text alignment"
                    fullWidth={true}
                    sx={{bgcolor:'white', mb:'20px' }}
                >
                    {range(steps[activeStep].max+1,steps[activeStep].min).map((v) => {
                        return (
                            <ToggleButton value={v} aria-label="left aligned">
                                {v}
                            </ToggleButton>
                        );
                    })}
                </ToggleButtonGroup>
            </div>
            <div className={'rankerStepper'}>
                <Box>
                    <MobileStepper
                        variant="text"
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        sx={{borderRadius: '10px', bgcolor:'white' }}
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
            </div>
        </div>
    );
}