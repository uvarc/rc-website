+++
categories = [
  "HPC",
  "software",
  "bio"
]
date = "2019-06-22T08:37:46-05:00"
tags = [
  "multi-core",
]
draft = false
modulename = "bowtie2"
softwarename = "Bowtie2"
title = "Bowtie2 on Rivanna"
author = "RC Staff"
+++

# Description
{{% module-description %}}
<br>
**Software Category:** {{% module-category %}}

For detailed information, visit the [{{% software-name %}} website]({{< module-homepage >}}).

# Available Versions
The current installation of {{% software-name %}} incorporates the most popular packages. To find the available versions and learn how to load them, run:
<pre>module spider {{% module-name %}}</pre>

The output of the command shows the available {{% software-name %}} module versions.

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
<pre>module spider {{% module-firstversion %}}</pre>

{{% module-versions %}}

# Build Your Own Version
Users may build their own versions of {{% software-name %}} if they wish to use a different compiler/MPI combination. Instructions are available on the [{{% software-name %}} website]({{< module-homepage >}}). If using the Intel compiler, you need to add the `-heap-arrays` flag to the Fortran compiler options.

# SLURM Script Example
To run {{% software-name %}} on Rivanna, a script similar to the following can be used. {{% software-name %}} has many options so only a basic example is shown.

```
```
<br>
