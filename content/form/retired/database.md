+++
date = "2021-04-10T23:59:16-05:00"
tags = ["mysql","database"]
# categories = ["forms"]
images = [""]
author = "Staff"
description = ""
title = "Database Service Request"
draft = true
type = "form"
private = true
+++

<!-- <p id="support-greeting" style="font-style:italic;font-size:120%;" value=""></p> -->
<form action="https://uvarc-api.pods.uvarc.io/rest/general-support-request/" method="post" id="request-form" accept-charset="UTF-8">
<div class="alert" id="response_message" role="alert" style="padding-bottom:0px;">
  <p id="form_post_response"></p>
</div>
<div>
  <input type="hidden" id="category" name="category" value="DCOS">
  <input type="hidden" id="request_title" name="request_title" value="Database Service Request" />
  <div style="margin-top:-2rem;padding:2rem;border:solid 1px #ccc;background-color:#eee;padding-bottom:1rem;">
    <p>A <b>Relational Database Service</b> is available for researchers who need such resources in Rivanna or microservice applications. Currently database services are limited to the MySQL RDBMS, and can only be accessed from within the HPC network.</p>
    <p style="font-weight:bold;">Note that you cannot connect directly to this database service from elsewhere on campus, VPN, etc. but only from Rivanna or other Research Computing systems.</p>
    <p>Upon approval of this request you will be given the following:
      <ul>
        <li>The database host <code>endpoint</code> address</li>
        <li>A database <code>username</code></li>
        <li>A database <code>password</code></li>
      </ul>
    <p>Connections can then be made over port <code>3306</code> to the endpoint using normal MySQL tools and libraries. A GUI user interface is available at <a href="https://phpmyadmin.uvadcos.io/" target="_new"><b>https://phpmyadmin.uvadcos.io/</b></a> for convenience of management.</p>
    <p>Databases are automatically backed up nightly, and 7 days are retained.</p>
    <p>Learn more:</p>
    <ul>
      <li><a href="/userinfo/howtos/general/databases/">Database Basics</a></li>
      <li><a href="/userinfo/hpc/software/complete-list/">Rivanna Software</a></li>
    </ul>
  </div>
  <hr size=1 />
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
    <label class="control-label" for="project-summary">MySQL Database Use Case </label>
    <div class="form-textarea-wrapper resizable"><textarea class="form-control form-textarea" id="project-summary" name="project-summary" cols="60" rows="10"></textarea>
    </div>
    <small id="project-summary-Help" class="form-text text-muted">Please describe your database requirements and the project they are associated with.</small>
  </div>
  <div class="row">
    <div class="col form-item form-group">
      <label class="control-label" for="capacity">Anticipated Storage Capacity (GB)</label>
      <input class="form-control" type="number" min="0" max="20" id="capacity" name="capacity" value="0" style="width:8rem;" />
      <p class=tiny>The size of storage expected over time. Specify in 1GB increments. This should not exceed 20GB.</p>
    </div>
    <div class="col form-item form-group">
      <label class="control-label" for="capstone">SDS Capstone Group</label>
      <input class="form-control" type="text" id="capstone" name="capstone" style="" />
      <p class=tiny>The name of your SDS capstone group, if applicable.</p>
    </div>
  </div>
  <hr size=1 />
  <h4>Billing</h4>
  <div style="margin-top:1.4rem;font-size:90%;" class="alert alert-success"><b>Database Billing</b> is paid for by the PI or SDS Capstone Faculty Advisor. Database services currently cost <b>$5/database/month</b> in addition to any charges for other deployed microservices containers.
  (See <a href="/form/containers/">DCOS billing tiers</a> for more information.) Seven days of backups are automatically stored for each database.</div>
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
    <input class="form-check-input required" style="margin-left:4rem;" type="checkbox" value="" id="data-agreement">&nbsp;&nbsp; I agree
  </div>
  <div class="form-actions" id="submit-div" style="margin-top:1rem;">
    <hr size="1" style="" />
    <p style="font-size:80%;">Please submit the form only once. If you receive an error message after submitting this request, please check your email to confirm that the submission completed.</p>
    <button class="button-primary btn btn-primary form-submit" id="submit" type="submit" name="op" value="Submit" disabled>Submit</button>
  </div>
</div>
</form>
<div>
</div>

<script type="text/javascript" src="/js/user-session.js"></script>
<script type="text/javascript" src="/js/response-message.js"></script>
