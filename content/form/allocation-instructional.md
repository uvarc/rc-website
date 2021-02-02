+++
date = "2016-12-31T23:59:16-05:00"
tags = ["search"]
categories = ["forms"]
images = [""]
author = "Staff"
description = ""
title = "Request an Instructional Allocation"
draft = false
type = "form"
private = true

+++

<form action="https://api.uvarc.io/rest/general-support-request/" method="post" id="request-form" accept-charset="UTF-8">
<div class="alert" id="response_message" role="alert" style="padding-bottom:0px;">
  <p id="form_post_response"></p>
</div>
<div>
  <input type="hidden" id="category" name="category" value="Rivanna HPC">
  <input type="hidden" id="allocation_type" name="Allocation Type" value="Instructional Allocation">
  <input type="hidden" id="request_title" name="request_title" value="Allocation Request: Instructional" />
{{% form-userinfo %}}
  <hr size=1 />
  <div class="form-item form-type-select form-group"> <label class="control-label" for="classification">Classification <span class="form-required" title="This field is required.">*</span></label>
    <select required="required" class="form-control form-select required" title="Faculty, postdoctoral associates, and full-time research staff are eligible to request allocations." data-toggle="tooltip" id="classification" name="classification">
    <option value="" selected="selected">- Select -</option>
    <option value="faculty">Faculty</option>
    <option value="staff">Staff</option>
    <option value="postdoc">Postdoctoral Associate</option>
    <option value="other">Other</option></select>
  </div>
  <div class="form-item form-type-textfield form-group"> <label class="control-label" for="department">Department <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="department" name="department" value="" size="60" maxlength="128" />
  </div>
  <div class="form-item form-type-textfield form-group"> <label class="control-label" for="mygroups-group">Name of MyGroups Account (lowercase only, no spaces) <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="mygroups-group" name="mygroups-group" value="" size="60" maxlength="128" />
  </div>
  <div class="col form-item form-group">
     <div class="alert alert-warning">
        Instructors are responsible for updating the class roster for the chosen account through the <a href="https://mygroups.virginia.edu/">ITS MyGroups portal</a>.
     </div>
  </div>
  <div class="form-item form-group form-type-radios form-group"> <label class="control-label" for="new-or-renewal">New or Renewal <span class="form-required" title="This field is required.">*</span></label>
    <div class="row">
      <div id="new-or-renewal" class="form-radios col">
        <div class="form-item form-type-radio radio"> <label class="control-label" for="new-or-renewal-1">
          <input required="required" type="radio" id="new-or-renewal-1" name="new-or-renewal" value="new" checked="checked" class="form-radio" />&nbsp;New</label>
        </div>
        <div class="form-item form-type-radio radio"> <label class="control-label" for="new-or-renewal-2">
          <input required="required" type="radio" id="new-or-renewal-2" name="new-or-renewal" value="renewal" class="form-radio" />&nbsp;Renewal</label>
        </div>
      </div>
      <div class="help-block col">If you have taught this same class before using Rivanna, select Renewal.</div>
    </div>
  </div>  
  <div class="row">
    <div class="col form-item form-group form-type-textfield"> <label class="control-label" for="class-id">Class ID <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="form-control form-text required" type="text" id="class-id" name="class-id" value="" size="60" maxlength="128" />
    </div>
    <div class="col form-item form-group form-type-textfield"> <label class="control-label" for="academic-term">Academic Term <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="form-control form-text required" type="text" id="academic-term" name="academic-term" value="" size="60" maxlength="128" />
    </div>
  </div>
  <div class="row">
    <div class="col form-item form-type-textfield form-group"> <label class="control-label" for="class-size">Class Size <span class="form-required" title="This field is required.">*</span></label>
      <p style="font-size:80%;">How many students are in your class? <br /><br /></p>
      <input required="required" class="form-control form-text required" type="text" id="class-size" name="class-size" value="" size="60" maxlength="128" />
    </div>
    <div class="col form-item form-type-textfield form-group"> <label class="control-label" for="class-schedule">Class Schedule <span class="form-required" title="This field is required.">*</span></label>
      <p style="font-size:80%;">What days/times does this class meet? Enter “n/a” if students will use the cluster at different times.</p>
      <input required="required" class="form-control form-text required" type="text" id="class-schedule" name="class-schedule" value="" size="60" maxlength="128" />
    </div>
  </div>
  
  <div class="form-item form-type-textarea form-group"> <label class="control-label" for="resources-required">Cores/Memory Required <span class="form-required" title="This field is required.">*</span></label>
    <p style="font-size:80%;">Estimate how many cores and how much memory each student will need to process his/her jobs. General descriptions are fine. A member of our user services team will contact you if we need additional information.</p>
    <div class="form-textarea-wrapper resizable"><textarea class="form-control form-textarea required" id="resources-required" name="resources-required" cols="60" rows="5"></textarea>
    </div>
  </div>
  <div class="col form-item form-group">
     <div class="alert alert-warning">
        Instructional allocations come with 50GB of temporary project storage space. Data kept in the temporary project storage space will be automatically purged 2 weeks after the class ends unless the instructor requests an extension.
     	<a href="/education/rivanna-instructional/" target="_blank">Read the full policy and guide for instructors.</a>
     </div>
  </div>

  <input type="hidden" name="details" />
  <div class="form-actions" id="submit-div" style="margin-top:1rem;">
    <hr size="1" style="" />
    <p style="font-size:80%;">Please submit the form only once. If you receive an error message after submitting this request, please check your email to confirm that the submission completed.</p>
    <button class="button-primary btn btn-primary form-submit" id="submit" type="submit" name="op" value="Submit">Submit</button>
  </div>
</div>
</form>

<script type="text/javascript" src="/js/user-session.js"></script>
<script type="text/javascript" src="/js/response-message.js"></script>
