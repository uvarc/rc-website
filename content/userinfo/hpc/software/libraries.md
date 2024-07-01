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
  "lib",
]
draft = false
shorttitle = "Libraries"
title = "Libraries and UVA HPC"
description = "Libraries in the HPC environment"
author = "RC Staff"

+++

# Available Software Libraries

To get an up-to-date list of the installed software libraries, log on to UVA HPC and run the following command in a terminal window:
```
module keyword lib
```

To get more information about a specific module version, run the module spider command, for example:
```
module spider hdf5
```

<br>

**List of Software Library Modules**

{{< rivanna-software moduleclasses="numlib,lib"  >}}
