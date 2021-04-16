+++
date = "2021-04-10T23:59:16-05:00"
tags = ["database"]
categories = ["forms"]
images = [""]
author = "Staff"
description = ""
title = "Database Service Request"
draft = false
type = "form"
private = true
+++

<form action="https://api.uvarc.io/rest/general-support-request/" method="post" id="request-form" accept-charset="UTF-8">
<div class="alert" id="response_message" role="alert" style="padding-bottom:0px;">
  <p id="form_post_response"></p>
</div>
<div>
  <input type="hidden" id="category" name="category" value="DCOS">
  <input type="hidden" id="request_title" name="request_title" value="Container Service Request" />
{{% form-userinfo %}}
  <hr size=1 />
  <label class="control-label" for="data-sensitivity-2">Capstone Group Name <span class="form-required" title="This field is required.">*</span></label>
  <div class="row">
    <div class="col form-item form-type-textarea form-group">
      <input class="form-control form-text required" type="text" id="groupname" name="groupname" value="" size="20" maxlength="20" />
    </div>
  </div>
  <div class="form-item form-group form-item form-type-textarea form-group"> 
    <label class="control-label" for="project-summary">Project Summary </label>
    <div class="form-textarea-wrapper resizable"><textarea class="form-control form-textarea" id="project-summary" name="project-summary" cols="60" rows="10"></textarea>
    </div>
    <small id="project-summary-Help" class="form-text text-muted">Please describe your project and the datatbase requirements.</small>
  </div>
  <hr size=1 />
  <div style="font-size:90%;" class="alert alert-warning"><b>Billing Tiers</b><br /> 
    Database services count as 1 containerized service and are billed alongside other containers you have running. The lowest tier,
    1-5 containers, is billed at $5/month total.
  </div>
  <div style="font-size:90%;" class="alert alert-danger"><b>Storage Capacity</b><br /> 
    Database services are limited to 50Gb of storage per database. Capacity beyond this requires dedicated resources that would be
    created and billed outside of this service offering.
  </div>
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

<script type="text/javascript" src="/js/user-session.js"></script>
<script type="text/javascript" src="/js/response-message.js"></script>
