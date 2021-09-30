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

# Web UI
Spark provides a user interface (UI) for you to monitor your Spark job. If you intend to use the Web UI, you must request a [Desktop session through Open OnDemand](/userinfo/rivanna/ood/desktop).

The URL is displayed upon launching Spark and is of the form `http://udc-xxxx-xx:4040` where `udc-xxxx-xx` is the hostname of the compute node. You can either right click on the link and select "Open Link," or enter `localhost:4040` in the browser.

# Using Spark interactively

Please request an ijob or a Desktop session.

## Shell prompt

### Scala/PySpark
To start up a Scala or PySpark shell prompt, run `spark-shell` or `pyspark`. For example:

```bash
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

## Jupyter notebook/lab

Instead of the default Python shell, you can redirect the `pyspark` to open a Jupyter notebook/lab as follows. First, you need access to the `jupyter` command.

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

The example below estimates the value of pi in a PySpark session running on 16 cores, with the JupyterLab window on the left and the Spark Web UI event timeline on the right.

<img src="/images/pyspark.png" style="height:100%;width:100%"></img>
