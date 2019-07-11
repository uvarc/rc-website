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

<script src="https://www.google.com/recaptcha/api.js" async defer></script>

<form action="https://api.uvarc.io/support" method="post" id="request-form" accept-charset="UTF-8">
<div>
  <div class="form-item form-group form-item form-type-textfield form-group"> <label class="control-label" for="submitted-name">Name <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="name" name="name" value="" size="60" maxlength="128" readonly />
  </div>

  <div class="row">
    <div class="col form-item form-group form-item form-item-submitted-e-mail form-type-webform-email form-group"> <label class="control-label" for="edit-submitted-e-mail">E-mail <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="email form-control form-text form-email required" type="email" id="email" name="email" value="" size="60" readonly />
    </div>
    <div class="col form-item form-group form-item form-item-submitted-computing-id form-type-textfield form-group"> <label class="control-label" for="edit-submitted-computing-id">Computing ID <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="form-control form-text required" type="text" id="uid" name="uid" value="" size="20" maxlength="20" readonly />
    </div>
  </div>
  <div class="form-item form-group form-item form-type-select form-group"> <label class="control-label" for="edit-submitted-classification">Support Category <span class="form-required" title="This field is required.">*</span></label>
    <select required="required" class="form-control form-select required" title="Please select a general category for your support request. " data-toggle="tooltip" id="category" name="category">
      <option value="" selected="selected"> - Select - </option>
      <option value="rivanna">Rivanna HPC</option>
      <option value="ivy">Ivy Secure Computing</option>
      <option value="software">Licensed Research Software</option>
      <option value="storage">Storage</option>
      <option value="consultation">Consultation Request</option>
      <option value="other">Other</option>
    </select>
  </div>
  <div class="form-item form-group form-item form-type-textfield form-group"> <label class="control-label" for="edit-submitted-department">Department <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="department" name="department" value="" size="60" maxlength="128" />
  </div>
  <div class="form-item form-group form-item form-type-textarea form-group"> <label class="control-label" for="edit-submitted-description-of-research-project">Details of your support request <span class="form-required" title="This field is required.">*</span></label>
    <div class="form-textarea-wrapper resizable"><textarea required="required" class="form-control form-textarea required" id="details" name="details" cols="60" rows="8"></textarea>
    </div>
  </div>
  <div class="form-item form-item-captcha-response form-type-textfield form-group"> <label class="control-label" for="edit-captcha-response">Are you a human? <span class="form-required" title="This field is required.">*</span></label>
    <div class="g-recaptcha" data-sitekey="6LdNnqwUAAAAAJR9L4Cl-q-AIhW12OGJ9-titSrl"></div>
    <div id="result-pane">Please verify the captcha</div>
  </div>
  <div class="form-actions">
    <button class="button-primary btn btn-primary form-submit" id="submit" type="submit" name="op" value="Submit">Submit</button>
  </div>
</div>
</form>

<div id="result-pane">
<h2>Thank you</h2>
  <p id="r_name"></p>
  <p id="r_email"></p>
</div>

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
  window.location.replace( "https://auth.uvasomrc.io/site/support.php" );
}

// name
var name_enc = getParams()["name"];
var name_esc = decodeURI(name_enc);
var form_name = decode64(name_esc);
var name_field = document.getElementById('name');
name_field.value = form_name;

// uid
var uid_enc = getParams()["uid"];
var uid_esc = decodeURI(uid_enc);
var form_uid = decode64(uid_esc);
var uid_field = document.getElementById('uid');
uid_field.value = form_uid;

// email
var email_enc = getParams()["email"];
var email_esc = decodeURI(email_enc);
var form_email = decode64(email_esc);
var email_field = document.getElementById('email');
email_field.value = form_email;

var rpane = document.getElementById('result-pane');
rpane.style.display = "none";
var form = document.getElementById('allocation-form');

// form.onsubmit = function(e) {
  // e.preventDefault();
  // var r_name = document.getElementById('r_name');
  // r_name.innerHTML = "Hello " + form.name.value;
  // var r_email = document.getElementById('r_email');
  // r_email.innerHTML = form.email.value;
  // this.reset();
  // rpane.style.display = "block";
  /// form.style.display = "none";
// }; 
</script>
