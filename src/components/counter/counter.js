import React, { useState } from 'react';

import Button from '@mui/material/Button';
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useSelector, useDispatch } from 'react-redux';

import {
    decrement,
    increment,
    incrementByAmount,
    incrementAsync,
    selectCount
} from './counterSlice';

export const Counter = () => {
    const count = useSelector(selectCount);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState('2');

    return (
        <div className={"counter"}>
            <h1>Counter: {count}</h1>
            <IconButton size={'large'} aria-label={"add"} onClick={() => dispatch(increment())}>
                <AddIcon fontSize="inherit"/>
            </IconButton>
            <IconButton size={'large'} aria-label={"subtract"} onClick={() => dispatch(decrement())}>
                <RemoveIcon fontSize="inherit" />
            </IconButton>

        </div>
    )
}