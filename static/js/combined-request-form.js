// Combined Request Form - Part 1: Initial Setup, CSS, and Constants
$(document).ready(function () {
    console.log("Script started");
    console.log("Combined request form JS loaded");

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
        // Updated to match API requirements - only alphanumeric, dashes, and underscores
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
            .api-warning-message {
                margin-bottom: 1rem;
                padding: 1rem;
                border-radius: 0.25rem;
                border: 1px solid #ffeeba;
                background-color: #fff3cd;
                color: #856404;
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
            return error;
        }
    };
    // Part 2: API Integration and Group Handling

    // API Integration
    async function fetchAndPopulateGroups() {
        try {
            // Try multiple sources for computing ID
            const computingId = window.user_session?.uid || 
                               $('[name="user_id"]').val() || 
                               $('[data-computing-id]').data('computing-id');
            
            console.log("Attempting to get computing ID...");
            console.log("window.user_session?.uid:", window.user_session?.uid);
            console.log("form user_id:", $('[name="user_id"]').val());
            console.log("data attribute:", $('[data-computing-id]').data('computing-id'));
            console.log("Final computingId:", computingId);
    
            if (!computingId) {
                throw new Error('Unable to determine computing ID');
            }
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
                .val(groupName)  // Group name is the value
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
        
        const message = `
            <div class="alert alert-warning" role="alert">
                <h4 class="alert-heading">Unable to Load Groups</h4>
                <p>There was a problem loading your group information. This could be temporary.</p>
                <hr>
                <p class="mb-0">Please try refreshing the page. If the problem persists, contact Research Computing Support.</p>
            </div>
        `;
        
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

    // Mock data for testing - will be replaced by actual API data
    async function fetchUserProjects() {
        try {
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
            console.error('Error loading preview table:', error);
            showErrorMessage('Error loading resource preview');
        }
    }

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

    // Helper function for tier notes
    function updateTierNote(message) {
        const $tierNote = $('#tier-note');
        if ($tierNote.length === 0) {
            $('#storage-platform').append(`<div id="tier-note" class="tier-note">${message}</div>`);
        } else {
            $tierNote.html(message);
        }
    }

    // Reset validation states
    function resetValidationState() {
        $('.is-invalid').removeClass('is-invalid');
        $('.invalid-feedback').remove();
        $('.invalid-field-highlight').removeClass('invalid-field-highlight');
    }

    // Update form validation
    function updateFormValidation() {
        const form = document.getElementById('combined-request-form');
        const isValid = form.checkValidity();
        $('#submit').prop('disabled', !isValid || !$('#data-agreement').is(':checked'));
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
            const $label = $(this).next('label');
            if (this.value === 'allocation') {
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
            // Ensure the label is updated for Highly Sensitive Data
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
        $('#new-project-name, #shared-space-name').on('input', _.debounce(function() {
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

    // Form data collection
    function collectFormData() {
        const formData = {
            requestType: $('input[name="request-type"]:checked').val(),
            category: $('#category').val()
        };

        // Only include group for new requests
        const isNewRequest = $('input[name="new-or-renewal"]:checked').val() === 'new' ||
                           $('input[name="type-of-request"]:checked').val() === 'new-storage';
        if (isNewRequest) {
            formData.group = $('#mygroups-group').val();
        }

        if (formData.requestType === 'service-unit') {
            Object.assign(formData, collectServiceUnitData());
        } else if (formData.requestType === 'storage') {
            Object.assign(formData, collectStorageData());
        }

        if ($('#billing-information').is(':visible')) {
            Object.assign(formData, collectBillingData());
        }

        return formData;
    }

    function collectServiceUnitData() {
        const isNew = $('input[name="new-or-renewal"]:checked').val() === 'new';
        return {
            requestType: isNew ? 'new' : 'renewal',
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
        };
    }

    // Form submission
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

        setTimeout(() => {
            $alert.alert('close');
        }, 5000);
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

            // Load initial data
            await fetchAndPopulateGroups();  // Get groups from API
            await loadPreviewTable();
            
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
        } catch (error) {
            console.error("Error during form initialization:", error);
            showErrorMessage("Failed to initialize form properly. Please refresh the page.");
        }
    }

    // Start initialization when document is ready
    initialize();
});