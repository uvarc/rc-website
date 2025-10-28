+++
date = "2023-09-18T23:59:16-05:00"
tags = ["search"]
categories = ["forms"]
images = [""]
author = "Staff"
description = ""
title = "Resource Setup Form"
draft = false
type = "form"
private = true
+++
<style>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    .form-container {
      width: 100%;
      border: solid 1px #ccc;
      font-size: 15px;
      padding: 1.5rem;
      background-color: #efefef;
      margin-bottom: 1rem;
      overflow: hidden;
    }

    label {
      font-weight: bold;
      margin-bottom: 8px;
      margin-top:8px;
    }

    select,input, button {
      width: 100%;
      padding: 10px;
      font-size: 16px;
      line-height: 1.25;
    }

    button {
      background-color: #4CAF50;
      color: white;
      border: none;
      cursor: pointer;
    }


    button:hover {
      background-color: #45a049;
    }

    .message {
      text-align: center;
      margin-top: 10px;
    }

    input[type="radio"],
    input[type="checkbox"] {
    width: auto !important;
    margin-right: 8px;
    }

</style>
<!-- Core scripts needed for form functionality -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script type="text/javascript" src="/js/resource-setup-form.js"></script>

<div class="message" id="resultMessage"></div><br /><br/>
<form id="setupForm">
  {{% form-userinfo-v2 %}} 
  <div class="form-container">
    <label for="resource_type"> Resource Type:</label>
    <select id="resource_type" name="resource_type" required>
      <option value="service-unit" selected>Allocation's (SU)</option>
      <option value="storage">Storage</option>
    </select>
       <!-- Group Name and Claim Link -->
    <div style="display: flex; flex-direction: column; margin-bottom: 1em;">
       <label for="user_groups" style="font-weight: bold;">Group Name:</label>
       <select id="user_groups" name="user_groups" required style="width: 100%;">
          <option value="">-- Select Group --</option>
       </select>
       <!-- Helper text and link -->
       <div style="display: flex; justify-content: flex-end; align-items:   center; margin-top: 0.25em; gap: 50px;">
         <small style="font-size: 0.9em; color: #555; margin-right: 4px;">
           Not seeing your group?click here to claim
         </small>
         <a href="claim-form.md" id="claimLink"style="font-size: 0.9em; color:green; text-decoration: underline; white-space: nowrap;">
         PI group ownership claim request
         </a>
       </div>
     </div>
    <!-- Allocation Tier Options -->
    <div id="allocation-tier" style="margin-top:1em;display:none;">
     <fieldset>
      <label>Tier Options *</label><br/>
      <small>For detailed information about each allocation tier option, please visit our <a href="https://www.rc.virginia.edu/userinfo/hpc/allocations/#allocation-types" target="_blank">
          Allocation Types Documentation
        </a>.
      </small>
      <div id="allocation-tier-options" style="margin-top: 1rem; display: flex; flex-direction: column; gap: 0.1rem;">
        <label style="display: flex; align-items: center; gap: 8px;">
          <input type="radio" name="allocation-choice" value="Standard" required>
          <span>Standard</span>
        </label>
        <label style="display: flex; align-items: center; gap: 8px;">
          <input type="radio" name="allocation-choice" value="Paid" required>
          <span>Paid</span>
        </label>
        <label style="display: flex; align-items: center; gap: 8px;">
          <input type="radio" name="allocation-choice" value="Instructional" required>
          <span>Instructional</span>
         </label>
      </div>
     </fieldset>
    </div>
    <!-- Storage Tier Options -->
    <div id="storage-tier" style="margin-top:1em;display:none;">
       <fieldset>
        <legend>Storage Tier Options *</legend><br/>
         <small>For detailed information about each storage tier option, please visit our <a href="https://www.rc.virginia.edu/userinfo/storage/" target="_blank">Storage Documentation</a>.</small>
        <label><input type="radio" name="storage-choice" value="SSZ Research Project" required>SSZ Research Project</label><br>
        <label><input type="radio" name="storage-choice" value="SSZ Research Standard" required> SSZ Research Standard</label>
        <label><input type="radio" name="storage-choice" value="Highly Sensitive Data" required> High-Security Research Standard Storage</label>
      </fieldset>
    </div>
  </div>
   <!-- Data Agreement and Submit Button Section -->
  <div id="common-fields" style="display: block; margin-top:1em; padding:1.5rem; background-color:#eee; border:solid 1px #ccc;">
      <!-- Data Agreement -->
      <div>
        <label class="h6 mb-2" for="data-agreement">Data Agreement
        <span  title="This field is required.">*</span></label></br>
        <span for="data-agreement">
          The owner of these services assumes all responsibility for complying with state, federal, and international data retention laws. Researchers may be required to keep data securely stored for years after a project has ended and should plan accordingly. University of Virginia researchers are strongly encouraged to use the <a href="https://recordsmanagement.virginia.edu/urma/overview" target="_new" style="font-weight:bold;">University Records Management Application (URMA)</a>, a web-based tool that automatically tracks when data can be safely transferred or destroyed.
        </span>
      </div>
      <div>
        <input class="form-check-input required" style="margin-left:4rem;" type="checkbox" value="" id="data-agreement">&nbsp;&nbsp; I understand
      </div>
      <!-- Submit Section -->
      <div class="form-actions" id="submit-div" style="margin-top:1rem;">
        <p style="font-size:80%;">Please submit the form only once. If you receive an error message after submitting this request, please check your email to confirm that the submission completed.</p>
        <div style="margin-top: 1rem; display: inline-flex; gap: 1rem;  width:100%">
        <button type="submit" class="btn btn-primary">Save</button>
        <button type="button" class="btn btn-secondary"  id="cancelButton">Cancel</button>
       </div>
      </div>
    </div>
</form>
<script type="text/javascript" src="/js/response-message.js"></script>
<script type="text/javascript" src="/js/user-session-v2.js"></script>
<script type="text/javascript" src="/js/support-request.js"></script>
