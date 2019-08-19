+++
date = "2016-12-31T23:59:16-05:00"
tags = ["search"]
categories = ["forms"]
images = [""]
author = "Staff"
description = ""
title = "Support Request"
draft = false
type = "form"

+++

<form action="https://api.uvarc.io/rest/general-support-request/" method="post" id="request-form" accept-charset="UTF-8">
<p id="form_post_response"></p>
<div>
  <div class="form-item form-group form-item form-type-textfield form-group">
    <label class="control-label" for="name">Name <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="name" name="name" value="" size="60" maxlength="128" readonly />
  </div>

  <div class="row">
    <div class="col form-item form-group form-item form-type-webform-email form-group"> 
      <label class="control-label" for="email">E-mail <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="email form-control form-text form-email required" type="email" id="email" name="email" value="" size="60" readonly />
    </div>
    <div class="col form-item form-group form-item form-type-textfield form-group"> 
      <label class="control-label" for="uid">Computing ID <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="form-control form-text required" type="text" id="uid" name="uid" value="" size="20" maxlength="20" readonly />
    </div>
  </div>
  <div class="form-item form-group form-item form-type-select form-group"> 
    <label class="control-label" for="edit-submitted-classification">Support Category <span class="form-required" title="This field is required.">*</span></label>
    <select required="required" class="form-control form-select required" title="Please select a general category for your support request. " data-toggle="tooltip" id="category" name="category">
      <option value="" selected="selected"> - Select - </option>
      <option id="rivanna" value="Rivanna">Rivanna HPC</option>
      <option id="ivy" value="Ivy">Ivy Secure Computing</option>
      <option id="software" value="Software">Licensed Research Software</option>
      <option id="storage" value="Storage">Storage</option>
      <option id="consultation" value="Consultation">Consultation Request</option>
      <option id="other" value="Other">Other</option>
    </select>
  </div>
  <div class="form-item form-group form-item form-type-textfield form-group"> 
    <label class="control-label" for="department">Department <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="department" name="department" value="" size="60" maxlength="128" />
  </div>
  <div class="form-item form-group form-item form-type-textarea form-group"> 
    <label class="control-label" for="description">Details of your support request <span class="form-required" title="This field is required.">*</span></label>
    <div class="form-textarea-wrapper resizable"><textarea required="required" class="form-control form-textarea required" id="description" name="description" cols="60" rows="8"></textarea>
    </div>
  </div>
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

  <div class="form-actions" id="submit-div" style="margin-top:1rem;">
    <hr size="1" style="" />
    <button class="button-primary btn btn-primary form-submit" id="submit" type="submit" name="op" value="Submit">Submit</button>
  </div>

</div>
</form>

<script type="text/javascript" src="/js/captcha.js"></script>

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

var name_enc = getParams()["name"];
if (name_enc) {
  // do nothing
} else {
  $('#name').val('');
  $('#email').val('');
  $('#uid').val('');
  window.location.replace( "https://auth.uvasomrc.io/site/support.php" );
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

// category
let category = decodeURI(getParams()["category"]);
var set_category = document.getElementById("category").value = category;

// return message/status
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
