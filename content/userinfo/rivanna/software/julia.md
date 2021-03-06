+++
type = "rivanna"
categories = [
  "HPC",
  "software",
  "math"
]
date = "2019-06-22T08:37:46-05:00"
tags = [
  "multi-core",
]
draft = false
modulename = "julia"
softwarename = "julia"
title = "Julia on Rivanna"
author = "RC Staff"
+++

# Description
Julia is a high-level programming language designed for high-performance numerical analysis and computational science. Distinctive aspects of Julia's design include a type system with parametric polymorphism and types in a fully dynamic programming language and multiple dispatch as its core programming paradigm. It allows concurrent, parallel and distributed computing, and direct calling of C and Fortran libraries without glue code. A just-in-time compiler that is referred to as "just-ahead-of-time" in the Julia community is used. [Ref: Wikipedia](https://en.wikipedia.org/wiki/


**Software Category:** {{% module-category %}}

For detailed information, visit the [{{% software-name %}} website]({{< module-homepage >}}).

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

# Installing Julia Packages

Julia wants to update any existing packages whenever a user tries to add a package. Of course, the basic packages were installed in a system directory that is not writable by the users.

One work-around is to force Julia to use your local directory the first time that you add a package. For example, from the Linux command line set the shell variable,
```
export JULIA_DEPOT_PATH="~/.julia"
```
Then when you add a package from within Julia, it will be added to the `.julia` folder in your home directory, e.g.
```
julia> using Pkg
julia> Pkg.add("Plots")
```
After that first time, it should aways default to /home/$USER/.julia .

You can work with Julia on the Rivanna frontend nodes; we recommend [FastX](https://www.rc.virginia.edu/userinfo/rivanna/login/#remote-desktop-access) for this application. Once you have logged into a frontend node (rivanna1, rivanna2, or rivanna3.hpc.virginia.edu), you can invoke the Atom/Juno IDE (integrated development environment) with the following commands:
```
module load julia/1.5.0
module load gcc/9.2.0 atom/1.45.0
atom
```
You should see the following interface appear:
<img src="/images/juno.png" style="height:110%;width:110%"></img>

# Interactive Sessions through Rivanna's Open OnDemand Web Portal

## Starting an Interactive Session
To launch an instance of {{% software-name %}} through a notebook interface, you will begin by connecting to our Open OnDemand portal. You need to specify required resources, e.g. node partition, time, your Rivanna allocation, etc.. If you are new to Rivanna, you may want to read the [Getting Started Guide](/userinfo/rivanna/queues/) to learn more about the partitions.

1. Open a web browser and go to URL:  https://rivanna-portal.hpc.virginia.edu.
2. Use your Netbadge credentials to log in. This will open the Open OnDemand web portal.
3. On the top banner of the Open OnDemand dashboard, click on `Interactive Apps`.
4. In the drop-down box, click on `JupyterLab`.
5. After connecting to `JupyterLab`` through Open OnDemand, a form will appear where you can fill in the resources for `JupyterLab`.
6. When done filling in the resources, click on the blue `Launch` button at the bottom of the form. **Do not click the button multiple times**.
7. It may take a few minutes for the system to gather the resources for your instance of `JupyterLab`. When the resources are ready a `Connect to JupyterLab` button will appear. Click on the button to start `JupyterLab`.

## Using JupyterLab
When JupyterLab opens in your web browser, it will appear with a selection of notebook kernels to choose from, as shown below.
<img src="/images/juliaNotebook.png" style="height:110%;width:110%"></img>
If you double-click on one of the Julia kernels, an IPython notebook will open connected to Julia, ready for interactive commands.

## Closing the Interactive Session
When you are done, quit the JupyterLab application.  The interactive session will be closed and the allocated resources will be released. If you leave the session open, your allocation will continue to be charged until the specified time limit is reached.

# Running a Julia Batch Jobs on Rivanna

Rivanna uses the SLURM resource manager to schedule and run jobs on the
cluster compute nodes. The following are example SLURM scripts for
submitting different types of Julia batch jobs to the Rivanna cluster.

## Submitting a batch job using a single core of a compute node.

Once your program is debugged, we recommend running in batch mode when possible. This runs the job in the background on a compute node. Write a SLURM script similar to the following:

```
#!/bin/bash
# This slurm script file runs
# a single-core Julia job (on one compute node)

#SBATCH -p standard
#SBATCH -A hpc_build
#SBATCH --time=00:10:00
#SBATCH --mail-type=end
#SBATCH --mail-user=teh1m@virginia.edu
#SBATCH --job-name=SingleTest
#SBATCH --output=SingleTest_%A.out
#SBATCH --error=SingleTest_%A.err
#SBATCH --ntasks=1

# Load  Julia environment
module load julia/1.5.0

julia hello.jl
```
The simple example code `hello.jl` is shown below.
```
msg="hello world"
println(msg)
```
## Submitting a batch job using multiple cores on a compute node
The `Distributed` package can be used to run Julia code across multiple cores of a compute node. The SLURM script in this case would look like the following:
```
#!/bin/bash
# This is a slurm script for running Julia across
# multiple cores of one compute node

#SBATCH -p standard
#SBATCH -A hpc_build
#SBATCH --time=1:00:00
#SBATCH --mail-type=end
#SBATCH --mail-user=teh1m@virginia.edu
#SBATCH --job-name=multipleTest1
#SBATCH --output=multipleTest1_%A.out
#SBATCH --error=multipleTest1_%A.err
#SBATCH --nodes=1                #Number of nodes
#SBATCH --ntasks-per-node=1     #Number of cores per node
#SBATCH --cpus-per-task=8     #Number of cores per node

# Load Julia environment
module load julia/1.5.0

srun julia helloDistributed.jl
```
The Julia code in this case is,
```
using Distributed

# launch worker processes
num_cores = parse(Int, ENV["SLURM_CPUS_PER_TASK"])
addprocs(num_cores)

println("Number of cores: ", nprocs())
println("Number of workers: ", nworkers())

# each worker gets its id, process id and hostname
for i in workers()
    id, pid, host = fetch(@spawnat i (myid(), getpid(), gethostname()))
    println(id, " " , pid, " ", host)
end

# remove the workers
for i in workers()
    rmprocs(i)
end
```
and the output is,
```
Number of cores: 9
Number of workers: 8
2 11643 udc-ba26-19
3 11644 udc-ba26-19
4 11645 udc-ba26-19
5 11646 udc-ba26-19
6 11649 udc-ba26-19
7 11650 udc-ba26-19
8 11651 udc-ba26-19
9 11652 udc-ba26-19
```
Documentation on distributed computing with Julia can be accessed at the URL
(https://docs.julialang.org/en/v1/manual/distributed-computing/)[https://docs.julialang.org/en/v1/manual/distributed-computing/]

# Julia Jobs using SLURM Job Arrays
SLURM has a mechanism for launching multiple independent jobs with one
job script using the `--array` directive.

## Array of Multiple Single-Core Julia Jobs

The following slurm script shows how to run 5 single core Julia jobs using
SLURM job arrays.

```
#!/bin/bash
# This slurm script is an example of submitting job arrays
# with Julia and passing in the SLURM_ARRAY_TASK_ID variable
# to the code

#SBATCH --array=1-5
#SBATCH -p standard
#SBATCH -A hpc_build
#SBATCH --time=00:10:00
#SBATCH --mail-type=end
#SBATCH --mail-user=teh1m@virginia.edu
#SBATCH --job-name=runMultiple
#SBATCH --output=runMultiple_%A_%a.out
#SBATCH --error=runMultiple_%A_%a.err
#SBATCH --ntasks-per-node=1

module purge
module load julia/1.5.0

export SLURM_ARRAY_TASK_ID

julia jobArray.jl
```
The `jobArray.jl` code can use the `SLURM_ARRAY_TASK_ID` shell variable assigned by
SLURM for indexing input file.
```
using Distributed
num_replication = Base.parse(Int, ENV["SLURM_ARRAY_TASK_ID"])
@everywhere println("Job array task id: ", num_replication, " on host $(gethostname())")
```
The SLURM script will produce 5 separate output files, each of the form
```
Job array task id: 4 on host udc-ba25-33c0
```
# Parallel Julia on Multiple Compute Nodes

To run Julia parallel jobs that require more cores than are available on
one compute node (e.g. > 40), you can again again use the Distributed package and
the node file generated by SLURM.

```
#!/bin/bash
# This slurm script launches a parallel Julia program
# using the Distrubted package

#SBATCH -p parallel
#SBATCH -A hpc_build
#SBATCH --time=1:00:00
#SBATCH --mail-type=end
#SBATCH --mail-user=teh1m@virginia.edu
#SBATCH --job-name=runParallelTest2
#SBATCH --output=runParallelTest2_%A.out
#SBATCH --error=runParallelTest2_%A.err
#SBATCH --nodes=8                #Number of nodes
#SBATCH --ntasks-per-node=1     #Number of cores per node

# Load Julia environment
module load julia/1.5.0

export SLURM_NODEFILE=`generate_pbs_nodefile`

julia --machine-file $SLURM_NODEFILE ./parallelTest2.jl
```
where the Julia code is,
```
using Distributed
@everywhere function showid()
    println("My ID ",myid()," from ",gethostname())
end
@everywhere showid()
println("------- more or less the same as -------------------------")
println(" # workers: ", workers())
println(" # nprocs: ", nprocs())
fa = Array{Future}(undef, nprocs())
for i in 1:nprocs()
    fa[i] = @spawnat i showid()
end
for i in 1:nprocs()
    fetch(fa[i])
end
```
The output of this code looks like this.
```
My ID 1 from udc-ba34-16c4
      From worker 9:    My ID 9 from udc-ba34-16c9
      From worker 8:    My ID 8 from udc-ba34-16c4
      From worker 7:    My ID 7 from udc-ba34-16c6
      From worker 2:    My ID 2 from udc-ba34-16c7
      From worker 5:    My ID 5 from udc-ba34-22c1
      From worker 3:    My ID 3 from udc-ba34-16c5
      From worker 4:    My ID 4 from udc-ba34-22c0
      From worker 6:    My ID 6 from udc-ba34-16c8
------- more or less the same as -------------------------
 # workers: [2, 3, 4, 5, 6, 7, 8, 9]
 # nprocs: 9
My ID 1 from udc-ba34-16c4
      From worker 5:    My ID 5 from udc-ba34-22c1
      From worker 9:    My ID 9 from udc-ba34-16c9
      From worker 2:    My ID 2 from udc-ba34-16c7
      From worker 7:    My ID 7 from udc-ba34-16c6
      From worker 4:    My ID 4 from udc-ba34-22c0
      From worker 8:    My ID 8 from udc-ba34-16c4
      From worker 6:    My ID 6 from udc-ba34-16c8
      From worker 3:    My ID 3 from udc-ba34-16c5
```
One can also use the system MPI libraries for parallel Julia programs.
```
#!/bin/bash
# This script uses Julia's MPI package that
# uses the Intel MPI library on Rivanna. See the URL
# https://juliaparallel.github.io/MPI.jl/stable/configuration/

#SBATCH -p parallel
#SBATCH -A hpc_build
#SBATCH --time=00:10:00
#SBATCH --mail-type=end
#SBATCH --mail-user=teh1m@virginia.edu
#SBATCH --job-name=parallelTest1
#SBATCH --output=parallelTest1_%A.out
#SBATCH --error=parallelTest1_%A.err
#SBATCH --nodes=8                #Number of nodes
#SBATCH --ntasks-per-node=1     #Number of cores per node

# Load Julia environment
module load julia/1.5.0
module load intel/18.0 intelmpi/18.0

srun julia helloParallel.jl
```
This involves importing thr Julia MPI module
```
import MPI

MPI.Init()
comm = MPI.COMM_WORLD
my_rank = MPI.Comm_rank(comm)
comm_size = MPI.Comm_size(comm)
println("Hello! I am ", my_rank, " of ", comm_size, " on ",gethostname())
MPI.Finalize()
```
To take advantage of the fast network interfaces between compute node, use the
system-provided MPI implementations. See the documentation on 'Using a system-provided MPI'
at
(https://juliaparallel.github.io/MPI.jl/stable/configuration/)[https://juliaparallel.github.io/MPI.jl/stable/configuration/]
The output of this program should look like,
```
Hello! I am 6 of 8 on udc-ba34-16c4
Hello! I am 1 of 8 on udc-ba34-10c9
Hello! I am 3 of 8 on udc-ba34-16c1
Hello! I am 5 of 8 on udc-ba34-16c3
Hello! I am 7 of 8 on udc-ba34-16c5
Hello! I am 2 of 8 on udc-ba34-16c0
Hello! I am 4 of 8 on udc-ba34-16c2
Hello! I am 0 of 8 on udc-ba34-10c8
```

# Utilizing GPUs with Julia

[General guidelines on requesting GPUs on Rivanna](https://www.rc.virginia.edu/userinfo/rivanna/slurm/#gpu-intensive-computation)

The following slurm script is for submitting a Julia job that uses 1 of the K80 GPUs. For each GPU requested, the script requests one cpu (ntasks-per-node). The article [An Introduction to GPU Programming in Julia](https://nextjournal.com/sdanisch/julia-gpu-programming) provides more details to get started.

```
#!/bin/bash
# This slurm script is an example of submitting a Julia
# code to a gpu

#SBATCH --partition=gpu
#SBATCH --gres=gpu:k80:1
#SBATCH -A hpc_build
#SBATCH --time=1:00:00
#SBATCH --output=run_gpu_%A.out
#SBATCH --error=run_gpu_%A.err
#SBATCH --mail-type=end
#SBATCH --mail-user=teh1m@virginia.edu
#SBATCH --ntasks-per-node=1 # allocate one cpu for each gpu
##SBATCH --mem=60000

echo 'slurm allocates gpus ' $CUDA_VISIBLE_DEVICES

module purge
module load julia/1.5.0  cuda/10.2.89 cudatoolkit/10.1.168-py3.6

julia gpuTest1.jl
```
The Julia code is
```
using Flux, CuArrays

z = CuArrays.cu([1, 2, 3])
println(2 * z)

m = Dense(10,5) |> gpu
x = rand(10) |> gpu
println(m(x))
```
and the output is
```
slurm allocates gpus  4
[2, 4, 6]
Float32[0.6239201, -0.36249122, -1.1242702, -0.9278027, 0.004131808]
```
