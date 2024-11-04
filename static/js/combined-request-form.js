// Combined Request Form - Part 1: Initial Setup, CSS, and Constants
$(document).ready(function () {
    console.log("Script started");
    console.log("Combined request form JS loaded");

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
        'High Security Research Standard': { 
            isPaid: true,
            description: 'Secure storage for sensitive data',
            category: 'Storage'
        }
    };

    // Regular expressions for validation
    const VALIDATION = {
        groupName: /^[a-z][a-zA-Z0-9]*([A-Z][a-zA-Z0-9]*)*$/, // Updated camelCase validation
        projectName: /^[\w\-\s]{3,128}$/, // Allows letters, numbers, spaces, hyphens, min 3 chars
        sharedSpaceName: /^[\w\-]{3,40}$/ // Allows letters, numbers, hyphens, no spaces
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
            .group-dropdown option:disabled::before {
                content: "⚠️ ";
            }

            /* Form Elements */
            .form-section {
                padding: 1.5rem;
                background-color: #f8f9fa;
                border: 1px solid #dee2e6;
                border-radius: 0.25rem;
                margin-bottom: 1rem;
            }
            .form-section-title {
                font-size: 1.25rem;
                font-weight: 500;
                margin-bottom: 1rem;
                color: #212529;
            }

            /* Resource Type Badges */
            .resource-type-su {
                color: #004085;
                background-color: #cce5ff;
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;
                font-size: 0.875rem;
                font-weight: 500;
            }
            .resource-type-storage {
                color: #155724;
                background-color: #d4edda;
                padding: 0.25rem 0.5rem;
                border-radius: 0.25rem;
                font-size: 0.875rem;
                font-weight: 500;
            }

            /* Validation Styles */
            .validation-message {
                color: #dc3545;
                font-size: 0.875rem;
                margin-top: 0.25rem;
                display: none;
            }
            .helper-text {
                color: #6c757d;
                font-size: 0.875rem;
                margin-top: 0.25rem;
            }
            .warning-message {
                color: #856404;
                background-color: #fff3cd;
                border: 1px solid #ffeeba;
                padding: 0.75rem 1.25rem;
                margin-top: 0.5rem;
                border-radius: 0.25rem;
            }

            /* Table Styles */
            .resource-table {
                width: 100%;
                margin-bottom: 1rem;
                background-color: transparent;
            }
            .resource-table th {
                background-color: #f8f9fa;
                border-bottom: 2px solid #dee2e6;
                padding: 0.75rem;
                text-align: left;
            }
            .resource-table td {
                padding: 0.75rem;
                border-top: 1px solid #dee2e6;
                vertical-align: middle;
            }
            .resource-row {
                cursor: pointer;
                transition: background-color 0.2s;
            }
            .resource-row:hover {
                background-color: #f5f5f5;
            }
            .resource-row.selected {
                background-color: #FDDA24 !important;
            }
            .group-name {
                font-family: monospace;
                color: #0056b3;
            }
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
        }
    };
    // Part 2: Group Validation and Data Fetching Functions

    // Group management and validation
    async function fetchAndPopulateGroups() {
        try {
            // In production, this would be an API call
            const mockApiResponse = [
                { id: 'research_group1', name: 'bioResearchLab1' },
                { id: 'research_group2', name: 'climateAI2' },
                { id: 'class_group1', name: 'csClass3' },
                { id: 'research_group3', name: 'deepLearningLab4' },
                { id: 'class_group2', name: 'biomedClass5' },
                { id: 'invalid_group1', name: 'invalid-group-1' },
                { id: 'invalid_group2', name: 'InvalidGroup2' }
            ];

            populateGroupsDropdown(mockApiResponse);
        } catch (error) {
            console.error('Error fetching groups:', error);
            showErrorMessage('Failed to load groups. Please try again later.');
        }
    }

    function populateGroupsDropdown(groups) {
        const dropdown = $('#mygroups-group');
        dropdown.empty();
        dropdown.append('<option value="">- Select a group -</option>');
        
        const validGroups = [];
        const invalidGroups = [];
        
        // Sort groups into valid and invalid based on naming convention
        groups.forEach(group => {
            if (utils.validateGroupName(group.name)) {
                validGroups.push(group);
            } else {
                invalidGroups.push(group);
            }
        });

        // Add valid groups first
        if (validGroups.length > 0) {
            const validOptgroup = $('<optgroup label="Valid Groups">');
            validGroups.forEach(group => {
                validOptgroup.append(
                    $('<option>')
                        .val(group.id)
                        .text(group.name)
                        .data('valid', true)
                );
            });
            dropdown.append(validOptgroup);
        }

        // Add invalid groups
        if (invalidGroups.length > 0) {
            const invalidOptgroup = $('<optgroup label="Invalid Groups">');
            invalidGroups.forEach(group => {
                invalidOptgroup.append(
                    $('<option>')
                        .val(group.id)
                        .text(`${group.name} (Invalid format)`)
                        .prop('disabled', true)
                        .addClass('text-muted')
                        .data('valid', false)
                );
            });
            dropdown.append(invalidOptgroup);
        }

        // Update validation messages
        updateGroupValidationMessages(validGroups.length, invalidGroups.length);
    }

    function updateGroupValidationMessages(validCount, invalidCount) {
        const messagesContainer = $('#group-selection-messages');
        messagesContainer.empty();

        if (invalidCount > 0) {
            messagesContainer.append(`
                <div class="warning-message">
                    <strong>${invalidCount}</strong> group(s) have invalid names and are disabled. 
                    Group names must:
                    <ul class="mb-0">
                        <li>Start with a lowercase letter</li>
                        <li>Use camelCase format (e.g., myResearchGroup)</li>
                        <li>Contain only letters and numbers</li>
                    </ul>
                </div>
            `);
        }

        if (validCount === 0) {
            messagesContainer.append(`
                <div class="validation-message" style="display: block;">
                    No valid groups available. Please contact support to create a properly formatted group.
                </div>
            `);
        }
    }

    // User projects data management
    async function fetchUserProjects() {
        try {
            // Simulate API delay for realistic testing
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
                    },
                    {
                        id: 'alloc-3',
                        name: 'CS 5999 Advanced Computing',
                        group: 'csClass3',
                        tier: 'Instructional',
                        description: 'Graduate-level computing course'
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
                    },
                    {
                        id: 'store-2',
                        name: 'Climate Model Results',
                        group: 'climateAI2',
                        tier: 'SSZ Research Standard',
                        sharedSpace: 'climateData',
                        currentSize: '8',
                        description: 'Climate simulation outputs'
                    }
                ],
                userStorageUsage: {
                    'SSZ Research Standard': 133  // Total TB used across all SSZ Research Standard projects
                }
            };
        } catch (error) {
            console.error('Error fetching user projects:', error);
            throw new Error('Failed to fetch user projects');
        }
    }

    async function loadPreviewTable() {
        try {
            const projects = await fetchUserProjects();
            const previewTableBody = $('#combined-preview-tbody');
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

            if (projects.allocationProjects.length === 0 && projects.storageProjects.length === 0) {
                previewTableBody.append(`
                    <tr>
                        <td colspan="5" class="text-center text-muted">
                            No existing resources found
                        </td>
                    </tr>
                `);
            }
        } catch (error) {
            showErrorMessage('Error loading resource preview');
        }
    }

    // Error handling
    function showErrorMessage(message, isTemporary = true) {
        const errorDiv = $('<div>')
            .addClass('alert alert-danger')
            .text(message)
            .prependTo('#combined-request-form');

        if (isTemporary) {
            setTimeout(() => errorDiv.fadeOut('slow', function() {
                $(this).remove();
            }), 5000);
        }
    }
    // Part 3: UI Toggle Functions and Form Logic

    // Form section visibility management
    function toggleRequestFields() {
        const requestType = $('input[name="request-type"]:checked').val();
        console.log("Selected request type:", requestType);
        
        // Hide all sections first
        $('#allocation-fields, #storage-fields, #common-fields').hide();
        
        // Show relevant sections based on request type
        if (requestType === 'allocation') {
            $('#allocation-fields, #common-fields').show();
            $('#category').val('Rivanna HPC');
            loadUserProjects();
        } else if (requestType === 'storage') {
            $('#storage-fields, #common-fields').show();
            $('#category').val('Storage');
            loadUserProjects();
        }

        // Update dependent sections
        updateBillingVisibility();
        toggleAllocationFields();
        toggleStorageFields();
    }

    // Allocation-specific field toggles
    function toggleAllocationFields() {
        const newOrRenewal = $('input[name="new-or-renewal"]:checked').val();
        console.log("Selected new or renewal:", newOrRenewal);
        const isNew = newOrRenewal === 'new';
        
        // Toggle visibility of new vs renewal specific fields
        $('#new-project-name-container').toggle(isNew);
        $('#existing-projects-allocation').toggle(!isNew);
        $('#allocation-tier').toggle(isNew);
        
        // Update description labels
        if (isNew) {
            $("#new-descr").fadeIn(400);
            $("#renewal-descr").fadeOut(400);
        } else {
            $("#new-descr").fadeOut(400);
            $("#renewal-descr").fadeIn(400);
        }

        // Reset and update validation state
        resetValidationState();
        updateFormValidation();
    }

    // Storage-specific field toggles
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
        
        // Handle capacity field state
        $('#capacity')
            .prop('disabled', isRetiring)
            .val(isRetiring ? '0' : '')
            .prop('min', isRetiring ? '0' : '1');
        
        if (isModifyingExisting) {
            updateStorageModificationFields(typeOfRequest);
        }
        
        updateBillingVisibility();
        toggleStorageTierOptions();
    }

    // Storage tier options management
    function toggleStorageTierOptions() {
        const selectedStorage = $('input[name="storage-choice"]:checked').val();
        console.log("Selected storage tier:", selectedStorage);
        
        const isHighSecurity = selectedStorage === 'High Security Research Standard';
        
        // Toggle security level messages
        $('#sensitive-data').toggle(isHighSecurity);
        $('#standard-data').toggle(!isHighSecurity);
        
        // Update capacity limits based on tier
        updateCapacityLimits(selectedStorage);
        updateBillingVisibility();
    }

    function updateCapacityLimits(tierType) {
        const capacityField = $('#capacity');
        const tier = RESOURCE_TYPES[tierType];
        
        if (tier) {
            if (tierType === 'SSZ Research Standard') {
                capacityField.attr('max', '200');
            } else if (tierType === 'High Security Research Standard') {
                capacityField.attr('max', '100');
            } else {
                capacityField.attr('max', '500');
            }
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

            // Check allocation tier billing requirements
            if ($('#allocation-fields').is(':visible') && selectedAllocationTier) {
                shouldShowBilling = utils.isTierPaid(selectedAllocationTier);
            }

            // Check storage tier billing requirements
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

            // Update tier note
            if (tierNote) {
                updateTierNote(tierNote);
            }
        } catch (error) {
            console.error('Error updating billing visibility:', error);
            showErrorMessage('Error determining billing requirements');
        }
    }

    // Form validation
    function validateForm() {
        resetValidationState();
        let isValid = true;
        let firstInvalidField = null;

        // Validate group selection
        if (!validateGroupSelection()) {
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

        // Validate radio button groups
        $('input:radio[required]:visible').each(function() {
            if (!validateRadioGroup($(this))) {
                isValid = false;
                firstInvalidField = firstInvalidField || $(this);
            }
        });

        // Special validations based on request type
        if ($('#storage-fields').is(':visible')) {
            isValid = validateStorageFields() && isValid;
        }
        if ($('#allocation-fields').is(':visible')) {
            isValid = validateAllocationFields() && isValid;
        }

        // Handle validation result
        handleValidationResult(isValid, firstInvalidField);
        return isValid;
    }

    function validateField($field) {
        if (!$field[0].checkValidity()) {
            markFieldInvalid($field, 'This field is required.');
            return false;
        }

        // Additional validation based on field type
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

    function validateRadioGroup($radio) {
        const name = $radio.attr('name');
        const $group = $(`input:radio[name="${name}"]`);
        const isValid = $group.filter(':checked').length > 0;
        
        if (!isValid) {
            const $container = $group.closest('.form-radios');
            $container.addClass('is-invalid invalid-field-highlight')
                     .after('<div class="invalid-feedback">Please select an option.</div>');
        }
        
        return isValid;
    }

    function validateStorageFields() {
        let isValid = true;
        const requestType = $('input[name="type-of-request"]:checked').val();
        
        if (requestType === 'new-storage') {
            // Validate storage-specific fields for new storage requests
            const tierSelected = $('input[name="storage-choice"]:checked').length > 0;
            if (!tierSelected) {
                markFieldInvalid($('#storage-options'), 'Please select a storage tier.');
                isValid = false;
            }
        } else if (['increase-storage', 'decrease-storage'].includes(requestType)) {
            // Validate capacity for modifications
            const capacity = parseInt($('#capacity').val());
            if (isNaN(capacity) || capacity < 1) {
                markFieldInvalid($('#capacity'), 'Please enter a valid capacity greater than 0 TB.');
                isValid = false;
            }
        }
        
        return isValid;
    }

    // UI helper functions
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

    function resetValidationState() {
        $('.is-invalid').removeClass('is-invalid');
        $('.invalid-feedback').remove();
        $('.invalid-field-highlight').removeClass('invalid-field-highlight');
    }

    function updateTierNote(message) {
        const $tierNote = $('#tier-note');
        if ($tierNote.length === 0) {
            $('#storage-platform').append(`<div id="tier-note" class="tier-note">${message}</div>`);
        } else {
            $tierNote.html(message);
        }
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

    // Resource selection table handlers
    function initializeSelectionTables() {
        // Make entire row clickable for selection tables
        $('.resource-row').off('click').on('click', function(e) {
            if (!$(e.target).is('input[type="radio"]')) {
                $(this).find('input[type="radio"]').prop('checked', true).trigger('change');
            }
        });

        // Handle selection highlighting
        $('input[type="radio"].project-select').off('change').on('change', function() {
            const tableBody = $(this).closest('tbody');
            tableBody.find('.resource-row').removeClass('selected');
            $(this).closest('.resource-row').addClass('selected');
            
            // If this is a storage project selection, update capacity field
            if ($(this).attr('name') === 'existing-project-storage') {
                updateCapacityFieldFromSelection($(this).val());
            }
        });
    }

    // Field value management
    function updateCapacityFieldFromSelection(projectId) {
        fetchUserProjects().then(projects => {
            const selectedProject = projects.storageProjects.find(p => p.id === projectId);
            if (selectedProject) {
                const requestType = $('input[name="type-of-request"]:checked').val();
                const capacityField = $('#capacity');
                
                if (requestType === 'retire-storage') {
                    capacityField.val('0').prop('disabled', true);
                } else {
                    const currentSize = parseInt(selectedProject.currentSize);
                    capacityField.prop('disabled', false);
                    
                    if (requestType === 'decrease-storage') {
                        capacityField.attr('max', currentSize - 1);
                    } else {
                        // For increase-storage
                        const maxIncrease = selectedProject.tier === 'SSZ Research Standard' ? 200 : 500;
                        capacityField.attr('max', maxIncrease - currentSize);
                    }
                }
            }
        }).catch(error => {
            console.error('Error updating capacity field:', error);
            showErrorMessage('Error updating storage capacity limits');
        });
    }

    // Event handler setup
    function setupEventHandlers() {
        // Resource type selection
        $('input[name="request-type"]').on('change', function() {
            toggleRequestFields();
            loadPreviewTable();
        });

        // Allocation-specific handlers
        $('input[name="new-or-renewal"]').on('change', toggleAllocationFields);
        $('input[name="allocation-choice"]').on('change', function() {
            console.log("Selected allocation tier:", $(this).val());
            updateBillingVisibility();
        });

        // Storage-specific handlers
        $('input[name="type-of-request"]').on('change', toggleStorageFields);
        $('input[name="storage-choice"]').on('change', toggleStorageTierOptions);
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

        // Special handling for project name
        $('#new-project-name').on('input', _.debounce(function() {
            validateField($(this));
        }, 300));

        // Special handling for shared space name
        $('#shared-space-name').on('input', _.debounce(function() {
            validateField($(this));
        }, 300));
    }

    function handleFormSubmission(event) {
        event.preventDefault();
        
        if (validateForm()) {
            const formData = collectFormData();
            submitForm(formData);
        }
    }

    // Form data handling
    function collectFormData() {
        const formData = {
            requestType: $('input[name="request-type"]:checked').val(),
            group: $('#mygroups-group').val(),
            category: $('#category').val()
        };

        if (formData.requestType === 'allocation') {
            Object.assign(formData, collectAllocationData());
        } else if (formData.requestType === 'storage') {
            Object.assign(formData, collectStorageData());
        }

        if ($('#billing-information').is(':visible')) {
            Object.assign(formData, collectBillingData());
        }

        return formData;
    }

    function collectAllocationData() {
        const isNew = $('input[name="new-or-renewal"]:checked').val() === 'new';
        return {
            allocationType: isNew ? 'new' : 'renewal',
            projectName: isNew ? $('#new-project-name').val() : undefined,
            existingProjectId: !isNew ? $('input[name="existing-project-allocation"]:checked').val() : undefined,
            tier: isNew ? $('input[name="allocation-choice"]:checked').val() : undefined,
            description: $('#project-description').val()
        };
    }

    function collectStorageData() {
        const requestType = $('input[name="type-of-request"]:checked').val();
        const data = {
            storageRequestType: requestType,
            capacity: $('#capacity').val()
        };

        if (requestType === 'new-storage') {
            Object.assign(data, {
                tier: $('input[name="storage-choice"]:checked').val(),
                sharedSpaceName: $('#shared-space-name').val(),
                projectTitle: $('#project-title').val()
            });
        } else {
            data.existingProjectId = $('input[name="existing-project-storage"]:checked').val();
        }

        return data;
    }

    function collectBillingData() {
        return {
            fdmId: $('#fdm-id').val()
            // Add any additional billing fields here
        };
    }

    // Form submission
    async function submitForm(formData) {
        try {
            // Disable submit button and show loading state
            const $submitButton = $('#submit');
            const originalText = $submitButton.text();
            $submitButton.prop('disabled', true)
                        .html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...');

            // In production, this would be an API call
            await new Promise(resolve => setTimeout(resolve, 1000));
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

    // Form reset and messages
    function resetForm() {
        $('#combined-request-form')[0].reset();
        resetValidationState();
        toggleRequestFields();
        $('#submit').prop('disabled', true);
    }

    function showSuccessMessage(message) {
        const $alert = $('<div>')
            .addClass('alert alert-success alert-dismissible fade show')
            .html(`
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            `)
            .prependTo('#combined-request-form');

        // Auto-dismiss after 5 seconds
        setTimeout(() => {
            $alert.alert('close');
        }, 5000);
    }

    // Initialize everything
    function initialize() {
        console.log("Initializing form...");
        
        // Initial setup
        $('#allocation-fields, #storage-fields, #common-fields').hide();
        $('#submit').prop('disabled', true);

        // Load initial data
        loadPreviewTable();
        fetchAndPopulateGroups();
        
        // Setup event handlers
        setupEventHandlers();
        
        // Initial toggle states
        toggleRequestFields();
        toggleAllocationFields();
        toggleStorageFields();
        toggleStorageTierOptions();
        
        // Initialize selection tables
        initializeSelectionTables();
        
        // Update billing visibility
        updateBillingVisibility();
        
        console.log("Form initialization complete");
    }

    // Start everything when document is ready
    initialize();
});