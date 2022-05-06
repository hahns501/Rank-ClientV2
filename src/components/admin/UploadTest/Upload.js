import React, {useState} from 'react';
import Button from '@mui/material/Button';
import * as api from '../../../api/Api'
import DropZone from "./DropZone";

const Upload = () => {
    const [files, setFiles] = useState(null);

    const handleUpload = async () => {
        let file = {
            "file_name":"UploadTest2",
            "files": files,
        }

        console.log(files);
        try{
            let {data} = await api.uploadImages(file);

            let temp = await uploadS3(data);
            console.log(temp);
        }catch(err){
            console.log(err);
        }

    }

    const uploadS3 = async(uploadUrl) =>{
        return fetch(uploadUrl, {
            method: "PUT",
            body: files,
            headers: {
                "Content-Type": "dicom",
                "ACL": "public-read"
            }
        });
    }

    return (
        <div>
            <h1>Upload</h1>
            <DropZone setFiles={setFiles}/>
            {/*<DropzoneArea onChange={handleChange}/>*/}
            <Button
                variant="contained"
                component="label"
                onClick={handleUpload}
            >
                Upload Test
            </Button>
        </div>
    )
}

export default Upload;