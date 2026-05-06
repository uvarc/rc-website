+++
date = "2023-04-24T23:59:16-05:00"
tags = []
categories = ["forms"]
images = [""]
author = "Staff"
description = ""
title = "Storage Request"
draft = false
type = "form"
private = true
+++

{{% jira-msg %}}


{{< form-cookies >}}
<!-- <script type="text/javascript" src="/js/typeahead.js"></script> -->
<form action="https://uvarc-api.pods.uvarc.io/rest/general-support-request/" method="post" id="request-form" accept-charset="UTF-8">

{{< enable-disable-form >}}

<div class="alert" id="response_message" role="alert" style="padding-bottom:0px;">
  <p id="form_post_response"></p>
</div>
<div>
  <input type="hidden" id="category" name="category" value="Storage">
  <input type="hidden" id="request_title" name="request_title" value="Storage Request" />

  {{% getstatus keyword="jira" %}}

  {{% form-userinfo-v2 %}}

  <div class="row">
  <div class="col form-item form-group form-item form-type-radios form-group"> 
    <label class="control-label" for="type-of-request">Type of Request <span class="form-required" title="This field is required.">*</span></label>
    <div id="type-of-request" class="form-radios">
      <div class="form-item form-type-radio radio">
        <input required="required" type="radio" id="type-of-request-1" name="type-of-request" value="new-storage" class="form-radio" /> &nbsp; Create new storage share</label>
      </div>
      <div class="form-item form-type-radio radio">
        <input required="required" type="radio" id="type-of-request-2" name="type-of-request" value="increase-storage" class="form-radio" /> &nbsp; Increase size of existing share</label>
      </div>
      <div class="form-item form-type-radio radio">
        <input required="required" type="radio" id="type-of-request-3" name="type-of-request" value="decrease-storage" class="form-radio" /> &nbsp; Decrease size of existing share</label>
      </div>
      <div class="form-item form-type-radio radio">
        <input required="required" type="radio" id="type-of-request-4" name="type-of-request" value="retire-storage" class="form-radio" /> &nbsp; Retire existing share</label>
      </div>
    </div>
  </div>
    <div class="col form-item form-group">
      <label class="control-label" for="capacity">Space (TB) <span class="form-required" title="This field is required.">*</span></label>
      <input class="form-control required" type="number" min="0" max="500" required="required" id="capacity" name="capacity" value="0" style="width:8rem;" />
      <p class=tiny>The size of storage to be created/retired, or the amount of the increase/decrease to your storage. Specify in 1TB increments. Please specifiy 0 TB to indicate that you would like to update your billing info. </p>
    </div>
  </div>
  <hr size=1 />
  <div class="row">
  <div class="col form-item form-group form-item form-type-radios form-group"> 
    <label class="control-label" for="storage-options">Storage Platform <span class="form-required" title="This field is required.">*</span></label>
    <div id="storage-options" class="form-radios">
      <div class="form-item form-type-radio radio disabled">
        <input required="required" type="radio" id="storage-choice1" name="storage-choice" value="Research Project" class="form-radio" /> &nbsp; Research Project Storage ({{< extract_storage_cost type="project" >}})</label>
      </div>
      <div class="form-item form-type-radio radio">
        <input required="required" type="radio" id="storage-choice3" name="storage-choice" value="Research Standard" class="form-radio" /> &nbsp; Research Standard Storage ({{< extract_storage_cost type="standard" >}})</label>
      </div>
      <div class="form-item form-type-radio radio">
        <input required="required" type="radio" id="storage-choice2" name="storage-choice" value="High-Security Research Standard" class="form-radio" /> &nbsp; High-Security Research Standard Storage ({{< extract_storage_cost type="hsz standard" >}})</label>
      </div>
      <div class="form-item form-type-radio radio">
        <input required="required" type="radio" id="storage-choice2" name="storage-choice" value="High-Security Research Project" class="form-radio" /> &nbsp; High-Security Research Project Storage ({{< extract_storage_cost type="hsz project" >}})</label>
      </div>
    </div>
    <div class="alert alert-warning" style="font-size:92%;margin-top:1.5rem;margin-bottom:1.5rem;" role="alert">
      <p>None of these storage options offer data backups or replication. Research Project storage provides week long snapshots of data. Snapshots are not available on Research Standard storage</p>
	<p>Billing information is required. However, if you are within the 10TB of free Research Standard Storage, no charges will apply.</p>
    </div>

  </div>
  </div>
  <div class="col form-item form-group">
    <div id="standard-data" style="border: solid 1px #ccc; padding:1rem; background-color:#cae6d2; font-size:90%;" class="form-text text-muted"><h6>Internal Use / Public Data</h6>This storage platform is appropriate for public or internal use data.</div>
    <div id="sensitive-data" style="border: solid 1px #ccc; padding:1rem; background-color:#e6caca; font-size:90%;" class="form-text text-muted"><h6>Sensitive / Highly Sensitive Data</h6>This storage platform is appropriate for highly sensitive data such as HIPAA, FERPA, CUI, etc.</div>
  </div>
  <hr size=1 />
  <div class="row">
    <div id="group-selector" class="col form-item form-group form-item form-type-textarea form-group"> 
      <label class="control-label" for="mygroup-ownership">Grouper/MyGroups Ownership <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="form-control form-text required typeahead" type="text" id="mygroup-ownership" name="mygroup-ownership" placeholder="Group Name" size="32" maxlength="32" style="width:14rem;font-family:courier;" />
      <p class=tiny>This group will control access to the storage space. PIs need to be an owner <strong>and</strong> member of the group. Membership can be modified via the <a href="https://groups.identity.virginia.edu/" target="_new" style="font-weight:bold;">Grouper</a> app. Legacy MyGroups groups created before November 28th, 2023, can be accessed through the “Legacy MyGroups” folder in <a href="https://mygroups.virginia.edu/groups/" target="_new" style="font-weight:bold;"> Grouper</a>.</p> 
    </div>
    <div class="col form-item form-type-textarea form-group">
      <label class="control-label" for="shared-space-name">Shared Space Name <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="form-control form-text required" type="text" id="shared-space-name" name="shared-space-name" value="" size="40" maxlength="40" style="width:14rem;font-family:courier;" />
      <p class=tiny>This will be the name of your storage space on the file system. The name may not contain spaces and it can, but does not necesarily need to be the same as the associated Grouper group. <strong>**If you are modifying an existing storage space, please ensure this name matches exactly (case-sensitive) how the storage space is listed on the file system.</strong></p>
    </div>
    {{% group_creation_tip %}}          
  </div>
  <hr size=1 />
  <div class="form-item form-group form-item form-type-textarea form-group"> 
    <label class="control-label" for="project-title">Project Title </label>
    <input class="form-control form-text required" type="text" id="project-title" name="project-title" value="" size="200" maxlength="200" />
  </div>
  {{% billing-fdm %}}
  <div class="form-check form-item form-group" style="margin-top:1rem;">
    <label class="control-label" for="data-agreement">Data Agreement <span class="form-required" title="This field is required.">*</span></label>
    <label class="form-check-label" for="data-agreement">
      The owner of these services assumes all responsibility for complying with state, federal, and international data retention laws. Researchers may be required to keep data securely stored for years after a project has ended and should plan accordingly. University of Virginia researchers are strongly encouraged to use the <a href="https://recordsmanagement.virginia.edu/urma/overview" target="_new" style="font-weight:bold;">University Records Management Application (URMA)</a>, a web-based tool that automatically tracks when data can be safely transferred or destroyed.
    </label>
  </div>
  <div class="form-item form-group">
    <input class="form-check-input required" style="margin-left:4rem;" type="checkbox" value="" id="data-agreement">&nbsp;&nbsp; I understand
  </div>
  <div class="form-actions" id="submit-div" style="margin-top:1rem;">
    <hr size="1" style="" />
    <p style="font-size:80%;">Please submit the form only once. If you receive an error message after submitting this request, please check your email to confirm that the submission completed.</p>
    <button class="button-primary btn btn-primary form-submit" id="submit" type="submit" name="op" value="Submit" disabled>Submit</button>
  </div>
</div>

{{< /enable-disable-form >}}

</form>

<script type="text/javascript" src="/js/user-session-v2.js"></script>
<script type="text/javascript" src="/js/storage-request.js"></script>
<script type="text/javascript" src="/js/response-message.js"></script>
