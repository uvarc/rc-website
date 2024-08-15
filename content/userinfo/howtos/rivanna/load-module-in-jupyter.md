+++
type = "howto"
date = "2020-11-02T00:00:00-05:00"
tags = [
  "rivanna", "software", "jupyter"
]
categories = ["howto"]
draft = false
title = "Loading Module in Jupyter"
description = "How to load a module in Jupyter"
author = "RC Staff"

+++

Users cannot load modules inside a JupyterLab session. If you need access to modules, please request a [desktop session](https://ood.hpc.virginia.edu/pun/sys/dashboard/batch_connect/sys/uva_desktop/session_contexts/new) instead of JupyterLab. Fill out the form as you normally would for JupyterLab. After you get to a desktop, open a terminal (next to Firefox in the top bar) and type these commands:

```
module load anaconda
module load ... # your modules here
jupyter-lab
```

This should start up Firefox shortly. If you accidentally close the window, right-click on the link in the terminal and choose "open link" to restart.

An example of using LaTeX inside a JupyterLab session is shown in the screenshot below.

<img src="/images/howtos/jupyter-latex.png">

**Note:** While you can load modules in the native terminal window within JupyterLab, it only applies to the terminal tab and has no effect on the notebook tab.
