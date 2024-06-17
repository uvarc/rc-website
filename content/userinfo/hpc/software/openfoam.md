+++
type = "rivanna"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "HPC",
  "software",
]
date = "2020-02-27T11:59:46-05:00"
tags = []
draft = false
shorttitle = "OpenFoam"
modulename = "openfoam"
softwarename = "OpenFOAM"
title = "OpenFoam on Rivanna"
author = "RC Staff"

+++

# Description
{{< module-description >}}

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

# Overview

OpenFOAM is an open-source, free software package for computational fluid dynamics (CFD). It is powerful, and is an alternative to ANSYS Fluent, but it may have a steeper learning curve than Fluent's.  OpenFOAM does not provide a graphical user interface for setting up problems.  

# Tutorials

Tutorials are available online.  OpenFOAM itself is distributed with a number of tutorials. To find them, run
```
ls $FOAM_TUTORIALS
```
Generally there are several tutorials for each topic.  Once you have chosen one, you will need to copy all its files to one of your directories, since you cannot write into the general OpenFOAM directories; for example
```
mkdir foam_test
cd foam_test
cp -r $FOAM_TUTORIALS/compressible/rhoSimpleFoam/aerofoilNACA0012
```
Documentation for the tutorials is available at the OpenFOAM [site](https://www.openfoam.com/documentation/tutorial-guide/).

# Parallel Processing

OpenFOAM has been compiled on Rivanna to run with [MPI](/userinfo/rivanna/software/mpi).  Please see our Slurm [documentation](/userinfo/rivanna/slurm) for information about running MPI programs.  

# PostProcessing

OpenFOAM uses [ParaView](https://www.paraview.org) for visualization of results.  You must use the version of Paraview that has been compiled to be compatible with OpenFOAM.  It will be loaded automatically when you load the openfoam module. It is invoked through the `paraFoam` command.  You must use our [FastX](/userinfo/rivanna/logintools/fastx) Web access on Rivanna in order to run Paraview.  To invoke paraFoam, start a terminal on the MATE desktop and run
```
vglrun -c proxy paraFoam
```
