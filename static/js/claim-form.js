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
            const requestUrl = `${API_CONFIG.baseUrl}/${userId}`;
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
            const { userGroups, userResources } = parseConsoleData(jsonResponse);
    
            // Populate dropdowns for user groups
            if (Array.isArray(userGroups) && userGroups.length > 0) {
                console.log("Populating user groups:", userGroups);
                populateGrouperMyGroupsDropdown(userGroups);
            } else {
                console.warn("No user groups found.");
                populateGrouperMyGroupsDropdown([]);
            }
    
            // Process user resources if available
            if (!Array.isArray(userResources) || userResources.length === 0) {
                console.warn("No user resources found.");
                document.getElementById("existing-resources-preview").style.display = "none";
    
                // Show the empty state message
                document.getElementById("empty-message").style.display = "block";
                return;
            } else {
                console.log("Processing user resources...");
                processUserResources(jsonResponse);
            }
        } catch (error) {
            console.error("Error fetching user groups:", error);
            handleApiError(error); // Display a user-friendly error message
        } finally {
            // Remove the waiting message
            utils?.removeWaitingMessage?.() || waitingMessage.remove();
        }
    }

    $(document).ready(function () {
        const sections = document.querySelectorAll(".blog-sidebar");
        sections.forEach(section => section.remove());
        const params = new URLSearchParams(window.location.search);
        const userId = params.get("user");
        fetchAndPopulateGroups(userId);
    });