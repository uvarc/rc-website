+++
date = "2019-10-10T23:59:16-05:00"
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
<div class="alert alert-warning" id="response_message" role="alert" style="padding-bottom:0px;">
  <p id="form_post_response"></p>
</div>
<div>

{{% form-userinfo %}}

  <hr size=1 />

  <div class="form-item form-group form-item form-type-select form-group" style="margin-bottom:1.6rem;">
    <label class="control-label" for="category">Support Category <span class="form-required" title="This field is required.">*</span></label>
    <select required="required" class="dropdown form-control form-select required" title="Please select a general category for your support request. " data-toggle="tooltip" id="categories" name="categories">
      <option value="" selected="selected">- Select -</option>
      <option id="general" value="General">General research computing question</option>
      <option id="rivanna" value="Rivanna">Rivanna HPC</option>
      <option id="ivy" value="Ivy">Ivy secure computing</option>
      <option id="storage" value="Storage">Storage</option>
      <option id="consultation" value="Consultation">Consultation request</option>
      <option value="">-----</option>
      <option id="chase" value="Chase">CHASE Accounts/Data</option>
      <option id="sentinel" value="Sentinel">Sentinel System/Software</option>
      <option id="other" value="Other">Other</option>
    </select>
    <div id="rivanna-help" style="font-size:90%;" class="form-text text-muted">Use this form for general Rivanna support questions. Or submit an <a href="/userinfo/rivanna/allocations/" style="font-weight:bold;">Allocation Request</a>.</div>
    <div id="storage-help" style="font-size:90%;" class="form-text text-muted">Use this form for storage questions. Or submit a <a href="https://auth.uvasomrc.io/site/storage.php" style="font-weight:bold;">storage request</a>.</div>
    <div id="ivy-help" style="font-size:90%;" class="form-text text-muted">Use this form for general Ivy questions. Or submit an <a href="http://cadre.virginia.edu/node/add/account-request" style="font-weight:bold;">Ivy Project Request</a>.</div>
  </div>
  <div class="form-item form-type-textfield form-group">
    <label class="control-label" for="request_title">Brief description of your request <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="request_title" name="request_title" value="" size="60" maxlength="100" placeholder="What can we help you with?" />
  </div>
  <div class="form-item form-type-textfield form-group">
    <label class="control-label" for="department">Department/Organization <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="department" name="department" value="" size="60" maxlength="100"/>
  </div>
  <div class="form-item form-group form-item form-type-textarea form-group">
    <label class="control-label" for="description">Details of your request <span class="form-required" title="This field is required.">*</span> </label>
    <div class="form-textarea-wrapper resizable">
      <textarea required="required" class="form-control form-textarea required" id="description" name="description" cols="60" rows="8" maxlength="5000"></textarea>
      <div id="textarea_feedback" style="color:green;font-size:90%;margin-top:0.5rem;float:right;"></div>
    </div>
  <br clear=all />
  </div>

  <div class="form-actions" id="submit-div" style="margin-top:1rem;">
    <hr size="1" style="" />
    <button class="button-primary btn btn-primary form-submit" id="submit" type="submit" name="op" value="Submit">Submit</button>
  </div>

</div>
</form>

<script type="text/javascript" src="/js/support-request.js"></script>

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
if(category != undefined && category != "undefined") {
  var set_category = document.getElementById("categories").value = category;
}

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
