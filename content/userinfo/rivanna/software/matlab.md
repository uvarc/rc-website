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
  "matlab",
  "parallel"
]
draft = false
shorttitle = "Matlab"
softwarename = "Matlab"
modulename = "matlab"
title = "Matlab on Rivanna"
description = "Matlab in Rivanna's HPC environment"
author = "RC Staff"
toc = true
+++

# Matlab

MATLAB is an integrated technical computing environment from the MathWorks that combines array-based numeric computation, advanced graphics and visualization, and a high-level programming language. Separately licensed toolboxes provide additional domain-specific functionality.

Mathworks provides MATLAB examples and tutorials for all experience levels here.

# Available Versions
To find the available versions and learn how to load them, run:
```
module spider {{% module-name %}}
```

The output of the command shows the available {{% software-name %}} module versions.

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
```
module spider {{% module-firstversion %}}
```

{{< module-versions >}}

You can work in the MATLAB desktop on the Rivanna frontend nodes; we recommend [FastX](https://www.rc.virginia.edu/userinfo/rivanna/login/#remote-desktop-access) for this application.  However, the time and memory that a job can use on the frontends are limited, so for longer jobs you should submit your job to compute nodes through SLURM.

If your Matlab job requires user interactions via the Matlab interface, you should use [ijob](https://www.rc.virginia.edu/userinfo/rivanna/slurm/#submitting-an-interactive-job) to request an interactive job or start an interactive session through Rivanna's web portal, [Open OnDemand](/userinfo/rivanna/ood/overview), as described in the next section.

# Interactive Sessions through Rivanna's Web Portal

## Starting an Interactive Session
To launch an instance of {{% software-name %}}, you will begin by connecting to our Open OnDemand portal. You need to specify required resources, e.g. node partition, time, your Rivanna allocation, etc.. If you are new to Rivanna, you may want to read the [Getting Started Guide](/userinfo/rivanna/queues/) to learn more about the partitions.

1. Open a web browser and go to URL:  https://rivanna-portal.hpc.virginia.edu.
2. Use your Netbadge credentials to log in. This will open the Open OnDemand web portal.
3. On the top banner of the Open OnDemand dashboard, click on `Interactive Apps`.
4. In the drop-down box, click on `{{% software-name %}}`.
5. After connecting to {{% software-name %}} through Open OnDemand, a form will appear where you can fill in the resources for `{{% software-name %}}`.
6. When done filling in the resources, click on the blue `Launch` button at the bottom of the form. **Do not click the button multiple times**.
7. It may take a few minutes for the system to gather the resources for your instance of `{{% software-name %}}`. When the resources are ready a `Connect to {{% software-name %}}` button will appear. Click on the button to start `{{% software-name %}}`.

## Using {{% software-name %}}
When {{% software-name %}} opens in your web browser, it will appear just like the {{% software-name %}} that you have on your laptop or desktop.

## Closing the Interactive Session
When you are done, quit the Matlab application.  The interactive session will be closed and the allocated resources will be released. If you leave the session open, your allocation will continue to be charged for the time.

# Running a Matlab Batch Jobs on Rivanna

Rivanna uses the SLURM resource manager to schedule and run jobs on the
cluster compute nodes. The following are example SLURM scripts for
submitting different types of Matlab batch jobs to the Rivanna cluster.

## Submitting a batch job using a single core of a compute node.

Once your program is debugged, we recommend running in batch mode when possible. This runs the job in the background on a compute node. Write a SLURM script similar to the following:

```
#!/bin/bash
# This slurm script file runs
# a single-core Matlab job (on one compute node)

#SBATCH -p standard
#SBATCH -A hpc_build
#SBATCH --time=00:10:00
#SBATCH --mail-type=end
#SBATCH --mail-user=teh1m@virginia.edu
#SBATCH --job-name=runSingleTest
#SBATCH --output=runSingleTest_%A.out
#SBATCH --error=runSingleTest_%A.err
#SBATCH --ntasks=1

# Load Matlab environment
module load matlab

# Create and export variable for slurm job id
export slurm_ID="${SLURM_JOB_ID}"


% Create a temporary directory on scratch for any Job related files
mkdir -p /scratch/teh1m/slurmJobs/$slurm_ID

# Shell script to sample output of top command
# while your job runs on compute node (optional)
# sampleTop3.sh runs top w/o specifying the user
# ./sampleTop2.sh teh1m $slurm_ID 10 &

# Input paramaters
nLoops=400; # number of iterations to perform
nDim=400; # Dimension of matrix to create

# Run Matlab parallel program
matlab -nodisplay -singleCompThread -r \
"pcalc2Test1(${nLoops},${nDim},'${slurm_ID}'); exit;"
```
The option `-nodisplay` suppresses the Desktop and any attempt to run a graphical display. The -singleCompThread option is to ensure that all MATLAB built-in functions use only one thread. Some MATLAB functions are capable of running on multiple cores, but may not do so very efficiently. To use them in multicore mode you must request the appropriate number of cores and parallelize your code as shown below, but you will be charged SUs for all cores whether they are used effectively or not. If your code uses linear algebraic operations, those can be multi-threaded across multiple cores so again you again would have to request the addtional cores in your slurm script. Unless you are sure you can use the cores effectively it's generally best to restrict your job to one core.

The `;exit` is very important to ensure that the job terminates when the computation is done. The example code `pcalc2Test1.m` is shown below. Note that passing the `slurmID` variable allows the function to save
output to a job-specific filenames. The function `pcalc2Test1` used in the above example is shown below.

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
parfor i=1:nloop  % parallelized for loop
    a(i)=FunctionTakesLongTime(ndim);
    if mod(i,10)==0
        fprintf('Iteration number = %d of %d total \n',nloop-i,nloop)
    end
end
time=toc;

% output timing information and host
stringOut1= ...
sprintf('time = %f, nloop = %d on host %s \n',time,nloop,getenv('HOSTNAME'));

% save output to a file
fid = fopen(['pcalc_' jobid '.out'],'wt');
fprintf(fid, '%s', stringOut1);
fclose(fid);

end

function max_eig=FunctionTakesLongTime(ndim);
% Computation intensive calculation dependent on matrix size
 max_eig=max(abs(eig(random('Exponential',ndim,ndim))));
end
```


## Submitting a batch job using multiple cores on a compute node

If you have a job that can be structured to run across multiple cores, you can greatly speed up the time to your results. The linear algebraic libraries in Matlab are multi-theaded and will make use of multiple cores on a compute node. The Parallel Computing Toolkit allows you to distribute for loops over multiple cores using parfor and other parallel constructs in MATLAB. For more information on using the Parallel Computing Toolbox in MATLAB see the.
**<a href="https://www.mathworks.com/products/parallel-computing.html" target="_blank">MathWorks documentation</a>** .

The example function `pcalc2Test1.m` above uses a  parallel for loop (parfor) in MATLAB. To run your parallel MATLAB code across multiple cores on one compute node, you can use a slurm script similar to the following:

```
#!/bin/bash
# This slurm script file runs
# a multi-core parallel Matlab job (on one compute node)

#SBATCH -p standard
#SBATCH -A hpc_build
#SBATCH --time=12:00:00
#SBATCH --mail-type=end
#SBATCH --mail-user=teh1m@virginia.edu
#SBATCH --job-name=runParallelTest
#SBATCH --output=runParallelTest_%A.out
#SBATCH --error=runParallelTest_%A.err
#SBATCH --nodes=1                #Number of nodes
#SBATCH --ntasks-per-node=20     #Number of cores per node

# Load Matlab environment
module load matlab

# Create and export variable for slurm job id
export slurm_ID="${SLURM_JOB_ID}"

# Set workers to one less that number of tasks (leave 1 for master process)
export numWorkers=$((SLURM_NTASKS-1))

# Input paramaters
nLoops=400; # number of iterations to perform
nDim=400; # Dimension of matrix to create

# Run Matlab parallel program program
matlab -nodisplay -nosplash  \
-r "setPool1;pcalc2Test1(${nLoops},${nDim},'${slurm_ID}');exit;"
```

The Matlab script `setPool1.m` gets the number of workers allocated by Slurm and
uses that to create the pool of Matlab workers.

```
% Script setPool1.m
% create a local cluster object
pc = parcluster('local');

% explicitly set JobStorageLocation to jpb-specific temp directory
mkdir(strcat('/scratch/', getenv('USER'),'/slurmJobs/', getenv('SLURM_ID')));
pc.JobStorageLocation = strcat('/scratch/', getenv('USER'),'/slurmJobs/', getenv('
SLURM_ID'));

% start the matlabpool with maximum available workers
% control how many workers by setting ntasks in your sbatch script
parpool(pc, str2num(getenv('numWorkers')))

```

# Matlab Jobs using SLURM Job Arrays
The SLURM has a mechanism for launching multiple independent jobs with one
job script using the `--array` directive.

## Array of Multiple Single-Core Matlab Jobs

The following slurm script shows how to run 10 single core Matlab jobs using slurm job arrays.

```
#!/bin/bash
# The slurm script file runParallelMultiple.slurm runs
# multiple single-core Matlab jobs using a Slurm job array

#SBATCH --array=1-10
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
module load matlab

# Create and export variable for slurm job and task ids
slurm_ID="${SLURM_ARRAY_JOB_ID}_${SLURM_ARRAY_TASK_ID}"


% Create a temporary directory on scratch for any Job related files
mkdir -p /scratch/teh1m/slurmJobs/$slurm_ID

# Shell script to sample output of top command
# while your job runs on compute node (optional)
# sampleTop3.sh runs top w/o specifying the user
#./sampleTop2.sh teh1m $slurm_ID 10 &

# Input paramaters
nLoops=400; # number of iterations to perform
nDim=400; # Dimension of matrix to create

# Run Matlab parallel program
matlab -nodisplay -singleCompThread -r \
"pcalc2Test1(${nLoops},${nDim},'${slurm_ID}'); exit;"

# remove workspace
rm -rf /scratch/teh1m/slurmJobs/$slurm_ID
```


## Array of Multicore Parallel Matlab Jobs

The following Slurm script uses job arrays to submit multiple parallel Matlab jobs, each running on a nodes of the standard queue.
```
#!/bin/bash
# The slurm script file runParallelMultiple.slurm runs
# multiple parallel Matlab jobs using a Slurm job array

#SBATCH --array=1-10
#SBATCH -p standard
#SBATCH -A hpc_build
#SBATCH --time=00:30:00
#SBATCH --mail-type=end
#SBATCH --mail-user=teh1m@virginia.edu
#SBATCH --job-name=runMultiple
#SBATCH --output=runMultiple_%A_%a.out
#SBATCH --error=runMultiple_%A_%a.err
#SBATCH --ntasks-per-node=20

module purge
# Load Matlab environment
module load matlab

# Create variable for slurm job and task ids
export SLURM_ID="${SLURM_ARRAY_JOB_ID}_${SLURM_ARRAY_TASK_ID}"

# Set workers to one less that number of tasks (leave 1 for master process)
export numWorkers=$((SLURM_NTASKS-1))

# Input paramaters
nLoops=400; # number of iterations to perform
nDim=400; # Dimension of matrix to create

# Run Matlab parallel program
matlab -nodisplay -nosplash -r "setPool1; pcalc2Test1(${nLoops},${nDim},'${SLURM_I
D}');exit;"

```

# Parallel Matlab on Multiple Compute Nodes
To run Matlab parallel jobs that require more cores than are available on
one compute node, you can launch the Matlab desktop on one of the Rivanna
login nodes. The following MATLAB setup script will create the cluster profile
for your account on Rivanna:

```
% The following set of commands are for running parallel Matlab programs
% across multiple compute nodes of the Rivanna cluster.

% Load the module for Matlab from the Linux command line.
module load matlab

% The following commands are executed from within Matlab

% set up initial configuration for running multi-node Matlab parallel jobs
% on Rivanna. This just needs to be done once, and its saved in Matlab’s
% parallel profiles.

configCluster
```
## `parfor` example

```
% Create a cluster object based on the profile
pc = parcluster('rivanna R2020a'); % This must correspond to the matlab version

% Add additional properties related to slurm job parameters
pc.AdditionalProperties.Account = 'hpc_build' % account to charge job to
pc.AdditionalProperties.QueueName = 'parallel' % queue to submit job to
pc.AdditionalProperties.WallTime = '24:00:00' % amount of wall time needed
pc.saveProfile % save settings
pc.AdditionalProperties  % confirm above properties are set

% Additional configuration commands

% email address for Slurm to send email
c.AdditionalProperties.EmailAddress ='teh1m@virginia.edu'
% send email when job ends
c.AdditionalProperties.AdditionalSubmitArgs ='--mail-type=end'

% specify the total number of processes
% and number of processes (cores) per node
procs=40;
procsPerNode=4;
pc.AdditionalProperties.ProcsPerNode=procsPerNode;

```
Once this configuration is complete you can submit jobs to the cluster using
the following commands:

```
% Launch Matlab parallel code across two compute nodes
j=c.batch(@pcalc2Test1,1,{600,101,'myOutput1'},'pool',procs-1); % Launch batch job to cluster

% Arguments of c.batch in order

% Handle of function containing parallel code to run
% Number of function outputs
% Cell array of function inputs
% Setting of a pool of matlab workers
% Number of Matlab workers. There are 40 cores on two nodes
% so use 39 for workers and one for master

% Get the state of the job
j.State

% Don't return command prompt until job finishes
j.wait

% Get output from the job
j.fetchOutputs

% Commands to use to get back debug information if a job crashes

% For parallel jobs (i.e. calling batch with pool>0)
j.Parent.getDebugLog(j)
```
## `spmd` example
The previous example distributes the iterations of a 'parfor' loop across
multiple compute nodes. The following example show how to solve a linear system
of equations (Ax=b) across multiple compute nodes using distributed arrays.

```
% create a cluster object
pc = parcluster('rivanna R2020a'); % This must correspond to the matlab version
pc.AdditionalProperties.AccountName = 'hpc_build'
pc.AdditionalProperties.WallTime = '04:00:00';
pc.AdditionalProperties.QueueName = 'parallel';

% specify the total number of processes
% and number of processes (cores) per node
procs=40;
procsPerNode=4;
pc.AdditionalProperties.ProcsPerNode=procsPerNode;
% explicitly set the JobStorageLocation to the temp directory that was c
reated in your sbatch script
pc.JobStorageLocation = strcat('/scratch/', getenv('USER'),'/slurmJobs/'
, getenv('SLURM_JOBID'));
pc.saveProfile;

% specify additional submit arguments
pc.AdditionalProperties.AdditionalSubmitArgs='--mem-per-cpu=30000';
%pc.AdditionalProperties.AdditionalSubmitArgs.output='-o parallelTest.ou
t';
%pc.AdditionalProperties.AdditionalSubmitArgs.error='-e parallelTest.err
';

% start the matlabpool with maximum available workers
% control how many workers by setting ntasks in your sbatch script

j=pc.batch(@solver_large1,2,{200000,'1234'},'Pool',procs-1);

wait(j);
j.State
j.fetchOutputs{:}

```

The function solver_large1 looks like the following:
```
function [ firstTenX, errChk2 ] = solver_large1( N, jobid)
% This function is a simple test of a LU linear solver
% Since b is sum of columns, x should always be a vector
% of ones.

tic;
spmd
    A = codistributed.rand(N, N);
    b = sum(A, 2);

    % solve Ax=b
    x = A\b;

    % Check error
    errChk = normest(A * x - b);
end
time=toc;

x2 = gather(x);
errChk2=gather(errChk)

firstTenX=x2(1:10)
time
whos

save(['solver_large1_' num2str(jobid) '.out'],'time','errChk2','firstTen
X');

end

```
# Utilizing GPUs with Matlab

[General guidelines on requesting GPUs on Rivanna](https://www.rc.virginia.edu/userinfo/rivanna/slurm/#gpu-intensive-computation)

Once your job has been granted its allocated GPUs, you can use the gpuDevice function to initialize a specific GPU for use with Matlab functions that can utilize the architecture of GPUs. For more information see the [MathWorks documentation](https://www.mathworks.com/help/parallel-computing/gpu-computing-in-matlab.html) on GPU Computing in Matlab.
