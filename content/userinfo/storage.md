+++
author = "Staff"
description = ""
title = "Research Data Storage"
date = "2020-02-03T10:08:29-05:00"
draft = false
tags = ["storage","security","ivy","rivanna","project","standard","data"]
categories = ["userinfo"]
images = [""]
aliases = [ "/storage" ]
+++

<br>

{{< getstatus keyword="storage" >}}

---

<!--
![Project Storage](https://img.shields.io/badge/dynamic/json?color=color&label=Research%20Project%20Storage&query=message&url=https%3A%2F%2Ftja4lfp3da.execute-api.us-east-1.amazonaws.com%2Fapi%2Fbadge%2Fproject&style=for-the-badge)
![Standard Storage](https://img.shields.io/badge/dynamic/json?color=color&label=Research%20Standard%20Storage&query=message&url=https%3A%2F%2Ftja4lfp3da.execute-api.us-east-1.amazonaws.com%2Fapi%2Fbadge%2Fstandard&style=for-the-badge)
-->

<p class="lead">There are a variety of options for storing research data at UVA. Public and internal use data storage systems can be accessed from the <a href="/userinfo/hpc">Rivanna and Afton</a> high performance computing systems. Sensitive and highly sensitive data can be stored and accessed within the <a href="/userinfo/ivy">Ivy</a> secure computing environment. University Information Security provides an overview of the <a href=https://security.virginia.edu/university-data-protection-standards>data sensitivity classifications</a>, while our <a href="../storage/data-sensitivity"> Data Sensitivity and Research Computing Systems table </a> specifies where each type of data can be stored or analyzed in compliance with regulations.</p>  

{{% highlight %}}

{{% pi-eligibility %}}

{{% /highlight %}}

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

# Public, Internal Use, and Sensitive Data Storage {#public-internal-use-sensitive-data-storage}

[Public data](https://security.virginia.edu/definitions/public-data) are intentionally made available to the public. Examples of public data in research computing include, but are not limited to: 

- Data intended for display on a  public website
- Public Data Sets obtained from a publicly available source
- Open source code

[Internal use data](https://security.virginia.edu/definitions/internal-use-data) are classified as public records available to anyone in accordance with the [Virginia Freedom of Information Act (FOIA)](https://law.lis.virginia.gov/vacodepopularnames/virginia-freedom-of-information-act/) but are not intentionally made public. Examples of internal use data within a research computing context include but are not limited to: 

- audits
- models, scripts, and logfiles
- Preliminary analyses or reports
- Correspondence

[Sensitive data](https://security.virginia.edu/definitions/sensitive-data) is the default classification for all data that is not explicitly defined as highly sensitive data, may be held from release under FOIA, or that is not intended to be made publicly available. Examples of sensitive data within a research computing context include, but are not limited to:

- University ID numbers
- FERPA-protected student information not covered by the definition of highly sensitive data
- [Health information](https://security.virginia.edu/secure-research-practices-uva) where all Protected Health Information (PHI) have been systematically removed (i.e., de-identified) or aggregated, making identification impossible
- Personnel and financial information not covered by the definition of highly sensitive data, but not intended to be public
- Any information that doesn’t fit into public, internal use, or highly sensitive data categories

{{< storage_main_page_first >}}

<sup>1</sup>For PIs with existing Research Standard Storage, the charges will be adjusted accordingly. PIs without existing Research Standard Storage will need to submit a request for the storage.

<sup>2</sup>Snapshot files are uneditable backup copies of all the files and folders in your account, taken at a daily interval. The Research Project Storage system keeps these snapshots for a week. Snapshot files are deleted sequentially after a week has passed. This saving method is useful for human error prevention as any accidentally deleted files may be recovered. Look to our [FAQ](/userinfo/faq/storage-faq/) page to learn how to access your snapshots.

<sup>3</sup>Replication is a data management process that stores copies of data fragments over a distributed cluster or database. By having replicated data across each node or server on a given database, data can be accessed more reliably than data that only resides on a single server. This saving method is useful for disaster scenarios where if data is stored on multiple disks, and one disk fails, the data is still accessible.

<sup>4</sup>Backup files are copies of files that are stored on a separate disk storage than that of the original copies. Files may be backed up on a separate disk storage or within cloud storage. Backed up files are not synced with their original, so any edits to the original are not reflected on the backup. This saving method is useful for disaster scenarios where if the original disk storage is unsalvageable, the backups may still be accessible.

- - -

# Highly Sensitive Data Storage

[Highly sensitive data (HSD)](https://security.virginia.edu/definitions/highly-sensitive-data) are data that require restrictions on access under the law or that may be protected from release in accordance with applicable law or regulation. HSD includes personal information that can lead to identity theft or health information that reveals an individual's health condition and/or medical history. Examples of HSD include, but are not limited to: 

- Personally identifying information (PII) is any information that can be used to identify a person. Examples of PII include social security number, passport number, driver’s license number, military identification number, or biometric records (e.g. photographic facial images, fingerprints, voice signature, etc.).
- Health information that reveals an individual’s health condition and/or medical history, including information defined by the Health Insurance Portability and Accountability Act (HIPAA)
- Cardholder data (CHD) such as credit card numbers, primary cardholder account numbers, cardholder names, expiration date, and/or service code

{{< storage_main_page_second >}}

Researchers who request space on High-Security Research Standard must first request an Ivy account using the [Ivy request form](https://services.rc.virginia.edu/ivyvm). Further information on Ivy and the High-Security Research storage can be found [here](/userinfo/storage/sensitive-data/#hs-standard-storage).

High-Security Research Standard Storage is accessible by using [Globus](/userinfo/globus/) and connecting to the High-Security DTN.

## Ivy Central Storage (ICS)

Ivy Central Storage has been replaced by High-Security Research Standard storage.

- - -

# Request Storage

Storage requests can be made via this form:

[<button class="btn btn-success">Request / Purchase Storage</button>](/form/storage/)
