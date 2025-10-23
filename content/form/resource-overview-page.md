+++
date = "2023-09-18T23:59:16-05:00"
tags = ["search"]
categories = ["forms"]
images = [""]
author = "Staff"
description = ""
title = "Resources Overview"
draft = false
type = "form"
private = true
+++
<style>

  .table-container {
    width: 95%;
    margin: 0 auto;
    padding-top: 20px;
    overflow-x: auto;
  }

  .resource-preview-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 15px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
    overflow: hidden;
  }

  .resource-preview-table thead {
    background-color: #004080;
    color: #fff;
  }

  .resource-preview-table th,
  .resource-preview-table td {
    text-align: left;
    padding: 12px 16px;
    border-bottom: 1px solid #ddd;
  }

  .resource-preview-table tbody tr:hover {
    background-color: #f1f5ff;
  }

  .resource-preview-table td:last-child {
    text-align: center;
  }

  .resource-preview-table button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  }

  .resource-preview-table button:hover {
    background-color: #0056b3;
  }

  /* Responsive adjustment */
  @media (max-width: 768px) {
    .resource-preview-table th,
    .resource-preview-table td {
      padding: 10px 8px;
      font-size: 13px;
    }
  }
</style>
<!-- Core scripts needed for form functionality -->
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>

<div class="message" id="resultMessage"></div><br /><br/>
  {{% form-userinfo-v2 %}} 
<div class="table-container">
  <!-- Table for Resource Preview -->
    <table class="table table-bordered table-hover resource-preview-table">
        <thead>
            <tr>
                <th scope="col">Type</th>
                <th scope="col">Project</th>
                <th scope="col">Resource Name</th>
                <th scope="col">Tier</th>
                <th scope="col">Size/Count</th>
                <th scope="col">Status</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody id="resource_preview_table_body">
            <!-- Rows will be dynamically injected by JavaScript -->
        </tbody>
    </table>
</div>

<script type="text/javascript" src="/js/response-message.js"></script>
<script type="text/javascript" src="/js/user-session-v2.js"></script>
<script type="text/javascript" src="/js/support-request.js"></script>
