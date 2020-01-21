+++
description = ""
title = "HPC Storage"
draft = false
date = "2019-07-22T17:45:12-05:00"
tags = ["storage","scratch","hpc","rivanna","project","qumulo"]
categories = ["userinfo"]
images = [""]
author = "Staff"
type = "rivanna"

+++

<p class="lead">There are a variety of options for storing large-scale research data at UVa. Non-sensitive data storage systems can be accessed from the <a href="/userinfo/rivanna/overview">Rivanna</a> high performance computing system.</p>

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;border-color:#ccc;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#ccc;color:#333;background-color:#fff;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#ccc;color:#333;background-color:#f0f0f0;}
.tg .tg-hy9w{background-color:#eceeef;border-color:inherit;vertical-align:top}
.tg .tg-dc35{background-color:#f9f9f9;border-color:inherit;vertical-align:top}
.tg .tg-0qmj{font-weight:bold;background-color:#eceeef;border-color:inherit;vertical-align:top}
</style>

# Non-Sensitive Data Storage

<div>
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
    <td class="tg-dc35"><a href="/userinfo/storage/non-sensitive-data/#home"><code>/home</code></a></td>
    <td class="tg-dc35">50GB</td>
    <td class="tg-dc35">Free</td>
    <td class="tg-dc35">3-week snapshot</td>
    <td class="tg-dc35">Rivanna login and compute nodes</td>
    <td class="tg-dc35"><code>/home</code> is best used as a working directory when using Rivanna interactively. SLURM jobs run against <code>/home</code> will be slower than those run against <code>/scratch</code>. The <code>/home</code> directory is a personal storage space that is not shareable with other users.</td>
  </tr>
  <tr>
    <td class="tg-hy9w"><a href="/userinfo/storage/non-sensitive-data/#scratch"><code>/scratch</code></a></td>
    <td class="tg-hy9w">10TB</td>
    <td class="tg-hy9w">Free</td>
    <td class="tg-hy9w">Data removed 90 days after last file modification timestamp</td>
    <td class="tg-hy9w">Rivanna login and compute nodes</td>
    <td class="tg-hy9w"><code>/scratch</code> is a high performance parallel filesystem that is suitable for large scale computational work. Data should be moved from <code>/scratch</code> for long-term storage. The <code>/scratch</code> directory is for personal use and not shared with other users.<br /><br />


  </tr>
  <tr>
    <td class="tg-dc35"><a href="/userinfo/storage/non-sensitive-data/#project"><code>/project</code></a></td>
    <td class="tg-dc35">Available in 1TB increments</td>
    <td class="tg-dc35">{{% storage-pricing project %}}/TB/Yr</td>
    <td class="tg-dc35">3-week snapshot</td>
    <td class="tg-dc35">Rivanna login and compute nodes</td>
    <td class="tg-dc35"><code>/project</code> is ideal for long-term storage data that can be accessed from Rivanna. <code>/project</code> can be used for sharing data within a research group and for running jobs with smaller files.</td>
  </tr>
  <tr>
    <td class="tg-hy9w"><a href="/userinfo/storage/research-value">Value Storage</a></td>
    <td class="tg-hy9w">Available in 1TB increments</td>
    <td class="tg-hy9w">{{% storage-pricing value %}}/TB/Yr</td>
    <td class="tg-hy9w">No backup</td>
    <td class="tg-hy9w">Rivanna login and compute nodes, SMB mount</td>
    <td class="tg-hy9w">Research value storage is budget solution for storing data that can be accessed by a personal computer or Rivanna. It can also be used to share data within a research group. SLURM jobs can be run against value storage but will be slower than those run against <code>/home</code>, <code>/scratch</code>, or <code>/project</code>.</td>
  </tr>
  <tr>
    <td class="tg-hy9w">ZFS Storage</td>
    <td class="tg-hy9w">Available in 1TB increments</td>
    <td class="tg-hy9w">{{% storage-pricing zfs %}}/TB/Yr</td>
    <td class="tg-hy9w">No backup</td>
    <td class="tg-hy9w">Rivanna login and compute nodes</td>
    <td class="tg-hy9w">Research ZFS is our least expensive storage solution for data that can be accessed by Rivanna although with lower performance compared to <code>/project</code>. It can be used as shared storage for members of a research group.</td>
  </tr>
</table>
</div>

- - -

# Scratch Cleanup Policy

The Scratch filesystem is a shared resource available for the convenience of all users. Files on the scratch filesystem are subject 
to deletion after a certain lifespan as determined by Research Computing. Home account storage and purchased storage are not subject to this policy.

**The current lifespan for scratch files is 90 days**.

[Read more about `/scratch`](https://discuss.rc.virginia.edu/t/1187) and why you would use it.

- - -

# Request Storage

Storage requests can be made from this form:

[<button class="btn btn-success">Storage Requests</button>](https://auth.uvasomrc.io/site/storage.php)
