+++
date = "2020-09-11"
tags = ["skyline","virtual machine"]
categories = ["forms"]
images = [""]
author = "Staff"
description = ""
title = "Skyline Virtual Machine Request"
draft = false
type = "form"
private = true
+++

{{< form-cookies >}}
<form action="https://api.uvarc.io/rest/general-support-request/" method="post" id="skyline-form" accept-charset="UTF-8">
<div>Skyline Virtual Machines (VMs) are designated for computation that involves public and moderately-sensitive data. <b>Processing of highly sensitive data is not permitted.</b> <a href="/userinfo/ivy/overview">Learn about our Ivy environment</a> for processing and storage of highly sensitive data that have HIPAA, ITAR, or CUI requirements.
</div>
<div class="alert" id="response_message" role="alert" style="padding-bottom:0px;">
  <p id="form_post_response"></p>
</div>
<div>
  <input type="hidden" id="category" name="category" value="Skyline">
  <input type="hidden" id="request_title" name="request_title" value="Skyline VM Service Request" />
{{% form-userinfo %}}
  <hr size=1 />
  <div class="form-item form-group form-item form-type-select form-group"> <label class="control-label" for="classification">Classification <span class="form-required" title="This field is required.">*</span></label>
    <select required="required" class="form-control form-select required" title="Faculty, postdoctoral associates, and full-time research staff are eligible to request allocations.  " data-toggle="tooltip" id="classification" name="classification"><option value="" selected="selected">- Select -</option><option value="faculty">Faculty</option><option value="staff">Staff</option><option value="postdoc">Postdoctoral Associate</option><option value="other">Other</option></select>
  </div>
  <div class="form-item form-group form-type-select form-group"> 
    <label class="control-label" for="classification">Affiliation <span class="form-required" title="This field is required.">*</span></label>
    <select required="required" class="form-control form-select required" title="Please select the UVA school / department with which you are primarily affiliated." data-toggle="tooltip" id="classification" name="classification">
      <option value="" selected="selected">- Select -</option>
      <option value="cas">College of Arts & Sciences</option>
      <option value="dsi">School of Data Science</option>
      <option value="seas">School of Engineering and Applied Sciences</option>
      <option value="som">School of Medicine</option>
      <option value="darden">Darden School of Business</option>
      <option value="health-system">UVA Health System</option>
      <option value="other">Other</option>
    </select>
  </div>
  <hr size=1 />
  <div class="form-item form-group form-item form-type-textarea form-group"> 
    <label class="control-label" for="project-summary">Project Summary </label>
    <div class="form-textarea-wrapper resizable"><textarea class="form-control form-textarea" id="project-summary" name="project-summary" cols="60" rows="10"></textarea>
    </div>
    <small id="project-summary-Help" class="form-text text-muted">Please describe your project and the software you intend to use on your Skyline VM. </small>
  </div>
  <hr size=1 />
  <div class="row">
  <div class="col form-item form-group form-item form-type-radios form-group"> 
    <label class="control-label" for="type-of-request">VM Configuration <span class="form-required" title="This field is required.">*</span></label>
    <div id="type-of-request" class="form-radios">
      <div class="form-item form-type-radio radio">
        <input required="required" type="radio" id="tier-1" name="skyline-tier" value="skyline-tier-mini" class="form-radio" /> &nbsp; 2 cpu cores / 2GB memory ($4/month)</label>
      </div>
      <div class="form-item form-type-radio radio">
        <input required="required" type="radio" id="tier-2" name="skyline-tier" value="skyline-tier-small" class="form-radio" /> &nbsp; 4 cpu cores / 16GB memory ($12/month)</label>
      </div>
      <div class="form-item form-type-radio radio">
        <input required="required" type="radio" id="tier-3" name="skyline-tier" value="skyline-tier-medium" class="form-radio" /> &nbsp; 8 cpu cores / 32GB memory ($48/month)</label>
      </div>
      <div class="form-item form-type-radio radio">
        <input required="required" type="radio" id="tier-4" name="skyline-tier" value="skyline-tier-large" class="form-radio" /> &nbsp; 16 cpu cores / 64GB memory ($96/month)</label>
      </div>
      <div class="form-item form-type-radio radio">
        <input required="required" type="radio" id="tier-5" name="skyline-tier" value="skyline-tier-xlarge" class="form-radio" /> &nbsp; 16 cpu cores / 124GB memory ($176/month)</label>
      </div>
    </div>
  </div>
  </div>
  <div class="row">
  <div class="col form-item form-group form-item form-type-radios form-group"> 
    <label class="control-label" for="type-of-request">Operating System <span class="form-required" title="This field is required.">*</span></label>
    <div id="type-of-request" class="form-radios">
      <div class="form-item form-type-radio radio">
        <input required="required" type="radio" id="os-windows" name="skyline-os" value="Windows" class="form-radio" /> &nbsp; Windows </label>
      </div>
      <div class="form-item form-type-radio radio">
        <input required="required" type="radio" id="os-linux" name="skyline-os" value="CentOS" class="form-radio" /> &nbsp; Linux CentOS</label>
      </div>
    </div>
  </div>
  </div>
  <div style="font-size:90%;" class="alert alert-success"><b>Billing Tiers</b> are selected and paid for by the PI. Submit this form again if you wish to change your VM configuration.</div>
  <hr size=1 />
  <label class="control-label" for="data-sensitivity-2">PTAO <span class="form-required" title="This field is required.">*</span></label>
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
  <div class="form-item form-group form-type-textarea"> 
    <label class="control-label" for="financial-contact">Financial Contact <span class="form-required" title="This field is required.">*</span></label>
    <input class="form-control form-text required" type="text" id="financial-contact" name="financial-contact" value="" size="200" maxlength="200" />
    <small id="financialContactHelp" class="form-text text-muted">Please enter the name and email address of your financial contact.</small>
  </div>
  <hr size=1 />
  <div class="form-check form-item form-group">
    <label class="control-label" for="data-agreement">Data Agreement <span class="form-required" title="This field is required.">*</span></label>
    <label class="form-check-label" for="data-agreement">
      The owner of these services assumes all responsibility for complying with state, federal, and international data retention laws. Researchers may be required to keep data securely stored for years after a project has ended and should plan accordingly. University of Virginia researchers are strongly encouraged to use the <a href="https://recordsmanagement.virginia.edu/urma/overview" target="_new" style="font-weight:bold;">University Records Management Application (URMA)</a>, a web-based tool that automatically tracks when data can be safely transferred or destroyed.
    </label>
  </div>
  <div class="form-item form-group">
    <input class="form-check-input required" style="margin-left:4rem;" type="checkbox" value="" id="data-agreement">&nbsp;&nbsp; I understand
  </div>
  <div class="form-actions" id="submit-div" style="margin-top:1rem;">
    <hr size="1" style="" />
    <button class="button-primary btn btn-primary form-submit" id="submit" type="submit" name="op" value="Submit" disabled>Submit</button>
  </div>
</div>
</form>
<div>
</div>

<script>
$('form').submit(function() {
  $(this).find("button[type='submit']").prop('disabled',true);
});

//Add a JQuery click event handler onto our checkbox.
$('#data-agreement').click(function(){
    //If the checkbox is checked.
    if($(this).is(':checked')){
        //Enable the submit button.
        $('#submit').attr("disabled", false);
    } else{
        //If it is not checked, disable the button.
        $('#submit').attr("disabled", true);
    }
});

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
var cookie_token = getCookie("__user_token");
var url_user_token = getParams()["user_token"];
if (cookie_token !== url_user_token) {
  window.location.replace( "https://auth.uvasomrc.io/site/skyline.php?user_token=" + cookie_token ); -->
}
var name_enc = getParams()["name"];
if (name_enc) {
  // do nothing
} else {
  $('#name').val('');
  $('#email').val('');
  $('#uid').val('');
  window.location.replace( "https://auth.uvasomrc.io/site/skyline.php?user_token=" + cookie_token ); -->
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
