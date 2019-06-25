+++
author = "Staff"
description = ""
title = "Research Data Storage"
date = "2019-05-12T10:08:29-05:00"
draft = false
tags = ["storage","large scale","cloud","ivy","rivanna","project"]
categories = ["userinfo"]
images = [""]
+++


<p class="lead">There are a variety of options for storing large-scale research data at UVa. Non-sensitive data storage systems can be accessed from the <a href="/userinfo/rivanna/">Rivanna</a> high performance computing system. Sensitive data can be stored and accessed within the <a href="/userinfo/ivy/">Ivy</a> secure computing environment.</p>

<p class="lead">Information Technology Services (ITS) also provides [**multiple tiers of data storage**](https://virginia.service-now.com/its?id=kb_article&sys_id=2ca18093db7ac744f032f1f51d9619eb) for personal and other storage needs.</p>

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;border-color:#ccc;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#ccc;color:#333;background-color:#fff;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#ccc;color:#333;background-color:#f0f0f0;}
.tg .tg-hy9w{background-color:#eceeef;border-color:inherit;vertical-align:top}
.tg .tg-dc35{background-color:#f9f9f9;border-color:inherit;vertical-align:top}
.tg .tg-0qmj{font-weight:bold;background-color:#eceeef;border-color:inherit;vertical-align:top}
</style>
<div>
<h3>Non-Sensitive Data Storage</h3>
<table class="tg">
  <tr>
    <th class="tg-0qmj">Name</th>
    <th class="tg-0qmj">Quota</th>
    <th class="tg-0qmj">Price</th>
    <th class="tg-0qmj">Data Protection</th>
    <th class="tg-0qmj">Accessible from</th>
    <th class="tg-0qmj">Best Practices</th>
  </tr>
  <tr>
    <td class="tg-dc35"><a href="/userinfo/storage/non-sensitive-data/#project">Project Storage</a></td> 
    <td class="tg-dc35">Available in 1TB increments</td>
    <td class="tg-dc35">$60/TB/yr</td>
    <td class="tg-dc35">3-week snapshots</td>
    <td class="tg-dc35">Rivanna, NFS mount</td>
    <td class="tg-dc35"><code>/project</code>is ideal for long-term storage of data to be accessed from Rivanna. <code>/project</code> is ideal for running jobs with smaller files.</td>
  </tr>
  <tr>
    <td class="tg-hy9w"><a href="/userinfo/storage/research-value">Value Storage</a></td>  
    <td class="tg-hy9w">Available in 1TB increments</td>
    <td class="tg-hy9w">$45/TB/yr</td>
    <td class="tg-hy9w">No backup</td>
    <td class="tg-hy9w">Rivanna, SMB mount</td>
    <td class="tg-hy9w">Research value storage budget solution for storing data that can be accessed by a personal computer or Rivanna. SLURM jobs can be run against value storage but will be slower than those run against <code>/home</code>, <code>/scratch</code>, or <code>/project</code>.</td>
  </tr>
</table>
</div>
<br>

<div>
<h3>Sensitive Data Storage</h3>
<table class="tg">
  <tr>
    <th class="tg-0qmj">Name</th>
    <th class="tg-0qmj">Quota</th>
    <th class="tg-0qmj">Price</th>
    <th class="tg-0qmj">Mounted On</th>
    <th class="tg-0qmj">Best Practices</th>
  </tr>
  <tr>
    <td class="tg-dc35"><a href="/userinfo/storage/sensitive-data/#ivy-central-storage">Ivy Central Storage (ICS)</a></td>
    <td class="tg-dc35">Available in 1TB increments</td>
    <td class="tg-dc35">First TB is free, price for additional space TBD</td>
    <td class="tg-dc35">Ivy virtual machine</td>
    <td class="tg-dc35">ICS is ideal for long-term storage of sensitive data and is suitable for computation with smaller file sizes. Files stored in ICS are read-write only.</td>
  </tr>
</table>
</div>

Ivy Central Storage is accessible by using Globus and connecting to the Ivy DTN.
