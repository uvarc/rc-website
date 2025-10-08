// ===================================
    // Constants and Configuration
    // ===================================
    document.addEventListener('DOMContentLoaded', () => {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabContents = document.querySelectorAll('.tab-content');
      
        tabButtons.forEach(button => {
          button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
      
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
      
            // Show the selected tab content and hide others
            tabContents.forEach(content => {
              if (content.id === `form${tabId}`) {
                content.style.display = 'block';
              } else {
                content.style.display = 'none';
              }
            });
          });
        });
      
        // Open first tab by default
        if (tabButtons.length > 0) {
          tabButtons[0].click();
        }
      });

    
    $(document).ready(function () {
        const sections = document.querySelectorAll(".blog-sidebar");
        sections.forEach(section => section.remove());
        document.querySelector('#departmet_clasification_row').style.display = 'none';
        document.querySelector('#discipline_row').style.display = 'none';
        document.querySelector('#discipline').removeAttribute('required');
        document.querySelector('#department')?.removeAttribute('required');
        document.querySelector('#classification')?.removeAttribute('required');
       // showForm(1);
    });
