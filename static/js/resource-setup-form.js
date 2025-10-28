 // Function to toggle tier sections based on resource type
 function toggleTiers() {
    const type = resourceSelect.value;

    if (type === "service-unit") {
      allocationTierDiv.style.display = "block";
      storageTierDiv.style.display = "none";
    } else if (type === "storage") {
      allocationTierDiv.style.display = "none";
      storageTierDiv.style.display = "block";
    }
  }

  resourceSelect.addEventListener("change", toggleTiers);

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
    const resourceSelect = document.getElementById("resource_type");
    const allocationTierDiv = document.getElementById("allocation-tier");
    const storageTierDiv = document.getElementById("storage-tier");
    // Run toggle on page load (set initial state)
    toggleTiers();
});