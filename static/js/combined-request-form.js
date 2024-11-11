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

            /* Warning and Validation Messages */
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

            /* Table Styling */
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

            /* Resource Type Badges */
            .resource-type-allocation {
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

    // Constants for tier types and their properties
    const TIER_TYPES = {
        // Allocation tiers
        'Standard': { 
            isPaid: false,
            description: 'Standard allocation for research projects'
        },
        'Paid': { 
            isPaid: true,
            description: 'Paid allocation for additional computing needs'
        },
        'Instructional': { 
            isPaid: false,
            description: 'Allocation for teaching and educational purposes'
        },
        // Storage tiers
        'SSZ Research Project': { 
            isPaid: true,
            description: 'High-performance project storage'
        },
        'SSZ Research Standard': { 
            isPaid: (currentSize) => currentSize > 10,
            freeLimit: 10,
            description: 'Standard research storage (first 10TB free)'
        },
        'High Security Research Standard': { 
            isPaid: true,
            description: 'Secure storage for sensitive data'
        }
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

    // CamelCase validation function
    function isCamelCase(str) {
        return /^[a-z]+[A-Z][A-Za-z0-9]*$/.test(str);
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
                },
                {
                    id: 'alloc-4',
                    name: 'Neural Network Research',
                    group: 'deepLearningLab4',
                    tier: 'Standard',
                    description: 'Deep learning model development'
                },
                {
                    id: 'alloc-5',
                    name: 'BMED 3080 Lab',
                    group: 'biomedClass5',
                    tier: 'Instructional',
                    description: 'Undergraduate biomedical lab'
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
                },
                {
                    id: 'store-3',
                    name: 'Clinical Trial Database',
                    group: 'medResearch3',
                    tier: 'High Security Research Standard',
                    sharedSpace: 'clinicalData',
                    currentSize: '75',
                    description: 'Protected health information'
                },
                {
                    id: 'store-4',
                    name: 'Neural Network Training Data',
                    group: 'deepLearningLab4',
                    tier: 'SSZ Research Standard',
                    sharedSpace: 'neuralNetData',
                    currentSize: '120',
                    description: 'ML training datasets'
                },
                {
                    id: 'store-5',
                    name: 'Student Project Data',
                    group: 'biomedClass5',
                    tier: 'SSZ Research Standard',
                    sharedSpace: 'studentData',
                    currentSize: '5',
                    description: 'Course project storage'
                }
            ],
            userStorageUsage: {
                'SSZ Research Standard': 133  // Total TB used across all SSZ Research Standard projects
            }
        };
    }

    function fetchAndPopulateGroups() {
        var mockApiResponse = [
            { id: 'research_group1', name: 'bioResearchLab1' },
            { id: 'research_group2', name: 'climateAI2' },
            { id: 'class_group1', name: 'csClass3' },
            { id: 'research_group3', name: 'deepLearningLab4' },
            { id: 'class_group2', name: 'biomedClass5' },
            { id: 'invalid_group1', name: 'invalid-group-1' },
            { id: 'invalid_group2', name: 'InvalidGroup2' }
        ];

        populateGrouperMyGroupsDropdown(mockApiResponse);
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
                        <td>${project.description}</td>
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
                        <td>${project.currentSize} TB - ${project.description}</td>
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

            // Add selection highlight
            $('.project-row input[type="radio"]').change(function() {
                let tableBody = $(this).closest('tbody');
                tableBody.find('.project-row').removeClass('selected');
                $(this).closest('.project-row').addClass('selected');
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
    function populateGrouperMyGroupsDropdown(groups) {
        var dropdown = $('#mygroups-group');
        dropdown.empty();
        dropdown.append('<option value="">- Select a group -</option>');
        
        var validOptionsCount = 0;
        
        $.each(groups, function(key, value) {
            var option = $('<option></option>')
                .attr('value', value.id)
                .text(value.name);
            
            if (!isCamelCase(value.name)) {
                option.addClass('text-muted')
                     .prop('disabled', true)
                     .attr('title', '⚠️ This group name is not in camelCase format')
                     .data('camelcase', false)
                     .text('⚠️ ' + value.name + ' (Invalid format)');
            } else {
                option.data('camelcase', true);
                validOptionsCount++;
            }
            
            dropdown.append(option);
        });

        if ($('#group-selection-messages').length === 0) {
            dropdown.after('<div id="group-selection-messages"></div>');
        }

        var messagesContainer = $('#group-selection-messages');
        messagesContainer.empty();

        messagesContainer.append('<div id="camelcase-validation-message" class="validation-message">Please select a group with a valid camelCase name</div>');

        if (groups.length - validOptionsCount > 0) {
            messagesContainer.append(`
                <div class="invalid-format-message" style="display: block;">
                    ${groups.length - validOptionsCount} group(s) are not in valid camelCase format and have been disabled
                </div>
            `);
        }

        if (validOptionsCount === 0) {
            dropdown.addClass('is-invalid');
        }
    }

    function validateGroupSelection() {
        var selectedOption = $('#mygroups-group option:selected');
        var validationMessage = $('#camelcase-validation-message');
        
        if (selectedOption.length && selectedOption.val() !== '') {
            if (!selectedOption.data('camelcase')) {
                validationMessage.show();
                $('#mygroups-group').addClass('is-invalid');
                return false;
            } else {
                validationMessage.hide();
                $('#mygroups-group').removeClass('is-invalid').addClass('is-valid');
                return true;
            }
        }
        return true;
    }

    function toggleRequestFields() {
        var requestType = $('input[name="request-type"]:checked').val();
        console.log("Selected request type:", requestType);
        $('#allocation-fields, #storage-fields, #common-fields').hide();
        if (requestType === 'allocation') {
            $('#allocation-fields, #common-fields').show();
            $('#category').val('Rivanna HPC');
            loadUserProjects();
        } else if (requestType === 'storage') {
            $('#storage-fields, #common-fields').show();
            $('#category').val('Storage');
            loadUserProjects();
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

    function toggleSpaceField() {
        var selectedType = $('input[name="type-of-request"]:checked').val();
        var isRetire = selectedType === 'retire-storage';
        $('#capacity').prop('disabled', isRetire).val(isRetire ? '0' : '');
        if (!isRetire) {
            updateBillingVisibility();
        }
    }

    function toggleTierOptions() {
        var selectedStorage = $('input[name="storage-choice"]:checked').val();
        console.log("Selected tier option:", selectedStorage);
        var isHighSecurity = selectedStorage === 'High Security Research Standard';
        $('#sensitive-data').toggle(isHighSecurity);
        $('#standard-data').toggle(!isHighSecurity);
        updateBillingVisibility();
        logVisibility();
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

            // Check allocation tier if it's an allocation request
            if ($('#allocation-fields').is(':visible') && selectedAllocationTier) {
                shouldShowBilling = isTierPaid(selectedAllocationTier);
            }

            // Check storage tier if it's a storage request
            if ($('#storage-fields').is(':visible') && selectedStorageTier) {
                if (selectedStorageTier === 'SSZ Research Standard') {
                    const totalSize = currentStorageUsage + requestedStorageSize;
                    shouldShowBilling = totalSize > TIER_TYPES['SSZ Research Standard'].freeLimit;
                    
                    if (shouldShowBilling) {
                        tierNote = `Note: You have already used ${currentStorageUsage} TB of your free 10 TB allocation. This request will exceed the free limit.`;
                    } else {
                        tierNote = `Note: You have used ${currentStorageUsage} TB of your free 10 TB allocation.`;
                    }
                } else {
                    shouldShowBilling = isTierPaid(selectedStorageTier);
                }
            }

            // Update UI
            console.log("Should show billing:", shouldShowBilling);
            if (shouldShowBilling) {
                $('#billing-information').slideDown();
                $('#billing-information input, #billing-information select').prop('required', true);
            } else {
                $('#billing-information').slideUp();
                $('#billing-information input, #billing-information select').prop('required', false);
            }

            // Update or create tier note
            if (tierNote) {
                if ($('#tier-note').length === 0) {
                    $('#storage-platform').append(`<div id="tier-note" class="tier-note">${tierNote}</div>`);
                } else {
                    $('#tier-note').html(tierNote);
                }
            } else {
                $('#tier-note').remove();
            }
        } catch (error) {
            console.error('Error updating billing visibility:', error);
        }
    }

    function logVisibility() {
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

    function validateForm() {
        var isValid = true;
        var firstInvalidField = null;
    
        $('.is-invalid').removeClass('is-invalid');
        $('.invalid-feedback').remove();
    
        if (!validateGroupSelection()) {
            isValid = false;
            if (!firstInvalidField) {
                firstInvalidField = $('#mygroups-group');
            }
        }

        $('input:visible[required], select:visible[required], textarea:visible[required]').each(function() {
            if (!this.checkValidity()) {
                isValid = false;
                $(this).addClass('is-invalid');
                var errorMessage = $('<div class="invalid-feedback">This field is required.</div>');
                $(this).after(errorMessage);
                
                if (!firstInvalidField) {
                    firstInvalidField = $(this);
                }
            } else {
                $(this).removeClass('is-invalid').addClass('is-valid');
            }
        });

        $('input:radio[required]:visible').each(function() {
            var name = $(this).attr('name');
            if ($('input:radio[name="' + name + '"]:checked').length === 0) {
                isValid = false;
                var errorMessage = $('<div class="invalid-feedback">Please select an option.</div>');
                $(this).closest('.form-radios').addClass('is-invalid invalid-field-highlight').after(errorMessage);
                
                if (!firstInvalidField) {
                    firstInvalidField = $(this);
                }
            }
        });

        if (!isValid && firstInvalidField) {
            firstInvalidField.focus();
            $('html, body').animate({
                scrollTop: firstInvalidField.offset().top - 100
            }, 500);
            
            if ($('#form-error-message').length === 0) {
                $('#combined-request-form').prepend('<div id="form-error-message" class="alert alert-danger">Please correct the errors below and try again.</div>');
            }
        } else {
            $('#form-error-message').remove();
        }

        return isValid;
    }

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

    // Field validation on blur/change
    $('#combined-request-form input, #combined-request-form select, #combined-request-form textarea').on('blur change', function() {
        if (this.checkValidity()) {
            $(this).removeClass('is-invalid').addClass('is-valid');
            $(this).next('.invalid-feedback').remove();
        } else {
            $(this).removeClass('is-valid').addClass('is-invalid');
            if ($(this).next('.invalid-feedback').length === 0) {
                var errorMessage = $('<div class="invalid-feedback">This field is invalid.</div>');
                $(this).after(errorMessage);
            }
        }
    });

    // Initial calls
    console.log("Initial call to toggle functions");
    $('#allocation-fields, #storage-fields, #common-fields').hide();
    loadPreviewTable();
    toggleRequestFields();
    toggleAllocationFields();
    toggleStorageFields();
    toggleTierOptions();
    loadUserProjects();
    fetchAndPopulateGroups();
    updateBillingVisibility();
});