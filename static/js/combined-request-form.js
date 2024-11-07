// Combined Request Form
$(document).ready(function () {
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

    // Error handler
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

    // Core configurations
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
        if (encodedUid) {
            const uid = decode64(encodedUid);
            if (uid) {
                return uid;
            }
        }

        // Check other required cookies
        const hasName = getCookie("__rc_name");
        const hasEmail = getCookie("__rc_email");
        const hasDepartment = getCookie("__rc_department");

        if (!hasName || !hasEmail || !encodedUid || !hasDepartment) {
            window.location.replace("https://auth.rc.virginia.edu/session.php");
            return;
        }

        throw new Error('Could not get user ID after waiting - user session not available');
    }

    // API Integration and Group Management
    async function fetchUserProjects() {
        // Return empty data structure for new users
        return {
            allocationProjects: [],
            storageProjects: [],
            userStorageUsage: {
                'SSZ Research Standard': 0
            }
        };
    }

    function populateGrouperMyGroupsDropdown(groups) {
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

    function handleNonEligibleUser() {
        const message = `
            <div class="alert alert-warning" role="alert">
                <h4 class="alert-heading">Resource Request Information</h4>
                <p>Please note: You have been identified as a non-researcher user. While you can still submit requests, additional verification may be required.</p>
                <p>If you believe this is incorrect, please contact Research Computing Support.</p>
            </div>
        `;
        
        $('#combined-request-form').prepend(message);
    }

    function validateGroupSelection() {
        return true;
    }

    // Form section visibility management
    function toggleRequestFields() {
        const requestType = $('input[name="request-type"]:checked').val();
        
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
    
        $('#common-fields').show();
        updateBillingVisibility();
    }

    // Initial form setup function
    function setupInitialFormState() {
        $('#request-type-allocation').prop('checked', true);
        $('#allocation-fields, #common-fields').show();
        $('#storage-fields').hide();
        $('#category').val('Rivanna HPC');
        toggleAllocationFields();
        updateBillingVisibility();
        loadPreviewTable();
    }

    function toggleAllocationFields() {
        const newOrRenewal = $('input[name="new-or-renewal"]:checked').val();
        const isNew = newOrRenewal === 'new';
        
        $('#new-project-name-container').toggle(isNew);
        $('#existing-projects-allocation').toggle(!isNew);
        $('#allocation-tier').toggle(isNew);
        $('#mygroups-group-container').toggle(isNew);
        $('#mygroups-group').prop('required', isNew);
        
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
        
        const isNewStorage = typeOfRequest === 'new-storage';
        const isModifyingExisting = ['increase-storage', 'decrease-storage', 'retire-storage'].includes(typeOfRequest);
        const isRetiring = typeOfRequest === 'retire-storage';
        
        $('#storage-platform, #shared-space-name-container, #project-title-container')
            .toggle(isNewStorage);
        $('#existing-projects-storage').toggle(isModifyingExisting);
        
        $('#mygroups-group-container').toggle(isNewStorage);
        $('#mygroups-group').prop('required', isNewStorage);
        
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
        const isHighlySensitive = selectedStorage === 'Highly Sensitive Data';
        
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
    // Form validation and event handlers
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
        
        if (fieldId === 'new-project-name' && !utils.validateProjectName($field.val())) {
            markFieldInvalid($field, 'Project name must be 3-128 characters long and contain only letters, numbers, spaces, and hyphens.');
            return false;
        }
        
        if (fieldId === 'shared-space-name' && !utils.validateSharedSpaceName($field.val())) {
            markFieldInvalid($field, 'Shared space name must be 3-40 characters long and contain only letters, numbers, and hyphens.');
            return false;
        }

        if (fieldId === 'capacity') {
            const value = parseInt($field.val());
            const min = parseInt($field.attr('min'));
            const max = parseInt($field.attr('max'));
            
            if (isNaN(value) || value < min || value > max) {
                markFieldInvalid($field, `Please enter a value between ${min} and ${max} TB.`);
                return false;
            }
        }

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

    // Event handler setup
    function setupEventHandlers() {
        $('input[name="request-type"]').on('change', function() {
            toggleRequestFields();
        });

        $('input[name="new-or-renewal"]').on('change', toggleAllocationFields);
        
        $('input[name="allocation-choice"]').on('change', function() {
            updateBillingVisibility();
        });

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

        $('#mygroups-group').on('change', function() {
            validateGroupSelection();
            updateFormValidation();
        });

        $('#data-agreement').on('change', function() {
            updateFormValidation();
        });

        $('#combined-request-form').on('submit', handleFormSubmission);

        setupValidationHandlers();
        setupProjectTableHandlers();
        setupFieldFormatters();
    }

    // Initialize form
    async function initialize() {
        try {
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

            setupEventHandlers();
            setupInitialFormState();

            try {
                const userId = await waitForUserSession();
                await Promise.all([
                    fetchAndPopulateGroups(),
                    loadPreviewTable()
                ]);
            } catch (error) {
                ErrorHandler.handleApiError(error, 'session');
            }

            loadingMessage.fadeOut('slow', function() {
                $(this).remove();
            });

        } catch (error) {
            ErrorHandler.handleApiError(error, 'initialization');
            $('.alert.alert-info').remove();
        }
    }

    // Start initialization
    initialize();
});