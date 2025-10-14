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

// ====================
// Form Submission Logic
// ====================

// --- Update UID Form ---
$(document).on('submit', '#update_uid_form', function(e) {
  e.preventDefault();

  const groupName = $('#group_name_for_update').val().trim();
  const ownerUid = $('#owner_uid').val().trim();
  const responseContainer = $('#resultMessage');

  if (!groupName || !ownerUid) {
      responseContainer.html('<p style="color: red;">Both Group Name and Owner UID are required.</p>');
      return;
  }

  // URL-encoded data to avoid preflight
  const formData = `owner_uid=${encodeURIComponent(ownerUid)}`;

  $.ajax({
      url: `${serviceHost}/uvarc/api/resource/rcadminform/group/${groupName}`,
      type: 'PUT',
      contentType: 'application/x-www-form-urlencoded', // avoids preflight
      data: formData,
      success: function(response) {
          const resObj = Array.isArray(response) ? response[0] : response;
          if (resObj.status === 'success') {
              responseContainer.html(`<p style="color: green;">${resObj.message}</p>`);
              $('#update_uid_form')[0].reset();
          } else {
              responseContainer.html(`<p style="color: red;">${resObj.message}</p>`);
          }
      },
      error: function(xhr) {
          const errorMessage = xhr.responseJSON?.message || 'An error occurred while updating UID.';
          responseContainer.html(`<p style="color: red;">${errorMessage}</p>`);
      }
  });
});

// --- Update Status Form ---
$(document).on('submit', '#update_status_form', function(e) {
  e.preventDefault();

  const responseContainer = $('#statusMessage');
  const formData = $(this).serialize(); // URL-encoded

  $.ajax({
      url: `${serviceHost}/uvarc/api/resource/rcadminform/group/update`,
      type: 'PUT',
      contentType: 'application/x-www-form-urlencoded', // avoids preflight
      data: formData,
      success: function(response) {
          const resObj = Array.isArray(response) ? response[0] : response;
          if (resObj.status === 'success') {
              responseContainer.html(`<p style="color: green;">${resObj.message}</p>`);
              $('#update_status_form')[0].reset();
          } else {
              responseContainer.html(`<p style="color: red;">${resObj.message}</p>`);
          }
      },
      error: function(xhr) {
          const errorMessage = xhr.responseJSON?.message || 'An error occurred while updating status.';
          responseContainer.html(`<p style="color: red;">${errorMessage}</p>`);
      }
  });
});

// --- Cancel Buttons ---
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('cancel-button')) {
      e.preventDefault();

      const urlParams = new URLSearchParams(window.location.search);
      const referrerParam = urlParams.get('from');
      const fallbackUrl = 'https://www.rc.virginia.edu/userinfo/hpc/access/';
      const redirectUrl = referrerParam || document.referrer || fallbackUrl;

      window.location.href = redirectUrl;
  }
});

// --- Tabs ---
document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(button => {
      button.addEventListener('click', () => {
          const tabId = button.getAttribute('data-tab');

          tabButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');

          tabContents.forEach(content => {
              content.style.display = content.id === `form${tabId}` ? 'block' : 'none';
          });
      });
  });

  if (tabButtons.length > 0) tabButtons[0].click();
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
