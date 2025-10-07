// ===================================
    // Constants and Configuration
    // ===================================

    function showForm(tabIndex) {
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.style.display = 'none';
          });
          document.getElementById(`form${formNumber}`).style.display = 'block';
    }
   

    
    $(document).ready(function () {
        const sections = document.querySelectorAll(".blog-sidebar");
        sections.forEach(section => section.remove());
        document.querySelector('#departmet_clasification_row').style.display = 'none';
        document.querySelector('#discipline_row').style.display = 'none';
        document.querySelector('#discipline').removeAttribute('required');
        document.querySelector('#department')?.removeAttribute('required');
        document.querySelector('#classification')?.removeAttribute('required');
        showForm(1);
    });
