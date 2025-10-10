+++
date = "2023-09-18T23:59:16-05:00"
tags = ["search"]
categories = ["forms"]
images = [""]
title = "Admin Form"
author = "Staff"
description = ""
draft = false
type = "form"
private = true
+++
<style>
    select,input, button {
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
      font-size: 16px;
    }

    button {
      background-color:#014c8c;;
      color: white;
      border: none;
      cursor: pointer;
    }

    button:hover {
      background-color:rgb(142, 200, 131);
    }

    .button-row {
      display: flex;
      justify-content: flex-start;
      gap: 10px;
      margin-top: 10px;
    }

   .button-row button {
     width: auto;
    flex: 0 0 auto;
    padding: 10px 20px;
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
        margin-top:-40px;
    }
    
    .tab-button {
        cursor: pointer;
        border-radius: 2px;
    }
    
    .tab-button.active {
        background-color:#5cb85c;
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

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> 
<script type="text/javascript" src="/js/admin-form.js"></script>
<div class="message" id="resultMessage"></div><br /><br/>
<form id="adminForm">

  <div class="tab-container">
    <!-- Tabs -->
    <div class="tabs">
      <button type="button" class="tab-button active" data-tab="1" data-title="Update Group Owner UID">Update UID</button>
      <button type="button" class="tab-button" data-tab="2" data-title="Update Resource Request Status">Update Status</button>
    </div>
     <!-- Tab 1: Update UID -->
    <div id="form1" class="tab-content" style="display: block;">
      <h2>Update Group Owner UID</h2></br/>
      <label for="group_name_for_update">Group Name:</label>
      <input type="text" id="group_name_for_update" name="group_name_for_update" required>
      <label for="owner_uid">Owner UID:</label>
      <input type="text" id="owner_uid" name="owner_uid" required>
      <br/>
      <div class="button-row">
        <button type="submit" name="action" value="update_uid">Submit</button>
        <button type="button" class="cancel-button" id="cancelBtn1">Cancel</button>
      </div>
    </div>
    <!-- Tab 2: Update Resource Request Status -->
    <div id="form2" class="tab-content" style="display: none;">
    <h2>Update Resource Request Status</h2><br/>
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
        <button type="button" class="cancel-button" id="cancelBtn2">Cancel</button>
      </div>
    </div>
  </div>
</form>
<script type="text/javascript" src="/js/user-session-v2.js"></script>
<script type="text/javascript" src="/js/support-request.js"></script>
