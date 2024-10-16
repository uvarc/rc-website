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
{{% jira-msg %}}
<form action="https://uvarc-api.pods.uvarc.io/rest/general-support-request/" method="post" id="combined-request-form" class="needs-validation" novalidate accept-charset="UTF-8">
{{< enable-disable-form >}}
<div class="alert" id="response_message" role="alert" style="padding-bottom:0px;">
  <p id="form_post_response"></p>
</div>
<div>
  <input type="hidden" id="category" name="category" value="">
  <input type="hidden" id="allocation_type" name="Allocation Type" value="Combined Allocation and Storage Request">
  <input type="hidden" id="request_title" name="request_title" value="Combined Request: Allocation or Storage" />

  {{% getstatus keyword="jira" %}}

  {{% form-userinfo-v2 %}}

  <!-- Requestor Information -->
  <div class="form-item form-group form-type-textfield form-group">
    <label class="control-label" for="pi-uva-id">PI/Owner UVA ID <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="pi-uva-id" name="pi-uva-id" value="" size="60" maxlength="128" />
  </div>
  <div class="form-item form-group form-item form-type-select form-group"> 
    <label class="control-label" for="mygroups-group">Name of Grouper/MyGroups Account <span class="form-required" title="This field is required.">*</span></label>
    <span style="font-weight:normal;"><br />PI must <a href="https://in.virginia.edu/how-to-request-group" target="_new">create his/her Grouper group</a> for new allocations.</span>
    <select required="required" class="form-control form-select required" id="mygroups-group" name="mygroups-group">
      <option value="">- Select a group -</option>
    </select>
    {{% group_creation_tip %}}
  </div>
  <div class="form-item form-group form-type-textfield form-group">
    <label class="control-label" for="requestor-id">Requestor ID (if different from User ID above)</label>
    <input class="form-control form-text" type="text" id="requestor-id" name="requestor-id" value="" size="60" maxlength="128" />
  </div>
  <div class="container" style="padding:2rem;background-color:#eee;border:solid 1px #ccc;margin-bottom:1rem;">
    <div class="row">
      <!-- Request Type selection -->
      <div class="col-md-6">
        <fieldset class="form-item form-group form-type-radios">
          <legend class="control-label">Request Type <span class="form-required" title="This field is required.">*</span></legend>
          <div id="request-type-options" class="form-radios">
            <div class="form-check">
              <input required="required" type="radio" id="request-type-allocation" name="request-type" value="allocation" class="form-check-input" checked="checked" />
              <label class="form-check-label" for="request-type-allocation">Allocation Request</label>
            </div>
            <div class="form-check">
              <input required="required" type="radio" id="request-type-storage" name="request-type" value="storage" class="form-check-input" />
              <label class="form-check-label" for="request-type-storage">Storage Request</label>
            </div>
          </div>
        </fieldset>
      </div>

      <!-- Common fields for both Allocation and Storage requests -->
      <div class="col-md-6">
        <fieldset class="form-item form-group form-type-radios">
          <legend class="control-label">Free or Paid <span class="form-required" title="This field is required.">*</span></legend>
          <div id="free-or-paid-options" class="form-radios">
            <div class="form-check">
              <input required="required" type="radio" id="free-option" name="free-or-paid" value="free" class="form-check-input" />
              <label class="form-check-label" for="free-option">Free</label>
            </div>
            <div class="form-check">
              <input required="required" type="radio" id="paid-option" name="free-or-paid" value="paid" class="form-check-input" />
              <label class="form-check-label" for="paid-option">Paid</label>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  </div>

  <!-- Allocation Request Fields -->
  <div id="allocation-fields" style="display: none; margin-top:1em; padding:2rem;background-color:#eee;border:solid 1px #ccc">
    <h3>Allocation Request</h3> 
    <hr size="1" />
    <fieldset class="form-item form-group form-type-radios form-group">
      <legend class="control-label">New or Renewal <span class="form-required" title="This field is required.">*</span></legend>
      <div class="row">
        <div id="new-or-renewal-options" class="form-radios col">
          <div class="form-item form-type-radio radio">
            <input required="required" type="radio" id="new-or-renewal-1" name="new-or-renewal" value="new" checked="checked" class="form-radio" />
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
    
    <!-- Project Name for New Allocation (Initially hidden) -->
    <div id="new-project-name-container" style="display: none; margin-top:1em;">
      <div class="form-item form-group form-type-textfield form-group">
        <label class="control-label" for="new-project-name">Project Name <span class="form-required" title="This field is required.">*</span></label>
        <input required="required" class="form-control form-text required" type="text" id="new-project-name" name="new-project-name" value="" size="60" maxlength="128" />
      </div>
    </div>

    <!-- Existing Projects for Renewal (Initially hidden) -->
    <div id="existing-projects-allocation" style="display: none; margin-top:1em;">
      <fieldset>
        <legend class="control-label">Select Existing Project <span class="form-required" title="This field is required.">*</span></legend>
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Select</th>
              <th>Project Name</th>
              <th>Number of SUs</th>
              <th>Data Science Capstone</th>
            </tr>
          </thead>
          <tbody>
            <tr class="project-row" data-project="project1">
              <td>
                <input type="radio" id="project1-allocation" name="existing-project-allocation" value="project1" class="form-radio project-select">
              </td>
              <td><label for="project1-allocation">Project 1</label></td>
              <td>50,000</td>
              <td>Yes</td>
            </tr>
            <tr class="project-row" data-project="project2">
              <td>
                <input type="radio" id="project2-allocation" name="existing-project-allocation" value="project2" class="form-radio project-select">
              </td>
              <td><label for="project2-allocation">Project 2</label></td>
              <td>100,000</td>
              <td>No</td>
            </tr>
            <tr class="project-row" data-project="project3">
              <td>
                <input type="radio" id="project3-allocation" name="existing-project-allocation" value="project3" class="form-radio project-select">
              </td>
              <td><label for="project3-allocation">Project 3</label></td>
              <td>75,000</td>
              <td>Yes</td>
            </tr>
          </tbody>
        </table>
      </fieldset>
    </div>

    <!-- School of Data Science Capstone project field -->
    <div id="capstone-project-container" style="display: none; margin-top:1em;">
      <fieldset class="form-item form-group form-type-radios form-group">
        <legend class="control-label">Is this allocation for a School of Data Science Capstone project? <span class="form-required" title="This field is required.">*</span></legend>
        <div class="row">
          <div id="for-capstone" class="form-radios col">
            <div class="form-item form-type-radio radio">
              <input required="required" type="radio" id="for-capstone-yes" name="for-capstone" value="yes" class="form-radio" />
              <label class="control-label" for="for-capstone-yes">Yes</label>
            </div>
            <div class="form-item form-type-radio radio">
              <input required="required" type="radio" id="for-capstone-no" name="for-capstone" value="no" checked="checked" class="form-radio" />
              <label class="control-label" for="for-capstone-no">No</label>
            </div>
          </div>
        </div>
      </fieldset>
    </div>

    <div class="form-item form-type-textarea form-group"> 
      <label class="control-label" id="new-descr" for="project-description">Description of Research Project <span class="form-required" title="This field is required.">*</span></label>
      <label class="control-label" id="renewal-descr" for="project-description" style="display: none; margin-top:1em;">Briefly describe how you have used Rivanna/Afton in your research. Please include conference presentations, journal articles, other publications, or grant proposals that cite Rivanna. <span class="form-required" title="This field is required.">*</span></label>
      <div class="form-textarea-wrapper resizable"><textarea required="required" class="form-control form-textarea required" id="project-description" name="project-description" cols="60" rows="8"></textarea>
      </div>
    </div>
  </div>

  <!-- Storage Request Fields -->
  <div id="storage-fields" style="display: none; margin-top:1em; padding:2rem;background-color:#eee;border:solid 1px #ccc">
    <h3>Storage Request</h3>
    <hr size="1" />
    <div class="row">
      <div class="col form-item form-group form-item form-type-radios form-group">
        <fieldset>
          <legend class="control-label">New or Change Existing<span class="form-required" title="This field is required.">*</span></legend>
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
      <div class="col form-item form-group">
        <label class="control-label" for="capacity">Space (TB) <span class="form-required" title="This field is required.">*</span></label>
        <input class="form-control required" type="number" min="1" max="200" required="required" id="capacity" name="capacity" value="0" style="width:8rem;">
        <p class="tiny">The size of storage to be created/retired, or the amount of the increase/decrease to your storage. Specify in 1TB increments.</p>
      </div>
    </div>

    <!-- Existing Projects for Storage (Initially hidden) -->
    <div id="existing-projects-storage" style="display: none; margin-top:1em;">
      <fieldset>
        <legend class="control-label">Select Existing Project <span class="form-required" title="This field is required.">*</span></legend>
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Select</th>
              <th>Project Name</th>
              <th>Shared Allocation Space</th>
              <th>Current Storage Size</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input type="radio" id="project1-storage" name="existing-project-storage" value="project1" class="form-radio">
              </td>
              <td><label for="project1-storage">Project 1</label></td>
              <td>researchLab1</td>
              <td>50 TB</td>
            </tr>
            <tr>
              <td>
                <input type="radio" id="project2-storage" name="existing-project-storage" value="project2" class="form-radio">
              </td>
<td><label for="project2-storage">Project 2</label></td>
              <td>dataScience2</td>
              <td>1 TB</td>
            </tr>
            <tr>
              <td>
                <input type="radio" id="project3-storage" name="existing-project-storage" value="project3" class="form-radio">
              </td>
              <td><label for="project3-storage">Project 3</label></td>
              <td>bioInformatics3</td>
              <td>2 TB</td>
            </tr>
          </tbody>
        </table>
      </fieldset>
    </div>
   
    <!-- Storage Platform (Initially hidden) -->
    <div id="storage-platform" style="display: none; margin-top:1em;">
      <fieldset class="col form-item form-group form-item form-type-radios form-group">
        <legend class="control-label">Storage Platform <span class="form-required" title="This field is required.">*</span></legend>
        <div id="storage-options" class="form-radios">
          <div class="form-item form-type-radio radio disabled">
            <input required="required" type="radio" id="storage-choice1" name="storage-choice" value="Research Project" class="form-radio" />
            <label for="storage-choice1">Research Project Storage ({{< extract_storage_cost type="project" >}})</label>
          </div>
          <div class="form-item form-type-radio radio">
            <input required="required" type="radio" id="storage-choice3" name="storage-choice" value="Research Standard" class="form-radio" checked="checked" />
            <label for="storage-choice3">Research Standard Storage ({{< extract_storage_cost type="standard" >}})</label>
          </div>
          <div class="form-item form-type-radio radio">
            <input required="required" type="radio" id="storage-choice4" name="storage-choice" value="High-Security Research Standard" class="form-radio" />
            <label for="storage-choice4">High-Security Research Standard Storage ({{< extract_storage_cost type="high-security-standard" >}})</label>
          </div>
          <div class="form-item form-type-radio radio">
            <input required="required" type="radio" id="storage-choice2" name="storage-choice" value="ivy" class="form-radio" />
            <label for="storage-choice2">Ivy Central Storage ({{< extract_storage_cost type="ivy" >}})</label>
          </div>
        </div>
      </fieldset>
      <div class="col form-item form-group">
        <div id="standard-data" style="border: solid 1px #ccc; padding:1rem; background-color:#cae6d2; font-size:90%;" class="form-text text-muted"><h6>Internal Use / Public Data</h6>This storage platform is appropriate for public or internal use data.</div>
        <div id="sensitive-data" style="border: solid 1px #ccc; padding:1rem; background-color:#e6caca; font-size:90%; display: none;" class="form-text text-muted"><h6>Sensitive / Highly Sensitive Data</h6>This storage platform is appropriate for highly sensitive data such as HIPAA, FERPA, CUI, etc.</div>
      </div>
    </div>

    <!-- Shared Space Name (Initially hidden) -->
    <div id="shared-space-name-container" style="display: none; margin-top:1em;">
      <div class="form-item form-type-textarea form-group">
        <label class="control-label" for="shared-space-name">Shared Space Name <span class="form-required" title="This field is required.">*</span></label>
        <input required="required" class="form-control form-text required" type="text" id="shared-space-name" name="shared-space-name" value="" size="40" maxlength="40" style="width:14rem;font-family:courier;" />
        <p class="tiny">This is the name to be applied to your shared storage space. By default, the space will be named according to the Grouper/MyGroups group associated with the storage request. If you would prefer a different identifier, indicate the name for the space.</p>
      </div>
    </div>

    <!-- Project Title (Initially hidden) -->
    <div id="project-title-container" style="display: none; margin-top:1em;">
      <div class="form-item form-group form-item form-type-textarea form-group"> 
        <label class="control-label" for="project-title">Project Title <span class="form-required" title="This field is required.">*</span></label>
        <input required="required" class="form-control form-text required" type="text" id="project-title" name="project-title" value="" size="200" maxlength="200" />
      </div>
    </div>
  </div>

  <!-- Billing Information Section (Initially hidden) -->
  <div id="billing-information" style="display: none; margin-top:1em; padding:2rem;background-color:#eee;border:solid 1px #ccc;">
    <h3>Payment Information</h3>
    <hr size="1" />
    <div class="form-item form-group form-type-textfield form-group">
      <label class="control-label" for="fdm-id">FDM ID <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="form-control form-text required" type="text" id="fdm-id" name="fdm-id" value="" size="60" maxlength="128" />
    </div>
    {{% billing-fdm %}}
  </div>

  <!-- Data Agreement and Submit Button (outside of both allocation and storage fields) -->
  <div id="common-fields" style="display: none; margin-top:1em; padding:2rem;background-color:#eee;border:solid 1px #ccc">
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
      <hr size="1" style="">
      <p style="font-size:80%;">Please submit the form only once. If you receive an error message after submitting this request, please check your email to confirm that the submission completed.</p>
      <button class="button-primary btn btn-primary form-submit" id="submit" type="submit" name="op" value="Submit" disabled="">Submit</button>
    </div>
  </div>

</div>

{{< /enable-disable-form >}}
</form>

<script type="text/javascript" src="/js/user-session-v2.js"></script>
<script type="text/javascript" src="/js/response-message.js"></script>
<!-- <script type="text/javascript" src="/js/combined-form-scroll-fix.js"></script> -->
<script type="text/javascript" src="/js/combined-request-form.js"></script>
<script type="text/javascript" src="/js/allocation-request.js"></script>