+++
date = "2019-06-31T23:59:16-05:00"
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

<form action="https://api.uvarc.io/rest/general-support-request/" method="post" id="allocation-form" accept-charset="UTF-8">
<p id="form_post_response"></p>
<div>
  <!-- BEGIN FIRST SECTION -->
  <div style="padding:1.4rem;" class="card">
  <h5 class="card-title">About the Requestor</h5>

  <input type="hidden" id="category" name="category" value="Deans Allocation">
  <input type="hidden" id="allocation_type" name="Allocation Type" value="Instructional Allocation">
  <input type="hidden" id="request_title" name="request_title" value="Allocation Request: Dean" />

{{% form-userinfo %}}

  <div class="form-item form-type-select form-group">
    <label class="control-label" for="edit-submitted-classification">Sponsoring Dean
      <span class="form-required" title="This field is required.">*</span>
    </label>
    <select required="required" class="form-control form-select required" data-toggle="tooltip" id="sponsor" name="sponsor">
      <option value="" selected="selected">- Select -</option>
      <option value="cas">College of Arts & Sciences</option>
      <option value="seas">School of Engineering & Applied Sciences</option>
      <option value="dsi">School of Data Science</option>
      <option value="other">Other</option>
    </select>
  </div>

  <div class="form-item form-group form-item form-type-textfield form-group"> <label class="control-label" for="mygroups-group">MyGroups Account for this Allocation (lowercase only, no spaces) <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="mygroups-group" name="mygroups-group" value="" size="60" maxlength="128" />
  </div>

  <div class="form-item form-group form-item form-type-textarea form-group"> <label class="control-label" for="mygroup-users">Others to be Added to MyGroups Account (UVA computing IDs separated by commas)</label>
    <div class="form-textarea-wrapper resizable"><textarea class="form-control form-textarea" id="mygroup-users" name="mygroup-users" cols="60" rows="5"></textarea>
    </div>
  </div>

  <div class="form-item form-type-textfield form-group"> <label class="control-label" for="edit-submitted-name">Department <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="department" name="department" value="" size="60" maxlength="64" />
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

  <div class="form-item form-group form-item form-type-radios form-group"> <label class="control-label" for="interdisciplinary">
    Will this request be used in support of interdisciplinary research? <span class="form-required" title="This field is required.">*</span></label>
    <div id="for-research" class="form-radios"><div class="form-item form-item-submitted-new-or-renewal form-type-radio radio"> <label class="control-label" for="for-research-1">
      <input required="required" type="radio" id="for-research-1" name="for-research" value="new" class="form-radio" /> &nbsp;Yes</label>
    </div>
    <div class="form-item form-item-submitted-new-or-renewal form-type-radio radio"> <label class="control-label" for="for-research-2">
      <input required="required" type="radio" id="for-research-2" name="for-research" value="no" class="form-radio" /> &nbsp;No</label>
    </div>
  </div>
  </div>
  
<!-- END SECOND SECTION -->
  </div>
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
}

function decode64(str) {
  var e={},i,b=0,c,x,l=0,a,r='',w=String.fromCharCode,L=str.length;
  var A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  for(i=0;i<64;i++){e[A.charAt(i)]=i;}
  for(x=0;x<L;x++){
    c=e[str.charAt(x)];b=(b<<6)+c;l+=6;
    while(l>=8){((a=(b>>>(l-=8))&0xff)||(x<(L-2)))&&(r+=w(a));}
  }
  return r;
};

var form = document.getElementById('allocation-form');

var name_enc = getParams()["name"];
if (name_enc) {
  // do nothing
} else {
  $('#name').val('');
  $('#email').val('');
  $('#uid').val('');
  $('#sponsor').val('');
  window.location.replace( "https://auth.uvasomrc.io/site/allocation-dean.php" );
}

// name
let name = decodeURI(getParams()["name"]);
let name_dec = decode64(name);
var set_name = document.getElementById("name").value = name_dec;

// uid
let uid = decodeURI(getParams()["uid"]);
let uid_dec = decode64(uid);
var set_uid = document.getElementById("uid").value = uid_dec;

// email
let email = decodeURI(getParams()["email"]);
let email_dec = decode64(email);
var set_email = document.getElementById("email").value = email_dec;

// sponsor
let sponsor = decodeURI(getParams()["sponsor"]);
var set_sponsor = document.getElementById("sponsor").value = sponsor;

let message = decodeURI(getParams()["message"]);
let status = decodeURI(getParams()["status"]);
if(message == "undefined" || message == undefined) {
  message="";
}

document.getElementById("form_post_response").innerHTML = message;
if(status == "error" || status == undefined) {
  document.getElementById("form_post_response").style.color = "red";
  document.getElementById("form_post_response").style.fontWeight = "500"
} else {
  document.getElementById("form_post_response").style.color = "green";
  document.getElementById("form_post_response").style.fontWeight = "500"
}
</script>
