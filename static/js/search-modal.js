// Look for SEARCH key
var searchKey = {
  83: 's'
};

document.addEventListener('keydown', function(e) {
  // Don't activate search functionality when "typing" [input or textarea]
  var isTyping = e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea';

  if (!isTyping) {
    var key = searchKey[e.keyCode];
    if (key == 's') {
      showSearch();
    } else {
      // do nothing
    }
  }
});

function showSearch() {
  $('.search-modal').modal('show');
}

$(document).ready(function() {
  if (window.location.href.indexOf('#search') != -1) {
    $('.search-modal').modal('show');
  }
});
