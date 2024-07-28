+++
type = "rivanna"
categories = [
  "HPC",
  "software",
  "bio"
]
date = "2024-01-02T00:00:00-05:00"
tags = [
  "multi-core",
]
draft = false
modulename = "cellprofiler"
softwarename = "CellProfiler"
title = "CellProfiler and UVA HPC"
author = "RC Staff"
+++

# Description

{{% module-description %}}

**Software Category:** {{% module-category %}}

For detailed information, visit the [{{% software-name %}} website]({{< module-homepage >}}).

# Available Versions
The current installation of {{% software-name %}} incorporates the most popular packages. To find the available versions and learn how to load them, run:

```
module spider {{< module-name >}}
```

The output of the command shows the available {{% software-name %}} module versions.

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
```
module spider {{% module-firstversion %}}
```

{{< module-versions >}}


The latest version of CellProfiler is available as an Apptainer container.  Containers encapsulate applications, in this case CellProfiler, and all their required libraries isolated from the application and libraries provided by the system. The basic concepts of software containers, and Apptainer container in particular, are explained [here](/userinfo/hpc/software/containers).  We recommend using the latest CellProfiler container version whenever possible.  Please contact us for help with this package.

CellProfiler can be run interactively with a graphical user interface (GUI) or non-interactively without any user interface.  The interactive GUI mode is used to define image analysis pipelines; the non-interactive mode is used for image batch processing based on previously configured image analysis pipelines.  


# Preparation
The CellProfiler container image file is provided in a shared user space.  For best performance it is recommended that users copy this container to their individual /scratch storage location.  This has to be done only once and the following steps describe this process.

In a terminal window on the HPC system execute these commands:
```
module load apptainer cellprofiler
cp $CONTAINERDIR/cellprofiler-4.2.5.sif /scratch/$USER
```

# Image Pipeline Configuration

## Option A: ssh terminal

1. In a terminal window on your local workstation execute the following command:
```
ssh -Y YOUR_ID@login1.hpc.virginia.edu
```

2. Continue with instructions under **Starting an interactive CellProfiler job**.

Please note that this option may be very slow.


## Option B: Starting an interactive CellProfiler job

To start an interactive job and launch the CellProfiler graphical user interface from within the container, obtain desktop through the Open OnDemand [Desktop](/userinfo/hpc/ood/desktop) app, start a terminal window, then run the following commands
```
module load apptainer cellprofiler
apptainer run $CONTAINERDIR/cellprofiler-4.2.5.sif
```

# Non-interactive Slurm jobs for batch image processing
If you have a large number of images that all need to be processed in the same manner, you can use compute nodes for efficient non-interactive batch image processing. The details of CellProfiler's batch processing strategy are explained [here](https://cellprofiler-manual.s3.amazonaws.com/CPmanual/Help_Other%20Features_Batch_Processing.html).

## Setup

1. Move image files to be processed to a directory accessible on the HPC system (ideally /scratch).
2. Use an interactive CellProfiler session to define a CellProfiler image analysis pipeline file (.cppipe) that defines how those particular images are to be processed,  see Interactive Jobs with Graphical User Interface for Image Pipeline Configuration.
3. In the interactive CellProfiler session, add the `CreateBatchFiles` module to the end of your pipeline and click `Analyze Images`. This will create the file `Batch_data.h5` which defines the entire image processing step including paths to the images.

**Note:**  The pipeline batch file created in step 3 contains hardcoded paths to the to-be-processed image files. So steps 2 and 3 need to be repeated when you want to process images in a different directory.

## Create and submit the Slurm job script

A general premise in the batch processing workflow is that processing of images can occur independently from each other in a parallel fashion.  The easiest way to implement parallel image processing with CellProfiler is to create a job array where each job in the array (referred to as job array task) processes a unique subset of the total image set.  

Let us assume that we have a directory with 100 image files to process in `/scratch/$USER/images` and that we completed steps 1-3 as described above.  The following two steps create the Slurm job script and submit it to the cluster:

+ Create/edit Slurm job script `/scratch/mstk/cp_jobs/cellprofiler.slurm` (see below).  This script
defines a job array with 100 tasks, each task processing a single image,
loads the `cellprofiler container module` and runs the `CellProfiler.py` script inside the container, and
passes the `/scratch/$USER/pipelines/Batch_data.h5` file with the image processing definition to the CellProfiler instance
+ Run these commands to submit the job and execute the preconfigured image analysis pipeline.:
```
cd /scratch/$USER/cp_jobs
sbatch cellprofiler.slurm
```

The Slurm job script `cellprofiler.slurm`:

{{< pull-code file="/static/scripts/cellprofiler.slurm" lang="no-highlight" >}}

+ The directive `#SBATCH --array=100` defines the size of the job array, i.e. the creation of 100 job tasks, each running a single CellProfiler instance.

+ The directive `#SBATCH --cpus-per-task=1` specifies that each job task, i.e. each CellProfiler instance, runs on a single cpu core since CellProfiler does not support multi-threading.

+ `SLURM_ARRAY_TASK_ID` is a variable set by Slurm when the job is running. For each job array task this variable is set to a unique value between 1 and 100 (job array size). We use it to define for each job array task which image needs to be processed.
