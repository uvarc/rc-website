+++
date = "2021-06-10T23:59:16-05:00"
tags = ["search"]
categories = ["forms"]
images = [""]
author = "Staff"
description = ""
title = "ACCORD Support Request"
draft = false
type = "form"
private = true
+++

{{% jira-msg %}}

{{< getstatus keyword="jira" >}}

<form action="https://uvarc-api.pods.uvarc.io/rest/general-support-request/" method="post" id="request-form" accept-charset="UTF-8">

{{< enable-disable-form >}}

<div class="alert" id="response_message" role="alert" style="padding-bottom:0px;">
  <p id="form_post_response"></p>
</div>

<div>
  <input type="hidden" id="category" name="category" value="Accord Support">
  <input type="hidden" id="request_title" name="request_title" value="ACCORD Support Request" />


  <div class="row">
    <div class="col-xs-6 col-md-6 form-item form-group form-item form-item-submitted-name form-type-textfield form-group"> 
      <label class="control-label" for="name">Name <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="form-control form-text required" type="text" id="name" name="name" value="" size="60" maxlength="128" />
      <input class="form-control form-text required" type="hidden" id="category" name="category" value="Storage">
    </div>
    <div class="col-xs-6 col-md-6 form-item form-group form-item form-item-submitted-e-mail form-type-webform-email form-group"> 
      <label class="control-label" for="email">E-mail <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="email form-control form-text form-email required" type="email" id="email" name="email" value="" size="60" />
    </div>
  </div>
  <div class="form-item form-type-textfield form-group">
    <label class="control-label" for="institution">University/Institution <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="institution" name="institution" value="" size="60" maxlength="100"/>
  </div>
  <div class="form-item form-type-textfield form-group">
    <label class="control-label" for="department">Department/Organization <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="department" name="department" value="" size="60" maxlength="100"/>
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

{{< /enable-disable-form >}}


</form>

<script type="text/javascript" src="/js/response-message.js"></script>
