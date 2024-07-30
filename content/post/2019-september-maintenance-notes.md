+++
author = "Staff"
date = "2019-09-17T05:18:25-05:00"
title = "Important Notes from the 17 September Rivanna Maintenance"
draft = true
tags = ["rivanna","maintenance","feature"]
categories = ["feature"]
summary = "Learn about recent changes implemented during the Sept. 17, 2019 maintenance."
+++

<p class=lead>Rivanna was down for maintenance on Tuesday, September 17.  The items below summarize the changes that may impact the users of Rivanna.
</p>


## I.  **Changes to scratch**

System engineers have installed a new `/scratch` file system, and have transferred to the new system any files/data that were less than 90 days old on the former scratch system.

## II.  **Updates to software modules**
### _New and updated modules_:

The following software modules either replace older versions or are new to Rivanna: <br>

     - pgi/19.7

     - openmpi/3.1.4 (for all GCC and PGI compilers)

     - cuda/10.1.168

For `openmpi`, be sure to remove any reference to 2.1.5 in your scripts.

### _Removed modules_:

The following software modules were removed from Rivanna during the maintenance period:

    - cellranger/2.1.1 (replaced with cellranger/3.1.0)

    - exonerate/2.2.0 (replaced with exonerate/2.4.0)

    - fenics/20180

    - fluent/18.2 (is now part of the ansys/18.2 module)

    - fiji/1.51

    - miniconda/4.3.21-py3.6 (replaced with anaconda/5.2.0-py3.6

    - openmpi/2.1.5 (replaced with openmpi/3.1.4)

    - pgi/17.5 &  pgi/18.10 (replaced with pgi/19.7)

    - povray/3.7.0.7

    - rstudio/0.98.1103


## III. **Other important changes**

{{% callout %}}
The loading of some software modules now requires preloading of a dependency, such as a compiler or version of mpi.
{{% /callout %}}

Run the command `module spider <YOUR_MODULE>` to view module load instructions for a particular application module.

For example,  `module spider abinit/8.2.2`  states that

     You will need to load all module(s) on any one of the lines below before the "abinit/8.2.2" module is available to load.
     intel/18.0  intelmpi/18.0


This statement tells you that both intel and intelmpi must be loaded in order to load abinit.


{{% callout %}}
The operating system was updated, and (as usual) users who compile their own code may need to recompile.

<b>
This also applies to anyone who installed R packages which are dependent on openMPI. Those packages will need to be reinstalled.
</b>
{{% /callout %}}

{{% callout %}}
Libraries and applications built with the Intel 18.0 compiler and IntelMPI libraries have been re-compiled to enable execution on compute nodes with Knights Landing Many-Core processors in the `knl` queue.
{{% /callout %}}


If you have any questions or concerns about these changes, please contact our user support team at [hpc-support@virginia.edu](mailto:hpc-support@virginia.edu).

- - -

{{< button button-class="primary" button-text="About HPC" button-url="/userinfo/hpc" >}}
