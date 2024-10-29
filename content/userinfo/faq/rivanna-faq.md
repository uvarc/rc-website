+++
description = ""
title = "Rivanna and Afton FAQs"
draft = false
date = "2020-02-14T01:45:12-05:00"
tags = ["hpc","rivanna","faqs","supercomputer"]
categories = ["userinfo"]
images = [""]
author = "Staff"
type = "rivanna"

+++

* [General Usage](#general-usage)
* [Allocations](#allocations)
* [Research Software](#research-software)
* [Job Management](#job-management)
* [Storage Management](#storage-management)
* [Data Transfer](#data-transfer)
* [Downloading Files](#downloading-files)
* [Other Questions](#other-questions)

- - -

# General Usage

## How do I gain access to Rivanna/Afton?
A faculty member must first request an allocation on the HPC system. Full details can be found [here](/userinfo/hpc/allocations).

## How do I log on to Rivanna/Afton?
Use an SSH client from a campus-connected machine and connect to `login.hpc.virginia.edu`. Instructions for using ssh and other login tools, as well as recommended clients for different operating systems, are [here](/userinfo/hpc/login). You can also access the HPC system through our Web-based interface [Open OnDemand](/userinfo/hpc/ood) or [FastX](/userinfo/hpc/logintools/fastx).

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

# Allocations

## What is an allocation?

Time on the HPC system is allocated as Service Units (SUs). One SU corresponds to one core-hour. Multiple SUs make up what is called an allocation (e.g., a new allocation = 100K SUs). Allocations are managed through [Grouper](https://groups.identity.virginia.edu/) (requires VPN connection) groups. These groups must be created by the Principal Investigators (PIs) prior to submitting an allocation request. Full details can be found [here](/userinfo/hpc/allocations).

## How can I request an allocation?

The different Service Unit (SU) allocation types are explained in [this article](/userinfo/hpc/allocations/#allocation-types). It includes links to our allocation request webforms.

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

Only [Standard Allocations](/userinfo/hpc/allocations/#standard-allocations) and [Instructional Allocations](/userinfo/hpc/allocations/#instructional-allocations) have an expiration date. PIs may request renewal of their expired allocation. [Purchased Allocations](/userinfo/hpc/allocations/#allocation-purchases) never expire.

## How are Service Units Reserved?

When a job is submitted the account manager calculates the required maximum amount of Service Units (SUs) using the assumption that the job will run the full amount of time requested. These SUs are held in reserve as a "lien" against the allocation charged for the job.  When the job completes the lien is released and the _actual_ SUs consumed
are deducted from the allocation balance. See [How do I check my allocation status on Rivanna/Afton?](/userinfo/faq/rivanna-faq/#how-do-i-check-my-allocation-status-on-rivanna) for specifics.

## How are Service Units charged for specialty hardware, e.g. GPU and large memory nodes?

Service Units (SUs) serve as a general single currency on the HPC system. SUs in a given allocation account can be used freely to run jobs on nodes in the standard, parallel, gpu and interactive queues.  Please note that the SU charge rate is different for some of the specialty hardware, e.g. the GPU nodes, as listed [here](/userinfo/hpc/#job-queues).

## How do I create a group or manage members in my allocations?
You must use the Grouper (requires VPN connection) interface to create the group, and you must have administrative access to the group. New groups will require two owners who hold active roles at UVA, as well as a third departmental owner. Group owners will be required to perform an annual attestation of group membership. If group owners do not complete attesting to the validity of their group, the members will be automatically removed from the group. Note that If you need to set up a new group or modify a group that was created after November 28th, 2023, go to [Grouper](https://groups.identity.virginia.edu/). Legacy MyGroups groups created before November 28th, 2023, can be accessed through the "Legacy MyGroups" folder on  [Grouper](https://groups.identity.virginia.edu/).

## How do I check allocation usage of individual group members?
Please visit [here](/userinfo/hpc/slurm/#usage-report) to see how to generate an allocation usage report.

## I submitted a job and received an error “Invalid account or account/partition combination specified”. What should I do?
All resource requests through the Open OnDemand interactive apps or through slurm batch jobs require you to specify an allocation for your job. If you do not input an allocation name, you will get this error.

If you are experiencing this error and you have input an allocation, verify what allocations you are a part of as described [here](#how-do-i-check-my-allocation-status-on-rivanna). Verify that you are inputting the allocation name exactly as you see it all in lowercase.

## I submitted a job and receive an error "Insufficient balance. Applying funds failure for JobId=".  What should I do?
The error indicates that your allocation group does not have enough service units to execute the job. Check your allocation status as described [here](#how-do-i-check-my-allocation-status-on-rivanna). Also verify that your allocation has not expired, see [here](#how-do-i-check-an-allocations-expiration-date).

Only [Standard Allocations](/userinfo/hpc/allocations/#standard-allocations), and [Instructional Allocations](/userinfo/hpc/allocations/#instructional-allocations) have an expiration date. PIs may request renewal of their expired allocation. [Purchased Allocations](/userinfo/hpc/allocations/#allocation-purchases) never expire.

- - -

# Research Software

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

# Job Management

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

This makes it so that Slurm does not carry over any environment variables into your running job. Be sure to include the necessary `module load` or `conda activate` commands in your script to run your code. If you are using srun in your Slurm script, see an example script [here](/userinfo/hpc/software/anaconda/#mpi)

- - -

# Storage Management

## What storage options are available to me to use on Rivanna/Afton?
All users are provided a 200-GB home directory for longer-term storage.  This directory provides "snapshots" though it is not backed up.  Each user also is provided 10TB of temporary "scratch" storage accessible as `/scratch/$USER` where `$USER` will stand for your ID.  Scratch storage is fast but is not backed up in any way.

If the free storage is not sufficient, you need snapshots of your files, or you wish to share space among a research group, the group should lease storage.

## Why should I use /scratch storage?
Scratch storage is fast and provides a large quantity of free space.  However, there are limits on the number of files and the amount of space you may use.  This is to maintain the stability and performance of the system.  [Please review our scratch filesystem policy for details](/userinfo/hpc/#scratch-directory). If you use or expect to use a large number of files please contact us.


## How do I obtain leased storage?
Research Computing offers two tiers of leased storage, _Research Standard_ and _Research Project_. Please see our [storage page](/userinfo/storage) for details.

## How do I check my disk usage?
Run `hdquota` on a HPC frontend.

## How do I check my `/scratch` usage on Rivanna/Afton?
Run the command `hdquota -s`:

```
hdquota -s
```

If you have used up too much space, created too many files, or have "old" files you may be regarded as "overallocated". Please note that if you are overallocated, you won't be able to submit any new jobs until you clean up your `/scratch` folder.

## If I'm over my disk quota in either in my `/home` directory or my `/scratch` directory, how can I determine my disk usage?
You can run the following command from your `/home` or `/scratch` directory to see how your disk usage is distributed
across subdirectories, and where you need to remove files. You can increase `max-depth` to go further down in the directory structure.

```
du . -h  --max-depth=1|sort -h -r
```

## If I'm over my file limit in `/scratch`, how can I determine where all the files are located?
From your `/scratch` directory, run the following command to determine where you need to remove files.

```
find . -type f | cut -d/ -f2 | sort | uniq -c
```

## How long can I store files in `/scratch`?
`/scratch` is designed to serve as fast, temporary storage for running jobs, and is not long-term storage. For this reason, files are periodically marked for deletion from all `/scratch` directories. [Please review the /scratch filesystem policy for more details](/userinfo/hpc/#scratch-directory).  Store longer-term files in your home directory or [purchased storage](/userinfo/storage/non-sensitive-data/#public--moderately-sensitive-data-storage).

## How do I share data in my `/scratch` or leased storage with a colleague?
To share data from your `/scratch` directly with any other user, use [Globus](/userinfo/globus) sharing.  If your colleague also has an account on UVA HPC, he or she does not need to set up a personal endpoint but can simply log into the uva#main-DTN endpoint and navigate to his or her `/scratch` directory to transfer the files.

If you wish to share data in leased space with a member of your group, be sure that permissions are set so that the group member can access your subdirectory.  The college can then simply use the data directly, or copy it elsewhere.  If you wish to share data from your leased storage to a colleague who is not a member of the group, use Globus sharing in the same manner as sharing `/scratch`.

- - -

# Data Transfer

## How do I transfer data from UVA Box to my /scratch directory on Rivanna/Afton?

Log into UVA HPC using the web-based FastX and launch the MATE Desktop interface. Then from the top menu bar, open firefox through the FastX desktop, in the upper right hand corner of the browser window you should see 3 horizontal bars. Click on that and then select Preferences from the drop-down window. In the new window scroll down until you see Downloads and select ‘Always ask you where to save files’.  Then when you go to Box to download, a new window will pop up and if you click on ‘Other locations’, you can navigate to your scratch directory.

## How do I transfer data from my /scratch directory on Rivanna/Afton to my UVA Box account?

Log into UVA HPC using the web-based FastX and launch the MATE Desktop interface. Then from the top menu bar, open firefox through the FastX desktop and log into your UVA Box account. Once logged in to box, click on the New + button (upper right) to upload a file/folder. In the left sidebar of the new window, select Other Locations/Computer/scratch/<yourid> to navigate to your scratch directory and select the files/folders you want to upload to your box account.

## What Linux commands can I use to transfer files to/from Rivanna/Afton?

Smaller files can be transferred to/from Rivanna/Afton using `scp`, `sftp`, and `rsync` as well as standard FTP tools.

Larger files should be moved using [Globus](/userinfo/globus/).

[Read more](/userinfo/data-transfer/) about data transfer.

## I need to push and commit code changes from Rivanna/Afton to my GitHub account. How do I set that up?

You must first generate an ssh key and then copy it to your git repository. Here are the instructions for generating the ssh key and what to do on your git page:

1. To generate an ssh key, see the following link: [ssh key generation](https://www.rc.virginia.edu/userinfo/howtos/general/sshkeys/)

2. Click on the drop-down menu next to my Git profile picture in the upper right corner; Select Settings; Click on SSH and GPG keys in the left column; Click on the New SSH Key button and followed the directions to upload your ssh key.
Make sure that the ssh key is in your authorized_keys file in your .ssh directory on Rivanna/Afton.

3. The next step is to clone the repository using the ssh link. If you have already cloned the repository using the http link and made a number of changes to your files, you won’t want to redo them.  Rename the directory that was created when you first cloned the repository. Then, re-clone the repository using the ssh link and copy all of the files you had changed to the new directory. Finally, push those changes back to the repository.

# Downloading Files

## What command-line tools are available on Rivanna/Afton for downloading files from web?

#### wget

wget can be used to download files over HTTP,HTTPS and FTP protocols. You can use wget to download files from a single URL or multiple URLs. For example to download a file from a website you can use the following command:
```bash
wget https://example.com/file.zip
```
#### curl

In addition to what mentioned for wget, curl can be used to upload files to a server as well. To download a file from a website, you can use the following command:
```bash
curl -O https://example.com/file.zip
```

#### axel

axel not only downloads files over different protocols, but accelerates the process by using multiple connections to retrieve files from the destination. Axel is available on Rivanna/Afton through `module load axel`.
The syntax for using axel over 10 connections is as follows:
```bash
axel -n 10 http://example.com/file.zip
```

## wget, curl or axel?

For rather small files of size <1GB, it might be easier to use `wget` or `curl` since module loading is not necessary. For large files it is recommended to use axel on a compute node. Below is a simple comparison between the download rate of these tools on a single core compute node on Rivanna/Afton:


| tool | 100MB | 1GB |
|------|------|------|
| wget | ~5s | 36s |
| curl | ~5s | 35s |
| axel | ~2s | 8s |  

# Other Questions
What if my question doesn't appear here? Take a look at our User Guide.  If your answer isn't there, contact us.
