// Combined Request Form
$(document).ready(function () {
    console.log("Script started");
    console.log("Combined request form JS loaded");

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

    // User Session Management
    async function waitForUserSession() {
        let attempts = 0;
        const maxAttempts = 150; // Increased to 15 seconds total
        
        while (attempts < maxAttempts) {
            // Check for both form_user_info div and user_id field
            const userInfoDiv = document.getElementById('form_user_info');
            const userIdField = document.querySelector('[name="user_id"]');
            
            // Also check if the value is actually populated
            if (userInfoDiv && userIdField && userIdField.value) {
                console.log("User ID found:", userIdField.value);
                return userIdField.value;
            }
            // More detailed logging
            if (attempts % 10 === 0) {
                console.log(`Waiting for user session... Attempt ${attempts + 1}/${maxAttempts}`);
                console.log('User info div present:', !!userInfoDiv);
                console.log('User ID field present:', !!userIdField);
                console.log('User ID value:', userIdField?.value);
            }
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
        }
        throw new Error('Could not get user ID after waiting - user session not available');
    }

    // API Configuration
    const API_CONFIG = {
        baseUrl: 'https://uvarc-unified-service.pods.uvarc.io/uvarc/api/resource/rcwebform/user',
        headers: {
            'Accept': 'application/json'
        }
    };

    // Constants for resource types and their properties
    const RESOURCE_TYPES = {
        'Standard': { 
            isPaid: false,
            description: 'Standard allocation for research projects',
            category: 'Rivanna HPC'
        },
        'Paid': { 
            isPaid: true,
            description: 'Paid allocation for additional computing needs',
            category: 'Rivanna HPC'
        },
        'Instructional': { 
            isPaid: false,
            description: 'Allocation for teaching and educational purposes',
            category: 'Rivanna HPC'
        },
        'SSZ Research Project': { 
            isPaid: true,
            description: 'High-performance project storage',
            category: 'Storage'
        },
        'SSZ Research Standard': { 
            isPaid: (currentSize) => currentSize > 10,
            freeLimit: 10,
            description: 'Standard research storage (first 10TB free)',
            category: 'Storage'
        },
        'Highly Sensitive Data': {
            isPaid: true,
            description: 'Secure storage for sensitive data',
            category: 'Storage'
        }
    };

    // Validation patterns
    const VALIDATION = {
        groupName: /^[a-zA-Z0-9\-_]+$/,
        projectName: /^[\w\-\s]{3,128}$/,
        sharedSpaceName: /^[\w\-]{3,40}$/
    };
    // Error handling utility functions
    const ErrorHandler = {
        showUserMessage: (message, type = 'error', duration = 5000) => {
            const alertClass = type === 'error' ? 'alert-danger' : 'alert-warning';
            const errorDiv = $('<div>')
                .addClass(`alert ${alertClass} alert-dismissible fade show`)
                .html(`
                    <strong>${type === 'error' ? 'Error' : 'Warning'}:</strong> ${message}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                `)
                .prependTo('#combined-request-form');

            if (duration) {
                setTimeout(() => errorDiv.fadeOut('slow', function() {
                    $(this).remove();
                }), duration);
            }
            return errorDiv;
        },

        handleApiError: (error, context) => {
            console.error(`API Error (${context}):`, error);
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
            } else if (error.message.includes('status code')) {
                message = `
                    <div class="alert alert-warning" role="alert">
                        <h4 class="alert-heading">Service Unavailable</h4>
                        <p>There was a problem connecting to the service. This could be temporary.</p>
                        <hr>
                        <p class="mb-0">Please try again in a few minutes. If the problem persists, contact Research Computing Support.</p>
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
            $('#mygroups-group')
                .prop('disabled', true)
                .addClass('is-invalid');
        },

        disableForm: (message = 'Form is currently unavailable') => {
            $('#combined-request-form')
                .find(':input')
                .prop('disabled', true);
            
            ErrorHandler.showUserMessage(message, 'warning', 0);
        }
    };

    // Utility functions
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

        isValidGroupFormat: (name) => {
            // New function to check if group name follows the required format
            // Allows: letters, numbers, dashes, underscores
            // Does not allow: spaces or any other special characters
            return /^[a-zA-Z0-9\-_]+$/.test(name);
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
            ErrorHandler.handleApiError(error, context);
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
                        <div>Loading user information...</div>
                    </div>
                `)
                .prependTo('#combined-request-form');
        },

        removeWaitingMessage: () => {
            $('.api-waiting-message').remove();
        },

        logVisibility: () => {
            console.log("Allocation fields visible:", $('#allocation-fields').is(":visible"));
            console.log("Storage fields visible:", $('#storage-fields').is(":visible"));
            console.log("Common fields visible:", $('#common-fields').is(":visible"));
            console.log("Tier options visible:", $('#storage-platform').is(":visible"));
            console.log("Shared space name container visible:", $('#shared-space-name-container').is(":visible"));
            console.log("Project title container visible:", $('#project-title-container').is(":visible"));
            console.log("Existing projects storage visible:", $('#existing-projects-storage').is(":visible"));
            console.log("Sensitive data message visible:", $('#sensitive-data').is(":visible"));
            console.log("Standard data message visible:", $('#standard-data').is(":visible"));
            console.log("Billing information visible:", $('#billing-information').is(":visible"));
        }
    };
    // API Integration with User Session
    async function fetchAndPopulateGroups() {
        const waitingMessage = utils.showWaitingMessage();
        
        try {
            const computingId = await waitForUserSession();
            console.log("Attempting API call with computing ID:", computingId);

            const response = await fetch(
                `${API_CONFIG.baseUrl}/${computingId}`,
                {
                    method: 'GET',
                    headers: API_CONFIG.headers
                }
            );

            const [data, statusCode] = await utils.handleApiResponse(response);
            console.log('Groups data:', data);
            console.log('Status code:', statusCode);

            if (statusCode !== 200) {
                throw new Error(`API returned status code ${statusCode}`);
            }

            if (!data.is_user_resource_request_elligible) {
                console.log('User is not eligible for resource requests');
                handleNonEligibleUser();
                return;
            }

            populateGrouperMyGroupsDropdown(data.user_groups);

        } catch (error) {
            utils.logApiError(error, 'fetchAndPopulateGroups');
        } finally {
            utils.removeWaitingMessage();
        }
    }

    function populateGrouperMyGroupsDropdown(groups) {
        const dropdown = $('#mygroups-group');
        dropdown.empty();
        dropdown.append('<option value="">- Select a group -</option>');
        
        // Sort groups alphabetically
        const sortedGroups = [...groups].sort((a, b) => a.localeCompare(b));
        
        // Comment out validation counting
        // let validCount = 0;
        // let invalidCount = 0;
        
        sortedGroups.forEach(groupName => {
            const option = $('<option>')
                .val(groupName)
                .text(groupName);
            
        // Comment out validation logic
                /*
                if (utils.isValidGroupFormat(groupName)) {
                    validCount++;
                    option.data('valid', true);
                } else {
                    invalidCount++;
                    option
                        .addClass('text-muted')
                        .prop('disabled', true)
                        .attr('title', 'Group name can only contain letters, numbers, dashes, and underscores')
                        .text(`${groupName} (Invalid format)`)
                        .data('valid', false);
                }
                */
            
            // Instead, just add all groups as valid
            option.data('valid', true);
            
            dropdown.append(option);
        });
    /*
        updateGroupValidationMessages(validCount, invalidCount);
        
        // If no valid groups are available, disable the dropdown
        if (validCount === 0) {
            dropdown.prop('disabled', true);
        }
    }

    function updateGroupValidationMessages(validCount, invalidCount) {
        const messagesContainer = $('#group-validation-message');
        messagesContainer.empty();

        if (invalidCount > 0) {
            messagesContainer.append(`
                <div class="warning-message">
                    <p>${invalidCount} group(s) have invalid names and are disabled.</p>
                    <p>Group names must contain only:</p>
                    <ul class="mb-0">
                        <li>Letters (a-z, A-Z)</li>
                        <li>Numbers (0-9)</li>
                        <li>Dashes (-)</li>
                        <li>Underscores (_)</li>
                    </ul>
                </div>
            `);
        }

        if (validCount === 0) {
            messagesContainer.append(`
                <div class="validation-message" style="display: block;">
                    No valid groups available. Please contact Research Computing Support to create a properly formatted group.
                </div>
            `);
        }
    }
*/
    function handleNonEligibleUser() {
        const message = `
            <div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">Not Eligible for Resource Requests</h4>
                <p>You are currently not eligible to make resource requests. This could be due to:</p>
                <ul>
                    <li>Missing required training or certifications</li>
                    <li>Account status issues</li>
                    <li>Prior requests pending review</li>
                </ul>
                <hr>
                <p class="mb-0">Please contact Research Computing Support for more information about your eligibility status.</p>
            </div>
        `;
        
        $('#combined-request-form')
            .prepend(message)
            .find(':input')
            .prop('disabled', true);
    }

    // Group validation
    function validateGroupSelection() {
        // Temporarily return true for all selections
        return true;
    
        // Original validation code commented out
        /*
        const selectedOption = $('#mygroups-group option:selected');
        if (!selectedOption.val()) return true; // Skip validation if no selection
        return selectedOption.data('valid') === true;
        */
    }
    // Form section visibility management
    function toggleRequestFields() {
        const requestType = $('input[name="request-type"]:checked').val();
        console.log("Selected resource type:", requestType);
        
        // Handle visibility based on request type
        if (requestType === 'service-unit') {
            $('#storage-fields').hide();
            $('#allocation-fields').show();
            $('#category').val('Rivanna HPC');
            loadPreviewTable();
            toggleAllocationFields();
        } else if (requestType === 'storage') {
            $('#allocation-fields').hide();
            $('#storage-fields').show();
            $('#category').val('Storage');
            loadPreviewTable();
            toggleStorageFields();
        }
    
        // Common fields always visible
        $('#common-fields').show();
        updateBillingVisibility();
        utils.logVisibility();
    }

    // Initial form setup function
    function setupInitialFormState() {
        // Ensure Service Unit radio is checked
        $('#request-type-allocation').prop('checked', true);
        
        // Show Service Unit fields by default
        $('#allocation-fields, #common-fields').show();
        $('#storage-fields').hide();
        
        // Set initial category
        $('#category').val('Rivanna HPC');
        
        // Initialize allocation fields
        toggleAllocationFields();
        
        // Update billing visibility
        updateBillingVisibility();
        
        // Load initial data
        loadPreviewTable();
    }

    // Allocation (Service Unit) field toggles
    function toggleAllocationFields() {
        const newOrRenewal = $('input[name="new-or-renewal"]:checked').val();
        console.log("Selected new or renewal:", newOrRenewal);
        const isNew = newOrRenewal === 'new';
        
        // Toggle field visibility
        $('#new-project-name-container').toggle(isNew);
        $('#existing-projects-allocation').toggle(!isNew);
        $('#allocation-tier').toggle(isNew);
        
        // Toggle Grouper requirement only for new requests
        $('#mygroups-group-container').toggle(isNew);
        $('#mygroups-group').prop('required', isNew);
        
        // Update description labels with fade effect
        if (isNew) {
            $("#new-descr").fadeIn(400);
            $("#renewal-descr").fadeOut(400);
        } else {
            $("#new-descr").fadeOut(400);
            $("#renewal-descr").fadeIn(400);
        }

        resetValidationState();
        updateFormValidation();
    }

    // Storage field toggles
    function toggleStorageFields() {
        const typeOfRequest = $('input[name="type-of-request"]:checked').val();
        console.log("Selected type of storage request:", typeOfRequest);
        
        const isNewStorage = typeOfRequest === 'new-storage';
        const isModifyingExisting = ['increase-storage', 'decrease-storage', 'retire-storage'].includes(typeOfRequest);
        const isRetiring = typeOfRequest === 'retire-storage';
        
        // Toggle visibility of storage-related fields
        $('#storage-platform, #shared-space-name-container, #project-title-container')
            .toggle(isNewStorage);
        $('#existing-projects-storage').toggle(isModifyingExisting);
        
        // Toggle Grouper requirement only for new storage
        $('#mygroups-group-container').toggle(isNewStorage);
        $('#mygroups-group').prop('required', isNewStorage);
        
        // Handle capacity field state
        const capacityField = $('#capacity');
        capacityField
            .prop('disabled', isRetiring)
            .val(isRetiring ? '0' : '')
            .prop('min', isRetiring ? '0' : '1');
        
        if (isModifyingExisting) {
            updateStorageModificationFields(typeOfRequest);
        }
        
        updateBillingVisibility();
        toggleStorageTierOptions();
        utils.logVisibility();
    }

    function toggleStorageTierOptions() {
        const selectedStorage = $('input[name="storage-choice"]:checked').val();
        console.log("Selected storage tier:", selectedStorage);
        
        const isHighlySensitive = selectedStorage === 'Highly Sensitive Data';
        
        // Toggle security level messages
        $('#sensitive-data').toggle(isHighlySensitive);
        $('#standard-data').toggle(!isHighlySensitive);
        
        updateCapacityLimits(selectedStorage);
        updateBillingVisibility();
    }

    function updateCapacityLimits(tierType) {
        const capacityField = $('#capacity');
        
        switch(tierType) {
            case 'SSZ Research Standard':
                capacityField.attr('max', '200');
                break;
            case 'Highly Sensitive Data':
                capacityField.attr('max', '100');
                break;
            case 'SSZ Research Project':
                capacityField.attr('max', '500');
                break;
            default:
                capacityField.attr('max', '200');
        }
    }

    async function updateStorageModificationFields(requestType) {
        try {
            const selectedProjectId = $('input[name="existing-project-storage"]:checked').val();
            if (!selectedProjectId) return;

            const projects = await fetchUserProjects();
            const selectedProject = projects.storageProjects.find(p => p.id === selectedProjectId);
            
            if (selectedProject) {
                const capacityField = $('#capacity');
                const currentSize = parseInt(selectedProject.currentSize);
                
                if (requestType === 'decrease-storage') {
                    capacityField.attr('max', currentSize - 1);
                    capacityField.attr('min', '1');
                } else if (requestType === 'increase-storage') {
                    const maxLimit = selectedProject.tier === 'SSZ Research Standard' ? 200 : 500;
                    capacityField.attr('max', maxLimit - currentSize);
                    capacityField.attr('min', '1');
                }
            }
        } catch (error) {
            console.error('Error updating storage modification fields:', error);
            ErrorHandler.showUserMessage('Error updating storage options');
        }
    }

    async function updateBillingVisibility() {
        try {
            const projects = await fetchUserProjects();
            const currentStorageUsage = projects.userStorageUsage['SSZ Research Standard'] || 0;
            const selectedStorageTier = $('input[name="storage-choice"]:checked').val();
            const selectedAllocationTier = $('input[name="allocation-choice"]:checked').val();
            const requestedStorageSize = parseInt($('#capacity').val()) || 0;

            let shouldShowBilling = false;
            let tierNote = '';

            if ($('#allocation-fields').is(':visible') && selectedAllocationTier) {
                shouldShowBilling = utils.isTierPaid(selectedAllocationTier);
            }

            if ($('#storage-fields').is(':visible') && selectedStorageTier) {
                if (selectedStorageTier === 'SSZ Research Standard') {
                    const totalSize = currentStorageUsage + requestedStorageSize;
                    const freeLimit = RESOURCE_TYPES['SSZ Research Standard'].freeLimit;
                    shouldShowBilling = totalSize > freeLimit;
                    
                    tierNote = `Current usage: ${currentStorageUsage} TB of ${freeLimit} TB free allocation.` +
                              (shouldShowBilling ? ' This request will exceed the free limit.' : '');
                } else {
                    shouldShowBilling = utils.isTierPaid(selectedStorageTier);
                }
            }

            $('#billing-information').slideToggle(shouldShowBilling);
            $('#billing-information input, #billing-information select')
                .prop('required', shouldShowBilling);

            if (tierNote) {
                updateTierNote(tierNote);
            }
        } catch (error) {
            console.error('Error updating billing visibility:', error);
            ErrorHandler.showUserMessage('Error determining billing requirements');
        }
    }

    function updateTierNote(message) {
        const $tierNote = $('#tier-note');
        if ($tierNote.length === 0) {
            $('#storage-platform').append(`<div id="tier-note" class="tier-note">${message}</div>`);
        } else {
            $tierNote.html(message);
        }
    }

    function resetValidationState() {
        $('.is-invalid').removeClass('is-invalid');
        $('.invalid-feedback').remove();
        $('.invalid-field-highlight').removeClass('invalid-field-highlight');
    }

    function updateFormValidation() {
        const form = document.getElementById('combined-request-form');
        const isValid = form.checkValidity();
        $('#submit').prop('disabled', !isValid || !$('#data-agreement').is(':checked'));
    }
    // Form validation and submission handling
    function validateForm() {
        resetValidationState();
        let isValid = true;
        let firstInvalidField = null;

        // Special handling for group selection in new requests
        const isNewRequest = ($('input[name="request-type"]:checked').val() === 'service-unit' && 
                            $('input[name="new-or-renewal"]:checked').val() === 'new') ||
                           ($('input[name="request-type"]:checked').val() === 'storage' && 
                            $('input[name="type-of-request"]:checked').val() === 'new-storage');

        if (isNewRequest && !validateGroupSelection()) {
            isValid = false;
            firstInvalidField = $('#mygroups-group');
        }

        // Validate required fields
        $('input:visible[required], select:visible[required], textarea:visible[required]').each(function() {
            if (!validateField($(this))) {
                isValid = false;
                firstInvalidField = firstInvalidField || $(this);
            }
        });

        // Validate radio buttons
        $('input:radio[required]:visible').each(function() {
            const name = $(this).attr('name');
            if ($(`input:radio[name="${name}"]:checked`).length === 0) {
                isValid = false;
                const radioGroup = $(this).closest('.form-radios');
                radioGroup.addClass('invalid-field-highlight');
                if (!radioGroup.next('.invalid-feedback').length) {
                    radioGroup.after('<div class="invalid-feedback">Please select an option.</div>');
                }
                firstInvalidField = firstInvalidField || $(this);
            }
        });

        handleValidationResult(isValid, firstInvalidField);
        return isValid;
    }

    function validateField($field) {
        if (!$field[0].checkValidity()) {
            markFieldInvalid($field, 'This field is required.');
            return false;
        }

        const fieldId = $field.attr('id');
        
        // Validate project name format
        if (fieldId === 'new-project-name' && !utils.validateProjectName($field.val())) {
            markFieldInvalid($field, 'Project name must be 3-128 characters long and contain only letters, numbers, spaces, and hyphens.');
            return false;
        }
        
        // Validate shared space name format
        if (fieldId === 'shared-space-name' && !utils.validateSharedSpaceName($field.val())) {
            markFieldInvalid($field, 'Shared space name must be 3-40 characters long and contain only letters, numbers, and hyphens.');
            return false;
        }

        // Validate capacity field
        if (fieldId === 'capacity') {
            const value = parseInt($field.val());
            const min = parseInt($field.attr('min'));
            const max = parseInt($field.attr('max'));
            
            if (isNaN(value) || value < min || value > max) {
                markFieldInvalid($field, `Please enter a value between ${min} and ${max} TB.`);
                return false;
            }
        }

        // Validate PTAO format if visible
        if (fieldId === 'fdm-id' && $field.is(':visible')) {
            const ptaoPattern = /^\d{6}-\d{5}$/;
            if (!ptaoPattern.test($field.val())) {
                markFieldInvalid($field, 'Please enter a valid FDM ID in the format: 123456-12345');
                return false;
            }
        }

        markFieldValid($field);
        return true;
    }

    function markFieldInvalid($field, message) {
        $field.addClass('is-invalid').removeClass('is-valid');
        const $feedback = $field.next('.invalid-feedback');
        if ($feedback.length === 0) {
            $field.after(`<div class="invalid-feedback">${message}</div>`);
        } else {
            $feedback.text(message);
        }
    }

    function markFieldValid($field) {
        $field.addClass('is-valid').removeClass('is-invalid');
        $field.next('.invalid-feedback').remove();
    }

    function handleValidationResult(isValid, firstInvalidField) {
        if (!isValid && firstInvalidField) {
            firstInvalidField.focus();
            $('html, body').animate({
                scrollTop: firstInvalidField.offset().top - 100
            }, 500);
            
            if ($('#form-error-message').length === 0) {
                $('#combined-request-form').prepend(
                    '<div id="form-error-message" class="alert alert-danger">' +
                    'Please correct the highlighted errors and try again.</div>'
                );
            }
        } else {
            $('#form-error-message').remove();
        }
    }

    // Event handler setup
    function setupEventHandlers() {
        // Resource type selection
        $('input[name="request-type"]').on('change', function() {
            const $label = $(this).next('label');
            if (this.value === 'service-unit') {
                $label.text('Service Unit (SU)');
            } else if (this.value === 'storage') {
                $label.text('Storage');
            }
            
            toggleRequestFields();
            loadPreviewTable().catch(error => {
                console.error('Error loading preview table:', error);
                ErrorHandler.showUserMessage('Error loading resource preview');
            });
        });

        // Service Unit specific handlers
        $('input[name="new-or-renewal"]').on('change', toggleAllocationFields);
        $('input[name="allocation-choice"]').on('change', function() {
            console.log("Selected SU tier:", $(this).val());
            updateBillingVisibility().catch(error => {
                console.error('Error updating billing visibility:', error);
                ErrorHandler.showUserMessage('Error updating billing information');
            });
        });

        // Storage specific handlers
        $('input[name="type-of-request"]').on('change', toggleStorageFields);
        $('input[name="storage-choice"]').on('change', function() {
            if (this.value === 'Highly Sensitive Data') {
                $(this).next('label').text('Highly Sensitive Data');
            }
            toggleStorageTierOptions();
        });

        // Field formatters
        setupFDMFormatter();
        setupProjectNameFormatter();
        setupSharedSpaceFormatter();
        
        // Capacity field handler
        $('#capacity').on('input change', function() {
            if ($('#storage-fields').is(':visible')) {
                updateBillingVisibility().catch(error => {
                    console.error('Error updating billing visibility:', error);
                    ErrorHandler.showUserMessage('Error updating billing information');
                });
            }
        });

        // Group selection handler
        $('#mygroups-group').on('change', function() {
            console.log("Selected group:", $(this).val());
            validateGroupSelection();
            updateFormValidation();
        });

        // Project table row handlers
        setupProjectTableHandlers();

        // Real-time validation handlers
        setupValidationHandlers();

        // Data agreement checkbox
        $('#data-agreement').on('change', function() {
            $('#submit').prop('disabled', !$(this).is(':checked'));
            updateFormValidation();
        });

        // Form submission
        $('#combined-request-form').on('submit', handleFormSubmission);
    }

    // Field formatter setup
    function setupFDMFormatter() {
        $('#fdm-id').on('input', function() {
            let value = $(this).val().replace(/\D/g, '');
            if (value.length > 11) value = value.substr(0, 11);
            if (value.length > 6) {
                value = value.substr(0, 6) + '-' + value.substr(6);
            }
            $(this).val(value);
        });
    }

    function setupProjectNameFormatter() {
        $('#new-project-name').on('input', function() {
            let value = $(this).val().replace(/[^\w\s-]/g, '');
            $(this).val(value);
        });
    }

    function setupSharedSpaceFormatter() {
        $('#shared-space-name').on('input', function() {
            let value = $(this).val().replace(/[^\w-]/g, '');
            $(this).val(value);
        });
    }

    function setupValidationHandlers() {
        const fieldsToValidate = 
            '#combined-request-form input:not([type="radio"]), ' + 
            '#combined-request-form select, ' + 
            '#combined-request-form textarea';
        
        $(document).on('blur change', fieldsToValidate, function() {
            validateField($(this));
            updateFormValidation();
        });

        // Implement debounced validation for text inputs
        let validationTimeout;
        $('#new-project-name, #shared-space-name, #fdm-id').on('input', function() {
            const $field = $(this);
            clearTimeout(validationTimeout);
            validationTimeout = setTimeout(() => {
                validateField($field);
                updateFormValidation();
            }, 300);
        });
    }

    function setupProjectTableHandlers() {
        // Make entire row clickable for selection tables
        $(document).on('click', '.project-row', function(e) {
            if (!$(e.target).is('input[type="radio"]')) {
                $(this).find('input[type="radio"]').prop('checked', true).trigger('change');
            }
        });

        // Handle radio button changes for project selection
        $(document).on('change', '.project-row input[type="radio"]', function() {
            const tableBody = $(this).closest('tbody');
            tableBody.find('.project-row').removeClass('selected');
            $(this).closest('.project-row').addClass('selected');
            
            if ($(this).attr('name') === 'existing-project-storage') {
                const requestType = $('input[name="type-of-request"]:checked').val();
                if (requestType) {
                    updateStorageModificationFields(requestType);
                }
            }
        });
    }
    // Preview and Projects Management
    async function loadPreviewTable() {
        try {
            const previewTableBody = $('#combined-preview-tbody');
            previewTableBody.empty();

            // Show loading state
            previewTableBody.append(`
                <tr>
                    <td colspan="5" class="text-center text-muted">
                        <div class="d-flex justify-content-center align-items-center">
                            <div class="spinner-border spinner-border-sm me-2" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            Loading resources...
                        </div>
                    </td>
                </tr>
            `);

            const projects = await fetchUserProjects();
            
            if (projects.allocationProjects.length > 0 || projects.storageProjects.length > 0) {
                previewTableBody.empty();
                
                // Add allocation projects
                projects.allocationProjects.forEach(project => {
                    previewTableBody.append(`
                        <tr class="resource-row">
                            <td><span class="resource-type-su">Service Unit</span></td>
                            <td>${project.name}</td>
                            <td class="project-group">${project.group}</td>
                            <td class="project-tier">${project.tier}</td>
                            <td>${project.description}</td>
                        </tr>
                    `);
                });

                // Add storage projects
                projects.storageProjects.forEach(project => {
                    previewTableBody.append(`
                        <tr class="resource-row">
                            <td><span class="resource-type-storage">Storage</span></td>
                            <td>${project.name}</td>
                            <td class="project-group">${project.group}</td>
                            <td class="project-tier">${project.tier}</td>
                            <td>${project.currentSize} TB - ${project.description}</td>
                        </tr>
                    `);
                });
            } else {
                previewTableBody.html(`
                    <tr>
                        <td colspan="5" class="text-center text-muted">
                            No existing resources found
                        </td>
                    </tr>
                `);
            }
        } catch (error) {
            console.error('Error loading preview table:', error);
            $('#combined-preview-tbody').html(`
                <tr>
                    <td colspan="5" class="text-center text-danger">
                        Error loading resources. Please try refreshing the page.
                    </td>
                </tr>
            `);
            ErrorHandler.showUserMessage('Error loading resource preview');
        }
    }

    async function loadUserProjects() {
        try {
            const projects = await fetchUserProjects();
            
            // Populate Allocation Projects selection table
            const allocationTableBody = $('#allocation-projects-tbody');
            allocationTableBody.empty();
            
            if (projects.allocationProjects.length === 0) {
                allocationTableBody.append(`
                    <tr>
                        <td colspan="4" class="text-center text-muted">
                            No existing allocations found
                        </td>
                    </tr>
                `);
            } else {
                projects.allocationProjects.forEach(project => {
                    const row = $('<tr>').addClass('project-row');
                    row.append(`
                        <td>
                            <input type="radio" name="existing-project-allocation" 
                                   value="${project.id}" class="form-check-input project-select" 
                                   required>
                        </td>
                        <td>${project.name}</td>
                        <td class="project-group">${project.group}</td>
                        <td class="project-tier">${project.tier}</td>
                    `);
                    allocationTableBody.append(row);
                });
            }

            // Populate Storage Projects selection table
            const storageTableBody = $('#storage-projects-tbody');
            storageTableBody.empty();
            
            if (projects.storageProjects.length === 0) {
                storageTableBody.append(`
                    <tr>
                        <td colspan="6" class="text-center text-muted">
                            No existing storage found
                        </td>
                    </tr>
                `);
            } else {
                projects.storageProjects.forEach(project => {
                    const row = $('<tr>').addClass('project-row');
                    row.append(`
                        <td>
                            <input type="radio" name="existing-project-storage" 
                                   value="${project.id}" class="form-check-input project-select" 
                                   required>
                        </td>
                        <td>${project.name}</td>
                        <td class="project-group">${project.group}</td>
                        <td class="project-tier">${project.tier}</td>
                        <td>${project.sharedSpace}</td>
                        <td>${project.currentSize} TB</td>
                    `);
                    storageTableBody.append(row);
                });
            }

        } catch (error) {
            console.error('Error loading user projects:', error);
            const errorMessage = `
                <tr>
                    <td colspan="6" class="text-center text-danger">
                        Error loading projects. Please try refreshing the page.
                    </td>
                </tr>
            `;
            $('#allocation-projects-tbody, #storage-projects-tbody').empty().append(errorMessage);
            ErrorHandler.showUserMessage('Error loading project information');
        }
    }

    // Initialize everything
    async function initialize() {
        console.log("Initializing form...");
        
        try {
            // Show initial loading state
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

            // Setup event handlers
            setupEventHandlers();

            // Wait for user session with better error handling
            try {
                const userId = await waitForUserSession();
                console.log("User session initialized:", userId);
            } catch (error) {
                console.error("User session error:", error);
                ErrorHandler.handleApiError(error, 'session');
                loadingMessage.remove();
                return; // Stop initialization if we can't get user session
            }

            // Load initial data
            try {
                await Promise.all([
                    fetchAndPopulateGroups(),
                    loadPreviewTable()
                ]);
            } catch (error) {
                console.error("Error loading initial data:", error);
                ErrorHandler.handleApiError(error, 'data-loading');
                loadingMessage.remove();
                return;
            }
            
            // Set up initial form state
            setupInitialFormState();
            
            // Remove loading message with fade effect
            loadingMessage.fadeOut('slow', function() {
                $(this).remove();
            });
            
            console.log("Form initialization complete");
            
        } catch (error) {
            console.error("Error during form initialization:", error);
            ErrorHandler.handleApiError(error, 'initialization');
            
            // Ensure loading message is removed even if there's an error
            $('.alert.alert-info').remove();
        }
    }

    // Start initialization when document is ready
    initialize();
});