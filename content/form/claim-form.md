+++
date = "2023-09-18T23:59:16-05:00"
tags = ["search"]
categories = ["forms"]
images = [""]
author = "Staff"
description = ""
title = "PI Group Claim Form"
draft = false
type = "form"
private = true
+++
<style>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    .form-container {
      max-width: 400px;
      margin: auto;
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }

    label {
      font-weight: bold;
      display: block;
      margin-bottom: 8px;
    }

    select, button {
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
      font-size: 16px;
    }

    button {
      background-color: #4CAF50;
      color: white;
      border: none;
      cursor: pointer;
    }

    button:hover {
      background-color: #45a049;
    }

    .message {
      text-align: center;
      margin-top: 10px;
    }
</style>
<!-- Core scripts needed for form functionality -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script type="text/javascript" src="/js/claim-form.js"></script>

<div class="message" id="resultMessage"></div><br /><br/>
<form id="claimForm">
  {{% form-userinfo-v2 %}} 
  <label for="user_groups">Select a Group to Claim:</label>
  <select id="user_groups" name="user_groups" required>
    <option value="">-- Select Group --</option>
  </select>
  <label class="control-label" for="project-title">Project Name <span class="form-required" title="This field is required.">*</span></label>
  <input required="required" class="form-control form-text required" type="text" id="project-title" name="project-title" value="" size="200" maxlength="200" />

  <label class="control-label" for="project-desc">Project Description <span class="form-required" title="This field is required.">*</span></label>
  <input required="required" class="form-control form-text required" type="text" id="project-desc" name="project-desc" value="" size="200" maxlength="200" />   

 <div style="margin-top: 1rem; display: inline-flex; gap: 1rem; width:100%">
    <button type="submit" class="btn btn-primary">Claim</button>
    <button type="button" class="btn btn-secondary"  id="cancelButton">Cancel</button>
  </div>
</form>
<script type="text/javascript" src="/js/response-message.js"></script>
<script type="text/javascript" src="/js/user-session-v2.js"></script>
<script type="text/javascript" src="/js/support-request.js"></script>
