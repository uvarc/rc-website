+++
date = "2019-06-30T23:59:16-05:00"
tags = ["search"]
categories = ["forms"]
images = [""]
author = "Staff"
description = ""
title = "Purchase Service Units"
draft = false
type = "form"

+++

<form action="https://api.uvarc.io/rest/general-support-request/" method="post" id="allocation-form" accept-charset="UTF-8">
<p id="form_post_response"></p>
<div>
  <div class="form-item form-group form-item form-item-submitted-name form-type-textfield form-group"> <label class="control-label" for="edit-submitted-name">Name <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="name" name="name" value="" size="60" maxlength="128" readonly />
    <input class="form-control form-text required" type="hidden" id="category" name="category" value="Rivanna HPC">
    <input class="form-control form-text required" type="hidden" id="allocation_type" name="Allocation Type" value="Purchase Service Units">
  </div>

  <div class="row">
    <div class="col form-item form-group form-item form-item-submitted-e-mail form-type-webform-email form-group"> <label class="control-label" for="edit-submitted-e-mail">E-mail <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="email form-control form-text form-email required" type="email" id="email" name="email" value="" size="60" readonly />
    </div>
    <div class="col form-item form-group form-item form-item-submitted-computing-id form-type-textfield form-group"> <label class="control-label" for="edit-submitted-computing-id">Computing ID <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="form-control form-text required" type="text" id="uid" name="uid" value="" size="20" maxlength="20" readonly />
    </div>
  </div>

  <div class="form-item form-group form-item form-type-textfield form-group"> <label class="control-label" for="edit-submitted-ptao">PTAO <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="edit-submitted-ptao" name="ptao" value="" size="60" maxlength="128" />
  </div>

  <div class="form-item form-group form-item form-item-submitted-new-or-renewal form-type-radios form-group"> <label class="control-label" for="edit-submitted-new-or-renewal">Are you requesting use of Rivanna's GPU nodes? <span class="form-required" title="This field is required.">*</span></label>
    <div id="edit-submitted-new-or-renewal" class="form-radios">
      <div class="form-item form-item-submitted-new-or-renewal form-type-radio radio"> <label class="control-label" for="edit-submitted-new-or-renewal-1">
        <input required="required" type="radio" id="research-agree" name="research-verify" value="agree" class="form-radio" /> &nbsp;Yes</label>
      </div>
      <div class="form-item form-item-submitted-new-or-renewal form-type-radio radio"> <label class="control-label" for="edit-submitted-new-or-renewal-2">
        <input required="required" type="radio" id="research-disagree" name="research-verify" value="renewal" class="form-radio" /> &nbsp;No</label>
      </div>
    </div>
  </div>

  <div class="form-item form-group form-item form-item-submitted-new-or-renewal form-type-radios form-group"> <label class="control-label" for="edit-submitted-new-or-renewal">Is the PI of your account a UVA faculty member? <span class="form-required" title="This field is required.">*</span></label>
    <div id="edit-submitted-new-or-renewal" class="form-radios">
      <div class="form-item form-item-submitted-new-or-renewal form-type-radio radio"> <label class="control-label" for="edit-submitted-new-or-renewal-1">
        <input required="required" type="radio" id="research-agree" name="research-verify" value="agree" class="form-radio" /> &nbsp;Yes</label>
      </div>
      <div class="form-item form-item-submitted-new-or-renewal form-type-radio radio"> <label class="control-label" for="edit-submitted-new-or-renewal-2">
        <input required="required" type="radio" id="research-disagree" name="research-verify" value="renewal" class="form-radio" /> &nbsp;No</label>
      </div>
    </div>
    <div class="help-block" style="font-size:85%;color:gray;">
      For use of standard nodes, UVA PIs are charged $0.015 per SU for <1 million SUs and $0.01 per SU for 1 million or more SUs. Non-UVA researchers are charged $0.07 per SU. For use of GPU nodes, UVA PIs are charged $0.03 per SU for <1 million SUs and $0.025 per SU for 1 million or more SUs. Non-UVA researchers are charged $0.10 per SU.
    </div>
  </div>

  <div class="form-item form-group form-item form-type-textfield form-group"> <label class="control-label" for="edit-submitted-pi">Name of PI <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="edit-submitted-pi" name="pi" value="" size="60" maxlength="128" />
  </div>

  <div class="form-item form-group form-item form-item-submitted-new-or-renewal form-type-radios form-group"> <label class="control-label" for="edit-submitted-new-or-renewal">I agree that this allocation will be used for research purposes only <span class="form-required" title="This field is required.">*</span></label>
    <div id="edit-submitted-new-or-renewal" class="form-radios">
      <div class="form-item form-item-submitted-new-or-renewal form-type-radio radio"> <label class="control-label" for="edit-submitted-new-or-renewal-1">
        <input required="required" type="radio" id="research-agree" name="research-verify" value="agree" class="form-radio" /> &nbsp;Agree</label>
      </div>
      <div class="form-item form-item-submitted-new-or-renewal form-type-radio radio"> <label class="control-label" for="edit-submitted-new-or-renewal-2">
        <input required="required" type="radio" id="research-disagree" name="research-verify" value="renewal" class="form-radio" /> &nbsp;Disagree</label>
      </div>
    </div>
  </div>

  <div class="form-item form-group form-item form-type-textfield form-group"> <label class="control-label" for="edit-submitted-pi">Title of Award (if applicable) <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="edit-submitted-pi" name="pi" value="" size="60" maxlength="128" />
  </div>

  <div class="form-item form-group form-item form-type-textfield form-group"> <label class="control-label" for="edit-submitted-pi">Total number of SUs requested <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="edit-submitted-pi" name="pi" value="" size="60" maxlength="128" />
  </div>

  <div class="form-item form-group form-item form-type-textfield form-group"> <label class="control-label" for="edit-submitted-pi">Total amount to be charged to PTAO <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="edit-submitted-pi" name="pi" value="" size="60" maxlength="128" />
  </div>

  <div class="form-item form-group form-item form-type-textfield form-group"> <label class="control-label" for="edit-submitted-pi">SU expiration date (if applicable) </label>
    <input class="form-control form-text" type="text" id="edit-submitted-pi" name="pi" value="" size="60" maxlength="128" />
  </div>

  <div class="form-item form-group form-item form-type-textfield form-group"> <label class="control-label" for="edit-submitted-pi">Name of allocation to which purchase should be applied <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="edit-submitted-pi" name="pi" value="" size="60" maxlength="128" />
  </div>

  <hr size=1 />
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
    <button class="button-primary btn btn-primary form-submit" type="submit" name="op" value="Submit">Submit</button>
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

var form = document.getElementById('allocation-form');

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
form.onsubmit = function(e) {
  e.preventDefault();
  var r_name = document.getElementById('r_name');
  r_name.innerHTML = "Hello " + form.name.value;
  var r_email = document.getElementById('r_email');
  r_email.innerHTML = form.email.value;
  this.reset();
  rpane.style.display = "block";
  form.style.display = "none";
};

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
