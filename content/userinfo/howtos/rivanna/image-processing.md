+++
type = "howto"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "HPC",
  "software",
  "howto"
]
date = "2019-08-26T08:37:46-05:00"
tags = ["vis"
]
draft = false
shorttitle = "Image Processing & Visualization"
title = "Image Processing & Scientific Visualization on the HPC system"
description = "Image Processing & Scientific Visualization Software in the HPC environment"
author = "RC Staff"

+++

# Available Software

To get an up-to-date list of the installed image processing and visualization tools, log on to UVA HPC and run the following command in a terminal window:
```
module keyword vis
```

To get more information about a specific module version, run the module spider command, for example:
<pre>
module spider blender/2.78c
</pre>

<br>

**List of Image Processing and Visualization Software Modules**

{{< rivanna-software moduleclasses="vis" >}}

# Running Interactive Visualizations

Many of the provided image processing and visualization applications provide a graphical user interface (GUI). In order to use a GUI on the HPC system, users must log in through a client capable of displaying X11 graphics.  We recommend [FastX Web](/userinfo/hpc/logintools/fastx) which provides a GPU to accelerate rendering.

To start an applications GUI in an X11-enabled terminal, first load the software module and then run the GUI application executable, e.g.
```
module load blender
```

When connected to UVA HPC via FastX Web, rendering of the graphical user interface can be accelerated by executing this command:
```
module load blender
vglrun -c proxy blender &
```

The ampersand `&` returns the terminal to input mode while the application is running.
