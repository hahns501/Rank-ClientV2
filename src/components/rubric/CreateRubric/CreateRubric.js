import React, {useState,useEffect} from 'react';
import CreateRubricQuestion from "./CreateRubricQuestion";
import { TextField, Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Stack from '@mui/material/Stack';

import * as api from '../../../api/Api'

import './CreateRubric.css'

const CreateRubric = ({handleAdd2}) => {

    const defQuestion = {
        question: '',
        description: '',
    }

    const rubricTemp = {
        rubric_title: '',
        questions: [{
            question: '',
            description: '',
        }]
    }

    const defSlide = [0,10]
    const [inputQuestion, setInputQuestion] = useState(defQuestion);
    const [slideValue, setSlideValue] = useState(defSlide);
    const [allQuestions, setAllQuestions] = useState([]);
    const [rubric_title, setRubric_title] = useState('');

    // const [rubric, setRubric] = useState()

    const [showAdd, setShowAdd] = useState(false);

    useEffect(()=>{
        console.log(allQuestions)
    },[allQuestions])

    const handleAdd = () =>{
        console.log(showAdd)
        setShowAdd(!showAdd)
    }

    const handleSubmit = async () => {
        if (rubric_title === ''){
            alert("Add a rubric title");

            return
        }

        let rub = {
            rubric_title: rubric_title,
            questions: allQuestions,
        }

        console.log(rub);

        let temp = await api.createRubric(rub);
        console.log(temp);
    }


    return(
        <div>
            <Button variant={'contained'} onClick={handleAdd2}>Back</Button>
            <h1>Create Rubric</h1>
            <Stack>
                <TextField
                    id={"rubric_title"}
                    label={"Rubric Title"}
                    variant={"outlined"}
                    value = {rubric_title}
                    onChange={(e)=>{setRubric_title(e.target.value)}}
                />
                <Button sx={{ maxWidth:100 }} variant={"contained"} onClick={handleAdd} startIcon={<AddIcon/>}>Add</Button>
            </Stack>
            {showAdd
                ?<CreateRubricQuestion
                    inputQuestion={inputQuestion}
                    setInputQuestion={setInputQuestion}
                    slideValue={slideValue}
                    setSlideValue={setSlideValue}
                    setAllQuestions={setAllQuestions}
                    allQuestions={allQuestions}
                />
                : ""
            }
            <h1>Questions</h1>
            <table>
                <thead>
                <tr>
                    <th>Number</th>
                    <th>Question</th>
                    <th>Scale</th>
                </tr>
                </thead>
                <tbody>
                {allQuestions.map((val,key) =>{
                    return(
                        <tr>
                            <th>1</th>
                            <th>{val.question}</th>
                            <th>{val.min}-{val.max}</th>
                        </tr>
                    )
                })}

                </tbody>
            </table>
            <Button variant={'contained'} onClick={handleSubmit}>Submit</Button>
        </div>
    )
}

export default CreateRubric