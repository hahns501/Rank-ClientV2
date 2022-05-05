import React, {useState,useEffect} from 'react';
import { TextField, Button} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

import * as api from '../../../api/Api'
import CreateRubricTable from "./CreateRubricTable/CreateRubricTable";
import './CreateRubric.css'

const CreateRubric = () => {

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

    const [open, setOpen] = useState(true);
    const [open2, setOpen2] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (rubric_title === ''){
            alert("Add a rubric title");

            return
        }

        let rub = {
            rubric_title: rubric_title,
            questions: allQuestions,
        }

        try{
            let {status} = await api.createRubric(rub);
            setOpen2(true);
        }catch(err){
            alert('Server Error');
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const ServerResDialog = () =>{
        return(
            <Dialog
                open={open2}
                onClose={handleClose2}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Success"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Rubric successfully submitted
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{navigate('/admin/rubric')}} autoFocus>
                        Continue
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

    return(
        <div className={'CreateRubric'}>
            <ServerResDialog/>
            <Dialog open={open} onClose={handleClose} maxWidth={'md'}>
                <DialogTitle>Title Creation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter a title for the rubric.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="rubric_title"
                        label="Rubric Title"
                        fullWidth
                        variant="standard"
                        value={rubric_title}
                        onChange={(e)=>{setRubric_title(e.target.value)}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>{navigate(-1)}}>Cancel</Button>
                    <Button onClick={handleClose}>Submit</Button>
                </DialogActions>
            </Dialog>
            <div className={'CreateRubricTitle'}>
                <h1>Create Rubric</h1>
                <Button
                    variant={'contained'}
                    onClick={handleSubmit}
                    sx={{minWidth:'10em'}}
                >
                    Submit
                </Button>
            </div>
            <div className={'CreateRubricTable'}>
                <CreateRubricTable
                    inputQuestion={inputQuestion}
                    setInputQuestion={setInputQuestion}
                    slideValue={slideValue}
                    setSlideValue={setSlideValue}
                    setAllQuestions={setAllQuestions}
                    allQuestions={allQuestions}
                    rubric_title={rubric_title}
                />
            </div>
        </div>

    )
}

export default CreateRubric