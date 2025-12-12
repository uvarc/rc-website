+++
date = "2019-07-22T23:59:16-05:00"
tags = ["omero"]
categories = ["forms"]
images = [""]
author = "Staff"
description = ""
title = "Omero Image Database Service"
draft = true
type = "form"
private = true
+++

<p class="lead">From the microscope to publication, OMERO handles all your images in a secure central repository. You can view, organize, analyze and share your data from anywhere you have internet access. Work with your images from a desktop app (Windows, Mac or Linux), from the web or from 3rd party software. Over 140 image file formats supported, including all major microscope formats.</p>
<p class="lead">Use the form below to request access for your group or lab to manage and analyze data in our OMERO database service.</p>
<script type="text/javascript" src="/js/typeahead.js"></script>
<form action="https://api.k8s.rc.virginia.edu/rest/general-support-request/" method="post" id="request-form" accept-charset="UTF-8">
<div class="alert" id="response_message" role="alert" style="padding-bottom:0px;">
  <p id="form_post_response"></p>
</div>
<div>
  <input type="hidden" id="category" name="category" value="Omero">
  <input type="hidden" id="request_title" name="request_title" value="Omero Request" />
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
    <div class="col form-item form-type-radios form-group"> 
      <label class="control-label" for="data-sensitivity">Data Sensitivity</label>
      <div id="data-sensitivity" class="form-radios">
        <div class="form-item form-type-radio radio">
          <input required="required" type="radio" id="data-sensitivity-1" name="data-sensitivity" value="moderately-sensitive" class="form-radio" checked />&nbsp; Moderately sensitive / public
        </div>
      </div>
    </div>
  </div>
  <hr size=1 />
  <div class="row">
    <div class="col form-item form-group">
      <label class="control-label" for="capacity">Space (TB) <span class="form-required" title="This field is required.">*</span></label>
      <input class="form-control required" type="number" min="1" max="100" required="required" id="capacity" name="capacity" value="0" style="width:8rem;" />
      <p class=tiny>The size of storage to be created/retired, or the amount of the increase/decrease to your storage. Specify in 1TB increments.</p>
    </div>
    <div id="group-selector" class="col form-item form-group form-item form-type-textarea form-group"> 
      <label class="control-label" for="mygroup-ownership">MyGroup Ownership <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="form-control form-text required typeahead" type="text" id="mygroup-ownership" name="mygroup-ownership" placeholder="Group Name" size="32" maxlength="32" style="width:14rem;font-family:courier;" />
      <p class=tiny>MyGroups name under your Eservices user ID. If you don’t have one, we can create one for you. You will have access to the MyGroups management and will be able to add/remove users for your project.</p>
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
  {{% billing-fdm %}}
  <div class="form-actions" id="submit-div" style="margin-top:1rem;">
    <p style="font-size:80%;">Please submit the form only once. If you receive an error message after submitting this request, please check your email to confirm that the submission completed.</p>
    <button class="button-primary btn btn-primary form-submit" id="submit" type="submit" name="op" value="Submit">Submit</button>
  </div>
</div>
</form>

<script type="text/javascript" src="/js/user-session.js"></script>
<script type="text/javascript" src="/js/response-message.js"></script>
