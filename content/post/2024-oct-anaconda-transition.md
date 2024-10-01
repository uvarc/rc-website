+++
images = [""]
author = "Staff"
description = ""
date = "2024-10-01T00:00:00-05:00"
title = "Transition from Anaconda to Miniforge: October 15, 2024"
# url = "/maintenance"
draft = false
tags = ["anaconda"]
categories = ["feature"]
+++

<p class="lead">
Due to the new licensing restrictions by Anaconda  on research usage, the licensed Anaconda distribution will be removed from the system on October 15, 2024. The current anaconda/2023.07-py3.11 module will redirect to the miniforge/24.3.0-py3.11 module, switching to conda-forge as the default package installation channel with fewer preinstalled packages. Existing environments will not be affected. However, using Anaconda default channels for research without a personal license will violate the Anaconda license. For instructional use, package installation from licensed channels is still allowed
</p>

# Maintenance: Oct 15, 2024

{{< alert-green >}}The UVA high-performance computing (HPC) system will be down for maintenance on **Tuesday, Oct 15, 2024,** beginning at 6 a.m. The HPC systems are expected to return to full service by 6 a.m. on **Wednesday, Oct 16.**{{< /alert-green >}}

You may continue to submit jobs until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until the HPC systems are returned to service.

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

Miniforge and Anaconda are both popular tools for managing Python environments and packages, but they differ in a few key ways:

### 1. **Size and Preinstalled Packages**:
   - Anaconda base environment came with a large number of preinstalled data science libraries. However, miniforge only includes the essential Conda and Mamba package managers along with commonly used packages such as numpy, pandas, matplotlib, etc., from the conda-forge channel.

### 2. **Default Package Channels**:
   - **Anaconda**: Uses Anaconda’s proprietary channels (Anaconda repository) for package installations by default. These packages may have specific licensing restrictions.
   - **Miniforge**: Uses `conda-forge` as its default channel, an open-source community-driven repository, ensuring more transparency and flexibility without proprietary limitations.

### 3. **Licensing**:
   - **Anaconda**: The default Anaconda distribution has licensing restrictions for commercial and research use, requiring a paid license for certain types of usage.
   - **Miniforge**: Has no such restrictions since it uses `conda-forge`, which provides fully open-source packages.


{{% /accordion-item %}}

{{% accordion-item title="2. Can I still use my conda environements?" id="faq-2" %}}

The use of your existing environments should not be affected by this change. For instructional use you may continue to install python packages from the licensed Anaconda default channels as shown in the example below.

`conda install -n path-to-my-conda-enf seaborn -c anaconda`

However, any use of such environment for research purposes is a violation of the Anaconda license unless you obtained your own license. Therefore, for research use, it is expected to replace packages installed through the anaconda restricted channels with packages from non-proprietary channels such as conda-forge.   

{{% /accordion-item %}}

{{% accordion-item title="3. How to use miniforge to create conda envs?" id="faq-3" %}}

The process and commands for creating conda environments using Miniforge are exactly the same. The only difference is that you need to load the Miniforge module instead of the Anaconda module on our system.Basically,

`module load miniforge`

`conda create -n your_env_name_goes_here (default Python version: use conda info to find out)`

{{% /accordion-item %}}

{{% accordion-item title="4. Why are we switching from Anaconda to Miniforge?" id="faq-4" %}}

Miniforge avoids violating Anaconda's Terms of Service because it pulls packages from the conda-forge channel by default. Conda-forge is a community led collection of recipes, build infrastructure and distributions for the conda package manager and is free to use.

{{% /accordion-item %}}

{{% accordion-item title="5. Will I lose access to any packages that I had with Anaconda?" id="faq-5" %}}

No. The packages that you had installed previously will not disappear or become inaccessible.

{{% /accordion-item %}}

{{% accordion-item title="6. How do I install Anaconda packages if I need them (e.g., licensed or proprietary ones)?" id="faq-6" %}}

The Miniforge module includes the conda package management system. You can use `conda install <package-name>` as you may have done previously using the Anaconda module. Miniforge uses the conda-forge channel by default.

{{% /accordion-item %}}

{{% accordion-item title="7. Can I still use `pip` to install non-Conda packages with Miniforge?" id="faq-7" %}}

answer to faq7

{{% /accordion-item %}}

{{% accordion-item title="8. Will my existing Conda environments work with Miniforge?" id="faq-8" %}}

answer to faq8

{{% /accordion-item %}}

{{% accordion-item title="9. How do I update packages and environments in Miniforge?" id="faq-9" %}}

answer to faq9

{{% /accordion-item %}}

{{% accordion-item title="10. Will my scripts that depend on specific Anaconda packages break when switching to Miniforge?" id="faq-10" %}}

answer to faq10

{{% /accordion-item %}}

{{% accordion-item title="11. What channels are available by default in Miniforge?" id="faq-11" %}}

answer to faq11

{{% /accordion-item %}}

{{% accordion-item title="12. Can I still use the Anaconda repository with Miniforge?" id="faq-12" %}}

answer to faq12

{{% /accordion-item %}}

{{% accordion-item title="13. How do I migrate my existing Anaconda environments to Miniforge?" id="faq-13" %}}

answer to faq13

{{% /accordion-item %}}

{{% accordion-item title="14. How do I get help if I encounter problems during the transition?" id="faq-14" %}}

answer to faq14

{{% /accordion-item %}}

{{% accordion-item title="15. Will miniforge be compatible OOD JupyterLab ?" id="faq-15" %}}

answer to faq15

{{% /accordion-item %}}

{{% /accordion-group %}}


## Announcements 

{{% accordion-group title="Comms" id="commsgroup" %}}


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

{{% /accordion-item %}}

{{% /accordion-group %}}
