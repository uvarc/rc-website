+++
title = "Moving Big Data"
description = ""
date = "2018-05-08T14:33:50-05:00"
author = "UVARC Staff"
images = "/images/projects/globus-workflow.png"
categories = ["projects"]
tags = [
  "genomics",
  "cphg",
  "data",
  "globus",
]
draft = false
projecttype = ["tools"]
+++

Research Computing works with researchers in the UVA [Center for Public Health Genomics](https://med.virginia.edu/cphg/), 
to transfer large genomics datasets from partner institutions. Using Globus, an asynchronous data transfer
utility (created at Argonne Laboratory and based on GridFTP), transfers of data larger than 40TB has been
made easier and more reliable.

Such large transfers benefit from  dedicated, high-speed connectivity between [Internet2](https://www.internet2.edu/) member institutions
like UVA, Cornell University, and Washington University in St. Louis. 

In practical terms, Globus allows users to queue large files for transfer between servers, lab workstations, laptops, or HPC systems.
Transfer is attempted for up to 24 hours, and you are notified upon completion or failure of the request. Globus can be used via
a web browser, command-line utility, or a Python SDK.

[Learn more about Globus](https://www.globus.org/).

UVA has Globus Data Transfer Nodes (DTNs) for both normal and highly-sensitive data. Researchers can learn more specifics about Globus and 
how to use it by visiting our [Globus documentation on Discourse](https://discuss.rc.virginia.edu/t/globus-connect-data-transfer-introduction/345).
