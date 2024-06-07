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

1. Directly from the command line. `ssh` from your terminal and type the following: 
```
module load anaconda/2020 texlive
jupyter nbconvert --to pdf you_script.ipynb 
```

2. If you want to use  GUI, please request a [desktop session](https://ood.hpc.virginia.edu/pun/sys/dashboard/batch_connect/sys/uva_desktop/session_contexts/new). 
Fill out the form as you normally would for JupyterLab. After you get to a desktop, open a terminal (black box next to Firefox in the top bar) and type these commands:

```
module load anaconda/2020 texlive
jupyter notebook
```

This will pull up JupyterLab. Now you will be able to use the `Download as` function in JupyterLab.

<img src="/images/howtos/jupyter-to-pdf.png">
