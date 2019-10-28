+++
type = "rivanna"
date = "2019-04-23T08:37:46-05:00"
tags = [
  "rivanna", "software", "mpi"
]
draft = false
title = "Message Passing Interface (MPI) on Rivanna"
description = "Distributed Memory and Message Passing Interface on Rivanna"
author = "RC Staff"

+++
# Overview
MPI stands for Message Passing Interface. The MPI standard is defined by the Message Passing Interface Forum. The standard defines the interface for a set of functions that can be used to pass messages between processes on the same computer or on different computers. MPI can be used to program shared memory or distributed memory computers. There is a large number of implementations of MPI from various computer vendors and academic groups. MPI is supported on the Rivanna cluster.

# MPI On Rivanna
MPI is a standard that describes the behavior of a library.  It is intended to be used with compiled languages (C/C++/Fortran).  Several implementations of this standard exist.  Rivanna supports OpenMPI for all our compilers and IntelMPI for the Intel compiler.   MPI can also be used with the interpreted languages R and Python through packages that link to an implementation; on Rivanna these languages use OpenMPI.  

# Selecting Compiler and Implementation
An MPI implementation must be built with a specific [compiler](/userinfo/rivanna/software/compilers).  Consequently, only compilers for which MPI has been prepared can be used with it.  All versions of the Intel compiler will have a corresponding IntelMPI.  For OpenMPI run
```
module spider openmpi
```
This will respond with the versions of OpenMPI available.  To see which version goes with which compiler, run
```
module spider openmpi/<version>
```
For example:
```
module spider openmpi/2.1.5
```
Example output:
```
You will need to load all module(s) on any one of the lines below before the
"openmpi/2.1.5" module is available to load.
   gcc/system
   gcc/5.4.0
   gcc/7.1.0  
```
This shows that OpenMPI version 2.1.5 is available for the gcc system (4.8.5), 5.4.0, and 7.1.0 compilers.

Once a choice of compiler and MPI implementation have been made, the modules must be loaded.  First load the compiler, then the MPI.  For instance, to use OpenMPI with gcc 7.1.0, run
```
module load gcc/7.1.0
module load openmpi
```
To load the Intel compiler version 18.0 and its IntelMPI version, run
```
module load intel/18.0
module load intelmpi/18.0
```
It is also possible to combine these into one line, as long as the compiler is specified first (this can result in errors if you not using the default compiler, however)
```
module load gcc openmpi
```

# Building an MPI Code
All implementations provide wrappers around the underlying [compilers](/userinfo/rivanna/software/compilers) that simplify compilation.   As it is very important to use the headers that correspond to a given library, users are urged to make use of the wrappers whenever possible.   For OpenMPI and MVAPICH2 these are:

* mpicc \(C)
* mpicxx (C++)
* mpif90 (Fortran free or fixed format)

For Intel MPI these use gcc/g++/gfortran by default, which is generally not recommended; to use the Intel compilers the corresponding wrappers are:

* mpiicc
* mpiicpc
* mpiifort

Most MPI programs are distributed for Linux with a Makefile or a means to create a Makefile, such as `configure` or `cmake`.  If the Makefile can be edited directly, it usually contains variables such as `CC`, `CXX`, `FC` or `F90`, or similar that are set to the compiler to be used.  It is only necessary to use the appropriate wrapper as the compiler.  For `configure` or `cmake`, it may be necessary to export environment variables, e.g.
```
export CC=mpicc
```
before running the command.  Users should refer to the installation documentation for the code they wish to build.  

The same wrappers should also be used to link the program, since they automatically link the correct MPI library for the chosen compiler and implementation.  When using the wrappers as the linker, any Makefile variables such as `MPILIB` should be left blank.

Users who have difficulty building an MPI code not already present on the system can contact ARCS for assistance.

# Running MPI Codes
MPI programs are invoked under the control of an executor; without invoking an executor only a single process will be instantiated, so it is equivalent to running a serial executable.  

# Running on Uncontrolled Systems
On a system not controlled by SLURM, the executors are usually `mpirun` or `mpiexec` (these are typically equivalent). They take a number of options, including the number of processes and a file containing a list of the hostnames on which to run them.  

Users are permitted to run short (approximately 10 minutes or less), small (4-8 processes) testing/debugging runs on the Rivanna frontends.  Multi-node frontend runs are not permitted.  It is not necessary to specify a `hostfile` if all processes are run on the same system.  To run a test job on a frontend with four processes, first load the appropriate modules and then type
```
mpirun -np 4 ./mycode
```
On the frontends the processes will not be assigned to specific cores and may be competing with other processes, so performance may be poor.

To use a debugger with an MPI program, compile with the `-g` flag as for a serial code.  We provide the [Totalview](/userinfo/rivanna/software/totalview) graphical debugger for MPI and OpenMP applications. Totalview requires that the `mpiexec` executor be in your path before you invoke it.  If you need to debug for a longer time, with a large number of cores, or with multiple nodes, you can use Totalview through [FastX](/userinfo/rivanna/logintools/fastx) with an interactive job (ijob).  Please request all cores for the node whether you use them or not, because Totalview cannot use the `srun` command as the executor.

# Running Under SLURM
When running with SLURM, the `srun` command **must** be used as the executor.  Load the appropriate modules in your script, then invoke
```
srun ./mycode
```
Do not specify the number of processes or the list of hosts since `srun` will obtain that information from your request to SLURM and will distribute your processes on the nodes and cores to which your job was assigned.

## Basic MPI

This example is a SLURM job command file to run a parallel (MPI) job using the OpenMPI implementation:
```
#!/bin/bash
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=16
#SBATCH --time=12:00:00
#SBATCH --output=output_filename
#SBATCH --partition=parallel
#SBATCH -A mygroup

module load gcc
module load openmpi

srun ./parallel_executable
```
In this example, the SLURM job file is requesting two nodes with sixteen tasks per node for a total of 32 processes.  Both OpenMPI and IntelMPI are able to obtain the number of processes and the host list from SLURM, so these are not specified.  In general, MPI jobs should use all of a node so we'd recommend `--ntasks-per-node=20` on the parallel partition, but some codes cannot be distributed in that manner so we are showing a more general example here.

SLURM can also place the job freely if the directives specify only the number of tasks. In this case do not specify a node count.  This is not generally recommended, however, as it can have a significant negative impact on performance.
```
#!/bin/bash
#SBATCH --ntasks=8
#SBATCH --time=12:00:00
#SBATCH --output=output_filename
#SBATCH --partition=parallel
#SBATCH -A mygroup

module load gcc
module load openmpi

srun ./parallel_executable
```

**Example: MPI over an odd number of tasks**
```
#!/bin/bash
#SBATCH --ntasks=97
#SBATCH --nodes=5
#SBATCH --ntasks-per-node=20
#SBATCH --time=12:00:00
#SBATCH --output=output_filename
#SBATCH --partition=parallel
#SBATCH -A mygroup

module load gcc
module load openmpi
srun ./parallel_executable
```

## MPI with OpenMP

The following example runs a total of 32 MPI processes, 4 on each node, with each task using 5 cores for threading.  The total number of cores utilized is thus 160.
```
#!/bin/bash
#SBATCH --ntasks=32
#SBATCH --ntasks-per-node=4
#SBATCH --cpus-per-task=5
#SBATCH --time=12:00:00
#SBATCH --output=output_filename
#SBATCH --partition=parallel
#SBATCH -A mygroup

module load mvapich2/gcc
export OMP_NUM_THREADS=$SLURM_CPUS_PER_TASK
srun ./hybrid_executable
```

# Tutorials and books on MPI
A helpful online tutorial is available from the Lawrence Livermore National Laboratory. The following books can be found in UVA libraries:

* Parallel Programming with MPI by Peter Pacheco.
* Using MPI : Portable Parallel Programming With the Message-Passing Interface by William Gropp, Ewing Lusk, and Anthony Skjellum.
* Using MPI-2: Advanced Features of the Message- Passing Interface by William Gropp, Ewing Lusk, and Rajeev Thakur.
* MPI: The Complete Reference : The MPI Core by Marc Snir, Steve Otto, Steven Huss-Lederman, David Walker, and Jack Dongarra.
* MPI: The Complete Reference : The MPI-2 Extensions by William Gropp, Steven Huss-Lederman, Andrew Lumsdaine, Ewing Lusk, Bill Nitzberg, and Marc Snir. A free HTML version of the first edition of the Complete Reference is available at Netlib.

# Example Code
The MPI interface consists of nearly two hundred functions but in general most codes use only a small subset of the functions. Below are a few small example MPI programs to illustrate how MPI can be used. The first code prints a simple message to the standard output:
```
#include <stdio.h>
#include "mpi.h"

int main(int argc,char* argv[]) {
    MPI_Init(&argc, &argv);
    printf("hello world\n");
    MPI_Finalize();
    return 0;
}
```
The Fortran version:
```
program MPI_hello
use mpi
implicit none
integer ierr
call MPI_Init(ierr)
WRITE(6,*)'Hello World'
call MPI_Finalize(ierr)
end program MPI_hello
```
When the code is executed with four processes the following output is produced:
```
hello world
hello world
hello world
hello world
```
The file `mpi.h` holds all the declarations for the MPI functions and must be included. The function `MPI_Init(&argc,&argv)` must be called before any other MPI functions and the function `MPI_Finalize()` should be called after the last MPI function has been called. In the above example these are the only two MPI functions used. `MPI_Init` is called with the same arguments as the main function to allow the system to perform any special initializations for the MPI library. When executed using four processes, four copies of the code are executed. Each process has an integer associated with it called its rank which can be used to identify it. The processes are numbered sequentially from zero. In the next code we use a MPI function call to find out the rank of each process.
```
#include <stdio.h>
#include "mpi.h"

int main(int argc,char* argv[]) {
    int my_rank; MPI_Init(&argc, &argv);
    MPI_Comm_rank(MPI_COMM_WORLD, &my_rank);
    printf("Hello world from process %d \n",my_rank);
    MPI_Finalize();
    return 0;
}
```
The Fortran version:
```
program MPI_Hello
use mpi
implicit none
integer ierr
integer status(MPI_STATUS_SIZE)
integer my_rank
call MPI_Init(ierr)
call MPI_Comm_rank(MPI_COMM_WORLD, my_rank, ierr)
WRITE(6,*)'Hello world from process ',my_rank
call MPI_Finalize(ierr)
end program MPI_Hello
```
We have added two lines to the code. The integer `my_rank` is used to store the rank of each process. The function `MPI_Comm_rank(MPI_COMM_WORLD, &my_rank)` retrieves the rank of the processes and stores it in my_rank. `MPI_COMM_WORLD` is called a communicator and defines a collection of processes that can send messages to each other. The user can define different communicators to hold separate groups of processes but in general only one communicator is needed and it is already defined for the user as `MPI_COMM_WORLD` in `mpi.h`. The output from the above code when run across four processes is:
```
Hello world from process 0
Hello world from process 2
Hello world from process 1
Hello world from process 3
```
When the above code is executed each process acts independently of each other. The order in which they complete is random; executing the code a number of times will demonstrate this. If we wish to order the output it is necessary to synchronize the separate processes. The next example shows how to use MPI functions to order the output. Each process will send their rank to the process with rank zero which will print the ranks in turn. This is an example of message passing, each process will send a message containing an integer representing its rank to the ‘root’ process.
```
#include <stdio.h>
#include "mpi.h"

int main(int argc,char* argv[]) {
    int my_rank;
    int num_proc;
    int dest= 0;
    int tag= 0;
    int tmp,i; MPI_Status status;
    MPI_Init(&argc, &argv);
    /* get my_rank */
    MPI_Comm_rank(MPI_COMM_WORLD, &my_rank);
    /* find out how many processes there are */
    MPI_Comm_size(MPI_COMM_WORLD, &num_proc);
    if( my_rank != 0 ) {
        MPI_Send(&my_rank,1,MPI_INT,dest,tag,MPI_COMM_WORLD);
    } else {
        for(i=1; i < num_proc; i++) {
            MPI_Recv(&tmp,1,MPI_INT,i,tag,MPI_COMM_WORLD,&status);
            printf("hello world from processes %d \n",tmp);
        }
    }
    MPI_Finalize();
    return 0;
}
```
The Fortran version:
```
program MPI_Hello
use mpi
implicit none
integer :: ierr
integer :: status(MPI_STATUS_SIZE)
integer :: my_rank
integer :: p
integer :: source, dest, tag
integer :: size
integer :: tmp
integer :: number=1
call MPI_Init(ierr)
call MPI_Comm_rank(MPI_COMM_WORLD, my_rank, ierr)
call MPI_Comm_size(MPI_COMM_WORLD, p, ierr)
if ( my_rank /= 0 ) then
call MPI_Send(my_rank,1, MPI_INTEGER, + dest,tag,MPI_COMM_WORLD,ierr)
endif
if ( my_rank == 0 ) then
do source=1, p-1
call MPI_Recv(tmp, 1, MPI_INTEGER, source, + tag, MPI_COMM_WORLD, status, ierr)
WRITE(6,*)'Hello World from ',tmp
enddo
ENDIF
call MPI_Finalize(ierr)
end program MPI_Hello
```
MPI_Status is a structure defined in `mpi.h` and used by MPI to hold information such as error status; it is rarely used directly by the programmer. The function `MPI_Comm_size(MPI_COMM_WORLD, &num_proc)` returns the total number of processes that are running in the communicator `MPI_COMM_WORLD` and stores it in num_proc. The `if` block can be interpreted as follows:
```
if( my_rank != 0 ) {
    I am not 'root' process:: send my_rank to root }
else {
    I am 'root' process:: receive the rank of each process in turn and print it
}
```
The `MPI_Send(&my_rank,1,MPI_INT,dest,tag,MPI_COMM_WORLD)` function can be understood as follows:

| Argument | Interpretation |
|---|---|
| &my_rank | Address of value to be sent. |
| 1	| Number of values to be sent; by setting this number greater than one, arrays can be sent.
| MPI_INT	| “Type” of value to be sent. |
| dest | Process the data is to be sent to, in this case process 0. |
| tag	| An identifier for the message—a process may be expecting a number of messages fro another process and the tag is simply an integer used to differentiate them. In this case the tag was set to 0. |

`MPI_COMM_WORLD`	Defines which communicator the processes belong to.
The function takes the address of the variable to be sent, effectively it takes a chunk of memory from that address and sends it. The size of the chunk of memory is defined by the ‘type’ of variable and how many items it contains if it is an array. The variable MPI_INT is used to indicate that an integer is being sent. MPI supports all the common data types, e.g. `MPI_FLOAT` for float, `MPI_DOUBLE` for double and `MPI_CHAR` for char. It is possible to create your own MPI data type to send C type struct [typo?]. The corresponding receive function `MPI_Recv(&tmp,1,MPI_INT,i,tag,MPI_COMM_WORLD,&status)` can be understood as follows:

| Argument | Interpretation |
|---|---|
| &tmp | Address where the incoming value will be stored.
| 1	| Number of values to receive.
| MPI_INT	| “Type” of value to be received.
| i	| Process that is sending the data.
| tag	| Identifier for the message.
`MPI_COMM_WORLD`	Communicator for the processes.
&status	A structure that is used to hold any error messages from the MPI function.
The output from the code when run with four processes is:
```
hello world from processes 1
hello world from processes 2
hello world from processes 3
```
The above simple examples illustrate how MPI can be used to pass data between processes. Perhaps the simplest use of MPI is for Monte Carlo simulations where the same code is executed a large number of times with slightly different parameters, perhaps generated with a random number. MPI can be used to start up a number of processes across different CPUs executing the same code but seeded with a different random number. For example, if the main function were called Monte_Carlo() and the random number generator were seeded with the function `random_seed(int)`, the code would have the outline:
```
int main(int argc,char* argv[]); {
    int my_rank;
    MPI_Init(&argc, &argv);
    /* Get the rank of each process */
    MPI_Comm_rank(MPI_COMM_WORLD, &my_rank);
    /* seed the random number generator with the rank of the process */
    random_seed(my_rank);
    /* execute the code */
    Monte_Carlo();
    MPI_Finalize();
    return 0;
}
```
The above code would open files `Output.00`, `Output.01`, `Output.02`, etc., depending on the number of processes, and each process would have its own file with pointer `fp` for output. Putting the two pieces of code together:
```
FILE *fp;
int main(int argc,char* argv[]); {
    int my_rank;
    char file[100];
    char c1,c2;
    MPI_Init(&argc, &argv);
    /* Get the rank of each process */
    MPI_Comm_rank(MPI_COMM_WORLD, &my_rank);
    /* c1 and c2 are two characters used to represent my_rank */
    c1=my_rank/10 +'0';
    c2=my_rank%10 +'0';
    /* copy "Output." to the character array file */
    strcpy(file,"OutPut.");
    /* add c1 and c2 to the end of the character array file */
    strncat(file,&c1,1);
    strncat(file,&c2,1);
    /* open a file with the name held in the character array file */
    fp=fopen(file,"w");
    /* seed the random number generator with the rank of the process */
    random_seed(my_rank);
    /* execute the code */
    Monte_Carlo(); MPI_Finalize();
    return 0;
}
```
The Fortran version:
```
program MPI_output
use mpi
implicit none
integer :: ierr
character(len=100):: filename
character(len=10) :: digit_string
integer :: p, my_rank

call MPI_Init(ierr)
! Get my_rank
call MPI_Comm_rank(MPI_COMM_WORLD, my_rank, ierr)
!Get the number of Processes
call MPI_Comm_size(MPI_COMM_WORLD, p, ierr)
call seed_random_numbers( my_rank)
! Convert my_rank to a charactoer string
write(digit_string,'(i4.4)') my_rank
! Concat "file" and the string for my_rank
filename='file.'//digit_string(1:len_trim(digit_string) !
!Open a file for each process for I/O
open(unit=7,file=filename,status='unknown')
write(7,*)'Hello World from ',my_rank
call MONTE_CARLO() !Do actual work of the code
close(7)
call MPI_Finalize(ierr)
end program MPI_output
```
