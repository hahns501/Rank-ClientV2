import React, { useState, Component } from "react";
import { DropzoneArea } from "mui-file-dropzone";
import Button from '@mui/material/Button';

// class DropZone extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             files: [],
//         };
//     }
//     handleChange(files) {
//         this.setState({
//             files: files,
//         });
//     }
//
//     render() {
//         const handleDownload = () => {
//             console.log(this.state.files[0]);
//         }
//
//         return (
//             <div>
//                 <DropzoneArea onChange={this.handleChange.bind(this)} />
//                 <Button onClick={handleDownload} variant={'contained'}>Download</Button>
//             </div>
//         )
//         // return <DropzoneArea onChange={this.handleChange.bind(this)} />;
//     }
// }

const DropZone = ({setFiles}) => {
    const [files2, setFiles2] = useState(null);

    const handleChange = (filesUp) => {
        console.log(filesUp);
        setFiles2(filesUp);
        setFiles(filesUp);
    }

    return (
        <div>
            <DropzoneArea onChange={(files) => handleChange(files)}/>
        </div>
    )
}

export default DropZone;