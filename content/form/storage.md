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

<form action="https://api.uvarc.io/" method="post" id="allocation-form" accept-charset="UTF-8">
<div>
  <div class="form-item form-group form-item form-item-submitted-name form-type-textfield form-group"> <label class="control-label" for="edit-submitted-name">Name <span class="form-required" title="This field is required.">*</span></label>
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

  <hr size=1 />

  <div class="form-item form-group form-item form-item-submitted-classification form-type-select form-group"> <label class="control-label" for="edit-submitted-classification">Affiliation <span class="form-required" title="This field is required.">*</span></label>
    <select required="required" class="form-control form-select required" title="Please select the UVA school / department with which you are primarily affiliated." data-toggle="tooltip" id="edit-submitted-classification" name="submitted[classification]">
      <option value="" selected="selected">- Select -</option>
      <option value="cas">College of Arts & Sciences</option>
      <option value="ceas">College of Engineering and Applied Sciences</option>
      <option value="dsi">Data Science Institute</option>
      <option value="som">School of Medicine</option>
      <option value="darden">Darden School of Business</option>
      <option value="health-system">UVA Health System</option>
      <option value="other">Other</option>
    </select>
  </div>

  <hr size=1 />

  <div class="form-item form-group form-item form-item-submitted-new-or-renewal form-type-radios form-group"> <label class="control-label" for="edit-submitted-new-or-renewal">Data Sensitivity <span class="form-required" title="This field is required.">*</span></label>
    <div id="edit-submitted-new-or-renewal" class="form-radios">
      <div class="form-item form-item-submitted-new-or-renewal form-type-radio radio"> <label class="control-label" for="edit-submitted-new-or-renewal-1">
        <input required="required" type="radio" id="edit-submitted-new-or-renewal-1" name="submitted[new_or_renewal]" value="new" checked="checked" class="form-radio" />&nbsp;Highly Sensitive</label>
      </div>
      <div class="form-item form-item-submitted-new-or-renewal form-type-radio radio"> <label class="control-label" for="edit-submitted-new-or-renewal-2">
        <input required="required" type="radio" id="edit-submitted-new-or-renewal-2" name="submitted[new_or_renewal]" value="renewal" class="form-radio" />&nbsp;Moderately sensitive / public</label>
      </div>
    </div>
  </div>

  <hr size=1 />

  <div class="form-item form-group form-item form-item-submitted-new-or-renewal form-type-radios form-group"> <label class="control-label" for="edit-submitted-new-or-renewal">Storage Platform <span class="form-required" title="This field is required.">*</span></label>
    <div id="edit-submitted-new-or-renewal" class="form-radios">
      <div class="form-item form-item-submitted-new-or-renewal form-type-radio radio"> <label class="control-label" for="edit-submitted-new-or-renewal-1">
        <input required="required" type="radio" id="edit-submitted-new-or-renewal-1" name="submitted[new_or_renewal]" value="project" class="form-radio" /> &nbsp; Project Storage</label>
      </div>
      <div class="form-item form-item-submitted-new-or-renewal form-type-radio radio"> <label class="control-label" for="edit-submitted-new-or-renewal-2">
        <input required="required" type="radio" id="edit-submitted-new-or-renewal-2" name="submitted[new_or_renewal]" value="zfs" class="form-radio" /> &nbsp; ZFS Storage</label>
      </div>
      <div class="form-item form-item-submitted-new-or-renewal form-type-radio radio"> <label class="control-label" for="edit-submitted-new-or-renewal-3">
        <input required="required" type="radio" id="edit-submitted-new-or-renewal-3" name="submitted[new_or_renewal]" value="value" class="form-radio" /> &nbsp; Value Storage</label>
      </div>
    </div>
  </div>

  <hr size=1 />

  <div class="form-item form-group form-item form-item-submitted-description-of-research-project form-type-textarea form-group"> <label class="control-label" for="edit-submitted-description-of-research-project">Space (TB) <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="uid" name="uid" value="" size="8" maxlength="8" style="width:10rem;" />
  </div>

  <hr size=1 />

  <div class="form-item form-group form-item form-item-submitted-description-of-research-project form-type-textarea form-group"> <label class="control-label" for="edit-submitted-description-of-research-project">MyGroup Ownership <span class="form-required" title="This field is required.">*</span></label>
    <p>MyGroups name under your Eservices user ID. If you don’t have one, we can create one for you. You will have access to the MyGroups management and will be able to add/remove users for your project.</p>
    <input required="required" class="form-control form-text required" type="text" id="uid" name="uid" value="" size="8" maxlength="8" style="width:10rem;" />
  </div>

  <hr size=1 />

  <div class="form-item form-group form-item form-item-submitted-description-of-research-project form-type-textarea form-group"> <label class="control-label" for="edit-submitted-description-of-research-project">Shared Space Name <span class="form-required" title="This field is required.">*</span></label>
    <p>This is the name to be applied to your shared storage space. By default, the space will be named according to the MyGroups associated with the storage request. If you would prefer a different identifier, indicate the name for the space.</p>
    <input required="required" class="form-control form-text required" type="text" id="uid" name="uid" value="" size="8" maxlength="8" style="width:10rem;" />
  </div>

  <hr size=1 />

  <div class="form-item form-group form-item form-item-submitted-description-of-research-project form-type-textarea form-group"> <label class="control-label" for="edit-submitted-description-of-research-project">Project Title </label>
    <input class="form-control form-text required" type="text" id="uid" name="uid" value="" size="200" maxlength="200" />
  </div>

  <div class="form-item form-group form-item form-item-submitted-for-renewals-description-of-results-from-previous-allocation form-type-textarea form-group"> <label class="control-label" for="edit-submitted-for-renewals-description-of-results-from-previous-allocation">Project Summary </label>
    <div class="form-textarea-wrapper resizable"><textarea class="form-control form-textarea" id="edit-submitted-for-renewals-description-of-results-from-previous-allocation" name="submitted[for_renewals_description_of_results_from_previous_allocation]" cols="60" rows="5"></textarea>
    </div>
  </div>


  <div style="border:solid 1px #ccc;padding:2rem;margin-top:2rem;margin-bottom:2rem;background-color:#eee;">
    <h5>Grant Summary</h5>
    <div class="form-item form-group form-item form-item-submitted-description-of-research-project form-type-textarea form-group"> <label class="control-label" for="edit-submitted-description-of-research-project">Grant Agency </label>
      <input class="form-control form-text required" type="text" id="uid" name="uid" value="" size="200" maxlength="200" />
    </div>

    <div class="form-item form-group form-item form-item-submitted-description-of-research-project form-type-textarea form-group"> <label class="control-label" for="edit-submitted-description-of-research-project">Grant Number </label>
      <input class="form-control form-text required" type="text" id="uid" name="uid" value="" size="200" maxlength="200" />
    </div>
  </div>

  <hr size=1 />

  <p>PTAO</p>
  <div class="row">
    <div class="col form-item form-group form-item form-item-submitted-description-of-research-project form-type-textarea form-group">
      <input class="form-control form-text required" type="text" id="uid" name="uid" value="" size="200" maxlength="200" />
    </div>
    <div class="col form-item form-group form-item form-item-submitted-description-of-research-project form-type-textarea form-group">
      <input class="form-control form-text required" type="text" id="uid" name="uid" value="" size="200" maxlength="200" />
    </div>
    <div class="col form-item form-group form-item form-item-submitted-description-of-research-project form-type-textarea form-group">
      <input class="form-control form-text required" type="text" id="uid" name="uid" value="" size="200" maxlength="200" />
    </div>
    <div class="col form-item form-group form-item form-item-submitted-description-of-research-project form-type-textarea form-group">
      <input class="form-control form-text required" type="text" id="uid" name="uid" value="" size="200" maxlength="200" />
    </div>
    <div class="col form-item form-group form-item form-item-submitted-description-of-research-project form-type-textarea form-group">
    </div>
    <div class="col form-item form-group form-item form-item-submitted-description-of-research-project form-type-textarea form-group">
    </div>
  </div>

  <div class="form-item form-group form-item form-item-submitted-description-of-research-project form-type-textarea form-group"> <label class="control-label" for="edit-submitted-description-of-research-project">Financial Contact </label>
    <input class="form-control form-text required" type="text" id="uid" name="uid" value="" size="200" maxlength="200" />
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

var form = document.getElementById('request-form');

var name_enc = getParams()["name"];
if (name_enc) {
  // do nothing
} else {
  window.location.replace( "https://auth.uvasomrc.io/site/storage.php" );
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

</script>
