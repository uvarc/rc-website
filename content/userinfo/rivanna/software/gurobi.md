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
  "gurobi",
]
draft = false
shorttitle = "Gurobi"
softwarename = "Gurobi"
modulename = "gurobi"
title = "Gurobi on Rivanna"
description = "Gurobi in Rivanna's HPC environment"
author = "RC Staff"
toc = true
+++

# Gurobi

The Gurobi Optimizer is a state-of-the-art solver for mathematical programming. The solvers in the Gurobi Optimizer were designed from the ground up to exploit modern architectures and multi-core processors, using the most advanced implementations of the latest algorithms.

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

We have an academic site license that allows UVA faculty, staff, and students to use Gurobi on Rivanna. The license is restricted to academic use and all use for commercial purposes is forbidden.

Please submit a ticket if you are UVA faculty/staff/student and need access to the software.

# Using Gurobi

There are several ways to use Gurobi. First load the module.

## Gurobi command prompt
Run:
```
gurobi.sh
```

## Python
To import `gurobipy` as a Python module, you can use either Gurobi's own `python3.7` executable or a different `python`.

### Gurobi Python
Please replace `python` with `python3.7` in your SLURM scripts.

### Non-Gurobi Python
The module provides support for Python versions 2.7, 3.6, and 3.7. Please follow the instructions in the `module load` message.

To check the version of your `python`, run `python -V`.

- 2.7

    If you are using the system Python (i.e. without loading any Anaconda or Python modules) or the `anaconda/2019.10-py2.7` module, run:
    ```bash
    export PYTHONPATH=$GUROBI_HOME/lib/python2.7_utf32
    ```

- 3.6

    Python 3.6 is provided through, for instance, `anaconda/5.2.0-py3.6`. Run:
    ```bash
    export PYTHONPATH=$GUROBI_HOME/lib/python3.6_utf32
    ```

- 3.7

    Python 3.7 is provided through, for instance, `anaconda/2019.10-py3.7`. No extra setup is needed.

If you followed these instructions and still have trouble importing `gurobipy` in your Python script, please use the Gurobi Python `python3.7`.

## Matlab

## Julia

The `GUROBI_HOME` environment variable is already defined. Load the `julia` module and run:
```julia
import Pkg
Pkg.add("Gurobi")
Pkg.build("Gurobi")
```
