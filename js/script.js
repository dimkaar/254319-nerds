var writeUsBtn = document.querySelector('.map-block__btn');
var modalWindow = document.querySelector('.modal-window');
var closeBtn = document.querySelector('.modal-window__close-btn');

if (writeUsBtn) {
  writeUsBtn.addEventListener('click', function (event) {
    event.preventDefault();
    if (modalWindow.style.display === 'none' || modalWindow.style.display === '') {
      modalWindow.style.display = 'block';
    } else {
      return 0;
    }
  });
}

if (closeBtn) {
  closeBtn.addEventListener('click', function() {
    if (modalWindow.style.display === 'block') {
      modalWindow.style.display = 'none';
    }
  });
}

window.addEventListener('keydown', function(event) {
  if (event.keyCode === 27) {
    if (modalWindow.style.display === 'block') {
      modalWindow.style.display = 'none';
    }
  }
});
