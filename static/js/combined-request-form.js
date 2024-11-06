// Combined Request Form - Part 1: Initial Setup and Constants
$(document).ready(function () {
    console.log("Script started");
    console.log("Combined request form JS loaded");

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

    // Validation patterns
    const VALIDATION = {
        groupName: /^[a-zA-Z0-9\-_]+$/,
        projectName: /^[\w\-\s]{3,128}$/,
        sharedSpaceName: /^[\w\-]{3,40}$/
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

        isTierPaid: (tierName, currentSize = 0) => {
            const tier = RESOURCE_TYPES[tierName];
            if (!tier) return false;
            
            if (typeof tier.isPaid === 'function') {
                return tier.isPaid(currentSize);
            }
            return tier.isPaid;
        },

        // API helper functions
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
        
        $('#combined-request-form')
            .prepend(message)
            .find(':input')
            .prop('disabled', true);
    }
    // Form section visibility management
    function toggleRequestFields() {
        const requestType = $('input[name="request-type"]:checked').val();
        console.log("Selected resource type:", requestType);
        
        // Hide all sections first
        $('#allocation-fields, #storage-fields, #common-fields').hide();
        $('#mygroups-group-container').hide();  // Always hide group selection first
        
        // Show relevant sections based on request type
        if (requestType === 'service-unit') {
            $('#allocation-fields, #common-fields').show();
            $('#category').val('Rivanna HPC');
            loadPreviewTable();  // Changed from loadUserProjects
            
            // Show New/Renewal first, then handle tier options visibility
            toggleAllocationFields();
        } else if (requestType === 'storage') {
            $('#storage-fields, #common-fields').show();
            $('#category').val('Storage');
            loadPreviewTable();  // Changed from loadUserProjects
            toggleStorageFields();
        }
    
        updateBillingVisibility();
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

        handleValidationResult(isValid, firstInvalidField);
        return isValid;
    }

    function validateGroupSelection() {
        const selectedOption = $('#mygroups-group option:selected');
        if (!selectedOption.val()) return true; // Skip validation if no selection
        return selectedOption.data('valid') === true;
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

    function updateFormValidation() {
        const form = document.getElementById('combined-request-form');
        const isValid = form.checkValidity();
        $('#submit').prop('disabled', !isValid || !$('#data-agreement').is(':checked'));
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

    function resetValidationState() {
        $('.is-invalid').removeClass('is-invalid');
        $('.invalid-feedback').remove();
        $('.invalid-field-highlight').removeClass('invalid-field-highlight');
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
            ErrorHandler.showUserMessage('Unable to submit form. Please ensure you are logged in and try again.');
        }
    }

    async function submitForm(formData) {
        try {
            const $submitButton = $('#submit');
            const originalText = $submitButton.text();
            
            // Disable submit button and show loading state
            $submitButton.prop('disabled', true)
                        .html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...');

            console.log('Form data to be submitted:', formData);

            // Show success message
            ErrorHandler.showUserMessage('Your request has been submitted successfully.', 'success');
            
            // Reset form after successful submission
            resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
            ErrorHandler.showUserMessage('Failed to submit form. Please try again later.', 'error');
        } finally {
            // Re-enable submit button and restore original text
            const $submitButton = $('#submit');
            $submitButton.prop('disabled', false).text($submitButton.data('original-text') || 'Submit');
        }
    }

    function resetForm() {
        $('#combined-request-form')[0].reset();
        resetValidationState();
        toggleRequestFields();
        $('#submit').prop('disabled', true);
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

        // Setup real-time validation
        setupRealTimeValidation();
    }

    // Real-time validation setup
    function setupRealTimeValidation() {
        const fieldsToValidate = '#combined-request-form input:not([type="radio"]), #combined-request-form select, #combined-request-form textarea';
        
        $(fieldsToValidate).on('blur change', function() {
            validateField($(this));
            updateFormValidation();
        });

        // Simple timeout-based validation for text inputs
        let validationTimeout;
        $('#new-project-name, #shared-space-name').on('input', function() {
            const $field = $(this);
            clearTimeout(validationTimeout);
            validationTimeout = setTimeout(() => {
                validateField($field);
                updateFormValidation();
            }, 300);
        });
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
    // Preview and Projects Management
    async function loadPreviewTable() {
        try {
            const previewTableBody = $('#combined-preview-tbody');
            previewTableBody.empty();

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
                            <td class="group-name">${project.group}</td>
                            <td class="font-weight-medium">${project.tier}</td>
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
                            <td class="group-name">${project.group}</td>
                            <td class="font-weight-medium">${project.tier}</td>
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

    // User projects data management
    async function fetchUserProjects() {
        try {
            // Ensure we have a user ID before proceeding
            const userId = await waitForUserSession();
            
            try {
                const response = await fetch(
                    `${API_CONFIG.baseUrl}/${userId}/projects`,
                    {
                        method: 'GET',
                        headers: API_CONFIG.headers
                    }
                );

                const data = await utils.handleApiResponse(response);
                return {
                    allocationProjects: data.allocations || [],
                    storageProjects: data.storage || [],
                    userStorageUsage: data.storage_usage || {
                        'SSZ Research Standard': 0
                    }
                };
            } catch (error) {
                console.error('Error fetching projects:', error);
                // Return empty data structure if API fails
                return {
                    allocationProjects: [],
                    storageProjects: [],
                    userStorageUsage: {
                        'SSZ Research Standard': 0
                    }
                };
            }
        } catch (error) {
            console.error('Error in user session:', error);
            ErrorHandler.handleApiError(error, 'session');
            throw new Error('Failed to fetch user projects');
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
    // Initialize everything
    async function initialize() {
        console.log("Initializing form...");
        
        try {
            // Initial setup
            $('#allocation-fields, #storage-fields, #common-fields').hide();
            $('#submit').prop('disabled', true);
            $('#mygroups-group-container').hide();

            // Show loading state
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

            // Update labels
            $('#request-type-allocation').next('label').text('Service Unit (SU)');
            $('#request-type-storage').next('label').text('Storage');
            $('#storage-choice4').next('label').text('Highly Sensitive Data');

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
            
            // Set initial form state
            const defaultResourceType = $('input[name="request-type"]:checked').val();
            if (defaultResourceType === 'service-unit') {
                $('#allocation-fields, #common-fields').show();
                toggleAllocationFields();
            }
            
            // Update billing visibility
            await updateBillingVisibility();
            
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