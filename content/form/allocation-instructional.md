+++
date = "2016-12-31T23:59:16-05:00"
tags = ["search"]
categories = ["forms"]
images = [""]
author = "Staff"
description = ""
title = "Request an Instructional Allocation"
draft = false
type = "form"

+++

<script src="https://www.google.com/recaptcha/api.js" async defer></script>

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

  <div class="form-item form-group form-item form-item-submitted-classification form-type-select form-group"> <label class="control-label" for="edit-submitted-classification">Classification <span class="form-required" title="This field is required.">*</span></label>
    <select required="required" class="form-control form-select required" title="Faculty, postdoctoral associates, and full-time research staff are eligible to request allocations.  " data-toggle="tooltip" id="edit-submitted-classification" name="submitted[classification]"><option value="" selected="selected">- Select -</option><option value="faculty">Faculty</option><option value="staff">Staff</option><option value="postdoc">Postdoctoral Associate</option><option value="other">Other</option></select>
  </div>
  <div class="form-item form-group form-item form-item-submitted-department form-type-textfield form-group"> <label class="control-label" for="edit-submitted-department">Department <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="edit-submitted-department" name="submitted[department]" value="" size="60" maxlength="128" />
  </div>
  <div class="form-item form-group form-item form-item-submitted-name-of-mygroups-group form-type-textfield form-group"> <label class="control-label" for="edit-submitted-name-of-mygroups-group">Name of MyGroups Account (lowercase only, no spaces) <span class="form-required" title="This field is required.">*</span></label>
    <input required="required" class="form-control form-text required" type="text" id="edit-submitted-name-of-mygroups-group" name="submitted[name_of_mygroups_group]" value="" size="60" maxlength="128" />
  </div>
  <div class="form-item form-group form-item form-item-submitted-others-to-be-added-to-mygroups-account-uva-computing-ids-separated-by-commas form-type-textarea form-group"> <label class="control-label" for="edit-submitted-others-to-be-added-to-mygroups-account-uva-computing-ids-separated-by-commas">Others to be Added to MyGroups Account (UVA computing IDs separated by commas)</label>
    <div class="form-textarea-wrapper resizable"><textarea class="form-control form-textarea" id="edit-submitted-others-to-be-added-to-mygroups-account-uva-computing-ids-separated-by-commas" name="submitted[others_to_be_added_to_mygroups_account_uva_computing_ids_separated_by_commas]" cols="60" rows="5"></textarea>
    </div>
  </div>
  <div class="form-item form-group form-item form-item-submitted-new-or-renewal form-type-radios form-group"> <label class="control-label" for="edit-submitted-new-or-renewal">New or Renewal <span class="form-required" title="This field is required.">*</span></label>
    <div id="edit-submitted-new-or-renewal" class="form-radios"><div class="form-item form-item-submitted-new-or-renewal form-type-radio radio"> <label class="control-label" for="edit-submitted-new-or-renewal-1"><input required="required" type="radio" id="edit-submitted-new-or-renewal-1" name="submitted[new_or_renewal]" value="new" checked="checked" class="form-radio" />New</label>
    </div>
    <div class="form-item form-item-submitted-new-or-renewal form-type-radio radio"> <label class="control-label" for="edit-submitted-new-or-renewal-2"><input required="required" type="radio" id="edit-submitted-new-or-renewal-2" name="submitted[new_or_renewal]" value="renewal" class="form-radio" />Renewal</label>
    </div>
  </div>
  <div class="help-block">If this is your first request, select New.  Otherwise select Renewal.
  </div>
  </div>
  <div class="form-item form-group form-item form-item-submitted-description-of-research-project form-type-textarea form-group"> <label class="control-label" for="edit-submitted-description-of-research-project">Description of Research Project <span class="form-required" title="This field is required.">*</span></label>
  <div class="form-textarea-wrapper resizable"><textarea required="required" class="form-control form-textarea required" id="edit-submitted-description-of-research-project" name="submitted[description_of_research_project]" cols="60" rows="5"></textarea>
  </div>
  </div>
  <div class="form-item form-group form-item form-item-submitted-for-renewals-description-of-results-from-previous-allocation form-type-textarea form-group"> <label class="control-label" for="edit-submitted-for-renewals-description-of-results-from-previous-allocation">For Renewals: Description of Results from Previous Allocation</label>
  <div class="form-textarea-wrapper resizable"><textarea class="form-control form-textarea" id="edit-submitted-for-renewals-description-of-results-from-previous-allocation" name="submitted[for_renewals_description_of_results_from_previous_allocation]" cols="60" rows="5"></textarea>
  </div>
  </div>
  <input type="hidden" name="details[sid]" />
  <div class="form-item form-item-captcha-response form-type-textfield form-group"> <label class="control-label" for="edit-captcha-response">Are you a human? <span class="form-required" title="This field is required.">*</span></label>
    <div class="g-recaptcha" data-sitekey="6LdNnqwUAAAAAJR9L4Cl-q-AIhW12OGJ9-titSrl"></div>
  </div>
  <div class="form-actions">
    <button class="button-primary btn btn-primary form-submit" type="submit" name="op" value="Submit">Submit</button>
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
</script>
