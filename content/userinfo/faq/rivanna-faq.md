+++
description = ""
title = "Rivanna FAQs"
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
* [Applications](#applications)
* [Job Management](#job-management)
* [Storage Management](#storage-management)
* [Data Transfer](#data-transfer)
* [Other Questions](#other-questions)

- - -

# General Usage
  
## How do I gain access to Rivanna?
A faculty or research staff member must first request an allocation on Rivanna. Full details can be found [here](/userinfo/rivanna/allocations).

## How do I log on to Rivanna?
Use an SSH client from a campus-connected machine and connect to `rivanna.hpc.virginia.edu`. Instructions for using ssh and other login tools, as well as recommended clients for different operating systems, are [here](/userinfo/rivanna/login). You can also access Rivanna through our Web-based interface [Open OnDemand](/userinfo/rivanna/ood/overview) or [FastX](/userinfo/rivanna/logintools/fastx).  If you are off Grounds you must use the [UVA Anywhere VPN](https://virginia.service-now.com/its?id=itsweb_kb_article&sys_id=f24e5cdfdb3acb804f32fb671d9619d0).

## How do I reset my current password / obtain a new password?
Access to the HPC cluster requires a valid Eservices password. Your Netbadge password is not necessarily the same thing, so if you are unable to log in, you should first try resetting your ITS password [here](https://virginia.service-now.com/its?id=itsweb_kb_article&sys_id=2f47ff87dbf6c744f032f1f51d961967).  Resetting the Netbadge password should sync it with your Eservices password, which is no longer directly accessible to you. If the problem persists, contact ITS through their online [Helpdesk](https://virginia.service-now.com/its?id=itsweb_kb_article&sys_id=15ff3b8fdb3ac744f032f1f51d9619c9).  Keep in mind that ITS requires annual resetting of your password.  If you see a "password expired" message, you will need to change it through ITS.

## Why am I seeing `WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED` when I log in?
Some users logging in through ssh may encounter this error message. If you receive this message, please see [our instructions](/userinfo/rivanna/logintools/rivanna-ssh/#troubleshooting) on how to clear this error.

- - -

# Allocations
  
## How do I check my allocation status on Rivanna?
Run the command `allocations`

In all cases you will need to use an account with remaining service units in order to submit jobs.  You do not need any allocation units to access the frontend or files in your directories as long as your account is active.

## How do I add or remove people from my allocations?
You must use the MyGroups interface to do this, and you must have administrative access to the group.

- - -

# Applications
  
## How do I use research software that's already installed?
We use the `lmod` system for managing software environments. [Learn more about how to use `lmod`](/userinfo/rivanna/software/modules/).

## Does RC install research software?
Our staff will install software onto Rivanna if it is of wide applicability to the user community. Software used by one group should be installed by the group members, ideally onto leased storage for the group.  We can provide assistance for individual installations.

For help installing research software on your PC, please contact Research Software Support at [res-consult@virginia.edu](mailto:res-consult@virginia.edu).

## Is there any other way to install research software that I need?
Some groups and departments have installed a bundle of software they need into shared space.  Please see your departmental IT support personnel if your department has its own bundle.

## Can I run this Docker container on Rivanna?
We do not run Docker on Rivanna.  Instead we use Singularity.  Singularity can run Docker images directly, or you can convert a Docker image to a Singularity image.  To import existing Docker images, use the `singularity pull` command.
```
singularity pull docker://account/image
```

- - -

# Job Management
  
## How do I submit jobs?
You submit jobs by writing a SLURM script and submitting it with the  sbatch command.  Please see our SLURM documentation page.

## How do I submit an interactive job?
You may use the locally-written ijob command to submit an interactive job. The minimum required options are -A and -c  for allocation and number of cores. Run `ijob -h` for a list of all options.

If you wish to forward X11 in order to use a graphical user interface or to run other graphics programs, on the Rivanna frontend node run `ssh -Y $HOSTNAME` before you run ijob.

For more information see the documentation.

## What queues can I use?
After logging in, run the command `queues` to see a list of queues to which you have access and their current status.

## How do I choose which queue to use?
Queues (partitions to SLURM) are set up to emphasize one-core (serial or threaded), multi-node parallel, and specialty hardware including large-memory nodes and GPUs.  More information about queue policy is at the Rivanna homepage.

## How do I check the status of my jobs?
Run the command `jobq`

If reporting a problem to us about a particular job, please let us know the JobID for the job that you are having a problem with. You can also run `jobq -l` to relate particular jobs to specific submission scripts.

## Why is my job not starting?
Several things can cause jobs to wait in the queue. If you request a resource combination we do not have, such as 28 cores on a parallel node, the queueing system will not recognize that this condition will not be met and will leave the job pending (PD). You may also have run a large number of jobs in the recent past and the "fair share" algorithm is allowing other users higher priority. Finally, the queue you requested may simply be very busy.  If your job is pending there will be another field with the reason; if it is Resources that means that the resource you requested isn't available, either because it is busy or because you requested a nonexistent resource.  If the reason is "Priority" it means that a job with higher priority than yours is running.  Your job will rise in priority as it waits so it will start eventually.  To request an estimate from the queueing system of your start time, run `squeue -u <mst3k> --start` (substitute your own login for mst3k).

## How can I check when my job will start?
Run 
```
squeue -j <jobid> --start
```
SLURM will provide an estimate of the day and time your job will start.

## Why was my job killed?
Usually this is because you inadvertently submitted the job to run in a location that the compute nodes can't access or is temporarily unavailable.  If your jobs exit immediately this is usually why.  Other common reasons include using too much memory, too many cores, or running past a job's timelimit. 

You can run `sacct`:

```
[aam2y@udc-ba36-27:/root] sacct
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
In order to be allowed to submit jobs, you must not be overallocated with your `/scratch` usage and you must have some remaining service units. There is a limit of 350,000 files or 10 TB of space used per user in each `/scratch` directory and if you exceed either of those limits, you will not be able to run jobs until you clean up.  To check whether this is the case, run

```
sfsq
```

If you have not exceeded the limits on `/scratch`, check whether your account has allocation units remaining by running

```
allocations 
```

You may also run

```
queues
```
for a message that indicates the immediate issue.

  
## How do I check the efficiency of my completed jobs?
Run the command `jobe`:

![jobe output](/images/rivanna/jobe.png)

If your rating is low, please contact us; we can help.

- - -

# Storage Management

## What storage options are available to me to use on Rivanna?
All users are provided a 50-GB home directory for longer-term storage.  This directory provides "snapshots" though it is not backed up.  Each user also is provided 10TB of temporary "scratch" storage accessible as `/scratch/$USER` where `$USER` will stand for your ID.  Scratch storage is fast but is not backed up in any way.

If the free storage is not sufficient, you need snapshots of your files, or you wish to share space among a research group, the group should lease storage.

## Why should I use /scratch storage?
Scratch storage is fast and provides a large quantity of free space.  However, there are limits on the number of files and the amount of space you may use.  This is to maintain the stability and performance of the system.  If you use or expect to use a large number of files please contact us.

## How do I obtain leased storage?
Research Computing offers two tiers of leased storage, Value and Project. Please see our [storage page](/userinfo/storage) for details.

## How do I check my disk usage?
Run `hdquota` on a Rivanna frontend.

## How do I check my `/scratch` usage on Rivanna?
Run the command `sfsq`:

```
sfsq
```

If you have used up too much space, created too many files, or have "old" files you may be regarded as "overallocated". Please note that if you are overallocated, you won't be able to submit any new jobs until you clean up your `/scratch` folder.

## How long can I store files in `/scratch`?
`/scratch` is designed to serve as fast, temporary storage for running jobs, and is not long-term storage. For this reason, files older than NN days are automatically deleted from all `/scratch` directories. Store longer-term files in your home directory or purchased storage.

## How do I share data in my `/scratch` or leased storage with a colleague?
To share data from your `/scratch` directly with any other user, use [Globus](/userinfo/globus) sharing.  If your colleague also has an account on Rivanna, he or she does not need to set up a personal endpoint but can simply log into the uva#main-DTN endpoint and navigate to his or her `/scratch` directory to transfer the files.

If you wish to share data in leased space with a member of your group, be sure that permissions are set so that the group member can access your subdirectory.  The college can then simply use the data directly, or copy it elsewhere.  If you wish to share data from your leased storage to a colleague who is not a member of the group, use Globus sharing in the same manner as sharing `/scratch`.

- - -

# Data Transfer

Smaller files can be transferred to/from Rivanna using `scp`, `sftp`, and `rsync` as well as standard FTP tools.

Larger files should be moved using [Globus](/userinfo/globus/).

[Read more](/userinfo/data-transfer/) about data transfer.

# Other Questions
What if my question doesn't appear here? Take a look at our User Guide.  If your answer isn't there, contact us.
