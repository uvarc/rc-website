+++
date = "2024-01-4T23:59:16-05:00"
tags = ["search"]
categories = ["forms"]
images = [""]
author = "Staff"
description = ""
title = "Dedicated Computing Request"
draft = false
type = "form"
private = true
+++

{{% jira-msg %}}


<form action="https://uvarc-api.pods.uvarc.io/rest/general-support-request/" method="post" id="request-form" accept-charset="UTF-8">

{{< enable-disable-form >}}

<div class="alert" id="response_message" role="alert" style="padding-bottom:0px;">
  <p id="form_post_response"></p>
</div>
<div>

  <input type="hidden" id="category" name="category" value="Dedicated Resources">
  <input type="hidden" id="request_title" name="request_title" value="Dedicated Computing Request" />

  {{% getstatus keyword="jira" %}}

  {{% form-userinfo-v2 %}}

  <div class="form-item form-group form-type-textfield"> <label class="control-label" for="mygroups-group">Name of Grouper/MyGroup Account <span class="form-required" title="This field is required.">*</span><span style="font-weight:normal;"><br />Lowercase only, no spaces, PI must <a href="https://in.virginia.edu/how-to-request-group" target="_new">create his/her Grouper group</a> for new allocations.</span></label>
    {{% group_creation_tip %}}
    <input required="required" class="form-control form-text required" type="text" id="mygroups-group" name="mygroups-group" value="" size="60" maxlength="128" />
  </div>

<div class="form-item form-group form-type-checkbox">
  <label class="control-label" for="dedicated-computing">
    Type and quantity of hardware requested <a href="/userinfo/hpc/access/#dedicated-computing">(Check out the specifications) </a>
  </label>
  {{< dedicated-options-form >}}
</div>

<div class="form-item form-group form-type-checkbox">
  <label class="control-label" for="lease-dates">
    Proposed Start Date (Subject to Resource Availability)
  </label>

  <div id="lease-dates" style="margin-top: 10px; border: 1px solid #ccc; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
    <div class="form-row" style="display: flex; justify-content: space-between;">
      <div class="col-md-5" style="margin-bottom: 10px;">
        <label for="lease-start-date" class="form-check-label">Start Date</label>
        <input type="date" class="form-control" id="lease-start-date" name="lease-start-date" required style="width: 100%;">
      </div>
      <div class="col-md-5" style="margin-bottom: 10px;">
        <label for="lease-end-date" class="form-check-label">End Date</label>
        <input type="date" class="form-control" id="lease-end-date" name="lease-end-date" required style="width: 100%;">
      </div>
    </div>
  </div>
</div>

  <hr size=1 />
  {{% billing-fdm %}}
  <div class="form-actions" id="submit-div" style="margin-top:1rem;">
    <p style="font-size:80%;">Please submit the form only once. If you receive an error message after submitting this request, please check your email to confirm that the submission completed.</p>
    <button class="button-primary btn btn-primary form-submit" id="submit" type="submit" name="op" value="Submit">Submit</button>
  </div>
</div>

{{< /enable-disable-form >}}

</form>


<!-- <script type="text/javascript" src="/js/user-session-v2.js"></script> -->
<script type="text/javascript" src="/js/response-message.js"></script>
