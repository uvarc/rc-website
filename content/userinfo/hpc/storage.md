+++
description = ""
title = "Rivanna Storage"
draft = false
date = "2022-05-04T23:59:16-05:00"
tags = ["storage","scratch","hpc","rivanna","project","qumulo"]
categories = ["userinfo"]
images = [""]
author = "Staff"
type = "rivanna"

+++

<p class="lead">There are a variety of options for storing large-scale research data at UVa. Public and Internal Use data storage systems can be accessed from the <a href="/userinfo/hpc">Rivanna and Afton</a> high performance computing systems.</p>

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;border-color:#ccc;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#ccc;color:#333;background-color:#fff;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;border-color:#ccc;color:#333;background-color:#f0f0f0;}
.tg .tg-hy9w{background-color:#eceeef;border-color:inherit;vertical-align:top}
.tg .tg-dc35{background-color:#f9f9f9;border-color:inherit;vertical-align:top}
.tg .tg-0qmj{font-weight:bold;background-color:#eceeef;border-color:inherit;vertical-align:top}
</style>

# Storage Directories

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
    <td class="tg-dc35"200GB</td>
    <td class="tg-dc35">Free</td>
    <td class="tg-dc35">{{% backup-policy rivanna_home %}}</td>
    <td class="tg-dc35">Rivanna/Afton</td>
    <td class="tg-dc35"><code>/home</code> is best used as a working directory when using Rivanna/Afton interactively. Slurm jobs run against <code>/home</code> will be slower than those run against <code>/scratch</code>. The <code>/home</code> directory is a personal storage space that is not shareable with other users.</td>
  </tr>
  <tr>
    <td class="tg-hy9w"><a href="/userinfo/storage/non-sensitive-data/#scratch"><code>/scratch</code></a></td>
    <td class="tg-hy9w">10TB</td>
    <td class="tg-hy9w">Free</td>
    <td class="tg-hy9w">{{% backup-policy rivanna_scratch %}}, Data removed 90 days after last file access time</td>
    <td class="tg-hy9w">Rivanna/Afton</td>
    <td class="tg-hy9w"><code>/scratch</code> is a high performance parallel filesystem that is suitable for large scale computational work. Data should be moved from <code>/scratch</code> for long-term storage. The <code>/scratch</code> directory is for personal use and not shared with other users.<br /><br />
  </tr>
</table>
</div>


# Scratch Cleanup Policy

{{% scratch-policy %}}

- - -

# Request Additional Storage

Researchers can lease additional storage, **Research Standard** or **Research Project** storage, for **sharing public or internal use data** within a research group. Research Standard and Research Project storage volumes are mounted on Rivanna/Afton and can also be accessed from local workstations. [Learn more about our storage offerings](/userinfo/storage/non-sensitive-data/#public--moderately-sensitive-data-storage).

Storage requests can be placed through this form:

[<button class="btn btn-success">Storage Requests</button>](/form/storage/)
