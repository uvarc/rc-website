// Combined Request Form
$(document).ready(function () {
    console.log("Document is ready, initializing...");
    // Add CSS for styling
    $('<style>')
        .text(`
            /* Dropdown Styling */
            #mygroups-group option.text-muted { 
                color: #6c757d !important; 
            }
            #mygroups-group option:disabled {
                color: #adb5bd !important;
                font-style: italic;
                background-color: #f8f9fa !important;
                cursor: not-allowed;
            }
            #mygroups-group option:disabled::before {
                content: "⚠️ ";
            }

            /* Helper Text Styling */
            .helper-text {
                color: #495057;
                font-size: 0.875rem;
                margin-top: 0.25rem;
                margin-bottom: 1rem;
                display: block;
            }
            .helper-text a {
                color: #0056b3;
                text-decoration: underline;
            }
            .helper-text a:hover {
                color: #003d7a;
                text-decoration: none;
            }

            /* Resource Type Badges */
            .resource-type-allocation, .resource-type-su {
                color: #004085;
                background-color: #cce5ff;
                padding: 0.2rem 0.5rem;
                border-radius: 0.25rem;
                font-size: 0.875rem;
                font-weight: 500;
            }
            .resource-type-storage {
                color: #155724;
                background-color: #d4edda;
                padding: 0.2rem 0.5rem;
                border-radius: 0.25rem;
                font-size: 0.875rem;
                font-weight: 500;
            }

            /* Form Validation Styling */
            .is-invalid {
                border-color: #dc3545;
            }
            .is-valid {
                border-color: #28a745;
            }
            .invalid-field-highlight {
                background-color: #fff3f3;
            }
        `)
        .appendTo('head');
});

// Error handler
const ErrorHandler = {
    showUserMessage: (message, type = 'error', duration = 5000) => {
        console.log("Displaying user message: ", message);
        const alertClass = type === 'error' ? 'alert-danger' : 'alert-warning';
        const errorDiv = $('<div>')
            .addClass(`alert ${alertClass} alert-dismissible fade show`)
            .html(`
                <strong>${type === 'error' ? 'Error' : 'Warning'}:</strong> ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `)
            .prependTo('#combined-request-form');

        if (duration) {
            setTimeout(() => errorDiv.fadeOut('slow', function () {
                $(this).remove();
            }), duration);
        }
        return errorDiv;
    },

    handleApiError: (error, context) => {
        console.error("API Error in context: ", context, " - Error details: ", error);
        let message;
        if (error.message.includes('user ID') || error.message.includes('user session')) {
            message = `
                <div class="alert alert-warning" role="alert">
                    <h4 class="alert-heading">Session Not Available</h4>
                    <p>Unable to load your user information. This could be because:</p>
                    <ul>
                        <li>The page is still loading</li>
                        <li>Your session has expired</li>
                        <li>You are not properly logged in</li>
                    </ul>
                    <hr>
                    <p class="mb-0">Please try:
                        <ol>
                            <li>Waiting a few moments and refreshing the page</li>
                            <li>Logging out and back in</li>
                            <li>Clearing your browser cache if the problem persists</li>
                        </ol>
                    </p>
                </div>
            `;
        } else {
            message = `
                <div class="alert alert-warning" role="alert">
                    <h4 class="alert-heading">Unable to Load Information</h4>
                    <p>An unexpected error occurred while loading your information.</p>
                    <hr>
                    <p class="mb-0">Please try refreshing the page. If the problem persists, contact Research Computing Support.</p>
                </div>
            `;
        }

        $('#combined-request-form').prepend(message);
        $('#mygroups-group').prop('disabled', true).addClass('is-invalid');
    }
};

// User Session Management
async function waitForUserSession() {
    function getCookie(c_name) {
        var c_value = document.cookie,
            c_start = c_value.indexOf(" " + c_name + "=");
        if (c_start == -1) c_start = c_value.indexOf(c_name + "=");
        if (c_start == -1) {
            c_value = null;
        } else {
            c_start = c_value.indexOf("=", c_start) + 1;
            var c_end = c_value.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = c_value.length;
            }
            c_value = unescape(c_value.substring(c_start, c_end));
        }
        return c_value;
    }

    function decode64(str) {
        return str ? atob(str) : null;
    }

    const encodedUid = getCookie("__rc_uid");
    console.log("Encoded User ID: ", encodedUid);
    if (encodedUid) {
        const uid = decode64(encodedUid);
        console.log("Decoded User ID: ", uid);
        if (uid) {
            return uid;
        }
    }

    // Check other required cookies
    const hasName = getCookie("__rc_name");
    const hasEmail = getCookie("__rc_email");
    const hasDepartment = getCookie("__rc_department");
    console.log("Cookies - Name: ", hasName, " Email: ", hasEmail, " Department: ", hasDepartment);

    if (!hasName || !hasEmail || !encodedUid || !hasDepartment) {
        window.location.replace("https://auth.rc.virginia.edu/session.php");
        return;
    }

    throw new Error('Could not get user ID after waiting - user session not available');
}

// API Integration and Group Management
async function fetchUserResourceEligibility(userId) {
    try {
        console.log("Fetching user resource eligibility for User ID: ", userId);
        const response = await fetch(`https://uvarc-unified-service.pods.uvarc.io/uvarc/api/resource/rcwebform/user/${userId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'Content-Type': 'application/json',
                'x-requested-with': 'XMLHttpRequest',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Mobile Safari/537.36',
                'Referer': 'https://staging.rc.virginia.edu/form/combined-request-form/'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("User Eligibility Data: ", data);
        return data;
    } catch (error) {
        console.error('Error fetching user resource eligibility:', error);
        ErrorHandler.handleApiError(error, 'fetchUserResourceEligibility');
        return null;
    }
}

async function initialize() {
    try {
        console.log("Initializing form...");
        const loadingMessage = $('<div>')
            .addClass('alert alert-info')
            .html(`
                <div class="d-flex align-items-center">
                    <div class="spinner-border spinner-border-sm me-2" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div>Loading form...</div>
                </div>
            `)
            .prependTo('#combined-request-form');

        setupInitialFormState();

        try {
            const userId = await waitForUserSession();
            console.log("User ID: ", userId);

            // Fetch user resource data and directly populate groups
            const userEligibility = await fetchUserResourceEligibility(userId);
            if (userEligibility) {
                populateGrouperMyGroupsDropdown(userEligibility[0].user_groups);
            } else {
                ErrorHandler.showUserMessage("User groups could not be loaded.", "warning");
            }

        } catch (error) {
            console.error("Session Error: ", error);
            ErrorHandler.handleApiError(error, 'session');
        }

        loadingMessage.fadeOut('slow', function () {
            $(this).remove();
        });

    } catch (error) {
        console.error("Initialization Error: ", error);
        ErrorHandler.handleApiError(error, 'initialization');
        $('.alert.alert-info').remove();
    }
}

function setupEventHandlers() {
    console.log("Setting up event handlers...");
    $('input[name="request-type"]').on('change', function () {
        console.log("Request type changed");
        toggleRequestFields();
    });
    $('input[name="new-or-renewal"]').on('change', function () {
        console.log("New or renewal option changed");
        toggleAllocationFields();
    });
    $('input[name="allocation-choice"]').on('change', function () {
        console.log("Allocation choice changed");
        updateBillingVisibility();
    });
    $('input[name="type-of-request"]').on('change', function () {
        console.log("Type of request changed");
        toggleStorageFields();
    });
    $('input[name="storage-choice"]').on('change', function () {
        console.log("Storage choice changed");
        if (this.value === 'Highly Sensitive Data') {
            $(this).next('label').text('Highly Sensitive Data');
        }
        toggleStorageTierOptions();
    });
    $('#capacity').on('input change', function () {
        console.log("Capacity changed");
        if ($('#storage-fields').is(':visible')) {
            updateBillingVisibility();
        }
    });
    $('#mygroups-group').on('change', function () {
        console.log("Group selection changed");
        validateGroupSelection();
        updateFormValidation();
    });
    $('#data-agreement').on('change', function () {
        console.log("Data agreement changed");
        updateFormValidation();
    });
    $('#combined-request-form').on('submit', function (e) {
        console.log("Form submitted");
        handleFormSubmission(e);
    });

    setupValidationHandlers();
    setupProjectTableHandlers();
    setupFieldFormatters();
}

function populateGrouperMyGroupsDropdown(groups) {
    console.log("Populating user groups dropdown...");
    const dropdown = $('#mygroups-group');
    dropdown.empty();
    dropdown.append('<option value="">- Select a group -</option>');

    const sortedGroups = [...groups].sort((a, b) => a.localeCompare(b));
    sortedGroups.forEach(groupName => {
        const option = $('<option>')
            .val(groupName)
            .text(groupName)
            .data('valid', true);
        dropdown.append(option);
    });
}

// Start initialization
document.addEventListener('DOMContentLoaded', function() {
    initialize();
    setupEventHandlers();
});