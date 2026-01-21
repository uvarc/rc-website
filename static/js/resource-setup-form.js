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

    // Define toggle function inside ready block so it can access these variables
    function toggleTiers() {
      const type = resourceSelect.value;
      if (type === "service-unit") {
        allocationTierDiv.style.display = "block";
        storageTierDiv.style.display = "none";
      } else if (type === "storage") {
        allocationTierDiv.style.display = "none";
        storageTierDiv.style.display = "block";
      } else {
        // Default (hide both if not selected)
        allocationTierDiv.style.display = "none";
        storageTierDiv.style.display = "none";
      }
    }

    // Run toggle on page load
    toggleTiers();

    // Attach change event to dropdown
    resourceSelect.addEventListener("change", toggleTiers);
});