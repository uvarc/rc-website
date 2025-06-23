// ===================================
    // Constants and Configuration
    // ===================================
    const hostname = window.location.hostname;

    let serviceHost = '';
    
    if (hostname.includes('staging-onprem.rc.virginia.edu') || hostname.includes('staging.rc.virginia.edu')) {
      serviceHost = 'https://uvarc-unified-service-test.pods.uvarc.io';
    } else if (hostname === 'rc.virginia.edu') {
      serviceHost = 'https://uvarc-unified-service-prod.pods.uvarc.io';
    } else {
      console.warn('Unknown environment, defaulting to staging');
      serviceHost = 'https://uvarc-unified-service-test.pods.uvarc.io';
    }
    
    const API_CONFIG = {
        baseUrl: `${serviceHost}/uvarc/api/resource/rcwebform/user`,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Origin': window.location.origin
        }
    };

    async function fetchAndPopulateGroups(userId) {
        try {
            // Construct the API request URL
            const requestUrl = `${API_CONFIG.baseUrl}/${userId}?user_groups_info=true`;
            console.log("Request URL:", requestUrl);
    
            // Perform the AJAX call using jQuery
            const jsonResponse = await $.ajax({
                url: requestUrl,
                method: "GET",
                headers: {
                    ...API_CONFIG.headers,
                    'Origin': window.location.origin // Dynamically set the origin
                },
                credentials: 'include'
            });
    
            // Save to global variable for further use
            consoleData = jsonResponse; 
            console.log("Fetched groups and resources:", consoleData);
    
            // Parse and populate user groups and resources
            const {userGroups} = parseConsoleData(jsonResponse);
            // Populate dropdowns for user groups
            if (Array.isArray(userGroups) && userGroups.length > 0) {
                console.log("Populating user groups:", userGroups);
                populateUserGroupsDropdown(userGroups);
            } else {
                console.warn("No user groups found.");
                populateUserGroupsDropdown([]);
            }
    
        } catch (error) {
            console.error("Error fetching user groups:", error);
            handleApiError(error); // Display a user-friendly error message
        } finally {
            // Remove the waiting message
            utils?.removeWaitingMessage?.() || waitingMessage.remove();
        }
    }
    function parseConsoleData(data) {
        if (!Array.isArray(data) || data.length === 0) {
            console.error("Invalid consoleData format or empty data:", data);
            return {userGroups: []};
        }
        const userGroups = data[0]?.user_groups || [];
    
        console.log("Parsed user groups:", userGroups);
        return { userGroups };
    }


    function populateUserGroupsDropdown(groups) {
        const $dropdown = $('#user_groups');
        const currentValue = $dropdown.val();
            // Clear existing options but retain the placeholder
            $dropdown.empty();
            $dropdown.append(
                $('<option>', {
                    value: '',
                    text: '- Select a group -',
                    selected: true,
                    disabled: true
                })
            );
    
            console.log(`Populating dropdown: ${$dropdown.attr('id')} with groups:`, groups);
    
            if (groups.length) {
                groups.forEach(group => {
                    const groupName = typeof group === 'string' ? group : group.name;
                    const option = $('<option>', {
                        value: groupName.trim(),
                        text: groupName.trim(),
                    });
    
                    // Restore previous selection if the value exists
                    if (groupName.trim() === currentValue) {
                        option.prop('selected', true);
                    }
    
                    $dropdown.append(option);
                });
    
                $dropdown.prop('disabled', false);
            } else {
                console.warn("No groups found to populate.");
                $dropdown.append(
                    $('<option>', {
                        value: '',
                        text: 'No groups available - contact support',
                        disabled: true,
                    })
                );
                //$dropdown.prop('disabled', true);
            }
    
            // Trigger change event for validation or dependent logic
            $dropdown.trigger('change');
       
    
        console.log('Dropdown populated successfully.');
    }

    $(document).ready(function () {
        const sections = document.querySelectorAll(".blog-sidebar");
        sections.forEach(section => section.remove());
        const params = new URLSearchParams(window.location.search);
        const userId = params.get("user");
        fetchAndPopulateGroups(userId);
    });