+++
description = ""
title = "Allocations"
draft = false
date = "2023-09-12T17:45:12-05:00"
tags = ["hpc","rivanna","supercomputer","allocations"]
categories = ["userinfo"]
images = [""]
author = "Staff"  
type = "rivanna"
+++

{{< form-cookies >}}

<script>
var user_token = getCookie("__user_token");
</script>

<div class="bd-callout bd-callout-warning">
<div style="float:right;margin:2rem;"><i class="fas fa-user-clock fa-5x" aria-hidden="true"></i></div>
<p>Time on Rivanna is allocated as <b>Service Units</b> (SUs). One SU corresponds to one core-hour. Multiple SUs make up what is called an allocation (e.g., a new allocation = 1M SUs). Allocations are managed through <a href="https://groups.identity.virginia.edu" target="_new" style="font-weight:bold;">Grouper</a> (requires VPN connection) groups that should be created by Principal Investigators (PIs) before they submit an allocation request. </p>
</div>

# Eligibility and Account Creation

{{% highlight %}}
{{% pi-eligibility %}}
{{% /highlight %}}

Each PI should create his/her own Grouper group using the <a href="https://in.virginia.edu/how-to-request-group">ITS Group Management Service</a>. New groups will require two owners who hold active roles at UVA, as well as a third departmental owner. The PI may designate one or more group administrators but must remain a member of the group. Collaborators with UVA Eservices accounts, regardless of status, can be added to the Grouper group once it has been created. (Collaborators outside of UVA must request a temporary, sponsored Eservices account.) Grouper group names should consist of lowercase letters, digits, or underscores only and must begin with a letter. Please do not use spaces in the group name.

Each PI is ultimately responsible for managing the roster of users in his/her group although PIs may delegate day-to-day management to one or more other members. When users are added or deleted, accounts are automatically created. Group owners will be required to perform an annual attestation of group membership. If group owners do not complete attesting to the validity of their group, the members will be automatically removed from the group.

[<button class="btn btn-warning">Manage Grouper</button>](https://groups.identity.virginia.edu/)

{{% callout %}}
Note that If you need to set up a new group or modify a group that was created after November 28th, 2023, go to [Grouper](https://groups.identity.virginia.edu/). To manage groups created before November 28th, 2023, visit the legacy [MyGroups portal](https://mygroups.virginia.edu/).
{{% /callout %}}

{{% group_creation_tip %}}

- - -

# Allocation Pricing

{{< pricing allocations>}}
- - -

# Allocation Types

## Standard Allocations
Standard allocations require a brief summary of the research project along with an explanation of the computations to be performed. Standard allocations must be renewed annually along with a synopsis of results from the original allocation. There cannot be more than 1 PI per Grouper group. Standard allocations expire 12 months after they are disbursed. 

**Available to:** [Eligible PIs](#eligibility-and-account-creation)

[<button class="btn btn-primary">Request New / Renew Standard Allocation</button>](/form/allocation-standard/)

- - -

## Allocation Purchases
Time on Rivanna can also be purchased using an FDM. Purchasers are given a higher priority in the queue and their SUs never expire.

**Available to:** [Eligible PIs](#eligibility-and-account-creation) who need priority access and premium service.

<a href="/form/allocation-purchase/">
  <button class="btn btn-primary">Purchase an Allocation</button>
</a>

- - -

## Instructional Allocations
Instructional allocations provide limited access to Rivanna and are available to UVA instructors who are teaching a class or leading a training session. Faculty who wish to request an instructional allocation should choose a Grouper account name using the class rubric, e.g. cs5014. Instructional allocations come with 1TB of temporary project storage space. Class data and service units will be automatically purged 2 weeks after the class ends unless the instructor requests an extension. Instructors are required to submit a fresh instructional allocation request—either a new request or a renewal request—at the start of each semester.

**Available to:** Faculty who intend to use HPC resources in their class. 

<a href="/education/rivanna-instructional/" target="_blank">Read the full policy and guide for instructors.</a>
<a href="/form/allocation-instructional/">

  <button class="btn btn-primary">Request an Instructional Allocation</button>
</a>
