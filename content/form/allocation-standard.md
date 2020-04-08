+++
date = "2017-12-31T23:59:16-05:00"
tags = ["search"]
categories = ["forms"]
images = [""]
author = "Staff"
description = ""
title = "Request or Renew a Standard Allocation"
draft = false
type = "form"
private = true

+++

{{< form-cookies >}}

<form action="https://api.uvarc.io/rest/general-support-request/" method="post" id="allocation-form" accept-charset="UTF-8">
<div class="alert" id="response_message" role="alert" style="padding-bottom:0px;">
  <p id="form_post_response"></p>
</div>
<div>

  <input type="hidden" id="category" name="category" value="Rivanna HPC">
  <input type="hidden" id="allocation_type" name="Allocation Type" value="Request or Renew a Standard Allocation">
  <input type="hidden" id="request_title" name="request_title" value="Allocation Request: Standard" />

  {{% form-userinfo %}}

  <hr size=1 />

  <div class="form-item form-group form-item form-type-select form-group"> <label class="control-label" for="classification">Classification <span class="form-required" title="This field is required.">*</span></label>
    <select required="required" class="form-control form-select required" title="Faculty, postdoctoral associates, and full-time research staff are eligible to request allocations.  " data-toggle="tooltip" id="classification" name="classification"><option value="" selected="selected">- Select -</option><option value="faculty">Faculty</option><option value="staff">Staff</option><option value="postdoc">Postdoctoral Associate</option><option value="other">Other</option></select>
  </div>

  <div class="form-item form-group form-item form-type-textfield form-group"> <label class="control-label" for="department">Department <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="department" name="department" value="" size="60" maxlength="128" />
  </div>

  <div class="form-item form-group form-item form-type-textfield form-group"> <label class="control-label" for="mygroups-group">Name of MyGroups Account (lowercase only, no spaces) <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="mygroups-group" name="mygroups-group" value="" size="60" maxlength="128" />
  </div>

  <div class="form-item form-group form-item add-uids form-type-textarea form-group"> <label class="control-label" for="add-uids">Others to be Added to MyGroups Account (UVA computing IDs separated by commas)</label>
    <div class="form-textarea-wrapper resizable"><textarea class="form-control form-textarea" id="add-uids" name="add-uids" cols="60" rows="3"></textarea>
    </div>
  </div>

  <div class="form-item form-group form-type-radios form-group"> <label class="control-label" for="new-or-renewal">New or Renewal <span class="form-required" title="This field is required.">*</span></label>
    <div class="row">
      <div id="new-or-renewal" class="form-radios col">
        <div class="form-item form-type-radio radio"> <label class="control-label" for="new-or-renewal-1">
          <input required="required" type="radio" id="new-or-renewal-1" name="new-or-renewal" value="new" checked="checked" class="form-radio" />&nbsp;New</label>
        </div>
        <div class="form-item form-type-radio radio"> <label class="control-label" for="new-or-renewal-2">
          <input required="required" type="radio" id="new-or-renewal-2" name="new-or-renewal" value="renewal" class="form-radio" />&nbsp;Renewal</label>
        </div>
      </div>
      <div class="help-block col">If this is your first request, select New.  Otherwise select Renewal.</div>
    </div>
  </div>

    <div class="form-item form-group form-type-radios form-group"> <label class="control-label" for="yes-or-no">Will you be using VASP or Gaussian on Rivanna? <span class="form-required" title="This field is required.">*</span></label>
    <div class="row">
      <div id="yes-or-no" class="form-radios col">
        <div class="form-item form-type-radio radio"> <label class="control-label" for="yes-or-no-1">
          <input required="required" type="radio" id="vasp-gaussian" name="vasp-gaussian" value="yes" checked="checked" class="form-radio" />&nbsp;Yes</label>
        </div>
        <div class="form-item form-type-radio radio"> <label class="control-label" for="yes-or-no-2">
          <input required="required" type="radio" id="vasp-gaussian" name="vasp-gaussian" value="no" class="form-radio" />&nbsp;No</label>
        </div>
      </div>
    </div>
  </div>

  <div class="form-item project-description form-type-textarea form-group"> <label class="control-label" for="project-description">Description of Research Project <span class="form-required" title="This field is required.">*</span></label>
    <div class="form-textarea-wrapper resizable"><textarea required="required" class="form-control form-textarea required" id="project-description" name="project-description" cols="60" rows="8"></textarea>
    </div>
  </div>
  <div class="form-item form-type-textarea form-group"> <label class="control-label" for="renewal-description">For Renewals: Description of Results from Previous Allocation</label>
    <div class="form-textarea-wrapper resizable"><textarea class="form-control form-textarea" id="renewal-description" name="renewal-description" cols="60" rows="8"></textarea>
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

var cookie_token = getCookie("__user_token");
var url_user_token = getParams()["user_token"];

if (cookie_token !== url_user_token) {
  window.location.replace( "https://auth.uvasomrc.io/site/allocation-standard.php?user_token=" + cookie_token );
}

var name_enc = getParams()["name"];
if (name_enc) {
  // do nothing
} else {
  $('#name').val('');
  $('#email').val('');
  $('#uid').val('');
  window.location.replace( "https://auth.uvasomrc.io/site/allocation-standard.php?user_token=" + cookie_token );
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

</script>
<script type="text/javascript" src="/js/response-message.js"></script>
