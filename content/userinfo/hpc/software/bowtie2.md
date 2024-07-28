+++
type = "rivanna"
categories = [
  "HPC",
  "software",
  "bio"
]
date = "2019-06-22T08:37:46-05:00"
tags = [
  "multi-core",
]
draft = false
modulename = "bowtie2"
softwarename = "Bowtie2"
title = "Bowtie2 and UVA HPC"
author = "RC Staff"
+++

# Description
{{% module-description %}}


**Software Category:** {{% module-category %}}

For detailed information, visit the [{{% software-name %}} website]({{< module-homepage >}}).

- - -

# Available Versions
The current installation of {{% software-name %}} incorporates the most popular packages. To find the available versions and learn how to load them, run:

```
module spider {{% module-name %}}
```


The output of the command shows the available {{% software-name %}} module versions.

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
```
module spider {{% module-firstversion %}}
```

{{< module-versions >}}

- - - 

# Bowtie2 Example

The following example demonstrates how to run a Bowtie sequence alignment on multiple cpu cores on a single HPC node. More details information about the aligner can be found [here](http://bowtie-bio.sourceforge.net/bowtie2/manual.shtml#the-bowtie2-aligner).

**Note that Bowtie cannot be executed across multiple nodes.** 

## Create a temporary directory

We start by creating a temporary directory and copying the Bowtie2 example files into it.  

```
module load gcc bowtie2
mkdir -p /scratch/$USER/bowtie_temp
cp -r $EBROOTBOWTIE2/example /scratch/$USER/bowtie_temp
```

* The `$USER`variable will expand to your computing ID so you'll be using your personal scratch directory.  
* The `EBROOTBOWTIE2` environment variable is set to the Bowtie2 installation directory after you load the `bowtie2` module.  
* Note that you have to preload the `gcc` module before loading bowtie2.

## The Slurm Job Script

The Slurm script defines the HPC resources needed to run the Bowtie2 indexing and alignment. Bowtie2 can utilize multiple cpu cores on a single compute node. It does not support execution on multiple nodes.  

Let's create a textfile that serves as our job script, `alignment.slurm`, with the following content:

{{< pull-code file="/static/scripts/bowtie2.slurm" lang="no-highlight" >}}

* You need to replace `<YOUR_ALLOCATION>` with your own HPC allocation name.

* The `$USER` variable will expand to your computing ID so you'll be using your personal scratch directory.  

* The `$SLURM_CPUS_PER_TASK` variable is set by the job scheduler to match the `--cpus-per-task` directive, in this case 8 cpus core per task (job run).

## Submitting the Job

To run the above script, type:

```
sbatch alignment.slurm 
```

This will return a message like this:
```
Submitted batch job 3184590
```

## Check the Job Status

To check the status of the job, run
```
squeue -u <username>
```
where `<username>` is your UVA computing ID that you used to log in.

To see a history of your jobs, run:
```
sacct
```

## Output

Because of parallel processing, the aligned reads might appear in the output SAM file in a different order than they were in the input FASTQ. You can add the `--reorder` flag to your command so that the order does not change, but it is typically not necessary.

## Troubleshooting

**Caution:** If you create the Slurm job script on a Windows computer and then upload it to the HPC system, you’ll probably get an error when you run it with sbatch that says:
```
sbatch: error: Batch script contains DOS line breaks (\r\n)
sbatch: error: instead of expected UNIX line breaks (\n).
```

To fix this, run
```
dos2unix alignment.slurm
```

This will remove unwanted \r from text files.



