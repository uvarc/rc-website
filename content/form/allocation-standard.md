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

<form action="https://api.uvarc.io/rest/general-support-request/" method="post" id="request-form" accept-charset="UTF-8">
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
  <div class="form-item form-group form-type-radios form-group"> 
    <label class="control-label" for="new-or-renewal">New or Renewal <span class="form-required" title="This field is required.">*</span></label>
    <div class="row">
      <div id="new-or-renewal-options" class="form-radios col">
        <div class="form-item form-type-radio radio"> <label class="control-label" for="new-or-renewal-1">
          <input onclick="getStandardAllocType()" "required="required" type="radio" id="new-or-renewal-1" name="new-or-renewal" value="new" checked="checked" class="form-radio" />&nbsp;New</label>
        </div>
        <div class="form-item form-type-radio radio"> <label class="control-label" for="new-or-renewal-2">
          <input onclick="getStandardAllocType()" "required="required" type="radio" id="new-or-renewal-2" name="new-or-renewal" value="renewal" class="form-radio" />&nbsp;Renewal</label>
        </div>
      </div>
      <div class="help-block col">If this is your first request, select New.  Otherwise select Renewal.</div>
    </div>
    <div style="border: solid 1px #ccc; padding:1rem; background-color:#cae6d2; font-size:90%;" class="form-text text-muted">Standard allocations expire 12 months after they are disbursed.</div>
  </div>
  <div class="form-item form-group form-type-radios form-group"> <label class="control-label" for="yes-or-no">Will you be using <a style="font-weight:bold;" href="/userinfo/rivanna/software/vasp/">VASP</a> or <a style="font-weight:bold;" href="/userinfo/rivanna/software/gaussian/">Gaussian</a> on Rivanna? <span class="form-required" title="This field is required.">*</span></label>
    <div class="row">
      <div id="yes-or-no" class="form-radios col">
        <div class="form-item form-type-radio radio"> <label class="control-label" for="yes-or-no-1">
          <input required="required" type="radio" id="vasp-gaussian" name="vasp-gaussian" value="yes" class="form-radio" />&nbsp;Yes</label>
        </div>
        <div class="form-item form-type-radio radio"> <label class="control-label" for="yes-or-no-2">
          <input required="required" type="radio" id="vasp-gaussian" name="vasp-gaussian" value="no" checked="checked" class="form-radio" />&nbsp;No</label>
        </div>
      </div>
    </div>
  </div>
  <div class="form-item form-group form-type-radios form-group"> <label class="control-label" for="for-capstone">Is this allocation for a School of Data Science Capstone project? <span class="form-required" title="This field is required.">*</span></label>
    <div class="row">
      <div id="for-capstone" class="form-radios col">
        <div class="form-item form-type-radio radio"> <label class="control-label" for="for-capstone-yes">
          <input required="required" type="radio" id="for-capstone" name="for-capstone" value="yes" class="form-radio" />&nbsp;Yes</label>
        </div>
        <div class="form-item form-type-radio radio"> <label class="control-label" for="for-capstone-no">
          <input required="required" type="radio" id="for-capstone" name="for-capstone" value="no" checked="checked" class="form-radio" />&nbsp;No</label>
        </div>
      </div>
    </div>
  </div>
  
  <div class="form-item form-type-textarea form-group"> 
    <label class="control-label"  id="new-descr" for="project-description">Description of Research Project <span class="form-required" title="This field is required.">*</span></label>
    <label class="control-label"  id="renewal-descr" for="project-description">Briefly describe how you have used Rivanna in your research. Please include conference presentations, journal articles, other publications, or grant proposals that cite Rivanna. <span class="form-required" title="This field is required.">*</span></label>
    <div class="form-textarea-wrapper resizable"><textarea required="required" class="form-control form-textarea required" id="project-description" name="project-description" cols="60" rows="8"></textarea>
    </div>
  </div>
  
  <!--
  <div class="form-item project-description form-type-textarea form-group"> <label class="control-label" for="project-description">Description of Research Project <span class="form-required" title="This field is required.">*</span></label>
    <div class="form-textarea-wrapper resizable"><textarea required="required" class="form-control form-textarea required" id="project-description" name="project-description" cols="60" rows="8"></textarea>
    </div>
  </div>
  <div class="form-item form-type-textarea form-group"> <label class="control-label" for="renewal-description">For Renewals: Description of Results from Previous Allocation</label>
    <div class="form-textarea-wrapper resizable"><textarea class="form-control form-textarea" id="renewal-description" name="renewal-description" cols="60" rows="8"></textarea>
    </div>
  </div>
  -->  
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
    <p style="font-size:80%;">Please submit the form only once. If you receive an error message after submitting this request, please check your email to confirm that the submission completed.</p>
    <button class="button-primary btn btn-primary form-submit" id="submit" type="submit" name="op" value="Submit">Submit</button>
  </div>
</div>
</form>

<script type="text/javascript" src="/js/user-session.js"></script>
<script type="text/javascript" src="/js/response-message.js"></script>
<script type="text/javascript" src="/js/allocation-request.js"></script>

