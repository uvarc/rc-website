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
// Storage FDM field examples
function projectSel(value) {
    if (value == 'Project') {
      // alert("Is a project!");
      document.getElementsByName('funding-number')[0].placeholder = 'e.g. PJ01607';
    }
    else if (value == 'Gift') {
      // alert("Is a gift!");
      document.getElementsByName('funding-number')[0].placeholder = 'e.g. GF003124'; 
    }
    else if (value == 'Grant') {
      // alert("Is a grant!");
      document.getElementsByName('funding-number')[0].placeholder = 'e.g. GR098063'; 
    }
    else if (value == 'Designated') {
      // alert("Is designated!");
      document.getElementsByName('funding-number')[0].placeholder = 'e.g. DN001153'; 
    }
}
