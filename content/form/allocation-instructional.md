+++
date = "2023-09-12T23:59:16-05:00"
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

{{% jira-msg %}}


<form action="https://uvarc-api.pods.uvarc.io/rest/general-support-request/" method="post" id="request-form" accept-charset="UTF-8">

{{< enable-disable-form >}}

<div class="alert" id="response_message" role="alert" style="padding-bottom:0px;">
  <p id="form_post_response"></p>
</div>
<div>
  <input type="hidden" id="category" name="category" value="Rivanna HPC">
  <input type="hidden" id="allocation_type" name="Allocation Type" value="Instructional Allocation">
  <input type="hidden" id="request_title" name="request_title" value="Allocation Request: Instructional" />

  {{% getstatus keyword="jira" %}}

  {{% form-userinfo-v2 %}}
  <div class="form-item form-group form-item form-type-textfield form-group"> <label class="control-label" for="mygroups-group">Name of Grouper Account <span class="form-required" title="This field is required.">*</span><span style="font-weight:normal;"><br />Lowercase only, no spaces, PI must <a href="https://in.virginia.edu/how-to-request-group" target="_new">create his/her Grouper group</a>.</span></label>
    {{% group_creation_tip %}}
    <input required="required" class="form-control form-text required" type="text" id="mygroups-group" name="mygroups-group" value="" size="60" maxlength="128" />
  </div>
  <div class="col form-item form-group">
     <div class="alert alert-warning">
        Instructors are responsible for creating the class Grouper group and updating the roster for the chosen account through the <a href="https://groups.identity.virginia.edu/">Grouper portal</a>.
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
      <div class="help-block col">If you have taught this same class before using Rivanna/Afton, select Renewal.</div>
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
        Instructional allocations come with 1TB of temporary project storage space. Class data and service units will be automatically purged 2 weeks after the class ends unless the instructor requests an extension.
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

{{< /enable-disable-form >}}

</form>

<script type="text/javascript" src="/js/user-session-v2.js"></script>
<script type="text/javascript" src="/js/response-message.js"></script>
<script type="text/javascript" src="/js/allocation-request.js"></script>
