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
        
            // Show a loading message
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
                // jQuery AJAX request
                let metadata = await $.ajax({
                    url: metadataUrl,
                    method: "GET",
                    headers: {
                        ...API_CONFIG.headers,
                        'Origin': window.location.origin // Dynamically include origin
                    },
                    credentials: 'include'
                });
        
                console.log("Fetched metadata:", metadata);
                return metadata;
            } catch (error) {
                console.error("Error fetching metadata:", error);
        
                // Retry logic (3 attempts)
                for (let attempt = 1; attempt <= 3; attempt++) {
                    console.log(`Retrying metadata fetch (Attempt ${attempt})...`);
                    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before retry
        
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
                if(formData.typeOfRequest === 'new-storage') {
                    formData.group= $('#storage-mygroups-group').val(); //grab group from storage dropdown
                    formData.sharedSpaceName = $('#shared-space-name').val();//
                    formData.project_title = $('#project-title').val();
                    formData.storage_size = $('#capacity').val();
                }else if(formData.typeOfRequest === 'increase-storage' || formData.typeOfRequest === 'decrease-storage') {
                    formData.storage_size = $('#capacity').val();
                    var checkedRadio=$('input[name="selected-su"]:checked')               
                    formData.sharedSpaceName=checkedRadio.closest('tr').find('td:nth-child(5)').text().trim();
                    formData.storageTier=checkedRadio.closest('tr').find('td:nth-child(4)').text().trim();
                    formData.storage_size = $('#capacity').val();
                }
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
            $('.alert-danger').remove(); // Remove old errors
            const errorDiv = $('<div>')
                .addClass('alert alert-danger')
                .text(message);
            $('#combined-request-form').prepend(errorDiv);
            setTimeout(() => errorDiv.remove(), 10000);
        }
        
        function showSuccessMessage(message) {
            // Remove any existing success messages to avoid duplication
            $('.alert-success').remove();
        
            // Create a new success message with Bootstrap dismissible alert
            const successDiv = $(`
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success!</strong> ${message}
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `);
        
            // Prepend the success message to the form and scroll to top smoothly
            $('#combined-request-form').prepend(successDiv);
            $('html, body').animate({ scrollTop: 0 }, 'slow');
        
            // Automatically remove the message after 10 seconds
            setTimeout(() => successDiv.fadeOut(500, () => successDiv.remove()), 10000);
        }

    // ===================================
    // Error Handling
    // ===================================

    function showErrorMessage(message) {
        $('.alert-danger').remove(); // Remove old errors
        const errorDiv = $('<div>')
            .addClass('alert alert-danger')
            .text(message);
        $('#combined-request-form').prepend(errorDiv);
        setTimeout(() => errorDiv.remove(), 10000);
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

        // Show common fields
        $('#common-fields').show();

        // Explicitly show or hide primary sections
        if (requestType === 'service-unit') {
            $('#allocation-fields').show();
            $('#storage-fields').hide();
            toggleAllocationFields(); // Handle nested toggles for service-unit
        } else if (requestType === 'storage') {
            $('#allocation-fields').hide();
            $('#storage-fields').show();
            toggleStorageFields(); // Handle nested toggles for storage
        } else {
            // Default case: hide both sections
            $('#allocation-fields, #storage-fields').hide();
        }
    }

    function toggleAllocationFields() {
        const isNew = $('#new-or-renewal-options input[name="new-or-renewal"]:checked').val() === 'new';
    
        if (isNew) {
            $('#allocation-fields #new-project-name-container, #allocation-fields #project-description, #allocation-fields #mygroups-group-container, #allocation-fields #allocation-tier').show();
            $('#existing-projects-allocation').hide();
        } else {
            $('#allocation-fields #new-project-name-container, #allocation-fields #project-description, #allocation-fields #mygroups-group-container, #allocation-fields #allocation-tier').hide();
            $('#existing-projects-allocation').show();
            populateExistingServiceUnitsTable(consoleData);
        }
    }

    function toggleStorageFields() {
        const isNewStorage = $('#storage-fields input[name="type-of-request"]:checked').val() === 'new-storage';
    
        // Explicitly show or hide new vs existing storage fields
        if (isNewStorage) {
            $('#storage-fields #storage-mygroups-container, #storage-fields #storage-capacity, #storage-fields #storage-platform, #storage-fields #shared-space-name-container, #storage-fields #project-title-container').show();
            $('#storage-fields #existing-projects-storage').hide();
        } else {
            if ($('#storage-fields input[name="type-of-request"]:checked').val() === 'increase-storage' ||
                $('#storage-fields input[name="type-of-request"]:checked').val() === 'decrease-storage') {
                $('#storage-fields #storage-capacity').show(); // Show capacity field for increase/decrease
            }
            $('#storage-fields #storage-mygroups-container, #storage-fields #storage-platform, #storage-fields #shared-space-name-container, #storage-fields #project-title-container').hide();
            $('#storage-fields #existing-projects-storage').show();
        }
    }
    

    function toggleStorageTierOptions() {
        const isHighlySensitive = $('#storage-tier-options input[name="storage-choice"]:checked').val() === 'Highly Sensitive Data';

        // Explicitly show or hide tier-specific sections
        if (isHighlySensitive) {
            $('#storage-tier-options #sensitive-data').show();
            $('#storage-tier-options #standard-data').hide();
        } else {
            $('#storage-tier-options #sensitive-data').hide();
            $('#storage-tier-options #standard-data').show();
        }
    }

    function toggleExistingProjectsAllocation() {
        const isRenewalSelected = $('#new-or-renewal-2').is(':checked');
        if (isRenewalSelected) {
            $('#existing-projects-allocation').show(); // Show the div
        } else {
            $('#existing-projects-allocation').hide(); // Hide the div
        }
    }

    // ===================================
    // Setup Event Handlers
    // ===================================

    function setupEventHandlers() {
        // Use event delegation for dynamically added inputs
        $(document).on('change', 'input[name="request-type"]', toggleRequestFields);
        $(document).on('change', 'input[name="new-or-renewal"]', function () {
            toggleAllocationFields(); // Existing function for showing/hiding fields
            toggleExistingServiceUnitsTable(); // Ensure the table updates correctly
            toggleExistingProjectsAllocation(); // Show/hide existing projects allocation based on selection
        });
        $(document).on('change', 'input[name="type-of-request"]', toggleStorageFields);
        $(document).on('change', 'input[name="storage-choice"]', toggleStorageTierOptions);
    
        // General input, select, and textarea validation and updates
        $(document).on('input change', '#combined-request-form input, #combined-request-form select, #combined-request-form textarea', function (event) {
            if ($(event.target).is('input[name="selected-su"]')) {
                // Get the currently checked radio button (in case of multiple triggers)
                const $selectedRadio = $('input[name="selected-su"]:checked');
                // Traverse to the parent <tr>
                const $parentRow = $selectedRadio.closest('tr');
                // Retrieve the data-additional attribute
                const additionalData = $parentRow.attr('data-additional');
                
                // Parse it to an object (if needed)
                let billingData;
                try {
                    billingData = JSON.parse(additionalData);
                } catch (e) {
                    console.error("Failed to parse billing data:", e);
                }
                
                // Call your updateBilling method with the parsed data
                updateBilling(billingData);
            updatePayloadPreview(); // Update the real-time payload preview
            updateBillingVisibility(); // Update billing visibility
        });
    
        // Attach submit event handler
        $(document).on('submit', '#combined-request-form', handleFormSubmit);

        $(document).on("change", 'input[name="selected-su"]', function () {
            const selectedSU = $(this).val();
            if (!selectedSU) return;
            console.log(`Selected SU for renewal: ${selectedSU}`);
        
            // Extract group and tier from selected value
            const [selectedGroup, selectedTier] = selectedSU.split('-');
            if (!selectedGroup || !selectedTier) {
                console.warn("⚠ Selected SU value is missing required parts.");
                return;
            }
            // Find the corresponding SU details in consoleData
            let existingResource = consoleData[0]?.user_resources?.find(resource =>
                resource.group_name.toLowerCase() === selectedGroup.toLowerCase() &&
                resource.resources?.hpc_service_units?.[`${selectedGroup}-${selectedTier}`]
            );
            if (!existingResource) {
                console.warn("⚠ No matching resource found for selected SU.");
                return;
            }
            const existingSU = existingResource.resources.hpc_service_units[`${selectedGroup}-${selectedTier}`];
            if (!existingSU) {
                console.warn("⚠ No SU details found in resource.");
                return;
            }
            console.log("Auto-filling UI with existing SU billing details:", existingSU);
        
            if (!existingSU.billing_details) {
                console.warn("⚠ No billing details found in the existing SU.");
                return;
            }
        
            // Extract billing details from API response
            const updatedBillingDetails = {
                financial_contact: existingSU.billing_details?.financial_contact || "",
                company_id: existingSU.billing_details?.company || "",
                cost_center: existingSU.billing_details?.cost_center || "",
                business_unit: existingSU.billing_details?.business_unit || "",
                funding_number: existingSU.billing_details?.funding_number || "",
                funding_type: existingSU.billing_details?.funding_type || "",
                fdm: existingSU.billing_details?.fdm_billing_info?.[0] || {} // Handle FDM Billing
            };
        
            console.log("Updated Billing Details for Autofill:", updatedBillingDetails);
        
            // Ensure form fields are updated
            $('#financial-contact').val(updatedBillingDetails.financial_contact).trigger("change").trigger("input");
            $('#company-id').val(updatedBillingDetails.company_id).trigger("change").trigger("input");
            $('#cost-center').val(updatedBillingDetails.cost_center).trigger("change").trigger("input");
            $('#business-unit').val(updatedBillingDetails.business_unit).trigger("change").trigger("input");
        
            // Ensure funding number autofills
            $('#funding-number').val(updatedBillingDetails.funding_number).trigger("change").trigger("input");
        
            // Select correct funding type radio button if available
            if (updatedBillingDetails.funding_type) {
                $(`input[name="funding-type"][value="${updatedBillingDetails.funding_type}"]`).prop("checked", true);
            }
        
            // Autofill FDM Billing Information
            $('#fund').val(updatedBillingDetails.fdm.fund || "").trigger("change").trigger("input");
            $('#function').val(updatedBillingDetails.fdm.function || "").trigger("change").trigger("input");
            $('#program').val(updatedBillingDetails.fdm.program || "").trigger("change").trigger("input");
            $('#activity').val(updatedBillingDetails.fdm.activity || "").trigger("change").trigger("input");
            $('#assignee').val(updatedBillingDetails.fdm.assignee || "").trigger("change").trigger("input");
        
            // Ensure fields are editable
            $('#financial-contact, #company-id, #cost-center, #business-unit, #funding-number, #fund, #function, #program, #activity, #assignee')
                .prop('readonly', false);
        
            console.log("Billing fields successfully autofilled in the UI.");
        });
    }
    
    // ===================================
    // Submission Handlers
    // ===================================

    async function handleFormSubmit(event) {
        event.preventDefault(); // Prevent default form submission
    
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
            var method = isRenewal ? 'PUT' : 'POST'; // Use PUT for renewals
            if(formData.requestType==="storage" && (formData.typeOfRequest === 'increase-storage' || formData.typeOfRequest === 'decrease-storage')){
                method = 'PUT'; // Use PUT for storage changes
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
        setTimeout(() => errorDiv.remove(), 10000); // Remove after 10 seconds
        console.error("Validation errors:", errors);
    }
    
    // ===================================
    // Submit Form (Using jQuery AJAX)
    // ===================================

    async function submitForm(formData, payload) {
        const userId = getUserId();
        const userEmail = `${userId}@virginia.edu`; // Construct the user's email
        console.log("Submitting payload for user:", userId);
        console.log("User email:", userEmail);
    
        // Check if it's a renewal by detecting the selected existing SU
        const isRenewal = formData.newOrRenewal === 'renewal';
    
        // Set the correct HTTP method
        const method = isRenewal ? 'PUT' : 'POST';
        console.log(`Submitting ${method} request for ${isRenewal ? "Renewal" : "New Request"}...`);
    
        // Ensure correct URL for PUT (Renewals)
        let requestUrl = `${API_CONFIG.baseUrl}/${userId}`;
        if (isRenewal && formData.existingProject) {
            requestUrl += `/${formData.existingProject}`;
        }
    
        // Check for `trigger_notification` flag in payload
        if (isRenewal && payload.length > 0 && payload[0].trigger_notification) {
            console.log("Triggering notification for renewal request.");
        }
    
        // Remove "Origin" header (Handled automatically by browser)
        const settings = {
            "url": requestUrl, 
            "method": method, 
            "timeout": 0, 
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify(payload), 
            "xhrFields": { 
                withCredentials: true // Ensure authentication and cookies are included
            }
        };
    
        try {
            const response = await $.ajax(settings);
            console.log(`Form ${method === 'PUT' ? 'updated' : 'submitted'} successfully:`, response);
            
            // Show success message
            showSuccessMessage(isRenewal ? "Your renewal request has been submitted successfully!" : "Your request has been submitted successfully!");
    
            // If renewal, update the "Updated" timestamp for the selected SU**
            if (isRenewal && formData.existingProject) {
                updateServiceUnitTimestamp(formData.existingProject);
            }
    
            // Ensure UI updates immediately after submission
            updateFormUsingMetadata(await fetchMetadata());
    
            // Re-enable Submit Button**
            $('#submit').prop('disabled', false);
    
            // Clear form after successful submission**
            clearFormFields();
    
            return response;
        } catch (error) {
            console.error(`Submission failed (${method}):`, error.responseText || error);
    
            // Show error message
            showErrorMessage("Submission failed. Please try again.");
    
            // Re-enable Submit Button for retries**
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
            $('#financial-contact').val(billingData.financial_contact || '');
            $('#company-id').val(billingData.company || '');
            $('#business-unit').val(billingData.business_unit || '');
            $('#cost-center').val(billingData.cost_center || '');
            $('#fund').val(billingData.fund || '');
            $('#funding-number').val(billingData.funding_number || '');
            $('#program').val(billingData.program_code || '');
            $('#function').val(billingData.function || '');
            $('#activity').val(billingData.activity || '');
            $('#assignee').val(billingData.assignee || '');
            console.log("Billing data updated from existing line:", billingData);
        }
    }

    function updateBillingVisibility() {
        const requestType = $('input[name="request-type"]:checked').val();
        const selectedStorageTier = $('input[name="storage-choice"]:checked').val();
        const requestedStorageSize = parseInt($('#capacity').val(), 10) || 0;
    
        let shouldShowBilling = true; // Default to show billing. put the commented out back when we're ready for free logic
    
        //if (requestType === 'storage') {
         //   if (selectedStorageTier === "SSZ Research Standard") {
         //       const freeLimit = RESOURCE_TYPES["SSZ Research Standard"].freeLimit || 10;
         //       shouldShowBilling = requestedStorageSize > freeLimit; // Show billing only if above the free limit
         //   }
       // }
    
        $('#billing-information').toggle(shouldShowBilling);
        console.log(`Billing visibility updated: ${shouldShowBilling}`);
    }

    function getBillingDetails() {
        return {
            fdm_billing_info: [
                {
                    financial_contact: $('#financial-contact').val()?.trim() || '',
                    company: $('#company-id').val()?.trim() || '',
                    business_unit: $('#business-unit').val()?.trim() || '',
                    cost_center: $('#cost-center').val()?.trim() || '',
                    fund: $('#fund').val()?.trim() || '',
                    gift: $('input[name="funding-type"]:checked').val() === 'Gift' ? $('#funding-number').val()?.trim() || '' : '',
                    grant: $('input[name="funding-type"]:checked').val() === 'Grant' ? $('#funding-number').val()?.trim() || '' : '',
                    designated: $('input[name="funding-type"]:checked').val() === 'Designated' ? $('#funding-number').val()?.trim() || '' : '',
                    project: $('input[name="funding-type"]:checked').val() === 'Project' ? $('#funding-number').val()?.trim() || '' : '',
                    program_code: $('#program').val()?.trim() || '',
                    function: $('#function').val()?.trim() || '',
                    activity: $('#activity').val()?.trim() || '',
                    assignee: $('#assignee').val()?.trim() || '',
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

    // Store previous payload and errors to reduce redundant logs
    let previousPayloadString = "";
    let previousErrorsString = "";

    function updatePayloadPreview() {
        console.log("updatePayloadPreview() triggered.");
    
        // Ensure Data Agreement is checked before proceeding
        const isDataAgreementChecked = $('#data-agreement').is(':checked');
        if (!isDataAgreementChecked) {
            console.warn("⚠ Data Agreement checkbox is NOT checked. Skipping payload validation.");
            $('#submit').prop('disabled', true); // Disable submit button
            return; // Exit function early
        }
    
        const payload = buildPayloadPreview();
        if (!payload) {
            console.warn("⚠ Payload generation failed. No preview available.");
            return; // Stop execution if payload is null
        }
    
        const errors = validatePayload(payload);
    
        // Convert to JSON strings for comparison
        const payloadString = JSON.stringify(payload, null, 2);
        const errorsString = JSON.stringify(errors, null, 2);
    
        // Only log payload if it has changed
        if (payloadString !== previousPayloadString) {
            console.log("Updated Payload Preview:", payload);
            previousPayloadString = payloadString;
        }
    
        // Only log errors if they have changed
        if (errorsString !== previousErrorsString) {
            if (errors.length > 0) {
                console.warn("⚠ Validation Errors:", errors);
                $('#submit').prop('disabled', true); // Keep submit button disabled if errors exist
            } else {
                console.log("Payload is valid.");
                $('#submit').prop('disabled', false); // Enable submit button
            }
            previousErrorsString = errorsString;
        }
    }

    // Build Payload and Preview

    function buildPayloadPreview() {
        const formData = collectFormData();
        const userId = getUserId();
        const storageChange = formData.typeOfRequest === 'increase-storage' || formData.typeOfRequest === 'decrease-storage';
        let selectedGroup, selectedTier;
    
        if (formData.newOrRenewal === "renewal") {
            // Extract from the selected SU in the renewal table
            const selectedSU = $('input[name="selected-su"]:checked').val();
            if (selectedSU) {
                [selectedGroup, selectedTier] = selectedSU.split('-'); // Extract group & tier
            }
        } else if (formData.requestType === "storage") {
            selectedGroup = formData.group ? formData.group.trim() : "";
            selectedTier = formData.storageTier ? getStorageTierEnum(formData.storageTier) : "";
        } else {
            // New Requests: Get Group and Tier from form dropdowns
            selectedGroup = formData.group ? formData.group.trim() : "";
            selectedTier = getTierEnum(formData.allocationTier);
        }
    
        if (!storageChange && (!selectedGroup || !selectedTier)) {
            console.error(`⚠ Missing required values: Group: ${selectedGroup}, Tier: ${selectedTier}`);
            showErrorMessage("⚠ Please select a valid Group and Tier.");
            return null;
        }
    
        // Handle Renewals: Check if the resource exists in the API response
        if (formData.newOrRenewal === "renewal") {
            let existingResource = consoleData[0]?.user_resources?.find(resource =>
                resource.group_name.toLowerCase() === selectedGroup.toLowerCase() &&
                resource.resources?.hpc_service_units?.[selectedGroup]?.tier.toLowerCase() === selectedTier.toLowerCase()
            );
    
            if (!existingResource) {
                showErrorMessage(`⚠ The selected Group and Tier do not match any existing resources.`);
                return null;
            }
    
            console.log(`Renewal detected: ${selectedGroup} - ${selectedTier}. Fetching existing SU details.`);
    
            // Get existing request count to avoid unintended changes
            const existingRequestCount = existingResource.resources?.hpc_service_units?.[selectedGroup]?.request_count || "50000";
    
            // Retrieve existing billing details & merge with updated user input
            const updatedBillingDetails = {
                "financial_contact": $('#financial-contact').val().trim() || existingResource.billing_details?.financial_contact || "",
                "company_id": $('#company-id').val().trim() || existingResource.billing_details?.company_id || "",
                "cost_center": $('#cost-center').val().trim() || existingResource.billing_details?.cost_center || "",
                "business_unit": $('#business-unit').val().trim() || existingResource.billing_details?.business_unit || ""
            };
    
            console.log("Updated Billing Details for Renewal:", updatedBillingDetails);
    
            // Construct minimal payload for PUT (Renewal)
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
                            "request_count": existingRequestCount, // Keep the same
                            "billing_details": updatedBillingDetails, // Updated billing details
                            "update_date": new Date().toISOString() // Set new timestamp
                        }
                    }
                },
                "trigger_notification": true // Add a flag to indicate renewal notification
            };
    
            console.log("Final Renewal Payload (PUT):", JSON.stringify(renewalPayload, null, 2));
            return [renewalPayload]; // Return as an array for consistency
        }
    
        // Handle storage adjustments (no changes)
        if (formData.requestType === "storage" && (formData.typeOfRequest === 'increase-storage' || formData.typeOfRequest === 'decrease-storage')) {
            // Construct minimal payload for PUT (change)
            const changePayload = {
                "storage": {
                    [formData.sharedSpaceName]: {
                        "tier": selectedTier,
                        "request_size": formData.capacity
                    }
                }
            };
    
            console.log("Final Storage Change Payload (PUT):", JSON.stringify(changePayload, null, 2));
            return [changePayload]; // Return as an array for consistency
        }
    
        // Handle New Requests (Unchanged)
        const billingDetails = getBillingDetails();
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
        return [newResource]; // Return as an array
    }

    // Validate Payload

    function validatePayload(payload) {
        const errors = [];
    
        // Ensure payload is an array with exactly one object
        if (!Array.isArray(payload) || payload.length !== 1) {
            errors.push("Payload must be an array containing a single object.");
            return errors;
        }
    
        const resourceWrapper = payload[0];
        const isRenewal = $('input[name="new-or-renewal"]:checked').val() === 'renewal';
        var isStorage = $('input[name="request-type"]:checked').val() === 'storage';
        
        // **If it's a renewal, user_resources array should NOT be validated for new entries**
        if (isRenewal) {
            if (!resourceWrapper.group_name || !resourceWrapper.resources?.hpc_service_units) {
                errors.push("Renewal request must include a valid Group and existing HPC Service Unit.");
            }
    
            // Ensure the update_date field is present for renewal
            const hpcKeys = Object.keys(resourceWrapper.resources?.hpc_service_units || {});
            if (hpcKeys.length === 0 || !resourceWrapper.resources.hpc_service_units[hpcKeys[0]].update_date) {
                errors.push("Renewal request must include an update_date field.");
            }
    
            return errors; // Skip other validations for renewals
        }
    
        // **For New Requests (POST)**
        const seenGroupTiers = new Set();
    
        if (!Array.isArray(resourceWrapper.user_resources)) {
            resourceWrapper.user_resources = []; // Ensure it's always an array
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
    
            // Perform the AJAX call using jQuery
            const jsonResponse = await $.ajax({
                url: requestUrl,
                method: "GET",
                headers: {
                    ...API_CONFIG.headers,
                    'Origin': window.location.origin // Dynamically set the origin
                },
                credentials: 'include'
            });
    
            // Save to global variable for further use
            consoleData = jsonResponse; 
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
    
        // **Sort resources by most recent `update_date` (or fallback to `request_date`)**
        userResources.sort((a, b) => {
            const dateA = new Date(a.resources?.hpc_service_units?.[Object.keys(a.resources.hpc_service_units)[0]]?.update_date || 
                                   a.resources?.hpc_service_units?.[Object.keys(a.resources.hpc_service_units)[0]]?.request_date || 0);
            const dateB = new Date(b.resources?.hpc_service_units?.[Object.keys(b.resources.hpc_service_units)[0]]?.update_date || 
                                   b.resources?.hpc_service_units?.[Object.keys(b.resources.hpc_service_units)[0]]?.request_date || 0);
            return dateB - dateA; // Sort descending (newest first)
        });
    
        userResources.forEach(resource => {
            const projectName = resource.project_name || "N/A";
            const groupName = resource.group_name || "N/A";
    
            let resourceType = "Unknown";
            if ( resource.resources?.hpc_service_units &&
                Object.keys(resource.resources.hpc_service_units).length > 0) {
                resourceType = "SU";
            } else if (resource.resources?.storage &&
                Object.keys(resource.resources.storage).length > 0) {
                resourceType = "Storage";
            }
    
            if (resourceType==="SU" && resource.resources?.hpc_service_units) {
                Object.entries(resource.resources.hpc_service_units).forEach(([allocationName, details]) => {
                    const tier = details.tier || "N/A";
                    const requestCount = details.request_count ? `${details.request_count} SUs` : "N/A";
                    var shortDate=formatDateToEST(details.update_date || details.request_date);
                    const updateDate = details.update_date ? `Updated: ${shortDate}` : `Requested: ${shortDate || "No date available"}`;
    
                    const row = `
                        <tr>
                            <td>${resourceType}</td>
                            <td>${projectName}</td> 
                            <td>${groupName}</td>
                            <td>${tier}</td>
                            <td>${requestCount} | ${updateDate}</td>
                        </tr>
                    `;
                    previewTableBody.append(row);
                });
            }else if(resourceType==="Storage" && resource.resources?.storage) {
                Object.entries(resource.resources.storage).forEach(([allocationName, details]) => {
                    const tier = details.tier || "N/A";
                    const storageSize = details.storage_size ? `${details.storage_size} TB` : "N/A";
                    var shortDate=formatDateToEST(details.update_date || details.request_date);
                    const updateDate = details.update_date ? `Updated: ${shortDate}` : `Requested: ${shortDate || "No date available"}`;
    
                    const row = `
                        <tr>
                            <td>${resourceType}</td>
                            <td>${projectName}</td> 
                            <td>${groupName}</td>
                            <td>${tier}</td>
                            <td>${storageSize} | ${updateDate}</td>
                        </tr>
                    `;
                    previewTableBody.append(row);
                });
            }
        });
    
        // Also update the Existing Service Units table for Renewals
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
    
        // **Sort resources by most recent `update_date` (or fallback to `request_date`)**
        userResources.sort((a, b) => {
            const dateA = new Date(a.resources?.storage?.[Object.keys(a.resources.storage)[0]]?.update_date || 
                                   a.resources?.storage?.[Object.keys(a.resources.storage)[0]]?.request_date || 0);
            const dateB = new Date(b.resources?.storage?.[Object.keys(b.resources.storage)[0]]?.update_date || 
                                   b.resources?.storage?.[Object.keys(b.resources.storage)[0]]?.request_date || 0);
            return dateB - dateA; // Sort descending (newest first)
        });
    
        userResources.forEach(resource => {
            const projectName = resource.project_name || "N/A";
            const groupName = resource.group_name || "N/A";
    
            if (resource.resources?.storage) {
                Object.entries(resource.resources.storage).forEach(([allocationName, details]) => {
                    const tier = details.tier || "N/A";
                    const storageSize = details.storage_size? `${details.storage_size} TB` : "N/A";
                    var shortDate=formatDateToEST(details.update_date || details.request_date);
                    const updateDate = details.update_date ? `Updated: ${shortDate}` : `Requested: ${shortDate || "No date available"}`;
                    const sharedSpace = details.shared_space_name ? `${details.shared_space_name}` : "N/A";
                    const billingJson = JSON.stringify(details.billing_details.fdm_billing_info);
                    const row = `
                        <tr data-additional='${billingJson}'>
                            <td>
                                <input type="radio" name="selected-su" value="${groupName}-${tier}" 
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
    
        const now = new Date().toISOString(); // Get current timestamp
    
        $('#allocation-projects-tbody tr').each(function () {
            const group = $(this).find("td:eq(2)").text().trim();
            const tier = $(this).find("td:eq(3)").text().trim();
            const matchValue = `${group}-${tier}`;
    
            if (matchValue === selectedSU) {
                console.log(`Updating timestamp for renewal: ${matchValue}`);
    
                // Update the "Updated" date in the table
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
            // Hide sections initially to avoid flickering
            $('#allocation-fields, #storage-fields, #common-fields, #billing-information').hide();
    
            // Display a loading spinner during metadata and user data fetch
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
    
            // Set a timeout for metadata loading
            const metadataTimeout = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Metadata loading timed out.')), 15000)
            );
    
            // Attempt to fetch metadata with a timeout
            apiMetadata = await Promise.race([fetchMetadata(), metadataTimeout]);
    
            if (!apiMetadata) {
                throw new Error("Metadata fetch failed.");
            }
    
            console.log("Metadata successfully fetched:", apiMetadata);
    
            // Update form elements using fetched metadata
            updateFormUsingMetadata(apiMetadata);
    
            // Fetch user groups and populate dropdowns
            await fetchAndPopulateGroups();
    
            // Set up event handlers for dynamic interactivity
            setupEventHandlers();
    
            // Set up real-time payload preview
            setupPayloadPreviewUpdater();
    
            // Initialize visibility of fields based on initial state
            toggleRequestFields();
            updateFormValidation();
    
            console.log("Form initialization complete.");
        } catch (error) {
            console.error("Error during form initialization:", error);
    
            // Display a user-friendly error message
            showErrorMessage(
                "Failed to load user information. Please refresh the page or contact support if the issue persists."
            );
        } finally {
            // Ensure the loading spinner is removed
            $('#loading-message').fadeOut(300, function() { $(this).remove(); });
        }
    }

    function formatDateToEST(isoDateStr) {
        // Create a Date object from the ISO string
        const dateObj = new Date(isoDateStr);
        
        // Define options for a short, formatted date
        const options = {
          timeZone: "America/New_York", // Eastern Time
          year: "2-digit",              // Two-digit year
          month: "numeric",             // Numeric month
          day: "numeric",               // Numeric day
          hour: "numeric",              // Numeric hour
          minute: "numeric",            // Numeric minute
          hour12: true                  // 12-hour format
        };
      
        // Format the date for Eastern Time
        const formatted = dateObj.toLocaleString("en-US", options);
        
        // If needed, append the EST label (ensure you handle daylight saving if necessary)
        return `${formatted} EST`;
      }

    $(document).ready(function () {
        console.log("Script started");
        console.log("Updated Combined Request Form JS loaded");
    
        // ===================================
        // Start Initiation
        // ===================================
        initialize();
    });