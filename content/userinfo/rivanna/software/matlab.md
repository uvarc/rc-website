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
shorttitle = "Matlab"
title = "Matlab on Rivanna"
description = "Matlab in Rivanna's HPC environment"
author = "RC Staff"
toc = true
+++

# Matlab

MATLAB is an integrated technical computing environment from the MathWorks that combines array-based numeric computation, advanced graphics and visualization, and a high-level programming language. Separately licensed toolboxes provide additional domain-specific functionality.

Mathworks provides MATLAB examples and tutorials for all experience levels here.

# Using MATLAB on Rivanna

You must always set up your environment in order to use MATLAB.  To load the most recent installed version run

`module load matlab`

You can work in the MATLAB desktop on the Rivanna frontend nodes; we recommend [FastX](https://arcs.virginia.edu/fastx) for this application.  However, the time and memory that a job can use on the frontends are limited, so for longer jobs you should submit your job to compute nodes through SLURM.

If your Matlab job requires user interactions via the Matlab interface, you should use [ijob](https://arcs.virginia.edu/slurm#interactive_job) to request an interactive job.

# Submitting a SLURM Batch Job using a single core

Once your program is debugged, we recommend running in batch mode when possible. This runs the job in the background on a compute node. Write a script similar to the following:

```
#!/bin/bash
#SBATCH --nodes 1   #Number of nodes
#SBATCH --ntasks-per-node 1   #Number of cores
#SBATCH -t 01:00:00
#SBATCH -o output_filename
#SBATCH -p standard
#SBATCH -A mygroup

module load matlab
matlab -nodisplay -singleCompThread -r "Mymain(myvar1s);exit"
```
The option `-nodisplay` suppresses the Desktop and any attempt to run a graphical display. The -singleCompThread option is to ensure that all MATLAB built-in functions use only one thread. Some MATLAB functions are capable of running on multiple cores, but may not do so very efficiently. To use them in multicore mode you must request the appropriate number of cores and parallelize your core as shown below, but you will be charged SUs for all cores whether they are used effectively or not. Unless you are sure you can use the cores effectively it's generally best to restrict your job to one core.

The `;exit` is very important to ensure that the job terminates when the computation is done.

# Running Multiple Single-Core Matlab Jobs Using Slurm Job Arrays

The following slurm script shows how to run 10 single core Matlab jobs using slurm job arrays.

```
#!/bin/bash
# The slurm script file runParallelMultiple.slurm runs
# multiple parallel Matlab jobs, either from within Matlab or as a
# complied executable, using a Slurm job array

#SBATCH --array=1-10
##SBATCH --reservation=maintenance
#SBATCH -p standard
#SBATCH -A hpc_build
#SBATCH --time=00:10:00
#SBATCH --mail-type=end
#SBATCH --mail-user=teh1m@virginia.edu
#SBATCH --job-name=runSingleTest
#SBATCH --output=runSingleTest_%A_%a.out
#SBATCH --error=runSingleTest_%A_%a.err
#SBATCH --ntasks=1

# Load Matlab environment
module load matlab/R2019a

# Create variable for slurm job and task ids
slurmID="${SLURM_ARRAY_JOB_ID}_${SLURM_ARRAY_TASK_ID}"
export slurmID

% Create a temporary directory on scratch for any Job related files
mkdir -p /scratch/teh1m/slurmJobs/$slurmID

# Shell script to sample output of top command
# while your job runs on compute node (optional)
# sampleTop3.sh runs top w/o specifying the user
./sampleTop2.sh teh1m $slurmID 10 &

# Input paramaters
nLoops=400; # number of iterations to perform
nDim=400; # Dimension of matrix to create

# Run Matlab parallel program
matlab -nodisplay -singleCompThread -r "pcalc2Test1(${nLoops},${nDim},'${slurmID}'); exit;"

# remove workspace
rm -rf /scratch/teh1m/slurmJobs/$slurmID
```

where the example code `pcalc2Test1.m` is shown below. Note that passing the `slurmID` variable allows the function to save output to a job-specific filenames.

```
function  [a]=pcalc2Test1(nloop,ndim,jobid)
% Example using the parfor construct to calculate the maximum eignevalue
% of a random ndim x ndim matrix nloops times
% nloop: Number of time parfor loop should run
% ndim: Dimension of the square matrix to create

if ischar(nloop) % checking data type on first input
    nloop=str2num(nloop);
end
if ischar(ndim) % checking data type on first input
    nloop=str2num(ndim);
end


% preallocate output array
a=zeros(nloop, 1);
% TIME CONSUMING LOOP
tic;
parfor i=1:nloop
    a(i)=FunctionTakesLongTime(ndim);
    if mod(i,10)==0
        fprintf('Iteration number = %d of %d total \n',nloop-i,nloop)
    end
end
time=toc;

% output timing infomration and host
stringOut1=sprintf('time = %f, nloop = %d on host %s \n',time,nloop,getenv('HOSTNAME'));

% save output to a file
fid = fopen(['pcalc_' jobid '.out'],'wt');
fprintf(fid, '%s', stringOut1);
fclose(fid);
```

# Running MATLAB in Parallel on Rivanna
If you have a job that can be structured to run across multiple cores, you can greatly speed up the time to your results. The Parallel Computing Toolkit allows you to distribute for loops over multiple cores using parfor and other parallel constructs in MATLAB. For more information on using the Parallel Computing Toolbox in MATLAB see the [MathWorks documentation](https://www.mathworks.com/products/parallel-computing.html).

# Parallel Matlab on a Single Compute Node

# Parallel Matlab on Multiple Compute Nodes

# Utilizing GPUs with Matlab

[General guidelines on requesting GPUs on Rivanna](https://arcs.virginia.edu/slurm#gpus)

Once your job has been granted its allocated GPUs, you can use the gpuDevice function to initialize a specific GPU for use with Matlab functions that can utilize the architecture of GPUs. For more information see the [MathWorks documentation](https://www.mathworks.com/help/parallel-computing/gpu-computing-in-matlab.html) on GPU Computing in Matlab.
