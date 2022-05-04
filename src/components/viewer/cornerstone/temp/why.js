import React from 'react';
import * as cornerstoneTools from "cornerstone-tools";
import * as cornerstone from "cornerstone-core";
import Hammer from "hammerjs";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import cornerstoneMath from 'cornerstone-math';
import dicomParser from "dicom-parser";

const divStyle = {
    width: "512px",
    height: "512px",
    position: "relative",
    color: "white"
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

// Cornerstone tools
cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
cornerstoneTools.external.Hammer = Hammer;

// Image Loader
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

class CornerstoneElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stack: props.stack,
            viewport: cornerstone.getDefaultViewport(null, undefined),
            imageId: props.stack.imageIds[0]
        };

        this.onImageRendered = this.onImageRendered.bind(this);
        this.onNewImage = this.onNewImage.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
    }

    render() {
        return (
            <div>
                <h1>Cornerstone Element</h1>
                <div
                    className="viewportElement"
                    style={divStyle}
                    ref={input => {
                        this.element = input;
                    }}
                >
                    <canvas className="cornerstone-canvas" />
                    <div style={bottomLeftStyle}>Zoom: {this.state.viewport.scale}</div>
                    <div style={bottomRightStyle}>
                        WW/WC: {this.state.viewport.voi.windowWidth} /{" "}
                        {this.state.viewport.voi.windowCenter}
                    </div>
                </div>
            </div>
        )
    }


    onWindowResize() {
        console.log("onWindowResize");
        cornerstone.resize(this.element);
    }

    onImageRendered() {
        const viewport = cornerstone.getViewport(this.element);
        console.log(viewport);

        this.setState({
            viewport
        });

        console.log(this.state.viewport);
    }

    onNewImage() {
        const enabledElement = cornerstone.getEnabledElement(this.element);

        this.setState({
            imageId: enabledElement.image.imageId
        });
    }

    componentDidMount() {
        const element = this.element;
        cornerstoneTools.init();

        // Enable the DOM Element for use with Cornerstone
        cornerstone.enable(element);
        console.log(element);

        // Load the first image in the stack
        cornerstone.loadImage(this.state.imageId).then(image => {
            // Display the first image
            cornerstone.displayImage(element, image);

            // Add the stack tool state to the enabled element
            // const stack = this.props.stack;

            // const PanTool = cornerstoneTools.PanTool;
            //
            // cornerstoneTools.addTool(PanTool)
            // cornerstoneTools.setToolActive('Pan', { mouseButtonMask: 1 })

            element.addEventListener(
                "cornerstoneimagerendered",
                this.onImageRendered
            );
            element.addEventListener("cornerstonenewimage", this.onNewImage);
            window.addEventListener("resize", this.onWindowResize);
        });
    }

    componentWillUnmount() {
        const element = this.element;
        element.removeEventListener(
            "cornerstoneimagerendered",
            this.onImageRendered
        );

        element.removeEventListener("cornerstonenewimage", this.onNewImage);

        window.removeEventListener("resize", this.onWindowResize);

        cornerstone.disable(element);
    }

    componentDidUpdate(prevProps, prevState) {
        const stackData = cornerstoneTools.getToolState(this.element, "stack");
        const stack = stackData.data[0];
        stack.currentImageIdIndex = this.state.stack.currentImageIdIndex;
        stack.imageIds = this.state.stack.imageIds;
        cornerstoneTools.addToolState(this.element, "stack", stack);

        //const imageId = stack.imageIds[stack.currentImageIdIndex];
        //cornerstoneTools.scrollToIndex(this.element, stack.currentImageIdIndex);
    }
}

export default CornerstoneElement;