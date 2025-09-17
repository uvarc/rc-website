+++
type = "rivanna"
categories = [
  "HPC",
  "software",
  "math"
]
date = "2025-07-25T00:00:00-05:00"
tags = [
  "multi-core",
  "programming",
]
draft = false
modulename = "julia"
softwarename = "julia"
title = "Julia and UVA HPC"
author = "RC Staff"
+++

# Description
Julia is a high-level programming language designed for high-performance numerical analysis and computational science. Distinctive aspects of Julia's design include a type system with parametric polymorphism and types in a fully dynamic programming language and multiple dispatch as its core programming paradigm. It allows concurrent, parallel and distributed computing, and direct calling of C and Fortran libraries without glue code. A just-in-time compiler is used. [Ref: Wikipedia](https://en.wikipedia.org/wiki/Julia_%28programming_language%29)

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

By default, your packages will be installed into `~/.julia`. If you wish to use a different location, run:
```bash
export JULIA_DEPOT_PATH=/path/to/depot
```

[Here](https://aaowens.github.io/julia/2020/01/13/A-Newcomers-Guide-to-the-Julia-Package-Manager.html) is a useful reference for loading Julia packages.

The following code snippet shows the steps used on my UVA HPC account to install and verify the SharedArrays package.
```
$ module load julia
$ julia

julia> using Pkg

(press ] to enter package manager mode)

(@v1.11) pkg> status
Status `/sfs/gpfs/tardis/home/rs7wz/.julia/environments/v1.11/Project.toml`

(press backspace to exit)

julia>

(press ? to enter help mode)

help?> sdata
search: stat ispath

Couldn't find sdata
Perhaps you meant stat, ispath, splat, lstat, sort, sort!, cat, hcat, atan, edit, vcat, sqrt, stack, Meta or abspath
  No documentation found.

  Binding sdata does not exist.

(@v1.11) pkg> add SharedArrays
  Installing known registries into `~/.julia`
       Added `General` registry to ~/.julia/registries
    Updating registry at `~/.julia/registries/General.toml`
   Resolving package versions...
    Updating `/sfs/gpfs/tardis/home/rs7wz/.julia/environments/v1.11/Project.toml`
  [1a1011a3] + SharedArrays v1.11.0
    Updating `/sfs/gpfs/tardis/home/rs7wz/.julia/environments/v1.11/Manifest.toml`
  [8ba89e20] + Distributed v1.11.0
  [a63ad114] + Mmap v1.11.0
  [9a3f8284] + Random v1.11.0
  [ea8e919c] + SHA v0.7.0
  [9e88b42a] + Serialization v1.11.0
  [1a1011a3] + SharedArrays v1.11.0
  [6462fe0b] + Sockets v1.11.0

(@v1.11) pkg> status
Status `/sfs/gpfs/tardis/home/rs7wz/.julia/environments/v1.11/Project.toml`
  [1a1011a3] SharedArrays v1.11.0

julia> using SharedArrays

help?> sdata
search: sdata stat ispath

  sdata(S::SharedArray)

  Return the actual Array object backing S.
```

# Interactive Session through Open OnDemand JupyterLab

## One-time Setup
Open a Julia terminal and install `IJulia`:
```bash
(press ] to enter package manager mode)

(@v1.11) pkg> add IJulia
  Installing known registries into `~/.julia`
       Added `General` registry to ~/.julia/registries
    Updating registry at `~/.julia/registries/General.toml`
...
Precompiling project...
  13 dependencies successfully precompiled in 34 seconds. 28 already precompiled.
```

## Starting an Interactive Session
See [here](https://www.rc.virginia.edu/userinfo/hpc/software/jupyterlab/) for instructions.

When JupyterLab opens in your web browser, it will appear with a selection of notebook kernels to choose from, as shown below.
<img src="/images/juliaNotebook.png" style="height:110%;width:110%"></img>
Select the kernel for the desired Julia version.

## Closing the Interactive Session
When you are done, quit the JupyterLab application.  The interactive session will be closed and the allocated resources will be released. If you leave the session open, your allocation will continue to be charged until the specified time limit is reached.

# Running a Julia Batch Jobs on the HPC System

The UVA HPC system uses the Slurm resource manager to schedule and run jobs on the cluster compute nodes. The following are example Slurm scripts for submitting different types of Julia batch jobs to the cluster.

## Submitting a batch job using a single core of a compute node.

Once your program is debugged, we recommend running in batch mode when possible. This runs the job in the background on a compute node. Write a Slurm script similar to the following:

{{< pull-code file="/static/scripts/julia_serial.slurm" lang="no-highlight" >}}

The simple example code `hello.jl` is shown below.
```
msg="hello world"
println(msg)
```
## Submitting a batch job using multiple cores on a compute node
The `Distributed` package can be used to run Julia code across multiple cores of a compute node. The Slurm script in this case would look like the following:

{{< pull-code file="/static/scripts/julia_serial.slurm" lang="no-highlight" >}}

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
Documentation on distributed computing with Julia can be accessed at the [URL](https://docs.julialang.org/en/v1/stdlib/Distributed/)

# Julia Jobs using Slurm Job Arrays
Slurm has a mechanism for launching multiple independent jobs with one
job script using the `--array` directive.

## Array of Multiple Single-Core Julia Jobs

The following slurm script shows how to run 5 single core Julia jobs using
Slurm job arrays.

{{< pull-code file="/static/scripts/julia_serial.slurm" lang="no-highlight" >}}

The `jobArray.jl` code can use the `SLURM_ARRAY_TASK_ID` shell variable assigned by
Slurm for indexing input file.
```
using Distributed
num_replication = Base.parse(Int, ENV["SLURM_ARRAY_TASK_ID"])
@everywhere println("Job array task id: ", num_replication, " on host $(gethostname())")
```
The Slurm script will produce 5 separate output files, each of the form
```
Job array task id: 4 on host udc-ba25-33c0
```

## Parallel Julia on Multiple Compute Nodes

To run Julia parallel jobs that require more cores than are available on one compute node (e.g. > 40), please use the system MPI libraries. You cannot use the aforementioned Distributed package since it requires SSH permission into compute nodes.

{{< pull-code file="/static/scripts/julia_mpi.slurm" lang="no-highlight" >}}

This involves importing the Julia MPI module:

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
system-provided MPI implementations. See the documentation on [using a system-provided MPI](https://juliaparallel.org/MPI.jl/stable/configuration/).
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

[General guidelines on requesting GPUs on UVA HPC](/userinfo/hpc/slurm/#gpu-intensive-computation)

The following slurm script is for submitting a Julia job that uses 1 GPU. For each GPU requested, the script requests one cpu (ntasks-per-node). The article [An Introduction to GPU Programming in Julia](https://nextjournal.com/sdanisch/julia-gpu-programming) provides more details to get started.

{{< pull-code file="/static/scripts/julia_gpu.slurm" lang="no-highlight" >}}

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
