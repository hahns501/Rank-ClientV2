import React, {useState,useEffect} from 'react';
import CreateRubric from "../admin/CreateRubric";
import {Button} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

const Rubric = () => {

    const defQuestion = {
        question: '',
        description: '',
    }

    const defSlide = [0,10]
    const [inputQuestion, setInputQuestion] = useState(defQuestion);
    const [slideValue, setSlideValue] = useState(defSlide);
    const [allQuestions, setAllQuestions] = useState([])

    const [showAdd, setShowAdd] = useState(false);

    useEffect(()=>{
        console.log(allQuestions)
    },[allQuestions])


    const handleAdd = () =>{
        console.log(showAdd)
        setShowAdd(!showAdd)
    }

    const handleSubmit = () => {
        console.log(allQuestions);
    }


    return(
        <div>
            <h1>Rubric</h1>
            <Button variant={"contained"} onClick={handleAdd} startIcon={<AddIcon/>}>Add</Button>
            {showAdd
            ?<CreateRubric
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

export default Rubric