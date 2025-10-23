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
    width: 100%;
    margin: 0 auto;
    padding-top: 10px;
    overflow-x: auto;
  }

  .resource-preview-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 15px;
    padding: 1.5rem;
    background-color: #eee;
    border: solid 1px #ccc;
    margin-bottom: 1rem;
    overflow: hidden;
  }


  .resource-preview-table th,
  .resource-preview-table td {
    text-align: left;
    padding: 12px 16px;
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
