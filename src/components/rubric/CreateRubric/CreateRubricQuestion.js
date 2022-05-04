import React, {useState} from 'react';
import { TextField, Slider, Button} from "@mui/material";
import './CreateRubricQuestion.css'
import Box from '@mui/material/Box';

const CreateRubricQuestion = ({inputQuestion, setInputQuestion, slideValue, setSlideValue,setAllQuestions, allQuestions, func}) => {
    const handleSlideChange = (event, newValue) => {
        setSlideValue(newValue)
    }

    const defQuestion = {
        question: '',
        description: '',
    }

    return (
        <Box>
            <div className={'rubric'}>
                <TextField
                    id="question"
                    fullWidth
                    label="Question"
                    variant="outlined"
                    onChange={(e)=>{setInputQuestion({...inputQuestion, question: e.target.value})}}
                    value={inputQuestion.question}
                />
                <TextField
                    id="question-description"
                    label="Description"
                    value={inputQuestion.description}
                    onChange={(e)=>{setInputQuestion({...inputQuestion, description: e.target.value})}}
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Add a Description"
                />
                <Slider
                    value={slideValue}
                    onChange={handleSlideChange}
                    valueLabelDisplay={"auto"}
                    min={0}
                    max={10}
                    marks={[{value:0,label:'0'},{value:10, label:"10"}]}
                    steps={1}
                    sx={{width:'90%', mx:'auto'}}
                />
                <Button
                    variant={'contained'}
                    onClick={func}
                    sx={{width:'40%', mx:'auto'}}
                >
                    Submit
                </Button>
            </div>
        </Box>

        // <Box sx={{boxShadow: 1}}>
        //
        // </Box>

        // <div className={'rubric'}>
        //     <Box sx={{boxShadow: 1}}>
        //         <TextField
        //             id="question"
        //             fullWidth
        //             label="Question"
        //             variant="outlined"
        //             onChange={(e)=>{setInputQuestion({...inputQuestion, question: e.target.value})}}
        //             value={inputQuestion.question}
        //         />
        //         <TextField
        //             id="question-description"
        //             label="Description"
        //             value={inputQuestion.description}
        //             onChange={(e)=>{setInputQuestion({...inputQuestion, description: e.target.value})}}
        //             fullWidth
        //             multiline
        //             rows={4}
        //             placeholder="Add a Description"
        //         />
        //         <Slider
        //             value={slideValue}
        //             onChange={handleSlideChange}
        //             valueLabelDisplay={"auto"}
        //             min={0}
        //             max={10}
        //             marks={[{value:0,label:'0'},{value:10, label:"10"}]}
        //             steps={1}
        //         />
        //         <Button variant={'contained'} onClick={onSubmit}>Submit</Button>
        //     </Box>
        // </div>s
    )
}

export default CreateRubricQuestion