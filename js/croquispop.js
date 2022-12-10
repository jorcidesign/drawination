

// Initialize croquis
var myDivContainer = document.querySelector('.ar-1-1')
var clientHeight = myDivContainer.offsetHeight;
var clientWidth = myDivContainer.offsetWidth;

var croquis = new Croquis();
croquis.lockHistory();
croquis.setCanvasSize(720, 720);
croquis.addLayer();
croquis.selectLayer(0);
croquis.unlockHistory();
croquis.setToolStabilizeLevel(10);
croquis.setToolStabilizeWeight(0.35);
// croquis.setPaintingOpacity(1);

let currentToolBrush = {
    name: 'brush2',
    opacity: 1,
}
// imagenes de los pinceles 
let pencilBrush = new Image(40, 40);
pencilBrush.crossOrigin = "Anonymous";
pencilBrush.alt = "pencil";
pencilBrush.src = 'https://drawination.vercel.app/assets/pencil.png'

let shadowBrush = new Image(40, 40);
shadowBrush.crossOrigin = "Anonymous";
shadowBrush.alt = "shadows";
shadowBrush.src = 'https://drawination.vercel.app/assets/shadowBrush3.png'

let hardBrush = new Image(40, 40);
hardBrush.crossOrigin = "Anonymous";
hardBrush.alt = "for line art";
hardBrush.src = 'https://drawination.vercel.app/assets/brushHard.png'


//*--------------------- Initizalize brushes----------------*//
//shadow brush 
var brush = new Croquis.Brush();
brush.setSize(24);
brush.setColor('#000');
brush.setSpacing(0.1);
brush.setImage(shadowBrush);
brush.setOpacityBrushTool(0.2); //just for change the layer opacity, 

// console.log(brush.getOpacityBrushTool());
//sketch brush 
var brush2 = new Croquis.Brush()
brush2.setSize(6);
brush2.setColor('red');
brush2.setSpacing(0.2);
brush2.setImage(pencilBrush);
brush2.setOpacityBrushTool(1);

//line art brush 
var brush3 = new Croquis.Brush()
brush3.setSize(6);
brush3.setColor('#000');
brush3.setSpacing(0.2);
brush3.setOpacityBrushTool(1);
brush3.setImage(hardBrush)





croquis.setTool(window[currentToolBrush.name]);
croquis.setPaintingOpacity(window[currentToolBrush.name].getOpacityBrushTool());



//Brushes Buttons in interface
let selectSketchBrush = document.getElementById('sketch-brush');
var selectLineArtBrush = document.getElementById('lineart-brush');
let selectShadowBrush = document.getElementById('shadow-brush');
// selectSketchBrush.className = 'fa-solid fa-pencil p-2 toolbarDrawination_brushes__selected'
// div.classList.add("foo");
selectSketchBrush.classList.add("toolbarDrawination_brushes__selected");
selectSketchBrush.onpointerdown = function () {
    croquis.setTool(brush2);
    currentToolBrush.name = 'brush2';
    brushSizeSlider.value = brush2.getSize();
    croquis.setPaintingOpacity(window[currentToolBrush.name].getOpacityBrushTool());
    brushOpacitySlider.value = brush2.getOpacityBrushTool() * 100;
    // selectSketchBrush.className = 'fa-solid fa-pencil p-2 toolbarDrawination_brushes__selected'
    selectSketchBrush.classList.add("toolbarDrawination_brushes__selected")
    selectLineArtBrush.classList.remove("toolbarDrawination_brushes__selected")
    selectShadowBrush.classList.remove("toolbarDrawination_brushes__selected")

    // console.log(currentToolBrush.name);

}



selectLineArtBrush.onpointerdown = function () {
    croquis.setTool(brush3);
    currentToolBrush.name = 'brush3';
    brushSizeSlider.value = brush3.getSize();
    croquis.setPaintingOpacity(window[currentToolBrush.name].getOpacityBrushTool());
    brushOpacitySlider.value = brush3.getOpacityBrushTool() * 100;
    selectSketchBrush.classList.remove("toolbarDrawination_brushes__selected")
    selectLineArtBrush.classList.add("toolbarDrawination_brushes__selected")
    selectShadowBrush.classList.remove("toolbarDrawination_brushes__selected")
    // console.log(currentToolBrush.name);
}


selectShadowBrush.onpointerdown = function () {
    croquis.setTool(brush);
    currentToolBrush.name = 'brush'
    brushSizeSlider.value = brush.getSize();
    croquis.setPaintingOpacity(window[currentToolBrush.name].getOpacityBrushTool());
    brushOpacitySlider.value = brush.getOpacityBrushTool() * 100;
    selectSketchBrush.classList.remove("toolbarDrawination_brushes__selected")
    selectLineArtBrush.classList.remove("toolbarDrawination_brushes__selected")
    selectShadowBrush.classList.add("toolbarDrawination_brushes__selected")
    // console.log(currentToolBrush.name);
    // croquis.setPaintingOpacity(0.3);
}




var croquisDOMElement = croquis.getDOMElement();
var canvasArea = document.getElementById('canvas-area');
canvasArea.appendChild(croquisDOMElement);

//al hacer click 
function canvasPointerDown(e) {
    // setPointerEvent(e);
    var pointerPosition = getRelativePosition(e.clientX, e.clientY);


    // console.log(pointerPosition);
    if (pointerEventsNone)
        canvasArea.style.setProperty('cursor', 'none');
    if (e.pointerType === "pen" && e.button == 5)
        croquis.setPaintingKnockout(true);
    croquis.down(pointerPosition.x, pointerPosition.y, e.pointerType === "pen" ? e.pressure : 1);
    document.addEventListener('pointermove', canvasPointerMove);
    document.addEventListener('pointerup', canvasPointerUp);
}
// e.pointerType === "pen" ? e.pressure : 1
//al mover el puntero 
function canvasPointerMove(e) {
    // setPointerEvent(e);
    var pointerPosition = getRelativePosition(e.clientX, e.clientY);
    croquis.move(pointerPosition.x, pointerPosition.y, e.pointerType === "pen" ? e.pressure : 1);
}

//encima del canvas 
function canvasPointerUp(e) {
    // setPointerEvent(e);
    var pointerPosition = getRelativePosition(e.clientX, e.clientY);
    if (pointerEventsNone)
        canvasArea.style.setProperty('cursor', 'none');
    croquis.up(pointerPosition.x, pointerPosition.y, e.pointerType === "pen" ? e.pressure : 1);
    if (e.pointerType === "pen" && e.button == 5)
        setTimeout(function () { croquis.setPaintingKnockout(selectEraserCheckbox.checked) }, 30);//timeout should be longer than 20 (knockoutTickInterval in Croquis)
    document.removeEventListener('pointermove', canvasPointerMove);
    document.removeEventListener('pointerup', canvasPointerUp);
}
function getRelativePosition(absoluteX, absoluteY) {
    var rect = croquisDOMElement.getBoundingClientRect();
    return { x: absoluteX - rect.left, y: absoluteY - rect.top };
}
croquisDOMElement.addEventListener('pointerdown', canvasPointerDown);

//clear & fill button ui
var clearButton = document.getElementById('clear-button');
clearButton.onclick = function () {
    croquis.clearLayer();
}
/* var fillButton = document.getElementById('fill-button');
fillButton.onclick = function () {
    var rgb = tinycolor(brush.getColor()).toRgb();
    croquis.fillLayer(tinycolor({r: rgb.r, g: rgb.g, b: rgb.b,
        a: croquis.getPaintingOpacity()}).toRgbString());
}
 */




// checking pointer-events property support
var pointerEventsNone = document.documentElement.style.pointerEvents !== undefined;

/*******************************brush pointer************************/
// inncesary for me 

const { gsap } = window;

let brushPointerContainer = document.createElement('div');
brushPointerContainer.className = 'cursor--small';

/////////////////////////////////////////////

if (pointerEventsNone) {
    canvasArea.addEventListener('mouseover', function () {
        brushPointerContainer.style.display = 'block';
        canvasArea.addEventListener('pointermove', croquisPointerMove);
        canvasArea.addEventListener('mousemove', croquisPointerMove);
        document.body.appendChild(brushPointerContainer);
    });

    canvasArea.addEventListener("mousedown", () => {
        gsap.to(brushPointerContainer, 0.15, {
            scale: 1.5,
            opacity: 0.3,
        });
        canvasArea.addEventListener('pointermove', croquisPointerMove);      
    });

    canvasArea.addEventListener("pointerup", () => {
        gsap.to(brushPointerContainer, 0.15, {
            scale: 1,
            opacity: 1,
        });
        // brushPointerContainer.remove();   
    });


    canvasArea.addEventListener('pointerout', function () {
        canvasArea.removeEventListener('mousemove', croquisPointerMove);
        brushPointerContainer.remove();
        // brushPointerContainer.style.display = 'none';
    });


}

function croquisPointerMove(e) {
    if (pointerEventsNone) {
        var x = e.clientX ;
        var y = e.clientY ;
        brushPointerContainer.style.setProperty('left', x + 'px');
        brushPointerContainer.style.setProperty('top', y + 'px');
        // brushPointerContainer.style.display = 'block';
    }
}





// function updatePointer() {
//     if (pointerEventsNone) {
//         var image = currentBrush;
//         var threshold;
//         if (currentBrush == circleBrush) {
//             image = null;
//             threshold = 0xff;
//         }
//         else {
//             threshold = 0x30;
//         }

//     }
// }
// updatePointer(); 










// document.addEventListener("mousedown", (event) => {
//     // if (!event.shiftKey) {
//     //   return;
//     // }


//     if (event.altKey) {
//       // alert("The ALT key was pressed!");
//       const resultElement = document.getElementById('result');

//       if (!window.EyeDropper) {
//         resultElement.textContent = 'Your browser does not support the EyeDropper API';
//         return;
//       }

//       const eyeDropper = new EyeDropper();
//       const abortController = new AbortController();

//       eyeDropper.open({ signal: abortController.signal }).then((result) => {
//         resultElement.textContent = result.sRGBHex;
//         resultElement.style.backgroundColor = result.sRGBHex;
//       }).catch((e) => {
//         resultElement.textContent = e;
//       });

//       // setTimeout(() => {
//       //   abortController.abort();
//       // }, 2000);
//     } else {
//       // alert("The ALT key was NOT pressed!");
//     }

//   })



//stabilizer shelf
// var toolStabilizeLevelSlider =
//     10;
// var toolStabilizeWeightSlider =
//     0.3;

//brush shelf
var selectEraserCheckbox =
    document.getElementById('select-eraser-checkbox');
var brushSizeSlider = document.getElementById('brush-size-slider');
var brushOpacitySlider = document.getElementById('brush-opacity-slider');
// var brushFlowSlider = document.getElementById('brush-flow-slider');
// var brushSpacingSlider = document.getElementById('brush-spacing-slider');
// var brushAngleSlider = document.getElementById('brush-angle-slider');
// var brushRotateToDirectionCheckbox = document.getElementById('brush-rotate-to-direction-checkbox');
brushSizeSlider.value = window[currentToolBrush.name].getSize();
brushOpacitySlider.value = window[currentToolBrush.name].getOpacityBrushTool() * 100;
// brushFlowSlider.value = brush.getFlow() * 100;
// brushSpacingSlider.value = brush.getSpacing() * 100;
// brushAngleSlider.value = brush.getAngle();
// brushRotateToDirectionCheckbox.checked = brush.getRotateToDirection();

/* toolStabilizeLevelSlider.onchange = function () {
    croquis.setToolStabilizeLevel(toolStabilizeLevelSlider.value);
    toolStabilizeLevelSlider.value = croquis.getToolStabilizeLevel();
}
toolStabilizeWeightSlider.onchange = function () {
    croquis.setToolStabilizeWeight(toolStabilizeWeightSlider.value * 0.01);
    toolStabilizeWeightSlider.value = croquis.getToolStabilizeWeight() * 100;

    // console.log(croquis.getToolStabilizeWeight());
} */

selectEraserCheckbox.onchange = function () {
    croquis.setPaintingKnockout(selectEraserCheckbox.checked);
}



brushSizeSlider.onchange = function () {
    window[currentToolBrush.name].setSize(brushSizeSlider.value);
    currentToolBrush.size = brushSizeSlider.value;
    // console.log(currentToolBrush.size);
    // updatePointer();
}
brushOpacitySlider.onchange = function () {

    window[currentToolBrush.name].setOpacityBrushTool(brushOpacitySlider.value * 0.01);
    // console.log(window[currentToolBrush.name].getOpacityBrushTool())
    croquis.setPaintingOpacity(window[currentToolBrush.name].getOpacityBrushTool());
    // setColor();
}
// brushFlowSlider.onchange = function () {
//     brush.setFlow(brushFlowSlider.value * 0.01);
// }
// brushSpacingSlider.onchange = function () {
//     brush.setSpacing(brushSpacingSlider.value * 0.01);
// }
// brushAngleSlider.onchange = function () {
//     brush.setAngle(brushAngleSlider.value);
//     updatePointer();
// }
// brushRotateToDirectionCheckbox.onchange = function () {
//     brush.setRotateToDirection(brushRotateToDirectionCheckbox.checked);
// }




// Platform variables
var mac = navigator.platform.indexOf('Mac') >= 0;

//keyboard
document.addEventListener('keydown', documentKeyDown);
function documentKeyDown(e) {
    if (mac ? e.metaKey : e.ctrlKey) {
        switch (e.keyCode) {
            case 89: //ctrl + y
                croquis.redo();
                break;
            case 90: //ctrl + z
                croquis[e.shiftKey ? 'redo' : 'undo']();
                break;
        }
    }
}

// function setPointerEvent(e) {
//     if (e.pointerType !== "pen" && Croquis.Tablet.pen() && Croquis.Tablet.pen().pointerType) {//it says it's not a pen but it might be a wacom pen
//         e.pointerType = "pen";
//         e.pressure = Croquis.Tablet.pressure();
//         if (Croquis.Tablet.isEraser()) {
//             Object.defineProperties(e, {
//                 "button": { value: 5 },
//                 "buttons": { value: 32 }
//             });
//         }
//     }
// }


let imageBackground = new Image();
imageBackground.crossOrigin = "Anonymous";
imageBackground.alt = "paper background";
imageBackground.src = 'https://drawination.vercel.app/assets/PaperSurface_15.png'
// imageBackground.addEventListener("load", imageReceived, false);

// console.log(imageBackground)
//Descargar imagen con paper backgraound 
let downloadButton = document.getElementById('download');

downloadButton.onclick = function () {

    const canvasDownload = document.querySelectorAll('.croquis-layer-canvas');//obtener las canvas layers del croquis
    // let can = canvasDownload.item(0);//layer 1 (whiteBackground)
    let can2 = canvasDownload.item(0);//layer 2 (painting)
    // let ctx2 = can2.getContext('2d');
    // ctx2.globalCompositeOperation = "multiply";
    //merge layers in other hidden canvas for export 
    let can3 = document.getElementById('canvasExport');
    let ctx3 = can3.getContext('2d');




    ctx3.drawImage(imageBackground, 0, 0);


    ctx3.globalCompositeOperation = "multiply";
    ctx3.drawImage(can2, 0, 0);
    ctx3.globalCompositeOperation = "normal";

    //export 
    let canvasUrl = can3.toDataURL("image/jpeg", 0.8);
    const createEl = document.createElement('a');
    createEl.href = canvasUrl;
    createEl.download = "MySketch";
    createEl.click();
    createEl.remove();

}

function mirrorCanvas() {
    const canvasDownload = document.querySelectorAll('.croquis-layer-canvas');
    let can2 = canvasDownload.item(0)
    let ctx2 = can2.getContext('2d');
    ctx2.translate(can2.width, 0);
    ctx2.scale(-1, 1);
    // ctx2.drawImage(, 0, 0);
}


// document.addEventListener('DOMContentLoaded', function () {
//     let brushHard = new Image();
//     brushHard.crossOrigin = "Anonymous";
//     brushHard.alt = "brushHard";
//     brushHard.src = 'https://drawination.vercel.app/assets/brushHard.png'
//     brush3.setImage(brushHard);
//   }, false);