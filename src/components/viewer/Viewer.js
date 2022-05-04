import React, {useEffect, useState} from 'react';
import CornerstoneElement from './cornerstone/CornerstoneElement';
import Box from '@mui/material/Box';

import './Viewer.css'

const Viewer = ({imageData}) => {
    const [imageID, setImageID] = useState(null);

    useEffect(()=>{
        // Check if imageData is array depending on where its a series or not
        if(Array.isArray(imageData)){
            setImageID(imageData);
        }else{
            setImageID([imageData])
        }
    },[imageData])

    const stack = {
        imageIds: imageID,
        currentImageIdIndex: 0
    };

    return (
            <div className={'Viewer'}>
                {imageID ? <CornerstoneElement stack={{...stack}}/> : ''}
            </div>
    )
}

export default Viewer