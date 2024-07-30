+++
type = "rivanna"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "HPC",
  "software",
]
date = "2019-06-23T08:37:46-05:00"
tags = [
  "lang",
]
draft = false
shorttitle = "Open OnDemand Desktop"
title = "Open OnDemand Desktop"
description = "Desktop environment for compute-intensive applications with graphical user interface (GUI)"
author = "RC Staff"

+++
# Overview
The Open OnDemand Desktop app provides a full Linux Desktop environment launched on user-specified allocated hardware resources which may include a compute node equipped with graphical processing units (GPUs). 

{{% callout %}}
This is the preferred mechanism to start compute intensive applications that require a graphical user interface (GUI) on the HPC system.
{{% /callout %}}

# Accessing the Desktop App
To access the app and start a desktop session, connect to our Open OnDemand portal:

1. Open a web browser and go to https://ood.hpc.virginia.edu.
2. Use your `Netbadge` credentials to log in.
3. On the top right of the menu bar of the Open OnDemand dashboard, click on `Interactive Apps`.
4. In the drop-down box, click on `Desktop`.

<img src="/images/ood/ood-menu.png" style="height:100%;width:100%"></img>

# Requesting an Instance
Your instance of the Desktop app will run on a HPC compute node. So it will need a list of resources, such as partition, time, and allocation. If you are new to UVA HPC, you may want to read the [HPC User Guide](/userinfo/hpc) to learn more about the partitions.

1. After connecting to JupyterLab through Open OnDemand, a form will appear where you can fill in the resources for the Desktop session.

    <img src="/images/ood/ood-desktop-request.png" style="height:100%;width:100%"></img>

    * **Partition:** UVA HPC has different types of compute nodes that are organized in [partitions](/userinfo/hpc/#job-queues) based on the type of processing they can do.  Most of the time you will select the `Standard` or `Dev` partition.  If you are running machine or deeplearning models that support GPUs, you will want to use the `GPU` partition.
    * **Number of hours:** The number of hours defines the amount of time that your session will be active.  Beware--when time runs out the session will end without warning.
    * **Allocation (SUs):** An [allocation](/userinfo/hpc/allocations) is a special Grouper (requires VPN connection) group that holds the service units you may use for your computation.  You may be a member of multiple allocation groups.

      When done filling in the resources, click on the blue “Launch” button at the bottom of the form.

2. It may take some time for the system to find and allocate the requested resources.  When the resources are ready a `Launch Desktop` button will appear. Click on the button and the Desktop session will open in a new tab.

    <img src="/images/ood/ood-desktop-launch.png" style="height:100%;width:100%"></img>


3. The Desktop Environment 

    <img src="/images/ood/ood-desktop.png" style="height:100%;width:100%"></img>





