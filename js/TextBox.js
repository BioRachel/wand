class TextBox {
  constructor(startPosition, textBoxIndex) {
    this.startPosition = { "x": startPosition.offsetX, "y": startPosition.offsetY };
    this.element = document.createElement('textarea');
    this.element.classList.add('drawing-box');
    this.element.id = `drawTextBox-${textBoxIndex}`;
    this.element.style.top = this.startPosition.y;
    this.element.style.left = this.startPosition.x;
    contentArea.appendChild(this.element);
    this.element.addEventListener('focus', this.showMarkers);
    this.element.addEventListener('blur', this.removeMarkers);
  };

  showMarkers() {
    console.log('hey');
    var boxNo = 0;
    for (var i=0; i<8; i++) {
       this['boxNo'+boxNo] = document.createElement('div');
       this['boxNo'+boxNo].classList.add('marker-box');
       contentArea.appendChild(this['boxNo'+boxNo]);
       boxNo++;
    };
  };

  removeMarkers() {
    console.log('hi');
  }
};
