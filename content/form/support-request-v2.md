+++
date = "2020-12-10T23:59:16-05:00"
tags = ["search"]
categories = ["forms"]
images = [""]
author = "Staff"
description = ""
title = "Support Request"
draft = false
type = "form"
private = true
+++
<form action="https://api.uvarc.io/rest/general-support-request/" method="post" id="request-form" accept-charset="UTF-8">
<div class="alert" id="response_message" role="alert" style="padding-bottom:0px;">
  <p id="form_post_response"></p>
</div>
<div>
{{% form-userinfo %}}
  <div class="form-item form-type-textfield form-group">
    <label class="control-label" for="department">Department/Organization <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="department" name="department" value="" size="60" maxlength="100"/>
  </div>
<hr size=1 />
<!-- START NEW CATEGORY BTNS -->
<div style="width:100%;margin-bottom:1rem;">
<label class="control-label" for="">Select a support category:</label><br clear=all />
  <a href="#" onclick="selected('support')"><button id="support" type="button" class="btn cat" style="background-color:#F8FAFB;height:4rem;border:solid 1px #ccc;margin-right:1rem;"><i class="fas fa-question-circle"></i>&nbsp; General Support</button></a>
  <a href="#" onclick="selected('rivanna')"><button id="rivanna" type="button" class="btn cat" style="background-color:#F8FAFB;height:4rem;border:solid 1px #ccc;margin-right:1rem;"><i class="fas fa-microchip"></i>&nbsp; Rivanna / HPC</button></a>
  <a href="#" onclick="selected('ivy')"><button id="ivy" type="button" class="btn cat" style="background-color:#F8FAFB;height:4rem;border:solid 1px #ccc;margin-right:1rem;"><i class="fas fa-shield-alt"></i>&nbsp; Ivy</button></a>
  <a href="#" onclick="selected('consultation')"><button id="consultation" type="button" class="btn cat" style="background-color:#F8FAFB;height:4rem;border:solid 1px #ccc;"><i class="fas fa-comments"></i>&nbsp; Consultation</button></a>
</div>
  <div id="support-fields"></div>
  <div id="rivanna-fields"></div>
  <div id="ivy-fields"></div>
  <div id="consultation-fields"></div>
  <div class="form-actions" id="submit-div" style="display:none; margin-top:1rem;">
    <hr size="1" style="" />
    <p style="font-size:80%;">Please submit the form only once. If you receive an error message after submitting this request, please check your email to confirm that the submission completed.</p>
    <button class="button-primary btn btn-primary form-submit" id="submit" type="submit" name="op" value="Submit">Submit</button>
  </div>
</div>
</form>
<script type="text/javascript" src="/js/support-request.js"></script>
<script type="text/javascript" src="/js/support-dynamic-forms.js"><script>
<script type="text/javascript" src="/js/user-session.min.js"></script>
<script type="text/javascript" src="/js/response-message.js"></script>