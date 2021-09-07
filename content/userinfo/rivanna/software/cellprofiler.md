+++
type = "rivanna"
categories = [
  "HPC",
  "software",
  "bio"
]
date = "2020-02-28T08:37:46-05:00"
tags = [
  "multi-core",
]
draft = false
modulename = "cellprofiler"
softwarename = "CellProfiler"
title = "CellProfiler on Rivanna"
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


The latest version of CellProfiler is available as a Singularity container.  Containers encapsulate applications, in this case CellProfiler, and all their required libraries isolated from the application and libraries provided by the system. The basic concepts of software containers, and Singularity container in particular, are explained [here](/userinfo/rivanna/software/containers).  We recommend using the latest CellProfiler container version whenever possible.  Please contact us for help with this package.

CellProfiler can be run interactively with a graphical user interface (GUI) or non-interactively without any user interface.  The interactive GUI mode is used to define image analysis pipelines; the non-interactive mode is used for image batch processing based on previosuly configured image analysis pipelines.  


# Preparation
The CellProfiler container image file is provided in a shared user space.  For best performance it is recommended that users copy this container to their individual /scratch storage location.  This has to be done only once and the following steps describe this process.

In a Rivanna terminal window execute these commands:
```
module load singularity
module load cellprofiler/3.1.8
cp $CONTAINERDIR/cellprofiler-3.1.8.sif /scratch/$USER
```

# Image Pipeline Configuration


## Option A: ssh terminal

1. In a terminal window on your local workstation execute the following command:
```
ssh -Y YOUR_ID@rivanna1.hpc.virginia.edu
```

2. Continue with instructions under **Starting an interactive CellProfiler job**.

Please note that this option may be very slow.


## Option B: Starting an interactive CellProfiler job

To start an interactive job and launch the CellProfiler graphical user interface from within the container, obtain desktop through the Open OnDemand [Desktop](/userinfo/rivanna/ood/desktop) app, start a terminal window, then run the following commands
```
module load singularity
module load cellprofiler/3.1.8
singularity run /scratch/$USER/cellprofiler-3.1.8.sif
```

# Non-interactive SLURM jobs for batch image processing
If you have a large number of images that all need to be processed in the same manner, you can use Rivanna's compute nodes for efficient non-interactive batch image processing. The details of CellProfiler's batch processing strategy are explained [here](http://cellprofiler-manual.s3.amazonaws.com/CellProfiler-3.1.9/help/other_batch.html).

## Setup

1. Move image files to be processed to a directory accessible on Rivanna (ideally /scratch).
2. Use an interactive CellProfiler session to define a CellProfiler image analysis pipeline file (.cppipe) that defines how those particular images are to be processed,  see Interactive Jobs with Graphical User Interface for Image Pipeline Configuration.
3. In the interactive CellProfiler session, add the `CreateBatchFiles` module to the end of your pipeline and click `Analyze Images`. This will create the file `Batch_data.h5` which defines the entire image processing step including paths to the images.

**Note:**  The pipeline batch file created in step 3 contains hardcoded paths to the to-be-processed image files. So steps 2 and 3 need to be repeated when you want to process images in a different directory.

## Create and submit the SLURM job script

A general premise in the batch processing workflow is that processing of images can occur independently from each other in a parallel fashion.  The easiest way to implement parallel image processing with CellProfiler is to create a job array where each job in the array (referred to as job array task) processes a unique subset of the total image set.  

Let us assume that we have a directory with 100 image files to process in `/scratch/$USER/images` and that we completed steps 1-3 as described above.  The following two steps create the SLURM job script and submit it to the cluster:

+ Create/edit SLURM job script `/scratch/mstk/cp_jobs/cellprofiler.slurm` (see below).  This script
defines a job array with 100 tasks, each task processing a single image,
loads the `cellprofiler container module` and runs the `CellProfiler.py` script inside the container, and
passes the `/scratch/$USER/pipelines/Batch_data.h5` file with the image processing definition to the CellProfiler instance
+ Run these commands to submit the job and execute the preconfigured image analysis pipeline.:
```
cd /scratch/$USER/cp_jobs
sbatch cellprofiler.slurm
```

The SLURM job script `cellprofiler.slurm`:
```
#!/bin/bash

#SBATCH -A mygroup
#SBATCH -p standard
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --array=1-100
#SBATCH --time=06:00:00
#SBATCH --mem-per-cpu=9000

module purge
module load singularity
module load cellprofiler/3.1.8

FIRST_IMG_INDEX=$SLURM_ARRAY_TASK_ID
LAST_IMG_INDEX=$SLURM_ARRAY_TASK_ID
BATCH_FILE=/scratch/$USER/pipelines/Batch_data.h5

singularity exec /scratch/$USER/cellprofiler-3.1.8.sif cellprofiler -c -r -p $BATCH_FILE -f $FIRST_IMG_INDEX -l $LAST_IMG_INDEX
```


+ The directive `#SBATCH --array=100` defines the size of the job array, i.e. the creation of 100 job tasks, each running a single CellProfiler instance.

+ The directive `#SBATCH --cpus-per-task=1` specifies that each job task, i.e. each CellProfiler instance, runs on a single cpu core since CellProfiler does not support multi-threading.

+ `SLURM_ARRAY_TASK_ID` is a variable set by SLURM when the job is running. For each job array task this variable is set to a unique value between 1 and 100 (job array size). We use it to define for each job array task which image needs to be processed.
