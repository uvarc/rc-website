// Combined Request Form - Part 1: Initial Setup and User Session
$(document).ready(function () {
    console.log("Script started");
    console.log("Combined request form JS loaded");

    // User Session Management
    async function waitForUserSession() {
        let attempts = 0;
        const maxAttempts = 50; // 5 seconds total (50 * 100ms)
        
        while (attempts < maxAttempts) {
            const userIdField = document.querySelector('#form_user_info [name="user_id"]');
            if (userIdField && userIdField.value) {
                console.log("User ID found:", userIdField.value);
                return userIdField.value;
            }
            await new Promise(resolve => setTimeout(resolve, 100));
            attempts++;
            if (attempts % 10 === 0) {
                console.log(`Waiting for user session... Attempt ${attempts}`);
            }
        }
        throw new Error('Could not get user ID after waiting');
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
        // Service Unit (SU) tiers
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
        // Storage tiers
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

    // CSS Styles definition
    $('<style>')
        .text(`
            /* Dropdown Styling */
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

            /* API Status Messages */
            .api-error-message {
                margin-bottom: 1rem;
                padding: 1rem;
                border-radius: 0.25rem;
                border: 1px solid #f5c6cb;
                background-color: #f8d7da;
                color: #721c24;
            }
            .api-waiting-message {
                margin-bottom: 1rem;
                padding: 1rem;
                border-radius: 0.25rem;
                border: 1px solid #b8daff;
                background-color: #cce5ff;
                color: #004085;
            }

            /* Your other CSS styles... */
        `)
        .appendTo('head');

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

        isTierPaid: (tierName, currentSize = 0) => {
            const tier = RESOURCE_TYPES[tierName];
            if (!tier) return false;
            
            if (typeof tier.isPaid === 'function') {
                return tier.isPaid(currentSize);
            }
            return tier.isPaid;
        },

        // Updated API helper functions
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
                        <div>Loading user information...</div>
                    </div>
                `)
                .prependTo('#combined-request-form');
        },

        removeWaitingMessage: () => {
            $('.api-waiting-message').remove();
        }
    };
    // Part 2: API Integration and Group Handling

    // API Integration with User Session
    async function fetchAndPopulateGroups() {
        const waitingMessage = utils.showWaitingMessage();
        
        try {
            // Wait for user ID to be available
            const computingId = await waitForUserSession();
            console.log("Attempting API call with computing ID:", computingId);

            // Make API request
            const response = await fetch(
                `${API_CONFIG.baseUrl}/${computingId}`,
                {
                    method: 'GET',
                    headers: API_CONFIG.headers
                }
            );

            // Parse response - API returns [data, statusCode]
            const [data, statusCode] = await utils.handleApiResponse(response);
            console.log('Groups data:', data);
            console.log('Status code:', statusCode);

            if (statusCode !== 200) {
                throw new Error(`API returned status code ${statusCode}`);
            }

            // Check eligibility
            if (!data.is_user_resource_request_elligible) {
                console.log('User is not eligible for resource requests');
                handleNonEligibleUser();
                return;
            }

            // Populate groups dropdown
            populateGrouperMyGroupsDropdown(data.user_groups);

        } catch (error) {
            utils.logApiError(error, 'fetchAndPopulateGroups');
            handleApiError(error);
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
        
        let validCount = 0;
        let invalidCount = 0;
        
        sortedGroups.forEach(groupName => {
            const option = $('<option>')
                .val(groupName)
                .text(groupName);
            
            if (utils.validateGroupName(groupName)) {
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
            
            dropdown.append(option);
        });

        updateGroupValidationMessages(validCount, invalidCount);
        
        // If no valid groups are available, disable the dropdown
        if (validCount === 0) {
            dropdown.prop('disabled', true);
        }
    }

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
        
        // Display message and disable form
        $('#combined-request-form')
            .prepend(message)
            .find(':input')
            .prop('disabled', true);
    }

    function handleApiError(error) {
        console.error('API Error:', error);
        
        let message;
        if (error.message.includes('user ID')) {
            message = `
                <div class="alert alert-warning" role="alert">
                    <h4 class="alert-heading">Unable to Load User Information</h4>
                    <p>There was a problem loading your user information. This could be because:</p>
                    <ul>
                        <li>The page is still loading</li>
                        <li>You are not properly logged in</li>
                        <li>There was an error with the user session</li>
                    </ul>
                    <hr>
                    <p class="mb-0">Please try refreshing the page. If the problem persists, try logging out and back in.</p>
                </div>
            `;
        } else {
            message = `
                <div class="alert alert-warning" role="alert">
                    <h4 class="alert-heading">Unable to Load Groups</h4>
                    <p>There was a problem loading your group information. This could be temporary.</p>
                    <hr>
                    <p class="mb-0">Please try refreshing the page. If the problem persists, contact Research Computing Support.</p>
                </div>
            `;
        }
        
        $('#combined-request-form').prepend(message);
        $('#mygroups-group')
            .prop('disabled', true)
            .addClass('is-invalid');
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

    // User projects data management
    async function fetchUserProjects() {
        try {
            // Ensure we have a user ID before proceeding
            await waitForUserSession();
            
            // This will be replaced with actual API call
            await new Promise(resolve => setTimeout(resolve, 300));
            
            return {
                allocationProjects: [
                    {
                        id: 'alloc-1',
                        name: 'RNA Sequencing Analysis',
                        group: 'bioResearchLab1',
                        tier: 'Standard',
                        description: 'RNA-seq data analysis for cancer research'
                    },
                    {
                        id: 'alloc-2',
                        name: 'Climate Model Simulations',
                        group: 'climateAI2',
                        tier: 'Paid',
                        description: 'High-resolution climate modeling'
                    }
                ],
                storageProjects: [
                    {
                        id: 'store-1',
                        name: 'Genomics Data Repository',
                        group: 'bioResearchLab1',
                        tier: 'SSZ Research Project',
                        sharedSpace: 'genomicsData',
                        currentSize: '50',
                        description: 'Genomic sequencing data storage'
                    }
                ],
                userStorageUsage: {
                    'SSZ Research Standard': 133
                }
            };
        } catch (error) {
            console.error('Error fetching user projects:', error);
            throw new Error('Failed to fetch user projects');
        }
    }
    // Part 3: UI Toggles and Form Logic

    // Form section visibility management
    function toggleRequestFields() {
        const requestType = $('input[name="request-type"]:checked').val();
        console.log("Selected resource type:", requestType);
        
        // Hide all sections first
        $('#allocation-fields, #storage-fields, #common-fields').hide();
        
        // Show relevant sections based on request type
        if (requestType === 'service-unit') {
            $('#allocation-fields, #common-fields').show();
            $('#category').val('Rivanna HPC');
            loadUserProjects();
            
            // Show New/Renewal first, then handle tier options visibility
            toggleAllocationFields();
        } else if (requestType === 'storage') {
            $('#storage-fields, #common-fields').show();
            $('#category').val('Storage');
            loadUserProjects();
        }

        updateBillingVisibility();
        toggleStorageFields();
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
    }

    function toggleStorageTierOptions() {
        const selectedStorage = $('input[name="storage-choice"]:checked').val();
        console.log("Selected storage tier:", selectedStorage);
        
        // Updated to use new name for highly sensitive data
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
            showErrorMessage('Error updating storage options');
        }
    }

    // Billing visibility management
    async function updateBillingVisibility() {
        try {
            const projects = await fetchUserProjects();
            const currentStorageUsage = projects.userStorageUsage['SSZ Research Standard'] || 0;
            const selectedStorageTier = $('input[name="storage-choice"]:checked').val();
            const selectedAllocationTier = $('input[name="allocation-choice"]:checked').val();
            const requestedStorageSize = parseInt($('#capacity').val()) || 0;

            let shouldShowBilling = false;
            let tierNote = '';

            // Check Service Unit tier if applicable
            if ($('#allocation-fields').is(':visible') && selectedAllocationTier) {
                shouldShowBilling = utils.isTierPaid(selectedAllocationTier);
            }

            // Check storage tier if applicable
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

            // Update UI elements
            $('#billing-information').slideToggle(shouldShowBilling);
            $('#billing-information input, #billing-information select')
                .prop('required', shouldShowBilling);

            // Update tier note if applicable
            if (tierNote) {
                updateTierNote(tierNote);
            }
        } catch (error) {
            console.error('Error updating billing visibility:', error);
            showErrorMessage('Error determining billing requirements');
        }
    }

    // Form validation functions
    function validateForm() {
        resetValidationState();
        let isValid = true;
        let firstInvalidField = null;

        // Special handling for Grouper group selection
        const isNewRequest = $('input[name="new-or-renewal"]:checked').val() === 'new' ||
                           $('input[name="type-of-request"]:checked').val() === 'new-storage';
        
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

        // Handle validation result
        handleValidationResult(isValid, firstInvalidField);
        return isValid;
    }

    // UI helper functions
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
    // Part 4: Event Handlers and Initialization

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
            loadPreviewTable();
        });

        // Service Unit specific handlers
        $('input[name="new-or-renewal"]').on('change', toggleAllocationFields);
        $('input[name="allocation-choice"]').on('change', function() {
            console.log("Selected SU tier:", $(this).val());
            updateBillingVisibility();
        });

        // Storage specific handlers
        $('input[name="type-of-request"]').on('change', toggleStorageFields);
        $('input[name="storage-choice"]').on('change', function() {
            if (this.value === 'Highly Sensitive Data') {
                $(this).next('label').text('Highly Sensitive Data');
            }
            toggleStorageTierOptions();
        });
        
        $('#capacity').on('input change', function() {
            if ($('#storage-fields').is(':visible')) {
                updateBillingVisibility();
            }
        });

        // Group selection handler
        $('#mygroups-group').on('change', function() {
            console.log("Selected Grouper/MyGroups account:", $(this).val());
            validateGroupSelection();
            updateFormValidation();
        });

        // Data agreement checkbox
        $('#data-agreement').on('change', function() {
            $('#submit').prop('disabled', !$(this).is(':checked'));
        });

        // Form submission
        $('#combined-request-form').on('submit', handleFormSubmission);

        // Real-time validation
        setupRealTimeValidation();
    }

    function setupRealTimeValidation() {
        const fieldsToValidate = '#combined-request-form input:not([type="radio"]), #combined-request-form select, #combined-request-form textarea';
        
        $(fieldsToValidate).on('blur change', function() {
            validateField($(this));
            updateFormValidation();
        });

        // Replace _.debounce with a setTimeout implementation
        let timeoutId;
        $('#new-project-name, #shared-space-name').on('input', function() {
            const $field = $(this);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                validateField($field);
            }, 300);
        });
    }

    function validateField($field) {
        if (!$field[0].checkValidity()) {
            markFieldInvalid($field, 'This field is required.');
            return false;
        }

        const fieldId = $field.attr('id');
        if (fieldId === 'new-project-name' && !utils.validateProjectName($field.val())) {
            markFieldInvalid($field, 'Project name must be 3-128 characters long and contain only letters, numbers, spaces, and hyphens.');
            return false;
        }
        if (fieldId === 'shared-space-name' && !utils.validateSharedSpaceName($field.val())) {
            markFieldInvalid($field, 'Shared space name must be 3-40 characters long and contain only letters, numbers, and hyphens.');
            return false;
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

    async function handleFormSubmission(event) {
        event.preventDefault();
        
        try {
            // Ensure user session is available before submission
            await waitForUserSession();
            
            if (validateForm()) {
                const formData = collectFormData();
                await submitForm(formData);
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            showErrorMessage('Unable to submit form. Please ensure you are logged in and try again.');
        }
    }

    async function submitForm(formData) {
        try {
            const $submitButton = $('#submit');
            const originalText = $submitButton.text();
            
            // Disable submit button and show loading state
            $submitButton.prop('disabled', true)
                        .html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...');

            // Log form data before submission
            console.log('Form data to be submitted:', formData);

            // Show success message
            showSuccessMessage('Your request has been submitted successfully.');
            
            // Reset form after successful submission
            resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
            showErrorMessage('Failed to submit form. Please try again later.', false);
        } finally {
            // Re-enable submit button
            $submitButton.prop('disabled', false).text(originalText);
        }
    }

    function showSuccessMessage(message) {
        const $alert = $('<div>')
            .addClass('alert alert-success alert-dismissible fade show')
            .html(`
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `)
            .prependTo('#combined-request-form');

        setTimeout(() => {
            $alert.alert('close');
        }, 5000);
    }

    function showErrorMessage(message, isTemporary = true) {
        const errorDiv = $('<div>')
            .addClass('alert alert-danger')
            .html(`<strong>Error:</strong> ${message}`)
            .prependTo('#combined-request-form');

        if (isTemporary) {
            setTimeout(() => errorDiv.fadeOut('slow', function() {
                $(this).remove();
            }), 5000);
        }
    }

    function resetForm() {
        $('#combined-request-form')[0].reset();
        resetValidationState();
        toggleRequestFields();
        $('#submit').prop('disabled', true);
    }

    // Initialize everything
    async function initialize() {
        console.log("Initializing form...");
        
        try {
            // Initial setup
            $('#allocation-fields, #storage-fields, #common-fields').hide();
            $('#submit').prop('disabled', true);

            // Update labels
            $('#request-type-allocation').next('label').text('Service Unit (SU)');
            $('#request-type-storage').next('label').text('Storage');
            $('#storage-choice4').next('label').text('Highly Sensitive Data');

            // Setup event handlers first
            setupEventHandlers();

            // Wait for user session and load data
            await fetchAndPopulateGroups();
            await loadPreviewTable();
            
            // Initial toggle states
            toggleRequestFields();
            toggleAllocationFields();
            toggleStorageFields();
            toggleStorageTierOptions();
            
            // Update billing visibility
            updateBillingVisibility();
            
            console.log("Form initialization complete");
        } catch (error) {
            console.error("Error during form initialization:", error);
            showErrorMessage("Failed to initialize form properly. Please try logging out and back in, then refresh the page.");
        }
    }

    // Start initialization when document is ready
    initialize();
});