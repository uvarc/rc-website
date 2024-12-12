+++
description = ""
title = "Access to HPC Resources"
draft = false
date = "2024-12-03T17:45:12-05:00"
tags = ["hpc","rivanna","supercomputer","allocations", "afton", "dedicated-computing"]
categories = ["userinfo"]
images = [""]
author = "Staff"  
type = "rivanna"
summary = """
<div class="bd-callout bd-callout-warning">
  <div style="float:right;margin:2rem;"><i class="fas fa-user-clock fa-5x" aria-hidden="true"></i></div>
  <p>Compute time on Rivanna/Afton is available through two service models.</p>
  <b>Service Unit (SU) Allocations</b>. One SU corresponds to one core-hour. Multiple SUs make up what is called an SU allocation (e.g., a new allocation = 1M SUs).
  <b>Dedicated Computing</b>. This model allows researchers to lease hardware managed by Research Computing (RC) as an alternative to purchasing their own equipment. It provides dedicated access to HPC resources with no wait times.
</div>
"""
+++


{{< form-cookies >}}
  
<script>
  var user_token = getCookie("__user_token");
</script>


<div class="bd-callout bd-callout-warning">
<div style="float:right;margin:2rem;"><i class="fas fa-user-clock fa-5x" aria-hidden="true"></i></div>
<p>Compute time on Rivanna/Afton is available through two service models.

<b>Service Unit (SU) Allocations</b>. One SU corresponds to one core-hour. Multiple SUs make up what is called an SU allocation (e.g., a new allocation = 1M SUs).

<b>Dedicated Computing</b>. This model allows researchers to lease hardware managed by Research Computing (RC) as an alternative to purchasing their own equipment. It provides dedicated access to HPC resources with no wait times.

Below, you’ll find information on eligibility for access, account creation, and the various types of SU allocations along with their pricing.</div>

# PI Eligibility

{{% pi-eligibility %}}

# Account Creation

Each PI should create his/her own Grouper group using the <a href="https://in.virginia.edu/how-to-request-group">ITS Group Management Service</a>. New groups will require two owners who hold active roles at UVA, as well as a third departmental owner. The PI may designate one or more group administrators but must remain a member of the group. Collaborators with UVA Eservices accounts, regardless of status, can be added to the Grouper group once it has been created. (Collaborators outside of UVA must request a temporary, sponsored Eservices account.) Grouper group names should consist of lowercase letters, digits, or underscores only and must begin with a letter. Please do not use spaces in the group name.

{{% highlight %}}
Whether you need to set up a new group, modify a group or access the legacy MyGroups groups, go to [Grouper](https://groups.identity.virginia.edu/) which requires VPN connection. For new groups, specify "This group will be used for Rivanna/Afton access" in the description section of the Service Now request form to expedite group creation. Please add yourself as a member to the group in order for us to fulfill any allocation request related to this group.
{{% /highlight %}}

Each PI is ultimately responsible for managing the roster of users in his/her group although PIs may delegate day-to-day management to one or more other members. When users are added or deleted, accounts are automatically created. Group owners will be required to perform an annual attestation of group membership. If group owners do not complete attesting to the validity of their group, the members will be automatically removed from the group.

[<button class="btn btn-warning">Manage Grouper</button>](https://groups.identity.virginia.edu/)

- - -
# SU Allocations

## Pricing

{{< pricing allocations>}}

- - -

## Types {#allocation-types}

### Standard Allocations
Standard allocations require a brief summary of the research project along with an explanation of the computations to be performed. Standard allocations must be renewed annually along with a synopsis of results from the original allocation. There cannot be more than 1 PI per Grouper group. Standard allocations expire 12 months after they are disbursed. 

**Available to:** [Eligible PIs](#pi-eligibility)

[<button class="btn btn-primary">Request New / Renew Standard Allocation</button>](/form/allocation-standard/)

- - -

### Allocation Purchases
Time on Rivanna and Afton can also be purchased using an FDM. Purchasers are given a higher priority in the queue and their SUs never expire.
iAs an alternative to purchasing SU's, RC offers dedicated computing which allows researchers to request exclusive access to a subset of HPC nodes for extended periods. See below for more information.

**Available to:** [Eligible PIs](#pi-eligibility) who need priority access and premium service.

<a href="/form/allocation-purchase/">
  <button class="btn btn-primary">Purchase an Allocation</button>
</a>

- - -

### Instructional Allocations
Instructional allocations provide limited access to Rivanna and Afton and are available to UVA instructors who are teaching a class or leading a training session. Faculty who wish to request an instructional allocation should choose a Grouper account name using the class rubric, e.g. cs5014. Service units will be automatically purged 2 weeks after the class ends unless the instructor requests an extension. Instructors are required to submit a fresh instructional allocation request—either a new request or a renewal request—at the start of each semester.

**Available to:** Faculty who intend to use HPC resources in their class. 

<a href="/education/rivanna-instructional/" target="_blank">Read the full policy and guide for instructors.</a>
<a href="/form/allocation-instructional/">

  <button class="btn btn-primary">Request an Instructional Allocation</button>
</a>

# Dedicated Computing {#dedicated-computing}
Dedicated computing is an alternative to self-managed lab systems and condominium nodes. This option provides researchers with exclusive access to HPC resources without wait times, eliminating the need for RC to manage the lifecycle of hardware purchased by researchers. Dedicated Computing involves nodes that RC has procured as part of its large-scale HPC acquisitions being “leased” to researchers for a term of one year or longer. These leased nodes are configured with the same system image as the primary HPC environment, ensuring consistency and minimizing support overhead. Once the lease term ends, dedicated nodes are returned to the public queues, making them available for general HPC use.

**Available to:** [Eligible PIs](#pi-eligibility) who need exclusive access to a subset of HPC nodes for extended periods.

<a href="/form/support-request/?category=Rivanna&request_title=Dedicated%20Computing">

  <button class="btn btn-primary">Request Dedicated Computing</button>
</a>

## Pricing

{{< pricing dedicated_computing >}}

