+++
date = "2016-12-31T23:59:16-05:00"
images = [""]
about = true
author = "Staff"
description = ""
title = "Support Request Submitted"
draft = false
type = "about"

+++

<div class="alert lead" id="confirmation" hidden="true" role="alert">
</div>

<p class="lead">
  Thank you for contacting UVA's Research Computing group (RC). We will make every effort to respond to your request
  within 1 business day (9am-5pm EST, M-F, excluding holidays). System status updates are available on <a href="/">www.rc.virginia.edu</a>.
</p>

<script type="text/javascript">
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const status = urlParams.get('status');
const message = urlParams.get('message');
const email = "You should receive a confirmation email from <b>VA Research Help &lt;sup@uvarc.atlassian.net&gt;</b> in the next few minutes."
let confirm = document.getElementById("confirmation");

if (status.includes("200")) {
  confirm.hidden = false;
  confirm.innerHTML = "<h4 class='alert-heading'>Success</h4><hr>" + message + ". " + email;
  confirm.classList.add("alert-success");
} else {
  confirm.hidden = false;
  confirm.innerHTML = "<h4 class='alert-heading'>Error</h4><hr>" + message;
  confirm.classList.add("alert-danger");
}

</script>