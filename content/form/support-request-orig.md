+++
date = "2022-08-16T23:59:16-05:00"
tags = ["search"]
categories = ["forms"]
images = [""]
author = "Staff"
description = ""
title = "Support Request"
draft = true
type = "form"
private = true
+++

<form action="https://uvarc-api.pods.uvarc.io/rest/general-support-request/" method="post" id="request-form" accept-charset="UTF-8">
<div class="alert" id="response_message" role="alert" style="padding-bottom:0px;">
  <p id="form_post_response"></p>
</div>
<div>
{{% form-userinfo %}}
  <div class="form-item form-type-textfield form-group">
    <label class="control-label" for="department">Department/Organization <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="department" name="department" value="" size="60" maxlength="100"/>
  </div>
  <div class="form-item form-type-select form-group"> <label class="control-label" for="discipline">Academic Discipline <span class="form-required" title="This field is required.">*</span></label>
    <select required="required" class="form-control form-select required" title="Please identify the academic discipline related to this allocation" data-toggle="tooltip" id="discipline" name="discipline">
      <option value="" selected="selected">- Select -</option>
      <option value="astronomy">Astronomy</option>
      <option value="biochemistry">Biochemistry</option>
      <option value="bioinformatics">Bioinformatics</option>
      <option value="biology">Biology</option>
      <option value="chemistry">Chemistry</option>
      <option value="commerce">Commerce</option>
      <option value="computer-science">Computer Science</option>
      <option value="data-science">Data Science</option>
      <option value="economics">Economics</option>
      <option value="environmental-science">Environmental Science</option>
      <option value="engineering">Engineering</option>
      <option value="health-sciences">Health Sciences</option>
      <option value="informatics">Informatics</option>
      <option value="physics">Physics</option>
      <option value="social-sciences">Social Sciences</option>
      <option value="other">Other</option>
    </select>
  </div>
  <div class="form-item form-type-textfield form-group"> <label class="control-label" for="discipline-other" id="discipline-other-label">Other Academic Discipline</label>
    <input class="form-control form-text" type="text" id="discipline-other" name="discipline-other" value="" size="60" maxlength="60" />
  </div>
  <hr size=1 />
  <div class="form-item form-group form-item form-type-select form-group" style="margin-bottom:1.6rem;">
    <label class="control-label" for="category">Support Category <span class="form-required" title="This field is required.">*</span></label>
    <select required="required" class="dropdown form-control form-select required" title="Please select a general category for your support request. " data-toggle="tooltip" id="categories" name="categories">
      <option value="" selected="selected">- Select -</option>
      <option id="general" value="General">General research computing question</option>
      <option id="rivanna" value="Rivanna">Rivanna HPC</option>
      <option id="ivy" value="Ivy">Ivy Secure Computing</option>
      <option id="storage" value="Storage">Storage</option>
      <option id="omero" value="Omero">Omero Image Analysis</option>
      <option id="container" value="Container">Containerized Service</option>
      <option id="consultation" value="Consultation">Consultation request</option>
      <option value="">-----</option>
      <option id="chase" value="Chase">CHASE Accounts/Data</option>
      <option id="sentinel" value="Sentinel">Sentinel System/Software</option>
      <option id="other" value="Other">Other</option>
    </select>
    <div id="rivanna-help" style="font-size:90%;" class="form-text text-muted">Use this form for general Rivanna support questions. Or submit an <a href="/userinfo/hpc/allocations/#allocation-types" style="font-weight:bold;">Allocation Request</a>.</div>
    <div id="storage-help" style="font-size:90%;" class="form-text text-muted">Use this form for storage questions. Or submit a <a href="/form/storage/" style="font-weight:bold;">storage request</a>.</div>
    <div id="omero-help" style="font-size:90%;" class="form-text text-muted">Use this form for general Omero questions. Or <a href="/form/omero/" style="font-weight:bold;">request Omero access</a>.</div>
    <div id="container-help" style="font-size:90%;" class="form-text text-muted">Use this form for general queries about containerized services. Or <a href="/form/container/" style="font-weight:bold;">request a container service</a>.</div>
    <div id="ivy-help" style="font-size:90%;" class="form-text text-muted">Use this form for general Ivy questions. Or submit an <a href="https://services.rc.virginia.edu/ivyvm" style="font-weight:bold;">Ivy Project Request</a>.</div>
  </div>
  <div class="form-item form-type-textfield form-group">
    <label class="control-label" for="request_title">Brief description of your request <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="request_title" name="request_title" value="" size="60" maxlength="100" placeholder="What can we help you with?" />
  </div>
  <div class="form-item form-group form-item form-type-textarea form-group">
    <label class="control-label" for="description">Details of your request <span class="form-required" title="This field is required.">*</span> </label>
    <div class="form-textarea-wrapper resizable">
      <textarea required="required" class="form-control form-textarea required" id="description" name="description" cols="60" rows="8" maxlength="5000"></textarea>
      <div id="textarea_feedback" style="font-family:monospace;color:green;font-size:85%;margin-top:0.5rem;float:right;"></div>
    </div>
  <br clear=all />
  </div>
  <div class="form-actions" id="submit-div" style="margin-top:1rem;">
    <hr size="1" style="" />
    <p style="font-size:80%;">Please submit the form only once. If you receive an error message after submitting this request, please check your email to confirm that the submission completed.</p>
    <button class="button-primary btn btn-primary form-submit" id="submit" type="submit" name="op" value="Submit">Submit</button>
  </div>
</div>
</form>

<script type="text/javascript" src="/js/support-request.js"></script>

<script>
function getParams() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
};
// category
let category = decodeURI(getParams()["category"]);
if(category != undefined && category != "undefined") {
  var set_category = document.getElementById("categories").value = category;
};
// request_title
let request_title = decodeURI(getParams()["request_title"]);
if(request_title != undefined && request_title != "undefined") {
  var set_request_title = document.getElementById("request_title").value = request_title;
};
// department
let department = decodeURI(getParams()["department"]);
if(department != undefined && department != "undefined") {
  var set_department = document.getElementById("department").value = department;
};
// description
let description = decodeURI(getParams()["description"]);
if(description != undefined && description != "undefined") {
  var set_description = document.getElementById("description").value = description;
};
</script>
<script type="text/javascript" src="/js/user-session.js"></script>
<script type="text/javascript" src="/js/response-message.js"></script>
