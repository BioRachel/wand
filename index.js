// Load the image to a canvas
window.onload = function() {
  window.canvas = document.getElementById("myCanvas")
  window.ctx = canvas.getContext("2d");
  ctx.crossOrigin = "Anonymous";
  var image = new Image();
  image.onload = function() {
     ctx.drawImage(image, 0, 0,);
  };
  image.src = "bottom_legend_pie_chart.png";
};

const displayPosition = document.querySelector('.mouseAt');
const main = document.querySelector('.main');

main.addEventListener('click', canvasClick);

// magicWandfunction
function canvasClick(e) {
  clickPosition = {"x": e.offsetX, "y": e.offsetY}
  var pixelData = window.ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
  var rgba = [pixelData[0], pixelData[1], pixelData[2], pixelData[3]];
  
  wand = new MagicWand(clickPosition, rgba, 2);
  console.log(wand);
  
  const polyList = wand.search('bloom');
  const middlePixel = wand.getMiddlePixel(polyList);
  const orderedList = wand.radianSweep(polyList, middlePixel);
  const percentageList = wand.convertToPercent(orderedList[0], 200, 250);
  wand.createDiv('myDiv', percentageList);

};