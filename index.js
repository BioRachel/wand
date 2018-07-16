import 'magicWand';

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

function canvasClick(e) {
  clickPosition = {"x": e.offsetX, "y": e.offsetY}
  pixels = [];
  polygonPixels = [];
  var pixelData = window.ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
  var rgba = [pixelData[0], pixelData[1], pixelData[2], pixelData[3]];
  displayPosition.textContent = `Click position: x=${clickPosition.x} y=${clickPosition.y} pixel color: rgba(${pixelData})` ;
  magicWand(clickPosition, rgba, 'bloom');
  var middlePixel = getMiddlePixel(polygonPixels);
  var pixelList = radianSweep(polygonPixels, middlePixel);

  // use the map function to turn the coordinates in percentages, here the div is width 200px height 250px so divide by 2 and 2.5 for x and y values respectively 
  polyDiv.style.clipPath = `polygon(${convertToPercent(pixelList[0], 200, 250)})`;
  polyDiv.style.visibility = 'visible';

};