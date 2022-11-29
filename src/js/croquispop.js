// Initialize croquis

var croquis = new Croquis();
croquis.lockHistory();
croquis.setCanvasSize(720, 720);
croquis.addLayer();
croquis.fillLayer('#fff');
croquis.addLayer();
croquis.selectLayer(1);
croquis.unlockHistory();
croquis.setToolStabilizeLevel(10);
croquis.setToolStabilizeWeight(0.35);
croquis.setPaintingOpacity(0.2);

var brush = new Croquis.Brush();
brush.setSize(21);
brush.setColor('#000');
brush.setSpacing(0.2);


var brush2 = new Croquis.Brush()
// brush.setSize(15);
// brush.setColor('#000');
// brush.setSpacing(0.2);


croquis.setTool(brush);


var croquisDOMElement = croquis.getDOMElement();
var canvasArea = document.getElementById('canvas-area');
canvasArea.appendChild(croquisDOMElement);

//al hacer click 
function canvasPointerDown(e) {
    setPointerEvent(e);
    var pointerPosition = getRelativePosition(e.clientX, e.clientY);
    if (pointerEventsNone)
        canvasArea.style.setProperty('cursor', 'none');
    if (/* e.pointerType === "pen" && */ e.button == 5)
        croquis.setPaintingKnockout(true);
    croquis.down(pointerPosition.x, pointerPosition.y,);
    document.addEventListener('pointermove', canvasPointerMove);
    document.addEventListener('pointerup', canvasPointerUp);
}
// e.pointerType === "pen" ? e.pressure : 1
//al mover el puntero 
function canvasPointerMove(e) {
    setPointerEvent(e);
    var pointerPosition = getRelativePosition(e.clientX, e.clientY);
    croquis.move(pointerPosition.x, pointerPosition.y, );
}

//encima del canvas 
function canvasPointerUp(e) {
    setPointerEvent(e);
    var pointerPosition = getRelativePosition(e.clientX, e.clientY);
    if (pointerEventsNone)
        canvasArea.style.setProperty('cursor', 'none');
    croquis.up(pointerPosition.x, pointerPosition.y, );
    if (/* e.pointerType === "pen" &&  */e.button == 5)
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


//brush images
var circleBrush = document.getElementById('circle-brush');
var brushImages = document.getElementsByClassName('brush-image');
var currentBrush = circleBrush;

Array.prototype.map.call(brushImages, function (brush) {
    brush.addEventListener('pointerdown', brushImagePointerDown);
});

function brushImagePointerDown(e) {
    var image = e.currentTarget;
    currentBrush.className = 'brush-image';
    image.className = 'brush-image on';
    currentBrush = image;
    if (image == circleBrush)
        image = null;
    brush.setImage(image);
    updatePointer();
}

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

// // const cursorOuter = document.querySelector(".cursor--large");
// const cursorInner = document.querySelector(".cursor--small");
// let isStuck = false;
// let mouse = {
// 	x: -100,
// 	y: -100,
// };

// // Just in case you need to scroll
// // let scrollHeight = 0;
// // window.addEventListener('scroll', function(e) {
// // 	scrollHeight = window.scrollY
// // })

// let cursorOuterOriginalState = {
// 	width: cursorInner.getBoundingClientRect().width,
// 	height: cursorInner.getBoundingClientRect().height,
// };
// const buttons = document.querySelectorAll("main button");

// buttons.forEach((button) => {
// 	button.addEventListener("pointerenter", handleMouseEnter);
// 	button.addEventListener("pointerleave", handleMouseLeave);

// });

// document.body.addEventListener("pointermove", updateCursorPosition);
// document.body.addEventListener("pointerdown", () => {
// 	gsap.to(cursorInner, 0.15, {
// 		scale: 1.5,
// 	});
// });
// document.body.addEventListener("pointerup", () => {
// 	gsap.to(cursorInner, 0.15, {
// 		scale: 1,
// 	});
// });

// function updateCursorPosition(e) {
// 	mouse.x = e.pageX;
// 	mouse.y = e.pageY;
// }

// function updateCursor() {
// 	gsap.set(cursorInner, {
// 		x: mouse.x,
// 		y: mouse.y,
// 	});

// 	if (!isStuck) {
// 		gsap.to(cursorInner, {
// 			duration: 0.15,
// 			x: mouse.x - cursorOuterOriginalState.width/2,
// 			y: mouse.y - cursorOuterOriginalState.height/2,
// 		});
// 	}

// 	requestAnimationFrame(updateCursor);
// }

// updateCursor();







//color picker
/* var colorPickerHueSlider =
    document.getElementById('color-picker-hue-slider');
var colorPickerSb = document.getElementById('color-picker-sb');
var colorPickerHSBRect = new HSBRect(150, 150);
colorPickerHSBRect.DOMElement.id = 'color-picker-hsbrect';
colorPickerSb.appendChild(colorPickerHSBRect.DOMElement);
var colorPickerThumb = document.createElement('div');
colorPickerThumb.id = 'color-picker-thumb';
colorPickerSb.appendChild(colorPickerThumb);
colorPickerHueSlider.value = tinycolor(brush.getColor()).toHsv().h;

function setColor() {
    var halfThumbRadius = 7.5;
    var sbSize = 150;
    var h = colorPickerHueSlider.value;
    var s = parseFloat(
        colorPickerThumb.style.getPropertyValue('margin-left'));
    var b = parseFloat(
        colorPickerThumb.style.getPropertyValue('margin-top'));
    s = (s + halfThumbRadius) / sbSize;
    b = 1 - ((b + halfThumbRadius + sbSize) / sbSize);
    brush.setColor(tinycolor({h: h, s:s, v: b}).toRgbString());
    var a = croquis.getPaintingOpacity();
    var color = tinycolor({h: h, s:s, v: b, a: a});
    colorPickerColor.style.backgroundColor = color.toRgbString();
    colorPickerColor.textContent = color.toHexString();
}

colorPickerHueSlider.onchange = function () {
    colorPickerHSBRect.hue = colorPickerHueSlider.value;
    setColor();
}

function colorPickerPointerDown(e) {
    document.addEventListener('pointermove', colorPickerPointerMove);
    colorPickerPointerMove(e);
}
function colorPickerPointerUp(e) {
    document.removeEventListener('pointermove', colorPickerPointerMove);
}
function colorPickerPointerMove(e) {
    var boundRect = colorPickerSb.getBoundingClientRect();
    var x = (e.clientX - boundRect.left);
    var y = (e.clientY - boundRect.top);
    pickColor(x, y);
}
function minmax(value, min, max) {
    return Math.min(max, Math.max(min, value));
}
function pickColor(x, y) {
    var halfThumbRadius = 7.5;
    var sbSize = 150;
    colorPickerThumb.style.setProperty('margin-left',
        (minmax(x, 0, sbSize) - halfThumbRadius) + 'px');
    colorPickerThumb.style.setProperty('margin-top',
        (minmax(y, 0, sbSize) - (sbSize + halfThumbRadius)) + 'px');
    colorPickerThumb.style.setProperty('border-color',
        (y < sbSize * 0.5)? '#000' : '#fff');
    setColor();
}
colorPickerSb.addEventListener('pointerdown', colorPickerPointerDown);
document.addEventListener('pointerup', colorPickerPointerUp);

var backgroundCheckerImage;
(function () {
    backgroundCheckerImage = document.createElement('canvas');
    backgroundCheckerImage.width = backgroundCheckerImage.height = 20;
    var backgroundImageContext = backgroundCheckerImage.getContext('2d');
    backgroundImageContext.fillStyle = '#fff';
    backgroundImageContext.fillRect(0, 0, 20, 20);
    backgroundImageContext.fillStyle = '#ccc';
    backgroundImageContext.fillRect(0, 0, 10, 10);
    backgroundImageContext.fillRect(10, 10, 20, 20);
})();

var colorPickerChecker = document.getElementById('color-picker-checker');
colorPickerChecker.style.backgroundImage = 'url(' +
    backgroundCheckerImage.toDataURL() + ')';
var colorPickerColor = document.getElementById('color-picker-color');

pickColor(0, 150); */

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
var brushFlowSlider = document.getElementById('brush-flow-slider');
var brushSpacingSlider = document.getElementById('brush-spacing-slider');
// var brushAngleSlider = document.getElementById('brush-angle-slider');
// var brushRotateToDirectionCheckbox = document.getElementById('brush-rotate-to-direction-checkbox');
brushSizeSlider.value = brush.getSize();
brushOpacitySlider.value = croquis.getPaintingOpacity() * 100;
brushFlowSlider.value = brush.getFlow() * 100;
brushSpacingSlider.value = brush.getSpacing() * 100;
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
    brush.setSize(brushSizeSlider.value);
    updatePointer();
}
brushOpacitySlider.onchange = function () {
    croquis.setPaintingOpacity(brushOpacitySlider.value * 0.01);
    setColor();
}
brushFlowSlider.onchange = function () {
    brush.setFlow(brushFlowSlider.value * 0.01);
}
brushSpacingSlider.onchange = function () {
    brush.setSpacing(brushSpacingSlider.value * 0.01);
}
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

function setPointerEvent(e) {
    /*     if (e.pointerType !== "pen" && Croquis.Tablet.pen() && Croquis.Tablet.pen().pointerType) {//it says it's not a pen but it might be a wacom pen
            e.pointerType = "pen";
            e.pressure = Croquis.Tablet.pressure();
            if (Croquis.Tablet.isEraser()) {
                Object.defineProperties(e, {
                    "button": { value: 5 },
                    "buttons": { value: 32 }
                });
            }
        } */
}



//Descargar imagen con paper backgraound 
let downloadButton = document.getElementById('download');
downloadButton.onclick = function () {

    const canvasDownload = document.querySelectorAll('.croquis-layer-canvas');//obtener las canvas layers del croquis
    let can = canvasDownload.item(0);//layer 1 (whiteBackground)
    let can2 = canvasDownload.item(1);//layer 2 (painting)

    //merge layers in other hidden canvas for export 
    let can3 = document.getElementById('canvasExport');
    let ctx3 = can3.getContext('2d');

   
    const image = document.getElementById('imageBackground');

    ctx3.drawImage(image, 0, 0);
    ctx3.drawImage(can2, 0, 0);

    //export 
    let canvasUrl = can3.toDataURL("image/png", 0.5);
    const createEl = document.createElement('a');
    createEl.href = canvasUrl;
    createEl.download = "MySketch";
    createEl.click();
    createEl.remove();

}

