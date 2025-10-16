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
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Origin': window.location.origin
  }
};


// ====================
// Helper Functions
// ====================
function showMessage(container, message, color = 'red') {
    container.html(`<p style="color: ${color}; font-style: italic; font-size: 15px;">${message}</p>`);
}

// ====================
// Form Submissions
// ====================

// --- Update UID Form ---
$(document).on('submit', '#update_uid_form', function(e) {
    e.preventDefault();

    const groupName = $('#group_name_for_update').val().trim();
    const ownerUid = $('#owner_uid').val().trim();
    const responseContainer = $('#resultMessage');

    if (!groupName || !ownerUid) {
        showMessage(responseContainer, 'Both Group Name and Owner UID are required.');
        return;
    }
    const requestUrl = `${serviceHost}/uvarc/api/resource/rcadminform/group/${groupName}`;
    console.log("Request URL:", requestUrl);
    $.ajax({
        url: requestUrl,
        type: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({ owner_uid: ownerUid }),
        xhrFields: {
          withCredentials: true
          },
        success: function(response) {
            const resObj = Array.isArray(response) ? response[0] : response;
            showMessage(responseContainer, resObj.message, resObj.status === 'success' ? 'green' : 'red');
            if (resObj.status === 'success') $('#update_uid_form')[0].reset();
        },
        error: function(xhr) {
            const errorMessage = xhr.responseJSON?.message || 'An error occurred while updating UID.';
            showMessage(responseContainer, errorMessage);
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
        contentType: 'application/x-www-form-urlencoded',
        data: formData,
        success: function(response) {
            const resObj = Array.isArray(response) ? response[0] : response;
            showMessage(responseContainer, resObj.message, resObj.status === 'success' ? 'green' : 'red');
            if (resObj.status === 'success') $('#update_status_form')[0].reset();
        },
        error: function(xhr) {
            const errorMessage = xhr.responseJSON?.message || 'An error occurred while updating status.';
            showMessage(responseContainer, errorMessage);
        }
    });
});

// ====================
// Tabs
// ====================
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

// ====================
// Cancel Buttons
// ====================
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

// ====================
// Page Ready
// ====================
$(document).ready(function () {
    // Remove unnecessary sections
    $(".blog-sidebar").remove();

    // Hide certain rows and remove required attributes
    ['#departmet_clasification_row', '#discipline_row'].forEach(r => $(r).hide());
    $('#discipline, #department, #classification').removeAttr('required');

    // Ensure status message container exists
    if ($('#statusMessage').length === 0) {
        $('#update_status_form').prepend('<div class="message" id="statusMessage"></div>');
    }
});