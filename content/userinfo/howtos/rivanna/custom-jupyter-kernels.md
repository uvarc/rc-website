+++
type = "howto"
date = "2020-03-03T00:00:00-05:00"
tags = [
  "rivanna", "software", "jupyter", "singularity"
]
draft = false
title = "Custom Jupyter Kernels"
description = "How to create custom Jupyter kernels"
author = "RC Staff"

+++

You can create custom kernels from an Anaconda environment or a Singularity container.
In both cases you'll need to install the `ipykernel` package.

# Jupyter kernel based on Anaconda environment
To create a custom kernel of the Anaconda environment `myenv`:
```
module load anaconda/2019.10-py3.7
source activate myenv
python -m ipykernel install --user --name myenv --display-name "My Env"
```

Note: You can customize the display name, which will be displayed when you hover over a tile in JupyterLab. If you do not specify a display name, the default `Python [conda env:<ENV_NAME>]` will be shown.

# Jupyter kernel based on Singularity container
For this to work, the `ipykernel` Python package must be installed within your Singularity container. To create a Jupyter kernel for a given Singularity image, you can either use our automated script `jkrollout` or do it manually.

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
module load singularity/3.5.2
singularity exec /path/to/singularity/image python -m ipykernel $@
```
(Remember to use the actual path of your Singularity image.)

If the container has GPU support, add a `--nv` flag in the last line:
```
singularity exec --nv /path/to/singularity/image python -m ipykernel $@
```
Change `init.sh` into an executable:
```
chmod +x init.sh
```

You will see your custom kernel "My kernel" next time you use JupyterLab.
