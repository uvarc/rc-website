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
  .container {
        width: 80%;
        margin: 0 auto;
        padding-top: 20px;
    }
    
    .tabs {
        display: flex;
        margin-bottom: 20px;
    }
    
    .tab-button {
        cursor: pointer;
        border-radius: 1px;
    }
    
    .tab-button.active {
        background-color:rgb(76, 175, 117); /* Change to the color you want */
        color: white;
    }
    
    .tab-content {
        display: none;
    }

    label {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 6px;
        display: block;
        color: #555;
    }
</style>
<!-- Core scripts needed for form functionality -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

<div class="message" id="resultMessage"></div><br /><br/>
<form id="adminForm">
  {{% form-userinfo-v2 %}} 
  <div class="tab-container">
    <div class="tabs">
        <button class="tab-button" onclick="showForm(1)">Update UID</button>
        <button class="tab-button" onclick="showForm(2)">Update Status</button>
    </div>
    <!-- Tab Content: Form 1 -->
    <div id="form1" class="tab-content active">
      <h2>Update Group Owner UID</h2>
      <div id="updateResponse" style="margin:10px"></div>
      <label for="group_name_for_update">Group Name:</label>
      <input type="text" id="group_name_for_update" name="group_name_for_update" required>
     <label for="owner_uid">Owner UID:</label>
      <input type="text" id="owner_uid" name="owner_uid" required><br/>
      <div class="button-row">
        <button type="submit" name="action" value="update_uid">Submit</button>
        <button type="button" class="cancel-button" onclick="cancelAndReset()">Cancel</button>
      </div>
    </div>
    <!-- Tab Content: Form 2 -->
    <div id="form2" class="tab-content">
      <div id="message" style="text-align: center; margin-top: 20px;">
        <h2>{{ message }}</h2>
      </div>
      <h2>Update Resource Request Status</h2>
      <label for="ticket_id">Ticket ID:</label>
      <input type="text" id="ticket_id" name="ticket_id" value="{{ ticket_id }}" required><br>
      <label for="group_name">Group Name:</label>
      <input type="text" id="group_name" name="group_name" value="{{ group_name }}" required><br>
     <label for="resource_type">Resource Type:</label>
      <select id="resource_type" name="resource_type" required>
        <option value="hpc_service_units">HPC Service Units</option>
        <option value="storage">Storage</option>
      </select><br><br>
      <label for="resource_name">Resource Name:</label>
      <input type="text" id="resource_name" name="resource_name" value="{{ resource_name }}" required><br>
     <label for="update_status">Action to be taken:</label>
      <select id="update_status" name="update_status" required>
        <option value="active">Activate/Approve Change</option>
        <option value="retired" id="retire_option">Retire</option>
        <option value="error">Revert (Revert to previous state)</option>
      </select><br><br>
      <label for="update_comment">Update Comment:</label>
      <input type="text" id="update_comment" name="update_comment" value="{{ update_comment }}" required><br>
      <div class="button-row">
        <button type="submit" name="action" value="update_status">Submit</button>
        <button type="button" class="cancel-button" onclick="cancelAndReset()">Cancel</button>
      </div>
    </div>
  </div>

</form>
<script type="text/javascript" src="/js/response-message.js"></script>
<script type="text/javascript" src="/js/user-session-v2.js"></script>
<script type="text/javascript" src="/js/support-request.js"></script>
