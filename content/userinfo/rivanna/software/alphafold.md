+++
type = "rivanna"
categories = [
  "HPC",
  "software",
]
date = "2021-07-21T00:00:00-05:00"
tags = [
  "chem",
  "multi-core",
  "mpi"
]
draft = false
modulename = "alphafold"
softwarename = "AlphaFold"
title = "AlphaFold on Rivanna"
author = "RC Staff"
+++

# Description
{{% module-description %}}
<br>
**Software Category:** {{% module-category %}}

For detailed information, visit the [{{% software-name %}} website]({{< module-homepage >}}).

# Available Versions
The current installation of {{% software-name %}} incorporates the most popular packages. To find the available versions and learn how to load them, run:

```
module spider {{< module-name >}}
```

The output of the command shows the available {{% software-name %}} module versions.

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
```
module spider {{% module-firstversion %}}
```

{{< module-versions >}}

# AlphaFold Dockerfile

We prepared a Docker image based on the official Dockerfile with some modifications. The biggest issue is the TensorFlow version and missing cudnn/cusolver libraries as reported [here](https://github.com/deepmind/alphafold/pull/28)

Our current solution is:

- CUDA version kept at 11.0
- Downgraded Python to 3.8.10
- Downgraded TensorFlow to 2.4.1
- Added `libcudnn8` and `libcusolver-11-0` in production stage

We did not use TensorFlow 2.5.0 with CUDA 11.2 because our [NVIDIA driver version does not support that](/userinfo/rivanna/software/tensorflow/#can-i-install-my-own-tensorflow-that-works-on-a-gpu).

For details see [here](https://github.com/uvarc/rivanna-docker/tree/master/alphafold/2.0.0).

# AlphaFold SLURM script
Please copy and paste the following as a template for your SLURM script. Note that:

1. Database and model are stored in `$ALPHAFOLD_DATA_PATH`.
1. The program may need at least 8 cores due to this line printed in the output:
    ```
    Launching subprocess "/usr/bin/jackhmmer -o /dev/null -A /tmp/tmpys2ocad8/output.sto --noali --F1 0.0005 --F2 5e-05 --F3 5e-07 --incE 0.0001 -E 0.0001 --cpu 8 -N 1 ./seq.fasta /share/resources/data/alphafold/mgnify/mgy_clusters.fa"
    ```
1. The program tries to write a cache file `ld.so.cache` to `/etc`, which is not allowed on Rivanna. The workaround is to bind-mount e.g. the current working directory to `/etc` insde the container.
1. In the following SLURM script, all flags are *required*. You must fill in the values after empty `=`'s and choose a preset.
1. For a complete set of options please see [`run_alphafold.py`](https://github.com/deepmind/alphafold/blob/main/run_alphafold.py).
1. The `model_names` should be a comma-separated list of `model_*`. See `$ALPHAFOLD_DATA_PATH/params` for the complete set of model names. In [run_docker.py](https://github.com/deepmind/alphafold/blob/main/docker/run_docker.py) `model_1,model_2,model_3,model_4,model_5` is used.


```
#!/bin/bash
#SBATCH -A mygroup      # your allocation account
#SBATCH -p gpu          # partition
#SBATCH --gres=gpu:1    # number of GPUs
#SBATCH -N 1            # number of nodes
#SBATCH -c 8            # number of cores
#SBATCH -t 24:00:00     # time

module purge
module load singularity alphafold

singularity run -B .:/etc --nv $CONTAINERDIR/alphafold-2.0.0.sif \
    --fasta_paths= \
    --output_dir= \
    --model_names= \
    --preset=[full_dbs|casp14] \
    --max_template_date= \
    --data_dir=$ALPHAFOLD_DATA_PATH \
    --uniref90_database_path=$ALPHAFOLD_DATA_PATH/uniref90/uniref90.fasta \
    --mgnify_database_path=$ALPHAFOLD_DATA_PATH/mgnify/mgy_clusters.fa \
    --uniclust30_database_path=$ALPHAFOLD_DATA_PATH/uniclust30/uniclust30_2018_08/uniclust30_2018_08 \
    --bfd_database_path=$ALPHAFOLD_DATA_PATH/bfd/bfd_metaclust_clu_complete_id30_c90_final_seq.sorted_opt \
    --pdb70_database_path=$ALPHAFOLD_DATA_PATH/pdb70/pdb70 \
    --template_mmcif_dir=$ALPHAFOLD_DATA_PATH/pdb_mmcif/mmcif_files \
    --obsolete_pdbs_path=$ALPHAFOLD_DATA_PATH/pdb_mmcif/obsolete.dat
```
