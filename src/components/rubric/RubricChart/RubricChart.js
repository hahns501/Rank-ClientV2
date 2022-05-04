import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import {Button} from '@mui/material';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import * as api from '../../../api/Api'

const ITEM_HEIGHT = 48;

const Row = ({row, updateFunc}) => {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open2 =  Boolean(anchorEl);

    const handleClick = (event) => {

        setAnchorEl(event.currentTarget);
    };

    const handleClose = (e) => {
        let selVal = e.target.innerText

        if (selVal === 'Edit'){
            console.log(row.rubric_id)
        } else if(selVal === 'Delete'){
            console.log('Delete');
            deleteRubric(row.rubric_id);

        }

        setAnchorEl(null);
    };

    const deleteRubric = async (id) => {
        try{
            await api.deleteRubric(id)

            updateFunc();
        }catch(err){
            console.log(err);
        }
    }


    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.rubric_title}
                </TableCell>
                <TableCell align="right">{row.created_at.substring(0, row.created_at.indexOf('T'))}</TableCell>
                <TableCell align="right">
                    <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls={open ? 'long-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchorEl}
                        open={open2}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '15ch',
                            },
                        }}
                    >
                        <MenuItem onClick={handleClose}>
                            Edit
                        </MenuItem>
                        <MenuItem onClick={handleClose}>Delete</MenuItem>
                    </Menu>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Questions
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Question</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell align="right">min</TableCell>
                                        <TableCell align="right">max</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.questions.map((questionRow) => (
                                        <TableRow key={questionRow.question_id}>
                                            <TableCell component="th" scope="row">
                                                {questionRow.question}
                                            </TableCell>
                                            <TableCell>{questionRow.description}</TableCell>
                                            <TableCell align="right">{questionRow.min}</TableCell>
                                            <TableCell align="right">{questionRow.max}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const RubricChart = ({rows, updateFunc}) => {

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell width={'80%'}>Title</TableCell>
                        <TableCell width={'20%'} align="right">Created On</TableCell>
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.rubric_id} row={row} updateFunc={updateFunc}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default RubricChart;