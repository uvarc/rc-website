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
            isPaid: (currentSize) => currentSize > 10, // Function to determine if paid based on size
            freeLimit: 10 // TB
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

    window.debugToggle = function() {
        console.log("Debug toggle called");
        toggleRequestFields();
        console.log("Toggle completed");
    }

    // Sample data function instead of API call
    async function fetchUserProjects() {
        // Simulate API delay for realistic testing
        await new Promise(resolve => setTimeout(resolve, 300));
        
        return {
            allocationProjects: [
                {
                    id: 'uvarc-alloc-1',
                    name: 'Genomics Research Project',
                    group: 'genomeResearchLab1',
                    tier: 'Standard',
                    serviceUnits: '100,000'
                },
                {
                    id: 'uvarc-alloc-2',
                    name: 'Climate Model Analysis',
                    group: 'climateModelData2',
                    tier: 'Paid',
                    serviceUnits: '75,000'
                },
                {
                    id: 'uvarc-alloc-3',
                    name: 'Neural Network Training',
                    group: 'neuralNetworks3',
                    tier: 'Instructional',
                    serviceUnits: '150,000'
                }
            ],
            storageProjects: [
                {
                    id: 'uvarc-store-1',
                    name: 'Genomics Research Project',
                    group: 'genomeResearchLab1',
                    tier: 'SSZ Research Project',
                    sharedSpace: 'genomeResearchLab1',
                    currentSize: '50'
                },
                {
                    id: 'uvarc-store-2',
                    name: 'Climate Model Analysis',
                    group: 'climateModelData2',
                    tier: 'SSZ Research Standard',
                    sharedSpace: 'climateModelData2',
                    currentSize: '8'
                },
                {
                    id: 'uvarc-store-3',
                    name: 'Neural Network Training',
                    group: 'neuralNetworks3',
                    tier: 'High Security Research Standard',
                    sharedSpace: 'neuralNetworks3',
                    currentSize: '75'
                }
            ],
            userStorageUsage: {
                'SSZ Research Standard': 8 // Current total TB used for this tier
            }
        };
    }
    // CamelCase validation function
    function isCamelCase(str) {
        return /^[a-z]+[A-Z][A-Za-z0-9]*$/.test(str);
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
        toggleAllocationFields();
        toggleStorageFields();
        updateBillingVisibility();
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
            $('#billing-information').toggle(shouldShowBilling);
            $('#billing-information input, #billing-information select').prop('required', shouldShowBilling);

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

    function toggleAllocationFields() {
        var newOrRenewal = $('input[name="new-or-renewal"]:checked').val();
        console.log("Selected new or renewal:", newOrRenewal);
        var isNew = newOrRenewal === 'new';
        
        $('#new-project-name-container').toggle(isNew);
        
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
        $('#storage-platform, #shared-space-name-container, #project-title-container').toggle(isNewStorage);
        logVisibility();
        toggleSpaceField();
    }

    function toggleSpaceField() {
        var selectedType = $('input[name="type-of-request"]:checked').val();
        var isRetire = selectedType === 'retire-storage';
        $('#capacity').prop('disabled', isRetire).val(isRetire ? '0' : '');
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

    function fetchAndPopulateGroups() {
        var mockApiResponse = [
            { id: 'research_group1', name: 'researchLab1' },
            { id: 'research_group2', name: 'dataScience2' },
            { id: 'dev_team1', name: 'dev-team-1' },
            { id: 'security_team', name: 'SecurityTeam' },
            { id: 'infrastructure', name: 'infrastructure' }
        ];

        populateGrouperMyGroupsDropdown(mockApiResponse);
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
    $('input[name="request-type"]').change(toggleRequestFields);
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
    toggleRequestFields();
    toggleAllocationFields();
    toggleStorageFields();
    toggleTierOptions();
    loadUserProjects();
    fetchAndPopulateGroups();
    updateBillingVisibility();
});
    