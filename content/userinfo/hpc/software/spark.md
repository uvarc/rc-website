+++
type = "rivanna"
categories = [
  "HPC",
  "software",
]
date = "2025-07-14T00:00:00-05:00"
tags = [
  "chem",
  "multi-core",
  "mpi"
]
draft = false
modulename = "spark"
softwarename = "Spark"
title = "Spark and UVA HPC"
author = "RC Staff"
+++

# Description
{{% module-description %}}
<br>
**Software Category:** {{% module-category %}}

For detailed information, visit the [{{% software-name %}} website]({{< module-homepage >}}).

# Available Versions
To find the available versions and learn how to load them, run:

```
module spider {{< module-name >}}
```

The output of the command shows the available {{% software-name %}} module versions.

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
```
module spider {{% module-firstversion %}}
```

{{< module-versions >}}

# Using Spark interactively

There are three ways to use Spark interactively:
1. Shell prompt
1. Open OnDemand PySpark
1. Open OnDemand Desktop

If you need the Web UI you must use the third method (OOD Desktop).

## Shell prompt

First submit an [ijob](/userinfo/hpc/slurm/#submitting-an-interactive-job).

### Scala/PySpark
To start up a Scala or PySpark shell prompt, run `spark-shell` or `pyspark`. For example:

```
$ spark-shell
...
Spark context Web UI available at http://udc-xxxx-xx:4040
Spark context available as 'sc' (master = local[*], app id = local-1633023285536).
Spark session available as 'spark'.
Welcome to
      ____              __
     / __/__  ___ _____/ /__
    _\ \/ _ \/ _ `/ __/  '_/
   /___/ .__/\_,_/_/ /_/\_\   version 3.1.2
      /_/

Using Scala version 2.12.10 (OpenJDK 64-Bit Server VM, Java 11.0.2)
Type in expressions to have them evaluated.
Type :help for more information.

scala>
```

### R
To start an R prompt, you must [load R](/userinfo/hpc/software/r) first. Then run `sparkR`. If the R version is different from 4.1.0, you will see a warning message:

```
package ‘SparkR’ was built under R version 4.1.0
```

We recommend loading the closest available version.

## Open OnDemand PySpark

Python users can run Spark in a JupyterLab interface via the PySpark Interactive App on [Open OnDemand](/userinfo/hpc/ood).

## Open OnDemand Desktop

Spark provides a user interface (UI) for you to monitor your Spark job. If you intend to use the Web UI, you must request a [Desktop session through Open OnDemand](/userinfo/hpc/ood/desktop).

The URL is displayed upon launching Spark and is of the form `http://udc-xxxx-xx:4040` where `udc-xxxx-xx` is the hostname of the compute node. You can either right-click on the link and select "Open Link," or enter `localhost:4040` in the browser.

### Jupyter notebook/lab

You can redirect `pyspark` to open a Jupyter notebook/lab as follows. The `jupyter` command is provided by the `jupyterlab` module.

Set two environment variables:
```
export PYSPARK_DRIVER_PYTHON=jupyter
export PYSPARK_DRIVER_PYTHON_OPTS=lab
```

If you'd prefer a notebook session, replace `lab` with `notebook`.

Navigate to your working directory and run:
```
pyspark
```
This will start up Jupyter inside a browser automatically. Use the "Python 3" kernel.

The example below estimates the value of pi in a PySpark session running on 16 cores, with the JupyterLab window on the left and the Spark Web UI event timeline on the right. Note that the `SparkContext` object `sc` is initialized automatically.

<img src="/images/pyspark.png" style="height:100%;width:100%"></img>

# Slurm Script Templates for Batch Jobs

## Local mode on a single node

{{< pull-code file="/static/scripts/spark_single_node.slurm" lang="no-highlight" >}}

You must initialize `SparkContext` explicitly in your script, e.g.:

```python
from pyspark import SparkContext
sc = SparkContext("local[*]")
```

The Spark log is written to `slurm-<JOB_ID>.out`. After the job is finished, use the `seff <JOB_ID>` command to verify that the cores are used effectively:

```
$ seff 1232109
...
Cores per node: 10
CPU Utilized: 01:17:16
CPU Efficiency: 82.20% of 01:34:00 core-walltime
...
```

If the CPU efficiency is much lower, please consider using fewer cores for your future jobs.

## Standalone cluster mode using multiple nodes

*We gratefully acknowledge Advanced Research Computing at the University of Michigan for the spark-start script.* The following is implemented for module versions 4.0.0 and above.

Before requesting multiple nodes, please make sure that your job can use a full standard node effectively. When you request N nodes in the standalone cluster mode, one node is set aside as the master node and the remaining N-1 nodes are worker nodes. Thus, running on 2 nodes will have the same effect as running on 1 node.

{{< pull-code file="/static/scripts/spark_multinode.slurm" lang="no-highlight" >}}

It is recommended that all cores (96 per parallel node) be requested. Advanced users may make a copy of `$SPARK_HOME/bin/spark-start` and customize it before submission; specify the path to your local copy in the Slurm script.

Temporary files are created in `~/.spark-local/<JOB_ID>` and may be safely removed after the job completes.
