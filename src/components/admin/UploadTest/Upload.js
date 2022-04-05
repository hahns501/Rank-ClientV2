import React from 'react';
import Button from '@mui/material/Button';

import DropZone from "./DropZone";

const Upload = () => {
    return (
        <div>
            <h1>Upload</h1>
            <DropZone/>
            <Button
                variant="contained"
                component="label"
            >
                Upload File
                <input
                    type="file"
                    hidden
                />
            </Button>
        </div>
    )
}

export default Upload;