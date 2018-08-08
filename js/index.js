// getting all the dom elements
const displayPosition = document.querySelector('.mouseAt');
const main = document.querySelector('.main');

const widgetsWindow = document.querySelector('.widgets-window');
const widgetLabel1 = document.querySelector('#label-1');
const widgetLabel2 = document.querySelector('#label-2');
const widgetLabel3 = document.querySelector('#label-3');
const textBoxButton = document.querySelector('#widget-1');
const triggerBox = document.querySelector('#widget-2');
const magicWand = document.querySelector('#widget-3');

const addSectionButton = document.getElementById("add-section");
const contentArea = document.querySelector('.create-content');

var activeFunctions = [];


// Initializing Objects
var sidebar = new Sidebar();
var widgetMenu = new WidgetMenu();


// on add image:
var canvas1 = new Canvas("../bottom_legend_pie_chart.png", 1);
var img = new Image();
img.onload = function() {
  var context = document.getElementById('content-canvas-1').getContext("2d");
  context.drawImage(img, 0, 0);
}
img.src = canvas1.img.src;

var canvas2 = new Canvas("../gayGeometry.jpg", 2);
var img2 = new Image();
img2.onload = function() {
  var context = document.getElementById('content-canvas-2').getContext("2d");
  context.drawImage(img2, 0, 0);
}
img2.src = canvas2.img.src;

// variables
var textBoxCount = 0;
var currentTextBox;

// Event listeners -----------
// content-area
contentArea.addEventListener('mousedown', contentClick, true);
contentArea.addEventListener('mouseup', function() {
  activeFunctions = [];
  widgetMenu.resetColor();
  contentArea.removeEventListener('mousemove', createMouseMove, true);
})

function contentClick(e) {
  switch(activeFunctions[0]) {
    case 'textBox':
      window['textBox-' + textBoxCount] = new TextBox(e, textBoxCount);
      currentTextBox = window['textBox-' + textBoxCount];
      textBoxCount++;
      contentArea.addEventListener('mousemove', createMouseMove, true);
      break;
    
    case 'triggerBox':
      alert('triggerBox tool');
      break;

    case 'magicWand':
      alert('magicWand tool');
      break;

    default:
      break;
  };
};

function createMouseMove(e) {
  currentTextBox.element.style.width = e.offsetX - currentTextBox.startPosition.x;
  currentTextBox.element.style.height = e.offsetY - currentTextBox.startPosition.y;
}

// widgets
const widgets = [textBoxButton, triggerBox, magicWand];
widgets.forEach(addListeners);

function addListeners(widget) {
  widget.addEventListener('mouseenter', function(e) {
    widgetMenu.showLabel(e);
  });
  widget.addEventListener('mouseleave', function(e) {
    widgetMenu.hideLabel(e);
  });
  widget.addEventListener('click', function(e) {
    widgetMenu.selected(e);
    widgetMenu.resetColor();
  });
};

// sidebar
addSectionButton.addEventListener('click', function() {
  sidebar.addSection();
});


// functions



// magicWandfunction
// function canvasClick(e) {
//   clickPosition = {"x": e.offsetX, "y": e.offsetY}
//   var pixelData = window.ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
//   var rgba = [pixelData[0], pixelData[1], pixelData[2], pixelData[3]];
  
//   wand = new MagicWand(clickPosition, rgba, 1);
//   const polyList = wand.search('bloom');
//   const middlePixel = wand.getMiddlePixel(polyList);
//   const orderedList = wand.radianSweep(polyList, middlePixel);
//   const percentageList = wand.convertToPercent(orderedList[0], 200, 250);
//   wand.createDiv('myDiv', percentageList);
// };