// ===================================
    // Constants and Configuration
    // ===================================

    function showForm(tabIndex) {
        const params = getUrlParams();
        // Hide all forms
        const forms = document.querySelectorAll('.tab-content');
        forms.forEach((form, index) => {
            form.style.display = index === tabIndex ? 'block' : 'none';
        });
        $('#message').html('');
        $('#response').html('');
        $('#updateResponse').html('');
        // Remove active class from all tab buttons
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => button.classList.remove('active'));
        
        // Add active class to the clicked tab button
        tabButtons[tabIndex].classList.add('active');
        const activeForm = forms[tabIndex].querySelector('form');
        if (activeForm) {
            activeForm.reset();
        }
    if (tabIndex === 1) {
        if (params.group_name) {
            document.getElementById('group_name').value = params.group_name;
        }
        if (params.owner_uid) {
            document.getElementById('owner_uid').value = params.owner_uid;
        }
    }
    if (tabIndex === 2) {
        if (params.group_name) {
            document.getElementById('group_name').value = params.group_name;
        }
        if (params.ticket_id) {
            document.getElementById('ticket_id').value = params.ticket_id;
        }
        if (params.resource_type) {
            document.getElementById('resource_type').value = params.resource_type;
        }
        if (params.resource_name) {
            document.getElementById('resource_name').value = params.resource_name;
        }
        if (params.update_status) {
            document.getElementById('update_status').value = params.update_status;
        }
        if (params.update_comment) {
            document.getElementById('update_comment').value = params.update_comment;
        }
    }

        if (tabIndex === 2) {
            toggleRetireOption();
        }
    }

    $('#search_form').submit(function(event) {
        event.preventDefault(); 
        const groupName = $('#group_name').val(); 
        $.ajax({
            url: '/uvarc/api/resource/rcadminform/group/' + groupName, 
            type: "GET",
            dataType: "json",
            crossDomain: true,
            headers: {
                "accept": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            success: function(response) {
                const data = response[0];
                if ('is_owner_set' in data) {
                    if(data.is_owner_set)
                      $('#response').html('<div style="color: green;font-style: italic; font-size: 15px;">Owner UID: ' + data.owner_uid + '</div>');
                    else
                      $('#response').html('<div style="color: green;font-style: italic; font-size: 15px;"> No Owner is set for this group</div>');
                } else {
                    $('#response').html('<div style="color: red;font-style: italic; font-size: 15px;">'+ data.message + '</div>');
                }
            },
            error: function(xhr, status, error) {
                $('#response').html('<div style="color: red;font-style: italic; font-size: 15px;">An error occurred while searching.</div>');
            }
        });
    });

    $('#update_uid_form').on('submit', function(event) {
        event.preventDefault(); 
        var groupName = $('#group_name_for_update').val();
        var owner_uid = $('#owner_uid').val();
        var data = {
            owner_uid: owner_uid
        };
        $.ajax({
            url: '/uvarc/api/resource/rcadminform/group/' + groupName,  
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(response) {
                const data = response[0];
                if('status' in data) {
                  if(data.status == 'success')
                    $('#updateResponse').html('<p style="color: green;font-style: italic; font-size: 15px;">' + data.message + '</p>');
                  else
                    $('#updateResponse').html('<p style="color: red;font-style: italic; font-size: 15px;">' + data.message + '</p>');
                }
            },
            error: function(xhr, status, error) {
                var errorMessage = xhr.responseJSON ? xhr.responseJSON.message : 'An error occurred';
                $('#updateResponse').html('<div style="color: red;font-style: italic; font-size: 15px;">' + errorMessage + '</div>');
        }
        });
    });
  
    $('#update_status_form').submit(function(event) {
        event.preventDefault();
        const formData = $(this).serialize();
        $.ajax({
            url: '/uvarc/api/resource/rcadminform/group/update',
            type: 'PUT',
            data: formData,
            success: function(response) {
                const data = response[0];
                if('status' in data) {
                  if(data.status == 'success')
                    $('#message').html('<p style="color: green;font-style: italic; font-size: 15px;">' + data.message + '</p>');
                  else
                    $('#message').html('<p style="color: red;font-style: italic; font-size: 15px;">' + data.message + '</p>');
                }
            },
            error: function(xhr, status, error) {
                $('#message').html('<div style="color: red; font-style: italic; font-size: 15px;">An error occurred.</div>');
            }
        });
    });

    const resourceType = document.getElementById("resource_type");
    const retireOption = document.getElementById("retire_option");

    function toggleRetireOption() {
        if (resourceType.value === "hpc_service_units") {
            retireOption.style.display = "none";
            if (retireOption.selected) {
                document.getElementById("update_status").selectedIndex = 0; // Reset to first option
            }
        } else {
            retireOption.style.display = "block";
        }
    }

    resourceType.addEventListener("change", toggleRetireOption);

    
    $(document).ready(function () {
        const sections = document.querySelectorAll(".blog-sidebar");
        sections.forEach(section => section.remove());
        document.querySelector('#departmet_clasification_row').style.display = 'none';
        document.querySelector('#discipline_row').style.display = 'none';
        document.querySelector('#discipline').removeAttribute('required');
        document.querySelector('#department')?.removeAttribute('required');
        document.querySelector('#classification')?.removeAttribute('required');
    });
