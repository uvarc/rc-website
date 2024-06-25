+++
type = "rivanna"
categories = [
  "HPC",
  "software",
  "viz"
]
date = "2024-04-09T00:00:00-05:00"
tags = [
  "image processing",
]
draft = false
modulename = "fiji"
softwarename = "Fiji"
title = "Image Processing with Fiji and UVA HPC"
author = "RC Staff"
+++

# Description
{{% module-description %}}
<br>
**Software Category:** {{% module-category %}}

For detailed information, visit the [{{% software-name %}} website]({{< module-homepage >}}).

# Available Versions
The current installation of {{% software-name %}} incorporates the most popular packages. To find the available versions and learn how to load them, run:

```
module spider {{< module-name >}}
```

The output of the command shows the available {{% software-name %}} module versions.

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
```
module spider {{% module-firstversion %}}
```

{{< module-versions >}}


# Interactive Use of Fiji via FastX

We recommend to launch the Graphical User Interface (GUI) of Fiji as an interactive job via the Open OnDemand [Desktop](/userinfo/hpc/ood/desktop) interactive app.  You may request a core count and amount of memory through the text boxes on the Open OnDemand form.  Be sure to supply your allocation account where requested.

Once the Desktop is launched, open a terminal window.  Load the `fiji` module and start the application: 

```
module load fiji
ImageJ-linux64 --mem=32G &
```

# Run a Fiji script as Slurm Job

To execute a Fiji script non-interactively on a compute node, you can use the following Slurm job script template.

{{< pull-code file="/static/scripts/fiji.slurm" lang="no-hightlight" >}}


* Adjust the `--cpus-per-task`, `--mem` and `--time` options as needed. Note that not all built-in Fiji functions or Fiji scripts are designed to utilize multiple cpu cores.
 
* Replace `<YOUR_ALLOCATION>` with your allocation account.

* Replace `<FIJI_SCRIPT>` and `<SCRIPT_ARGS>` with your custom Fiji script and add script arguments as required by the particular Fiji script.

# Custom Plugins

Users can install their own plugins in their home directory. First create the directory via
```bash
mkdir ~/.plugins
```
Then follow the instructions [here](https://imagej.net/plugins/#installing-plugins-manually), replacing the destination with your local plugin directory.
