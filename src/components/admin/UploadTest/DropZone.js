import React, { Component } from "react";
import { DropzoneArea } from "mui-file-dropzone";

class DropZone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
        };
    }
    handleChange(files) {
        this.setState({
            files: files,
        });
    }
    render() {
        return <DropzoneArea onChange={this.handleChange.bind(this)} />;
    }
}

export default DropZone;