+++
description = ""
title = "Rivanna and Afton FAQs"
draft = false
date = "2024-12-03T01:45:12-05:00"
tags = ["hpc","rivanna","faqs","supercomputer"]
categories = ["userinfo"]
images = [""]
author = "Staff"
type = "rivanna"

+++

* [General Usage](#general-usage)
* [Allocations](#allocations)
* [Dedicated Computing](#dedicated-computing)
* [Research Software](#research-software)
* [Job Management](#job-management)
* [Other Questions](#other-questions)

- - -

# <u>General Usage</u>

## How do I gain access to Rivanna/Afton?
A faculty member must first request an allocation on the HPC system. Full details can be found [here](/userinfo/hpc/access).

## How do I log on to Rivanna/Afton?
Use an SSH client from a campus-connected machine and connect to `login.hpc.virginia.edu`. Instructions for using ssh and other login tools, as well as recommended clients for different operating systems, are [here](/userinfo/hpc/login). You can also access the HPC system through our Web-based interface [Open OnDemand](/userinfo/hpc/ood) or [FastX](/userinfo/hpc/logintools/fastx).

Please note that the old Domain Name System (DNS) entries for logging into Rivanna/Afton HPC have been removed. Please refer to the table below for the updated login names.

|Old|New|
|---|---|
|rivanna.hpc.virginia.edu -> | login.hpc.virginia.edu|
|rivanna-desktop.hpc.virginia.edu -> | fastx.hpc.virginia.edu|
|rivanna-portal.hpc.virginia.edu -> | ood.hpc.virginia.edu|

{{% off-campus %}}

## How do I reset my current password / obtain a new password? {#how-do-i-reset-my-current-password-obtain-a-new-password}
Access to the HPC cluster requires a valid ITS (Netbadge) password. If you are unable to log in, you should first try resetting your ITS password [here](https://virginia.service-now.com/its?id=itsweb_kb_article&sys_id=2f47ff87dbf6c744f032f1f51d961967).  If the problem persists, contact ITS through their online [Helpdesk](https://virginia.service-now.com/its?id=itsweb_kb_article&sys_id=15ff3b8fdb3ac744f032f1f51d9619c9).  Keep in mind that ITS requires annual resetting of your password.  If you see a "password expired" message, you will need to change it through ITS.

## What happens to my account when I leave UVA?
ITS controls access to the University’s computing resources, so when you or your students leave, you/they may lose access to many of these resources. Sponsored accounts allow people who work or volunteer at UVA, but who are not paid by UVA, to access the University’s computing resources. Researchers with sponsored accounts cannot request RC services but they are allowed to use the systems we manage as members of a Grouper (requires VPN connection) group controlled by a UVA Principal Investigator (PI). Details on sponsored accounts are posted on the [ITS sponsored accounts page](https://virginia.service-now.com/its/?id=itsweb_kb_article&sys_id=8fec94fcdb296b4c2192e6650596199b).

## Why am I seeing `WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED` when I log in?
Some users logging in through ssh may encounter this error message. If you receive this message, please see [our instructions](/userinfo/hpc/logintools/rivanna-ssh/#troubleshooting) on how to clear this error.


## When I try to log in with ssh, nothing happens when I type my password!
When you type your password, the ssh program does not echo your typing or move your cursor.  This is normal behavior.

## When running Firefox on the HPC system, I get : "Firefox is already running, but is not responding. To open a new window, you must first close the existing Firefox process, or restart your system." What can I do?

From a terminal in your home directory on the HPC system, run the commands:

```
rm -rf ~/.mozilla/firefox/*.default/.parentlock
rm -rf ~/.mozilla/firefox/*.default/lock
```

## When should I use FastX Web, when should I use an Open OnDemand Desktop session?
Both allow you to run applications with graphical user interfaces in a Linux Desktop environment.

[Open OnDemand Desktop:](/userinfo/hpc/ood/#desktop)
* Runs your session on allocated resources on a compute node.
* Ideal for running compute-intensive single-node applications with graphical user interface.
* Does not require a VPN connection from off-Grounds locations.
* Recommended practice for running interactive jobs (particularly for coursework with a reservation).

[FastX Web:](/userinfo/hpc/logintools/fastx/)
* Runs all users' sessions on a single frontend node.
* Good for light-weight file management, script editing.
* Requires a VPN connection from off-Grounds locations.

## How can I view .pdf or .csv files on Rivanna/Afton?

For .pdf files, run the command:
```
atril filename.pdf
```
You can also open Atril from a FastX or Open OnDemand desktop environment from the Applications&rarr;ffice menu.

The atril command can also be used to display image files, e.g. .png and .jpg files. Or you may use `eom FILE` (Eye of MATE) from a terminal.  Alternatively, you can open Eye of MATE from the MATE Desktop menu Applications&rarr;Graphics.

For .csv files, run the command:
```
oocalc filename.csv
```
where `filename` is a placeholder for the specific filename. The `oocalc` command invokes the LibreOffice spreadsheet program "Calc."  If logged on to a FastX or Open OnDemand Desktop, use the menu Applications&rarr;Office to access it.

## Why does it hang on log in? Why do OpenOnDemand interactive apps give conflicting package errors?

It could be that your .bashrc file is loading too many or conflicting modules respectively. See our [Modules](/userinfo/hpc/software/modules/) page on how to load modules within best practices. If your .bashrc file is getting too crowded, you should replace it with the default here:
```
# Source global definitions
if [ -f /etc/bashrc ]; then
    . /etc/bashrc
    fi

PS1="\s-\v\$"
alias vi='vim'
```

- - -

# <u>Allocations</u>

## What is an allocation?

Time on the HPC system is allocated as Service Units (SUs). One SU corresponds to one core-hour. Multiple SUs make up what is called an allocation (e.g., a new allocation = 100K SUs). Allocations are managed through [Grouper](https://groups.identity.virginia.edu/) (requires VPN connection) groups. These groups must be created by the Principal Investigators (PIs) prior to submitting an allocation request. Full details can be found [here](/userinfo/hpc/access).

## How can I request an allocation?

The different Service Unit (SU) allocation types are explained in [this article](/userinfo/hpc/access/#allocation-types). It includes links to our allocation request webforms.

## How do I check my allocation status on Rivanna/Afton? {#how-do-i-check-my-allocation-status-on-rivanna}

Run the `allocations` command.  The output may look like this:
```

Name           Balance  Reserved Effective Available
-------------- -------- -------- --------- ---------
rivanna_alloc  9885.811 1000.000  8885.811  8885.811

 for more information about a specific allocation,
 run: 'allocations -a <allocation group>'

```
The _Balance_ column shows the total of unused service units (SUs); the _Reserved_ column shows the number of SUs held for current active jobs (pending or running). The _Effective_ and _Available_ columns show the difference of _Balance_ and _Reserved_, i.e. the amount of SUs available for future jobs. **After a job completes, the SUs actually consumed will be deducted from the allocation Balance and any SUs unused by that job will be released from the Reserved pool.**

In all cases you can only submit additional jobs if the available SU
amount is sufficient to cover the full SU request for the jobs.

You do not need any allocation service units to access the frontend or files in
your directories as long as your account is active.

If you don't see your allocation, it may mean that you've been removed from the allocation group or that your allocation has expired.

## How do I check an allocation's expiration date?

To check an allocation's expiration date run `allocations -a <allocation group>` command.  Alternatively, run `mam-list-allocations`.

Only [Standard Allocations](/userinfo/hpc/access/#standard-allocations) and [Instructional Allocations](/userinfo/hpc/access/#instructional-allocations) have an expiration date. PIs may request renewal of their expired allocation. [Purchased Allocations](/userinfo/hpc/access/#allocation-purchases) never expire.

## How are Service Units Reserved?

When a job is submitted the account manager calculates the required maximum amount of Service Units (SUs) using the assumption that the job will run the full amount of time requested. These SUs are held in reserve as a "lien" against the allocation charged for the job.  When the job completes the lien is released and the _actual_ SUs consumed
are deducted from the allocation balance. See [How do I check my allocation status on Rivanna/Afton?](/userinfo/faq/rivanna-faq/#how-do-i-check-my-allocation-status-on-rivanna) for specifics.

## How are Service Units charged for specialty hardware, e.g. GPU and large memory nodes?

Service Units (SUs) serve as a general single currency on the HPC system. SUs in a given allocation account can be used freely to run jobs on nodes in the standard, parallel, gpu and interactive queues.  Please note that the SU charge rate is different for some of the specialty hardware, e.g. the GPU nodes, as listed [here](/userinfo/hpc/#job-queues).

## How does the system decide how long my job is queued? Does Slurm have "fairshare"? 

A variety of factors are considered when Slurm schedules your job and assigns it a priority. Some of these factors include: resource request (time, memory, etc.), allocation type (standard vs paid), your SU burn frequencies, and the frequency of jobs submitted from your allocation. Slurm on our system has fair use enabled to allow equitable access to our users across the system. Slurm calculates your fairshare based off of previously listed factors and assigns your job a fair priority. 


## How is my "Fairshare" impacted by the changed SU charge rates?

Your Fairshare value is driven by your SU consumption and affects the priority of jobs that you submit. This is true for both the standard and purchased allocations. If the changes to the SU consumption rates increases your SU consumption you will see a proportional impact on your Fairshare value.

## How do I create a group or manage members in my allocations?
You must use the Grouper (requires VPN connection) interface to create the group, and you must have administrative access to the group. New groups will require two owners who hold active roles at UVA, as well as a third departmental owner. Group owners will be required to perform an annual attestation of group membership. If group owners do not complete attesting to the validity of their group, the members will be automatically removed from the group. Note that If you need to set up a new group or modify a group that was created after November 28th, 2023, go to [Grouper](https://groups.identity.virginia.edu/). Legacy MyGroups groups created before November 28th, 2023, can be accessed through the "Legacy MyGroups" folder on  [Grouper](https://groups.identity.virginia.edu/).

## How do I check allocation usage of individual group members?
Please visit [here](/userinfo/hpc/slurm/#usage-report) to see how to generate an allocation usage report.

## How can I estimate the expected SU consumption for a new job?

We have developed a utility in Open OnDemand (OOD) called the [Slurm Script Generator](https://ood.hpc.virginia.edu/pun/sys/UVASlurmScriptGenerator). This tool generates a Slurm script based on the parameters specified by the user. Additionally, it estimates the number of Service Units (SUs) that will be billed based on the time requested in the script.

## I submitted a job and received an error “Invalid account or account/partition combination specified”. What should I do?
All resource requests through the Open OnDemand interactive apps or through slurm batch jobs require you to specify an allocation for your job. If you do not input an allocation name, you will get this error.

If you are experiencing this error and you have input an allocation, verify what allocations you are a part of as described [here](#how-do-i-check-my-allocation-status-on-rivanna). Verify that you are inputting the allocation name exactly as you see it all in lowercase.

## I submitted a job and receive an error "Insufficient balance. Applying funds failure for JobId=".  What should I do?
The error indicates that your allocation group does not have enough service units to execute the job. Check your allocation status as described [here](#how-do-i-check-my-allocation-status-on-rivanna). Also verify that your allocation has not expired, see [here](#how-do-i-check-an-allocations-expiration-date).

Only [Standard Allocations](/userinfo/hpc/access/#standard-allocations), and [Instructional Allocations](/userinfo/hpc/access/#instructional-allocations) have an expiration date. PIs may request renewal of their expired allocation. [Purchased Allocations](/userinfo/hpc/access/#allocation-purchases) never expire.

- - -

# <u>Dedicated Computing</u>

## Service Unit Allocation or Dedicated Computing--What is the right HPC service for me? 

The following table might help you decide which model suits you the best.

<table class="table" style="margin-top:2rem;">
    <thead class="thead-dark" style="">
      <tr>
        <th scope="col"></th>
        <th scope="col">SU Allocations</th>
        <th scope="col">Dedicated Computing</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Description</th>
        <td>Access to variety number of cores and node types</td>
        <td>Access to a [set of] dedicated node[s] of prespecified hardware with fixed number of cores</td>
      </tr>
      <tr>
        <th scope="row">Lifetime</th>
        <td>Standard alloc: 1 year; paid alloc: unlimited</td>
        <td>5 year (expected hardware EOL)</td>
      </tr>
      <tr>
        <th scope="row">Queue times</th>
        <td>System load dependent; standard alloc: default priority; paid alloc: shorter than standard allocation; no preemption</td>
        <td>None(assuming no contention for the dedicated resources by other group members)</td>
      </tr>
      <tr>
        <th scope="row">Max walltime</th>
        <td>3-7d</td>
        <td>Typically 1 to 5 years</td>
      </tr>
      <tr>
        <th scope="row">Ideal workload</th>
        <td>Even or bursty</td>
        <td>Even</td>
      </tr>
      <tr>
        <th scope="row">GPU or largemem</th>
        <td>Yes</td>
        <td>If that node type was purchased (can be expensive!)</td>
      </tr>
    </tbody>
</table>



To learn about RC's service models and how to request and access each, plese refer to [here](/userinfo/hpc/access).

## Can I still get access to HPC allocations without having to pay?

Yes, standard and instructional allocations remain available free of charge.

## What will happen to my unused SUs that I purchased before Jan 7, 2025?

The service unit balance of your paid allocation will carry forward as is. Please be aware of the new service unit consumption rates which are more directly tied to the hardware type number of cpu cores, memory, and specialty hardware (e.g. GPUs) requested. 

## What hardware options are available under the Dedicated Computing services? 

See [here](/userinfo/hpc/access/#dedicated-computing).

## Can the node I purchased under the Dedicated Computing model be configured as my personal login node to the HPC system? 

No. Dedicated computing hardware is configured as compute nodes only. 

- - -

# <u>Research Software</u>

## How do I use research software that's already installed?
We use the `lmod` system for managing software environments. [Learn more about how to use `lmod`](/userinfo/hpc/software/modules/).

## Does RC install research software?
Our staff will install software onto the HPC system if it is of wide applicability to the user community. Software used by one group should be installed by the group members, ideally onto leased storage for the group.  We can provide assistance for individual installations.

For help installing research software on your PC, please contact Research Software Support at [res-consult@virginia.edu](mailto:res-consult@virginia.edu).

## Is there any other way to install research software that I need?
Some groups and departments have installed a bundle of software they need into shared space.  Please see your departmental IT support personnel if your department has its own bundle.

## Can I run this Docker container on Rivanna/Afton?
We do not run Docker on the HPC system.  Instead we use Apptainer.  Apptainer can run Docker images directly, or you can convert a Docker image to an Apptainer image.  To import existing Docker images, use the `apptainer pull` command.
```
module load apptainer
apptainer pull docker://account/image
```

Software images built by Research Computing are hosted on Docker Hub. For example, to pull our PyTorch 1.5.1 image, run:
```
apptainer pull docker://uvarc/pytorch:1.5.1
```

Please visit [this page](/userinfo/hpc/software/containers/#container-registries-for-uva-research-computing) for more details.

## Can I run application/container X on a GPU?
Please check the user manual for your application/container before running on a GPU. For instance, scikit-learn does not have GPU support; hence using GPUs for scikit-learn will not help with your job performance but will only cost you more service units (see SU charge rate [here](/userinfo/hpc/#job-queues)) and prevent other users from using the GPUs.

[https://scikit-learn.org/stable/faq.html#will-you-add-gpu-support](https://scikit-learn.org/stable/faq.html#will-you-add-gpu-support)

## How can I make my Jupyter notebook from JupyterLab to run as a batch job on Rivanna/Afton?

1. Capture the information that you use to start up a JupyterLab session.  It helps to take a screenshot of the web form where you enter the partition, number of cores, amount of memory, etc.  You will need that information for requesting resources on a compute node.

2. Note which kernel is used to run your notebook.  This information will be needed later.

3. Convert the notebook to a regular script.  To do this, go into the notebook that you want to convert.  In the upper left corner, click on File > Export Notebook As > Export Notebook to Executable Script .  This will download the script onto your laptop.   On my computer, this leaves a blank window on my screen.  But, if I close that tab on my browser, the tab with the notebook returns.  I’m now down with the notebook and can terminate the session.

4. Upload the “executable script” to the HPC system. In Open onDemand dashboard view, on the black ribbon across the top, click on Files > Home Directory.  This will open a page that shows the files that you have in your home directory on Rivanna.  At the top of the page, toward the right, is a button labelled “Upload”.  Click on that button.  In the dialog box that appears, click on “Choose File”.  This will allow you to go to the downloaded file and select it.

5. Create a Slurm script to run your code.  The Slurm script list the resources and instructions that are needed to run your “executable script”.   See the following link:

      [https://www.rc.virginia.edu/userinfo/hpc/slurm/](https://www.rc.virginia.edu/userinfo/hpc/slurm/)

6. Open a terminal window on the HPC system, and move to the location where your scripts are.  We recommend using the web-based FastX application (see below). Once in a terminal window, type sbatch followed my the name of your Slurm script.

      [https://www.rc.virginia.edu/userinfo/hpc/login/#remote-desktop-access](https://www.rc.virginia.edu/userinfo/hpc/login/#remote-desktop-access)
- - -

# <u>Job Management</u>

## How do I submit jobs?
You submit jobs by writing a Slurm script and submitting it with the  sbatch command.  Please see our [Slurm documentation](/userinfo/hpc/slurm).

If you would like assistance in generating Slurm scripts, please check out our [Slurm Script Generator](/userinfo/hpc/slurm-script-generator). Simply input the parameters of your job to get a fully-working Slurm script.

## How do I submit an interactive job?
If you wish to run a program that requires a graphical user interface or generates other graphics for display, such as a plot or chemical model, use one of the [Open OnDemand](/userinfo/hpc/ood) interactive apps.  Several are available, but if you one you wish to use isn't in the list, submit an interactive [Desktop](/userinfo/hpc/ood/desktop) request.

If you will be using the command line for your interactive job you may use the locally-written ijob command. The minimum required options are -A and -c  for allocation and number of cores. Run `ijob -h` for a list of all options.

For more information see the [documentation](/userinfo/hpc/slurm).

## What queues can I use?
After logging in, run the command `qlist` to see a list of queues and their availability.  Run `qlimits` for the restrictions on submitting to each queue.

## How do I choose which queue to use?
Queues are set up to emphasize one-core (serial or threaded), multi-node parallel, and specialty hardware including large-memory nodes and GPUs.  

- Serial jobs requiring only 1 compute node: **standard**
- Parallel jobs requiring up to 50 compute notes: **parallel**
- Jobs requiring the use of GPUs: **gpu**
- Jobs for interactive sessions or quick tests of code:  **interactive**

More information about queue policy is at the [HPC homepage](/userinfo/hpc/#job-queues).

## How do I use the interactive queue?

The interactive queue is ideal for code development or other short interactive jobs that require active monitoring. Examples include Slurm ijobs and OOD interactive apps like JupyterLab, RStudio Server, MATLAB, etc. The interactive queue has a time limit of 12 hours per job, and users can request up to a maximum of 24 CPU cores or 2 GPUs and up to 216G of CPU memory across all jobs. For example, you can run 24 serial jobs or one 24-core job. To request a GPU on with OOD apps, you'll be asked if you want to use a GPU. If yes is selected you can choose one or two GPUs. In slurm, the user must specify the `--gres=gpu` flag for GPU access. If two GPUs are desired in Slurm, you can specify `--gres=gpu:2`.

## How do I check the status of my jobs?
From a terminal, run the command `squeue -u computingID`. Replace computingID with your specific UVA computing ID.  From Open OnDemand, use the Job Viewer and select "Your Jobs" as the filter.

If reporting a problem to us about a particular job, please let us know the JobID for the job that you are having a problem with.

## Why is my job not starting?
Several things can cause jobs to wait in the queue. Paid allocations have priority over standard allocations. If members of your group under the same PI using the same quality of service level (i.e. paid or standard) have consumed a large amount of compute time in the recent past, the “fair share” algorithm will give other users outside of your group higher priority access ahead of you. Finally, the queue you requested may simply be very busy. If your job is pending there will be another field with the reason; if it is “Resources” that means that the resource you requested isn’t available. If the reason is “Priority” it means that a job with higher priority than yours is running. Your job will rise in priority as it waits so it will start eventually. 

## How can I check when my job will start?
To request an estimate from the queueing system of your start time, run 
```
squeue -u $USER --start
```
for all your jobs, or
```
squeue -j <jobid> --start
```
for a specific job. Slurm will provide an estimate of the day and time your job will start.

## Why was my job killed?
Usually this is because you inadvertently submitted the job to run in a location that the compute nodes can't access or is temporarily unavailable.  If your jobs exit immediately this is usually why.  Other common reasons include using too much memory, too many cores, or running past a job's time limit.

You can run `sacct`:

```
[mst3k@udc-ba36-27:/root] sacct
       JobID    JobName  Partition    Account  AllocCPUS      State ExitCode
------------ ---------- ---------- ---------- ---------- ---------- --------
159637       ompi_char+   parallel  hpc_admin         80  COMPLETED      0:0
159637.batch      batch             hpc_admin          1  COMPLETED      0:0
159637.0          orted             hpc_admin          3  COMPLETED      0:0
159638       ompi_char+   parallel  hpc_admin        400    TIMEOUT      0:1
159638.batch      batch             hpc_admin          1  CANCELLED     0:15
159638.0          orted             hpc_admin         19  CANCELLED  255:126
```

If it's still not clear why your job was killed, please contact us and send us the output from `sacct`.

## Why can't I submit jobs anymore?
In order to be allowed to submit jobs, you must not be overallocated with your `/scratch` usage and you must have some remaining service units. There is a limit of 10 TB of space used per user in each `/scratch` directory and if you exceed either of those limits, you will not be able to run jobs until you clean up.  To check whether this is the case, run

```
hdquota -s
```

If you have not exceeded the limits on `/scratch`, check whether your account has allocation units remaining by running

```
allocations
```

## Why do I get `sbatch error: Batch script contains DOS line breaks`
If you use a Windows editor to create Slurm batch scripts, when you try to run them you may encounter an error
```
sbatch: error: Batch script contains DOS line breaks (\r\n)
sbatch: error: instead of expected UNIX line breaks (\n).
```
Windows and Linux use different conventions to mark the end of each line.  Many applications on the HPC system, such as compilers, Matlab, etc., understand Windows end-of-line markers, but the shell does not.  This is easy to fix by running the `dos2unix` command
```
dos2unix myscript.slurm
```
It will not hurt to run `dos2unix` on a file that doesn't need it. Sometimes you get `{^M}` character at the end of every line when the file was imported from Windows environment. `dos2unix` usually takes care of the problem, but not 100% all the time.

## How do I check how much SU's my job has burnt?

To find out how many Service Units (SUs) a specific job has consumed, users can run the following command. Here the value under the `Amount` column shows the amount of SUs consumed. The time-frame can be controlled using the `-s`(starting time) and `-e`(end time) flags.
```
$  mam-list-transactions -a <allocation-name> -s 2024-11-01 -e 2024-12-03  # -s:starting date   -e: end date
```

## How do I check the efficiency of my completed jobs?
Run the command `seff` on the Slurm job ID:

```
udc-ba34-36-deepLearning$seff 40330441
Job ID: 40330441
Cluster: shen
User/Group: teh1m/users
State: COMPLETED (exit code 0)
Nodes: 1
Cores per node: 2
CPU Utilized: 00:15:14
CPU Efficiency: 89.08% of 00:17:06 core-walltime
Job Wall-clock time: 00:08:33
Memory Utilized: 6.89 GB
Memory Efficiency: 58.76% of 11.72 GB
udc-ba34-36-deepLearning$
```

The output of this command is also contained in the email sent by Slurm once your job completes.

## My jobs are failing due to an incorrect environment setup, but I am loading my modules and/or conda environments correctly in my job script. What is wrong?

When submitting jobs using sbatch, Slurm will remember the environment that you were working in. This means that loaded modules, activated conda environments, and generally all the environment variables set in the terminal prior to job submission will follow through into your job. A way to avoid this issue from happening is to include the following line into your Slurm script:

```
#SBATCH --export=NONE
```

This makes it so that Slurm does not carry over any environment variables into your running job. Be sure to include the necessary `module load` or `conda activate` commands in your script to run your code. If you are using srun in your Slurm script, see an example script [here](/userinfo/hpc/software/miniforge/#mpi)

- - -

# Other Questions
What if my question doesn't appear here? Take a look at our User Guide.  If your answer isn't there, contact us.
