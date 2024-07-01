+++
type = "howto"
date = "2021-04-05T00:00:00-05:00"
tags = [
  "rivanna", "software", "r"
]
categories = ["howto"]
draft = false
title = "Launching RStudio Server from an Apptainer Container"
description = "How to launch RStudio Server from an Apptainer container"
author = "RC Staff"

+++

Rocker provides many software containers for R. Due to the default permission settings of our file system, launching an RStudio Server session is not straightforward. If you are interested in using their containers on the HPC system, please follow these steps.

# Pull container
Use Apptainer to pull the container. We will use `geospatial` in this example.

```bash
module load apptainer
apptainer pull docker://rocker/geospatial
```

You should see `geospatial_latest.sif` in your current directory.

# One-time setup
The commands in this section are to be executed as a one-time setup on the frontend. You may need to repeat the steps here when running a new rocker container.

Create a directory where you have write permissions, e.g. under `$HOME`:

```bash
TMPDIR=~/rstudio-tmp # your choice
mkdir -p $TMPDIR/tmp/rstudio-server
uuidgen > $TMPDIR/tmp/rstudio-server/secure-cookie-key
chmod 600 $TMPDIR/tmp/rstudio-server/secure-cookie-key
mkdir -p $TMPDIR/var/{lib,run}
```

These directories will be bind-mounted at runtime when you launch the container.

# Launch script
You must be consistent with the bind-mount paths that you set up in the previous section. We recommend putting the following commands in a script (e.g. `run_rserver.sh`) so that you will not need to type every time you launch RStudio Server.

```bash
#!/bin/bash
# specify path to container
SIF=$HOME/geospatial_latest.sif

# specify path to tmp directory created in previous section
TMPDIR=$HOME/rstudio-tmp

module load apptainer
apptainer exec \
    -B $TMPDIR/var/lib:/var/lib/rstudio-server \
    -B $TMPDIR/var/run:/var/run/rstudio-server \
    -B $TMPDIR/tmp:/tmp \
    $SIF \
    rserver --www-address=127.0.0.1 --server-user=$USER
```

Change the script into an executable:
{{< code-snippet >}}
chmod +x run_rserver.sh
{{< /code-snippet >}}

# Launch
We recommend launching this in a [FastX Web (MATE)](/userinfo/hpc/logintools/fastx/) session for short runs or debugging on the frontend. For production runs you can request a [Desktop](/userinfo/hpc/ood/desktop) interactive app. Both FastX and the Desktop can be accessed at our [Open OnDemand](/userinfo/hpc/ood/overview) [portal](https://ood.hpc.virginia.edu).

Once in either FastX or a remote Desktop, start a terminal window.
To launch RStudio Server, execute:
{{< code-snippet >}}
./run_rserver.sh
{{< /code-snippet >}}

Nothing will happen in the terminal, which is normal. Open a browser (Firefox is available through the MATE desktop menu) and go to `localhost:8787`.
Your server should be running there.
