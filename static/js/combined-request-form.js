$(document).ready(function () {
    console.log("Script started");
    alert("Script started");
    console.log("Combined request form JS loaded");

    window.debugToggle = function() {
    console.log("Debug toggle called");
    toggleRequestFields();
    console.log("Toggle completed");
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
        
        $('#existing-projects-allocation').toggle(!isNew);
        $('#new-project-name-container').toggle(isNew);
        $('#capstone-project-container').toggle(isNew);
        
        console.log("Existing projects allocation visible:", $('#existing-projects-allocation').is(":visible"));
        console.log("New project name container visible:", $('#new-project-name-container').is(":visible"));
        console.log("Capstone project container visible:", $('#capstone-project-container').is(":visible"));

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
        $('#existing-projects-storage').toggle(['increase-storage', 'decrease-storage', 'retire-storage'].includes(typeOfRequest));
        logVisibility();
        toggleSpaceField();
    }

    function toggleSpaceField() {
        var selectedType = $('input[name="type-of-request"]:checked').val();
        var isRetire = selectedType === 'retire-storage';
        $('#capacity').prop('disabled', isRetire).val(isRetire ? '0' : '');
    }

    function toggleSensitiveDataMessage() {
        var selectedStorage = $('input[name="storage-choice"]:checked').val();
        console.log("Selected storage:", selectedStorage);
        var isHighSecurity = selectedStorage === 'High-Security Research Standard';
        $('#sensitive-data').toggle(isHighSecurity);
        $('#standard-data').toggle(!isHighSecurity);
        logVisibility();
    }

    function highlightSelectedProject() {
        $('.project-row').css('background-color', '');

        var selectedStorageProject = $('input[name="existing-project-storage"]:checked').closest('.project-row');
        if (selectedStorageProject.length > 0) {
            selectedStorageProject.css('background-color', '#FDDA24');
            console.log("Selected storage project:", selectedStorageProject.find('label').text());
        }

        var selectedAllocationProject = $('input[name="existing-project-allocation"]:checked').closest('.project-row');
        if (selectedAllocationProject.length > 0) {
            selectedAllocationProject.css('background-color', '#FDDA24');
            var capstoneStatus = selectedAllocationProject.find('td:last').text();
            console.log("Selected allocation project:", selectedAllocationProject.find('label').text());
            console.log("Selected project Capstone status:", capstoneStatus);
        }
    }

    function logVisibility() {
        console.log("Allocation fields visible:", $('#allocation-fields').is(":visible"));
        console.log("Storage fields visible:", $('#storage-fields').is(":visible"));
        console.log("Common fields visible:", $('#common-fields').is(":visible"));
        console.log("Storage platform visible:", $('#storage-platform').is(":visible"));
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
            dropdown.append($('<option></option>').attr('value', value.id).text(value.name));
        });
    }

    function fetchAndPopulateGroups() {
        var mockApiResponse = [
            { id: 'it_research_group1', name: 'IT Research Group 1' },
            { id: 'it_research_group2', name: 'IT Research Group 2' },
            { id: 'it_dev_team1', name: 'IT Development Team 1' },
            { id: 'it_security_team', name: 'IT Security Team' },
            { id: 'it_infrastructure_group', name: 'IT Infrastructure Group' }
        ];

        populateGrouperMyGroupsDropdown(mockApiResponse);
    }

    function validateForm() {
        var isValid = true;
        var firstInvalidField = null;
    
        $('.is-invalid').removeClass('is-invalid');
        $('.invalid-feedback').remove();
    
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
    $('input[name="storage-choice"]').change(toggleSensitiveDataMessage);
    $('input[name="existing-project-storage"], input[name="existing-project-allocation"]').change(highlightSelectedProject);

    $('#mygroups-group').change(function() {
        console.log("Selected Grouper/MyGroups account:", $(this).val());
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
    toggleSensitiveDataMessage();
    highlightSelectedProject();
    fetchAndPopulateGroups();
});