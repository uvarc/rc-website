+++
author = "Staff"
description = ""
title = "Research Data Storage"
date = "2020-02-03T10:08:29-05:00"
draft = false
tags = ["storage","security","qumulo","ivy","rivanna","project"]
categories = ["userinfo"]
images = [""]
+++


<p class="lead">There are a variety of options for storing large-scale research data at UVA. Public and moderately sensitive data storage systems can be accessed from the <a href="/userinfo/rivanna/overview/">Rivanna</a> high performance computing system. Highly sensitive data can be stored and accessed within the <a href="/userinfo/ivy/overview">Ivy</a> secure computing environment. Information Security at UVA provides an overview of the <a href=https://security.virginia.edu/university-data-protection-standards>data sensitivity classifications</a>.  <br /><br />UVA graduate and undergraduate students are not permitted to request storage accounts. This must be done by their faculty advisor[s].</p>


{{< highlight >}}
  Information Technology Services (ITS) also provides <a href="https://virginia.service-now.com/its?id=kb_article&sys_id=2ca18093db7ac744f032f1f51d9619eb" target="_new"><b>multiple tiers of data storage</b></a> for personal and non-research storage needs.</alert>
{{< /highlight >}}


<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;border-color:#ccc;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#ccc;color:#333;background-color:#fff;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#ccc;color:#333;background-color:#f0f0f0;}
.tg .tg-hy9w{background-color:#eceeef;border-color:inherit;vertical-align:top}
.tg .tg-dc35{background-color:#f9f9f9;border-color:inherit;vertical-align:top}
.tg .tg-0qmj{font-weight:bold;background-color:#eceeef;border-color:inherit;vertical-align:top}
</style>

- - -

# Public & Moderately Sensitive Data Storage

<table class="table table-striped table-sm" style="font-size:90%;">
  <thead class="thead-dark">
  <tr>
    <th class="" style="width:16%;">Name</th>
    <th class="">Quota</th>
    <th class="">Price</th>
    <th class="">Data Protection</th>
    <th class="">Accessible from</th>
    <th class="">Best Practices</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td class=""><a href="/userinfo/storage/non-sensitive-data/#project">Project Storage</a></td>
    <td class="">1TB increments</td>
    <td class="">{{% storage-pricing project %}}/TB/yr</td>
    <td class="">{{% backup-policy project %}}</td>
    <td class="">Rivanna, <a href="/userinfo/howtos/storage/drive-mapping/">mountable on local workstation</a></td>
    <td class=""><b>Currently not available.</b> <code>/project</code>is ideal for long-term storage of data to be accessed from Rivanna. <code>/project</code> is ideal for sharing data within a research group and for running jobs with smaller files.</td>
  </tr>
  <tr>
    <td class=""><a href="/userinfo/storage/research-value">Value Storage</a></td>
    <td class="">1TB increments</td>
    <td class="">{{% storage-pricing value %}}/TB/yr</td>
    <td class="">{{% backup-policy value %}}</td>
    <td class="">Rivanna, <a href="/userinfo/howtos/storage/drive-mapping/">mountable on local workstation</a></td>
    <td class=""><b>Currently not available.</b> Research value storage is a budget solution for storing data that can be accessed by a personal computer or Rivanna. It is not recommended to run SLURM jobs against value storage unless absolutely necessary. File operations on value storage are slower than on <code>/home</code>, <code>/scratch</code>, or <code>/project</code>.</td>
  </tr>
  <tr>
    <td class="">Archive Storage</td>
    <td class="">1TB increments</td>
    <td class="">{{% storage-pricing zfs %}}/TB/yr</td>
    <td class="">{{% backup-policy zfs %}}</td>
    <td class="">Rivanna</a></td>
    <td class=""><b>Currently not available.</b> ZFS NAS storage can be mounted on your desktop and allows for file sharing among research team members.</td>
  </tr>
  </tbody>
</table>

<div class="alert alert-warning">
  Due to unexpected delays caused by the pandemic, RC engineers have been unable to complete a major storage system capacity expansion scheduled for October 2020. Therefore, effective immediately, RC is temporarily suspending the creation and enlargement of project and value storage shares until the expansion has been completed. The expansion is expected to be completed by November 1. We apologize for the inconvenience.
</div>

- - -

# Highly Sensitive Data Storage

<table class="table table-striped table-sm" style="font-size:90%;">
  <thead class="thead-dark">
    <tr>
      <th class="" style="width:16%;">Name</th>
      <th class="">Quota</th>
      <th class="">Price</th>
      <th class="">Mounted On</th>
      <th class="">Best Practices</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class=""><a href="/userinfo/storage/sensitive-data/#ivy-central-storage">Ivy Central Storage (ICS)</a></td>
      <td class="">1TB increments</td>
      <td class="">First TB is free, additional space {{% storage-pricing ivy %}} TB/year</td>
      <td class="">Ivy virtual machine</td>
      <td class="">ICS is ideal for long-term storage of highly sensitive data and is suitable for computation with smaller file sizes. Files stored in ICS are read-write only.</td>
    </tr>
  </tbody>
</table>

Researchers who request space on ICS must first request an Ivy account using the [Ivy request form](https://services.rc.virginia.edu/ivyvm). Further information on Ivy and the ICS can be found [here](https://staging.rc.virginia.edu/userinfo/storage/sensitive-data/#ivy-central-storage).

Ivy Central Storage is accessible by using [Globus](/userinfo/globus/) and connecting to the Ivy DTN.

- - -

# Request Storage

Storage requests can be made via this form:

[<button class="btn btn-success">Request / Purchase Storage</button>](https://auth.uvasomrc.io/site/storage.php)
