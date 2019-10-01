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
private = true
+++

<form action="https://api.uvarc.io/rest/general-support-request/" method="post" id="allocation-form" accept-charset="UTF-8">
<p id="form_post_response"></p>
<div>

  <input class="form-control form-text required" type="hidden" id="category" name="category" value="Rivanna HPC">
  <input class="form-control form-text required" type="hidden" id="allocation_type" name="Allocation Type" value="Purchase Service Units">

  {{% form-userinfo %}}

  <hr size=1 />

  <div class="form-item form-group" style="margin-top:2rem;margin-bottom:2rem;border:1px solid #ccc;padding:2rem;">
    <label class="control-label" style="">Allocation Pricing</label>
    <div class="help-block" style="font-size:85%;color:gray;" id="pricing">
      {{< allocation-pricing >}}
    </div>
  </div>

  <div class="form-item form-group form-item form-type-textfield form-group"> <label class="control-label" for="pi-name">Name of PI <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="pi-name" name="pi-name" value="" size="60" maxlength="80" />
  </div>

  <div class="form-item form-type-textfield form-group"> <label class="control-label" for="ptao">PTAO <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="ptao" name="ptao" value="" size="60" maxlength="128" />
  </div>

  <div class="form-item form-type-radios form-group"> 
    <label class="control-label" for="faculty-verify">Is the PI of your account a UVA faculty member? <span class="form-required" title="This field is required.">*</span></label>
    <div id="faculty-verify" class="form-radios">
      <div class="form-item form-type-radio radio"> <label class="control-label" for="faculty-verify-yes">
        <input required="required" type="radio" id="faculty-verify-yes" name="faculty-verify" value="yes" class="form-radio" /> &nbsp;Yes</label>
      </div>
      <div class="form-item form-type-radio radio"> <label class="control-label" for="faculty-verify-no">
        <input required="required" type="radio" id="faculty-verify-no" name="faculty-verify" value="no" class="form-radio" /> &nbsp;No</label>
        &nbsp;(Non-UVA personnel are chaged $0.07/SU)
      </div>
    </div>
  </div>

  <div class="form-item form-type-radios form-group"> <label class="control-label" for="research-verify">I agree that this allocation will be used for research purposes only <span class="form-required" title="This field is required.">*</span></label>
    <div id="research-verify" class="form-radios">
      <div class="form-item form-type-radio radio"> <label class="control-label" for="research-agree">
        <input required="required" type="radio" id="research-agree" name="research-verify" value="agree" class="form-radio" /> &nbsp;Agree</label>
      </div>
      <div class="form-item form-type-radio radio"> <label class="control-label" for="research-disagree">
        <input required="required" type="radio" id="research-disagree" name="research-verify" value="disagree" class="form-radio" /> &nbsp;Disagree</label>
      </div>
    </div>
  </div>

  <div class="form-item form-group form-item form-type-textfield form-group"> <label class="control-label" for="award-title">Title of Award (if applicable) </label>
    <input class="form-control form-text" type="text" id="award-title" name="award-title" value="" size="60" maxlength="128" />
  </div>

  <div class="row">
    <div class="col form-item form-type-textfield form-group"> <label class="control-label" for="sus-requested">Total number of SUs requested <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="form-control form-text required" type="number" id="sus-requested" name="sus-requested" value="" size="60" maxlength="128" onfocusout="figureTotal()" />
    </div>

    <div class="col form-item form-type-textfield form-group"> <label class="control-label" for="ptao-total">Total amount to be charged to PTAO <span class="form-required" title="This field is required.">*</span></label>
      <div>
        <div style="float:left;width:1.4rem;font-size:120%;padding-top:4px;margin:auto;">$</div>
        <input class="form-control form-text" type="text" id="ptao-total" name="ptao-total" value="0" size="60" maxlength="128" readonly style="text-align:right;width:90%;" />
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col form-item form-group form-item form-type-date form-group"> <label class="control-label" for="su-expires">SU expiration date (if applicable) </label>
      <input class="form-control form-date" type="date" id="su-expires" name="su-expires" value="" size="20" maxlength="20" />
    </div>

    <div class="col form-item form-type-textfield form-group"> <label class="control-label" for="su-allocation">Apply this purchase to which allocation <span class="form-required" title="This field is required.">*</span></label>
      <input required="required" class="form-control form-text required" type="text" id="su-allocation" name="su-allocation" value="" size="60" maxlength="128" />
    </div>
  </div>

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
    <hr size="1" style="" />
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

function figureTotal() {
  var total = document.getElementById('ptao-total');
  var sus = document.getElementById('sus-requested').value;
  var susi = parseInt(sus, 10);
  if ( susi < 1000000) {
    var sureq = sus * 0.015;
  } else {
    var sureq = sus * 0.01;
  }
  // if sus < 1M = 0.015 per
  // if sus >= 1M = 0.01 per
  var sutotal = parseInt(sureq, 10);
  total.value = sutotal;
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
  window.location.replace( "https://auth.uvasomrc.io/site/allocation-purchase.php" );
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
