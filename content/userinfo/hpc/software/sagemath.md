+++
type = "rivanna"
categories = [
  "HPC",
  "software",
  "math"
]
date = "Wed May  6 10:04:55 EDT 2020"
tags = [
  "multi-core",
]
draft = false
modulename = "sagemath"
softwarename = "SageMath"
title = "SageMath and UVA HPC"
author = "RC Staff"
+++

# Description
SageMath (previously Sage or SAGE, "System for Algebra and Geometry Experimentation"[3]) is a computer algebra system with features covering many aspects of mathematics, including algebra, combinatorics, graph theory, numerical analysis, number theory, calculus and statistics. [Ref: wikipedia.org](https://en.wikipedia.org/wiki/SageMath)

SageMath is a free open-source mathematics software system licensed under the GPL. It builds on top of many existing open-source packages: NumPy, SciPy, matplotlib, Sympy, Maxima, GAP, FLINT, R and many more. Access their combined power through a common, Python-based language or directly via interfaces or wrappers.
Its mission: Creating a viable free open source alternative to Magma, Maple, Mathematica and Matlab.  [Ref: sagemath.org](https://www.sagemath.org/)


# Available Versions
To find the available versions and learn how to load them, run:
```
module spider sagemath/9.0
```

The sagemath software provides its own Jupyter notebook. To start sagemath, go to
[fastx.hpc.virginia.edu](https://fastx.hpc.virginia.edu)
and select FastX Web. This will open a desktop environment. Then click the terminal icon in the top toolbar and enter:
```
module load apptainer sagemath
```

Read the on-screen instructions carefully to see how to start the Jupyter session in a browser.
<img src="/images/sagemath1.png" style="height:110%;width:110%"></img>

Then after executing the command to start the sagemath Jupyter notebook, you should see
<img src="/images/sagemath2.png" style="height:110%;width:110%"></img>
If you select the URL in the bottom line and right-click to select 'Open Link', a browser will open up to the following page:
<img src="/images/sagemath3.png" style="height:110%;width:110%"></img>
