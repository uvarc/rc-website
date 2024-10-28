$(document).ready(function () {
    console.log("Script started");
    console.log("Combined request form JS loaded");

    // Add CSS for styling
    $('<style>')
        .text(`
            #mygroups-group option.text-muted { 
                color: #6c757d !important; 
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
        `)
        .appendTo('head');

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
                    serviceUnits: '100,000'
                },
                {
                    id: 'uvarc-alloc-2',
                    name: 'Climate Model Analysis',
                    serviceUnits: '75,000'
                },
                {
                    id: 'uvarc-alloc-3',
                    name: 'Neural Network Training',
                    serviceUnits: '150,000'
                }
            ],
            storageProjects: [
                {
                    id: 'uvarc-store-1',
                    name: 'Genomics Research Project',
                    sharedSpace: 'genomeResearchLab1',
                    currentSize: '50'
                },
                {
                    id: 'uvarc-store-2',
                    name: 'Climate Model Analysis',
                    sharedSpace: 'climateModelData2',
                    currentSize: '100'
                },
                {
                    id: 'uvarc-store-3',
                    name: 'Neural Network Training',
                    sharedSpace: 'neuralNetworks3',
                    currentSize: '75'
                }
            ]
        };
    }

    async function loadUserProjects() {
        try {
            const projects = await fetchUserProjects();
            
            // Populate Allocation Projects
            const allocationTableBody = $('#allocation-projects-tbody');
            allocationTableBody.empty();
            
            if (projects.allocationProjects.length === 0) {
                allocationTableBody.append(`
                    <tr>
                        <td colspan="3" class="text-center">No existing allocation projects found</td>
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
                        <td>${project.serviceUnits}</td>
                    `);
                    allocationTableBody.append(row);
                });
            }

            // Populate Storage Projects
            const storageTableBody = $('#storage-projects-tbody');
            storageTableBody.empty();
            
            if (projects.storageProjects.length === 0) {
                storageTableBody.append(`
                    <tr>
                        <td colspan="4" class="text-center">No existing storage projects found</td>
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
                        <td>${project.sharedSpace}</td>
                        <td>${project.currentSize} TB</td>
                    `);
                    storageTableBody.append(row);
                });
            }

            // Make entire row clickable
            $('.project-row').click(function(e) {
                if (!$(e.target).is('input[type="radio"]')) {
                    $(this).find('input[type="radio"]').prop('checked', true).trigger('change');
                }
            });

            // Add hover effect
            $('.project-row').hover(
                function() { $(this).css('background-color', '#f5f5f5'); },
                function() { 
                    if (!$(this).find('input[type="radio"]').is(':checked')) {
                        $(this).css('background-color', ''); 
                    }
                }
            );

        } catch (error) {
            console.error('Error loading user projects:', error);
            $('#allocation-projects-tbody, #storage-projects-tbody').empty().append(`
                <tr>
                    <td colspan="4" class="text-center text-danger">
                        Error loading projects. Please try again later.
                    </td>
                </tr>
            `);
        }
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
        toggleFreeOrPaid();
        toggleAllocationFields();
        toggleStorageFields();
    }

    function toggleFreeOrPaid() {
        var freeOrPaid = $('input[name="free-or-paid"]:checked').val();
        console.log("Selected free or paid:", freeOrPaid);
        $('#billing-information').toggle(freeOrPaid === 'paid');
        $('#billing-information input, #billing-information select').prop('required', freeOrPaid === 'paid');
        console.log("Billing information visible:", $('#billing-information').is(":visible"));
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
        
        $.each(groups, function(key, value) {
            var option = $('<option></option>')
                .attr('value', value.id)
                .text(value.name);
            
            if (!isCamelCase(value.name)) {
                option.addClass('text-muted')
                     .css('background-color', '#f8f9fa')
                     .attr('title', 'This group name is not in camelCase format')
                     .data('camelcase', false);
            } else {
                option.data('camelcase', true);
            }
            
            dropdown.append(option);
        });

        if ($('#camelcase-validation-message').length === 0) {
            dropdown.after('<div id="camelcase-validation-message" class="validation-message">Please select a group with a valid camelCase name</div>');
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
    $('input[name="free-or-paid"]').change(toggleFreeOrPaid);
    $('input[name="new-or-renewal"]').change(toggleAllocationFields);
    $('input[name="type-of-request"]').change(toggleStorageFields);
    $('input[name="storage-choice"]').change(toggleTierOptions);  // Handles SSZ and High Security tier selections
    $('input[name="allocation-choice"]').change(function() {
        console.log("Selected allocation tier:", $(this).val());
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
            // Here you would typically send the form data to the server
        } else {
            console.log('Form validation failed');
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
    toggleFreeOrPaid();
    toggleAllocationFields();
    toggleStorageFields();
    toggleTierOptions();
    loadUserProjects();
    fetchAndPopulateGroups();
});