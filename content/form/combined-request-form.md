+++
date = "2023-09-18T23:59:16-05:00"
tags = ["search"]
categories = ["forms"]
images = [""]
author = "Staff"
description = ""
title = "Combined Request Form"
draft = false
type = "form"
private = true
+++

<!-- Core scripts needed for form functionality -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script type="text/javascript" src="/js/combined-request-form.js"></script>

{{% jira-msg %}}
<form action="https://uvarc-api.pods.uvarc.io/rest/general-support-request/" 
      method="post" 
      id="combined-request-form" 
      class="needs-validation" 
      novalidate 
      accept-charset="UTF-8">

{{< enable-disable-form >}}

<!-- Response Messages -->
<div class="alert" id="response_message" role="alert" style="padding-bottom:0px;">
  <p id="form_post_response"></p>
</div>
<div class="alert" id="api_error_message" role="alert" style="display:none;">
  <p id="api_error_response"></p>
</div>

<!-- Hidden Fields -->
<div>
  <input type="hidden" id="category" name="category" value="">
  <input type="hidden" id="allocation_type" name="Allocation Type" value="Combined Allocation and Storage Request">
  <input type="hidden" id="request_title" name="request_title" value="Combined Request: Service Unit or Storage" />

  {{% getstatus keyword="jira" %}}
  {{% form-userinfo-v2 %}}
  <!-- PI Requestor Information (temporarily disabled)-->
  <div class="form-item form-group form-type-textfield form-group" style="display: none;">
    <label class="control-label" for="pi-uva-id">PI/Owner UVA ID</label>
    <input class="form-control form-text" type="text" id="pi-uva-id" name="pi-uva-id" value="" size="60" maxlength="128" />
  </div>

  <div class="form-item form-group form-type-textfield form-group" style="display: none;">
    <label class="control-label" for="requestor-id">Requestor ID (if different from User ID above)</label>
    <input class="form-control form-text" type="text" id="requestor-id" name="requestor-id" value="" size="60" maxlength="128" />
  </div>

  <!-- Current Resources Preview -->
  <div class="container" style="padding:1.5rem;background-color:#eee;border:solid 1px #ccc;margin-bottom:1rem;">
    <div id="existing-resources-preview">
        <h5 class="mb-3">Your Current Resources</h5>
        <div id="resources-loading" class="text-center mb-3" style="display: none;">
            <div class="spinner-border spinner-border-sm text-primary" role="status">
                <span class="visually-hidden">Loading resources...</span>
            </div>
            <span class="ms-2">Loading your resources...</span>
        </div>
        <table class="table table-bordered table-hover">
            <thead>
                <tr>
                    <th scope="col">Type</th>
                    <th scope="col">Project/Class</th>
                    <th scope="col">Group</th>
                    <th scope="col">Tier</th>
                    <th scope="col">Details</th>
                </tr>
            </thead>
            <tbody id="combined-preview-tbody">
                <!-- Initial loading state row -->
                <tr class="table-placeholder">
                    <td colspan="5" class="text-center text-muted py-4">
                        Loading your resources...
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>

  <!-- Resource Type Selection -->
  <div class="container" style="padding:1rem;background-color:#eee;border:solid 1px #ccc;margin-bottom:1rem;">
    <fieldset class="form-item form-group form-type-radios">
      <legend class="control-label h6 mb-2">Resource Type <span class="form-required" title="This field is required.">*</span></legend>
      <div id="request-type-options" class="form-radios d-flex" style="justify-content: space-evenly;">
        <div class="form-check me-4">
          <input required="required" type="radio" id="request-type-allocation" name="request-type" value="service-unit" class="form-check-input" checked="checked" />
          <label class="form-check-label" for="request-type-allocation">Service Unit (SU)</label>
        </div>
        <div class="form-check">
          <input required="required" type="radio" id="request-type-storage" name="request-type" value="storage" class="form-check-input" />
          <label class="form-check-label" for="request-type-storage">Storage</label>
        </div>
      </div>
    </fieldset>
  </div>

  <!-- Form Fields Container -->
  <div style="margin-bottom:1rem;">
    <!-- Service Unit (SU) Request Fields -->
    <div id="allocation-fields" style="display: none;padding:1.5rem;background-color:#eee;border:solid 1px #ccc;">
      <h5 class="mb-3">Service Unit (SU) Request</h5>
      <hr size="1" />

      <!-- New or Renewal (First section for SU requests) -->
      <fieldset class="form-item form-group form-type-radios form-group">
        <legend class="control-label h6 mb-2">New or Renewal <span class="form-required" title="This field is required.">*</span></legend>
        <div class="row">
          <div id="new-or-renewal-options" class="form-radios col">
            <div class="form-item form-type-radio radio">
              <input required="required" type="radio" id="new-or-renewal-1" name="new-or-renewal" value="new" class="form-radio" />
              <label class="control-label" for="new-or-renewal-1">New</label>
            </div>
            <div class="form-item form-type-radio radio">
              <input required="required" type="radio" id="new-or-renewal-2" name="new-or-renewal" value="renewal" class="form-radio" />
              <label class="control-label" for="new-or-renewal-2">Renewal</label>
            </div>
          </div>
          <div class="help-block col">If this is your first request, select New. Otherwise select Renewal.</div>
        </div>
      </fieldset>

      <!-- Grouper/MyGroups Selection -->
      <div id="mygroups-group-container" class="form-item form-group form-type-select form-group new-request-only" style="margin-top:1em;"> 
        <label class="control-label" for="mygroups-group">Name of Grouper/MyGroups Account <span class="form-required" title="This field is required.">*</span></label>
        <select required="required" class="form-control form-select required" id="mygroups-group" name="mygroups-group">
          <option value="">- Select a group -</option>
        </select>
        <small class="helper-text">Group names can only contain letters, numbers, dashes, and underscores (e.g., research-lab-1, data_science_2)</small>
        <div id="group-validation-message" class="validation-message"></div>
      </div>
      
      <!-- Tier Options (Only shown for New requests) -->
      <div id="allocation-tier" style="margin-top:1em;display:none;" class="new-request-only">
        <fieldset class="col form-item form-group form-item form-type-radios form-group">
          <legend class="control-label h6 mb-2">Tier Options <span class="form-required" title="This field is required.">*</span></legend>
          <small class="helper-text">For detailed information about each allocation tier option, please visit our <a href="https://www.rc.virginia.edu/userinfo/hpc/allocations/#allocation-types" target="_blank">Allocation Types Documentation</a>.</small>
          <div id="allocation-tier-options" class="form-radios mt-2">
            <div class="form-item form-type-radio radio">
              <input required="required" type="radio" id="allocation-choice1" name="allocation-choice" value="Standard" class="form-radio" />
              <label for="allocation-choice1">Standard</label>
            </div>
            <div class="form-item form-type-radio radio">
              <input required="required" type="radio" id="allocation-choice2" name="allocation-choice" value="Paid" class="form-radio" />
              <label for="allocation-choice2">Paid</label>
            </div>
            <div class="form-item form-type-radio radio">
              <input required="required" type="radio" id="allocation-choice3" name="allocation-choice" value="Instructional" class="form-radio" />
              <label for="allocation-choice3">Instructional</label>
            </div>
          </div>
        </fieldset>
      </div>

      <!-- Existing Projects for Service Units (Only visible for Renewal) -->
      <div id="existing-projects-allocation" style="display: none; margin-top:1em;">
        <fieldset>
          <legend class="control-label h6 mb-2">Your Existing Service Units</legend>
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Select</th>
                <th>Project/Class</th>
                <th>Group</th>
                <th>Tier</th>
              </tr>
            </thead>
            <tbody id="allocation-projects-tbody">
              <!-- Will be populated by API -->
            </tbody>
          </table>
        </fieldset>
      </div>
      
      <!-- Project/Class Name (Only for New requests) -->
      <div id="new-project-name-container" style="display: none; margin-top:1em;" class="new-request-only">
        <div class="form-item form-group form-type-textfield form-group">
          <label class="control-label" for="new-project-name">Project/Class Name <span class="form-required" title="This field is required.">*</span></label>
          <input required="required" class="form-control form-text required" type="text" id="new-project-name" name="new-project-name" value="" size="60" maxlength="128" />
        </div>
      </div>

      <!-- Project Description -->
      <div class="form-item form-type-textarea form-group"> 
        <label class="control-label" id="new-descr" for="project-description">Description of Research Project <span class="form-required" title="This field is required.">*</span></label>
        <label class="control-label" id="renewal-descr" for="project-description" style="display: none;">Briefly describe how you have used Rivanna/Afton in your research. Please include conference presentations, journal articles, other publications, or grant proposals that cite Rivanna. <span class="form-required" title="This field is required.">*</span></label>
        <div class="form-textarea-wrapper resizable">
          <textarea required="required" class="form-control form-textarea required" id="project-description" name="project-description" cols="60" rows="8"></textarea>
        </div>
      </div>
    </div>
    <!-- Storage Request Fields -->
    <div id="storage-fields" style="display: none;padding:1.5rem;background-color:#eee;border:solid 1px #ccc;">
      <h5 class="mb-3">Storage Request</h5>
      <hr size="1" />

      <div class="row">
        <!-- Storage Request Type -->
        <div class="col form-item form-group form-item form-type-radios form-group">
          <fieldset>
            <legend class="control-label h6 mb-2">New or Change Existing<span class="form-required" title="This field is required.">*</span></legend>
            <div id="type-of-request" class="form-radios">
              <div class="form-item form-type-radio radio">
                <input required="required" type="radio" id="type-of-request-new" name="type-of-request" value="new-storage" class="form-radio">
                <label for="type-of-request-new">Create new storage share</label>
              </div>
              <div class="form-item form-type-radio radio">
                <input required="required" type="radio" id="type-of-request-increase" name="type-of-request" value="increase-storage" class="form-radio">
                <label for="type-of-request-increase">Increase size of existing share</label>
              </div>
              <div class="form-item form-type-radio radio">
                <input required="required" type="radio" id="type-of-request-decrease" name="type-of-request" value="decrease-storage" class="form-radio">
                <label for="type-of-request-decrease">Decrease size of existing share</label>
              </div>
              <div class="form-item form-type-radio radio">
                <input required="required" type="radio" id="type-of-request-retire" name="type-of-request" value="retire-storage" class="form-radio">
                <label for="type-of-request-retire">Retire existing share</label>
              </div>
            </div>
          </fieldset>
        </div>
        <!-- Storage Capacity -->
        <div class="col form-item form-group">
          <label class="control-label" for="capacity">Space (TB) <span class="form-required" title="This field is required.">*</span></label>
          <input class="form-control required" type="number" min="1" max="200" required="required" id="capacity" name="capacity" value="0" style="width:8rem;">
          <p class="tiny">The size of storage to be created/retired, or the amount of the increase/decrease to your storage. Specify in 1TB increments.</p>
        </div>
      </div>

      <!-- Grouper/MyGroups Selection -->
      <div id="storage-mygroups-container" class="form-item form-group form-type-select form-group new-request-only" style="margin-top:1em;"> 
        <label class="control-label" for="storage-mygroups-group">Name of Grouper/MyGroups Account <span class="form-required" title="This field is required.">*</span></label>
        <select required="required" class="form-control form-select required" id="storage-mygroups-group" name="storage-mygroups-group">
          <option value="">- Select a group -</option>
        </select>
        <small class="helper-text">Group names can only contain letters, numbers, dashes, and underscores (e.g., research-lab-1, data_science_2)</small>
        <div id="storage-group-validation-message" class="validation-message"></div>
      </div>

      <!-- Existing Projects for Storage (Only visible for increase/decrease/retire) -->
      <div id="existing-projects-storage" style="display: none; margin-top:1em;">
        <fieldset>
          <legend class="control-label h6 mb-2">Your Existing Storage</legend>
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Select</th>
                <th>Project/Class</th>
                <th>Group</th>
                <th>Tier</th>
                <th>Shared Space</th>
                <th>Current Size</th>
              </tr>
            </thead>
            <tbody id="storage-projects-tbody">
              <!-- Will be populated by API -->
            </tbody>
          </table>
        </fieldset>
      </div>

      <!-- Storage Tier Options -->
      <div id="storage-platform" style="display: none; margin-top:1em;" class="new-request-only">
        <fieldset class="col form-item form-group form-item form-type-radios form-group">
          <legend class="control-label h6 mb-2">Tier Options <span class="form-required" title="This field is required.">*</span></legend>
          <small class="helper-text">For detailed information about each storage tier option, please visit our <a href="https://www.rc.virginia.edu/userinfo/storage/" target="_blank">Storage Documentation</a>.</small>
          <div id="storage-options" class="form-radios mt-2">
            <div class="form-item form-type-radio radio disabled">
              <input required="required" type="radio" id="storage-choice1" name="storage-choice" value="SSZ Research Project" class="form-radio" />
              <label for="storage-choice1">SSZ Research Project ({{< extract_storage_cost type="project" >}})</label>
            </div>
            <div class="form-item form-type-radio radio">
              <input required="required" type="radio" id="storage-choice3" name="storage-choice" value="SSZ Research Standard" class="form-radio" />
              <label for="storage-choice3">SSZ Research Standard ({{< extract_storage_cost type="standard" >}})</label>
            </div>
            <div class="form-item form-type-radio radio">
              <input required="required" type="radio" id="storage-choice4" name="storage-choice" value="Highly Sensitive Data" class="form-radio" />
              <label for="storage-choice4">Highly Sensitive Data ({{< extract_storage_cost type="high-security-standard" >}})</label>
            </div>
          </div>
        </fieldset>
        <!-- Storage Type Information -->
        <div class="col form-item form-group">
          <div id="standard-data" style="border: solid 1px #ccc; padding:1rem; background-color:#cae6d2; font-size:90%;" class="form-text text-muted">
            <h6>Internal Use / Public Data</h6>This storage platform is appropriate for public or internal use data.
          </div>
          <div id="sensitive-data" style="border: solid 1px #ccc; padding:1rem; background-color:#e6caca; font-size:90%; display: none;" class="form-text text-muted">
            <h6>Sensitive / Highly Sensitive Data</h6>This storage platform is appropriate for highly sensitive data such as HIPAA, FERPA, CUI, etc.
          </div>
        </div>
      </div>

      <!-- Shared Space Name -->
      <div id="shared-space-name-container" style="display: none; margin-top:1em;" class="new-request-only">
        <div class="form-item form-type-textarea form-group">
          <label class="control-label" for="shared-space-name">Shared Space Name <span class="form-required" title="This field is required.">*</span></label>
          <input required="required" class="form-control form-text required" type="text" id="shared-space-name" name="shared-space-name" value="" size="40" maxlength="40" style="width:14rem;font-family:courier;" />
          <p class="tiny">This is the name to be applied to your shared storage space. By default, the space will be named according to the Grouper/MyGroups group associated with the storage request. If you would prefer a different identifier, indicate the name for the space.</p>
        </div>
      </div>

      <!-- Project Title -->
      <div id="project-title-container" style="display: none; margin-top:1em;" class="new-request-only">
        <div class="form-item form-group form-item form-type-textarea form-group"> 
          <label class="control-label" for="project-title">Project Title <span class="form-required" title="This field is required.">*</span></label>
          <input required="required" class="form-control form-text required" type="text" id="project-title" name="project-title" value="" size="200" maxlength="200" />
        </div>
      </div>
    </div>
    <!-- Billing Information Section -->
    <div id="billing-information" style="display: none; margin-top:1em; padding:1.5rem;background-color:#eee;border:solid 1px #ccc;">
      <h5 class="mb-3">Payment Information</h5>
      <hr size="1" />
      <div class="form-item form-group form-type-textfield form-group">
        <label class="control-label" for="fdm-id">FDM ID <span class="form-required" title="This field is required.">*</span></label>
        <input required="required" class="form-control form-text required" type="text" id="fdm-id" name="fdm-id" value="" size="60" maxlength="128" />
      </div>
      {{% billing-fdm %}}
    </div>

    <!-- Data Agreement and Submit Button Section -->
    <div id="common-fields" style="display: none; margin-top:1em; padding:1.5rem;background-color:#eee;border:solid 1px #ccc;">
      <!-- Data Agreement -->
      <div class="form-check form-item form-group" style="margin-top:1rem;">
        <label class="control-label h6 mb-2" for="data-agreement">Data Agreement <span class="form-required" title="This field is required.">*</span></label>
        <label class="form-check-label" for="data-agreement">
          The owner of these services assumes all responsibility for complying with state, federal, and international data retention laws. Researchers may be required to keep data securely stored for years after a project has ended and should plan accordingly. University of Virginia researchers are strongly encouraged to use the <a href="https://recordsmanagement.virginia.edu/urma/overview" target="_new" style="font-weight:bold;">University Records Management Application (URMA)</a>, a web-based tool that automatically tracks when data can be safely transferred or destroyed.
        </label>
      </div>
      <div class="form-item form-group">
        <input class="form-check-input required" style="margin-left:4rem;" type="checkbox" value="" id="data-agreement">&nbsp;&nbsp; I understand
      </div>

      <!-- Submit Section -->
      <div class="form-actions" id="submit-div" style="margin-top:1rem;">
        <hr size="1" style="">
        <div id="api-status" class="alert alert-info" style="display: none;">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          <span class="ms-2">Checking eligibility and loading groups...</span>
        </div>
        <p style="font-size:80%;">Please submit the form only once. If you receive an error message after submitting this request, please check your email to confirm that the submission completed.</p>
        <button class="button-primary btn btn-primary form-submit" id="submit" type="submit" name="op" value="Submit" disabled="">Submit</button>
      </div>
    </div>
  </div>
</div>

<!-- Form close tags -->
{{< /enable-disable-form >}}
</form>

<!-- Session and response scripts loaded last -->
<script type="text/javascript" src="/js/user-session-v2.js"></script>
<script type="text/javascript" src="/js/response-message.js"></script>