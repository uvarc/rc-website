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
  "lang",
]
draft = false
shorttitle = "Jupyter Lab"
title = "Jupyter Lab and UVA HPC"
description = "Jupyter Lab in the HPC environment"
author = "RC Staff"

+++
# Overview
Jupyter Notebooks are documents which can combine executable code, formatted text, and interactive graphics into a single file.  Because Notebooks can be shared, they provide developers with a tool for capturing and explaining their computational results.  To use a Jupyter Notebook, a web application, such as JupyterLab, is needed.

We now provide a web portal where JupyterLab can be accessed on Rivanna and Afton.

However, to use JupyterLab, you must have an account on UVA HPC.

# Accessing JupyterLab
To access JupyterLab, you will begin by connecting to our Open OnDemand portal:

1. Open a web browser and go to https://ood.hpc.virginia.edu.
2. Use your `Netbadge` credentials to log in.
3. On the top right of the menu bar of the Open OnDemand dashboard, click on `Interactive Apps`.
4. In the drop-down box, click on `JupyterLab`.

<img src="/images/jupyterlab1.png" style="height:100%;width:100%"></img>

# Requesting an Instance
Your instance (or copy) of JupyterLab will run on a compute node. So it will need a list of resources, such as partition, time, and allocation. If you are new to UVA HPC, you may want to read the [HPC User Guide](/userinfo/hpc) to learn more about the partitions.

1. After connecting to JupyterLab through Open OnDemand, a form will appear where you can fill in the resources for JupyterLab.
2. When done filling in the resources, click on the blue “Launch” button at the bottom of the form.
3. It will take a few minutes for the system to gather the resources for your instance of JupyterLab.  When the resources are ready a `Connect to Jupyter` button will appear. Click on the button and the Notebook session will open in a new tab.

The following screenshots illustrate the sequeunce of steps decribed above.

<img src="/images/jupyterlab2.png" style="height:100%;width:100%"></img>
<img src="/images/jupyterlab3.png" style="height:100%;width:100%"></img>
<img src="/images/jupyterlab4.png" style="height:100%;width:100%"></img>
<img src="/images/jupyterlab5.png" style="height:100%;width:100%"></img>

Note that under the Work Directory field, the drop-down menu allows you to choose
either your HOME or SCRATCH directories.

<img src="/images/jupyterlab6.png" style="height:100%;width:100%"></img>
<img src="/images/jupyterlab7.png" style="height:100%;width:100%"></img>

# Running Notebooks
The JupyterLab dashboard will have two panes:

* A file browser pane on the left where you will see the files and folders in your HPC directory; and
* A `Launcher` pane on the right with tiles for the available kernels (i.e., underlying software that will run the code in your Notebooks).

<img src="/images/jupyterlab8.png" style="height:100%;width:100%"></img>

If you already have a Jupyter Notebook in your account, you can maneuver to the file in the file-browser pane, and double-click on the file name to open the Notebook.

However, if you want to create a new Notebook, go to the Launcher pane and click on the tile for the desired kernel (e.g., Python 3).

If you are more familiar with the classic Notebook environment, you can change the JupyterLab format by clicking on `Help` and select `Launch Classic Notebook`.

<img src="/images/jupyterlab9.png" style="height:100%;width:100%"></img>

# Extensions
We provide the following JupyterLab extensions:

- [plotly](https://plotly.com/python/getting-started/) is an interactive plotting library
- [jupyterlab-dash](https://github.com/plotly/jupyterlab-dash) renders Plotly Dash apps as a separate window in JupyterLab
- [jupyterlab-toc](https://github.com/jupyterlab/jupyterlab-toc) auto-generates a table of contents in the left area
- [voila](https://voila.readthedocs.io/en/stable/index.html) allows you to convert a Jupyter Notebook into an interactive dashboard

# FAQ
## How to create custom JupyterLab kernels?
Please refer to our [how-to](/userinfo/howtos/rivanna/custom-jupyter-kernels).

## How do I load a module in JupyterLab?
That is not possible if you request a JupyterLab session. Please refer to our [how-to](/userinfo/howtos/rivanna/load-module-in-jupyter) for a workaround.
