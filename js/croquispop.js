window.onload = function() {
    if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
    }
}


// Initialize croquis
var myDivContainer = document.querySelector('.ar-1-1')
var clientHeight = myDivContainer.offsetHeight;
var clientWidth = myDivContainer.offsetWidth;

var croquis = new Croquis();
croquis.lockHistory();
croquis.setCanvasSize(720, 720);
croquis.addLayer();
croquis.unlockHistory();
croquis.setToolStabilizeLevel(10);
croquis.setToolStabilizeWeight(0.35);
// croquis.setPaintingOpacity(1);

let currentToolBrush = {
    name: 'brush',
    opacity: 1,
}
// imagenes de los pinceles 
let lineArtBrush = new Image();
lineArtBrush.src = './assets/brushHard.png'

let shadowBrush = new Image();
shadowBrush.src = './assets/shadowBrush3.png'

let sketchBrush = new Image();
sketchBrush.src = './assets/pencil.png'

//*--------------------- Initizalize brushes----------------*//
//shadow brush 
var brush = new Croquis.Brush();
brush.setSize(24);
brush.setColor('#000');
brush.setSpacing(0.1);
brush.setImage(shadowBrush);
brush.setOpacityBrushTool(0.2); //just for change the layer opacity, 

console.log(brush.getOpacityBrushTool());
//sketch brush 
var brush2 = new Croquis.Brush()
brush2.setSize(6);
brush2.setColor('red');
brush2.setSpacing(0.2);
brush2.setImage(sketchBrush);
brush2.setOpacityBrushTool(1);

//line art brush 
var brush3 = new Croquis.Brush()
brush3.setSize(6);
brush3.setColor('#000');
brush3.setSpacing(0.2);
brush3.setOpacityBrushTool(1);
brush3.setImage(lineArtBrush);


croquis.setTool(window[currentToolBrush.name]);
croquis.setPaintingOpacity(window[currentToolBrush.name].getOpacityBrushTool());



//Brushes Buttons in interface
let selectSketchBrush = document.getElementById('sketch-brush');
selectSketchBrush.onclick = function () {
    croquis.setTool(brush2);
    currentToolBrush.name = 'brush2';
    brushSizeSlider.value = brush2.getSize();
    croquis.setPaintingOpacity(window[currentToolBrush.name].getOpacityBrushTool());
    brushOpacitySlider.value = brush2.getOpacityBrushTool() * 100;

    console.log(currentToolBrush.name);

}


let selectLineArtBrush = document.getElementById('lineart-brush');
selectLineArtBrush.onclick = function () {
    croquis.setTool(brush3);
    currentToolBrush.name = 'brush3';
    brushSizeSlider.value = brush3.getSize();
    croquis.setPaintingOpacity(window[currentToolBrush.name].getOpacityBrushTool());
    brushOpacitySlider.value = brush3.getOpacityBrushTool() * 100;
    console.log(currentToolBrush.name);
}

let selectShadowBrush = document.getElementById('shadow-brush');
selectShadowBrush.onclick = function () {
    croquis.setTool(brush);
    currentToolBrush.name = 'brush'
    brushSizeSlider.value = brush.getSize();
    croquis.setPaintingOpacity(window[currentToolBrush.name].getOpacityBrushTool());
    brushOpacitySlider.value = brush.getOpacityBrushTool() * 100;
    console.log(currentToolBrush.name);
    // croquis.setPaintingOpacity(0.3);
}




var croquisDOMElement = croquis.getDOMElement();
var canvasArea = document.getElementById('canvas-area');
canvasArea.appendChild(croquisDOMElement);

//al hacer click 
function canvasPointerDown(e) {
    setPointerEvent(e);
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
    setPointerEvent(e);
    var pointerPosition = getRelativePosition(e.clientX, e.clientY);
    croquis.move(pointerPosition.x, pointerPosition.y, e.pointerType === "pen" ? e.pressure : 1);
}

//encima del canvas 
function canvasPointerUp(e) {
    setPointerEvent(e);
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


// //brush images
// var circleBrush = document.getElementById('circle-brush');
// var brushImages = document.getElementsByClassName('brush-image');
// var currentBrush = brushImages;

// Array.prototype.map.call(brushImages, function (brush) {
//     brush.addEventListener('pointerdown', brushImagePointerDown);
// });

// function brushImagePointerDown(e) {
//     var image = e.currentTarget;
//     currentBrush.className = 'brush-image';
//     image.className = 'brush-image on';
//     currentBrush = image;
//     if (image == circleBrush)
//         image = null;
//     brush.setImage(image);
//     updatePointer();
// }

// checking pointer-events property support
var pointerEventsNone = document.documentElement.style.pointerEvents !== undefined;

/*******************************brush pointer************************/
// inncesary for me 

const { gsap } = window;

let brushPointerContainer = document.createElement('div');
brushPointerContainer.className = 'cursor--small';

/////////////////////////////////////////////

if (pointerEventsNone) {
    croquisDOMElement.addEventListener('pointerover', function () {
        croquisDOMElement.addEventListener('pointermove', croquisPointerMove);
        document.body.appendChild(brushPointerContainer);
    });

    croquisDOMElement.addEventListener("pointerdown", () => {
        gsap.to(brushPointerContainer, 0.15, {
            scale: 1.5,
            opacity: 0.3,
        });
    });

    croquisDOMElement.addEventListener("pointerup", () => {
        gsap.to(brushPointerContainer, 0.15, {
            scale: 1,
            opacity: 1,
        });
    });


    croquisDOMElement.addEventListener('pointerout', function () {
        croquisDOMElement.removeEventListener('pointermove', croquisPointerMove);
        brushPointerContainer.parentElement.removeChild(brushPointerContainer);
    });


}

function croquisPointerMove(e) {
    if (pointerEventsNone) {
        var x = e.clientX + window.pageXOffset;
        var y = e.clientY + window.pageYOffset;
        brushPointerContainer.style.setProperty('left', x + 'px');
        brushPointerContainer.style.setProperty('top', y + 'px');
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





console.log(gsap)





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
    console.log(currentToolBrush.size);
    // updatePointer();
}
brushOpacitySlider.onchange = function () {

    window[currentToolBrush.name].setOpacityBrushTool(brushOpacitySlider.value * 0.01);
    console.log(window[currentToolBrush.name].getOpacityBrushTool())
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


console.log(brush.getColor());








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

function setPointerEvent(e) {
    if (e.pointerType !== "pen" && Croquis.Tablet.pen() && Croquis.Tablet.pen().pointerType) {//it says it's not a pen but it might be a wacom pen
        e.pointerType = "pen";
        e.pressure = Croquis.Tablet.pressure();
        if (Croquis.Tablet.isEraser()) {
            Object.defineProperties(e, {
                "button": { value: 5 },
                "buttons": { value: 32 }
            });
        }
    }
}



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


    const image = document.getElementById('imageBackground');

    ctx3.drawImage(image, 0, 0);
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


let zoomIn = document.getElementById('zoom-in');
zoomIn.onclick = function () {
    // croquis.setCanvasSize(1080, 1080);
    const canvasDownload = document.querySelectorAll('.croquis-layer-canvas');//obtener las canvas layers del croquis
    // let can = canvasDownload.item(0);//layer 1 (whiteBackground)
    let canvas2 = canvasDownload.item(0);//layer 2 (painting)
    let ctx2 = canvas2.getContext('2d');
    var target = new Image();

    target.src = canvas2.toDataURL();

/*     const resizedDataUri = resizeImage(target, 300);
    // targetResize.src = resizeImage(target,1080);
    target.src = resizedDataUri;
 */  const canvas1 = document.createElement('canvas');
    const ctx = canvas1.getContext('2d');
    canvas1.width = 720;
    canvas1.height = 720;


    ctx.drawImage(canvas2, 0, 0, 1080, 1080);

    croquis.clearLayer()
    document.getElementById('brush-shelf').appendChild(canvas1);

    ctx2.drawImage(canvas1, 0, 0)
    // ctx2.drawImage(canvas1,0,0,1080,1080);
    // console.log(targetResize);
    // croquis.clearLayer();
    // ctx2.drawImage(resizeImage(target,1080), 0, 0)

}


function resizeImage(imgEl, wantedWidth) {
    const canvas1 = document.createElement('canvas');
    const ctx = canvas1.getContext('2d');

    const aspect = imgEl.width / imgEl.height;

    canvas1.width = wantedWidth;
    canvas1.height = wantedWidth / aspect;

    ctx.drawImage(imgEl, 0, 0, canvas1.width, canvas1.height);
    return canvas1.toDataURL();
}


let div = document.querySelectorAll('.croquis-layer-canvas').item(0);


function drawRect() {
    let div2 = document.querySelectorAll('.croquis-painting-canvas').item(0);
    var ctxTest = div2.getContext("2d");
    ctxTest.beginPath();
    ctxTest.rect(20, 20, 150, 100);
    ctxTest.stroke();

}

// export {brush}




// 
/* 
var movie = "test";
var movieId = 1;
localStorage[movie + movieId] = "Gaaa"

alert(localStorage['test1'])
 */



