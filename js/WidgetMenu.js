

class WidgetMenu {
  constructor () {
    this.textBoxLabel = document.getElementById('label-1');
    this.triggerBox = document.getElementById('label-2');
    this.magicWand = document.getElementById('label-3');
  }

  selected(e) {
    var functionName = e.target.dataset.function;
    if (activeFunctions.length !== 0) {
      if (functionName == activeFunctions[0]) {
        activeFunctions = [];
      } else {
        activeFunctions = [];
        activeFunctions.push(functionName);
        
      };
    } else {
      activeFunctions.push(functionName);
    };

    widgets.forEach(function(widget) {
      widget.classList.remove('red');
      widget.classList.add('orange');
      if (widget.dataset.function == activeFunctions[0]) {
        widget.classList.remove('orange');
        widget.classList.add('red');
      };
    });
  };

  showLabel(e) {
    var widgetName = e.target.id;
    var index = widgetName.charAt(7);
    switch (index) {
      case '1':
        this.textBoxLabel.style.visibility = 'visible';
        break;
  
      case '2':
        this.triggerBox.style.visibility = 'visible';
        break;
  
      case '3':
      this.magicWand.style.visibility = 'visible';
        break;
  
      default:
        break;
    };
  };

  hideLabel(e) {
    var widgetName = e.target.id;
    var index = widgetName.charAt(7);
    switch (index) {
      case '1':
        this.textBoxLabel.style.visibility = 'hidden';
        break;
  
      case '2':
        this.triggerBox.style.visibility = 'hidden';
        break;
  
      case '3':
        this.magicWand.style.visibility = 'hidden';
        break;
  
      default:
        break;
    };
  };
};