+++
type = "howto"
date = "2021-04-05T00:00:00-05:00"
tags = [
  "rivanna", "software", "r", "singularity"
]
draft = false
title = "Launching RStudio Server from a Singularity Container"
description = "How to launch RStudio Server from a Singularity container"
author = "RC Staff"

+++

Rocker provides many software containers for R. Due to the default permission settings of our file system, launching an RStudio Server session is not straightforward. If you are interested in using their containers on Rivanna, please follow these steps.

## Pull container
Use Singularity to pull the container. We will use `geospatial` in this example.

```bash
module load singularity
singularity pull docker://rocker/geospatial
```

You should see `geospatial_latest.sif` in your current directory.

## One-time setup
The commands in this section are to be executed as a one-time setup on the frontend.

You will need to create a directory where you have write permissions, typically somewhere under `$HOME`.

```bash
TMPDIR=~/rstudio-tmp # your choice
mkdir -p $TMPDIR/tmp/rstudio-server
uuidgen > $TMPDIR/tmp/rstudio-server/secure-cookie-key
chmod 600 $TMPDIR/tmp/rstudio-server/secure-cookie-key
mkdir -p $TMPDIR/var/{lib,run}
```

These directories will be bind-mounted at runtime when you launch the container.

## Launch script
You must be consistent with the bind-mount paths that you set up in the previous section. We recommend putting the following commands in a script (e.g. `run_rserver.sh`) so that you will not need to type every time you launch RStudio Server.

```bash
#!/bin/bash
# specify path to container
SIF=$HOME/geospatial_latest.sif

# specify path to tmp directory created in previous section
TMPDIR=$(realpath $HOME/rstudio-tmp)

module load singularity
singularity exec \
    -B $TMPDIR/var/lib:/var/lib/rstudio-server \
    -B $TMPDIR/var/run:/var/run/rstudio-server \
    -B $TMPDIR/tmp:/tmp \
    $SIF \
    rserver --www-address=127.0.0.1
```

Change the script into an executable:
{{< code-snippet >}}
chmod +x run_rserver.sh
{{< /code-snippet >}}

## Launch
We recommend launching this in a [FastX Web (MATE)](/userinfo/rivanna/logintools/fastx/) session or through the Desktop Interactive App, both of which can be found on our Open OnDemand portal.

If you are performing compute-intensive tasks, please [request an ijob](/userinfo/rivanna/slurm/#submitting-an-interactive-job) after getting into FastX Web. This is not necessary in a Desktop session since you will have already requested resources.

To launch RStudio Server, execute:
{{< code-snippet >}}
./run_rserver.sh
{{< /code-snippet >}}

Nothing will happen in the terminal which is normal. Open a browser and go to `localhost:8787`.
