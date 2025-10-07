// ===================================
    // Constants and Configuration
    // ===================================

    function showForm(tabIndex) {
        const forms = document.querySelectorAll('.tab-content');
        forms.forEach((form, index) => {
            form.style.display = index === tabIndex ? 'block' : 'none';
        });
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
