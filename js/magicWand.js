class MagicWand {
  constructor(origin, color, ps) {
    this.origin = origin;
    this.color = color;
    this.ps = ps;
    this.pixels = [this.origin];
    this.startPixelRef = 0;
    this.countyCount = 0;
    this.banishedPixels = [];
    this.boundaryWalkPixels = [];
    this.leftBoundaryPixel;
    this.polygonPixels = [];
    this.neighbour_pixels = [
      {'x': -ps, 'y': 0}, 
      {'x': -ps, 'y': ps}, 
      {'x': 0, 'y': ps},
      {'x': ps, 'y': ps},
      {'x': ps, 'y': 0},
      {'x': ps, 'y': -ps},
      {'x': 0, 'y': -ps},
      {'x': -ps, 'y': -ps}
    ];
  };

  // searches the master list of pixels for a pixel
  findPixel(pixel, list) {
    for (var i=0; i<list.length; i++) {
      if(pixel.x == list[i].x && pixel.y == list[i].y) {
        return true;
      }
    }
  };

  // checks the color of a pixel relative to the origin pixel. returns true if theyre the same color and false if not
  validateColor(pixel, color) {
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

  // Checks if the pixel is already in the master pixels list and if not, run validateColor(). 
  isValidPixel(pixel, color) {
    if (this.findPixel(pixel)) {
      return false;
    } else {
      if (this.validateColor(pixel, color)) {
            return true;
      };
    };
  };

  getMiddlePixel(polyList) {
    // define middle point
    var maxXY = {"x": this.origin.x, "y": this.origin.y};
    var minXY = {"x": this.origin.x, "y": this.origin.y}; // max-min.x, max-min.y
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
  };

  calculateRadians(pixel, middlePixel) {
    let radPoint = {"x": pixel.x, "y": pixel.y, "rad": Math.atan((pixel.y - middlePixel.y) / (pixel.x - middlePixel.x))}
    return radPoint;
  };

  
  getLeftBoundary() {
    var startPoint = this.origin;
    // 1. From origin move left until the next square to the left is a different color
    var leftCounter = 1
    var leftPixel = { "x": this.origin.x - leftCounter, "y": this.origin.y }
    while (this.validateColor(leftPixel, this.color)) {
      leftCounter++;
      leftPixel = { "x": this.origin.x - leftCounter, "y": this.origin.y }
    };
    this.leftBoundaryPixel = { "x": this.origin.x - (leftCounter -1 ), "y": this.origin.y }
    return this.leftBoundaryPixel;
  };
  
  boundaryWalk(currentPixel) { 
    if (this.startPixelRef !== 0) {
      for (var i=this.startPixelRef; i<this.neighbour_pixels.length; i++) {
        // define the pixel to validate
        let nextPixel = { "x": currentPixel.x + this.neighbour_pixels[i].x, "y": currentPixel.y + this.neighbour_pixels[i].y };
        if(this.countyCount > 1) {
          if (nextPixel.x == this.leftBoundaryPixel.x && nextPixel.y == this.leftBoundaryPixel.y) {
            console.log('returning');
            return this.polygonPixels;
          };
        };
        if (this.findPixel(nextPixel, this.banishedPixels) !== true) {
          if (this.validateColor(nextPixel, this.color)) {
            // this.startPixelRef = this pixel location
            if (i<4) {
              this.startPixelRef = i+4;
            } else {
              this.startPixelRef = i-4;
            }
            currentPixel = nextPixel;
            this.banishedPixels.push(nextPixel);
            this.polygonPixels.push(nextPixel);
            return this.boundaryWalk(currentPixel);
          };
        };
      };

      for (var i=0; i<this.startPixelRef; i++) {
        // define the pixel to validate
        let nextPixel = { "x": currentPixel.x + this.neighbour_pixels[i].x, "y": currentPixel.y + this.neighbour_pixels[i].y };
        if(this.countyCount > 1) {
          if (nextPixel.x == this.leftBoundaryPixel.x && nextPixel.y == this.leftBoundaryPixel.y) {
            console.log('returning');
            return this.polygonPixels;
          };
          this.countyCount++;
        };
        if (this.findPixel(nextPixel, this.banishedPixels) !== true) {
          if (this.validateColor(nextPixel, this.color)) {
            // this.startPixelRef = this pixel location
            if (i<4) {
              this.startPixelRef = i+4;
            } else {
              this.startPixelRef = i-4;
            }
            currentPixel = nextPixel;
            this.banishedPixels.push(nextPixel);
            this.polygonPixels.push(nextPixel);
            this.countyCount++;
            return this.boundaryWalk(currentPixel);

          };
        };
      };
    
    } else {
      
      for (var i=0; i<this.neighbour_pixels.length; i++) {
        // define the pixel to validate
        let nextPixel = { "x": currentPixel.x + this.neighbour_pixels[i].x, "y": currentPixel.y + this.neighbour_pixels[i].y };
        if(this.countyCount > 1) {
          if (nextPixel.x == this.leftBoundaryPixel.x && nextPixel.y == this.leftBoundaryPixel.y) {
            console.log('returning');
            return this.polygonPixels;
          };
        };
        if (this.findPixel(nextPixel, this.banishedPixels) !== true) {
          if (this.validateColor(nextPixel, this.color)) {
            // this.startPixelRef = this pixel location
            if (i<4) {
              this.startPixelRef = i+4;
            } else {
              this.startPixelRef = i-4;
            };

            currentPixel = nextPixel;
            this.banishedPixels.push(currentPixel);
            this.polygonPixels.push(currentPixel);
            this.countyCount++;
            return this.boundaryWalk(currentPixel);
          };
        };
      };
    };
  };


    // 2. Find the next pixel along
    // (sweep the surrounding pixels in an anti-clockwise    direction starting with the location of the previous pixel). First pixel starts just to the left.
    // 3. if this current pixel has 3, 2, 1 or 0 (can experiment) blank pixels around it, don't include it in the list as its not a good polygon point, else append it to the polygonList
    // 4. always remove this pixel from the starting list
    // 5. go to the selected next pixel and repeat 


    

  radianSweep(polyList, middlePixel) {
    var firstQuadrant = [];
    var secondQuadrant = [];
    var thirdQuadrant = [];
    var fourthQuadrant = [];
    var orderedList = [];
  
    for (var i=0; i<polyList.length; i++) {
      if (polyList[i].x > middlePixel.x && polyList[i].y > middlePixel.y) {
        fourthQuadrant.push(this.calculateRadians(polyList[i], middlePixel));
      } else if (polyList[i].x < middlePixel.x && polyList[i].y > middlePixel.y) {
        thirdQuadrant.push(this.calculateRadians(polyList[i], middlePixel));
      } else if (polyList[i].x < middlePixel.x && polyList[i].y < middlePixel.y) {
        secondQuadrant.push(this.calculateRadians(polyList[i], middlePixel));
      } else if (polyList[i].x > middlePixel.x && polyList[i].y < middlePixel.y) {
        firstQuadrant.push(this.calculateRadians(polyList[i], middlePixel));
      };
      
    };
   
    orderedList.push(this.orderQuadrants(fourthQuadrant, thirdQuadrant, secondQuadrant, firstQuadrant));
    return orderedList;
  
  };

  orderQuadrants(fourth, third, second, first) {
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
  };

  convertToPercent(polyList, width, height) {
    var mappedPoly = polyList.map(pixel => {
      return {"x": (100 / width) * pixel.x, "y": (100 / height) * pixel.y };
    });
    var polyPercent = mappedPoly.map(point => {
      return `${point.x}% ${point.y}%`;
    });
    return polyPercent;
  };

  bloomSearch(pixel) {
    var surroundingPixels = [];
    var valid_next_pixels = [];
    var correctPixels = [];

    // this.pixels.push(this.origin);
     
    for (var i=0; i<this.neighbour_pixels.length; i++) {
      let newPixel = {"x": pixel.x + this.neighbour_pixels[i].x, "y": pixel.y + this.neighbour_pixels[i].y};
      surroundingPixels.push(newPixel);
      
      if (this.isValidPixel(newPixel, this.color)) {
        valid_next_pixels.push(newPixel);
        this.pixels.push(newPixel);
      }; 
    };
  
    for (var i=0; i<surroundingPixels.length; i++) {
      if (this.validateColor(surroundingPixels[i], this.color)) {
        correctPixels.push(surroundingPixels[i]);
      };
    };
  
    if (correctPixels.length < 5) {
      this.polygonPixels.push(pixel);
    };
  
    for (var i=0; i<valid_next_pixels.length; i++) {
      this.bloomSearch(valid_next_pixels[i], this.color)
    };

    return this.polygonPixels;
  };

  search(searchType) {
    if (searchType === 'bloom') {
      return this.bloomSearch(this.origin);
    };
    if (searchType === 'boundaryWalk') {
      return this.boundaryWalk(this.origin);
    };

  };

  createDiv(divName, pixelList) {
    const canvas = document.getElementById("myCanvas");
    const hoverArea = document.querySelector('.hover-area');
    
    var divName = document.createElement("div");
    divName.classList.add("clickpoly");
    
    hoverArea.insertAdjacentElement('beforeend', divName);
    divName.style.clipPath = `polygon(${(pixelList)})`;
    divName.style.visibility = 'visible';
  };

};



