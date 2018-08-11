class TextBox {
  constructor(startPosition, textBoxIndex) {
    this.startPosition = { "x": startPosition.offsetX, "y": startPosition.offsetY };

    this.div = document.createElement('div');
    this.div.classList.add('text-container');
    this.div.style.top = this.startPosition.y;
    this.div.style.left = this.startPosition.x;

    this.element = document.createElement('textarea');
    this.element.classList.add('textbox');
    this.element.id = `textbox-${textBoxIndex}`;
    
    this.createMarkers();
    this.boxNo1.classList.add('top-middle');
    this.boxNo2.classList.add('top-right');
    this.boxNo3.classList.add('middle-right');
    this.boxNo4.classList.add('bottom-right');
    this.boxNo5.classList.add('bottom-middle');
    this.boxNo6.classList.add('bottom-left');
    this.boxNo7.classList.add('middle-left');


    this.div.appendChild(this.element);
    contentArea.appendChild(this.div);

    
    this.element.addEventListener('focus', this.showMarkers);
    this.element.addEventListener('blur', this.hideMarkers);

    this.boxNo1.addEventListener('click', function() {
      currentTextBox = this.div;
      createMouseMove(e);
    });
  };

  createMarkers() {
    var boxNo = 0;
    for (var i=0; i<8; i++) {
       this['boxNo'+boxNo] = document.createElement('div');
       this['boxNo'+boxNo].classList.add('marker-box');
       this.div.appendChild(this['boxNo'+boxNo]);
       boxNo++;
    };
    
  };

  showMarkers(e) {
    e.target.parentNode.childNodes.forEach(function(element) { 
      if (element.nodeName != "TEXTAREA") {
        element.style.visibility = 'visible';
      };
    });
    
  }

  hideMarkers(e) {
    e.target.parentNode.childNodes.forEach(function(element) { 
      if (element.nodeName != "TEXTAREA") {
        element.style.visibility = 'hidden';
      };
    });
  }
};
