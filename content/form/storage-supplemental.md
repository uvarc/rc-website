+++
date = "2019-07-22T23:59:16-05:00"
tags = ["storage"]
categories = ["forms"]
images = [""]
author = "Staff"
description = ""
title = "Supplemental Storage Request in `/scratch`"
draft = false
type = "form"
private = true
+++

<script type="text/javascript" src="/js/typeahead.js"></script>

<form action="https://api.uvarc.io/rest/general-support-request/" method="post" id="storage-form" accept-charset="UTF-8">
<p id="form_post_response"></p>
<div>

  <input type="hidden" id="category" name="category" value="Storage">

  {{% form-userinfo %}}

  <div class="form-item form-type-select form-group"> <label class="control-label" for="classification">Classification <span class="form-required" title="This field is required.">*</span></label>
    <select required="required" class="form-control form-select required" title="Faculty, postdoctoral associates, and full-time research staff are eligible to request allocations." data-toggle="tooltip" id="classification" name="classification">
    <option value="" selected="selected">- Select -</option>
    <option value="faculty">Faculty</option>
    <option value="staff">Staff</option>
    <option value="postdoc">Postdoctoral Associate</option>
    <option value="other">Other</option></select>
  </div>

  <div class="form-item form-group form-item form-type-textfield form-group"> 
    <label class="control-label" for="department">Department <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="department" name="department" value="" size="60" maxlength="128" />
  </div>

  <hr size=1 />

  <div class="row">
    <div class="col form-item form-type-date form-group">
      <label class="control-label" for="start-date">Start Date for Storage Allocation <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="form-control form-date required" type="date" id="start-date" name="start-date" value="" size="60" maxlength="60" />
    </div>

    <div class="col form-item form-type-date form-group">
      <label class="control-label" for="end-date">End Date for Storage Allocation <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="form-control form-date required" type="date" id="end-date" name="end-date" value="" size="60" maxlength="60" />
    </div>
  </div>

  <div class="row">

    <div class="col form-item form-type-radios form-group"> 
      <label class="control-label" for="data-sensitivity">Are you going to be uploading sensitive data? (IIHI, PHI, etc.) <span class="form-required" title="This field is required.">*</span></label>
      <div id="data-sensitivity" class="form-radios">
        <div class="form-item form-type-radio radio">
          <input required="required" type="radio" id="data-sensitivity-1" name="data-sensitivity" value="sensitive-data" class="form-radio" />&nbsp; Yes</label>
        </div>
        <div class="form-item form-type-radio radio">
          <input required="required" type="radio" id="data-sensitivity-2" name="data-sensitivity" value="non-sensitive-data" class="form-radio" />&nbsp; No</label>
        </div>
      </div>
    </div>

    <div class="col form-item form-type-radios form-group"> 
      <label class="control-label" for="data-sensitivity">Does your existing allocation have at least 25,000 free Service Units? <span class="form-required" title="This field is required.">*</span></label>
      <div id="data-sensitivity" class="form-radios">
        <div class="form-item form-type-radio radio">
          <input required="required" type="radio" id="sufficient-1" name="sufficient-sus" value="more-than-25000-sus" class="form-radio" />&nbsp; Yes</label>
        </div>
        <div class="form-item form-type-radio radio">
          <input required="required" type="radio" id="sufficient-2" name="sufficient-sus" value="less-than-25000-sus" class="form-radio" />&nbsp; No</label>
        </div>
      </div>
    </div>

  </div>

  <div class="row">
    <div id="group-selector" class="col form-item form-group form-item form-type-textarea form-group"> 
      <label class="control-label" for="mygroup-ownership">MyGroup Ownership <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="form-control form-text required typeahead" type="text" id="mygroup-ownership" name="mygroup-ownership" placeholder="Group Name" size="32" maxlength="32" style="width:14rem;font-family:courier;" />
    </div>

    <div class="col form-item form-group"> 
      <label class="control-label" for="capacity">Space (TB) <span class="form-required" title="This field is required.">*</span></label>
      <input class="form-control required" type="number" min="1" max="100" required="required" id="capacity" name="capacity" value="0" style="width:8rem;" />
      <p class=tiny>Select an increment of 1TB.</p>
    </div>
  </div>

  <div class="row">
    <div class="col form-item form-type-textarea form-group"> 
      <label class="control-label" for="file-creations">Maximum Number of File Creations Required <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="form-control form-number required" type="number" id="file-creations" name="file-creations" value="" size="40" maxlength="40" style="width:14rem;font-family:courier;" />
    </div>
  </div>

  <hr size=1 />

  <div class="form-item form-group form-item form-type-textarea form-group"> 
    <label class="control-label" for="explanation">Please explain why you need supplemental storage for this project <span class="form-required" title="This field is required.">*</span></label>
    <div class="form-textarea-wrapper resizable"><textarea required="required" class="form-control form-textarea required" id="project-summary" name="explanation" cols="60" rows="5"></textarea>
    </div>
  </div>

  <div class="form-item form-group form-item form-type-textarea form-group"> 
    <label class="control-label" for="project-summary">Award or Grant Details </label>
    <p style="font-size:85%;">Please list the title, award agency, award number, and award dates for research that will be enabled by this allocation, as well as other intended research outputs. Researchers are expected to provide project outcomes from allocations granted on the system.</p>
    <div class="form-textarea-wrapper resizable"><textarea class="form-control form-textarea" id="project-summary" name="project-summary" cols="60" rows="5"></textarea>
    </div>
  </div>

  <hr size=1 />

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

var form = document.getElementById('request-form');

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

var name_enc = getParams()["name"];
if (name_enc) {
  // do nothing
} else {
  $('#name').val('');
  $('#email').val('');
  $('#uid').val('');
  window.location.replace( "https://auth.uvasomrc.io/site/storage-supplemental.php" );
}

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
