+++
type = "rivanna"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "HPC",
  "software",
]
date = "2026-01-06T00:00:00-05:00"
tags = [
  "gurobi",
]
draft = false
shorttitle = "Gurobi"
softwarename = "Gurobi"
modulename = "gurobi"
title = "Gurobi and UVA HPC"
description = "Gurobi in the HPC environment"
author = "RC Staff"
toc = true
+++

# Gurobi

The Gurobi Optimizer is a state-of-the-art solver for mathematical programming. The solvers in the Gurobi Optimizer were designed from the ground up to exploit modern architectures and multicore processors, using the most advanced implementations of the latest algorithms.

# Available Versions
To find the available versions and learn how to load them, run:
```
module spider {{% module-name %}}
```

The output of the command shows the available {{% software-name %}} module versions. To load the most recent version of {{% software-name %}}, at the terminal window prompt run:
```
module load gurobi
```

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
```
module spider {{% module-firstversion %}}
```

{{< module-versions >}}

# License and Permission

We have an academic site license that allows UVA faculty, staff, and students to use Gurobi on the HPC system. The license is restricted to academic use and all use for commercial purposes is forbidden.

Please submit a ticket if you are UVA faculty/staff/student and need access to the software.

# Using Gurobi

There are several ways to use Gurobi. First load the module.

For version 13+, either use `gurobi_cl` via command line or install your own `gurobipy` for the Python API. In the latter case, load miniforge and run `pip install gurobipy==<version>` where `<version>` should match with the `gurobi` module. If you wish, you may [create an environment first](https://www.rc.virginia.edu/userinfo/hpc/software/miniforge/#package-installation-with-conda).

Please note that version 13 no longer ships the command prompt `gurobi.sh` or `gurobipy` with its installation.

## Julia

The `GUROBI_HOME` environment variable is already defined. Load the `julia` module and run:
```julia
import Pkg
Pkg.add("Gurobi")
Pkg.build("Gurobi")
```
