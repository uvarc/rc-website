+++
author = "SOMRC Staff"
description = ""
title = "Large Scale Data Storage"
date = "2017-02-24T10:08:29-05:00"
draft = false
tags = ["storage","large scale"]
categories = ["userinfo"]
images = [""]
+++


<p class="lead">UVA Research Computing provides multi-tiered storage solutions for your data. From the individual cloud storage solution for your personal computing to the high-performance parallel file system for serious computational runs, various storage solutions are available for your need. </p>
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
    <th class="tg-0qmj">File system</th>
    <th class="tg-0qmj">Access Methods</th>
    <th class="tg-0qmj">Best Practics</th>
  </tr>
  <tr>
    <td class="tg-dc35"><a href="https://arcs.virginia.edu/storage"><code>/home</code></a></td>
    <td class="tg-dc35">50 GB</td>
    <td class="tg-dc35">Free</td>
    <td class="tg-dc35">3-week snapshot</td>
    <td class="tg-dc35">NFS</td>
    <td class="tg-dc35">Proprietary</td>
    <td class="tg-dc35">Best used as a working directory when using Rivanna interactively. SLURM jobs run against /home will be slower than those run against /scratch.</td>
  </tr>
  <tr>
    <td class="tg-hy9w"><a href="http://arcs.virginia.edu/storage"><code>/scratch</code></a></td>
    <td class="tg-hy9w">10 TB</td>
    <td class="tg-hy9w">Free</td>
    <td class="tg-hy9w">Data removed 60 days after last file modification timestamp</td>
    <td class="tg-hy9w">Lustre</td>
    <td class="tg-hy9w">Rivanna, SSHFS</td>
    <td class="tg-hy9w">Optimal storage space for computational work on Rivanna. SLURM jobs run against /scratch will be faster than those run against /home, /project, or /value. Data should be moved from /scratch for long-term storage.</td>
  </tr>
  <tr>
    <td class="tg-dc35"><a href="https://somrc.virginia.edu/userinfo/project"><code>/project</code></a></td> 
    <td class="tg-dc35">Available in 1 TB increments</td>
    <td class="tg-dc35">$90/TB/Yr</td>
    <td class="tg-dc35">3-week snapshot</td>
    <td class="tg-dc35">NFS</td>
    <td class="tg-dc35">Rivanna, SSHFS</td>
    <td class="tg-dc35">Ideal for long-term storage of data that can be accessed by either a personal computer or Rivanna. SLURM jobs run against /project will be slower than those run against /scratch.</td>
  </tr>
  <tr>
    <td class="tg-hy9w"><a href="http://its.virginia.edu/hosting/storage/value.html"><code>/value</code></a></td>  
    <td class="tg-hy9w">Available in 1 TB increments</td>
    <td class="tg-hy9w">$45/TB/Yr</td>
    <td class="tg-hy9w">No backup</td>
    <td class="tg-hy9w">Proprietary</td>
    <td class="tg-hy9w">Rivanna, SSHFS, Samba (direct mount)</td>
    <td class="tg-hy9w">Budget solution for storing data that can be accessed by a personal computer or Rivanna. SLURM jobs run against /value storage will be slower than those run against /home, /scratch, or /project.</td>
  </tr>
</table>
</div>
<br>
<h3>
  Non-Sensitive Storage Data Transfer
  <small class="text-muted">High level Overview</small>
</h3>
<img src="https://s3.amazonaws.com/somrc-data/somrc-storage-nonsecure-apr2018.png">
<h3>
  Sensitive Storage Data Transfer
  <small class="text-muted">High level Overview</small>
</h3>
<img src="https://s3.amazonaws.com/somrc-data/somrc-storage-secure-apr2018.png">