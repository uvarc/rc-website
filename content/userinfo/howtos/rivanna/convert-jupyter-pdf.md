+++
type = "howto"
date = "2021-05-26T00:00:00-05:00"
tags = [
  "rivanna", "software", "jupyter"
]
categories = ["howto"]
draft = false
title = "Converting a Jupyter Notebook to a PDF"
description = "Converting a Jupyter Notebook to a PDF"
author = "RC Staff"

+++

Users cannot load modules inside the OpenOnDemand App for JupyterLab. Therefore it is not possible to convert a Jupyter Notebook to a PDF directly inside the JupyterLab Interactive App on OpenOnDemand.


There are 2 ways to convert a Jupyter Notebook to a PDF:
<div class="bd-callout bd-callout-warning">
<div style="float:right;margin:2rem;"><i class="fas fa-user-clock fa-5x" aria-hidden="true"></i></div>
  <p>Both methods require Jupyter to be installed within a conda environment. 
  The following example will install Jupyter into a conda environment named 'jupyter':
  <pre><code>
  module load miniforge
  conda create -n jupyter
  source activate jupyter
  mamba install jupyter -y
  </code></pre>
  </p>  
</div>

1. Directly from the command line. `ssh` from your terminal and type the following: 
```
module load miniforge texlive
# Load conda environment with Jupyter installed
source activate jupyter
jupyter nbconvert --to pdf you_script.ipynb 
```

2. If you want to use  GUI, please request a [Desktop session](https://ood.hpc.virginia.edu/pun/sys/dashboard/batch_connect/sys/uva_desktop/session_contexts/new). 
Fill out the form as you normally would for JupyterLab. After you get to a desktop, open a terminal (black box next to Firefox in the top bar) and type these commands:

```
module load miniforge texlive
# Load conda environment with Jupyter installed
source activate jupyter
jupyter notebook
```

This will pull up JupyterLab. Now you will be able to use the `Save and Export Notebook As` function in JupyterLab.

<img src="/images/howtos/jupyter-to-pdf.png">
