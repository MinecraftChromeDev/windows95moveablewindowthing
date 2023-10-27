var windowElement = document.getElementById('window');
var titleBarElement = document.getElementById('titleBar');

var isDragging = false;
var dragOffset = { x: 0, y: 0 };

// Make the window movable
titleBarElement.addEventListener('mousedown', function(event) {
  isDragging = true;
  dragOffset.x = event.clientX - windowElement.offsetLeft;
  dragOffset.y = event.clientY - windowElement.offsetTop;
});

window.addEventListener('mousemove', function(event) {
  if (isDragging) {
    windowElement.style.left = (event.clientX - dragOffset.x) + 'px';
    windowElement.style.top = (event.clientY - dragOffset.y) + 'px';
  }
});

window.addEventListener('mouseup', function() {
  isDragging = false;
});


// Make the window resizable
var resizeHandleElements = document.getElementsByClassName('resize-handle');
var initialWidth = windowElement.offsetWidth;
var initialHeight = windowElement.offsetHeight;

for (var i = 0; i < resizeHandleElements.length; i++) {
  (function() {
    var resizeHandleElement = resizeHandleElements[i];
    var direction = resizeHandleElement.getAttribute('data-direction');

    resizeHandleElement.addEventListener('mousedown', function(event) {
      event.stopPropagation();
      var startX = event.clientX;
      var startY = event.clientY;
      var windowWidth = windowElement.offsetWidth;
      var windowHeight = windowElement.offsetHeight;

      function resize(event) {
        var deltaX = event.clientX - startX;
        var deltaY = event.clientY - startY;
        var newWidth = windowWidth + (direction.includes('e') ? deltaX : -deltaX);
        var newHeight = windowHeight + (direction.includes('s') ? deltaY : -deltaY);

        windowElement.style.width = newWidth + 'px';
        windowElement.style.height = newHeight + 'px';
      }

      function stopResize() {
        window.removeEventListener('mousemove', resize);
        window.removeEventListener('mouseup', stopResize);
      }

      window.addEventListener('mousemove', resize);
      window.addEventListener('mouseup', stopResize);
    });
  })();
}