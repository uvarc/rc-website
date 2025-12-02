// ===================================
    // ====================
// Page Ready
// ====================
$(document).ready(function () {
    // Remove unnecessary sections
    $(".blog-sidebar").remove();
    // Hide certain rows and remove required attributes
    ['#departmet_clasification_row', '#discipline_row'].forEach(r => $(r).hide());
    $('#discipline, #department, #classification').removeAttr('required');
    const blogMain = document.querySelector(".blog-main");
    if (blogMain) {
       blogMain.classList.remove("col-sm-9");
       blogMain.classList.add("col-sm-12");
    }

});