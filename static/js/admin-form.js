    // ===================================
    // Constants and Configuration
    // ===================================
 
    const hostname = window.location.hostname;

    let serviceHost = '';
    
    if (hostname.includes('staging-onprem.rc.virginia.edu') || hostname.includes('staging.rc.virginia.edu')) {
      serviceHost = 'https://uvarc-unified-service-test.pods.uvarc.io';
    } else if (hostname === 'rc.virginia.edu') {
      serviceHost = 'https://uvarc-unified-service-prod.pods.uvarc.io';
    } else {
      console.warn('Unknown environment, defaulting to staging');
      serviceHost = 'https://uvarc-unified-service-test.pods.uvarc.io';
    }
    
    const API_CONFIG = {
        updateUidUrl: `${serviceHost}/uvarc/api/resource/rcadminform/group/`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Origin': window.location.origin
        }
    };

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

      document.addEventListener('click', (e) => {
        // Check if the clicked element has the cancel-button class
        if (e.target.classList.contains('cancel-button')) {
          e.preventDefault();
      
          const urlParams = new URLSearchParams(window.location.search);
          const referrerParam = urlParams.get('from');
          const fallbackUrl = 'https://www.rc.virginia.edu/userinfo/hpc/access/';
          const redirectUrl = referrerParam || document.referrer || fallbackUrl;
      
          window.location.href = redirectUrl;
        }
      });
      
        
      $(document).on('submit', '#update_uid_form', handleUpdateUidSubmit);
      function handleUpdateUidSubmit(e) {
        e.preventDefault();

        const groupName = $('#group_name_for_update').val().trim();
        const ownerUid = $('#owner_uid').val().trim();
        const formData = $(this).serialize(); 
        const responseContainer = $('#resultMessage');
      
        if (!groupName || !ownerUid) {
          responseContainer.html('<p style="color: red;">Both Group Name and Owner UID are required.</p>');
          return;
        }
      
        const url = `${API_CONFIG.updateUidUrl}${groupName}`;
      
        $.ajax({
          url: url,
          type: 'PUT',
          headers: API_CONFIG.headers,
          contentType: 'application/x-www-form-urlencoded',
          data: formData,
          success: function (response) {
            const resObj = Array.isArray(response) ? response[0] : response;
            if (resObj.status === 'success') {
              responseContainer.html(`<p style="color: green;">${resObj.message}</p>`);
            } else {
              responseContainer.html(`<p style="color: red;">${resObj.message}</p>`);
            }
          },
          error: function (xhr) {
            const errorMessage = xhr.responseJSON?.message || 'An error occurred.';
            responseContainer.html(`<p style="color: red;">${errorMessage}</p>`);
          },
        });
      }
      
      $(document).on('submit', '#update_status_form', function (event) {
        event.preventDefault();
    
        const responseContainer = $('#statusMessage');
        const formData = $(this).serialize(); 
        $.ajax({
            url: `${serviceHost}/uvarc/api/resource/rcadminform/group/update`,
            type: 'PUT',
            headers: API_CONFIG.headers,
            contentType: 'application/x-www-form-urlencoded',
            data: formData,
            success: function (response) {
                const resObj = Array.isArray(response) ? response[0] : response;
                if (resObj.status === 'success') {
                    responseContainer.html(`<p style="color: green;">${resObj.message}</p>`);
                    $('#update_status_form')[0].reset();
                } else {
                    responseContainer.html(`<p style="color: red;">${resObj.message}</p>`);
                }
            },
            error: function (xhr) {
                const errorMessage = xhr.responseJSON?.message || 'An error occurred while updating status.';
                responseContainer.html(`<p style="color: red;">${errorMessage}</p>`);
            }
        });
      });

    $(document).ready(function () {
        const sections = document.querySelectorAll(".blog-sidebar");
        sections.forEach(section => section.remove());
        document.querySelector('#departmet_clasification_row').style.display = 'none';
        document.querySelector('#discipline_row').style.display = 'none';
        document.querySelector('#discipline').removeAttribute('required');
        document.querySelector('#department')?.removeAttribute('required');
        document.querySelector('#classification')?.removeAttribute('required');
    });
