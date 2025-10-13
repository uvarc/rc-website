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
        baseUrl: `${serviceHost}/uvarc/api/resource/rcwebform/user`,
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
      $(document).on('submit', '#update_uid_form', handleUpdateUidSubmit);
      function handleUpdateUidSubmit() {
        const groupName = $('#group_name_for_update').val().trim();
        const ownerUid = $('#owner_uid').val().trim();
        const responseContainer = $('#updateResponse');
      
        if (!groupName || !ownerUid) {
          responseContainer.html('<p style="color: red;">Both Group Name and Owner UID are required.</p>');
          return;
        }
      
        const url = `${API_CONFIG.updateUidUrl}${groupName}`;
      
        $.ajax({
          url: url,
          type: 'PUT',
          headers: API_CONFIG.headers,
          data: JSON.stringify({ owner_uid: ownerUid }),
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

    $(document).ready(function () {
        const sections = document.querySelectorAll(".blog-sidebar");
        sections.forEach(section => section.remove());
        document.querySelector('#departmet_clasification_row').style.display = 'none';
        document.querySelector('#discipline_row').style.display = 'none';
        document.querySelector('#discipline').removeAttribute('required');
        document.querySelector('#department')?.removeAttribute('required');
        document.querySelector('#classification')?.removeAttribute('required');
    });
