import React from "react";
import * as cornerstone from "cornerstone-core";
import * as cornerstoneMath from "cornerstone-math";
import * as cornerstoneTools from "cornerstone-tools";
import Hammer from "hammerjs";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";


// Tool Bar imports
import ContrastIcon from '@mui/icons-material/Contrast';
import PanToolIcon from '@mui/icons-material/PanTool';
import SearchIcon from '@mui/icons-material/Search';
import StraightenIcon from '@mui/icons-material/Straighten';
import BrushIcon from '@mui/icons-material/Brush';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import './CornerstoneElement.css'

cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneTools.init({
    showSVGCursors: true,
});

cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneWADOImageLoader.webWorkerManager.initialize({
    maxWebWorkers: navigator.hardwareConcurrency || 1,
    startWebWorkersOnDemand: true,
    taskConfiguration: {
        decodeTask: {
            initializeCodecsOnStartup: false,
            usePDFJS: false,
            strict: false,
        },
    },
});

const divStyle = {
    position: "relative",
    color: "white",
    flex: "1",
    borderRadius: '8px',
    backgroundColor:'black',
};

const bottomLeftStyle = {
    bottom: "5px",
    left: "5px",
    position: "absolute",
    color: "white"
};

const bottomRightStyle = {
    bottom: "5px",
    right: "5px",
    position: "absolute",
    color: "white"
};

class CornerstoneElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stack: props.stack,
            viewport: cornerstone.getDefaultViewport(null, undefined),
            imageId: props.stack.imageIds[0],
            toolSel: null,
            key: null,
        };

        this.onImageRendered = this.onImageRendered.bind(this);
        this.onNewImage = this.onNewImage.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
        this.onKeyPressed = this.onKeyPressed.bind(this);
        this.onKeyReleased = this.onKeyReleased.bind(this);
    }

    render() {
        const handleToolSel = (event, newToolSel) => {
            if (newToolSel === 'Reset'){
                this.setState({
                    toolSel: null
                })

                cornerstone.reset(this.element);
            }else{
                this.setState({
                    toolSel: newToolSel
                })

                cornerstoneTools.setToolActive(newToolSel, { mouseButtonMask: 1 });
            }

        }

        return (
            <div className={'corner'}>
                <div className={'Toolbar'}>
                    <ToggleButtonGroup
                        value={this.state.toolSel}
                        exclusive
                        onChange={handleToolSel}
                        color = {'primary'}
                    >
                        <ToggleButton value="Pan">
                            <PanToolIcon />
                        </ToggleButton>
                        <ToggleButton value="Zoom">
                            <SearchIcon/>
                        </ToggleButton>
                        <ToggleButton value="Wwwc">
                            <ContrastIcon/>
                        </ToggleButton>
                        <ToggleButton value="Length">
                            <StraightenIcon/>
                        </ToggleButton>
                        <ToggleButton value="Brush">
                            <BrushIcon/>
                        </ToggleButton>
                        <ToggleButton value="Reset">
                            <RestartAltIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div
                    className="viewportElement"
                    style={divStyle}
                    ref={input => {
                        this.element = input;
                    }}
                >
                    {/*<canvas className="cornerstone-canvas" />*/}
                    <div style={bottomLeftStyle}>Index: {`(${this.state.stack.currentImageIdIndex+1}/${this.state.stack.imageIds.length})`}</div>
                    <div style={bottomRightStyle}>
                        WW/WC: {this.state.viewport.voi.windowWidth} /{" "}
                        {this.state.viewport.voi.windowCenter}
                    </div>
                </div>
            </div>
        );
    }

    onKeyPressed = (e) => {
        if(e.repeat){
            // console.log(`${e.key} being held down`);
        }else{
            // console.log(`${e.key} pressed`)

        }
    }

    onKeyReleased = (e) => {
        console.log(`${e.key} released`)
    }

    onWindowResize() {
        console.log("onWindowResize");
        cornerstone.resize(this.element);
    }

    onImageRendered() {
        const viewport = cornerstone.getViewport(this.element);
        // console.log(viewport);

        this.setState({
            viewport
        });

        // console.log(this.state.viewport);
    }

    onNewImage() {
        console.log("onNewImage");
        const enabledElement = cornerstone.getEnabledElement(this.element);

        this.setState({
            imageId: enabledElement.image.imageId
        });
    }

    componentDidMount() {
        const element = this.element;

        // Enable the DOM Element for use with Cornerstone
        cornerstone.enable(element);

        // Tools
        // Add our tool, and set it's mode
        const PanTool = cornerstoneTools.PanTool;
        const StackScrollMouseWheelTool = cornerstoneTools.StackScrollMouseWheelTool
        const ZoomTool = cornerstoneTools.ZoomTool;
        const WwwcTool = cornerstoneTools.WwwcTool;
        const LengthTool = cornerstoneTools.LengthTool;
        const BrushTool = cornerstoneTools.BrushTool;

        // Load the first image in the stack
        cornerstone.loadImage(this.state.imageId).then(image => {
            const stack = this.props.stack;
            // Display the first image
            cornerstone.displayImage(element, image);

            cornerstoneTools.addStackStateManager(element, ['stack']);
            cornerstoneTools.addToolState(element, 'stack', stack);

            element.addEventListener(
                "cornerstoneimagerendered",
                this.onImageRendered
            );

            window.addEventListener('keydown', this.onKeyPressed);
            window.addEventListener('keyup', this.onKeyReleased);

            element.addEventListener("cornerstonenewimage", this.onNewImage);
            window.addEventListener("resize", this.onWindowResize);
        });

        cornerstoneTools.addTool(PanTool)
        cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 4 })

        cornerstoneTools.addTool(StackScrollMouseWheelTool)
        cornerstoneTools.setToolActive('StackScrollMouseWheel', { })

        cornerstoneTools.addTool(cornerstoneTools.ZoomTool, {
            // Optional configuration
            configuration: {
                invert: false,
                preventZoomOutsideImage: false,
                minScale: .1,
                maxScale: 20.0,
            }
        });

        cornerstoneTools.setToolActive('Zoom', { mouseButtonMask: 1 })

        cornerstoneTools.addTool(WwwcTool)
        cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 })

        cornerstoneTools.addTool(LengthTool)

        cornerstoneTools.addTool(BrushTool);
    }

    componentWillUnmount() {
        const element = this.element;
        element.removeEventListener(
            "cornerstoneimagerendered",
            this.onImageRendered
        );

        element.removeEventListener("cornerstonenewimage", this.onNewImage);
        window.removeEventListener("resize", this.onWindowResize);
        window.removeEventListener("keydown", this.onKeyPressed);
        window.removeEventListener('keyup', this.onKeyReleased);

        cornerstone.disable(element);
    }

    componentDidUpdate(prevProps, prevState) {
        // console.log('componentDidUpdate');
        // const stackData = cornerstoneTools.getToolState(this.element, "stack");
        // const stack = stackData.data[0];
        // stack.currentImageIdIndex = this.state.stack.currentImageIdIndex;
        // stack.imageIds = this.state.stack.imageIds;
        // cornerstoneTools.addToolState(this.element, "stack", stack);
        //
        // const imageId = stack.imageIds[stack.currentImageIdIndex];
        // cornerstoneTools.scrollToIndex(this.element, stack.currentImageIdIndex);
    }
}

export default CornerstoneElement;



