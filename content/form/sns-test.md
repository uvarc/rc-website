+++
date = "2021-04-10T23:59:16-05:00"
tags = ["database"]
# categories = ["forms"]
images = [""]
author = "Staff"
description = ""
title = "Database Service Request"
draft = true
type = "form"
private = true
+++

<div class="alert" id="response_message" role="alert" style="padding-bottom:0px;">
  <p id="form_post_response">here is a response</p>
</div>
<div id="formbody">
<div>
  <input type="hidden" id="category" name="category" value="Database">
  <input type="hidden" id="request_title" name="request_title" value="Database Request" />
{{% form-userinfo %}}
  <hr size=1 />
  <input type="hidden" id="category" name="category" value="DCOS">
  <input type="hidden" id="request_title" name="request_title" value="Container Service Request" />
  <div class="row">
    <div class="col form-item form-type-textarea form-group">
      <label class="control-label" for="group">Group</label>
      <input class="form-control form-text" type="text" id="group" value="" size="20" maxlength="20" />
    </div>
  </div>
<div class="row">
    <div class="col form-item form-type-textarea form-group">
      <label class="control-label" for="family">Family</label>
      <input class="form-control form-text" type="text" id="family" value="" size="20" maxlength="20" />
    </div>
  </div>
   <div class="form-actions" id="submit-div" style="margin-top:1rem;">
    <button class="button-primary btn btn-primary form-submit" id="submit" name="op" onclick="submitForm();" value="Submit">Submit</button>
  </div>
</div>
</div>

<!-- <script type="text/javascript" src="/js/user-session.js"></script> -->
<script type="text/javascript" src="/js/response-message.js"></script>
