import React, {useEffect, useState} from 'react';
import MaterialTable from "@material-table/core";
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import CreateRubricQuestion from "../CreateRubricQuestion";

const CreateRubricTable = ({inputQuestion, rubric_title, setInputQuestion, slideValue, setSlideValue,setAllQuestions, allQuestions}) => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);

    useEffect(()=>{
        setData(allQuestions);
    },[allQuestions])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [columns, setColumns] = useState([
        {title: 'Question', field: 'question', width:'50%'},
        {title: 'Description (optional)', field: 'description', width:'50%'},
        {title: 'Min', field: 'min'},
        {title: 'Max', field: 'max'}
    ])

    const defQuestion = {
        question: '',
        description: '',
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
        setAllQuestions(updateQuestions);
        setInputQuestion(defQuestion);
        setSlideValue([0,10]);
        handleClose();
    }

    return (
        <div className={'CreateRubricTable'}>
            <Dialog open={open} onClose={handleClose} maxWidth={'md'}>
                <DialogTitle>Create a question</DialogTitle>
                <DialogContent>
                    <CreateRubricQuestion
                        inputQuestion={inputQuestion}
                        setInputQuestion={setInputQuestion}
                        slideValue={slideValue}
                        setSlideValue={setSlideValue}
                        setAllQuestions={setAllQuestions}
                        allQuestions={allQuestions}
                        func={onSubmit}
                    />
                </DialogContent>
            </Dialog>
            <MaterialTable
                title={rubric_title}
                columns={columns}
                options={{
                    actionsColumnIndex: -1,
                    search: false,
                }}
                actions={[
                    {
                        icon: () => <AddIcon/>,
                        tooltip: "Add Row",
                        position: "toolbar",
                        onClick: () => {handleClickOpen()},
                    }
                ]}
                data={data}
                localization={{
                    header: {
                        actions: ""
                    }
                }}
                editable={{
                    onRowUpdate: (newData, oldData) =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataUpdate = [...data];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                setAllQuestions([...dataUpdate]);

                                resolve();
                            }, 1000)
                        }),
                    onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                            setTimeout(() => {
                                const dataDelete = [...data];
                                const index = oldData.tableData.id;
                                dataDelete.splice(index, 1);
                                setAllQuestions([...dataDelete]);

                                resolve()
                            }, 1000)
                        }),
                }}
            />
        </div>
    )
}

export default CreateRubricTable;