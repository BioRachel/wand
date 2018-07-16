export class magicWand {
  constuctor(origin, color, searchType) {
    this.origin = origin;
    this.color = color;
    this.searchType = searchType;
    this.pixels = [];
    this.polygonPixels = [];
  }

  findPixel(pixel) {
    for (var i=0; i<pixels.length; i++) {
      if(pixel.x == pixels[i].x && pixel.y == pixels[i].y) {
        return true;
      }
    }
  };

  calculateRadians(pixel, middlePixel) {
    let radPoint = {"x": pixel.x, "y": pixel.y, "rad": Math.atan((pixel.y - middlePixel.y) / (pixel.x - middlePixel.x))}
    return radPoint;
  };

};

function radianSweep(polyList, middlePixel) {
  var firstQuadrant = [];
  var secondQuadrant = [];
  var thirdQuadrant = [];
  var fourthQuadrant = [];
  var orderedList = [];

  for (var i=0; i<polyList.length; i++) {
    if (polyList[i].x > middlePixel.x && polyList[i].y > middlePixel.y) {
      fourthQuadrant.push(calculateRadians(polyList[i], middlePixel));
    } else if (polyList[i].x < middlePixel.x && polyList[i].y > middlePixel.y) {
      thirdQuadrant.push(calculateRadians(polyList[i], middlePixel));
    } else if (polyList[i].x < middlePixel.x && polyList[i].y < middlePixel.y) {
      secondQuadrant.push(calculateRadians(polyList[i], middlePixel));
    } else if (polyList[i].x > middlePixel.x && polyList[i].y < middlePixel.y) {
      firstQuadrant.push(calculateRadians(polyList[i], middlePixel));
    };
    
  };
 
  orderedList.push(orderQuadrants(fourthQuadrant, thirdQuadrant, secondQuadrant, firstQuadrant));
  return orderedList;

};

function orderQuadrants(fourth, third, second, first) {
  var orderedFourthQuadrant = fourth.sort(function (a, b) {
    return a.rad - b.rad;
  });
  var orderedThirdQuadrant = third.sort(function (a, b) {
    return a.rad - b.rad;
  });
  var orderedSecondQuadrant = second.sort(function (a, b) {
    return a.rad - b.rad;
  });
  var orderedFirstQuadrant = first.sort(function (a, b) {
    return a.rad - b.rad;
  });
  return orderedFourthQuadrant.concat(orderedThirdQuadrant, orderedSecondQuadrant, orderedFirstQuadrant);
}

function calculateRadians(pixel, middlePixel) {
  let radPoint = {"x": pixel.x, "y": pixel.y, "rad": Math.atan((pixel.y - middlePixel.y) / (pixel.x - middlePixel.x))}
  return radPoint;
}

// converts unordered list of polygon edge pixels into the correct sequence for the clip-path css property
// picks the middle point then does a radial sweep of all polygon points to find what their angle is relative to straight up (0deg)
// orders them for their angle small to large (0 deg to 360 deg)
// this is passed to the css polygon and should work.
function getMiddlePixel(polyList) {
  // define middle point
  var maxXY = {"x": clickPosition.x, "y": clickPosition.y};
  var minXY = {"x": clickPosition.x, "y": clickPosition.y}; // max-min.x, max-min.y
  for (var i=0; i<polyList.length; i++) {
    if (polyList[i].x > maxXY.x) {
      maxXY.x = polyList[i].x;
    }
    if (polyList[i].y > maxXY.y) {
      maxXY.y = polyList[i].y;
    }
  }
  for (var i=0; i<polyList.length; i++) {
    if (polyList[i].x < minXY.x) {
      minXY.x = polyList[i].x;
    }
    if (polyList[i].y < minXY.y) {
      minXY.y = polyList[i].y;
    }
  }
  return {"x": 0.5 * (maxXY.x - minXY.x) + minXY.x, "y": 0.5 * (maxXY.y - minXY.y) + minXY.y};
}

// converts list of objects in pixels to list of objects in percent of div width and height
function convertToPercent(polyList, width, height) {
  var polyMap = polyList.map(function(coord) {
    return {"x": (100 / width) * coord.x, "y": (100 / height) * coord.y };
  });
  polyMap = polyMap.map(function(point) {
    return `${point.x}% ${point.y}%`;
  });
  return polyMap;
};

// create a div for the polygon
var polyDiv = document.createElement("div");
polyDiv.classList.add("clickpoly");

console.log(polyDiv);
const canvas = document.getElementById("myCanvas");
const hoverArea = document.querySelector('.hover-area');
hoverArea.insertAdjacentElement('beforeend', polyDiv);




var pixels = [];
var polygonPixels = [];

// findPixel({"x": 1, "y": 1});
const ps = 2;
const neighbour_pixels = [
    {'x': -ps, 'y': 0}, 
    {'x': -ps, 'y': -ps}, 
    {'x': 0, 'y': -ps},
    {'x': ps, 'y': -ps},
    {'x': ps, 'y': 0},
    {'x': ps, 'y': ps},
    {'x': 0, 'y': ps},
    {'x': -ps, 'y': ps}
  ];

function magicWand(origin, color, searchType) {
  if (searchType === 'bloom') {
    bloomSearch(origin, color);
  };
};

function bloomSearch(origin, color) {
  var valid_next_pixels = [];
  var correctPixels = [];
  var surroundingPixels = [];
  pixels.push(origin);
  var pixel = origin
  
  // loop through each adjacent pixel and add to 'surroundingPixels'. Will be a total of 8 pixels.  
  for (var i=0; i<neighbour_pixels.length; i++) {
    let newPixel = {"x": origin.x + neighbour_pixels[i].x, "y": origin.y + neighbour_pixels[i].y};
    surroundingPixels.push(newPixel);
    
    // checks if each of the adjacent pixels is already in the list of pixels and if not, if its the same color as the origin pixel. If it isn't in the list and is valid (same color), push this to valid_next_pixels and perform the bloom search on these too.
    if (isValidPixel(newPixel, color)) {
      valid_next_pixels.push(newPixel);
      pixels.push(newPixel);
    }; 
  };

  // console.log(valid_next_pixels);
  // check the surroundingPixels list and check which of those pixels are the same color. If all are the same color or 3 aren't the same color, don't push to polygonPixels as this is a straight line or a pixel inside the edges respectively  
  for (var i=0; i<surroundingPixels.length; i++) {
    if (validateColor(surroundingPixels[i], color)) {
      correctPixels.push(surroundingPixels[i]);
    };
  };

  if (correctPixels.length !== 5 && correctPixels.length !== 8) {
    polygonPixels.push(pixel);
  };
    
    
  // recursively call bloomSearch for each pixel in valid_next_pixels to continue the bloom. This will finish when there are no pixels left as origin points in valid_next_pixels (ie the boundaries have been found)
  for (var i=0; i<valid_next_pixels.length; i++) {
    bloomSearch(valid_next_pixels[i], color)
  };

};

// Checks if the pixel is already in the master pixels list and if not, check its color relative to the origin pixel. 
function isValidPixel(pixel, color) {
  if (findPixel(pixel)) {
    return false;
  } else {
    if (validateColor(pixel, color)) {
          return true;
    };
  };
};

// checks the color of a pixel relative to the origin pixel. returns true if theyre the same color and false if not
function validateColor(pixel, color) {
  var pixelColor = window.ctx.getImageData(pixel.x, pixel.y, 1, 1).data;
  var rgba = [pixelColor[0], pixelColor[1], pixelColor[2], pixelColor[3]];
  if (rgba[0] == color[0] && 
      rgba[1] == color[1] && 
      rgba[2] == color[2] && 
      rgba[3] == color[3]) {
        return true;
  };
  return false;
};

// searches the master list of pixels for a pixel
function findPixel(pixel) {
  for (var i=0; i<pixels.length; i++) {
    if(pixel.x == pixels[i].x && pixel.y == pixels[i].y) {
      return true;
    }
  }
};