$(document).ready(function () {
    console.log("Script started");
    console.log("Combined request form JS loaded");

    // Constants and Configuration
    const API_CONFIG = {
        baseUrl: 'https://uvarc-unified-service.pods.uvarc.io/uvarc/api/resource/rcwebform/user',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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
            /* Existing dropdown styles */
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

            /* Existing message styles */
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

            /* Common table styles for all sections */
            #existing-resources-preview table,
            #existing-projects-allocation table,
            #existing-projects-storage table {
                border-collapse: collapse;
                width: 100%;
                margin-bottom: 1rem;
                background-color: white;
                transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
            }

            /* Common cell styles */
            #existing-resources-preview th,
            #existing-resources-preview td,
            #existing-projects-allocation th,
            #existing-projects-allocation td,
            #existing-projects-storage th,
            #existing-projects-storage td {
                border: 1px solid #dee2e6;
                padding: 0.75rem;
                vertical-align: middle;
            }

            /* Common header styles */
            #existing-resources-preview th,
            #existing-projects-allocation th,
            #existing-projects-storage th {
                background-color: #f8f9fa;
                border-bottom: 2px solid #dee2e6;
                font-weight: 600;
            }

            /* Common hover effects */
            #existing-resources-preview tbody tr:hover,
            #existing-projects-allocation tbody tr:hover,
            #existing-projects-storage tbody tr:hover {
                background-color: rgba(0,0,0,.075);
                transition: background-color 0.15s ease-in-out;
            }

            /* Common empty state styles */
            .resource-empty-state,
            .allocation-empty-state,
            .storage-empty-state {
                text-align: center;
                padding: 2rem;
                background-color: #f8f9fa;
                border: 1px dashed #dee2e6;
                border-radius: 0.25rem;
                margin: 1rem 0;
                box-shadow: 0 1px 3px rgba(0,0,0,0.05);
                animation: fadeIn 0.3s ease-in;
            }

            /* Common icon styles */
            .resource-empty-state i,
            .allocation-empty-state i,
            .storage-empty-state i {
                display: block;
                font-size: 2rem;
                color: #6c757d;
                margin-bottom: 1rem;
            }

            /* Common message styles */
            .resource-empty-state p,
            .allocation-empty-state p,
            .storage-empty-state p {
                margin-bottom: 0.5rem;
                color: #6c757d;
                font-size: 1.1rem;
                font-weight: 500;
            }

            /* Common help text styles */
            .resource-empty-state .empty-state-help,
            .allocation-empty-state .empty-state-help,
            .storage-empty-state .empty-state-help {
                font-size: 0.875rem;
                color: #6c757d;
                line-height: 1.5;
                max-width: 600px;
                margin: 0 auto;
                padding: 0 1rem;
            }

            /* Animation keyframes */
            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            /* Container spacing */
            #existing-resources-preview,
            #existing-projects-allocation,
            #existing-projects-storage {
                margin: 1.5rem 0;
            }

            /* Responsive adjustments */
            @media (max-width: 768px) {
                .resource-empty-state,
                .allocation-empty-state,
                .storage-empty-state {
                    padding: 1.5rem;
                }
            }
                .storage-info-box {
                border: solid 1px #ccc;
                padding: 1rem;
                margin-top: 0.5rem;
                font-size: 90%;
            }

            .storage-type-standard {
                background-color: #cae6d2;
            }

            .storage-type-sensitive {
                background-color: #e6caca;
            }

            .storage-usage-warning {
                background-color: #fff3cd;
                border-color: #ffeeba;
                margin-top: 0.5rem;
            }

            .storage-info-box h6 {
                margin-top: 0;
                margin-bottom: 0.5rem;
            }
        `)
        .appendTo('head');

    // Global variable to hold API response data
    let consoleData = [];
    function parseConsoleData(data) {
        if (!Array.isArray(data) || data.length === 0) {
            console.error("Invalid consoleData format or empty data:", data);
            return null;
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

    // Existing User Resources Preview
    function processUserResources(apiResponse) {
        const { userResources } = parseConsoleData(apiResponse);
        const previewTableBody = $('#combined-preview-tbody');
        const previewTable = $('#existing-resources-preview table');
    
        previewTableBody.html(`
            <tr>
                <td colspan="5" class="text-center py-4">
                    <div class="spinner-border spinner-border-sm text-primary me-2" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    Loading resources...
                </td>
            </tr>
        `);
    
        if (!Array.isArray(userResources) || userResources.length === 0) {
            showEmptyState(previewTableBody);
            return;
        }
    
        previewTableBody.empty();
        userResources.forEach(resource => {
            if (!resource || !resource.resources) return;
    
            const { resources, group_name, project_name } = resource;
    
            if (resources.hpc_service_units) {
                Object.entries(resources.hpc_service_units).forEach(([allocationName, details]) => {
                    const statusBadge = formatStatus(details.request_status);
                    const row = createResourceRow({
                        type: 'Service Units',
                        projectClass: project_name || allocationName.split('-').pop(),
                        group: group_name,
                        tier: formatTierName(details.tier),
                        details: `${statusBadge} | ${details.request_count || 0} SUs | Updated: ${formatDate(details.update_date || details.request_date)}`
                    });
                    previewTableBody.append(row);
                });
            }
    
            if (resources.storage) {
                Object.entries(resources.storage).forEach(([storageName, details]) => {
                    const statusBadge = formatStatus(details.request_status);
                    const row = createResourceRow({
                        type: 'Storage',
                        projectClass: project_name || storageName,
                        group: group_name,
                        tier: formatTierName(details.tier),
                        details: `${statusBadge} | ${details.request_size || 0}TB | Updated: ${formatDate(details.update_date || details.request_date)}`
                    });
                    previewTableBody.append(row);
                });
            }
        });
    
        previewTable.show();
    }
    
    // Helper function updates
    function createResourceRow({ type, projectClass, group, tier, details }) {
        // Don't escape details since it contains HTML for the badge
        return `
            <tr>
                <td>${escapeHtml(type)}</td>
                <td>${escapeHtml(projectClass)}</td>
                <td>${escapeHtml(group)}</td>
                <td>${escapeHtml(tier)}</td>
                <td>${details}</td>
            </tr>
        `;
    }
    
    function formatStatus(status) {
        if (!status) return '<span class="badge bg-secondary">Unknown</span>';
        
        const statusMap = {
            'active': '<span class="badge bg-success">Active</span>',
            'pending': '<span class="badge bg-warning text-dark">Pending</span>',
            'expired': '<span class="badge bg-danger">Expired</span>',
            'approved': '<span class="badge bg-success">Approved</span>'
        };
        return statusMap[status.toLowerCase()] || `<span class="badge bg-secondary">${status}</span>`;
    }
    
    function formatDate(dateObj) {
        if (!dateObj) return 'N/A';
        try {
            // Directly create a Date object from the input
            const date = new Date(dateObj);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch (e) {
            console.error('Error formatting date:', e);
            return 'N/A';
        }
    }

    function showEmptyState(tableBody) {
        tableBody.html(`
            <tr>
                <td colspan="5" class="text-center py-4">
                    <i class="fas fa-inbox d-block mb-3" style="font-size: 2rem; color: #6c757d;"></i>
                    <p class="mb-1">No Resources Found</p>
                    <small class="text-muted">
                        This section will display your allocations and storage resources once they are approved.
                        <br>
                        Use the form below to request new resources or manage existing ones.
                    </small>
                </td>
            </tr>
        `);
    }

    function showErrorState(tableBody, message) {
        tableBody.html(`
            <tr>
                <td colspan="5" class="text-center py-4 text-danger">
                    <i class="fas fa-exclamation-triangle d-block mb-3" style="font-size: 2rem;"></i>
                    <p class="mb-1">${message}</p>
                </td>
            </tr>
        `);
    }

    function createResourceRow({ type, projectClass, group, tier, details }) {
        return `
            <tr>
                <td>${escapeHtml(type)}</td>
                <td>${escapeHtml(projectClass)}</td>
                <td>${escapeHtml(group)}</td>
                <td>${escapeHtml(tier)}</td>
                <td>${details}</td>
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

    function escapeHtml(unsafe) {
        if (typeof unsafe !== 'string') return '';
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    //Existing SU Projects Allocation Preview

    function processAllocationProjects(apiResponse) {
        console.log("Processing Allocation Projects:", apiResponse);
    
        // Extract allocation projects from API response
        const allocationProjects = apiResponse?.allocationProjects || [];
        const allocationTbody = $('#allocation-projects-tbody');
        allocationTbody.empty();
    
        if (allocationProjects.length === 0) {
            // Show empty state
            $('#existing-projects-allocation table').hide();
            $('#existing-projects-allocation .allocation-empty-state').remove();
            $('#existing-projects-allocation').append(`
                <div class="allocation-empty-state">
                    <i class="fas fa-cube"></i>
                    <p>No Active Service Units Found</p>
                    <div class="empty-state-help">
                        This section will display your active Service Unit allocations once they are approved.
                        <br>
                        Use the form above to request new Service Units or manage existing ones.
                    </div>
                </div>
            `);
            return;
        }
    
        // Populate the table with allocation projects
        allocationProjects.forEach(project => {
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

    // Eligibility Check

    function handleNonEligibleUser() {
        const message = 'You are not eligible to make resource requests at this time. ' +
                       'Please ensure you have completed all required training and agreements.';
    
        $('#combined-request-form').prepend(
            $('<div>')
                .addClass('alert alert-warning')
                .text(message)
        );
    
        $('#submit').prop('disabled', true); // Keep only the submit button disabled
        $('#combined-request-form input, #combined-request-form select, #combined-request-form textarea')
            .removeAttr('disabled'); // Allow interaction with all fields
    }

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
        const $dropdowns = $('#mygroups-group, #storage-mygroups-group'); // Select all relevant dropdowns
    
        $dropdowns.each(function () {
            const $dropdown = $(this);
            $dropdown.empty(); // Clear any existing options
    
            // Add a default "Select a group" option
            $dropdown.append(
                $('<option>', {
                    value: '',
                    text: '- Select a group -',
                    selected: true,
                    disabled: true,
                })
            );
    
            // Populate the dropdown with groups
            if (groups.length) {
                console.log("Populating dropdown with groups:", groups);
                groups.forEach(group => {
                    const groupName = typeof group === 'string' ? group : group.name; // Handle object or string groups
                    $dropdown.append(
                        $('<option>', {
                            value: groupName,
                            text: groupName,
                        })
                    );
                });
    
                $dropdown.prop('disabled', false); // Enable the dropdown after population
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
    
            // Trigger a change event to ensure validation updates
            $dropdown.trigger('change');

            // Log populated options in console
        console.log('Dropdown options:', $dropdown.find('option').toArray().map(option => option.value));
        });
        
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

    // Fetch & Populate Groups
    async function fetchAndPopulateGroups() {
        const waitingMessage = utils.showWaitingMessage();
        try {
            const computingId = await waitForUserSession();
            console.log(`Attempting API call for user: ${computingId}`);
        
            const requestUrl = `${API_CONFIG.baseUrl}/${computingId}`;
            console.log("Request URL:", requestUrl);
        
            const response = await fetch(requestUrl, {
                method: 'GET',
                headers: API_CONFIG.headers,
                credentials: 'include',
            });
        
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
        
            consoleData = await response.json();
            console.log("Full API Response:", consoleData);
        
            const { userGroups, userResources } = parseConsoleData(consoleData);
        
            if (Array.isArray(userGroups) && userGroups.length > 0) {
                console.log("Populating dropdown with user groups:", userGroups);
                populateGrouperMyGroupsDropdown(userGroups);
            } else {
                console.warn("No user groups found.");
                populateGrouperMyGroupsDropdown([]); // Ensure dropdown is cleared if no groups are found
            }
        
            if (Array.isArray(userResources) && userResources.length > 0) {
                console.log("Processing user resources...");
                processUserResources(consoleData);
            } else {
                console.warn("No user resources found.");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            utils.logApiError(error, 'fetchAndPopulateGroups');
            handleApiError(error);
        } finally {
            utils.removeWaitingMessage();
        }
    }

    // Update Existing Resources

    async function updateExistingResource(formData) {
        try {
            const computingId = await waitForUserSession();
            const $submitButton = $('#submit');
            $submitButton.prop('disabled', true)
                .html('<span class="spinner-border spinner-border-sm"></span> Updating...');
    
            const payload = [{
                group_name: formData.group,
                project_name: formData.projectName || "",
                project_desc: $('#project-description').val() || "",
                data_agreement_signed: $('#data-agreement').is(':checked'),
                pi_uid: document.querySelector('#uid').value || "",
                resources: {}
            }];
    
            if (formData.requestType === 'service-unit') {
                payload[0].resources.hpc_service_units = {
                    [formData.existingProject]: {
                        tier: getTierEnum(formData.allocationTier),
                        request_count: "1000"
                    }
                };
            } else if (formData.requestType === 'storage') {
                payload[0].resources.storage = {
                    [formData.existingProject]: {
                        tier: getStorageTierEnum(formData.storageTier),
                        request_size: formData.capacity.toString()
                    }
                };
            }
    
            const response = await fetch(`${API_CONFIG.baseUrl}/${computingId}`, {
                method: 'PUT',
                headers: API_CONFIG.headers,
                credentials: 'include',
                body: JSON.stringify(payload)
            });
    
            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }
    
            showSuccessMessage('Your resource has been updated successfully.');
            resetForm();
            await fetchAndPopulateGroups();
        } catch (error) {
            console.error('Error updating resource:', error);
            showErrorMessage('Failed to update resource. Please try again.');
        } finally {
            $('#submit').prop('disabled', false).text('Submit');
        }
    }

    function calculateStorageUsage(userResources, tier, group) {
        if (!Array.isArray(userResources)) return 0;
    
        let totalUsage = 0;
    
        userResources.forEach(resource => {
            if (resource.resources?.storage) {
                Object.entries(resource.resources.storage).forEach(([key, details]) => {
                    if (details.tier === tier && resource.group_name === group) {
                        totalUsage += parseFloat(details.currentSize || 0); // Add the current size of the storage
                    }
                });
            }
        });
    
        return totalUsage;
    }
    
    // Consolidated Initialize Function
    async function initialize() {
        console.log("Initializing form...");
    
        try {
            // Hide specific sections, but do not disable the whole form
            $('#allocation-fields, #storage-fields, #common-fields').hide();
            $('#billing-information').hide();
    
            // Default selections
            $('#request-type-allocation').prop('checked', true);
            $('input[name="new-or-renewal"]').prop('checked', false);
            $('input[name="allocation-choice"]').prop('checked', false);
    
            // Register event handlers
            setupEventHandlers();
    
            // Fetch and populate data
            console.log("Fetching and populating groups...");
            await fetchAndPopulateGroups();
    
            // Update UI based on the current state
            console.log("Toggling fields and UI...");
            toggleRequestFields();
            toggleAllocationFields();
            toggleStorageFields();
            toggleStorageTierOptions();
    
            // Update billing visibility based on selections
            updateBillingVisibility();
    
            console.log("Form initialization complete.");
        } catch (error) {
            console.error("Error during form initialization:", error);
            showErrorMessage("Failed to initialize form. Please refresh the page.");
        }
    }

    function processUserProjectsFromConsole(apiResponse) {
        console.log("Processing projects from console response:", apiResponse);
    
        // Extract and parse user_resources
        const userResources = (() => {
            try {
                return typeof apiResponse[0]?.user_resources === 'string'
                    ? JSON.parse(apiResponse[0]?.user_resources)
                    : apiResponse[0]?.user_resources || [];
            } catch (error) {
                console.error("Error parsing user resources:", error);
                return [];
            }
        })();

        if (!Array.isArray(userResources) || userResources.length === 0) {
            console.error("No user resources found in API response.");
            showEmptyState("#existing-projects-allocation", "No Active Service Units Found", "This section will display your active Service Unit allocations once they are approved.");
            showEmptyState("#existing-projects-storage", "No Active Storage Found", "This section will display your active storage allocations once they are approved.");
            return;
        }

        console.log("Parsed user resources:", userResources);
    
        // Process allocations (Service Units)
        const allocationProjects = [];
        userResources.forEach(resource => {
            if (resource.resources?.hpc_service_units) {
                Object.entries(resource.resources.hpc_service_units).forEach(([key, details]) => {
                    allocationProjects.push({
                        id: key,
                        name: resource.project_name || "Unknown Project",
                        group: resource.group_name || "Unknown Group",
                        tier: formatTierName(details.tier),
                    });
                });
            }
        });
        populateTableOrEmptyState(
            allocationProjects,
            "#allocation-projects-tbody",
            "#existing-projects-allocation",
            "No Active Service Units Found",
            "This section will display your active Service Unit allocations once they are approved."
        );
    
        // Process storage projects
        const storageProjects = [];
        userResources.forEach(resource => {
            if (resource.resources?.storage && Object.keys(resource.resources.storage).length > 0) {
                Object.entries(resource.resources.storage).forEach(([key, details]) => {
                    storageProjects.push({
                        id: key,
                        name: resource.project_name || "Unknown Project",
                        group: resource.group_name || "Unknown Group",
                        tier: details.tier || "Unknown Tier",
                        sharedSpace: details.sharedSpace || "N/A",
                        currentSize: details.currentSize || "0",
                    });
                });
            }
        });
        populateTableOrEmptyState(
            storageProjects,
            "#storage-projects-tbody",
            "#existing-projects-storage",
            "No Active Storage Found",
            "This section will display your active storage allocations once they are approved."
        );
    }
    
    /**
     * Populates a table or displays an empty state.
     * @param {Array} projects - The list of projects to populate.
     * @param {string} tableBodySelector - Selector for the table's <tbody>.
     * @param {string} containerSelector - Selector for the table's container.
     * @param {string} emptyMessage - The message to display when no data exists.
     * @param {string} emptyHelp - The help text to display with the empty message.
     */
    function populateTableOrEmptyState(projects, tableBodySelector, containerSelector, emptyMessage, emptyHelp) {
        const tbody = $(tableBodySelector);
        const container = $(containerSelector);
    
        if (projects.length > 0) {
            tbody.empty();
            projects.forEach(project => {
                tbody.append(`
                    <tr>
                        <td>
                            <input type="radio" name="existing-project-${containerSelector.includes("allocation") ? "allocation" : "storage"}" 
                                   value="${escapeHtml(project.id)}" required>
                        </td>
                        <td>${escapeHtml(project.name)}</td>
                        <td>${escapeHtml(project.group)}</td>
                        <td>${escapeHtml(project.tier)}</td>
                        ${tableBodySelector === "#storage-projects-tbody" ? `
                            <td>${escapeHtml(project.sharedSpace)}</td>
                            <td>${escapeHtml(project.currentSize)} TB</td>
                        ` : ""}
                    </tr>
                `);
            });
            $(`${containerSelector} table`).show();
            $(`${containerSelector} .allocation-empty-state, .storage-empty-state`).remove();
        } else {
            showEmptyState(containerSelector, emptyMessage, emptyHelp);
        }
    }
    
    /**
     * Displays an empty state message in a container.
     * @param {string} containerSelector - Selector for the container to update.
     * @param {string} message - The message to display.
     * @param {string} helpText - The help text to display with the message.
     */
    function showEmptyState(containerSelector, message, helpText) {
        const container = $(containerSelector);
        container.find("table").hide();
        container.find(".allocation-empty-state, .storage-empty-state").remove();
        container.append(`
            <div class="${containerSelector.includes("allocation") ? "allocation-empty-state" : "storage-empty-state"}">
                <i class="fas ${containerSelector.includes("allocation") ? "fa-cube" : "fa-hdd"}"></i>
                <p>${message}</p>
                <div class="empty-state-help">${helpText}</div>
            </div>
        `);
    }
    
    /**
     * Formats tier names for display.
     * @param {string} tier - The raw tier name.
     * @returns {string} - The formatted tier name.
     */
    function formatTierName(tier) {
        switch (tier) {
            case "ssz_standard":
                return "Standard";
            case "ssz_premium":
                return "Premium";
            default:
                return tier || "Unknown Tier";
        }
    }

    // UI Validation Functions
    function validateField($field) {
        if (!$field[0].checkValidity()) {
            const fieldLabel = $field.prev('label').text() || $field.attr('placeholder') || 'This field';
            markFieldInvalid($field, `${fieldLabel} is required.`);
            return false;
        }

        const fieldId = $field.attr('id');
        const fieldValue = $field.val();

        console.log(`Validating field: ${fieldId}, Value: ${fieldValue}`);

        switch (fieldId) {
            case 'new-project-name':
                if (!utils.validateProjectName(fieldValue)) {
                    markFieldInvalid($field, 'Project name must be 3-128 characters long and contain only letters, numbers, spaces, and hyphens.');
                    return false;
                }
                break;

            case 'shared-space-name':
                if (!utils.validateSharedSpaceName(fieldValue)) {
                    markFieldInvalid($field, 'Shared space name must be 3-40 characters long and contain only letters, numbers, and hyphens.');
                    return false;
                }
                break;

            case 'capacity':
                const capacity = parseInt(fieldValue, 10);
                const minCapacity = parseInt($field.attr('min'), 10) || 0;
                const maxCapacity = parseInt($field.attr('max'), 10) || Infinity;

                if (isNaN(capacity) || capacity < minCapacity || capacity > maxCapacity) {
                    markFieldInvalid($field, `Capacity must be between ${minCapacity}TB and ${maxCapacity}TB.`);
                    return false;
                }
                break;

            default:
                // No additional validation required for this field
                break;
        }

        markFieldValid($field);
        return true;
    }

    function validateGroupSelection() {
        const requestType = $('input[name="request-type"]:checked').val(); // Check the selected request type
        const groupSelectId = requestType === 'service-unit' ? '#mygroups-group' : '#storage-mygroups-group';
        const $groupSelect = $(groupSelectId);
        const selectedGroup = $groupSelect.val();
    
        console.log(`Validating group selection for request type "${requestType}": ${selectedGroup}`);
        console.log('Dropdown options:', $groupSelect.find('option').toArray().map(option => option.value));
    
        if (!selectedGroup) {
            console.log('No group selected.');
            markFieldInvalid($groupSelect, 'Please select a group.');
            return false;
        }
    
        console.log('Group selection is valid.');
        markFieldValid($groupSelect);
        return true;
    }

    function validateForm() {
        resetValidationState();
        let isValid = true;
        let firstInvalidField = null;
    
        const isNewRequest = $('input[name="new-or-renewal"]:checked').val() === 'new' ||
                             $('input[name="type-of-request"]:checked').val() === 'new-storage';
    
        console.log(`Is New Request: ${isNewRequest}`);
    
        if (isNewRequest) {
            console.log("New request detected. Validating group selection...");
            if (!validateGroupSelection()) {
                console.log("Group selection validation failed.");
                isValid = false;
                firstInvalidField = $('#mygroups-group');
            } else {
                console.log("Group selection validation passed.");
            }
        }
    
        $('input:visible[required], select:visible[required], textarea:visible[required]').each(function () {
            if (!validateField($(this))) {
                console.log(`Field validation failed: ${$(this).attr('id') || $(this).attr('name')}`);
                isValid = false;
                firstInvalidField = firstInvalidField || $(this);
            }
        });
    
        handleValidationResult(isValid, firstInvalidField);
        return isValid;
    }

    function markFieldInvalid($field, message) {
        console.log(`Field Invalid: ${$field.attr('id')}, Reason: ${message}`);
        $field.addClass('is-invalid').removeClass('is-valid');

        let $feedback = $field.siblings('.invalid-feedback');
        if ($feedback.length === 0) {
            $feedback = $('<div>')
                .addClass('invalid-feedback')
                .css({ marginTop: '0.5rem', color: '#dc3545', fontSize: '0.875rem' }) // Styled for inline messages
                .text(message);
            $field.after($feedback);
        } else {
            $feedback.text(message);
        }
    }

    function markFieldValid($field) {
        console.log(`Marking field valid: ${$field.attr('id') || $field.attr('name')}`);
        $field.addClass('is-valid').removeClass('is-invalid');
    
        const $feedback = $field.siblings('.invalid-feedback');
        if ($feedback.length > 0) {
            $feedback.remove();
        }
    }

    function resetValidationState() {
        console.log('Resetting validation state...');
        $('.is-invalid').removeClass('is-invalid');
        $('.is-valid').removeClass('is-valid');
        $('.invalid-feedback').remove();
    }

    function handleValidationResult(isValid, firstInvalidField) {
        if (!isValid && firstInvalidField) {
            console.log(`Form is invalid. Focusing on the first invalid field: ${firstInvalidField.attr('id')}`);
            firstInvalidField.focus();
        } else {
            console.log('Form is valid.');
        }

        updateFormValidation();
    }

    // UI Toggle Functions
    function toggleRequestFields() {
        const requestType = $('input[name="request-type"]:checked').val();
        console.log("Selected resource type:", requestType);
    
        $('#allocation-fields, #storage-fields, #common-fields').hide(); // Hide all initially
    
        if (requestType === 'service-unit') {
            $('#allocation-fields, #common-fields').show();
            $('#category').val('Rivanna HPC');
            processUserProjectsFromConsole(consoleData);
        } else if (requestType === 'storage') {
            $('#storage-fields, #common-fields').show();
            $('#category').val('Storage');
            processUserProjectsFromConsole(consoleData);
        } else {
            console.warn("Unknown request type:", requestType);
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
    
        const capacityField = $('#capacity');
        capacityField
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
    
        if (!selectedStorage) {
            console.warn("No storage tier selected.");
            return;
        }
    
        const isHighlySensitive = selectedStorage === 'Highly Sensitive Data';
    
        $('#sensitive-data').toggle(isHighlySensitive);
        $('#standard-data').toggle(!isHighlySensitive);
    
        updateCapacityLimits(selectedStorage);
        updateBillingVisibility(); // Ensure billing visibility is updated whenever the tier changes
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
    
            // Parse user_resources from the console response
            const userResourcesString = consoleData[0]?.user_resources; // Use actual console response variable
            if (!userResourcesString) {
                console.error("No user_resources data found.");
                return;
            }
    
            const userResources = JSON.parse(userResourcesString);
    
            // Extract storage projects from user_resources
            const storageProjects = [];
            userResources.forEach(resource => {
                if (resource.resources?.storage && Object.keys(resource.resources.storage).length > 0) {
                    Object.entries(resource.resources.storage).forEach(([key, details]) => {
                        storageProjects.push({
                            id: key,
                            name: resource.project_name || "Unknown Project",
                            group: resource.group_name || "Unknown Group",
                            tier: details.tier || "Unknown Tier",
                            currentSize: parseInt(details.currentSize || "0"),
                        });
                    });
                }
            });
    
            // Find the selected project
            const selectedProject = storageProjects.find(p => p.id === selectedProjectId);
    
            if (selectedProject) {
                const capacityField = $('#capacity');
                const currentSize = selectedProject.currentSize;
    
                if (requestType === 'decrease-storage') {
                    capacityField.attr('max', currentSize - 1);
                    capacityField.attr('min', '1');
                } else if (requestType === 'increase-storage') {
                    const maxLimit = selectedProject.tier === 'SSZ Research Standard' ? 200 : 500;
                    capacityField.attr('max', maxLimit - currentSize);
                    capacityField.attr('min', '1');
                }
            } else {
                console.warn(`Selected project with ID ${selectedProjectId} not found.`);
            }
        } catch (error) {
            console.error('Error updating storage modification fields:', error);
            showErrorMessage('Error updating storage options');
        }
    }    

    async function updateBillingVisibility() {
        try {
            const userResources = Array.isArray(consoleData[0]?.user_resources)
                ? consoleData[0]?.user_resources
                : [];
    
            if (userResources.length === 0) {
                console.error("No valid user_resources data found.");
                return;
            }
    
            const selectedStorageTier = $('input[name="storage-choice"]:checked').val();
            const selectedGroup = $('#mygroups-group').val();
            const requestedStorageSize = parseInt($('#capacity').val(), 10) || 0;
    
            let shouldShowBilling = false;
    
            if ($('#storage-fields').is(':visible') && selectedStorageTier && selectedGroup) {
                if (selectedStorageTier === "SSZ Research Standard") {
                    const currentUsage = calculateStorageUsage(userResources, "SSZ Research Standard", selectedGroup);
                    const freeLimit = RESOURCE_TYPES["SSZ Research Standard"].freeLimit || 10;
                    shouldShowBilling = (currentUsage + requestedStorageSize) > freeLimit;
                    console.log(`Current usage: ${currentUsage} TB, Requested size: ${requestedStorageSize} TB, Free limit: ${freeLimit} TB`);
                } else if (selectedStorageTier === "SSZ Research Project" || selectedStorageTier === "Highly Sensitive Data") {
                    shouldShowBilling = true;
                    console.log(`Billing required for storage tier: ${selectedStorageTier}`);
                }
            } else {
                console.warn("Storage tier or group is not selected.");
            }
    
            $('#billing-information').toggle(shouldShowBilling);
            console.log(`Billing information visibility: ${shouldShowBilling}`);
        } catch (error) {
            console.error('Error updating billing visibility:', error);
        }
    }
    
    // Event Handlers
    function setupEventHandlers() {
        // Handle changes in request type (e.g., service unit vs storage)
        $('input[name="request-type"]').on('change', function () {
            console.log(`Request type changed to: ${$(this).val()}`);
            toggleRequestFields();
        });
    
        // Handle group selection for SU and Storage
        $(document).on('change', '#mygroups-group, #storage-mygroups-group', function () {
            const selectedGroup = $(this).val();
            console.log(`Group selected: ${selectedGroup}`);
            updateFormValidation();
        });
    
        // Handle data agreement checkbox state changes
        $('#data-agreement').on('change', function () {
            const isChecked = $(this).is(':checked');
            console.log(`Data agreement checkbox state: ${isChecked}`);
            updateFormValidation();
        });
    
        // Other event handlers...
        console.log('Event handlers successfully set up.');
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
        console.log('Form submission started...');
        event.preventDefault(); // Prevent default form submission behavior
    
        try {
            // Validate the form first
            console.log('Validating the form...');
            if (validateForm()) {
                console.log('Form validation passed.');
    
                // Collect form data
                const formData = collectFormData();
                console.log('Collected form data:', formData);
    
                // Determine if this is a new request or an update
                const isNewRequest = formData.newOrRenewal === 'new' || 
                                     formData.typeOfRequest === 'new-storage';
                console.log(`Is this a new request? ${isNewRequest}`);
    
                // Handle form submission based on the request type
                if (isNewRequest) {
                    console.log('Submitting a new request...');
                    await submitForm(formData); // Call the function to submit a new request
                } else {
                    console.log('Updating an existing resource...');
                    await updateExistingResource(formData); // Call the function to update an existing resource
                }
            } else {
                console.warn('Form validation failed. Fix the highlighted fields and try again.');
            }
        } catch (error) {
            // Handle errors gracefully
            console.error('Form submission error:', error);
            showErrorMessage('Unable to process the request. Please try again.');
        }
    }

    function collectFormData() {
        const formData = {
            requestType: $('input[name="request-type"]:checked').val(),
            userId: document.querySelector('#uid').value,
            category: $('#category').val(),
            shouldShowBilling: $('#billing-information').is(':visible')
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
            console.log('Preparing to submit form data:', formData);
            const computingId = await waitForUserSession();
            const $submitButton = $('#submit');
            $submitButton.prop('disabled', true)
                        .html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...');
    
            // Build request payload
            const payload = [{
                group_name: formData.group,
                project_name: formData.projectName || "",
                project_desc: $('#project-description').val() || "",
                data_agreement_signed: $('#data-agreement').is(':checked'),
                pi_uid: computingId,
                resources: {}
            }];
    
            if (formData.requestType === 'service-unit') {
                payload[0].resources.hpc_service_units = {
                    [formData.group]: {
                        tier: getTierEnum(formData.allocationTier),
                        request_count: formData.requestCount || "0"
                    }
                };
            } else if (formData.requestType === 'storage') {
                payload[0].resources.storage = {
                    [formData.group]: {
                        tier: getStorageTierEnum(formData.storageTier),
                        request_size: formData.capacity.toString()
                    }
                };
            }
    
            console.log('Submitting payload:', payload);
    
            const response = await fetch(`${API_CONFIG.baseUrl}/${computingId}`, {
                method: 'POST',
                headers: API_CONFIG.headers,
                credentials: 'include',
                body: JSON.stringify(payload)
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error Response:', errorText);
                throw new Error(`API request failed with status ${response.status}`);
            }
    
            showSuccessMessage('Your request has been submitted successfully.');
            resetForm();
        } catch (error) {
            console.error('Error submitting form:', error);
            showErrorMessage('Failed to submit form. Please try again later.');
        } finally {
            $('#submit').prop('disabled', false).text('Submit');
        }
    }

    // Helper function to convert tier names to enum values
    function getTierEnum(tier) {
        const tierMap = {
            'Standard': 'ssz_standard',
            'Instructional': 'ssz_instructional',
            'Paid': 'ssz_paid'
        };
        return tierMap[tier] || 'ssz_standard';
    }

    function getStorageTierEnum(tier) {
        const tierMap = {
            'SSZ Research Standard': 'ssz_standard',
            'SSZ Research Project': 'ssz_project',
            'Highly Sensitive Data': 'hsz_standard'
        };
        return tierMap[tier] || 'ssz_standard';
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
    
        // Determine the current request type (e.g., Service Unit or Storage)
        const requestType = $('input[name="request-type"]:checked').val();
        console.log(`Current request type: ${requestType}`);
    
        // Find visible fields within the relevant container
        const visibleFieldsSelector = requestType === 'service-unit' 
            ? '#allocation-fields input[required]:visible, #allocation-fields select[required]:visible, #allocation-fields textarea[required]:visible' 
            : '#storage-fields input[required]:visible, #storage-fields select[required]:visible, #storage-fields textarea[required]:visible';
    
        const requiredFields = $form.find(visibleFieldsSelector);
        const requiredFieldsFilled = requiredFields.toArray().every(field => {
            const value = $(field).val()?.trim();
            console.log(`Validating visible field: "${field.name || field.id}" | Value: "${value}"`);
            return !!value;
        });
    
        // Validate group selection dynamically
        const isGroupSelected = validateGroupSelection();
    
        // Additional checks
        const isCapacityValid = requestType === 'storage' 
            ? !!$('#capacity:visible').val()?.trim() 
            : true; // Skip capacity validation for Service Unit requests
    
        const dataAgreementChecked = $('#data-agreement').is(':checked');
    
        // Debugging logs
        console.log('Validating required fields...');
        requiredFields.each((_, field) => {
            console.log(`Field "${field.name || field.id}" value:`, $(field).val());
            if (!$(field).val()?.trim()) {
                console.warn(`Field "${field.name || field.id}" is invalid or empty.`);
            }
        });
    
        if (!isGroupSelected) console.warn('Group selection is missing.');
        if (requestType === 'storage' && !isCapacityValid) console.warn('Capacity is invalid or empty.');
    
        // Final validation result
        const shouldDisableSubmit = !requiredFieldsFilled || !dataAgreementChecked || !isGroupSelected || (requestType === 'storage' && !isCapacityValid);
        $submitBtn.prop('disabled', shouldDisableSubmit);
    
        console.log('Submit button disabled due to:', {
            hasInvalidFields: false, // Assuming fields with .is-invalid are properly tracked elsewhere
            requiredFieldsFilled,
            dataAgreementChecked,
            isGroupSelected,
            isCapacityValid,
        });
    }

    async function submitForm(formData) {
        try {
            console.log('Submitting form with formData:', formData); // Log the incoming form data
    
            const computingId = await waitForUserSession();
            const $submitButton = $('#submit');
            $submitButton.prop('disabled', true)
                         .html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Submitting...');
    
            // Build request payload
            const payload = [{
                group_name: formData.group || "Unknown Group",
                project_name: formData.projectName || "",
                project_desc: $('#project-description').val() || "",
                data_agreement_signed: $('#data-agreement').is(':checked'),
                pi_uid: document.querySelector('#uid')?.value || computingId,
                resources: {}
            }];
    
            // Handle Service Units request
            if (formData.requestType === 'service-unit') {
                const groupName = formData.group || "Default Group";
                payload[0].resources.hpc_service_units = {
                    [groupName]: {
                        tier: getTierEnum(formData.allocationTier),
                        request_count: formData.requestCount || "1000", // Default SU count
                        billing_details: formData.shouldShowBilling ? getBillingDetails() : undefined
                    }
                };
            }
            // Handle Storage request
            else if (formData.requestType === 'storage') {
                const groupName = formData.group || "Default Group";
                payload[0].resources.storage = {
                    [groupName]: {
                        tier: getStorageTierEnum(formData.storageTier),
                        request_size: formData.capacity?.toString() || "0", // Default size
                        billing_details: formData.shouldShowBilling ? getBillingDetails() : undefined
                    }
                };
            }
    
            console.log('Submitting payload:', payload); // Log the payload before sending
    
            const response = await fetch(`${API_CONFIG.baseUrl}/${computingId}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                credentials: 'include',
                body: JSON.stringify(payload)
            });
    
            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error Response:', errorText);
                throw new Error(`API request failed with status ${response.status}`);
            }
    
            console.log('API Response Successful'); // Log success for debugging
            showSuccessMessage('Your request has been submitted successfully.');
            resetForm(); // Reset the form after successful submission
        } catch (error) {
            console.error('Error submitting form:', error);
            showErrorMessage('Failed to submit form. Please try again later.');
        } finally {
            $('#submit').prop('disabled', false).text('Submit'); // Re-enable the submit button
        }
    }
    
    function getBillingDetails() {
        return {
            fdm_billing_info: [{
                company: $('#fdm-company').val() || '',
                business_unit: $('#fdm-business-unit').val() || '',
                cost_center: $('#fdm-cost-center').val() || '',
                fund: $('#fdm-fund').val() || '',
                gift: $('#fdm-gift').val() || '',
                grant: $('#fdm-grant').val() || '',
                designated: $('#fdm-designated').val() || '',
                project: $('#fdm-project').val() || '',
                program_code: $('#fdm-program-code').val() || '',
                function: $('#fdm-function').val() || '',
                activity: $('#fdm-activity').val() || '',
                assignee: $('#fdm-assignee').val() || ''
            }]
        };
    }

    // Start initialization when document is ready
    initialize();
});