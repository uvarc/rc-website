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
<style>
  .table thead th {
    vertical-align: top;
}
 .table {
    table-layout: fixed;
    width: 100%;
    font-size: 0.9rem;

 }
 .table td {
    word-break: break-word;
  }
</style>
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
  <input type="hidden" id="user-id" name="user-id" value="">
  <input type="hidden" id="metadata-timestamp" name="metadata-timestamp" value="">
  <input type="hidden" id="tier-limits" name="tier-limits" value="">
  <input type="hidden" id="group-options" name="group-options" value="">

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
<div id="existing-resources-preview" class="container" style="padding:1.5rem;background-color:#eee;border:solid 1px #ccc;margin-bottom:1rem;">
    <h4 class="mb-3">Your Current Resources</h4>
<!-- Table for Resource Preview -->
    <table class="table table-bordered table-hover resource-preview-table">
        <thead>
            <tr>
                <th scope="col">Type</th>
                <th scope="col">Project</th>
                <th scope="col">Group</th>
                <th scope="col">Resource Name</th>
                <th scope="col">Tier</th>
                <th scope="col">Size/Count</th>
                <th scope="col">Status</th>
                <th scope="col">Update Date</th>
            </tr>
        </thead>
        <tbody id="combined-preview-tbody">
            <!-- Rows will be dynamically injected by JavaScript -->
        </tbody>
    </table>
    
</div>
<div id="empty-message" class="container" style="padding:1.5rem;background-color:#eee;border:solid 1px #ccc;margin-bottom:1rem; text-align: center; display:none;">
  No resources found to display.
</div>

  <!-- Resource Type Selection -->
  <div class="resource_type_container" id = "resource_type_container" style="padding:1rem;background-color:#eee;border:solid 1px #ccc;margin-bottom:1rem;">
    <!-- Grouper/MyGroups Selection -->
   <div id="mygroups-group-container">
      <label for="mygroups-group">Name of Grouper/MyGroups Account *</label>
      <select id="mygroups-group" class="form-control" required>
          <option value="">- Select a group -</option>
      </select>
    </div>
    <div>
     <fieldset class="form-item form-group form-type-select">
       <legend class="control-label h6 mb-2">Res <span class="form-required" title="This field is required.">*</span></legend>
      <select name="request-type" id="request-type"  class="form-control" required>
      <option value="service-unit">Allocation's (SU)</option>
      <option value="storage">Storage</option>
      </select>
     </fieldset>
     </div>
      <!-- Project/Class Name (Only for New requests) -->
    <div id="new-project-name-container" style="margin-top:1em;" class="new-request-only">
      <div class="form-item form-group form-type-textfield form-group">
          <label class="control-label" for="new-project-name">Project Nick Name <span class="form-required" title="This field is required.">*</span></label>
          <input required="required" class="form-control form-text required" type="text" id="new-project-name" name="new-project-name" value="" size="60" maxlength="128" />
      </div>
    </div>
    <!-- Project Description -->
    <div id="project-description" class="form-item form-type-textarea form-group">
       <label class="control-label" id="new-descr" for="project-description">Description of Research Project <span class="form-required" title="This field is required.">*</span></label>
       <label class="control-label" id="renewal-descr" for="project-description" >Briefly describe how you have used Rivanna/Afton in your research. Please include conference presentations, journal articles, other publications, or grant proposals that cite Rivanna. <span class="form-required" title="This field is required.">*</span></label>
       <div class="form-textarea-wrapper resizable">
          <textarea required="required" class="form-control form-textarea required" id="project-description-text" name="project-description" cols="60" rows="8"></textarea>
       </div>
    </div>
</div>

  <!-- Form Fields Container -->
  <div style="margin-bottom:1rem;" id = "service_unit_container">
    <!-- Service Unit (SU) Request Fields -->
    <div id="allocation-fields" style="display: none; padding:1.5rem; background-color:#eee; border:solid 1px #ccc;">
      <h5 class="mb-3"> Allocation's (SU) Request</h5>
      <hr size="1" />

      <!-- New or Renewal (First section for SU requests) -->
      <fieldset class="form-item form-group form-type-radios form-group">
      <legend class="control-label h6 mb-2">New or Renewal <span  class="form-required" title="This field is required.">*</ span></legend>
      <div class="row">
          <div id="new-or-renewal-options" class="form-radios col">
            <div class="form-item form-type-radio radio">
              <input required="required" type="radio" id="new-or-renewal-1" name="new-or-renewal" value="new" class="form-radio" />
              <label class="control-label" for="new-or-renewal-1">New</label>
            </div>
            <div class="form-item form-type-radio radio">
              <input required="required" type="radio" id="new-or-renewal-2" name="new-or-renewal" value="renewal" class="form-radio" />
              <label class="control-label" for="new-or-renewal-2">Update/Renewal</label>
            </div>
            <div class="help-block col tiny">If this is your first request, select New. Otherwise select Renewal.</div>
          </div>
      </div>
      </fieldset>
      
      <!-- Existing Projects for Service Units (Only visible for Renewal) -->
      <div id="existing-projects-allocation" style="display:none; margin-top:1em;">
        <fieldset>
          <legend class="control-label h5 mb-2"><strong>Your Existing Service Units</strong></legend>
          <hr size="1" />
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Select</th>
                <th>Project</th>
                <th>Group</th>
                <th>Resource Name</th>
                <th>Tier</th>
                <th>Size/Count</th>
                <th>Status</th>
                <th>Update Date</th>
              </tr>
            </thead>
            <tbody id="allocation-projects-tbody">
              <!-- Will be populated by API -->
            </tbody>
          </table>
        </fieldset>
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

      <div id="su-capacity" class="col form-item form-group">
            <label class="control-label" for="su-quantity">Additional SU's Requested <span class="form-required" title="This field is required.">*</span></label>
            <input class="form-control required" type="number" min="100" step="100" max="20000" required="required" id="su-quantity" name="su-quantity" value="1000" style="width:8rem;">
           <p class="tiny">The number of SU's requested.(Note: SU's  cannot be requested for Standard and Instructional resources but will be automatically applied/updated once submitted)</p>
      </div>
    </div>
    <!-- Storage Request Fields -->
    <div id="storage-fields" style="display: none; padding:1.5rem; background-color:#eee; border:solid 1px #ccc;">
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
                <input required="required" type="radio" id="type-of-request-update" name="type-of-request" value="update-storage" class="form-radio">
                <label for="type-of-request-update">Update existing share</label>
              </div>

              <div class="form-item form-type-radio radio">
                <input required="required" type="radio" id="type-of-request-retire" name="type-of-request" value="retire-storage" class="form-radio">
                <label for="type-of-request-retire">Retire existing share</label>
              </div>
            </div>
          </fieldset>
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
          <legend class="control-label h5 mb-2"><strong>Your Existing Storage</strong></legend>
          <hr size="1" />
          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Select</th>
                <th>Project</th>
                <th>Group</th>
                <th>Resource Name</th>
                <th>Tier</th>
                <th>Size/Count</th>
                <th>Status</th>
                <th>Update Date</th>
              </tr>
            </thead>
            <tbody id="storage-projects-tbody">
              <!-- Will be populated by API -->
            </tbody>
          </table>
        </fieldset>
      </div>
            <!-- Project Title -->
      <div id="project-title-container" style="display: none; margin-top:1em;" class="new-request-only">
        <div class="form-item form-group form-item form-type-textarea form-group"> 
          <label class="control-label" for="project-title">Project Nick Name <span class="form-required" title="This field is required.">*</span></label>
          <input required="required" class="form-control form-text required" type="text" id="project-title" name="project-title" value="" size="200" maxlength="200" />
        </div>
      </div>
      <!-- Project Description -->
      <div id="project-description-container" class="form-item form-type-textarea form-group" style="display: none;"> 
        <label class="control-label" id="new-descr" for="project-description">Description of Research Project <span class="form-required" title="This field is required.">*</span></label>
        <label class="control-label" id="renewal-descr" for="project-description" style="display: none;">Briefly describe how you have used Rivanna/Afton in your research. Please include conference presentations, journal articles, other publications, or grant proposals that cite Rivanna. <span class="form-required" title="This field is required.">*</span></label>
        <div class="form-textarea-wrapper resizable">
          <textarea required="required" class="form-control form-textarea required" id="project-description-text-storage" name="project-description" cols="60" rows="8"></textarea>
        </div>
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
              <label for="storage-choice4">High-Security Research Standard Storage ({{< extract_storage_cost type="hsz standard" >}})</label>
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
           <!-- Storage Capacity -->
      <div id="storage-capacity" class="col form-item form-group">
          <label class="control-label" for="capacity"> Total Space (TB) <span class="form-required" title="This field is required.">*</span></label>
          <input class="form-control required" type="number" min="0" max="200" required="required" id="capacity" name="capacity" value="0" style="width:8rem;">
          <p class="tiny">The size of storage to be created/retired, or the amount of the increase/decrease to your storage. Specify in 1TB increments.</p>
      </div>
      <div id="free_resource_distribution" style="display:none" class="col form-item form-group">
          <label class="control-label" for="freeSpace"> Free Space (TB) <span class="form-required" title="This field is required.">*</span></label>
          <input class="form-control required" type="number" min="0" max="10" required="required" id="freeSpace" name="freeSpace" value="0" style="width:8rem;">
          <p class="tiny">You have 10TB of free space, how much would you like to apply for this share?</p>
      </div>
    </div>
    <div id="fdm_table" style="display: none; margin-top:1em; padding:1.5rem;background-color:#eee; border:solid 1px #ccc;">

        <div id="existing-fdms" style="margin-top:1em;">
          <fieldset>
             <div style="display: flex; justify-content: space-between; align-items: center;">
             <legend class="control-label h5">Existing FDM's</legend>
             </div>
             <hr size="1" />
             <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Cost Center</th>
                    <th>Business Unit</th>
                    <th>Funding Number</th>
                    <th>Fund</th>
                    <th>Function</th>
                    <th>Program</th>
                    <th>Activity</th>
                    <th>Assignee</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody id="FDMS">
                     <!-- Will be populated by API -->
                </tbody>
              </table>
          </fieldset>
        </div>
      </div>
      <div style = "margin-top:1em; display: none; text-align: right;" id="fdm_button_div">
        <button class="btn btn-success btn-primary" type="button" id="fdm_button">+ New FDM</button>
      </div>
    <!-- Billing Information Section -->
    <div id="billing-information" style="display: none; margin-top:1em; padding:1.5rem; background-color:#eee; border:solid 1px #ccc;">
      <h5 class="mb-3">Payment Information</h5>
      <hr size="1" />
      <div class="form-item form-group form-type-textfield form-group">
        <!-- <label class="control-label" for="fdm-id">FDM ID <span class="form-required" title="This field is required.">*</span></label> -->
        <!--<input required="required" class="form-control form-text required" type="text" id="fdm-id" name="fdm-id" value="" size="60" maxlength="128" /> -->
      </div>
      {{% billing-fdm %}}
      <div style = "margin-top:1em; margin-right:1em; text-align:right">
        <button class="btn btn-success btn-primary" type="button" id="add_fdm">Add to FDM Details</button>
        <button class="btn btn-secondary" type="button" id="cancel-fdm">Cancel</button>
       </div>
    </div>

    <!-- Data Agreement and Submit Button Section -->
    <div id="common-fields" style="display: block; margin-top:1em; padding:1.5rem; background-color:#eee; border:solid 1px #ccc;">
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
        <p style="font-size:80%;">Please submit the form only once. If you receive an error message after submitting this request, please check your email to confirm that the submission completed.</p>
        <button class="button-primary btn btn-primary form-submit" id="submit" type="submit" name="op" value="Submit" disabled="">Submit</button>
        <button class="btn btn-secondary" type="button" id="cancel">Cancel</button>
      </div>
    </div>
  </div>
</div>

<!-- Form close tags -->
{{< /enable-disable-form >}}
</form>
<iframe id="admin-iframe"
        style="display: none; width: 100%; height: 800px; border: 1px solid #ccc;"></iframe>
<!-- Session and response scripts loaded last -->
<script type="text/javascript" src="/js/user-session-v2.js"></script>
<script type="text/javascript" src="/js/response-message.js"></script>