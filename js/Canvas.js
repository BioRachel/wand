class Canvas {
  constructor(url, id) {
    this.id = id;
    this.mouseOffset = { "x": 0, "y": 0 };
    this.htmlElement = document.createElement('canvas');
    this.parentElement = document.querySelector('.create-content');
    this.img = new Image();
    this.img.src = url;
    this.createCanvas(this.htmlElement);
    
    this.htmlElement.addEventListener('dragstart', this.dragStart.bind(this));
    this.htmlElement.addEventListener('dragend', this.dragEnd.bind(this));
  };

  createCanvas(canvas) {
    canvas.height = this.img.naturalHeight;
    canvas.width = this.img.naturalWidth;
    canvas.style.maxWidth = '1000px';
    canvas.classList.add('canvas-marker');
    canvas.id = `content-canvas-${this.id}`;
    canvas.draggable = 'true';

    this.parentElement.insertBefore(canvas, this.parentElement.lastChild);
  };

  
  dragStart(e) {
    this.mouseOffset = { "x": e.offsetX, "y": e.offsetY };
    this.htmlElement.className += ' hold';
    setTimeout(() => (this.htmlElement.className = 'invisible'), 0);
  };
  
  dragEnd(e) {
    var offsets = contentArea.getBoundingClientRect();
    var top = e.offsetY - offsets.top - this.mouseOffset.y;
    var left = e.offsetX - offsets.left - this.mouseOffset.x;
    this.htmlElement.style.top = top;
    this.htmlElement.style.left = left;
    if (top < 0) {
      this.htmlElement.style.top = 0;
    }; 
    if (left < 0) {
      this.htmlElement.style.left = 0;
    }; 
    if (left > 1000 - e.target.width) {
      this.htmlElement.style.left = 1000 - e.target.width;
    };
    if (top > window.innerHeight - e.target.height) {
      this.htmlElement.style.top = window.innerHeight - 1.5*e.target.height;
    };
  
    
    this.htmlElement.className = 'canvas-marker';
  };

}