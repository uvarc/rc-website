// ===================================
    // Constants and Configuration
    // ===================================

    function showForm(tabIndex) {
        const forms = document.querySelectorAll('.tab-content');
        forms.forEach((form, index) => {
            form.style.display = index === tabIndex ? 'block' : 'none';
        });
        // Remove active class from all tab buttons
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => button.classList.remove('active'));
        
        // Add active class to the clicked tab button
        tabButtons[tabIndex].classList.add('active');
        const activeForm = forms[tabIndex].querySelector('form');
        if (activeForm) {
            activeForm.reset();
        }
    }

    
    $(document).ready(function () {
        const sections = document.querySelectorAll(".blog-sidebar");
        sections.forEach(section => section.remove());
        document.querySelector('#departmet_clasification_row').style.display = 'none';
        document.querySelector('#discipline_row').style.display = 'none';
        document.querySelector('#discipline').removeAttribute('required');
        document.querySelector('#department')?.removeAttribute('required');
        document.querySelector('#classification')?.removeAttribute('required');
    });
