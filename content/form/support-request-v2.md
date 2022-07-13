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
<hr size=1 />
  <div class="form-item form-type-textfield form-group">
    <label id="request_title" class="control-label" for="request_title">Brief description of your request *</label>
    <input required="required" class="form-control form-text required" type="text" id="request_title" name="request_title" value="" size="60" maxlength="100" placeholder="What can we help you with?" />
  </div>
  <div class="form-item form-group form-item form-type-textarea form-group">
    <label id="description_label" class="control-label" for="description">Details of your request</label>
    <div class="form-textarea-wrapper resizable">
      <textarea required="required" class="form-control form-textarea required" id="description" name="description" cols="60" rows="8" maxlength="5000"></textarea>
      <div id="textarea_feedback" style="font-family:monospace;color:green;font-size:85%;margin-top:0.5rem;float:right;"></div>
    </div>
  <br clear=all />
  </div>
  <div id="support-fields"></div>
  <div id="rivanna-fields"></div>
  <div id="ivy-fields"></div>
  <div id="consultation-fields"></div>
  <div class="form-actions" id="submit-div" style="margin-top:1rem;">
    <hr size="1" style="" />
    <p style="font-size:80%;">Please submit the form only once. If you receive an error message after submitting this request, please check your email to confirm that the submission completed.</p>
    <button class="button-primary btn btn-primary form-submit" id="submit" type="submit" name="op" value="Submit">Submit</button>
  </div>
</div>
</form>

<script type="text/javascript" src="/js/support-request.js"></script>

<script>
function reset_form() {
  document.getElementById("support-fields").innerHTML = "";
  document.getElementById("rivanna-fields").innerHTML = "";
  document.getElementById("ivy-fields").innerHTML = "";
  document.getElementById("consultation-fields").innerHTML = "";
};

function selected(cat) {
  console.log(cat)
  if (cat == 'support') {
    reset_form();
    var description_label = document.getElementById("request_title").innerHTML = "Describe the nature of your request *";
  } 
  if (cat == 'rivanna') {
    reset_form();
    var description_label = document.getElementById("request_title").innerHTML = "Please give a brief description of the problem *";
    var formadd = document.getElementById("rivanna-fields").innerHTML += `
      <input type="hidden" id="category" name="category" value="Rivanna">
      <div class="form-item form-type-textfield form-group">
        <label class="control-label" for="request_title">What software are you trying to use?</label>
        <input class="form-control form-text" type="text" id="rivanna_software" name="rivanna_software" value="" size="60" maxlength="100" placeholder="" />
      </div>
      <div class="form-textarea-wrapper resizable form-group">
        <label class="control-label" for="error_message">Error message received</label>
        <textarea class="form-control form-textarea" id="error_message" name="error_message" style="font-family:monospace;font-size:90\%;" cols="60" rows="8" maxlength="5000"></textarea>
      </div>
      <div class="form-item form-type-textfield form-group">
        <label class="control-label" for="request_title">SLURM Job ID</label>
        <input class="form-control form-text" type="text" id="slurm_id" name="slurm_id" value="" style="font-family:monospace;" size="10" maxlength="20" placeholder="" />
      </div>
      <div class="form-item form-type-textfield form-group">
        <label class="control-label" for="request_title">Path to your SLURM script</label>
        <input class="form-control form-text" type="text" id="script_path" name="script_path" value="" style="font-family:monospace;" size="60" maxlength="100" placeholder="" />
      </div>      
      `;
  } 
  if (cat == 'ivy') {
    reset_form();
    var description_label = document.getElementById("request_title").innerHTML = "Please give a brief description of the problem *";
    var formadd = document.getElementById("ivy-fields").innerHTML += `
      <input type="hidden" id="category" name="category" value="Rivanna">
      <div class="form-textarea-wrapper resizable form-group">
        <label class="control-label" for="error_message">Error message received</label>
        <textarea class="form-control form-textarea" id="error_message" name="error_message" style="font-family:monospace;font-size:90\%;" cols="60" rows="8" maxlength="5000"></textarea>
      </div>
      <div class="form-item form-type-textfield form-group">
        <label class="control-label" for="request_title">Project PI</label>
        <input class="form-control form-text" type="text" id="ivy_project_pi" name="ivy_project_pi" value="" size="60" maxlength="100" placeholder="" />
      </div>
      <div class="form-item form-type-textfield form-group">
        <label class="control-label" for="request_title">IP Address of your Ivy VM</label>
        <input class="form-control form-text" type="text" id="ivy_ip_address" name="ivy_ip_address" style="font-family:monospace;" value="" size="20" maxlength="20" placeholder="" />
      </div>    
      <div class="form-item form-type-textfield form-group">
        <label class="control-label" for="request_title">Path to your executable / script</label>
        <input class="form-control form-text" type="text" id="ivy_executable_path" name="ivy_executable_path" style="font-family:monospace;" value="" size="60" maxlength="100" placeholder="" />
      </div>
      `;
  }
  if (cat == 'consultation') {
    reset_form();
    var description_label = document.getElementById("request_title").innerHTML = "Describe the nature of your consultation request";
  }
  else {

  }
};
function getParams() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
};

</script>
<!-- <script type="text/javascript" src="/js/user-session.min.js"></script> -->
<script type="text/javascript" src="/js/response-message.js"></script>
