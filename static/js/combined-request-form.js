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
            'X-Requested-With': 'XMLHttpRequest'
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
    // Holds API Data
    // ===================================

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
            const isCheckbox = $field.is(':checkbox');
        
            if (isCheckbox) {
                if (!$field.is(':checked')) {
                    markFieldInvalid($field, 'This field is required.');
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
        
                ${JSON.stringify(payload, null, 2)}
        
                Best regards,
                Research Computing Team
            `;
        
            // Replace with backend email API
            console.log(`Simulating email to ${email}`);
            console.log(`Subject: ${emailSubject}`);
            console.log(`Body:\n${emailBody}`);
        }

        /// Clear Form Fields

        function clearFormFields() {
            $('#combined-request-form')[0].reset(); // Reset the form fields
            updateFormValidation(); // Revalidate the form to disable the submit button
            console.log("Form fields cleared.");
        }

        /// Success Message

        function showSuccessMessage(message) {
            const successDiv = $('<div>')
                .addClass('alert alert-success')
                .css({ margin: '20px 0', fontSize: '1rem' })
                .text(message);
        
            $('#combined-request-form').prepend(successDiv);
        
            // Automatically remove the message after 5 seconds
            setTimeout(() => successDiv.remove(), 5000);
        }

    // ===================================
    // Error Handling
    // ===================================

    function showErrorMessage(message) {
        const errorDiv = $('<div>').addClass('alert alert-danger').text(message);
        $('#combined-request-form').prepend(errorDiv);
        setTimeout(() => errorDiv.remove(), 5000);
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
        $('#allocation-fields, #storage-fields, #common-fields').hide();
    
        if (requestType === 'service-unit') {
            $('#allocation-fields, #common-fields').show();
        } else if (requestType === 'storage') {
            $('#storage-fields, #common-fields').show();
        }
    
        updateBillingVisibility();
    }

    function toggleAllocationFields() {
        const newOrRenewal = $('input[name="new-or-renewal"]:checked').val();
        const isNew = newOrRenewal === 'new';
    
        $('#new-project-name-container').toggle(isNew);
        $('#mygroups-group-container').toggle(isNew); // Show for new SU request
        $('#existing-projects-allocation').toggle(!isNew);
        $('#allocation-tier').toggle(isNew);
    
        updateFormValidation();
    }

    function toggleStorageFields() {
        const typeOfRequest = $('input[name="type-of-request"]:checked').val();
        const isNewStorage = typeOfRequest === 'new-storage';
    
        $('#storage-platform, #shared-space-name-container').toggle(isNewStorage);
        $('#existing-projects-storage').toggle(!isNewStorage);
        $('#storage-mygroups-container').toggle(isNewStorage); // Show for new storage share
    
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

        /// Setup Event Handlers

        function setupEventHandlers() {
            //// Handle changes to Service Unit vs. Storage request type
            $('input[name="request-type"]').on('change', function () {
                toggleRequestFields(); ///// Update the main container visibility
                updatePayloadPreview(); ///// Update the payload preview
                updateBillingVisibility(); ///// Update billing visibility logic
            });

            //// Handle New vs. Renewal selection for Service Unit requests
            $('input[name="new-or-renewal"]').on('change', function () {
                toggleAllocationFields(); ///// Update fields within #allocation-fields
                updatePayloadPreview(); ///// Update the payload preview
            });

            //// Handle Storage request type changes (e.g., "Create new storage share")
            $('input[name="type-of-request"]').on('change', function () {
                toggleStorageFields(); ///// Update fields within #storage-fields
                updatePayloadPreview(); ///// Update the payload preview
            });

            //// Handle changes to Storage Tier options (e.g., "SSZ Research Standard")
            $('input[name="storage-choice"]').on('change', function () {
                toggleStorageTierOptions(); ///// Update tier-specific fields
                updatePayloadPreview(); ///// Update the payload preview
            });

            //// Handle changes to capacity and other fields impacting billing visibility
            $('#capacity').on('input change', function () {
                updateBillingVisibility(); ///// Ensure billing information is toggled correctly
                updatePayloadPreview(); ///// Update the payload preview
            });

            //// General input, select, and textarea validation and updates
            $('#combined-request-form input, #combined-request-form select, #combined-request-form textarea')
                .on('input change', function () {
                    validateField($(this)); ///// Validate individual fields
                    updateFormValidation(); ///// Check overall form validation
                    updatePayloadPreview(); ///// Update the payload preview
                    updateBillingVisibility(); ///// Reassess billing visibility
                });

            console.log('Event handlers successfully set up.');
        }

        /// Form Submission Handler

        $('#combined-request-form').on('submit', async function (event) {
            event.preventDefault(); // Prevent default form submission
        
            console.log("Form submission triggered.");
        
            const payload = buildPayloadPreview();
            const errors = validatePayload(payload);
        
            if (errors.length > 0) {
                console.error("Validation errors:", errors);
                showErrorMessage("Please fix the errors before submitting.");
                return; // Stop submission on validation errors
            }
        
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
        
                // Display success message on the page
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
        const maxLimits = {
            'SSZ Research Standard': 200,
            'Highly Sensitive Data': 100,
            'SSZ Research Project': 500
        };
        capacityField.attr('max', maxLimits[tierType] || 200);
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
                            request_count: formData.requestCount || "0", // Ensure this field is dynamic
                            billing_details: getBillingDetails()
                        }
                    },
                    storage: {}
                }
            };
            payload[0].user_resources.push(userResource);
        }
    
        if (formData.requestType === 'storage') {
            const key = `${formData.group}-${getStorageTierEnum(formData.storageTier)}`;
            const isBillingExempt = (
                formData.storageTier === 'SSZ Research Standard' &&
                formData.capacity <= 10 &&
                formData.typeOfRequest === 'new-storage'
            );
    
            const userResource = {
                data_agreement_signed: $('#data-agreement').is(':checked'),
                delegates_uid: "",
                group_id: "",
                group_name: formData.group || "Unknown Group",
                pi_uid: userId,
                project_desc: $('#project-description').val()?.trim() || "",
                project_name: formData.projectName?.trim() || "",
                resources: {
                    hpc_service_units: {},
                    storage: {
                        [key]: {
                            tier: getStorageTierEnum(formData.storageTier),
                            request_size: formData.capacity?.toString() || "0", // Ensure this field is dynamic
                            billing_details: !isBillingExempt ? getBillingDetails() : undefined
                        }
                    }
                }
            };
            payload[0].user_resources.push(userResource);
        }
    
        console.log("Built payload:", JSON.stringify(payload, null, 2));
        return payload;
    }

    function validatePayload(payload) {
        const errors = [];
    
        // Ensure the payload structure is valid
        const userResources = payload[0]?.user_resources || [];
    
        // Iterate through each resource to validate
        userResources.forEach((resource, index) => {
            // Check general resource fields
            if (!resource.group_name || resource.group_name === "Unknown Group") {
                errors.push(`Resource ${index + 1}: Group name is required.`);
            }
    
            if (!resource.project_name) {
                errors.push(`Resource ${index + 1}: Project name is required.`);
            }
    
            if (!resource.data_agreement_signed) {
                errors.push(`Resource ${index + 1}: Data agreement must be signed.`);
            }
    
            // Validate HPC service units if they exist
            const hpcServiceUnits = resource.resources?.hpc_service_units || {};
            const hpcBillingRequired = Object.values(hpcServiceUnits).some(unit => {
                return unit.billing_details === undefined;
            });
    
            // Validate storage resources if they exist
            const storage = resource.resources?.storage || {};
            const storageBillingRequired = Object.values(storage).some(item => {
                const isBillingExempt = item.tier === "ssz_standard" && parseInt(item.request_size, 10) <= 10;
                return !isBillingExempt && !item.billing_details;
            });
    
            if (hpcBillingRequired || storageBillingRequired) {
                errors.push(`Resource ${index + 1}: Billing details are required for this request.`);
            }
        });
    
        // Log errors if any
        if (errors.length > 0) {
            console.error("Payload validation errors:", errors);
        }
    
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
            $dropdown.empty(); // Clear existing options
    
            console.log(`Populating dropdown: ${$dropdown.attr('id')} with groups:`, groups);
    
            // Add a default "Select a group" option
            $dropdown.append(
                $('<option>', {
                    value: '',
                    text: '- Select a group -',
                    selected: true,
                    disabled: true,
                })
            );
    
            // Populate the dropdown with the fetched groups
            if (groups.length) {
                groups.forEach(group => {
                    const groupName = typeof group === 'string' ? group : group.name;
                    $dropdown.append(
                        $('<option>', {
                            value: groupName.trim(),
                            text: groupName.trim(),
                        })
                    );
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
            showErrorMessage("Failed to initialize form. Please refresh the page.");
        }
    }

    // ===================================
    // Start Initiation
    // ===================================
    initialize();
});