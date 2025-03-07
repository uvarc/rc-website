// ===================================
// Constants and Configuration
// ===================================

const API_CONFIG = {
    baseUrl: 'https://uvarc-unified-service.pods.uvarc.io/uvarc/api/resource/rcwebform/user',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Origin': window.location.origin
    }
};

const RESOURCE_TYPES = {
    'Standard': { 
        isPaid: false, // Free allocation
        description: 'Standard allocation for research projects',
        category: 'Rivanna HPC'
    },
    'Paid': { 
        isPaid: true, // Paid allocation
        description: 'Paid allocation for additional computing needs',
        category: 'Rivanna HPC'
    },
    'Instructional': { 
        isPaid: false, // Free for educational use
        description: 'Allocation for teaching and educational purposes',
        category: 'Rivanna HPC'
    },
    'SSZ Research Project': { 
        isPaid: true, // Always paid
        description: 'High-performance project storage',
        category: 'Storage'
    },
    'SSZ Research Standard': { 
        isPaid: (currentSize) => currentSize > 10, // Free up to 10TB
        freeLimit: 10,
        description: 'Standard research storage (first 10TB free)',
        category: 'Storage'
    },
    'Highly Sensitive Data': {
        isPaid: true, // Always paid
        description: 'Secure storage for sensitive data',
        category: 'Storage'
    }
};

// ===================================
// Fetches and Holds API Data
// ===================================

let apiMetadata = {};
let consoleData = [];

// ===================================
// CSS Styles
// ===================================

$('<style>')
    .text(`
        .group-dropdown option {
            padding: 8px;
            margin: 2px;
            border-radius: 4px;
        }
        .group-dropdown option.text-muted { 
            color: #6c757d !important;
            background-color: #f8f9fa;
        }
        .group-dropdown option:disabled {
            color: #adb5bd !important;
            font-style: italic;
            background-color: #f8f9fa !important;
            cursor: not-allowed;
        }
        .api-error-message {
            margin-bottom: 1rem;
            padding: 1rem;
            border-radius: 0.25rem;
            border: 1px solid #f5c6cb;
            background-color: #f8d7da;
            color: #721c24;
        }
    `)
    .appendTo('head');

// ===================================
// Validation Patterns
// ===================================

const VALIDATION = {
    groupName: /^[a-zA-Z0-9\-_]+$/,
    projectName: /^[\w\-\s]{3,128}$/,
    sharedSpaceName: /^[\w\-]{3,40}$/
};

// ===================================
// Utility and Helper Functions
// ===================================

function getUserId() {
    const userId = $('#uid').val() || "Unknown"; // Fetch the user ID dynamically
    if (userId === "Unknown") {
        console.error("User ID is not available. Please ensure you are logged in.");
        showErrorMessage("Failed to retrieve user information. Please log in and refresh the page.");
        throw new Error("User ID is unknown.");
    }
    console.log("User ID:", userId);
    return userId;
}

function markFieldValid($field) {
    console.log(`Marking field valid: ${$field.attr('id') || $field.attr('name')}`);
    $field.addClass('is-valid').removeClass('is-invalid');
    $field.siblings('.invalid-feedback').remove();
}

function markFieldInvalid($field, message) {
    console.log(`Marking field invalid: ${$field.attr('id') || $field.attr('name')}, Reason: ${message}`);
    $field.addClass('is-invalid').removeClass('is-valid');
    
    let $feedback = $field.siblings('.invalid-feedback');
    if ($feedback.length === 0) {
        $feedback = $('<div>')
            .addClass('invalid-feedback')
            .text(message);
        $field.after($feedback);
    } else {
        $feedback.text(message);
    }
}

function validateField($field) {
    if (!$field.is(':visible')) {
        return true; // Skip validation for hidden fields
    }
    const isCheckbox = $field.is(':checkbox');
    const isDropdown = $field.is('select');
    if (isCheckbox) {
        if (!$field.is(':checked')) {
            markFieldInvalid($field, 'This field is required.');
            return false;
        }
    } else if (isDropdown) {
        if (!$field.val() || $field.val().trim() === '') {
            markFieldInvalid($field, 'Please select an option.');
            return false;
        }
    } else {
        if (!$field.val()?.trim()) {
            markFieldInvalid($field, 'This field is required.');
            return false;
        }
    }
    markFieldValid($field);
    return true;
}

// ===================================
// Fetch Metadata
// ===================================

async function fetchMetadata() {
    const userId = getUserId(); // Dynamically fetch the UserID
    const metadataUrl = `${API_CONFIG.baseUrl}/${userId}`;
    const loadingMessage = $('<div>')
        .addClass('alert alert-info d-flex align-items-center')
        .attr('id', 'loading-metadata')
        .html(`
            <div class="spinner-border spinner-border-sm me-2" role="status">
                <span class="visually-hidden">Loading Resources...</span>
            </div>
            ...Please wait.
        `)
        .prependTo('#combined-request-form');
    try {
        let metadata = await $.ajax({
            url: metadataUrl,
            method: "GET",
            headers: {
                ...API_CONFIG.headers,
                'Origin': window.location.origin
            },
            credentials: 'include'
        });
        console.log("Fetched metadata:", metadata);
        return metadata;
    } catch (error) {
        console.error("Error fetching metadata:", error);
        for (let attempt = 1; attempt <= 3; attempt++) {
            console.log(`Retrying metadata fetch (Attempt ${attempt})...`);
            await new Promise(resolve => setTimeout(resolve, 5000));
            try {
                let retryMetadata = await $.ajax({
                    url: metadataUrl,
                    method: "GET",
                    headers: {
                        ...API_CONFIG.headers,
                        'Origin': window.location.origin
                    },
                    credentials: 'include'
                });
                console.log("Fetched metadata on retry:", retryMetadata);
                return retryMetadata;
            } catch (retryError) {
                console.warn(`Retry ${attempt} failed.`);
            }
        }
        throw new Error('Failed to load metadata after multiple attempts.');
    } finally {
        loadingMessage.remove();
    }
}

// ===================================
// Update Form Using Metadata
// ===================================

function updateFormUsingMetadata(metadata) {
    if (!metadata || typeof metadata !== 'object') {
        console.warn("No valid metadata available to update the form.");
        return;
    }
    const storageLimits = metadata.storageTiers || {};
    Object.keys(storageLimits).forEach(tier => {
        const limits = storageLimits[tier];
        $(`#${tier}-capacity`).attr('max', limits.max || 200);
    });
    const allocationDescriptions = metadata.allocationTiers || {};
    Object.keys(allocationDescriptions).forEach(tier => {
        const description = allocationDescriptions[tier].description || "No description available.";
        $(`#${tier}-description`).text(description);
    });
    console.log("Form updated using metadata:", metadata);
}

// ===================================
// Session and Data Handling
// ===================================

async function waitForUserSession() {
    let attempts = 0;
    const maxAttempts = 50;
    while (attempts < maxAttempts) {
        const userIdField = document.querySelector('input[name="uid"]') || 
                        document.querySelector('#uid');
        if (userIdField && userIdField.value) {
            console.log("User ID found:", userIdField.value);
            return userIdField.value;
        }
        if (attempts % 10 === 0) {
            console.log(`Waiting for user session... Attempt ${attempts}`);
        }
        await new Promise(resolve => setTimeout(resolve, 100));
        attempts++;
    }
    throw new Error('Could not get user ID - please ensure you are logged in');
}

function collectFormData() {
    const formData = {
        requestType: $('select[name="request-type"]').val(),
        group: $('#mygroups-group').val(),
        projectName: $('#new-project-name').val(),
        requestCount: $('#su-quantity').val(),                
        capacity: $('#capacity').val(),
        allocationTier: $('input[name="allocation-choice"]:checked').val(),
        storageTier: $('input[name="storage-choice"]:checked').val(),
        shouldShowBilling: $('#billing-information').is(':visible'),
    };
    if (formData.requestType === 'service-unit') {
        formData.newOrRenewal = $('input[name="new-or-renewal"]:checked').val();
        if (formData.newOrRenewal === 'renewal') {
            formData.existingProject = $('input[name="existing-project-allocation"]:checked').val();
        }
    } else if (formData.requestType === 'storage') {
        formData.typeOfRequest = $('input[name="type-of-request"]:checked').val();
        if(formData.typeOfRequest === 'new-storage') {
            formData.group = $('#storage-mygroups-group').val();
            formData.sharedSpaceName = $('#shared-space-name').val();
            formData.project_title = $('#project-title').val();
            formData.storage_size = $('#capacity').val();
        } else if(formData.typeOfRequest === 'increase-storage' || formData.typeOfRequest === 'decrease-storage') {
            formData.storage_size = $('#capacity').val();
            var checkedRadio = $('input[name="selected-st"]:checked');               
            formData.sharedSpaceName = checkedRadio.closest('tr').find('td:nth-child(5)').text().trim();
            formData.storageTier = checkedRadio.closest('tr').find('td:nth-child(4)').text().trim();
            formData.storage_size = $('#capacity').val();
        }
        if (formData.typeOfRequest !== 'new-storage') {
            formData.existingProject = $('input[name="existing-project-storage"]:checked').val();
        }
    }
    return formData;
}

// ===================================
// Enum Mappings
// ===================================

function getTierEnum(tier) {
    const tierMap = {
        'Standard': 'ssz_standard',
        'Instructional': 'ssz_instructional',
        'Paid': 'ssz_paid',
    };
    return tierMap[tier] || 'ssz_standard';
}

function getStorageTierEnum(tier) {
    const tierMap = {
        'SSZ Research Standard': 'ssz_standard',
        'SSZ Research Project': 'ssz_project',
        'Highly Sensitive Data': 'hsz_standard',
    };
    return tierMap[tier] || 'ssz_standard';
}

// ===================================
// Utils Object
// ===================================

const utils = {
    formatBytes: (bytes, decimals = 2) => {
        if (bytes === 0) return '0 TB';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['TB', 'PB', 'EB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    },
    validateGroupName: (name) => {
        return VALIDATION.groupName.test(name);
    },
    validateProjectName: (name) => {
        return VALIDATION.projectName.test(name);
    },
    validateSharedSpaceName: (name) => {
        return VALIDATION.sharedSpaceName.test(name);
    },
    isTierPaid: (tierName, currentSize = 0) => {
        const tier = RESOURCE_TYPES[tierName];
        if (!tier) return false;
        if (typeof tier.isPaid === 'function') {
            return tier.isPaid(currentSize);
        }
        return tier.isPaid;
    },
    handleApiResponse: async (response) => {
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        console.log('API Response:', data);
        return data;
    },
    logApiError: (error, context) => {
        console.error(`API Error (${context}):`, error);
        return error;
    },
    showWaitingMessage: () => {
        return $('<div>')
            .addClass('api-waiting-message')
            .html(`
                <div class="d-flex align-items-center">
                    <div class="spinner-border spinner-border-sm me-2" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div>Loading your groups...</div>
                </div>
            `)
            .prependTo('#combined-request-form');
    },
    removeWaitingMessage: () => {
        $('.api-waiting-message').remove();
    }
};

// ===================================
// Send Email to User
// ===================================

function sendUserEmail(email, payload) {
    const emailSubject = "Your Resource Request Submission";
    const emailBody = `
        Hello,

        Thank you for submitting your request. Here are the details:

        ${JSON.stringify(payload, null, 2).replace(/[$begin:math:display$$end:math:display$]/g, '')}

        Best regards,
        Research Computing Team
    `;
    console.log(`Simulating email to ${email}`);
    console.log(`Subject: ${emailSubject}`);
    console.log(`Body:\n${emailBody}`);
}

// ===================================
// Clear Form Fields
// ===================================

function clearFormFields() {
    const $form = $('#combined-request-form');
    $form[0].reset();
    $form.find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
    $form.find('.invalid-feedback').remove();
    updateFormValidation();
    console.log("Form fields cleared.");
}

// ===================================
// Success and Error Messages
// ===================================

function showErrorMessage(message) {
    $('.alert-danger').remove();
    const errorDiv = $('<div>')
        .addClass('alert alert-danger')
        .text(message);
    $('#combined-request-form').prepend(errorDiv);
    setTimeout(() => errorDiv.remove(), 10000);
}

function showSuccessMessage(message) {
    $('.alert-success').remove();
    const successDiv = $(`
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Success!</strong> ${message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `);
    $('#combined-request-form').prepend(successDiv);
    $('html, body').animate({ scrollTop: 0 }, 'slow');
    setTimeout(() => successDiv.fadeOut(500, () => successDiv.remove()), 10000);
}

// ===================================
// UI Toggles
// ===================================

function toggleRequestFields() {
    const requestType = $('select[name="request-type"]').val();
    $('#common-fields').show();
    if (requestType === 'service-unit') {
        $('#allocation-fields').show();
        $('#storage-fields').hide();
        toggleAllocationFields();
    } else if (requestType === 'storage') {
        $('#allocation-fields').hide();
        $('#storage-fields').show();
        toggleStorageFields();
    } else {
        $('#allocation-fields, #storage-fields').hide();
    }
}

function toggleAllocationFields() {
    const isNew = $('#new-or-renewal-options input[name="new-or-renewal"]:checked').val() === 'new';
    const isRenew = $('#new-or-renewal-options input[name="new-or-renewal"]:checked').val() === 'renewal';
    if (isNew && !isRenew) {
        $('#allocation-fields #new-project-name-container,#su-capacity, #allocation-fields #project-description, #allocation-fields #mygroups-group-container, #allocation-fields #allocation-tier').show();
        $('#existing-projects-allocation').hide();
    } else if (!isNew && isRenew) {
        $('#allocation-fields #new-project-name-container,#su-capacity, #allocation-fields #project-description, #allocation-fields #mygroups-group-container, #allocation-fields #allocation-tier').hide();
        $('#existing-projects-allocation').show();
        populateExistingServiceUnitsTable(consoleData);
    }
}

function toggleStorageFields() {
    const isNewStorage = $('#storage-fields input[name="type-of-request"]:checked').val() === 'new-storage';
    if (isNewStorage) {
        $('#storage-fields #storage-mygroups-container, #storage-fields #storage-capacity, #storage-fields #storage-platform, #storage-fields #shared-space-name-container, #storage-fields #project-title-container').show();
        $('#storage-fields #existing-projects-storage').hide();
    } else {
        if ($('#storage-fields input[name="type-of-request"]:checked').val() === 'increase-storage' ||
            $('#storage-fields input[name="type-of-request"]:checked').val() === 'decrease-storage') {
            $('#storage-fields #storage-capacity').show();
        }
        $('#storage-fields #storage-mygroups-container, #storage-fields #storage-platform, #storage-fields #shared-space-name-container, #storage-fields #project-title-container').hide();
        $('#storage-fields #existing-projects-storage').show();
    }
}

function toggleStorageTierOptions() {
    const isHighlySensitive = $('#storage-tier-options input[name="storage-choice"]:checked').val() === 'Highly Sensitive Data';
    if (isHighlySensitive) {
        $('#storage-tier-options #sensitive-data').show();
        $('#storage-tier-options #standard-data').hide();
    } else {
        $('#storage-tier-options #sensitive-data').hide();
        $('#storage-tier-options #standard-data').show();
    }
}

// ===================================
// Setup Event Handlers
// ===================================

function setupEventHandlers() {
    $(document).on('change', '#request-type', toggleRequestFields);
    $(document).on('change', 'input[name="new-or-renewal"]', function () {
        toggleAllocationFields();
    });
    $(document).on('change', 'input[name="type-of-request"]', toggleStorageFields);
    $(document).on('change', 'input[name="storage-choice"]', toggleStorageTierOptions);
    $(document).on('input change', '#combined-request-form input, #combined-request-form select, #combined-request-form textarea', function (event) {
        if ($(event.target).is('input[name="selected-st"]')) {
            const $selectedRadio = $('input[name="selected-st"]:checked');
            const $parentRow = $selectedRadio.closest('tr');
            const additionalData = $parentRow.attr('data-additional');
            let billingData;
            try {
                billingData = JSON.parse(additionalData);
            } catch (e) {
                console.error("Failed to parse billing data:", e);
            }
            updateBilling(billingData);
        }
        updatePayloadPreview();
        updateBillingVisibility();
    });
    $(document).on('submit', '#combined-request-form', handleFormSubmit);
    $(document).on("change", 'input[name="selected-su"]', function (event) {
        const $selectedRadio = $('input[name="selected-su"]:checked');
        const $parentRow = $selectedRadio.closest('tr');
        const additionalData = $parentRow.attr('data-additional');
        let billingData;
        try {
            billingData = JSON.parse(additionalData);
        } catch (e) {
            console.error("Failed to parse billing data:", e);
        }
        updateBilling(billingData);
        $('#financial-contact, #company-id, #cost-center, #business-unit, #funding-number, #business-unit, #fund, #program, #function, #activity, #assignee')
            .prop('readonly', false);
        console.log("Billing fields successfully autofilled in the UI.");
    });
}

// ===================================
// Submission Handlers
// ===================================

async function handleFormSubmit(event) {
    event.preventDefault();
    console.log("Form submission triggered.");
    const formData = collectFormData();
    const payload = buildPayloadPreview();
    const errors = validatePayload(payload);
    if (errors.length > 0) {
        displayValidationErrors(errors);
        return;
    }
    try {
        const isRenewal = formData.newOrRenewal === 'renewal';
        var method = isRenewal ? 'PUT' : 'POST';
        if(formData.requestType==="storage" && (formData.typeOfRequest === 'increase-storage' || formData.typeOfRequest === 'decrease-storage')){
            method = 'PUT';
        }
        console.log(`Submitting ${isRenewal ? 'Renewal (PUT)' : 'New Request (POST)'}...`);
        const responseData = await submitForm(formData, payload, method);
        if (responseData) {
            console.log("API Response:", responseData);
            showSuccessMessage("Your request has been submitted successfully!");
            if (isRenewal) {
                updateServiceUnitTimestamp(formData.existingProject);
            }
            clearFormFields();
        }
    } catch (error) {
        console.error("Error during form submission:", error);
        showErrorMessage("An error occurred while submitting the form. Please try again.");
    }
}

// ===================================
// Error Handlers
// ===================================

function displayValidationErrors(errors) {
    const errorDiv = $('<div>')
        .addClass('alert alert-danger')
        .html(`
            <strong>Validation Errors:</strong>
            <ul>${errors.map(err => `<li>${err}</li>`).join('')}</ul>
        `);
    $('#combined-request-form').prepend(errorDiv);
    setTimeout(() => errorDiv.remove(), 10000);
    console.error("Validation errors:", errors);
}

// ===================================
// Submit Form (Using jQuery AJAX)
// ===================================

async function submitForm(formData, payload) {
    const userId = getUserId();
    const userEmail = `${userId}@virginia.edu`;
    console.log("Submitting payload for user:", userId);
    console.log("User email:", userEmail);
    const isRenewal = formData.newOrRenewal === 'renewal';
    const isRetire = formData.typeOfRequest === 'retire-storage';
    var method = isRenewal ? 'PUT' : 'POST';
    if(isRetire){
        method = 'DELETE';
    }
    console.log(`Submitting ${method} request for ${isRenewal ? "Renewal" : "New Request"}...`);
    let requestUrl = `${API_CONFIG.baseUrl}/${userId}`;
    if (isRenewal && formData.existingProject) {
        requestUrl += `/${formData.existingProject}`;
    }
    if(isRetire){
        const requestType = formData.requestType==="storage" ? "storage" : "hpc_service-units";
        const group = $('input[name="selected-st"]:checked').closest('tr').find('td').eq(2).text().trim();
        const requestName = $('input[name="selected-st"]:checked').closest('tr').find('td').eq(4).text().trim();
        requestUrl += `?group_name=${group}&resource_request_type=${requestType}&resource_requst_name=${requestName}`;
    }
    if (isRenewal && payload.length > 0 && payload[0].trigger_notification) {
        console.log("Triggering notification for renewal request.");
    }
    var settings = {};
    if(!isRetire){
        settings = {
            "url": requestUrl, 
            "method": method, 
            "timeout": 0, 
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify(payload), 
            "xhrFields": { 
                withCredentials: true
            }
        };
    } else {
         settings = {
            "url": requestUrl, 
            "method": method, 
            "timeout": 0, 
            "headers": {
                "Content-Type": "application/json"
            },
            "xhrFields": { 
                withCredentials: true
            }
        };
    }
    try {
        const response = await $.ajax(settings);
        console.log(`Form ${method === 'PUT' ? 'updated' : 'submitted'} successfully:`, response);
        showSuccessMessage(isRenewal ? "Your renewal request has been submitted successfully!" : "Your request has been submitted successfully!");
        if (isRenewal && formData.existingProject) {
            updateServiceUnitTimestamp(formData.existingProject);
        }
        updateFormUsingMetadata(await fetchMetadata());
        $('#submit').prop('disabled', false);
        clearFormFields();
        return response;
    } catch (error) {
        console.error(`Submission failed (${method}):`, error.responseText || error);
        showErrorMessage("Submission failed. Please try again.");
        $('#submit').prop('disabled', false);
        return null;
    }
}

// ===================================
// Capacity and Visibility
// ===================================

function updateCapacityLimits(tierType) {
    const capacityField = $('#capacity');
    if (!apiMetadata || !apiMetadata.storageTiers) {
        console.warn("No metadata available for capacity limits.");
        return;
    }
    const tierData = apiMetadata.storageTiers[tierType];
    if (tierData) {
        capacityField.attr('max', tierData.max || 200);
        console.log(`Updated capacity limits for ${tierType}:`, tierData);
    } else {
        console.warn(`No limits found for storage tier: ${tierType}`);
    }
}

function updateBilling(billingData) {
    if (billingData) {
        if (billingData[0].project && typeof billingData[0].project === 'string' && billingData[0].project.trim().length > 0) {
            $('#funding-number').val(billingData[0].project || '');
        }
        $('#financial-contact').val(billingData[0].financial_contact || '');
        $('#company-id').val(billingData[0].company || '');
        $('#business-unit').val(billingData[0].business_unit || '');
        $('#cost-center').val(billingData[0].cost_center || '');
        $('#fund').val(billingData[0].fund || '');
        $('#program').val(billingData[0].program_code || '');
        $('#function').val(billingData[0].function || '');
        $('#activity').val(billingData[0].activity || '');
        $('#assignee').val(billingData[0].assignee || '');
        console.log("Billing data updated from existing line:", billingData);
        $('#financial-contact').trigger("change").trigger("input");
    }
}

function updateBillingVisibility() {
    const requestType = $('select[name="request-type"]').val();
    const selectedStorageTier = $('input[name="storage-choice"]:checked').val();
    const requestedStorageSize = parseInt($('#capacity').val(), 10) || 0;
    let shouldShowBilling = true;
    $('#billing-information').toggle(shouldShowBilling);
    console.log(`Billing visibility updated: ${shouldShowBilling}`);
}

function getBillingDetails() {
    const billingArray = [];
    $('.billing-block').each(function () {
        const index = $(this).data('index');
        billingArray.push({
            financial_contact: $(this).find(`#fdm-id-${index}`).val()?.trim() || '',
            company: $(this).find(`#company-id-${index}`).val()?.trim() || '',
            business_unit: $(this).find(`#business-unit-${index}`).val()?.trim() || '',
            cost_center: $(this).find(`#cost-center-${index}`).val()?.trim() || '',
            fund: $(this).find(`#fund-${index}`).val()?.trim() || '',
            // Additional fields can be collected here
        });
    });
    return { fdm_billing_info: billingArray };
}

// ===================================
// Real-Time Payload Preview
// ===================================

function setupPayloadPreviewUpdater() {
    $('#combined-request-form input, #combined-request-form select, #combined-request-form textarea')
        .on('input change', function () {
            updatePayloadPreview();
        });
    console.log("Payload preview updater initialized.");
}

let previousPayloadString = "";
let previousErrorsString = "";

function updatePayloadPreview() {
    console.log("updatePayloadPreview() triggered.");
    const isDataAgreementChecked = $('#data-agreement').is(':checked');
    if (!isDataAgreementChecked) {
        console.warn("⚠ Data Agreement checkbox is NOT checked. Skipping payload validation.");
        $('#submit').prop('disabled', true);
        return;
    }
    const payload = buildPayloadPreview();
    if (!payload) {
        console.warn("⚠ Payload generation failed. No preview available.");
        return;
    }
    const errors = validatePayload(payload);
    const payloadString = JSON.stringify(payload, null, 2);
    const errorsString = JSON.stringify(errors, null, 2);
    if (payloadString !== previousPayloadString) {
        console.log("Updated Payload Preview:", payload);
        previousPayloadString = payloadString;
    }
    if (errorsString !== previousErrorsString) {
        if (errors.length > 0) {
            console.warn("⚠ Validation Errors:", errors);
            $('#submit').prop('disabled', true);
        } else {
            console.log("Payload is valid.");
            $('#submit').prop('disabled', false);
        }
        previousErrorsString = errorsString;
    }
}

function buildPayloadPreview() {
    const formData = collectFormData();
    const userId = getUserId();
    const billingDetails = getBillingDetails();
    const storageChange = formData.typeOfRequest === 'increase-storage' || formData.typeOfRequest === 'decrease-storage';
    var selectedSU = "n/a";
    let selectedGroup, selectedTier;
    if (formData.newOrRenewal === "renewal") {
        selectedSU = $('input[name="selected-su"]:checked').val();
        if (selectedSU) {
            var checkedRadio = $('input[name="selected-su"]:checked');
            selectedTier = checkedRadio.closest('tr').find('td:nth-child(4)').text().trim();
            selectedGroup = checkedRadio.closest('tr').find('td:nth-child(3)').text().trim();
        }
    } else if (formData.requestType === "storage") {
        selectedGroup = formData.group ? formData.group.trim() : "";
        selectedTier = formData.storageTier ? getStorageTierEnum(formData.storageTier) : "";
    } else {
        selectedGroup = formData.group ? formData.group.trim() : "";
        selectedTier = getTierEnum(formData.allocationTier);
    }
    if (!storageChange && (!selectedGroup || !selectedTier)) {
        console.error(`⚠ Missing required values: Group: ${selectedGroup}, Tier: ${selectedTier}`);
        showErrorMessage("⚠ Please select a valid Group and Tier.");
        return null;
    }
    if (formData.newOrRenewal === "renewal") {
        let existingResource = consoleData[0]?.user_resources?.find(resource =>
            resource.group_name.toLowerCase() === selectedGroup.toLowerCase() &&
            resource.resources?.hpc_service_units?.[selectedSU]?.tier.toLowerCase() === selectedTier.toLowerCase()
        );
        if (!existingResource) {
            showErrorMessage(`⚠ The selected Group and Tier do not match any existing resources.`);
            return null;
        }
        console.log(`Renewal detected: ${selectedGroup} - ${selectedTier}. Fetching existing SU details.`);
        const existingRequestCount = existingResource.resources?.hpc_service_units?.[selectedGroup]?.request_count || "50000";
        const renewalPayload = {
            "group_name": selectedGroup,
            "project_name": existingResource.project_name,
            "project_desc": existingResource.project_desc,
            "data_agreement_signed": existingResource.data_agreement_signed,
            "pi_uid": userId,
            "resources": {
                "hpc_service_units": {
                    [selectedGroup]: {
                        "tier": selectedTier,
                        "request_count": existingRequestCount,
                        "billing_details": billingDetails,
                        "update_date": new Date().toISOString()
                    }
                }
            },
            "trigger_notification": true
        };
        console.log("Final Renewal Payload (PUT):", JSON.stringify(renewalPayload, null, 2));
        return [renewalPayload];
    }
    if (formData.requestType === "storage" && (formData.typeOfRequest === 'increase-storage' || formData.typeOfRequest === 'decrease-storage')) {
        const changePayload = {
            "storage": {
                [formData.sharedSpaceName]: {
                    "tier": selectedTier,
                    "request_size": formData.capacity,
                    "billing_details": billingDetails
                }
            }
        };
        console.log("Final Storage Change Payload (PUT):", JSON.stringify(changePayload, null, 2));
        return [changePayload];
    }
    const hpcServiceUnitKey = selectedGroup;
    let newResource = {};
    if (formData.requestType === "storage") {
        newResource = {
            "group_name": selectedGroup,                
            "data_agreement_signed": $('#data-agreement').is(':checked'),
            "pi_uid": userId,
            "project_name": "",
            "project_desc": "",
            "resources": {
                "storage": {
                    [hpcServiceUnitKey]: {
                        "tier": selectedTier,
                        "shared_space_name": formData.sharedSpaceName?.trim() || "Shared Space",
                        "storage_size": formData.storage_size || "0",
                        "project_title": formData.project_title?.trim() || "Project Title",                            
                        "billing_details": billingDetails
                    }
                }
            }
        };
    } else {
        newResource = {
            "group_name": selectedGroup,
            "project_name": formData.projectName?.trim() || "Test Project",
            "project_desc": $('#project-description').val()?.trim() || "This is free text",
            "data_agreement_signed": $('#data-agreement').is(':checked'),
            "pi_uid": userId,
            "resources": {
                "hpc_service_units": {
                    [hpcServiceUnitKey]: {
                        "tier": selectedTier,
                        "request_count": formData.requestCount || "1000",
                        "billing_details": billingDetails
                    }
                }
            }
        };
    }
    console.log("Final New Request Payload (POST):", JSON.stringify(newResource, null, 2));
    return [newResource];
}

function validatePayload(payload) {
    const errors = [];
    if($('input[name="type-of-request"]:checked').val() === 'retire-storage'){
        return errors;
    }
    if (!Array.isArray(payload) || payload.length !== 1) {
        errors.push("Payload must be an array containing a single object.");
        return errors;
    }
    const resourceWrapper = payload[0];
    const isRenewal = $('input[name="new-or-renewal"]:checked').val() === 'renewal';
    var isStorage = $('select[name="request-type"]').val() === 'storage';
    var isStorageChange = $('input[name="type-of-request"]:checked').val() === 'increase-storage' || $('input[name="type-of-request"]:checked').val() === 'decrease-storage';
    if (isRenewal) {
        if (!resourceWrapper.group_name || !resourceWrapper.resources?.hpc_service_units) {
            errors.push("Renewal request must include a valid Group and existing HPC Service Unit.");
        }
        const hpcKeys = Object.keys(resourceWrapper.resources?.hpc_service_units || {});
        if (hpcKeys.length === 0 || !resourceWrapper.resources.hpc_service_units[hpcKeys[0]].update_date) {
            errors.push("Renewal request must include an update_date field.");
        }
        return errors;
    }
    if(isStorage && !isStorageChange){
        Object.values(payload[0].resources.storage).forEach((group, index) => {
            if (!group.tier) {
                console.log(`You must select a storage tier.`);
            } 
            if(!group.storage_size || group.storage_size === "0") {
                console.log(`You must have a storage size > 0.`);
            }
            if(isStorageChange){
                if(!group.request_size || group.request_size === "0") {
                    console.log(`You must have a request size > 0.`);
                }
            }
        });
        return errors;
    }
    const seenGroupTiers = new Set();
    if (!Array.isArray(resourceWrapper.user_resources)) {
        resourceWrapper.user_resources = [];
    }
    resourceWrapper.user_resources.forEach((resource, resIndex) => {
        const resourceLabel = `Resource ${resIndex + 1}`;
        if (typeof resource.data_agreement_signed !== "boolean") {
            errors.push(`${resourceLabel}: 'data_agreement_signed' must be true or false.`);
        }
        if (!resource.group_name || typeof resource.group_name !== "string" || resource.group_name.trim() === "") {
            errors.push(`${resourceLabel}: 'group_name' is required.`);
        }
        if (!resource.pi_uid || typeof resource.pi_uid !== "string" || resource.pi_uid.trim() === "") {
            errors.push(`${resourceLabel}: 'pi_uid' (user ID) is required.`);
        }
        if (!resource.project_name || typeof resource.project_name !== "string" || resource.project_name.trim() === "") {
            errors.push(`${resourceLabel}: 'project_name' is required.`);
        }
        if (!resource.resources || typeof resource.resources !== "object") {
            errors.push(`${resourceLabel}: 'resources' section is required.`);
            return;
        }
        if (!resource.resources.hpc_service_units) {
            errors.push(`${resourceLabel}: 'hpc_service_units' is required.`);
        } else {
            Object.entries(resource.resources.hpc_service_units).forEach(([key, unit]) => {
                const groupTierKey = `${resource.group_name.toLowerCase()}-${unit.tier}`;
                if (seenGroupTiers.has(groupTierKey)) {
                    errors.push(`${resourceLabel}: Duplicate request for Group '${resource.group_name}' and Tier '${unit.tier}' detected.`);
                } else {
                    seenGroupTiers.add(groupTierKey);
                }
                if (!unit.billing_details || !unit.billing_details.fdm_billing_info) {
                    errors.push(`${resourceLabel} - ${key}: 'billing_details' is required.`);
                }
            });
        }
    });
    return errors;
}

// ===================================
// Billing Block: Adding Multiple Payment Information Blocks
// ===================================

// Global counter for billing blocks
let billingBlockIndex = 0;

// Function to add a new billing block
function addBillingBlock() {
    const template = document.getElementById('billing-block-template').innerHTML;
    const newBlockHtml = template.replace(/__INDEX__/g, billingBlockIndex);
    $('#billing-container').append(newBlockHtml);
    billingBlockIndex++;
}

// Setup event handler for adding billing block
$(document).on('click', '#add-billing-block', function () {
    addBillingBlock();
});

// Add an initial billing block on document ready (if needed)
$(document).ready(function () {
    addBillingBlock();
});

// ===================================
// Fetch and Populate Groups
// ===================================

async function fetchAndPopulateGroups() {
    const waitingMessage = utils?.showWaitingMessage?.() || $('<div>').text('Loading...').prependTo('#combined-request-form');
    try {
        const userId = getUserId(); 
        console.log(`Attempting API call for user: ${userId}`);
        const requestUrl = `${API_CONFIG.baseUrl}/${userId}`;
        console.log("Request URL:", requestUrl);
        const jsonResponse = await $.ajax({
            url: requestUrl,
            method: "GET",
            headers: {
                ...API_CONFIG.headers,
                'Origin': window.location.origin
            },
            credentials: 'include'
        });
        consoleData = jsonResponse; 
        console.log("Fetched groups and resources:", consoleData);
        const { userGroups, userResources } = parseConsoleData(jsonResponse);
        if (Array.isArray(userGroups) && userGroups.length > 0) {
            console.log("Populating user groups:", userGroups);
            populateGrouperMyGroupsDropdown(userGroups);
        } else {
            console.warn("No user groups found.");
            populateGrouperMyGroupsDropdown([]);
        }
        if (Array.isArray(userResources) && userResources.length > 0) {
            console.log("Processing user resources...");
            processUserResources(jsonResponse);
        } else {
            console.warn("No user resources found.");
        }
    } catch (error) {
        console.error("Error fetching user groups:", error);
        handleApiError(error);
    } finally {
        utils?.removeWaitingMessage?.() || waitingMessage.remove();
    }
}

// ===================================
// Resource Processing Functions
// ===================================

function parseConsoleData(data) {
    if (!Array.isArray(data) || data.length === 0) {
        console.error("Invalid consoleData format or empty data:", data);
        return { userGroups: [], userResources: [] };
    }
    const userGroups = data[0]?.user_groups || [];
    const userResources = (() => {
        try {
            return typeof data[0]?.user_resources === 'string'
                ? JSON.parse(data[0]?.user_resources)
                : data[0]?.user_resources || [];
        } catch (error) {
            console.error("Error parsing user_resources:", error);
            return [];
        }
    })();
    console.log("Parsed user groups:", userGroups);
    console.log("Parsed user resources:", userResources);
    return { userGroups, userResources };
}

function populateGrouperMyGroupsDropdown(groups) {
    const $dropdowns = $('#mygroups-group, #storage-mygroups-group');
    $dropdowns.each(function () {
        const $dropdown = $(this);
        const currentValue = $dropdown.val();
        $dropdown.empty();
        $dropdown.append(
            $('<option>', {
                value: '',
                text: '- Select a group -',
                selected: true,
                disabled: true
            })
        );
        console.log(`Populating dropdown: ${$dropdown.attr('id')} with groups:`, groups);
        if (groups.length) {
            groups.forEach(group => {
                const groupName = typeof group === 'string' ? group : group.name;
                const option = $('<option>', {
                    value: groupName.trim(),
                    text: groupName.trim(),
                });
                if (groupName.trim() === currentValue) {
                    option.prop('selected', true);
                }
                $dropdown.append(option);
            });
            $dropdown.prop('disabled', false);
        } else {
            console.warn("No groups found to populate.");
            $dropdown.append(
                $('<option>', {
                    value: '',
                    text: 'No groups available - contact support',
                    disabled: true,
                })
            );
            $dropdown.prop('disabled', true);
        }
        $dropdown.trigger('change');
    });
    console.log('Dropdowns populated successfully.');
}

function createResourceRow({ type, group, tier, details }) {
    return `
        <tr>
            <td>${type}</td>
            <td>${group}</td>
            <td>${tier}</td>
            <td>${details}</td>
        </tr>
    `;
}

function processUserResources(apiResponse) {
    const { userResources } = parseConsoleData(apiResponse);
    const previewTableBody = $('#combined-preview-tbody');
    previewTableBody.empty();
    if (!Array.isArray(userResources) || userResources.length === 0) {
        showEmptyState(previewTableBody);
        return;
    }
    userResources.sort((a, b) => {
        const dateA = new Date(a.resources?.hpc_service_units?.[Object.keys(a.resources.hpc_service_units)[0]]?.update_date || 
                               a.resources?.hpc_service_units?.[Object.keys(a.resources.hpc_service_units)[0]]?.request_date || 0);
        const dateB = new Date(b.resources?.hpc_service_units?.[Object.keys(b.resources.hpc_service_units)[0]]?.update_date || 
                               b.resources?.hpc_service_units?.[Object.keys(b.resources.hpc_service_units)[0]]?.request_date || 0);
        return dateB - dateA;
    });
    userResources.forEach(resource => {
        const projectName = resource.project_name || "N/A";
        const groupName = resource.group_name || "N/A";
        let resourceType = "Unknown";
        if ( resource.resources?.hpc_service_units &&
            Object.keys(resource.resources.hpc_service_units).length > 0) {
            resourceType = "SU";
        } 
        if (resourceType==="SU" && resource.resources?.hpc_service_units) {
            Object.entries(resource.resources.hpc_service_units).forEach(([allocationName, details]) => {
                const tier = details.tier || "N/A";
                const requestCount = details.request_count ? `${details.request_count} SUs` : "N/A";
                var shortDate = formatDateToEST(details.update_date || details.request_date);
                const request_status = details.request_status || "N/A";
                const updateDate = details.update_date ? `Updated: ${shortDate}` : `Requested: ${shortDate || "No date available"}`;
                const row = `
                    <tr>
                        <td>${resourceType}</td>
                        <td>${projectName}</td> 
                        <td>${groupName}</td>
                        <td>${tier}</td>
                        <td>${requestCount}</td>
                        <td>${request_status}</td>
                        <td>${updateDate}</td>
                    </tr>
                `;
                previewTableBody.append(row);
            });
        } 
        if (resource.resources?.storage &&
            Object.keys(resource.resources.storage).length > 0) {
            resourceType = "Storage";
        }
        if(resourceType==="Storage" && resource.resources?.storage) {
            Object.entries(resource.resources.storage).forEach(([allocationName, details]) => {
                const tier = details.tier || "N/A";
                const storageSize = details.storage_size ? `${details.storage_size} TB` : "N/A";
                var shortDate = formatDateToEST(details.update_date || details.request_date);
                const request_status = details.request_status || "N/A";
                const updateDate = details.update_date ? `Updated: ${shortDate}` : `Requested: ${shortDate || "No date available"}`;
                const sharedSpace = details.shared_space_name ? `${details.shared_space_name}` : "N/A";
                const billingJson = JSON.stringify(details.billing_details.fdm_billing_info);
                const row = `
                    <tr data-additional='${billingJson}'>
                        <td>
                            <input type="radio" name="selected-st" value="${groupName}-${tier}" 
                                data-group="${groupName}" data-tier="${tier}">
                        </td>
                        <td>${projectName}</td> 
                        <td>${groupName}</td>
                        <td>${tier}</td>
                        <td>${sharedSpace}</td>
                        <td>${storageSize}</td>
                    </tr>
                `;
                previewTableBody.append(row);
            });
        }
    });
    populateExistingServiceUnitsTable(apiResponse);
    populateExistingStorageTable(apiResponse);
}

function populateExistingStorageTable(apiResponse) {
    const { userResources } = parseConsoleData(apiResponse);
    const suTableBody = $('#storage-projects-tbody');
    suTableBody.empty();
    if (!Array.isArray(userResources) || userResources.length === 0) {
        suTableBody.append('<tr><td colspan="4" class="text-center">No existing storage available.</td></tr>');
        return;
    }
    userResources.sort((a, b) => {
        const dateA = new Date(a.resources?.storage?.[Object.keys(a.resources.storage)[0]]?.update_date || 
                               a.resources?.storage?.[Object.keys(a.resources.storage)[0]]?.request_date || 0);
        const dateB = new Date(b.resources?.storage?.[Object.keys(b.resources.storage)[0]]?.update_date || 
                               b.resources?.storage?.[Object.keys(b.resources.storage)[0]]?.request_date || 0);
        return dateB - dateA;
    });
    userResources.forEach(resource => {
        const projectName = resource.project_name || "N/A";
        const groupName = resource.group_name || "N/A";
        if (resource.resources?.storage) {
            Object.entries(resource.resources.storage).forEach(([allocationName, details]) => {
                const tier = details.tier || "N/A";
                const storageSize = details.storage_size ? `${details.storage_size} TB` : "N/A";
                var shortDate = formatDateToEST(details.update_date || details.request_date);
                const updateDate = details.update_date ? `Updated: ${shortDate}` : `Requested: ${shortDate || "No date available"}`;
                const sharedSpace = details.shared_space_name ? `${details.shared_space_name}` : "N/A";
                const billingJson = JSON.stringify(details.billing_details.fdm_billing_info);
                const row = `
                    <tr data-additional='${billingJson}'>
                        <td>
                            <input type="radio" name="selected-st" value="${groupName}-${tier}" 
                                data-group="${groupName}" data-tier="${tier}">
                        </td>
                        <td>${projectName}</td> 
                        <td>${groupName}</td>
                        <td>${tier}</td>
                        <td>${sharedSpace}</td>
                        <td>${storageSize}</td>
                    </tr>
                `;
                suTableBody.append(row);
            });
        }
    });
    console.log("Existing Service Units table updated!");
}

function populateExistingServiceUnitsTable(apiResponse) {
    const { userResources } = parseConsoleData(apiResponse);
    const suTableBody = $('#allocation-projects-tbody');
    suTableBody.empty();
    if (!Array.isArray(userResources) || userResources.length === 0) {
        suTableBody.append('<tr><td colspan="4" class="text-center">No existing service units available.</td></tr>');
        return;
    }
    userResources.forEach(resource => {
        const projectName = resource.project_name || "N/A";
        const groupName = resource.group_name || "N/A";
        if (resource.resources?.hpc_service_units) {
            Object.entries(resource.resources.hpc_service_units).forEach(([allocationName, details]) => {
                const tier = details.tier || "N/A";
                const requestCount = details.request_count ? `${details.request_count} SUs` : "N/A";
                const updateDate = details.update_date ? `Updated: ${formatDateToEST(details.update_date)}` : `Requested: ${formatDateToEST(details.request_date)}`;
                const billingJson = JSON.stringify(details.billing_details.fdm_billing_info);
                const row = `
                    <tr data-additional='${billingJson}'>
                        <td>
                            <input type="radio" name="selected-su" value="${groupName}-${tier}" 
                                data-group="${groupName}" data-tier="${tier}" data-project="${projectName}">
                        </td>
                        <td>${projectName}</td> 
                        <td>${groupName}</td>
                        <td>${tier}</td>
                        <td>${requestCount} | ${updateDate}</td>
                    </tr>
                `;
                suTableBody.append(row);
            });
        }
    });
    console.log("Existing Service Units table updated!");
}

function updateServiceUnitTimestamp(selectedSU) {
    if (!selectedSU) {
        console.warn("⚠ No selected service unit to update timestamp.");
        return;
    }
    const now = new Date().toISOString();
    $('#allocation-projects-tbody tr').each(function () {
        const group = $(this).find("td:eq(2)").text().trim();
        const tier = $(this).find("td:eq(3)").text().trim();
        const matchValue = `${group}-${tier}`;
        if (matchValue === selectedSU) {
            console.log(`Updating timestamp for renewal: ${matchValue}`);
            $(this).find("td:eq(4)").text(`Updated: ${now}`);
        }
    });
    console.log("Service Unit timestamp updated.");
}

// ===================================
// Update Form Validation
// ===================================

function updateFormValidation() {
    const $form = $('#combined-request-form');
    const requestType = $('select[name="request-type"]').val();
    const visibleFieldsSelector = requestType === 'service-unit'
        ? '#allocation-fields input[required]:visible, #allocation-fields select[required]:visible'
        : '#storage-fields input[required]:visible, #storage-fields select[required]:visible';
    const requiredFields = $form.find(visibleFieldsSelector);
    const isFormValid = requiredFields.toArray().every(field => validateField($(field)));
    $('#submit').prop('disabled', !isFormValid);
}

// ===================================
// Initialization Function
// ===================================

async function initialize() {
    console.log("Initializing form...");
    try {
        $('#allocation-fields, #storage-fields, #common-fields, #billing-information').hide();
        const loadingMessage = $('<div>')
            .addClass('alert alert-info d-flex align-items-center')
            .attr('id', 'loading-message')
            .html(`
                <div class="spinner-border spinner-border-sm me-2" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
                Initializing the form. Please wait...
            `)
            .prependTo('#combined-request-form');
        const metadataTimeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Metadata loading timed out.')), 15000)
        );
        apiMetadata = await Promise.race([fetchMetadata(), metadataTimeout]);
        if (!apiMetadata) {
            throw new Error("Metadata fetch failed.");
        }
        console.log("Metadata successfully fetched:", apiMetadata);
        updateFormUsingMetadata(apiMetadata);
        await fetchAndPopulateGroups();
        setupEventHandlers();
        setupPayloadPreviewUpdater();
        toggleRequestFields();
        updateFormValidation();
        console.log("Form initialization complete.");
    } catch (error) {
        console.error("Error during form initialization:", error);
        showErrorMessage("Failed to load user information. Please refresh the page or contact support if the issue persists.");
    } finally {
        $('#loading-message').fadeOut(300, function() { $(this).remove(); });
    }
}

function formatDateToEST(isoDateStr) {
    const dateObj = new Date(isoDateStr);
    const options = {
      timeZone: "America/New_York",
      year: "2-digit",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true
    };
    const formatted = dateObj.toLocaleString("en-US", options);
    return `${formatted} EST`;
}

$(document).ready(function () {
    console.log("Script started");
    console.log("Updated Combined Request Form JS loaded");
    initialize();
});
