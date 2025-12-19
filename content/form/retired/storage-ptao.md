+++
date = "2022-05-04T23:59:16-05:00"
tags = ["storage"]
categories = ["forms"]
images = [""]
author = "Staff"
description = ""
title = "Storage Request"
draft = true
type = "form"
private = true
+++

{{< form-cookies >}}
<!-- <script type="text/javascript" src="/js/typeahead.js"></script> -->
<form action="https://api.k8s.rc.virginia.edu/rest/general-support-request/" method="post" id="request-form" accept-charset="UTF-8">
<div class="alert" id="response_message" role="alert" style="padding-bottom:0px;">
  <p id="form_post_response"></p>
</div>
<div>
  <input type="hidden" id="category" name="category" value="Storage">
  <input type="hidden" id="request_title" name="request_title" value="Storage Request" />
{{% form-userinfo %}}
  <hr size=1 />
  <div class="form-item form-group form-item form-type-select form-group"> <label class="control-label" for="classification">Classification <span class="form-required" title="This field is required.">*</span></label>
    <select required="required" class="form-control form-select required" title="Faculty, postdoctoral associates, and full-time research staff are eligible to request allocations.  " data-toggle="tooltip" id="classification" name="classification"><option value="" selected="selected">- Select -</option><option value="faculty">Faculty</option><option value="staff">Staff</option><option value="postdoc">Postdoctoral Associate</option><option value="other">Other</option></select>
  </div>
  <div class="form-item form-group form-type-select form-group"> 
    <label class="control-label" for="classification">Affiliation <span class="form-required" title="This field is required.">*</span></label>
    <select required="required" class="form-control form-select required" title="Please select the UVA school / department with which you are primarily affiliated." data-toggle="tooltip" id="classification" name="classification">
      <option value="" selected="selected">- Select -</option>
      <option value="cas">College of Arts & Sciences</option>
      <option value="dsi">School of Data Science</option>
      <option value="seas">School of Engineering and Applied Sciences</option>
      <option value="som">School of Medicine</option>
      <option value="darden">Darden School of Business</option>
      <option value="health-system">UVA Health System</option>
      <option value="other">Other</option>
    </select>
  </div>
  <hr size=1 />
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
      <input class="form-control required" type="number" min="1" max="100" required="required" id="capacity" name="capacity" value="0" style="width:8rem;" />
      <p class=tiny>The size of storage to be created/retired, or the amount of the increase/decrease to your storage. Specify in 1TB increments.</p>
    </div>
  </div>
  <hr size=1 />
  <div class="row">
  <div class="col form-item form-group form-item form-type-radios form-group"> 
    <label class="control-label" for="storage-options">Storage Platform <span class="form-required" title="This field is required.">*</span></label>
    <div id="storage-options" class="form-radios">
      <div class="form-item form-type-radio radio">
        <input onclick="getStorageType()" required="required" type="radio" id="storage-choice1" name="storage-choice" value="Research Project" class="form-radio" /> &nbsp; Research Project Storage ({{% storage-pricing project %}}/TB/year)</label>
      </div>
      <div class="form-item form-type-radio radio">
        <input onclick="getStorageType()" required="required" type="radio" id="storage-choice3" name="storage-choice" value="Research Standard" class="form-radio" /> &nbsp; Research Standard Storage ({{% storage-pricing standard %}}/TB/year)</label>
      </div>
      <div class="form-item form-type-radio radio">
        <input onclick="getStorageType()" required="required" type="radio" id="storage-choice2" name="storage-choice" value="ivy" class="form-radio" /> &nbsp; Ivy Central Storage ({{% storage-pricing ivy %}}/TB/year)</label>
      </div>
    </div>
  </div>
  </div>
  <div class="col form-item form-group">
    <div id="standard-data" style="border: solid 1px #ccc; padding:1rem; background-color:#cae6d2; font-size:90%;" class="form-text text-muted"><h6>Internal Use / Public Data</h6>This 
storage platform is appropriate for public or internal use data.</div>
    <div id="sensitive-data" style="border: solid 1px #ccc; padding:1rem; background-color:#e6caca; font-size:90%;" class="form-text text-muted"><h6>Sensitive / Highly Sensitive Data</h6>This storage platform is appropriate for highly sensitive data such as HIPAA, FERPA, CUI, etc.</div>
  </div>
  <hr size=1 />
  <div class="row">
    <div id="group-selector" class="col form-item form-group form-item form-type-textarea form-group"> 
      <label class="control-label" for="mygroup-ownership">MyGroup Ownership <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="form-control form-text required typeahead" type="text" id="mygroup-ownership" name="mygroup-ownership" placeholder="Group Name" size="32" maxlength="32" style="width:14rem;font-family:courier;" />
      <p class=tiny>MyGroups name under your Eservices user ID. If you don’t have one, we can create one for you. You will have access to the MyGroups management and will be able to add/remove users for your project.</p>
    </div>
    <div class="col form-item form-type-textarea form-group">
      <label class="control-label" for="shared-space-name">Shared Space Name <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="form-control form-text required" type="text" id="shared-space-name" name="shared-space-name" value="" size="40" maxlength="40" style="width:14rem;font-family:courier;" />
      <p class=tiny>This is the name to be applied to your shared storage space. By default, the space will be named according to the MyGroups associated with the storage request. If you would prefer a different identifier, indicate the name for the space.</p>
    </div>
  </div>
  <hr size=1 />
  <div class="form-item form-group form-item form-type-textarea form-group"> 
    <label class="control-label" for="project-title">Project Title </label>
    <input class="form-control form-text required" type="text" id="project-title" name="project-title" value="" size="200" maxlength="200" />
  </div>
  <div class="form-item form-group form-item form-type-textarea form-group"> 
    <label class="control-label" for="project-summary">Project Summary </label>
    <div class="form-textarea-wrapper resizable"><textarea class="form-control form-textarea" id="project-summary" name="project-summary" cols="60" rows="5"></textarea>
    </div>
  </div>
  <div style="border:solid 1px #ccc;padding:2rem;margin-top:2rem;margin-bottom:2rem;background-color:#eee;">
    <h5>Grant Summary</h5>
    <div class="form-item form-type-textarea form-group"> 
      <label class="control-label" for="grant-agency">Grant Agency </label>
      <input class="form-control form-text required" type="text" id="grant-agency" name="grant-agency" value="" size="200" maxlength="200" />
    </div>
    <div class="form-item form-type-textarea form-group">
      <label class="control-label" for="grant-number">Grant Number </label>
      <input class="form-control form-text required" type="text" id="grant-number" name="grant-number" value="" size="200" maxlength="200" />
    </div>
  </div>
  <hr size=1 />
{{% billing %}}
  <hr size=1 />
  <div class="form-check form-item form-group">
    <label class="control-label" for="data-agreement">Data Agreement <span class="form-required" title="This field is required.">*</span></label>
    <label class="form-check-label" for="data-agreement">
      The owner of these services assumes all responsibility for complying with state, federal, and international data retention laws. Researchers may be required to keep data securely stored for years after a project has ended and should plan accordingly. University of Virginia researchers are strongly encouraged to use the <a href="https://recordsmanagement.virginia.edu/urma/overview" target="_new" style="font-weight:bold;">University Records Management Application (URMA)</a>, a web-based tool that automatically tracks when data can be safely transferred or destroyed.
    </label>
  </div>
  <div class="form-item form-group">
    <input class="form-check-input required" style="margin-left:4rem;" type="checkbox" value="" id="data-agreement">&nbsp;&nbsp; I understand
  </div>
  <!--
  <div class=""> <label class="control-label">Are you a human? <span class="form-required" title="This field is required.">*</span></label>
    <div class="row"">
      <div class="form-item form-group col" id="captcha" style="pointer-events:none;margin:1.4rem;width:12rem;">
      </div>
      <div class="form-item form-group col">
        <input type="text" placeholder="Captcha" id="cpatchaTextBox" style="margin-top:1rem;padding:6px;font-family:monospace; width:8rem;" />
        <button class="btn btn-success" id="captcha-submit" type="button" onclick="validateCaptcha()"><i class="fas fa-check fa-1x"></i></button>
        <button class="btn btn-default" id="captcha-refresh" type="button" onclick="createCaptcha()"><i class="fas fa-sync fa-1x"></i></button>
      </div>
    </div>
  </div>
  <script type="text/javascript" src="/js/captcha.js"></script>
  -->
  <div class="form-actions" id="submit-div" style="margin-top:1rem;">
    <hr size="1" style="" />
    <p style="font-size:80%;">Please submit the form only once. If you receive an error message after submitting this request, please check your email to confirm that the submission completed.</p>
    <button class="button-primary btn btn-primary form-submit" id="submit" type="submit" name="op" value="Submit" disabled>Submit</button>
  </div>
</div>
</form>

<script type="text/javascript" src="/js/storage-request.js"></script>
<script type="text/javascript" src="/js/user-session.js"></script>
<script type="text/javascript" src="/js/response-message.js"></script>
