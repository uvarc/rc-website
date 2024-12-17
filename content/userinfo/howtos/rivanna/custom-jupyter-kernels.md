+++
type = "howto"
date = "2020-03-03T00:00:00-05:00"
tags = [
  "rivanna", "software", "jupyter", "apptainer"
]
categories = ["howto"]
draft = false
title = "Custom Jupyter Kernels"
description = "How to create custom Jupyter kernels"
author = "RC Staff"

+++

You can create custom kernels from a conda environment or an Apptainer container.
In both cases you'll need to install the `ipykernel` package.

# Jupyter kernel based on a conda environment
To create a custom kernel of the conda environment `myenv` that uses Python 3.7:
```
module load miniforge
conda create -n myenv python=3.7 ipykernel <other_packages>
source activate myenv
python -m ipykernel install --user --name myenv --display-name "My Env"
```

Note:
- You can customize the display name for your kernel. It is shown when you hover over a tile in JupyterLab. If you do not specify a display name, the default `Python [conda env:<ENV_NAME>]` will be shown.
- A custom kernel cannot be created from the terimnal within an interactive JupyterLab session. This will create the kernel in an incorrect folder and the new tile will not be visible. Perform the above commands either in a FastX terminal, SSH connection, or using HPC Shell Access within Open OnDemand.
- For more information on Miniforge, please visit [here](/userinfo/hpc/software/python/).

# Jupyter kernel based on Apptainer container
For this to work, the `ipykernel` Python package must be installed within the Apptainer container. To create a Jupyter kernel for the container, you can either use our automated script `jkrollout` or do it manually.

## Automated script
Replace `/path/to/sif` with the actual image name or path:
```
jkrollout /path/to/sif "My kernel"
```
If GPU is supported:
```
jkrollout /path/to/sif "My kernel" gpu
```

## Manual
Custom kernels are stored under `~/.local/share/jupyter/kernels`. If this directory does not already exist, run
```
mkdir -p ~/.local/share/jupyter/kernels
```
Next, `cd` into it and create a directory for your specific kernel, e.g. `mykernel`:
```
mkdir mykernel
```
Create two files in that directory, `kernel.json` and `init.sh`. (The former must be exactly `kernel.json`. The latter can be customized as long as you are consistent.)

`kernel.json`:
```
{
 "argv": [
  "/home/your_id/.local/share/jupyter/kernels/mykernel/init.sh",
  "-f",
  "{connection_file}"
 ],
 "display_name": "My kernel",
 "language": "python"
}
```
(Remember to replace `your_id` with your user ID.)

`init.sh`:
```
#!/bin/bash
module load apptainer
apptainer exec /path/to/apptainer/image python -m ipykernel $@
```
(Remember to use the actual path of your Apptainer image.)

If the container has GPU support, add a `--nv` flag in the last line:
```
apptainer exec --nv /path/to/apptainer/image python -m ipykernel $@
```
Change `init.sh` into an executable:
```
chmod +x init.sh
```

You will see your custom kernel "My kernel" next time you use JupyterLab.
