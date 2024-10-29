$(document).ready(function () {
    console.log("Script started");
    console.log("Combined request form JS loaded");

    // Add CSS for styling
    $('<style>')
        .text(`
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
            .camelcase-warning {
                color: #856404;
                background-color: #fff3cd;
                border: 1px solid #ffeeba;
                padding: 0.75rem 1.25rem;
                margin-top: 0.5rem;
                border-radius: 0.25rem;
            }
            .validation-message {
                color: #dc3545;
                font-size: 0.875rem;
                margin-top: 0.25rem;
                display: none;
            }
            .invalid-format-message {
                color: #856404;
                font-size: 0.875rem;
                font-style: italic;
                margin-top: 0.25rem;
                display: none;
            }
            .project-row {
                cursor: pointer;
                transition: background-color 0.2s;
            }
            .project-row:hover {
                background-color: #f5f5f5;
            }
            .project-row.selected {
                background-color: #FDDA24 !important;
            }
            .project-group {
                font-family: monospace;
                color: #0056b3;
            }
            .project-tier {
                font-weight: 500;
            }
            .tier-note {
                font-size: 0.875rem;
                color: #666;
                margin-top: 0.25rem;
                font-style: italic;
            }
            .resource-type-allocation {
                color: #004085;
                background-color: #cce5ff;
                padding: 0.2rem 0.5rem;
                border-radius: 0.25rem;
                font-size: 0.875rem;
            }
            .resource-type-storage {
                color: #155724;
                background-color: #d4edda;
                padding: 0.2rem 0.5rem;
                border-radius: 0.25rem;
                font-size: 0.875rem;
            }
        `)
        .appendTo('head');

    // Constants for tier types and their properties
    const TIER_TYPES = {
        // Allocation tiers
        'Standard': { isPaid: false },
        'Paid': { isPaid: true },
        'Instructional': { isPaid: false },
        // Storage tiers
        'SSZ Research Project': { isPaid: true },
        'SSZ Research Standard': { 
            isPaid: (currentSize) => currentSize > 10,
            freeLimit: 10
        },
        'High Security Research Standard': { isPaid: true }
    };

    // Function to check if storage tier should be paid based on current usage
    function isTierPaid(tierName, currentSize = 0) {
        const tier = TIER_TYPES[tierName];
        if (!tier) return false;
        
        if (typeof tier.isPaid === 'function') {
            return tier.isPaid(currentSize);
        }
        return tier.isPaid;
    }

    // Sample data function instead of API call
    async function fetchUserProjects() {
        // Simulate API delay for realistic testing
        await new Promise(resolve => setTimeout(resolve, 300));
        
        return {
            allocationProjects: [
                {
                    id: 'alloc-1',
                    name: 'RNA Sequencing Analysis',
                    group: 'bioResearchLab1',
                    tier: 'Standard'
                },
                {
                    id: 'alloc-2',
                    name: 'ML in Climate Research',
                    group: 'climateAI2',
                    tier: 'Paid'
                },
                {
                    id: 'alloc-3',
                    name: 'CS 5999 Advanced Computing',
                    group: 'csClass3',
                    tier: 'Instructional'
                }
            ],
            storageProjects: [
                {
                    id: 'store-1',
                    name: 'Genomics Data Analysis',
                    group: 'bioResearchLab1',
                    tier: 'SSZ Research Project',
                    sharedSpace: 'genomicsData',
                    currentSize: '50'
                },
                {
                    id: 'store-2',
                    name: 'Climate Modeling Results',
                    group: 'climateAI2',
                    tier: 'SSZ Research Standard',
                    sharedSpace: 'climateData',
                    currentSize: '8'
                },
                {
                    id: 'store-3',
                    name: 'Clinical Trial Data',
                    group: 'medResearch3',
                    tier: 'High Security Research Standard',
                    sharedSpace: 'clinicalData',
                    currentSize: '75'
                }
            ],
            userStorageUsage: {
                'SSZ Research Standard': 8 // Current total TB used for this tier
            }
        };
    }

    async function loadPreviewTable() {
        try {
            const projects = await fetchUserProjects();
            const previewTableBody = $('#combined-preview-tbody');
            previewTableBody.empty();
            
            // Add allocation projects
            projects.allocationProjects.forEach(project => {
                previewTableBody.append(`
                    <tr>
                        <td><span class="resource-type-allocation">Allocation</span></td>
                        <td>${project.name}</td>
                        <td class="project-group">${project.group}</td>
                        <td class="project-tier">${project.tier}</td>
                        <td>Allocation Details</td>
                    </tr>
                `);
            });

            // Add storage projects
            projects.storageProjects.forEach(project => {
                previewTableBody.append(`
                    <tr>
                        <td><span class="resource-type-storage">Storage</span></td>
                        <td>${project.name}</td>
                        <td class="project-group">${project.group}</td>
                        <td class="project-tier">${project.tier}</td>
                        <td>${project.currentSize} TB</td>
                    </tr>
                `);
            });

            if (projects.allocationProjects.length === 0 && projects.storageProjects.length === 0) {
                previewTableBody.append(`
                    <tr>
                        <td colspan="5" class="text-center">No existing resources found</td>
                    </tr>
                `);
            }
        } catch (error) {
            console.error('Error loading preview table:', error);
            $('#combined-preview-tbody').empty().append(`
                <tr>
                    <td colspan="5" class="text-center text-danger">
                        Error loading resources. Please try again later.
                    </td>
                </tr>
            `);
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
                        <td colspan="4" class="text-center">No existing allocations found</td>
                    </tr>
                `);
            } else {
                projects.allocationProjects.forEach(project => {
                    const row = $('<tr>').addClass('project-row');
                    row.append(`
                        <td>
                            <input type="radio" name="existing-project-allocation" 
                                   value="${project.id}" class="form-radio project-select">
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
                        <td colspan="6" class="text-center">No existing storage found</td>
                    </tr>
                `);
            } else {
                projects.storageProjects.forEach(project => {
                    const row = $('<tr>').addClass('project-row');
                    row.append(`
                        <td>
                            <input type="radio" name="existing-project-storage" 
                                   value="${project.id}" class="form-radio project-select">
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

            // Make entire row clickable for selection tables
            $('.project-row').click(function(e) {
                if (!$(e.target).is('input[type="radio"]')) {
                    $(this).find('input[type="radio"]').prop('checked', true).trigger('change');
                }
            });

        } catch (error) {
            console.error('Error loading user projects:', error);
            $('#allocation-projects-tbody, #storage-projects-tbody').empty().append(`
                <tr>
                    <td colspan="6" class="text-center text-danger">
                        Error loading projects. Please try again later.
                    </td>
                </tr>
            `);
        }
    }

    function toggleRequestFields() {
        var requestType = $('input[name="request-type"]:checked').val();
        console.log("Selected request type:", requestType);
        $('#allocation-fields, #storage-fields, #common-fields').hide();
        if (requestType === 'allocation') {
            $('#allocation-fields, #common-fields').show();
            $('#category').val('Rivanna HPC');
        } else if (requestType === 'storage') {
            $('#storage-fields, #common-fields').show();
            $('#category').val('Storage');
        }
        logVisibility();
        updateBillingVisibility();
        toggleAllocationFields();
        toggleStorageFields();
    }

    function toggleAllocationFields() {
        var newOrRenewal = $('input[name="new-or-renewal"]:checked').val();
        console.log("Selected new or renewal:", newOrRenewal);
        var isNew = newOrRenewal === 'new';
        
        $('#new-project-name-container').toggle(isNew);
        $('#existing-projects-allocation').toggle(!isNew);
        
        if (isNew) {
            $("#new-descr").show(400);
            $("#renewal-descr").hide(400);
        } else {
            $("#new-descr").hide(400);
            $("#renewal-descr").show(400);
        }
    }

    function toggleStorageFields() {
        var typeOfRequest = $('input[name="type-of-request"]:checked').val();
        console.log("Selected type of storage request:", typeOfRequest);
        var isNewStorage = typeOfRequest === 'new-storage';
        var isModifyingExisting = ['increase-storage', 'decrease-storage', 'retire-storage'].includes(typeOfRequest);
        
        $('#storage-platform, #shared-space-name-container, #project-title-container').toggle(isNewStorage);
        $('#existing-projects-storage').toggle(isModifyingExisting);
        
        logVisibility();
        toggleSpaceField();
    }

    // ... (keep all other existing functions unchanged) ...

    // Event listeners
    $('input[name="request-type"]').change(function() {
        toggleRequestFields();
        loadPreviewTable(); // Refresh preview table when request type changes
    });

    $('input[name="new-or-renewal"]').change(toggleAllocationFields);
    $('input[name="type-of-request"]').change(toggleStorageFields);
    $('input[name="storage-choice"]').change(toggleTierOptions);
    $('input[name="allocation-choice"]').change(function() {
        console.log("Selected allocation tier:", $(this).val());
        updateBillingVisibility();
    });

    $('#mygroups-group').change(function() {
        console.log("Selected Grouper/MyGroups account:", $(this).val());
        validateGroupSelection();
    });

    $('#data-agreement').click(function () {
        $('#submit').attr("disabled", !$(this).is(':checked'));
    });

    $('#combined-request-form').submit(function (event) {
        event.preventDefault();
        
        if (validateForm()) {
            $(this).find("button[type='submit']").prop('disabled', true);
            console.log('Form submitted successfully');
        } else {
            console.log('Form validation failed');
        }
    });

    $('#capacity').on('input change', function() {
        if ($('#storage-fields').is(':visible')) {
            updateBillingVisibility();
        }
    });

    // Initial calls
    console.log("Initial call to toggle functions");
    $('#allocation-fields, #storage-fields, #common-fields').hide();
    loadPreviewTable(); // Load the preview table initially
    toggleRequestFields();
    toggleAllocationFields();
    toggleStorageFields();
    toggleTierOptions();
    loadUserProjects();
    fetchAndPopulateGroups();
    updateBillingVisibility();
});