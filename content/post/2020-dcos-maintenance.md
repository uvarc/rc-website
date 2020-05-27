+++
images = [""]
author = "Staff"
description = ""
date = "2020-05-27T02:18:25-05:00"
title = "DCOS Maintenance: June 4, 2020"
draft = false
tags = ["dcos","containers","maintenance"]
categories = ["feature"]
+++

{{< alert-green >}}The DCOS cluster will be taken offline on <b>Thursday, June 4 2020 from 12:00pm to 5:00pm</b> for routine maintenance. All container services will be offline during this period.{{< /alert-green >}}

This maintenance window will allow us to (1) physically relocate the cluster within the UDC, a move to a new row within the research computing footprint; and (2) to patch remaining nodes to DCOS v2.0.2 after the relocation. These tasks require that we bring down the entire cluster and all applications running on it. Container services should relaunch and resume automatically once all agent nodes are back online.

While scheduled to last 5 hours, we anticipate the cluster will return to service sooner than that. You will receive a notice after maintenance has been completed.
