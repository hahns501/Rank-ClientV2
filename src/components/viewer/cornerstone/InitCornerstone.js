import dicomParser from 'dicom-parser';
import cornerstone from 'cornerstone-core';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import cornerstoneMath from 'cornerstone-math';
import cornerstoneTools from 'cornerstone-tools';
import Hammer from 'hammerjs';
import CornerstoneViewport from "react-cornerstone-viewport";
import React,{useState} from "react";

export default function InitCornerstone() {

    // Cornerstone Tools
    cornerstoneTools.external.cornerstone = cornerstone;
    cornerstoneTools.external.Hammer = Hammer;
    cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
    cornerstoneTools.init();

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

    const [tools, setTools] = useState([
        // Mouse
        {
            name: "Wwwc",
            mode: "active",
            modeOptions: { mouseButtonMask: 1 }
        },
        {
            name: "Zoom",
            mode: "active",
            modeOptions: { mouseButtonMask: 2 }
        },
        {
            name: "Pan",
            mode: "active",
            modeOptions: { mouseButtonMask: 4 }
        },
        // Scroll
        { name: "StackScrollMouseWheel", mode: "active" },
        // Touch
        { name: "PanMultiTouch", mode: "active" },
        { name: "ZoomTouchPinch", mode: "active" },
        { name: "StackScrollMultiTouch", mode: "active" }
    ]);

    const [imageID, setImageID] = useState([
        'wadouri:https://imagerankerdicomtest.s3.amazonaws.com/foldertest1/1-001.dcm',
        'wadouri:https://imagerankerdicomtest.s3.amazonaws.com/foldertest1/1-002.dcm',
        'wadouri:https://imagerankerdicomtest.s3.amazonaws.com/foldertest1/1-003.dcm',
        'wadouri:https://imagerankerdicomtest.s3.amazonaws.com/foldertest1/1-004.dcm',
        'wadouri:https://imagerankerdicomtest.s3.amazonaws.com/foldertest1/1-005.dcm',
        'wadouri:https://imagerankerdicomtest.s3.amazonaws.com/foldertest1/1-006.dcm',
        'wadouri:https://imagerankerdicomtest.s3.amazonaws.com/foldertest1/1-007.dcm',
        'wadouri:https://imagerankerdicomtest.s3.amazonaws.com/foldertest1/1-008.dcm',
        'wadouri:https://imagerankerdicomtest.s3.amazonaws.com/foldertest1/1-009.dcm',
        'wadouri:https://imagerankerdicomtest.s3.amazonaws.com/foldertest1/1-010.dcm'
    ]);

    // const [imageID, setImageID] = useState([
    //     "dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm",
    //     "dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.12.dcm"
    // ]);

    return (
        <div>
            <CornerstoneViewport
                imageIds={imageID}
                tools={tools}
                // viewportOverlayComponent={CustomOverlay}
                style={{ minWidth: "100%", height: "800px", flex: "1" }}
            />
        </div>
    );
}