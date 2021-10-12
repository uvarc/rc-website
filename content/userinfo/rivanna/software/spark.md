+++
type = "rivanna"
categories = [
  "HPC",
  "software",
]
date = "2021-09-30T00:00:00-05:00"
tags = [
  "chem",
  "multi-core",
  "mpi"
]
draft = false
modulename = "spark"
softwarename = "Spark"
title = "Spark on Rivanna"
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

Please request an ijob or a Desktop session.

## Web UI [Desktop]
Spark provides a user interface (UI) for you to monitor your Spark job. If you intend to use the Web UI, you must request a [Desktop session through Open OnDemand](/userinfo/rivanna/ood/desktop).

The URL is displayed upon launching Spark and is of the form `http://udc-xxxx-xx:4040` where `udc-xxxx-xx` is the hostname of the compute node. You can either right click on the link and select "Open Link," or enter `localhost:4040` in the browser.

## Shell prompt [ijob/Desktop]

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
To start an R prompt, you must [load R](/userinfo/rivanna/software/r) first. Then run `sparkR`. If the R version is different from 4.1.0, you will see a warning message:

```
package ‘SparkR’ was built under R version 4.1.0
```

We recommend loading the closest available version.

## Jupyter notebook/lab [Desktop]

Instead of the default Python shell, you can redirect `pyspark` to open a Jupyter notebook/lab as follows. First, you need access to the `jupyter` command.

```
module load anaconda
```

Next, set two environment variables:
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

# SLURM Script Templates for Batch Jobs

## Local mode on a single node
```bash
#!/bin/bash
#SBATCH -p standard     # partition
#SBATCH -A myaccount    # your allocation
#SBATCH -N 1            # number of nodes
#SBATCH -c 10           # number of cores per node
#SBATCH -t 10:00:00     # time

module purge
module load spark

spark-submit script.py
```

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

*We gratefully acknowledge the Pittsburg Supercomputing Center for giving us permission to use their Spark configuration and launch scripts.*

Before using multiple nodes, please make sure that your job can use a full standard node effectively. When you request N nodes in the standalone cluster mode, one node is set aside as the master node and the remaining N-1 nodes are worker nodes. Thus, running on 2 nodes will have the same effect as running on 1 node.

```bash
#!/bin/bash
#SBATCH -p parallel   # do not modify
#SBATCH --exclusive   # do not modify
#SBATCH -A myaccount  # your allocation
#SBATCH -N 3          # number of nodes
#SBATCH -c 40         # number of cores per node
#SBATCH -t 3:00:00    # time

#---------------------------
# do not modify this section
export PARTITIONS=$(( (SLURM_NNODES-1) * SLURM_CPUS_PER_TASK ))
export MASTERSTRING="spark://$(hostname):7077"
$SPARK_HOME/scripts/spark-cluster-init.sh &
sleep 10
#---------------------------

module purge
module load spark

spark-submit --master $MASTERSTRING script.py
```

In the above SLURM script template, note that:

- Request `parallel` nodes with exclusive access.
- You may reduce the number of cores if the job needs more memory per core.
- Your code should begin with:

    ```python
    from pyspark import SparkConf
    from pyspark import SparkContext
    conf = SparkConf()
    sc = SparkContext(conf=conf)
    ```

- The number of partitions should be equal to the total number of cores on worker nodes. This has to be set explicitly in the second argument of `sc.parallelize()`, i.e.:

    ```python
    sc.parallelize(..., os.environ['PARTITIONS'])
    ```

    where the `PARTITIONS` environment variable is defined in the SLURM script for your convenience. Without doing so only one partition will be created on each node.

## Benchmark

We used a code that estimates the value of pi as a benchmark. The following table illustrates good scaling performance across multiple nodes (40 cores per node) on Rivanna.

| Nodes | Worker nodes | Time (s) |
|--:|--:|--:|
|1|1|134.4|
|3|2|71.3|
|5|4|39.6|
|9|8|23.6|

## Cleanup

Temporary files are created inside your scratch directory during a multinode Spark job. They have the form:

- `spark-mst3k-org.apache.spark.deploy.master.Master-1-udc-aw33-2c1.out`
- `spark-8147c5b8-eb70-4b98-809e-19fdbcf3eafb`
- `app-20211012113817-0000`
- `blockmgr-b41a7c79-cbf4-49f0-b373-f6c6467e9d01`

You may safely remove these files when your job is done by running:

{{< code-snippet >}}
find /scratch/$USER -maxdepth 1 -regextype sed \( -name "spark-$USER-*" -o -regex '.*/spark-[0-9a-z]\{8\}-.*' -o -regex '.*/app-[0-9]\{14\}-.*' -o -regex '.*/blockmgr-[0-9a-z]\{8\}-.*' \) -exec rm -rf {} \;
{{< /code-snippet >}}

Make sure that you do not use this pattern to name other files!
