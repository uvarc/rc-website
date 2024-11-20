$(document).ready(function () {
    console.log("Script started");
    console.log("Combined request form JS loaded");

    // Constants and Configuration
    const API_CONFIG = {
        baseUrl: 'https://uvarc-unified-service.pods.uvarc.io/uvarc/api/resource/rcwebform/user',
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        }
    };

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

    const VALIDATION = {
        groupName: /^[a-zA-Z0-9\-_]+$/,
        projectName: /^[\w\-\s]{3,128}$/,
        sharedSpaceName: /^[\w\-]{3,40}$/
    };

    // CSS Styles
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
            .api-waiting-message {
                margin-bottom: 1rem;
                padding: 1rem;
                border-radius: 0.25rem;
                border: 1px solid #b8daff;
                background-color: #cce5ff;
                color: #004085;
            }
            #existing-resources-preview table {
                border-collapse: collapse;
                width: 100%;
                margin-bottom: 1rem;
                background-color: white;
            }
            #existing-resources-preview th,
            #existing-resources-preview td {
                border: 1px solid #dee2e6;
                padding: 0.75rem;
                vertical-align: middle;
            }
            #existing-resources-preview th {
                background-color: #f8f9fa;
                border-bottom: 2px solid #dee2e6;
                font-weight: 600;
            }
            #existing-resources-preview tbody tr:hover {
                background-color: rgba(0,0,0,.075);
            }
            .resource-empty-state {
                text-align: center;
                padding: 2rem;
                background-color: #f8f9fa;
                border: 1px dashed #dee2e6;
                border-radius: 0.25rem;
                margin: 1rem 0;
            }
            .resource-empty-state i {
                display: block;
                font-size: 2rem;
                color: #6c757d;
                margin-bottom: 1rem;
            }
            .resource-empty-state p {
                margin-bottom: 0.5rem;
                color: #6c757d;
            }
            .resource-empty-state .empty-state-help {
                font-size: 0.875rem;
                color: #6c757d;
            }
        `)
        .appendTo('head');

        // Existing User Resources

        function processUserResources(apiResponse) {
            const [responseData, statusCode] = apiResponse;
            const previewTableBody = $('#combined-preview-tbody');
            previewTableBody.empty();
    
            if (!responseData.user_resources || !Array.isArray(responseData.user_resources)) {
                console.warn('No user resources found in API response');
                const emptyState = `
                    <div class="resource-empty-state">
                        <i class="fas fa-inbox"></i>
                        <p>No Active Resources Found</p>
                        <div class="empty-state-help">
                            This section will display your active allocations and storage resources once they are approved.
                            <br>
                            Use the form below to request new resources or manage existing ones.
                        </div>
                    </div>
                `;
                $('#existing-resources-preview table').hide();
                $('#existing-resources-preview').append(emptyState);
                return;
            }
    
            // Show table and remove any existing empty state
            $('#existing-resources-preview table').show();
            $('.resource-empty-state').remove();
    
            // Process each group's resources
            responseData.user_resources.forEach(groupResource => {
                const resources = groupResource.resources || {};
                
                // Process HPC Service Units
                if (resources.hpc_service_units) {
                    Object.entries(resources.hpc_service_units).forEach(([allocationName, details]) => {
                        if (details.request_status === 'active') {
                            const row = createResourceRow({
                                type: 'Service Units',
                                projectClass: allocationName,
                                group: groupResource.group_name,
                                tier: formatTierName(details.tier),
                                details: `Expires: ${formatDate(details.request_expiry_date)}`
                            });
                            previewTableBody.append(row);
                        }
                    });
                }
    
                // Process Storage
                if (resources.storage) {
                    Object.entries(resources.storage).forEach(([storageName, details]) => {
                        if (details.request_status === 'active') {
                            const row = createResourceRow({
                                type: 'Storage',
                                projectClass: groupResource.project_name || storageName,
                                group: groupResource.group_name,
                                tier: formatTierName(details.tier),
                                details: `${details.request_size}TB, Expires: ${formatDate(details.request_expiry_date)}`
                            });
                            previewTableBody.append(row);
                        }
                    });
                }
            });
    
            // If no active resources were found, show empty state
            if (previewTableBody.children().length === 0) {
                $('#existing-resources-preview table').hide();
                const emptyState = `
                    <div class="resource-empty-state">
                        <i class="fas fa-inbox"></i>
                        <p>No Active Resources Found</p>
                        <div class="empty-state-help">
                            This section will display your active allocations and storage resources once they are approved.
                            <br>
                            Use the form below to request new resources or manage existing ones.
                        </div>
                    </div>
                `;
                $('#existing-resources-preview').append(emptyState);
            }
        }
    
        // Helper functions for resource preview
        function createResourceRow({ type, projectClass, group, tier, details }) {
            return `
                <tr>
                    <td>${escapeHtml(type)}</td>
                    <td>${escapeHtml(projectClass)}</td>
                    <td>${escapeHtml(group)}</td>
                    <td>${escapeHtml(tier)}</td>
                    <td>${escapeHtml(details)}</td>
                </tr>
            `;
        }
    
        function formatTierName(tier) {
            const tierMap = {
                'ssz_standard': 'Standard',
                'ssz_instructional': 'Instructional',
                'ssz_paid': 'Paid',
                'ssz_project': 'Project',
                'hsz_standard': 'High Security Standard',
                'hsz_paid': 'High Security Paid',
                'hsz_project': 'High Security Project'
            };
            return tierMap[tier] || tier;
        }
    
        function formatDate(dateString) {
            if (!dateString) return 'N/A';
            try {
                const date = new Date(dateString);
                return date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
            } catch (e) {
                console.error('Error formatting date:', e);
                return dateString;
            }
        }
    
        function escapeHtml(unsafe) {
            if (typeof unsafe !== 'string') return '';
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        }

    // Utility Functions
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
    };

    // New Error Handling Functions

    //Eligibility Check

    // function handleNonEligibleUser() {
    //     const message = 'You are not eligible to make resource requests at this time. ' +
    //                    'Please ensure you have completed all required training and agreements.';
        
    //     $('#combined-request-form').prepend(
    //         $('<div>')
    //             .addClass('alert alert-warning')
    //             .text(message)
    //     );
        
    //     $('#combined-request-form input, #combined-request-form select, #combined-request-form textarea')
    //         .prop('disabled', true);
        
    //     $('#submit').prop('disabled', true);
    // }

    function handleApiError(error) {
        console.error('API Error:', error);
        
        const message = 'There was an error loading your groups. ' +
                       'Please try refreshing the page.';
        
        $('#combined-request-form').prepend(
            $('<div>')
                .addClass('alert alert-danger')
                .html(`<strong>Error:</strong> ${message}`)
        );
    }

    function populateGrouperMyGroupsDropdown(groups) {
        const $dropdown = $('#mygroups-group');
        $dropdown.empty();
        
        // Add default option
        $dropdown.append(
            $('<option>', {
                value: '',
                text: '- Select a group -',
                selected: true,
                disabled: true
            })
        );
        
        if (Array.isArray(groups) && groups.length > 0) {
            console.log(`Populating dropdown with ${groups.length} groups`);
            
            // Handle both string arrays and object arrays
            groups.forEach(group => {
                const groupName = typeof group === 'string' ? group : group.name;
                console.log(`Adding group: ${groupName}`);
                
                $dropdown.append(
                    $('<option>', {
                        value: groupName,
                        text: groupName
                    })
                );
            });
            
            $dropdown.prop('disabled', false);
        } else {
            console.log('No groups found to populate');
            $dropdown.append(
                $('<option>', {
                    value: '',
                    text: 'No groups available - contact support',
                    disabled: true
                })
            );
            $dropdown.prop('disabled', true);
        }
        
        // Enable form elements that were disabled during loading
        $('#combined-request-form input, #combined-request-form select, #combined-request-form textarea')
            .not('#mygroups-group')
            .prop('disabled', false);
        
        $dropdown.trigger('change');
    }

    // API and Data Functions
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

    async function fetchAndPopulateGroups() {
        const waitingMessage = utils.showWaitingMessage();
        
        try {
            const computingId = await waitForUserSession();
            console.log("%c Attempting API call for user: " + computingId, "color: blue; font-weight: bold");

            const requestUrl = `${API_CONFIG.baseUrl}/${computingId}`;
            console.log("Request URL:", requestUrl);

            const response = await fetch(requestUrl, {
                method: 'GET',
                headers: API_CONFIG.headers,
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            console.log("%c Full API Response:", "color: green; font-weight: bold");
            console.log(data);

            // // Check if user is eligible
            // if (data[0].is_user_resource_request_elligible === false) {
            //     handleNonEligibleUser();
            //     return;
            // }

            // Process groups for dropdown
            if (data[0].user_groups) {
                populateGrouperMyGroupsDropdown(data[0].user_groups);
            }

            // Process and display user resources - THIS IS THE NEW LINE
            processUserResources(data);

        } catch (error) {
            console.error("%c Error fetching data:", "color: red; font-weight: bold");
            console.error(error);
            utils.logApiError(error, 'fetchAndPopulateGroups');
            handleApiError(error);
        } finally {
            utils.removeWaitingMessage();
        }
    }
    
    // Initialize Function
    async function initialize() {
        console.log("Initializing form...");
        
        try {
            // Hide all fields initially
            $('#allocation-fields, #storage-fields, #common-fields').hide();
            $('#submit').prop('disabled', true);
    
            // Set labels
            $('#request-type-allocation').next('label').text('Service Unit (SU)');
            $('#request-type-storage').next('label').text('Storage');
            $('#storage-choice4').next('label').text('Highly Sensitive Data');
    
            // Pre-select Service Unit (SU) but remove other default selections
            $('#request-type-allocation').prop('checked', true);
            $('input[name="new-or-renewal"]').prop('checked', false);
            $('input[name="allocation-choice"]').prop('checked', false);
    
            setupEventHandlers();
    
            await fetchAndPopulateGroups();
            await loadPreviewTable();
            
            // Show the appropriate fields based on Service Unit selection
            $('#allocation-fields, #common-fields').show();
            $('#category').val('Rivanna HPC');
            
            console.log("Form initialization complete");
        } catch (error) {
            console.error("Error during form initialization:", error);
            showErrorMessage("Failed to initialize form properly. Please try refreshing the page.");
        }
    }

    async function fetchUserProjects() {
        try {
            await waitForUserSession();
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Return empty data structure
            return {
                allocationProjects: [],
                storageProjects: [],
                userStorageUsage: {
                    'SSZ Research Standard': 0
                }
            };
        } catch (error) {
            console.error('Error fetching user projects:', error);
            throw new Error('Failed to fetch user projects');
        }
    }
    
    async function loadUserProjects() {
        try {
            const projects = await fetchUserProjects();
    
            // Handle Service Units (Allocations)
            const allocationTbody = $('#allocation-projects-tbody');
            if (projects.allocationProjects && projects.allocationProjects.length > 0) {
                allocationTbody.empty();
                projects.allocationProjects.forEach(project => {
                    allocationTbody.append(`
                        <tr>
                            <td>
                                <input type="radio" name="existing-project-allocation" 
                                       value="${escapeHtml(project.id)}" required>
                            </td>
                            <td>${escapeHtml(project.name)}</td>
                            <td>${escapeHtml(project.group)}</td>
                            <td>${escapeHtml(project.tier)}</td>
                        </tr>
                    `);
                });
                $('#existing-projects-allocation table').show();
                $('#existing-projects-allocation .allocation-empty-state').remove();
            } else {
                // Show empty state for allocations
                $('#existing-projects-allocation table').hide();
                $('#existing-projects-allocation .allocation-empty-state').remove();
                $('#existing-projects-allocation').append(`
                    <div class="allocation-empty-state">
                        <i class="fas fa-cube"></i>
                        <p>No Active Service Units Found</p>
                        <div class="empty-state-help">
                            You currently don't have any active Service Unit allocations.
                            <br>
                            Select "New" above to request your first allocation.
                        </div>
                    </div>
                `);
            }
    
            // Handle Storage Projects
            const storageTbody = $('#storage-projects-tbody');
            if (projects.storageProjects && projects.storageProjects.length > 0) {
                storageTbody.empty();
                projects.storageProjects.forEach(project => {
                    storageTbody.append(`
                        <tr>
                            <td>
                                <input type="radio" name="existing-project-storage" 
                                       value="${escapeHtml(project.id)}" required>
                            </td>
                            <td>${escapeHtml(project.name)}</td>
                            <td>${escapeHtml(project.group)}</td>
                            <td>${escapeHtml(project.tier)}</td>
                            <td>${escapeHtml(project.sharedSpace)}</td>
                            <td>${escapeHtml(project.currentSize)} TB</td>
                        </tr>
                    `);
                });
                $('#existing-projects-storage table').show();
                $('#existing-projects-storage .storage-empty-state').remove();
            } else {
                // Show empty state for storage
                $('#existing-projects-storage table').hide();
                $('#existing-projects-storage .storage-empty-state').remove();
                $('#existing-projects-storage').append(`
                    <div class="storage-empty-state">
                        <i class="fas fa-hdd"></i>
                        <p>No Active Storage Found</p>
                        <div class="empty-state-help">
                            You currently don't have any active storage allocations.
                            <br>
                            Select "Create new storage share" above to request storage.
                        </div>
                    </div>
                `);
            }
    
            return projects;
        } catch (error) {
            console.error('Error loading user projects:', error);
            return {
                allocationProjects: [],
                storageProjects: [],
                userStorageUsage: {
                    'SSZ Research Standard': 0
                }
            };
        }
    }

    async function loadUserProjects() {
        try {
            const projects = await fetchUserProjects();
    
            // Handle Service Units (Allocations)
            const allocationTbody = $('#allocation-projects-tbody');
            if (projects.allocationProjects && projects.allocationProjects.length > 0) {
                allocationTbody.empty();
                projects.allocationProjects.forEach(project => {
                    allocationTbody.append(`
                        <tr>
                            <td>
                                <input type="radio" name="existing-project-allocation" 
                                       value="${escapeHtml(project.id)}" required>
                            </td>
                            <td>${escapeHtml(project.name)}</td>
                            <td>${escapeHtml(project.group)}</td>
                            <td>${escapeHtml(project.tier)}</td>
                        </tr>
                    `);
                });
                $('#existing-projects-allocation table').show();
                $('#existing-projects-allocation .allocation-empty-state').remove();
            } else {
                // Show empty state for allocations
                $('#existing-projects-allocation table').hide();
                $('#existing-projects-allocation .allocation-empty-state').remove();
                $('#existing-projects-allocation').append(`
                    <div class="allocation-empty-state">
                        <i class="fas fa-cube"></i>
                        <p>No Active Service Units Found</p>
                        <div class="empty-state-help">
                            You currently don't have any active Service Unit allocations.
                            <br>
                            Select "New" above to request your first allocation.
                        </div>
                    </div>
                `);
            }
    
            // Handle Storage Projects
            const storageTbody = $('#storage-projects-tbody');
            if (projects.storageProjects && projects.storageProjects.length > 0) {
                storageTbody.empty();
                projects.storageProjects.forEach(project => {
                    storageTbody.append(`
                        <tr>
                            <td>
                                <input type="radio" name="existing-project-storage" 
                                       value="${escapeHtml(project.id)}" required>
                            </td>
                            <td>${escapeHtml(project.name)}</td>
                            <td>${escapeHtml(project.group)}</td>
                            <td>${escapeHtml(project.tier)}</td>
                            <td>${escapeHtml(project.sharedSpace)}</td>
                            <td>${escapeHtml(project.currentSize)} TB</td>
                        </tr>
                    `);
                });
                $('#existing-projects-storage table').show();
                $('#existing-projects-storage .storage-empty-state').remove();
            } else {
                // Show empty state for storage
                $('#existing-projects-storage table').hide();
                $('#existing-projects-storage .storage-empty-state').remove();
                $('#existing-projects-storage').append(`
                    <div class="storage-empty-state">
                        <i class="fas fa-hdd"></i>
                        <p>No Active Storage Found</p>
                        <div class="empty-state-help">
                            You currently don't have any active storage allocations.
                            <br>
                            Select "Create new storage share" above to request storage.
                        </div>
                    </div>
                `);
            }
    
            return projects;
        } catch (error) {
            console.error('Error loading user projects:', error);
            return {
                allocationProjects: [],
                storageProjects: [],
                userStorageUsage: {
                    'SSZ Research Standard': 0
                }
            };
        }
    }

    function loadPreviewTable() {
        console.log("Loading preview table");
        return Promise.resolve();
    }

    // UI Validation Functions
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

    function validateGroupSelection() {
        const $groupSelect = $('#mygroups-group');
        const selectedGroup = $groupSelect.val();
        
        if (!selectedGroup) {
            markFieldInvalid($groupSelect, 'Please select a group');
            return false;
        }
        
        markFieldValid($groupSelect);
        return true;
    }

    function validateForm() {
        resetValidationState();
        let isValid = true;
        let firstInvalidField = null;

        const isNewRequest = $('input[name="new-or-renewal"]:checked').val() === 'new' ||
                           $('input[name="type-of-request"]:checked').val() === 'new-storage';
        
        if (isNewRequest && !validateGroupSelection()) {
            isValid = false;
            firstInvalidField = $('#mygroups-group');
        }

        $('input:visible[required], select:visible[required], textarea:visible[required]').each(function() {
            if (!validateField($(this))) {
                isValid = false;
                firstInvalidField = firstInvalidField || $(this);
            }
        });

        handleValidationResult(isValid, firstInvalidField);
        return isValid;
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

    function resetValidationState() {
        $('.is-invalid').removeClass('is-invalid');
        $('.invalid-feedback').remove();
        $('.invalid-field-highlight').removeClass('invalid-field-highlight');
    }

    function handleValidationResult(isValid, firstInvalidField) {
        if (!isValid && firstInvalidField) {
            firstInvalidField.focus();
        }
        updateFormValidation();
    }

    // 5. UI Toggle Functions
    function toggleRequestFields(   ) {
        const requestType = $('input[name="request-type"]:checked').val();
        console.log("Selected resource type:", requestType);
        
        $('#allocation-fields, #storage-fields, #common-fields').hide();
        
        if (requestType === 'service-unit') {
            $('#allocation-fields, #common-fields').show();
            $('#category').val('Rivanna HPC');
            loadUserProjects();
        } else if (requestType === 'storage') {
            $('#storage-fields, #common-fields').show();
            $('#category').val('Storage');
            loadUserProjects();
        }
    
        updateBillingVisibility();
    }

    function toggleAllocationFields() {
        const newOrRenewal = $('input[name="new-or-renewal"]:checked').val();
        console.log("Selected new or renewal:", newOrRenewal);
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

    function toggleStorageFields() {
        const typeOfRequest = $('input[name="type-of-request"]:checked').val();
        console.log("Selected type of storage request:", typeOfRequest);
        
        const isNewStorage = typeOfRequest === 'new-storage';
        const isModifyingExisting = ['increase-storage', 'decrease-storage', 'retire-storage'].includes(typeOfRequest);
        const isRetiring = typeOfRequest === 'retire-storage';
        
        $('#storage-platform, #shared-space-name-container, #project-title-container').toggle(isNewStorage);
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
        console.log("Selected storage tier:", selectedStorage);
        
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
            console.error('Error updating storage modification fields:', error);
            showErrorMessage('Error updating storage options');
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
            showErrorMessage('Error determining billing requirements');
        }
    }
    // Event Handlers
    function setupEventHandlers() {
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

        $('input[name="new-or-renewal"]').on('change', toggleAllocationFields);
        $('input[name="allocation-choice"]').on('change', function() {
            console.log("Selected SU tier:", $(this).val());
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
            console.log("Selected Grouper/MyGroups account:", $(this).val());
            validateGroupSelection();
            updateFormValidation();
        });

        $('#data-agreement').on('change', function() {
            $('#submit').prop('disabled', !$(this).is(':checked'));
        });

        $('#combined-request-form').on('submit', handleFormSubmission);

        setupRealTimeValidation();
    }

    function setupRealTimeValidation() {
        const fieldsToValidate = '#combined-request-form input:not([type="radio"]), #combined-request-form select, #combined-request-form textarea';
        
        $(fieldsToValidate).on('blur change', function() {
            validateField($(this));
            updateFormValidation();
        });

        let timeoutId;
        $('#new-project-name, #shared-space-name').on('input', function() {
            const $field = $(this);
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                validateField($field);
            }, 300);
        });
    }

    // Form Submission and UI Feedback
    async function handleFormSubmission(event) {
        event.preventDefault();
        
        try {
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

    function collectFormData() {
        const formData = {
            requestType: $('input[name="request-type"]:checked').val(),
            userId: document.querySelector('#uid').value,
            category: $('#category').val()
        };

        if (formData.requestType === 'service-unit') {
            formData.newOrRenewal = $('input[name="new-or-renewal"]:checked').val();
            if (formData.newOrRenewal === 'new') {
                formData.projectName = $('#new-project-name').val();
                formData.group = $('#mygroups-group').val();
                formData.allocationTier = $('input[name="allocation-choice"]:checked').val();
            } else {
                formData.existingProject = $('input[name="existing-project-allocation"]:checked').val();
            }
        }

        if (formData.requestType === 'storage') {
            formData.typeOfRequest = $('input[name="type-of-request"]:checked').val();
            if (formData.typeOfRequest === 'new-storage') {
                formData.storageTier = $('input[name="storage-choice"]:checked').val();
                formData.sharedSpaceName = $('#shared-space-name').val();
                formData.group = $('#mygroups-group').val();
            } else {
                formData.existingProject = $('input[name="existing-project-storage"]:checked').val();
            }
            formData.capacity = $('#capacity').val();
        }

        return formData;
    }
    async function submitForm(formData) {
        try {
            const $submitButton = $('#submit');
            const originalText = $submitButton.text();
            
            $submitButton.prop('disabled', true)
                        .html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...');

            console.log('Form data to be submitted:', formData);
            showSuccessMessage('Your request has been submitted successfully.');
            resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
            showErrorMessage('Failed to submit form. Please try again later.', false);
        } finally {
            $('#submit').prop('disabled', false).text(originalText);
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

    function updateTierNote(message) {
        const $tierNote = $('#tier-note');
        if ($tierNote.length === 0) {
            $('#storage-platform').append(`<div id="tier-note" class="tier-note">${message}</div>`);
        } else {
            $tierNote.html(message);
        }
    }

    function resetForm() {
        $('#combined-request-form')[0].reset();
        resetValidationState();
        toggleRequestFields();
        $('#submit').prop('disabled', true);
    }

    function updateFormValidation() {
        const $form = $('#combined-request-form');
        const $submitBtn = $('#submit');
        const hasInvalidFields = $form.find('.is-invalid').length > 0;
        let requiredFieldsFilled = true;
        
        $form.find('input[required]:visible, select[required]:visible, textarea[required]:visible').each(function() {
            if (!$(this).val()) {
                requiredFieldsFilled = false;
                return false;
            }
        });
        
        const dataAgreementChecked = $('#data-agreement').is(':checked');
        $submitBtn.prop('disabled', hasInvalidFields || !requiredFieldsFilled || !dataAgreementChecked);
        
        if ($submitBtn.is(':disabled')) {
            console.log('Submit button disabled due to:', {
                hasInvalidFields,
                requiredFieldsFilled,
                dataAgreementChecked
            });
        }
    }

    // Initialization
    async function initialize() {
        console.log("Initializing form...");
        
        try {
            $('#allocation-fields, #storage-fields, #common-fields').hide();
            $('#submit').prop('disabled', true);

            $('#request-type-allocation').next('label').text('Service Unit (SU)');
            $('#request-type-storage').next('label').text('Storage');
            $('#storage-choice4').next('label').text('Highly Sensitive Data');

            setupEventHandlers();

            await fetchAndPopulateGroups();
            await loadPreviewTable();
            
            toggleRequestFields();
            toggleAllocationFields();
            toggleStorageFields();
            toggleStorageTierOptions();
            
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