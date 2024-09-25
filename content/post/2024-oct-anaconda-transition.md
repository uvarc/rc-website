+++
images = [""]
author = "Staff"
description = ""
date = "2024-10-15T00:00:00-05:00"
title = "Transition from Anaconda to Miniforge module: October 1, 2024"
# url = "/maintenance"
draft = false
tags = ["anaconda"],["miniforge"]
categories = ["feature"]
+++

<p class="lead">
Due to the new licensing restrictions by Anaconda  on research usage, the licensed Anaconda distribution will be removed from the system on October 15, 2024. The current anaconda/2023.07-py3.11 module will redirect to the miniforge/24.3.0-py3.11 module, switching to conda-forge as the default package installation channel with fewer preinstalled packages. Existing environments will not be affected. However, using Anaconda default channels for research without a personal license will violate the Anaconda license. For instructional use, package installation from licensed channels is still allowed
</p>

# Maintenance: Oct 15, 2024

{{< alert-green >}}The HPC system in the standard security zone, including <i>Rivanna</i>, will be down on <strong>Tuesday, July 2, 2024</strong> beginning at 6 a.m. During the downtime RC engineers will implement final configuration changes in preparation of the <b>full production release of the new <i>Afton HPC system</i></b>.{{< /alert-green >}}

You may continue to submit jobs until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until the HPC systems are returned to service.

The *Rivanna* and *Afton* production systems are expected to return to service by **Wednesday, July 3 at 6 a.m.**

**Questions:** Please contact our <a href="/form/support-request/?category=Storage&request_title=Project%20storage%20data%20migration" class="card-link" target="_blank">user services team</a>, or join us for our [virtual office hours](/support/#office-hours) every Tuesday, 3-5 p.m. and Thursday, 10-12 p.m..


{{% callout %}}
## What to expect after the Oct 15 maintenance?

The licensed Anaconda distribution and base environment provided by the anaconda module will be removed from our systems on Oct 15, 2024. The anaconda module will redirect to the new miniforge/24.3.0-py3.11 module, effectively switching to conda-forge as the only default package installation channel and with a reduced number of preinstalled packages in the base environment.  

The use of your existing environments should not be affected by this change. For instructional use you may continue to install python packages from the licensed Anaconda default channels as shown in the example above. However, any use of such environment for research purposes is a violation of the Anaconda license unless you obtained your own license.   

We understand that these changes may cause inconvenience, but these changes are mandated by the Anaconda licensing condition which we cannot control. If you have any questions or concerns, please feel free to reach out. 

## What to expect after the December 12?



{{% /callout %}}

## FAQ

{{% accordion-group title="Group" id="faqgroup"%}}

{{% accordion-item title="1. How miniforge is different from Anaconda?" id="faq-1" %}}

answer to faq1

{{% /accordion-item %}}

{{% accordion-item title="2. Can I still use my conda environements?" id="faq-2" %}}

answer to faq2

{{% /accordion-item %}}

{{% accordion-item title="3. How to use miniforge to create conda envs?" id="faq-3" %}}

answer to faq3

{{% callout %}}
**Please note:** {{% pi-eligibility %}}
{{% /callout %}}


{{% /accordion-group %}}

## Announcements 

{{% accordion-group title="Comms" id="commsgroup" %}}


{{% /accordion-item %}}


{{% accordion-item title="Aug 27, 2024 - Change to Anaconda Module on Our System" id="comm-1" %}}

Dear PI, 

This message is important if you intend to use the anaconda/2023.07-py3.11 for your fall classes. Due to the recent licensing restrictions by Anaconda  on research usage, we will be removing the licensed Anaconda distribution from our system on October 15, 2024.  

As an alternative we have installed the miniforge/24.3.0-py3.11 module, which includes the essential Conda and Mamba package managers along with commonly used packages such as numpy, pandas, matplotlib, etc., from the conda-forge channel. 

**How should I prepare?** 

Between now and October 15, you may load the existing anaconda module or the newly installed miniforge/24.3.0-py3.11 module. Both modules provide the same conda commands to manage and use your conda environments.  

Important: By default, the miniforge distribution will only provide packages from the conda-forge channel. Therefore, if you require packages from channels that are covered by the Anaconda repository Terms of Service (main/anaconda, r, msys2) you may specify this in your installation command but only for environments that are restricted to educational use, i.e., instructional work in your classes. For example, to install the seaborn package from the Anaconda default channels, you would use: 

conda install –n path-to-my-conda-env seaborn –c anaconda 

**What to expect on October 15, 2024?** 

The licensed Anaconda distribution and base environment provided by the anaconda module will be removed from our systems on Oct 15, 2024. The anaconda module will redirect to the new miniforge/24.3.0-py3.11 module, effectively switching to conda-forge as the only default package installation channel and with a reduced number of preinstalled packages in the base environment.  

The use of your existing environments should not be affected by this change. For instructional use you may continue to install python packages from the licensed Anaconda default channels as shown in the example above. However, any use of such environment for research purposes is a violation of the Anaconda license unless you obtained your own license.   

We understand that these changes may cause inconvenience, but these changes are mandated by the Anaconda licensing condition which we cannot control. If you have any questions or concerns, please feel free to reach out. 
  
At your service, RC staff 
 
 
Research Computing

E hpc-support@virginia.edu
P 434.243.1107

University of Virginia
P.O. Box 400231
Charlottesville 22902


{{% /accordion-group %}}
