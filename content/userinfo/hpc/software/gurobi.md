+++
type = "rivanna"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "HPC",
  "software",
]
date = "2024-01-02T00:00:00-05:00"
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

## Gurobi command prompt
Run:
```
gurobi.sh
```

## Python
To import `gurobipy` as a Python module, you can use either Gurobi's own `python3.7` executable or a different `python`. gurobi/10.0.1 uses `python3.7` and gurobi/11.0.0 uses `python3.11`.

### Gurobi Python
Please replace `python` with `python3.7` or `python3.11` in your Slurm scripts. However, note that Gurobi does not provide `pip`. If you need additional Python packages please use a non-Gurobi Python (e.g. via `module load anaconda`). See next section.

### Non-Gurobi Python
Gurobi/10.0.1 supports Python versions 2.7, 3.6 - 3.9. Please follow the instructions in the `module load` message.

To check the version of your `python`, run `python -V`.

If you followed these instructions and still have trouble importing `gurobipy` in your Python script, please use the Gurobi Python `python3.7`.

## Julia

The `GUROBI_HOME` environment variable is already defined. Load the `julia` module and run:
```julia
import Pkg
Pkg.add("Gurobi")
Pkg.build("Gurobi")
```
