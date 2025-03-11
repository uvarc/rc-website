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
  "parallel",
  "programming"
]
draft = false
shorttitle = "MATLAB"
softwarename = "MATLAB"
modulename = "matlab"
title = "Matlab and UVA HPC"
description = "Matlab in the HPC environment"
author = "RC Staff"
toc = true
+++

MATLAB is an integrated technical computing environment from the MathWorks that combines array-based numeric computation, advanced graphics and visualization, and a high-level programming language. Separately licensed toolboxes provide additional domain-specific functionality.

Mathworks provides MATLAB examples and tutorials for all experience levels here.

# Available Versions
To find the available versions and learn how to load them, run:
```
module spider {{% module-name %}}
```

The output of the command shows the available {{% software-name %}} module versions. To load the most recent version of {{% software-name %}}, at the terminal window prompt run:
```
module load matlab
```

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
```
module spider {{% module-firstversion %}}
```

{{< module-versions >}}

You can work in the MATLAB desktop on the UVA HPC frontend nodes; we recommend [FastX](https://www.rc.virginia.edu/userinfo/hpc/login/#remote-desktop-access) for this application.  However, the time and memory that a job can use on the frontends are limited, so for longer jobs you should submit your job to compute nodes through Slurm.

If your Matlab job requires user interactions via the Matlab interface, you should use [Open OnDemand](/userinfo/hpc/ood) as described in the next section.

If you will be running MATLAB through the command line but still wish to use an interactive job, you can create an [ijob](/userinfo/hpc/slurm).

# Interactive Sessions through Open OnDemand

## Starting an Interactive Session
To launch an instance of {{% software-name %}}, you will begin by connecting to our Open OnDemand portal. You need to specify required resources, e.g. node partition, time, your UVA HPC allocation, etc.. If you are new to UVA HPC, you may want to read the [Getting Started Guide](/userinfo/hpc/#job-queues) to learn more about the partitions.

1. Open a web browser and go to URL:  https://ood.hpc.virginia.edu.
2. Use your Netbadge credentials to log in. This will open the Open OnDemand web portal.
3. On the top banner of the Open OnDemand dashboard, click on `Interactive Apps`.
4. In the drop-down box, click on `{{% software-name %}}`.
5. After connecting to {{% software-name %}} through Open OnDemand, a form will appear where you can fill in the resources for `{{% software-name %}}`.
6. When done filling in the resources, click on the blue `Launch` button at the bottom of the form. **Do not click the button multiple times**.
7. It may take a few minutes for the system to gather the resources for your instance of `{{% software-name %}}`. When the resources are ready a `Connect to {{% software-name %}}` button will appear. Click on the button to start `{{% software-name %}}`.

# Using {{% software-name %}}
When {{% software-name %}} opens in your web browser, it will appear just like the {{% software-name %}} that you have on your laptop or desktop.

# Closing the Interactive Session
When you are done, quit the Matlab application.  The interactive session will be closed and the allocated resources will be released. If you leave the session open, your allocation will continue to be charged until the specified time limit is reached.

# Running a Matlab Batch Jobs on the HPC System

The HPC system uses the Slurm resource manager to schedule and run jobs on the cluster compute nodes. The following are example Slurm scripts for submitting different types of Matlab batch jobs to the cluster.

## Submitting a batch job using a single core of a compute node.

Once your program is debugged, we recommend running in batch mode when possible.
This runs the job in the background on a compute node. Write a Slurm script similar to the following:

{{< pull-code file="/static/scripts/matlab_serial.slurm" lang="no-highlight">}}

The option `-nodisplay` suppresses the Desktop interface and any attempt to run a graphical display. Some MATLAB functions are capable of running on multiple cores. If your code uses linear algebraic operations, those can be multithreaded across multiple cores, so you would need to request the additional cores in your slurm script.  Unless you are sure you can use multiple cores effectively it's generally best to restrict your job to one core.

The `;exit` is important to ensure that the job terminates when the computation is done. The example code `pcalc2.m` is shown below. Note that passing the `SLURM_JOB_ID` variable allows the function to save
output to a job-specific filenames.

```
function  [a]=pcalc2(nloop,ndim,jobid)
% Example using the parfor construct to calculate the maximum eignevalue
% of a random ndim by ndim matrix nloops times
% nloop: Number of times parfor loop should run
% ndim: Dimension of the square matrix to create
% jobid: Slurm job id number for unique file name

if ischar(nloop) % checking data type on first input
    nloop=str2num(nloop);
end
if ischar(ndim) % checking data type on second input
    ndim=str2num(ndim);
end

% preallocate output array
a=zeros(nloop, 1);

% TIME CONSUMING LOOP
tic;
parfor i=1:nloop  % parallelized for loop
                  % parfor only used if parallel pool open
    a(i)=FunctionTakesLongTime(ndim);
    % print progress of the parfor loop
    if mod(i,10)==0
        fprintf('Iteration number = %d of %d total \n',nloop-i,nloop)
    end
end
time=toc;

% output timing information and host
stringOut1= ...
sprintf('time = %f,nloop = %d on host %s \n',time,nloop,getenv('HOSTNAME'));

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

If you have a Matlab job that can be structured to run across multiple cores, you can greatly speed up the time to your results. The linear algebraic libraries in Matlab are multithreaded and will make use of multiple cores on a compute node. The Parallel Computing Toolkit allows you to distribute for loops over multiple cores using parfor and other parallel constructs in MATLAB. For more information on using the Parallel Computing Toolbox in MATLAB see the.
**<a href="https://www.mathworks.com/solutions/parallel-computing.html" target="_blank">MathWorks documentation</a>** .

The example function `pcalc2.m` above uses a  parallel for loop (parfor)
in MATLAB. To run your parallel MATLAB code across multiple cores on one compute
node, you can use a slurm script similar to the following:

{{< pull-code file="/static/scripts/matlab_multicore.slurm" lang="no-highlight" >}}

The Matlab script `setPool1.m` creates a local pool of matlab workers on the cores of the compute node.

```
% Script setPool1.m
% create a local cluster object
pc = parcluster('local');

% explicitly set JobStorageLocation to job-specific temp directory
mkdir(strcat('/scratch/',getenv('USER'),'/slurmJobs/',getenv('slurm_ID')));
pc.JobStorageLocation = ...
     strcat('/scratch/', getenv('USER'),'/slurmJobs/', getenv('slurm_ID'));

% start the matlabpool with the available workers
% control how many workers by setting ntasks in your sbatch script
parpool(pc, str2num(getenv('numWorkers')))
```

## Matlab Jobs using Slurm Job Arrays
The Slurm has a mechanism for launching multiple independent jobs with one
job script using the `--array` directive.

### Array of Multicore Parallel Matlab Jobs

The following Slurm script uses job arrays to submit multiple parallel Matlab
jobs, each running on a nodes of the standard queue.

{{< pull-code file="/static/scripts/matlab_job_array.slurm" lang="no-highlight" >}}

## Parallel Matlab on Multiple Compute Nodes
To run Matlab parallel jobs that require more cores than are available on one compute node (e.g. > 40), you can launch the Matlab desktop on one of the HPC login nodes. The following procedure will create the cluster profile for your account on UVA HPC:

**For version R2023a or newer**, use the Discover Clusters function in the drop-down of the Parallel menu to create a cluster profile for Rivanna as described in the following link.

[Discover Clusters and Use Cluster Profiles](https://www.mathworks.com/help/parallel-computing/discover-clusters-and-use-cluster-profiles.html)

## `parfor` example

```
% Create a cluster object based on the profile
pc = parcluster('Rivanna_cluster'); % This must correspond to the matlab
     % version you are using

% Add additional properties related to slurm job parameters
pc.AdditionalProperties.AccountName = 'hpc_build' % account to charge job to
pc.AdditionalProperties.QueueName = 'parallel' % queue to submit job to
pc.AdditionalProperties.WallTime = '1:00:00' % amount of wall time needed
pc.saveProfile % save settings
pc.AdditionalProperties  % confirm above properties are set

% Additional configuration commands

% email address for Slurm to send email
pc.AdditionalProperties.EmailAddress ='teh1m@virginia.edu'
% send email when job ends and specify number of nodes and processes per node
pc.AdditionalProperties.AdditionalSubmitArgs = ...
'--mail-type=end --nodes=2 --ntasks-per-node=4'

% specify the total number of processes
procs=8;

```
Once this configuration is complete you can submit jobs to the cluster using
the following commands:

```
% Launch Matlab parallel code across two compute nodes
j=pc.batch(@pcalc2,1,{400,400,'myOutput1'},'pool',procs-1);

% Arguments of c.batch in order

% Handle of function containing parallel code to run
% Number of function outputs
% Cell array of function inputs
% Setting of a pool of matlab workers
% Number of Matlab workers. There are 8 cores on two nodes
% so use 7 for workers and one for master

% Get the state of the job
j.State

% Don't return command prompt until job finishes
j.wait

% Get output from the job
j.diary

% Command to use to get back debug information if a job crashes
% For parallel jobs (i.e. calling batch with pool>0)
% j.Parent.getDebugLog(j)
```
## `spmd` example
The previous example distributes the iterations of a `parfor` loop across
multiple compute nodes. The following example shows how to solve a linear system
of equations (Ax=b) across multiple compute nodes using distributed arrays.

```
% create a cluster object
pc = parcluster('Rivanna_cluster'); % This must correspond to the matlab
     % version you are using
pc.AdditionalProperties.AccountName = 'hpc_build'
pc.AdditionalProperties.WallTime = '04:00:00';
pc.AdditionalProperties.QueueName = 'parallel';

% email address for Slurm to send email
pc.AdditionalProperties.EmailAddress ='teh1m@virginia.edu'
% send email when job ends and specify number of nodes and processes per node
pc.AdditionalProperties.AdditionalSubmitArgs = ...
'--mail-type=end --nodes=2 --ntasks-per-node=4'

% specify the total number of processes
procs=8;

% specify additional submit arguments
pc.AdditionalProperties.AdditionalSubmitArgs='--mem-per-cpu=30000';

% start the matlabpool with available workers
% control how many workers by setting ntasks in your sbatch script

j=pc.batch(@solver_large1,2,{20000,'myOutput2'},'Pool',procs-1);

wait(j);
j.State
j.diary

% Command to use to get back debug information if a job crashes
% For parallel jobs (i.e. calling batch with pool>0)
% j.Parent.getDebugLog(j)
```

The function `solver_large1` looks like the following:

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
fprintf('norm of the error for the solution \n')
errChk2=gather(errChk)
fprintf('first 10 elements of solution vector (should be all ones)\n')
firstTenX=x2(1:10)
time

save(['solver_large1_' num2str(jobid) '.out'], ...
      'time','errChk2','firstTenX');

end
```
# Utilizing GPUs with Matlab

[General guidelines on requesting GPUs on the HPC system](/userinfo/hpc/slurm/#gpu-intensive-computation)

Once your job has been granted its allocated GPUs, you can use the gpuDevice function to initialize a specific GPU for use with Matlab functions that can utilize the architecture of GPUs. For more information see the [MathWorks documentation](https://www.mathworks.com/help/parallel-computing/gpu-computing-in-matlab.html) on GPU Computing in Matlab.

The following slurm script is for submitting a Matlab job that uses 4 GPUs in a `parfor` loop. For each GPU requested, the script requests one cpu (ntasks-per-node).

{{< pull-code file="/static/scripts/matlab_gpu.slurm" lang="no-highlight" >}}

The function `gpuTest1` looks like the following. For further information, see [https://www.mathworks.com/help/parallel-computing/examples/run-matlab-functions-on-multiple-gpus.html](https://www.mathworks.com/help/parallel-computing/examples/run-matlab-functions-on-multiple-gpus.html)

```
function  [a_cpu]=gpuTest1(ndim,nloop,jobid)
% Example to test gpu nodes
% ndim: dimension of matrix
% jobid: Slurm job id  for save saving output to job specific file
% nloop is number of time for parallel loop to run

% Check to see if you have a GPU device on your machine:
disp(['number of gpus ', num2str(gpuDeviceCount)])

% Create pool of workers across the gpus
parpool('local',gpuDeviceCount);

% Display the gpus
spmd
   gpuDevice
end

% preallocate output gpu array
a=zeros(nloop, 1,'double','gpuArray');

tic
parfor k=1:nloop
% create random 2-D array on gpu, perform 2-D fft and get maximum value
a(k) = max(max(abs(fft2((rand(ndim,'double','gpuArray'))))));
end

%Wait for the transfer to complete:
wait(gpuDevice)

%Gather the results from the GPU back to the CPU:
a_cpu = gather(a);
firstTen=a_cpu(1:10)  % Display first 10 elements of output array

delete(gcp('nocreate')); % delete parallel pool
tGPU = toc;
disp(['Total time on GPU: ' num2str(tGPU)])
disp(['ndim = ', num2str(ndim), '   nloop = ', num2str(nloop)])

% save output to file
save(['gpuTest1_' jobid '.out'],...
    'tGPU','ndim','nloop','firstTen','-ascii');

end
```
# Matlab Parallel Computing Resources

1. [Parallel Computing Toolbox Documentations](https://www.mathworks.com/help/parallel-computing/index.html)

2. [Parallel and GPU Computing tutorials](https://www.mathworks.com/videos/series/parallel-and-gpu-computing-tutorials-97719.html)

3. [Performance and Memory](https://www.mathworks.com/help/matlab/performance-and-memory.html)

4. [Parallel Computing Toolbox — Examples](https://www.mathworks.com/help/parallel-computing/examples.html?category=index&s_tid=CRUX_topnav)
