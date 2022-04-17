import React, {useEffect, useState} from 'react';
import {Button, IconButton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import * as api from '../../api/Api'
import Stack from '@mui/material/Stack';

import CreateRubric from './CreateRubric/CreateRubric';
import RubricChart from "./RubricChart/RubricChart";

const Rubric = () => {
    const [rubrics, setRubrics] = useState([]);
    const [showAdd, setShowAdd] = useState(false);

    useEffect(async()=>{
        let {data} = await api.getRubrics();
        setRubrics(Object.values(data));
    },[])

    const updateRubric = async () => {
        let {data} = await api.getRubrics();
        console.log('Update Rubric Function');

        setRubrics(Object.values(data));
    }

    const handleAdd = () => {
        setShowAdd(!showAdd);
    }

    const Rubric = () => {
        return (
            <div>
                <Stack direction="row" spacing={0} p={0}>
                    <h1>Rubrics</h1>
                    <IconButton aria-label="add" onClick={handleAdd} size={"large"} sx={{ minHeight: 0, minWidth: 0, padding: 0 }}>
                        <AddIcon fontSize={"inherit"}/>
                    </IconButton>
                </Stack>

                <RubricChart updateFunc={updateRubric} rows={rubrics}/>
            </div>
        )
    }

    return (
        <div>
            {showAdd ? <CreateRubric handleAdd2={handleAdd} /> : <Rubric/>}
        </div>
    )
}

export default Rubric;