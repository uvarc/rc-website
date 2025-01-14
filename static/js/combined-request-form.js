$(document).ready(function () {
    console.log("Script started");
    console.log("Updated Combined Request Form JS loaded");

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

        /// Get UserID

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

        /// Core Helper Functions

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

        /// Fetch Metadata

        async function fetchMetadata() {
            const userId = getUserId(); // Dynamically fetch the UserID
            const metadataUrl = `${API_CONFIG.baseUrl}/${userId}`; // Construct the correct URL
        
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
                const response = await fetch(metadataUrl, {
                    method: 'GET',
                    headers: {
                        ...API_CONFIG.headers,
                        'Origin': window.location.origin, // Dynamically include origin
                    },
                    credentials: 'include'
                });
        
                if (!response.ok) {
                    throw new Error(`Failed to fetch metadata: ${response.statusText}`);
                }
        
                const metadata = await response.json();
                console.log("Fetched metadata:", metadata);
                return metadata;
            } catch (error) {
                console.error("Error fetching metadata:", error);
        
                // Retry logic
                for (let attempt = 1; attempt <= 3; attempt++) {
                    console.log(`Retrying metadata fetch (Attempt ${attempt})...`);
                    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds between retries
        
                    try {
                        const response = await fetch(metadataUrl, {
                            method: 'GET',
                            headers: {
                                ...API_CONFIG.headers,
                                'Origin': window.location.origin,
                            },
                            credentials: 'include'
                        });
        
                        if (response.ok) {
                            const metadata = await response.json();
                            console.log("Fetched metadata on retry:", metadata);
                            return metadata;
                        }
                    } catch (retryError) {
                        console.warn(`Retry ${attempt} failed.`);
                    }
                }
        
                throw new Error('Failed to load metadata after multiple attempts.');
            } finally {
                loadingMessage.remove(); // Remove the loading message
            }
        }

        /// Update Form Using Metadata

        function updateFormUsingMetadata(metadata) {
            if (!metadata || typeof metadata !== 'object') {
                console.warn("No valid metadata available to update the form.");
                return;
            }
        
            // Example: Update capacity limits based on metadata
            const storageLimits = metadata.storageTiers || {};
            Object.keys(storageLimits).forEach(tier => {
                const limits = storageLimits[tier];
                $(`#${tier}-capacity`).attr('max', limits.max || 200);
            });
        
            // Example: Populate tier-specific descriptions
            const allocationDescriptions = metadata.allocationTiers || {};
            Object.keys(allocationDescriptions).forEach(tier => {
                const description = allocationDescriptions[tier].description || "No description available.";
                $(`#${tier}-description`).text(description);
            });
        
            console.log("Form updated using metadata:", metadata);
        }

        /// Session and Data Handling

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
                requestType: $('input[name="request-type"]:checked').val(),
                group: $('#mygroups-group').val(),
                projectName: $('#new-project-name').val(),
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
                if (formData.typeOfRequest !== 'new-storage') {
                    formData.existingProject = $('input[name="existing-project-storage"]:checked').val();
                }
            }
        
            return formData;
        }

        /// Enum Mappings

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
            return tierMap[tier] || 'ssz_standard'; // Default to 'ssz_standard' if no match
        }

        /// Utils Object

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
        }
    
        /// Send Email to User

        function sendUserEmail(email, payload) {
            const emailSubject = "Your Resource Request Submission";
            const emailBody = `
                Hello,
        
                Thank you for submitting your request. Here are the details:
        
                ${JSON.stringify(payload, null, 2).replace(/[$begin:math:display$$end:math:display$]/g, '')}
        
                Best regards,
                Research Computing Team
            `;
        
            // Simulate sending email (replace with API call for production)
            console.log(`Simulating email to ${email}`);
            console.log(`Subject: ${emailSubject}`);
            console.log(`Body:\n${emailBody}`);
        }

        /// Clear Form Fields

        function clearFormFields() {
            const $form = $('#combined-request-form');
            $form[0].reset(); // Reset all form fields
            $form.find('.is-valid, .is-invalid').removeClass('is-valid is-invalid'); // Remove validation styles
            $form.find('.invalid-feedback').remove(); // Remove error messages
            updateFormValidation(); // Revalidate to disable the submit button
            console.log("Form fields cleared.");
        }

        /// Success Message

        function showErrorMessage(message) {
            const errorDiv = $('<div>').addClass('alert alert-danger').text(message);
            $('#combined-request-form').prepend(errorDiv);
            setTimeout(() => errorDiv.remove(), 10000); // Set consistent timeout
        }
        
        function showSuccessMessage(message) {
            const successDiv = $('<div>')
                .addClass('alert alert-success alert-dismissible fade show')
                .attr('role', 'alert')
                .html(`
                    ${message}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                `);
        
            $('#combined-request-form').prepend(successDiv);
            $('html, body').animate({ scrollTop: 0 }, 'slow');
            setTimeout(() => successDiv.remove(), 10000); // Set consistent timeout
        }

    // ===================================
    // Error Handling
    // ===================================

    function showErrorMessage(message) {
        const errorDiv = $('<div>').addClass('alert alert-danger').text(message);
        $('#combined-request-form').prepend(errorDiv);
        setTimeout(() => errorDiv.remove(), 10000); // Set consistent timeout
    }

    function handleApiError(error) {
        const message = `There was an error processing your request. (${error.message || "Unknown error"})`;
        console.error("API Error:", error);
        $('#combined-request-form').prepend(
            $('<div>')
                .addClass('alert alert-danger')
                .text(message)
        );
    }
    
    function logApiError(error, context) {
        console.error(`API Error (${context}):`, error);
    }

    // ===================================
    // UI Toggles
    // ===================================

    function toggleRequestFields() {
        const requestType = $('input[name="request-type"]:checked').val();
    
        // Show or hide top-level containers
        $('#allocation-fields').toggle(requestType === 'service-unit');
        $('#storage-fields').toggle(requestType === 'storage');
    
        // Trigger corresponding toggle functions to handle nested fields
        if (requestType === 'service-unit') {
            toggleAllocationFields(); // Update allocation fields
        } else if (requestType === 'storage') {
            toggleStorageFields(); // Update storage fields
        }
    
        updateFormValidation(); // Revalidate the form after toggling
    }

    function toggleAllocationFields() {
        const newOrRenewal = $('input[name="new-or-renewal"]:checked').val();
        const isNew = newOrRenewal === 'new';
    
        // Toggle fields for New vs. Renewal
        $('#new-project-name-container, #project-description').toggle(isNew);
        $('#existing-projects-allocation').toggle(!isNew);
    
        // Hide unused fields
        if (isNew) {
            $('#existing-projects-allocation input').val('');
        } else {
            $('#new-project-name-container input, #project-description textarea').val('');
        }
    
        updateFormValidation();
    }

    function toggleStorageFields() {
        const typeOfRequest = $('input[name="type-of-request"]:checked').val();
        const isNewStorage = typeOfRequest === 'new-storage';
    
        // Toggle fields for "Create new storage share" vs. other Storage types
        $('#storage-mygroups-container, #storage-capacity, #storage-platform, #shared-space-name-container, #project-title-container')
            .toggle(isNewStorage);
    
        $('#existing-projects-storage').toggle(!isNewStorage);
    
        // Hide unused fields
        if (isNewStorage) {
            $('#existing-projects-storage input').val('');
        } else {
            $('#storage-mygroups-container select, #storage-capacity input, #storage-platform select, #shared-space-name-container input, #project-title-container input').val('');
        }
    
        updateFormValidation();
    }

    function toggleStorageTierOptions() {
        const selectedStorage = $('input[name="storage-choice"]:checked').val();
    
        if (!selectedStorage) return;
    
        const isHighlySensitive = selectedStorage === 'Highly Sensitive Data';
        $('#sensitive-data').toggle(isHighlySensitive);
        $('#standard-data').toggle(!isHighlySensitive);
        updateCapacityLimits(selectedStorage);
    }

    // ===================================
    // Event Handlers
    // ===================================

    function setupEventHandlers() {
        // Handle changes to Service Unit vs. Storage request type
        $('input[name="request-type"]').off('change').on('change', function () {
            toggleRequestFields(); // Show either allocation or storage fields
            updatePayloadPreview();
        });
    
        // Handle New vs. Renewal selection for Service Unit requests
        $('input[name="new-or-renewal"]').off('change').on('change', function () {
            toggleAllocationFields(); // Show fields based on New or Renewal
            updatePayloadPreview();
        });
    
        // Handle Storage request type changes (e.g., "Create new storage share")
        $('input[name="type-of-request"]').off('change').on('change', function () {
            toggleStorageFields(); // Show fields based on storage request type
            updatePayloadPreview();
        });
    
        // Handle changes to Storage Tier options (e.g., "SSZ Research Standard")
        $('input[name="storage-choice"]').off('change').on('change', function () {
            toggleStorageTierOptions(); // Update visibility of storage tier-specific fields
            updatePayloadPreview();
        });
    
        // Handle changes to capacity and other fields impacting billing visibility
        $('#capacity').off('input change').on('input change', function () {
            updateBillingVisibility(); // Update billing information visibility
            updatePayloadPreview();
        });
    
        // General input, select, and textarea validation and updates
        $('#combined-request-form input, #combined-request-form select, #combined-request-form textarea')
            .off('input change')
            .on('input change', function () {
                validateField($(this)); // Validate individual fields
                updateFormValidation(); // Validate the overall form
                updatePayloadPreview(); // Update the real-time payload preview
                updateBillingVisibility(); // Update billing visibility
            });
    
        console.log('Event handlers successfully set up.');
    }

        /// Form Submission Handler

        $('#combined-request-form').on('submit', async function (event) {
            event.preventDefault(); // Prevent default form submission
        
            console.log("Form submission triggered.");
        
            const formData = collectFormData(); // Initialize formData from the form
            const payload = buildPayloadPreview();
            const errors = validatePayload(payload);
        
            if (errors.length > 0) {
                // Show errors only during submission
                const errorDiv = $('<div>')
                    .addClass('alert alert-danger')
                    .html(`
                        <strong>Validation Errors:</strong>
                        <ul>${errors.map(err => `<li>${err}</li>`).join('')}</ul>
                    `);
                $('#combined-request-form').prepend(errorDiv);
                setTimeout(() => errorDiv.remove(), 10000); // Remove after 10 seconds
                console.error("Validation errors:", errors);
                return; // Stop submission on validation errors
            }
        
            // Proceed with the form submission logic
            try {
                const userId = getUserId();
                const userEmail = `${userId}@virginia.edu`; // Construct the user's email
                console.log("Submitting payload for user:", userId);
                console.log("User email:", userEmail);
        
                const method = formData.isUpdate ? 'PUT' : 'POST'; // Dynamically determine the method
        
                const response = await fetch(`${API_CONFIG.baseUrl}/${userId}`, {
                    method: method,
                    headers: {
                        ...API_CONFIG.headers, // Use existing headers
                    },
                    body: JSON.stringify(payload),
                    credentials: 'include',
                });
        
                if (!response.ok) {
                    const errorMessage = await response.text();
                    console.error(`Submission failed (${method}):`, errorMessage);
                    showErrorMessage("Submission failed. Please try again.");
                    return;
                }
        
                const responseData = await response.json();
                console.log(`Form ${method === 'PUT' ? 'updated' : 'submitted'} successfully:`, responseData);
        
                // Email the user with the submitted information
                sendUserEmail(userEmail, payload);
        
                // Clear the form fields
                clearFormFields();
        
                // Display success message and scroll to the top
                showSuccessMessage("Your request has been submitted successfully!");
        
            } catch (error) {
                console.error("Error during form submission:", error);
                showErrorMessage("An error occurred while submitting the form. Please try again.");
            }
        });


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

    function updateBillingVisibility() {
        const requestType = $('input[name="request-type"]:checked').val();
        const selectedStorageTier = $('input[name="storage-choice"]:checked').val();
        const requestedStorageSize = parseInt($('#capacity').val(), 10) || 0;
    
        let shouldShowBilling = true; // Default to show billing
    
        if (requestType === 'storage') {
            if (selectedStorageTier === "SSZ Research Standard") {
                const freeLimit = RESOURCE_TYPES["SSZ Research Standard"].freeLimit || 10;
                shouldShowBilling = requestedStorageSize > freeLimit; // Show billing only if above the free limit
            }
        }
    
        $('#billing-information').toggle(shouldShowBilling);
        console.log(`Billing visibility updated: ${shouldShowBilling}`);
    }

    function getBillingDetails() {
        const financialContact = $('#financial-contact').val()?.trim() || '';
        const companyId = $('#company-id').val()?.trim() || '';
        const costCenter = $('#cost-center').val()?.trim() || '';
        const businessUnit = $('#business-unit').val()?.trim() || '';
        const fundingType = $('input[name="funding-type"]:checked').val() || '';
        const fundingNumber = $('#funding-number').val()?.trim() || '';
        const fund = $('#fund').val()?.trim() || '';
        const functionCode = $('#function').val()?.trim() || '';
        const program = $('#program').val()?.trim() || '';
        const activity = $('#activity').val()?.trim() || '';
        const assignee = $('#assignee').val()?.trim() || '';
    
        return {
            fdm_billing_info: [
                {
                    financial_contact: financialContact,
                    company: companyId,
                    business_unit: businessUnit,
                    cost_center: costCenter,
                    fund: fund,
                    gift: fundingType === 'Gift' ? fundingNumber : '',
                    grant: fundingType === 'Grant' ? fundingNumber : '',
                    designated: fundingType === 'Designated' ? fundingNumber : '',
                    project: fundingType === 'Project' ? fundingNumber : '',
                    program_code: program,
                    function: functionCode,
                    activity: activity,
                    assignee: assignee,
                }
            ]
        };
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

    function updatePayloadPreview() {
        const payload = buildPayloadPreview();
        const errors = validatePayload(payload);
        console.log("Payload Preview:", JSON.stringify(payload, null, 2));

        if (errors.length > 0) {
            console.error("Payload Errors:", errors);
        } else {
            console.log("Payload Valid.");
        }
    }

    function buildPayloadPreview() {
        const formData = collectFormData();
        const userId = getUserId();
    
        const payload = [{
            is_user_resource_request_elligible: true,
            user_groups: formData.group ? [formData.group] : [],
            user_resources: []
        }];
    
        if (formData.requestType === 'service-unit') {
            const key = `${formData.group}-${getTierEnum(formData.allocationTier)}`;
            const tierData = apiMetadata.allocationTiers?.[formData.allocationTier] || {};
            const requestCount = formData.requestCount || tierData.defaultRequestCount || "0";
    
            const userResource = {
                data_agreement_signed: $('#data-agreement').is(':checked'),
                delegates_uid: "",
                group_id: "",
                group_name: formData.group || "Unknown Group",
                pi_uid: userId,
                project_desc: $('#project-description').val()?.trim() || "",
                project_name: formData.projectName?.trim() || "",
                resources: {
                    hpc_service_units: {
                        [key]: {
                            tier: getTierEnum(formData.allocationTier),
                            request_count: requestCount,
                            request_date: new Date().toISOString(),
                            request_status: "pending",
                            update_date: new Date().toISOString(),
                            billing_details: getBillingDetails()
                        }
                    },
                    storage: {}
                }
            };
            payload[0].user_resources.push(userResource);
        }
    
        console.log("Built payload:", JSON.stringify(payload, null, 2));
        return payload;
    }

    function validatePayload(payload) {
    const errors = [];

    // Validate user resources
    const userResources = payload[0]?.user_resources || [];
    userResources.forEach((resource, index) => {
        if (!resource.group_name || resource.group_name === "Unknown Group") {
            errors.push(`Resource ${index + 1}: Group name is required.`);
        }
        if (!resource.project_name) {
            errors.push(`Resource ${index + 1}: Project name is required.`);
        }
        if (!resource.data_agreement_signed) {
            errors.push(`Resource ${index + 1}: Data agreement must be signed.`);
        }
    });

    return errors; // Return errors for use during submission
}

    // ===================================
    // Fetch and Populate Groups
    // ===================================

    async function fetchAndPopulateGroups() {
        // Show a waiting message (use utility function if available)
        const waitingMessage = utils?.showWaitingMessage?.() || $('<div>').text('Loading...').prependTo('#combined-request-form');
        
        try {
            // Dynamically fetch the user ID using the helper function
            const userId = getUserId(); 
            console.log(`Attempting API call for user: ${userId}`);
            
            // Construct the API request URL
            const requestUrl = `${API_CONFIG.baseUrl}/${userId}`;
            console.log("Request URL:", requestUrl);
    
            // Define headers dynamically, including the current origin
            const headers = {
                ...API_CONFIG.headers,
                'Origin': window.location.origin // Dynamically set the origin
            };
    
            // Perform the fetch call with credentials included
            const response = await fetch(requestUrl, {
                method: 'GET',
                headers: headers,
                credentials: 'include'
            });
    
            // Handle non-OK responses
            if (!response.ok) {
                const errorMessage = `API request failed with status ${response.status}: ${response.statusText}`;
                console.error(errorMessage);
                handleApiError(new Error(errorMessage));
                return;
            }
    
            // Parse the JSON response
            const jsonResponse = await response.json();
            consoleData = jsonResponse; // Save to global variable for further use
            console.log("Fetched groups and resources:", consoleData);
    
            // Parse and populate user groups and resources
            const { userGroups, userResources } = parseConsoleData(jsonResponse);
    
            // Populate dropdowns for user groups
            if (Array.isArray(userGroups) && userGroups.length > 0) {
                console.log("Populating user groups:", userGroups);
                populateGrouperMyGroupsDropdown(userGroups);
            } else {
                console.warn("No user groups found.");
                populateGrouperMyGroupsDropdown([]);
            }
    
            // Process user resources if available
            if (Array.isArray(userResources) && userResources.length > 0) {
                console.log("Processing user resources...");
                processUserResources(jsonResponse);
            } else {
                console.warn("No user resources found.");
            }
        } catch (error) {
            console.error("Error fetching user groups:", error);
            handleApiError(error); // Display a user-friendly error message
        } finally {
            // Remove the waiting message
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
            
            // Save the current selected value
            const currentValue = $dropdown.val();
    
            // Clear existing options but retain the placeholder
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
    
                    // Restore previous selection if the value exists
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
    
            // Trigger change event for validation or dependent logic
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
    
        userResources.forEach(resource => {
            if (resource.resources?.hpc_service_units) {
                Object.entries(resource.resources.hpc_service_units).forEach(([allocationName, details]) => {
                    const row = createResourceRow({
                        type: 'Service Units',
                        group: resource.group_name,
                        tier: details.tier,
                        details: `${details.request_count || 0} SUs | Updated: ${details.update_date}`
                    });
                    previewTableBody.append(row);
                });
            }
    
            if (resource.resources?.storage) {
                Object.entries(resource.resources.storage).forEach(([storageName, details]) => {
                    const row = createResourceRow({
                        type: 'Storage',
                        group: resource.group_name,
                        tier: details.tier,
                        details: `${details.request_size || 0}TB | Updated: ${details.update_date}`
                    });
                    previewTableBody.append(row);
                });
            }
        });
    }

    // ===================================
    // Update Form Validation
    // ===================================

    function updateFormValidation() {
        const $form = $('#combined-request-form');
        const requestType = $('input[name="request-type"]:checked').val();
        const visibleFieldsSelector = requestType === 'service-unit'
            ? '#allocation-fields input[required]:visible, #allocation-fields select[required]:visible'
            : '#storage-fields input[required]:visible, #storage-fields select[required]:visible';
    
        const requiredFields = $form.find(visibleFieldsSelector);
        const isFormValid = requiredFields.toArray().every(field => validateField($(field)));
    
        $('#submit').prop('disabled', !isFormValid); // Disable button if form is invalid
    }

      // Initialization Function

      async function initialize() {
        console.log("Initializing form...");
        try {
            // Hide specific sections initially
            $('#allocation-fields, #storage-fields, #common-fields').hide();
            $('#billing-information').hide();
    
            // Add a timeout for metadata loading
            const metadataTimeout = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('Metadata loading timed out.')), 15000);
            });
    
            // Attempt to fetch metadata with timeout
            apiMetadata = await Promise.race([fetchMetadata(), metadataTimeout]);
    
            if (!apiMetadata) {
                throw new Error("Metadata fetch failed.");
            }
    
            updateFormUsingMetadata(apiMetadata);
    
            // Fetch user groups and populate dropdowns
            await fetchAndPopulateGroups();
    
            // Setup event handlers
            setupEventHandlers();
    
            // Setup real-time payload preview
            setupPayloadPreviewUpdater();
    
            // Initialize UI toggles
            toggleRequestFields();
            updateFormValidation();
    
            console.log("Form initialization complete.");
        } catch (error) {
            console.error("Error during form initialization:", error);
            showErrorMessage("Failed to load user information. Please try again later.");
        }
    }

    // ===================================
    // Start Initiation
    // ===================================
    initialize();
});