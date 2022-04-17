import React from 'react';
import { TextField, Slider, Button} from "@mui/material";
import './CreateRubricQuestion.css'


const CreateRubricQuestion = ({inputQuestion, setInputQuestion, slideValue, setSlideValue,setAllQuestions, allQuestions}) => {

    const handleSlideChange = (event, newValue) => {
        setSlideValue(newValue)
    }

    const onSubmit = () =>{
        const updateQuestions = [
            ...allQuestions,
            {
                question: inputQuestion.question,
                description: inputQuestion.description,
                min: slideValue[0],
                max: slideValue[1]
            }
        ]
        setAllQuestions(updateQuestions)
    }

    return (
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
            />
            <Button variant={'contained'} onClick={onSubmit}>Submit</Button>
            {/*{allQuestions.map((val) => {*/}
            {/*    return(*/}
            {/*        <div key={val.question}>*/}
            {/*            Question: {val.question}*/}
            {/*            Description: {val.description}*/}
            {/*        </div>*/}
            {/*    )*/}
            {/*})}*/}
        </div>
    )
}

export default CreateRubricQuestion