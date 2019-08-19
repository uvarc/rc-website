+++
date = "2019-07-22T23:59:16-05:00"
tags = ["storage"]
categories = ["forms"]
images = [""]
author = "Staff"
description = ""
title = "Storage Request"
draft = false
type = "form"

+++

<script type="text/javascript" src="/js/typeahead.js"></script>

<form action="https://api.uvarc.io/rest/general-support-request/" method="post" id="storage-form" accept-charset="UTF-8">
<p id="form_post_response"></p>
<div>
  <div class="form-item form-group form-item form-item-submitted-name form-type-textfield form-group"> 
    <label class="control-label" for="name">Name <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="name" name="name" value="" size="60" maxlength="128" readonly />
    <input class="form-control form-text required" type="hidden" id="category" name="category" value="Storage">
  </div>

  <div class="row">
    <div class="col form-item form-group form-item form-item-submitted-e-mail form-type-webform-email form-group"> 
      <label class="control-label" for="email">E-mail <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="email form-control form-text form-email required" type="email" id="email" name="email" value="" size="60" readonly />
    </div>
    <div class="col form-item form-group form-item form-item-submitted-computing-id form-type-textfield form-group"> <label class="control-label" for="uid">Computing ID <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="form-control form-text required" type="text" id="uid" name="uid" value="" size="20" maxlength="20" readonly />
    </div>
  </div>

  <hr size=1 />

  <div class="form-item form-group form-type-select form-group"> 
    <label class="control-label" for="classification">Affiliation <span class="form-required" title="This field is required.">*</span></label>
    <select required="required" class="form-control form-select required" title="Please select the UVA school / department with which you are primarily affiliated." data-toggle="tooltip" id="classification" name="classification">
      <option value="" selected="selected">- Select -</option>
      <option value="cas">College of Arts & Sciences</option>
      <option value="seas">School of Engineering and Applied Sciences</option>
      <option value="dsi">Data Science Institute</option>
      <option value="som">School of Medicine</option>
      <option value="darden">Darden School of Business</option>
      <option value="health-system">UVA Health System</option>
      <option value="other">Other</option>
    </select>
  </div>

  <hr size=1 />

  <div class="row">
  <div class="col form-item form-group form-item form-type-radios form-group"> 
    <label class="control-label" for="type-of-request">Type of Request <span class="form-required" title="This field is required.">*</span></label>
    <div id="type-of-request" class="form-radios">
      <div class="form-item form-type-radio radio">
        <input required="required" type="radio" id="type-of-request-1" name="type-of-request" value="new-storage" class="form-radio" /> &nbsp; Create new storage share</label>
      </div>
      <div class="form-item form-type-radio radio">
        <input required="required" type="radio" id="type-of-request-2" name="type-of-request" value="increase-storage" class="form-radio" /> &nbsp; Increase size of existing share</label>
      </div>
      <div class="form-item form-type-radio radio">
        <input required="required" type="radio" id="type-of-request-3" name="type-of-request" value="decrease-storage" class="form-radio" /> &nbsp; Decrease size of existing share</label>
      </div>
      <div class="form-item form-type-radio radio">
        <input required="required" type="radio" id="type-of-request-4" name="type-of-request" value="retire-storage" class="form-radio" /> &nbsp; Retire existing share</label>
      </div>
    </div>
  </div>

  <div class="col form-item form-group form-item form-type-radios form-group"> 
    <label class="control-label" for="storage-options">Storage Platform <span class="form-required" title="This field is required.">*</span></label>
    <div id="storage-options" class="form-radios">
      <div class="form-item form-type-radio radio">
        <input required="required" type="radio" id="storage-choice1" name="storage-choice" value="project" class="form-radio" /> &nbsp; Project Storage ({{% storage-pricing project %}}/TB/year)</label>
      </div>
      <div class="form-item form-type-radio radio">
        <input required="required" type="radio" id="storage-choice3" name="storage-choice" value="value" class="form-radio" /> &nbsp; Value Storage ({{% storage-pricing value %}}/TB/year)</label>
      </div>
      <div class="form-item form-type-radio radio">
        <input required="required" type="radio" id="storage-choice4" name="storage-choice" value="zfs" class="form-radio" /> &nbsp; ZFS Storage ({{% storage-pricing zfs %}}/TB/year)</label>
      </div>
      <div class="form-item form-type-radio radio">
        <input required="required" type="radio" id="storage-choice2" name="storage-choice" value="ivy" class="form-radio" /> &nbsp; Ivy Central Storage ({{% storage-pricing ivy %}}/TB/year)</label>
      </div>
    </div>
  </div>
  </div>

  <hr size=1 />

  <div class="row">
    <div class="col form-item form-type-radios form-group"> 
      <label class="control-label" for="data-sensitivity">Data Sensitivity <span class="form-required" title="This field is required.">*</span></label>
      <div id="data-sensitivity" class="form-radios">
        <div class="form-item form-type-radio radio">
          <input required="required" type="radio" id="data-sensitivity-1" name="data-sensitivity" value="moderately-sensitive" class="form-radio" />&nbsp; Moderately sensitive / public</label>
        </div>
        <div class="form-item form-type-radio radio">
          <input required="required" type="radio" id="data-sensitivity-2" name="data-sensitivity" value="highly-sensitive" class="form-radio" />&nbsp; Highly Sensitive</label>
        </div>
      </div>
    </div>

    <div class="col form-item form-group"> 
      <label class="control-label" for="capacity">Space (TB) <span class="form-required" title="This field is required.">*</span></label>
      <input class="form-control required" type="number" min="1" max="100" required="required" id="capacity" name="capacity" value="0" style="width:8rem;" />
      <p class=tiny>Select an increment of 1TB.</p>
    </div>

  </div>

  <hr size=1 />

  <div class="row">
    <div id="group-selector" class="col form-item form-group form-item form-type-textarea form-group"> 
      <label class="control-label" for="mygroup-ownership">MyGroup Ownership <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="form-control form-text required typeahead" type="text" id="mygroup-ownership" name="mygroup-ownership" placeholder="Group Name" size="32" maxlength="32" style="width:14rem;font-family:courier;" />
      <p class=tiny>MyGroups name under your Eservices user ID. If you don’t have one, we can create one for you. You will have access to the MyGroups management and will be able to add/remove users for your project.</p>
    </div>

    <div class="col form-item form-type-textarea form-group"> 
      <label class="control-label" for="shared-space-name">Shared Space Name <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="form-control form-text required" type="text" id="shared-space-name" name="shared-space-name" value="" size="40" maxlength="40" style="width:14rem;font-family:courier;" />
      <p class=tiny>This is the name to be applied to your shared storage space. By default, the space will be named according to the MyGroups associated with the storage request. If you would prefer a different identifier, indicate the name for the space.</p>
    </div>

  </div>

  <hr size=1 />

  <div class="form-item form-group form-item form-type-textarea form-group"> 
    <label class="control-label" for="project-title">Project Title </label>
    <input class="form-control form-text required" type="text" id="project-title" name="project-title" value="" size="200" maxlength="200" />
  </div>

  <div class="form-item form-group form-item form-type-textarea form-group"> 
    <label class="control-label" for="project-summary">Project Summary </label>
    <div class="form-textarea-wrapper resizable"><textarea class="form-control form-textarea" id="project-summary" name="project-summary" cols="60" rows="5"></textarea>
    </div>
  </div>

  <div style="border:solid 1px #ccc;padding:2rem;margin-top:2rem;margin-bottom:2rem;background-color:#eee;">
    <h5>Grant Summary</h5>
    <div class="form-item form-type-textarea form-group"> 
      <label class="control-label" for="grant-agency">Grant Agency </label>
      <input class="form-control form-text required" type="text" id="grant-agency" name="grant-agency" value="" size="200" maxlength="200" />
    </div>

    <div class="form-item form-type-textarea form-group"> 
      <label class="control-label" for="grant-number">Grant Number </label>
      <input class="form-control form-text required" type="text" id="grant-number" name="grant-number" value="" size="200" maxlength="200" />
    </div>

  </div>

  <hr size=1 />

<label class="control-label" for="data-sensitivity-2">PTAO</label>

  <div class="row">
    <div class="col form-item form-type-textarea form-group">
      <input class="form-control form-text required" type="text" id="ptao1" name="ptao1" value="" size="10" maxlength="10" />
    </div>
    <div class="col form-item form-type-textarea form-group">
      <input class="form-control form-text required" type="text" id="ptao2" name="ptao2" value="" size="10" maxlength="10" />
    </div>
    <div class="col form-item form-type-textarea form-group">
      <input class="form-control form-text required" type="text" id="ptao3" name="ptao3" value="" size="10" maxlength="10" />
    </div>
    <div class="col form-item form-type-textarea form-group">
      <input class="form-control form-text required" type="text" id="ptao4" name="ptao4" value="" size="10" maxlength="10" />
    </div>
    <div class="col form-item form-type-textarea form-group">
    </div>
    <div class="col form-item form-type-textarea form-group">
    </div>
  </div>

  <div class="form-item form-type-textarea form-group"> 
    <label class="control-label" for="estimated-cost">Estimated Total Cost </label>
    <input class="form-control form-text required" type="text" id="estimated-cost" name="estimated-cost" value="$" size="200" maxlength="200" readonly style="width:20%;" />
  </div>

  <div class="form-item form-group form-item form-type-textarea form-group"> 
    <label class="control-label" for="financial-contact">Financial Contact </label>
    <input class="form-control form-text required" type="text" id="financial-contact" name="financial-contact" value="" size="200" maxlength="200" />
  </div>

  <hr size=1 style="margin-top:2rem;" />

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
  window.location.replace( "https://auth.uvasomrc.io/site/storage.php" );
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
