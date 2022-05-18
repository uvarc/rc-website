// When user scrolls 100px from the top of the document, show button
window.onscroll = function() {scrollFunction()};
function scrollFunction() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        document.getElementById("scrollBtn").style.display = "block";
    } else {
        document.getElementById("scrollBtn").style.display = "none";
    }
};
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};
// Sticky Things Below
var stickySidebar = $('.sticky');
if (stickySidebar.length > 0) { 
  var stickyHeight = stickySidebar.height(),
      sidebarTop = stickySidebar.offset().top;
}
// on scroll move the sidebar
$(window).scroll(function () {
  if (stickySidebar.length > 0) { 
    var scrollTop = $(window).scrollTop();
    if (sidebarTop < scrollTop) {
      stickySidebar.css('top', scrollTop - sidebarTop);
      // stop the sticky sidebar at the footer to avoid overlapping
      var sidebarBottom = stickySidebar.offset().top + stickyHeight,
          stickyStop = $('.main-content').offset().top + $('.main-content').height();
      if (stickyStop < sidebarBottom) {
        var stopPosition = $('.main-content').height() - stickyHeight;
        stickySidebar.css('top', stopPosition);
      }
    }
    else {
      stickySidebar.css('top', '0');
    } 
  }
});
$(window).resize(function () {
  if (stickySidebar.length > 0) { 
    stickyHeight = stickySidebar.height();
  }
});

/*
isKeyPressed = { 
   'a': false,
   'e': false,
   'g': false,
   'p': false,
   's': false,
   'u': false,
};
document.onkeydown = (keyDownEvent) => {
  isKeyPressed[keyDownEvent.key] = true;
  if (isKeyPressed["u"] && isKeyPressed["s"]) {
    location.href = '/support/';
  } else if (isKeyPressed["a"]) {
    location.href = '/about/mission/';
  } else if (isKeyPressed["g"] && isKeyPressed["s"]) {
    location.href = '/userinfo/systems/';
  } else if (isKeyPressed["p"]) {
    location.href = '/project/';
  } else if (isKeyPressed["e"]) {
    location.href = '/education/workshops/';
  };
};
*/
