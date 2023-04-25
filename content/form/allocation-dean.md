+++
date = "2022-10-02T23:59:16-05:00"
tags = ["search"]
categories = ["forms"]
images = [""]
author = "Staff"
description = ""
title = "Request a Dean Sponsored Allocation"
draft = false
type = "form"
private = true

+++

<form action="https://uvarc-api.pods.uvarc.io/rest/general-support-request/" method="post" id="request-form" accept-charset="UTF-8">
<div class="alert" id="response_message" role="alert" style="padding-bottom:0px;">
  <p id="form_post_response"></p>
</div>
<div>
  <!-- BEGIN FIRST SECTION -->
  <div style="padding:1.4rem;" class="card">
  <h5 class="card-title">About the Requestor</h5>
  <input type="hidden" id="category" name="category" value="Deans Allocation">
  <input type="hidden" id="allocation_type" name="Allocation Type" value="Deans Allocation">
  <input type="hidden" id="request_title" name="request_title" value="Allocation Request: Dean" />
{{% form-userinfo %}}
  <div class="form-item form-type-select form-group"> <label class="control-label" for="discipline">Academic Discipline <span class="form-required" title="This field is 
required.">*</span></label>
    <select required="required" class="form-control form-select required" title="Please identify the academic discipline related to this allocation" data-toggle="tooltip" 
id="discipline" name="discipline">
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
  <div class="form-item form-type-select form-group">
    <label class="control-label" for="edit-submitted-classification">Sponsoring Dean
      <span class="form-required" title="This field is required.">*</span>
    </label>
    <select required="required" class="form-control form-select required" data-toggle="tooltip" id="sponsor" name="sponsor">
      <option value="" selected="selected">- Select -</option>
      <option value="cas">College of Arts & Sciences</option>
      <option value="hs">Health System</option>
      <option value="seas">School of Engineering & Applied Sciences</option>
      <option value="dsi">School of Data Science</option>
      <option value="other">Other</option>
    </select>
  </div>
  <div class="form-item form-type-textfield form-group"> <label class="control-label" for="edit-submitted-name">Department <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="department" name="department" value="" size="60" maxlength="64" />
  </div>
  <div class="form-item form-group form-item form-type-textfield form-group"> <label class="control-label" for="mygroups-group">Name of MyGroups Account <span class="form-required" title="This field is required.">*</span><span style="font-weight:normal;"><br />Lowercase only, no spaces, PI must <a style="text-decoration:underline;color:blue;" href="https://virginia.service-now.com/its/?id=itsweb_kb_article&sys_id=ea1dffc7db3ac744f032f1f51d96193a" target="_new">create his/her MyGroups group</a>.</span></label>
    <input required="required" class="form-control form-text required" type="text" id="mygroups-group" name="mygroups-group" value="" size="60" maxlength="128" />
  </div>
<!-- END FIRST SECTION -->
</div>
<div class="spacer-20"></div>
<!-- BEGIN SECOND SECTION -->
<div style="padding:1.4rem;" class="card">
<h5 class="card-title">About the Request</h5>
<div class="row">
  <div class="col form-item form-type-textfield form-group"> <label class="control-label" for="edit-submitted-name">Total Request in SUs <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="number" id="su-request" name="su-request" value="" size="20" maxlength="20" />
  </div>
  <div class="col" style="width:50%;"></div>
  </div>
  <div style="border: solid 1px #ccc; padding:1rem; background-color:#cae6d2; font-size:90%;" class="form-text text-muted">Dean sponsored allocations expire by default 12 months after they are disbursed.</div>
  <div class="spacer-20"></div>
  <div class="form-item form-group form-item form-type-radios form-group"> <label class="control-label" for="interdisciplinary">
    Will this request be used in support of interdisciplinary research? <span class="form-required" title="This field is required.">*</span></label>
    <div id="for-research" class="form-radios"><div class="form-item form-item-submitted-new-or-renewal form-type-radio radio"> <label class="control-label" for="for-research-1">
      <input required="required" type="radio" id="for-research-1" name="for-research" value="new" class="form-radio" /> &nbsp;Yes</label>
    </div>
    <div class="form-item form-item-submitted-new-or-renewal form-type-radio radio"> <label class="control-label" for="for-research-2">
      <input required="required" type="radio" id="for-research-2" name="for-research" value="no" class="form-radio" /> &nbsp;No</label>
    </div>
  </div>
  <div class="spacer-20"></div>
  <div class="form-item form-type-radios form-group"> 
    <label class="control-label" for="faculty-startup">
      Is this request part of a new faculty start-up agreement? <span class="form-required" title="This field is required.">*</span>
    </label>
    <div id="faculty-startup" class="form-radios">
      <div class="form-item form-type-radio radio"> 
        <input required="required" type="radio" id="yes-faculty-research" name="faculty-startup" value="yes" class="form-radio" /> 
        <label class="control-label" for="yes-faculty-startup">
          Yes
        </label>
      </div>
      <div class="form-item form-type-radio radio"> 
        <input required="required" type="radio" id="no-faculty-startup" name="faculty-startup" value="no" class="form-radio" />
        <label class="control-label" for="no-faculty-startup">
          No
        </label>
      </div>
    </div>
    <div class="form-item form-type-textarea form-group" style="margin-top:1rem;display:none;" name="faculty-startup-explainer" id="faculty-startup-explainer">
      <label class="control-label" for="faculty-startup-details" id="faculty-startup-details-label">Please provide details of the agreement below including the name of the approving dean.</label>
      <div class="form-textarea-wrapper resizable">
        <textarea class="form-control form-textarea" id="faculty-startup-details" name="faculty-startup-details" cols="60" rows="8"></textarea>
      </div>
    </div>
  </div>
</div>
</div>
  <!-- END SECOND SECTION -->
  <div class="spacer-20"></div>
  <!-- BEGIN THIRD SECTION -->
  <div class="card" style="padding:1.4rem;">
  <h5 class="card-title">About Your Project</h5>
  <div class="form-item form-type-textarea form-group"> <label class="control-label" for="description-of-research">Describe Your Research Project <span class="form-required" title="This field is required.">*</span></label>
  <p style="font-size:85%;font-color:#bbb;">Please describe your research project in the box below (submit additional pages if needed). Be sure to include details of what you did with the startup allocation and how you plan to use the administrative allocation. Also, please provide a brief description of the code(s) and/or software you will be using, along with performance information to justify the resource request.</p>
    <div class="form-textarea-wrapper resizable"><textarea required="required" class="form-control form-textarea required" id="description-of-research" name="description-of-research" cols="60" rows="12"></textarea>
    </div>
  </div>
  <div class="form-item form-type-textarea form-group"> <label class="control-label" for="research-aims">Intended Research Outputs <span class="form-required" title="This field is required.">*</span></label>
  <p style="font-size:85%;font-color:#bbb;">One of the goals of this HPC cluster is to support sponsored research. Please list the title, award agency, award number, and award dates for research that will be enabled by this allocation, as well as other intended research outputs. Researchers are expected to provide project outcomes from allocations granted on the system.</p>
    <div class="form-textarea-wrapper resizable"><textarea required="required" class="form-control form-textarea required" id="research-aims" name="research-aims" cols="60" rows="12"></textarea>
    </div>
  </div>
  <div class="form-item form-type-textarea form-group"> <label class="control-label" for="description-of-research">HPC Features <span class="hpc-features" title="This field is required.">*</span></label>
  <p style="font-size:85%;font-color:#bbb;">In the box below, please briefly explain why this project requires access to Rivanna’s key features (e.g. fast parallel scratch storage, fast internode communication, etc.).</p>
    <div class="form-textarea-wrapper resizable"><textarea required="required" class="form-control form-textarea required" id="hpc-features" name="hpc-features" cols="60" rows="12"></textarea>
    </div>
  </div>
  <!-- END THIRD SECTION -->
  </div>
  <div class="spacer-20"></div>
  <input type="hidden" name="details" />
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
    <p style="font-size:80%;">Please submit the form only once. If you receive an error message after submitting this request, please check your email to confirm that the submission completed.</p>
    <button class="button-primary btn btn-primary form-submit" id="submit" type="submit" name="op" value="Submit">Submit</button>
  </div>
</div>
</form>

<script>
function getParams() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
};
// set sponsor
let sponsor = decodeURI(getParams()["sponsor"]);
var set_sponsor = document.getElementById("sponsor").value = sponsor;

// faculty startup explanation
$("#faculty-startup-explainer").hide();
$('[name="faculty-startup"]').click(function(){
  var startupVal = $(this).attr("value");
  if (startupVal == "yes") {
    $("#faculty-startup-explainer").show(400);
  }
  if (startupVal == "no") {
    $("#faculty-startup-explainer").hide(200);
  }
});
</script>
<script type="text/javascript" src="/js/user-session.js"></script>
<script type="text/javascript" src="/js/response-message.js"></script>
