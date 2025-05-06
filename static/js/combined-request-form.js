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

    let selectedUpdateResourceName = "";
    let selectedUpdateResourceTier = "";
    let selectedUpdateGroupName = "";

    // ===================================
    // Fetches and Holds API Data
    // ===================================

    let apiMetadata = {};

    let  consoleData = [];

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
            //display admin button
            if (metadata[0].is_user_admin) {
                document.getElementById('admin-button').style.display = 'inline-block';
              }
              if (metadata[0].is_user_resource_request_elligible) {
                document.getElementById('resource-button').style.display = 'inline-block';
              }
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
                requestType: $('select[name="request-type"]').val(),
                shouldShowBilling: $('#billing-information').is(':visible')
            };
            if (formData.requestType === 'service-unit') {
                formData.newOrRenewal = $('input[name="new-or-renewal"]:checked').val();
                formData.group = $('#mygroups-group').val();
                formData.projectName = $('#new-project-name').val();
                formData.projectDescription = $('#project-description-text').val();
                formData.requestCount = $('#su-quantity').val(); 
                formData.allocationTier = $('input[name="allocation-choice"]:checked').val();
                if (formData.newOrRenewal === 'renewal') {
                    formData.existingProject = $('input[name="existing-project-allocation"]:checked').val();
                } 
            } else if (formData.requestType === 'storage') {
                formData.typeOfRequest = $('input[name="type-of-request"]:checked').val();
                formData.group= $('#storage-mygroups-group').val(); //grab group from storage dropdown
                formData.project_title = $('#project-title').val();
                formData.storageTier = $('input[name="storage-choice"]:checked').val();
                formData.request_size = $('#capacity').val();
                formData.projectDescription = $('#project-description-text-storage').val();
                if (formData.typeOfRequest === 'update-storage') {
                    formData.existingProject = $('input[name="existing-project-storage"]:checked').val();
                    var checkedRadio=$('input[name="selected-st"]:checked')               
                    //formData.storageTier=checkedRadio.closest('tr').find('td:nth-child(4)').text().trim();
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
            const uid = document.querySelector('[name="user-id"]')?.value;
    const email = document.querySelector('[name="email"]')?.value;
    const name = document.querySelector('[name="name"]')?.value;
            const $form = $('#combined-request-form');
            $form[0].reset(); // Reset all form fields
            $form.find('.is-valid, .is-invalid').removeClass('is-valid is-invalid'); // Remove validation styles
            $form.find('.invalid-feedback').remove(); // Remove error messages
            updateFormValidation(); // Revalidate to disable the submit button
            console.log("Form fields cleared.");
        }

        /// Success Message

        function showErrorMessagePost(message) {
            $('.alert-danger').remove(); // Remove old errors
            const errorDiv = $('<div>')
                .addClass('alert alert-danger')
                .text(message);
            $('#combined-request-form').prepend(errorDiv);
            $('html, body').animate({ scrollTop: 0 }, 'slow');
            //setTimeout(() => errorDiv.remove(), 10000);
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
       
        //setTimeout(() => errorDiv.remove(), 10000);
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
    function showFormFields() {
        $('#resource_type_container').show();
        $('#service_unit_container').show();
        $('#common-fields').show();
        $('#existing-resources-preview').hide();
    }

    function toggleRequestFields() {
        const requestType = $('select[name="request-type"]').val();

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
        const isRenew= $('#new-or-renewal-options input[name="new-or-renewal"]:checked').val() === 'renewal';
        if (isNew && !isRenew) {
            $('#allocation-fields, #new-project-name-container, #project-description, #mygroups-group-container, #allocation-tier').show();
            $('#existing-projects-allocation').hide();
        } else if(!isNew && isRenew) {
            $('#allocation-fields, #mygroups-group-container, #allocation-tier').hide();
            $('#existing-projects-allocation, #new-project-name-container, #project-description').show();
            populateExistingServiceUnitsTable(consoleData);
        }
    }

    function toggleStorageFields() {
        const isNewStorage = $('#storage-fields input[name="type-of-request"]:checked').val() === 'new-storage';
        const changeExsisting = $('#storage-fields input[name="type-of-request"]:checked').val() === 'update-storage';
        const retireExsisting = $('#storage-fields input[name="type-of-request"]:checked').val() === 'retire-storage';
        // Explicitly show or hide new vs existing storage fields
        if (isNewStorage && !changeExsisting && !retireExsisting) {
            $('#storage-mygroups-container, #storage-capacity, #storage-platform, #project-title-container #project-description-container').show();
            $('#storage-fields #existing-projects-storage').hide();
        } else if((!isNewStorage && changeExsisting) || (!isNewStorage && retireExsisting)) {
                $('#storage-fields #storage-capacity').show(); // Show capacity field for increase/decrease
                $('#storage-fields #storage-mygroups-container, #storage-platform').hide();
                $('#existing-projects-storage, #project-title-container #project-description-container').show();
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
    
    function toggleAllocationTierOptions() {
        const isStandard = $('#allocation-tier-options input[name="allocation-choice"]:checked').val() === 'Standard';
        const isInstructional = $('#allocation-tier-options input[name="allocation-choice"]:checked').val() === 'Instructional';

        // Explicitly show or hide tier-specific sections
        if (isStandard || isInstructional) {
            $('#su-quantity').val(1000000);
            document.getElementById("su-quantity").disabled = true;
        } else if(isInstructional) {
            $('#su-quantity').val(100000);
            document.getElementById("su-quantity").disabled = true;
        } else {
            $('#su-quantity').val(1000);
            document.getElementById("su-quantity").disabled = false;
        }
    }
    

    // ===================================
    // Setup Event Handlers
    // ===================================
    document.addEventListener("DOMContentLoaded", function() {
          // Hide fields as required
          document.querySelector('#departmet_clasification_row').style.display = 'none';
          document.querySelector('#discipline_row').style.display = 'none';
          // In billing details hide Financial contact field
          document.querySelector('#financial-contact-div').style.display = 'none';
      });

    document.addEventListener("DOMContentLoaded", function() {
        // Get the button element
        const button = document.getElementById("resource-button");
        button.addEventListener("click", function() {
        showFormFields();
    
        // Set up event handlers for dynamic interactivity
        setupEventHandlers();

        // Set up real-time payload preview
        setupPayloadPreviewUpdater();

        // Initialize visibility of fields based on initial state
        toggleRequestFields();
        updateFormValidation();
        $("#resource-button").hide();
        });
    });

    document.addEventListener("DOMContentLoaded", function() {
        // Get the button element
        const button = document.getElementById("cancel");
        button.addEventListener("click", function() {
            $('#resource_type_container').hide();
            $('#service_unit_container').hide();
            $('#common-fields').hide();
            $('#existing-resources-preview').show();
            $("#resource-button").show()
        });
    });

    function setupEventHandlers() {
       
        // Use event delegation for dynamically added inputs
        $(document).on('change', '#request-type', toggleRequestFields);
        $(document).on('change', 'input[name="new-or-renewal"]', function () {
            toggleAllocationFields(); // Existing function for showing/hiding fields
            //toggleExistingServiceUnitsTable(); // Ensure the table updates correctly
            });
        $(document).on('change', 'input[name="allocation-choice"]', toggleAllocationTierOptions);

        $(document).on('change', 'input[name="type-of-request"]', toggleStorageFields);
        $(document).on('change', 'input[name="storage-choice"]', toggleStorageTierOptions);
    
        // General input, select, and textarea validation and updates
        $(document).on('input change', '#combined-request-form input, #combined-request-form select, #combined-request-form textarea', function (event) {
            if ($(event.target).is('input[name="selected-st"]')) {
                // Get the currently checked radio button (in case of multiple triggers)
                const $selectedRadio = $('input[name="selected-st"]:checked');
                // Traverse to the parent <tr>
                const $parentRow = $selectedRadio.closest('tr');
                const storageText = $parentRow[0].cells[5].textContent.trim();
                const number = parseInt(storageText);
                selectedUpdateResourceName = $parentRow[0].cells[3].textContent.trim();
                selectedUpdateResourceTier = $parentRow[0].cells[4].textContent.trim();
                selectedUpdateGroupName = $parentRow[0].cells[2].textContent.trim();
                $('#capacity').val(number); // Update the capacity field with the selected row's storage size
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
            }
            updatePayloadPreview(); // Update the real-time payload preview
            updateBillingVisibility(); // Update billing visibility
        });

        //refresh groups when you click on dropdown
        $(document).on('click', '#mygroups-group', async function () {
            await refreshAndPopulateGroups();
            console.log('Clicked!');
        });
        $(document).on('click', '#storage-mygroups-group', async function () {
            await refreshAndPopulateGroups();
        });

        // Attach submit event handler
        $(document).on('submit', '#combined-request-form', handleFormSubmit);

        $(document).on("change", 'input[name="selected-su"]', function (event) {
            
                // Get the currently checked radio button (in case of multiple triggers)
                const $selectedRadio = $('input[name="selected-su"]:checked');
                // Traverse to the parent <tr>
                const $parentRow = $selectedRadio.closest('tr');
                const fullText = $parentRow[0].cells[5].textContent.trim(); // 5th <td> (index 4)
                const match = fullText.match(/(\d+)\s+SUs/);
                const tire = $parentRow[0].cells[4].textContent.trim();
                if(tire === "ssz_standard") {
                    const number = parseInt(match[1]);
                    $('#su-quantity').val(number); 
                    console.log("Selected SUs:", number); 
                    document.getElementById("su-quantity").disabled = true;
                } else {
                    $('#su-quantity').val(0);
                    document.getElementById("su-quantity").disabled = false;
                }
                // Retrieve the data-additional attribute
                const additionalData = $parentRow.attr('data-additional');
                //CHange the su's requested to the value of the renewal selected
                // Parse it to an object (if needed)
                let billingData;
                try {
                    billingData = JSON.parse(additionalData);
                } catch (e) {
                    console.error("Failed to parse billing data:", e);
                }
                
                // Call your updateBilling method with the parsed data
                updateBilling(billingData);
                                
        
            
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
            if(formData.requestType==="storage" && (formData.typeOfRequest === 'update-storage')){
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
        //setTimeout(() => errorDiv.remove(), 10000); // Remove after 10 seconds
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
        const isRetire = formData.typeOfRequest === 'retire-storage'
        // Set the correct HTTP method
        var method = isRenewal ? 'PUT' : 'POST';
        if(isRetire){
            method = 'DELETE'; // Use DELETE for retiring storage
        }
        console.log(`Submitting ${method} request for ${isRenewal ? "Renewal" : "New Request"}...`);
    
        // Ensure correct URL for PUT (Renewals)
        let requestUrl = `${API_CONFIG.baseUrl}/${userId}`;
        if (isRenewal && formData.existingProject) {
            requestUrl += `/${formData.existingProject}`;
        }
        if(isRetire ){
            const requestType= formData.requestType==="storage" ? "storage" : "hpc_service-units";
            const group=$('input[name="selected-st"]:checked').closest('tr').find('td').eq(2).text().trim();
            const requestName = $('input[name="selected-st"]:checked').closest('tr').find('td').eq(2).text().trim()+"-"+$('input[name="selected-st"]:checked').closest('tr').find('td').eq(3).text().trim();
            requestUrl += `?group_name=${group}&resource_request_type=${requestType}&resource_requst_name=${requestName}`;
        }
        // Check for `trigger_notification` flag in payload
        if (isRenewal && payload.length > 0 && payload[0].trigger_notification) {
            console.log("Triggering notification for renewal request.");
        }
        var settings = {};
        if(!isRetire){
        // Remove "Origin" header (Handled automatically by browser)
         settings = {
            url: requestUrl,
    method: method,
    timeout: 0,
    contentType: "application/json",  
    dataType: "json",                 
    data: JSON.stringify(payload),
    xhrFields: {
        withCredentials: true
    }
        };
        }else{
             settings = {
                url: requestUrl,
                method: method,
                timeout: 0,
                dataType: "json",
                headers: {
                    "Content-Type": "application/json"
                },
                xhrFields: {
                    withCredentials: true
                }
            };
        }
        try {
            const response = await $.ajax(settings);
    
            if (Array.isArray(response) && response[0].status === "error") {
                showErrorMessagePost("Submission failed: " + response[0].message);
                $('#submit').prop('disabled', false);
                return null;
            }
    
            console.log(`Form ${method === 'PUT' ? 'updated' : 'submitted'} successfully:`, response);
    
            sessionStorage.setItem('submissionSuccess', isRenewal
                ? "Your renewal request has been submitted successfully!"
                : "Your request has been submitted successfully!");
    
            location.reload();
            return response;
    
        } catch (error) {
            console.error(`Submission failed (${method}):`, error.responseText || error);
            showErrorMessagePost("Submission failed. Please try again.");
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
    function disabledownsize(inputId) {
        const input = document.getElementById(inputId);
        if (!input) return;

        // Get the current value to treat as the minimum allowed going forward
         const minValue = parseInt(input.value);

         // Prevent decreasing via arrow keys or manual typing
        input.addEventListener('input', function () {
          if (parseInt(this.value) < minValue) {
            this.value = minValue;
            }
        });

        input.addEventListener('keydown', function (e) {
           if (e.key === 'ArrowDown') {
              e.preventDefault(); // Block the down arrow
          }
        });
    }

    function updateBilling(billingData) {
        if (billingData) {
            if (billingData[0].project && typeof billingData[0].project === 'string' && billingData[0].project.trim().length > 0) {
                $('#funding-number').val(billingData[0].project || '');
                $('#funding-project').prop('checked', true);
            }
            if (billingData[0].gift && typeof billingData[0].gift === 'string' && billingData[0].gift.trim().length > 0) {
                $('#funding-number').val(billingData[0].gift || '');
                $('#funding-gift').prop('checked', true);
            }
            if (billingData[0].grant && typeof billingData[0].grant === 'string' && billingData[0].grant.trim().length > 0) {
                $('#funding-number').val(billingData[0].grant || '');
                $('#funding-grant').prop('checked', true);
            }
            if (billingData[0].designated && typeof billingData[0].designated === 'string' && billingData[0].designated.trim().length > 0) {
                $('#funding-number').val(billingData[0].designated || '');
                $('#funding-designated').prop('checked', true);
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
            $('#financial-contact').trigger("change").trigger("input"); //trigger the form update
        }
    }

    function updateBillingVisibility() {
        const requestType = $('select[name="request-type"]').val();
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
        const billingDetails = getBillingDetails();
        const storageChange = formData.typeOfRequest === 'update-storage';
        const allocationChange = formData.newOrRenewal === "renewal";
        var selectedSU = "n/a";
        let selectedGroup = formData.group ? formData.group.trim() : "";
       // let selectedTier, hpcServiceUnitKey, storageKey;
        if (formData.requestType === "service-unit") {
           if (formData.newOrRenewal === "renewal") {
              // Extract from the selected SU in the renewal table
               selectedSU = $('input[name="selected-su"]:checked').val();
               if (selectedSU) {
                   var checkedRadio=$('input[name="selected-su"]:checked')               
                   selectedTier=checkedRadio.closest('tr').find('td:nth-child(4)').text().trim();
                   selectedGroup=checkedRadio.closest('tr').find('td:nth-child(3)').text().trim();                
                 }
                 let existingResource = consoleData[0]?.user_resources?.find(resource =>
                    resource.group_name.toLowerCase() === selectedGroup.toLowerCase() &&
                    resource.resources?.hpc_service_units?.[selectedSU]?.tier.toLowerCase() === selectedTier.toLowerCase()
                );
                if (!existingResource) {
                    showErrorMessage(`⚠ The selected Group and Tier do not match any existing resources.`);
                    return null;
                }
                console.log(`Renewal detected: ${selectedGroup} - ${selectedTier}. Fetching existing SU details.`);
        
                // Get existing request count to avoid unintended changes
                const existingRequestCount = existingResource.resources?.hpc_service_units?.[selectedSU]?.request_count || "50000";
               // Construct minimal payload for PUT (Renewal)
                const renewalPayload = {
                    "group_name": selectedGroup,
                    "project_name": existingResource.project_name,
                    "project_desc": existingResource.project_desc,
                    "data_agreement_signed": existingResource.data_agreement_signed,
                    "pi_uid": userId,
                    "resources": {
                        "hpc_service_units": {
                            [selectedSU]: {
                                "tier": selectedTier,
                                "request_count": formData.requestCount, 
                                "billing_details": billingDetails, // Updated billing details
                                "update_date": new Date().toISOString() // Set new timestamp
                            }
                        }
                    }                
                };
                console.log("Final Renewal Payload (PUT):", JSON.stringify(renewalPayload, null, 2));
                return [renewalPayload];
            } else 
            {
                selectedTier = getTierEnum(formData.allocationTier);
                hpcServiceUnitKey = selectedGroup +"-"+ selectedTier
                // Handle New Requests payload
                newResource = {
                    "group_name": selectedGroup,
                    "project_name": formData.projectName?.trim() || "Test Project",
                    "project_desc": formData.projectDescription?.trim() || "This is free text",
                    "data_agreement_signed": $('#data-agreement').is(':checked'),
                    "pi_uid": userId,
                    "resources": {
                        "hpc_service_units": {
                            [selectedGroup]: {
                                "tier": selectedTier,
                                "request_count": formData.requestCount || "1000",
                                "billing_details": billingDetails
                            }
                        }
                    }
                };
                console.log("Final New Request Payload (POST):", JSON.stringify(newResource, null, 2));
                return [newResource]; // Return as an array
            }   
        } 
        else if (formData.requestType == "storage") {
                 if (formData.typeOfRequest === 'update-storage') {
                      //selectedTier = formData.storageTier ? getStorageTierEnum(formData.storageTier) : "";
                      // Construct minimal payload for PUT (change)
                      let changePayload = {
                        "group_name": selectedUpdateGroupName,
                        "data_agreement_signed": $('#data-agreement').is(':checked'),
                        "pi_uid": userId,
                        "project_name": formData.project_title?.trim() || "Test Project",
                        "project_desc": formData.projectDescription.trim() || "This is free text",
                        "resources": {
                            "storage": {
                                [selectedUpdateResourceName]: {
                                    "tier": selectedUpdateResourceTier,
                                    "request_size": formData.request_size || "0",
                                    "billing_details": billingDetails
                                 }
                              }
                           }
                        };
                        console.log("Final Storage Change Payload (PUT):", JSON.stringify(changePayload, null, 2));
                        return [changePayload];
                   } else {
                      selectedTier = formData.storageTier ? getStorageTierEnum(formData.storageTier) : "";
                      storageKey = selectedGroup +"-"+ selectedTier
                      // Handle New Requests payload
                      newResource = {
                         "group_name": selectedGroup,                
                         "data_agreement_signed": $('#data-agreement').is(':checked'),
                         "pi_uid": userId,
                         "project_name": formData.project_title?.trim() || "Test Project",
                         "project_desc": formData.projectDescription.trim() || "This is free text",
                         "resources": {
                             "storage": {
                                 [selectedGroup]: {
                                     "tier": selectedTier,
                                     "request_size": formData.request_size || "0",
                                     "billing_details": billingDetails
                                  }
                               }
                            }
                        };
                        console.log("Final New Request Payload (POST):", JSON.stringify(newResource, null, 2));
                        return [newResource]; // Return as an array
                    }
        }
        if ( (!allocationChange ||!storageChange)   && (!selectedGroup || !selectedTier)) {
            console.error(`⚠ Missing required values: Group: ${selectedGroup}, Tier: ${selectedTier}`);
            showErrorMessage("⚠ Please select a valid Group and Tier.");
            return null;
        }
    }

    // Validate Payload

    function validatePayload(payload) {
        const errors = [];
        if($('input[name="type-of-request"]:checked').val() === 'retire-storage'){
            return errors;
        }
        // Ensure payload is an array with exactly one object
        if (!Array.isArray(payload) || payload.length !== 1) {
            errors.push("Payload must be an array containing a single object.");
            return errors;
        }
    
        const resourceWrapper = payload[0];
        const isRenewal = $('input[name="new-or-renewal"]:checked').val() === 'renewal';
        var isStorage = $('select[name="request-type"]').val() === 'storage';
        var isStorageChange=$('input[name="type-of-request"]:checked').val() === 'update-storage';
        // **If it's a renewal, user_resources array should NOT be validated for new entries**
        // if (isRenewal) {
        //     if (!resourceWrapper.group_name || !resourceWrapper.resources?.hpc_service_units) {
        //         errors.push("Renewal request must include a valid Group and existing HPC Service Unit.");
        //     }
    
            // Ensure the update_date field is present for renewal
            // const hpcKeys = Object.keys(resourceWrapper.resources?.hpc_service_units || {});
            // if (hpcKeys.length === 0 || !resourceWrapper.resources.hpc_service_units[hpcKeys[0]].update_date) {
            //     errors.push("Renewal request must include an update_date field.");
            //}
    
           // return errors; // Skip other validations for renewals
        //}
        if(isStorage && !isStorageChange){
            Object.values(payload[0].resources.storage).forEach((group, index) => {
                // Check for required properties
                if (!group.tier) {
                  console.log(`You must select a storage tier.`);
                } 
                if(!group.request_size || group.request_size === "0") {
                    console.log(`You must have a storage size > 0.`);
                }
                if(isStorageChange){
                    if(!group.request_size || group.request_size === "0") {
                        console.log(`You must have a request size > 0.`);
                    }
                }
              });
    
            return errors; // Skip other validations for storage
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
    // Refresh and Populate Groups
    // ===================================

    async function refreshAndPopulateGroups() {
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
    
        } catch (error) {
            console.error("Error fetching user groups:", error);
            handleApiError(error); // Display a user-friendly error message
        } finally {
            // Remove the waiting message
            utils?.removeWaitingMessage?.() || waitingMessage.remove();
        }
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
                //$dropdown.prop('disabled', true);
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
            } 
    
            if (resourceType==="SU" && resource.resources?.hpc_service_units) {
                Object.entries(resource.resources.hpc_service_units).forEach(([resourceName, details]) => {
                    const tier = details.tier || "N/A";
                    const requestCount = details.request_count ? `${details.request_count} SUs` : "N/A";
                    var shortDate=formatDateToEST(details.update_date || details.request_date);
                    const request_status=details.request_status || "N/A";
                    const updateDate = details.update_date ? `Updated: ${shortDate}` : `Requested: ${shortDate || "No date available"}`;
    
                    const row = `
                        <tr>
                            <td>${resourceType}</td>
                            <td>${projectName}</td> 
                            <td>${groupName}</td>
                            <td>${resourceName}</td>
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
                Object.entries(resource.resources.storage).forEach(([resourceName, details]) => {
                    const tier = details.tier || "N/A";
                    const storageSize = details.request_size ? `${details.request_size} TB` : "N/A";
                    var shortDate=formatDateToEST(details.update_date || details.request_date);
                    const request_status=details.request_status || "N/A";
                    const updateDate = details.update_date ? `Updated: ${shortDate}` : `Requested: ${shortDate || "No date available"}`;
    
                    const row = `
                        <tr>
                            <td>${resourceType}</td>
                            <td>${projectName}</td> 
                            <td>${groupName}</td>
                            <td>${resourceName}</td>
                            <td>${tier}</td>
                            <td>${storageSize}</td>
                            <td>${request_status}</td>
                            <td>${updateDate}</td>
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
                Object.entries(resource.resources.storage).forEach(([resourceName, details]) => {
                    const tier = details.tier || "N/A";
                    const storageSize = details.request_size? `${details.request_size} TB` : "N/A";
                    var shortDate=formatDateToEST(details.update_date || details.request_date);
                    const updateDate = details.update_date ? `Updated: ${shortDate}` : `Requested: ${shortDate || "No date available"}`;
                    const billingJson = JSON.stringify(details.billing_details.fdm_billing_info);
                    const requestStatus = details.request_status ? `${details.request_status}` : "N/A";
                    const row = `
                        <tr data-additional='${billingJson}'>
                            <td>
                                <input type="radio" name="selected-st" value="${groupName}-${tier}" 
                                    data-group="${groupName}" data-tier="${tier}">
                            </td>
                            <td>${projectName}</td> 
                            <td>${groupName}</td>
                            <td>${resourceName}</td>
                            <td>${tier}</td>
                            <td>${storageSize}</td>
                            <td>${requestStatus}</td>
                            <td>${updateDate}</td>
                            
                        </tr>
                    `;
                    suTableBody.append(row);
                });
            }
        });
        document.getElementById("project-title").value = userResources[0].project_name;
        document.getElementById("project-description-text").value = userResources[0].project_desc;
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
            Object.entries(resource.resources.hpc_service_units).forEach(([resourceName, details]) => {
                const tier = details.tier || "N/A";
                const requestCount = details.request_count ? `${details.request_count} SUs` : "N/A";
                const requestStatus = details.request_status ? `${details.request_status}` : "N/A";
                const updateDate = details.update_date ? `Updated: ${formatDateToEST(details.update_date)}` : `Requested: ${formatDateToEST(details.request_date)}`;
                if (details.billing_details && details.billing_details.fdm_billing_info &&
                    Object.values(details.billing_details.fdm_billing_info).every(val => val !== null)) {
                const billingJson = JSON.stringify(details.billing_details.fdm_billing_info);
                    
                const row = `
                    <tr data-additional='${billingJson}'>
                        <td>
                            <input type="radio" name="selected-su" value="${groupName}-${tier}" 
                                data-group="${groupName}" data-tier="${tier}" data-project="${projectName}">
                        </td>
                        <td>${projectName}</td> 
                        <td>${groupName}</td>
                        <td>${resourceName}</td>
                        <td>${tier}</td>
                        <td>${requestCount}</td>
                        <td>${requestStatus}</td>
                        <td>${updateDate}</td>
                    </tr>
                `;
                suTableBody.append(row);
                    }
            });
        }
    });
    document.getElementById("new-project-name").value = userResources[0].project_name;
    document.getElementById("project-description-text-storage").value = userResources[0].project_desc;
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
        const requestType = $('select[name="request-type"]').val();
    
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
        const successMsg = sessionStorage.getItem('submissionSuccess');
        if (successMsg) {
            showSuccessMessage(successMsg);
            sessionStorage.removeItem('submissionSuccess'); // Clear it so it doesn't show again on the next reload
        }
        try {
            // Hide sections initially to avoid flickering
            $('#resource_type_container, #service_unit_container, #common-fields, #billing-information').hide();
    
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
            if(!apiMetadata[0].is_user_resource_request_elligible){
                $('#combined-request-form').hide();
                $('#error-message-container').html('<span class="alert alert-danger">You are not eligible to make a resource request. please contact system admin.</span>').show();
            }
            

            // Update form elements using fetched metadata
            updateFormUsingMetadata(apiMetadata);
    
            // Fetch user groups and populate dropdowns
            await fetchAndPopulateGroups();
    
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