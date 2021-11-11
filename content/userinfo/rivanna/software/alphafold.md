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

# AlphaFold Installation Details

## Dockerfile

We prepared a Docker image based on the official Dockerfile with some modifications. The biggest issues are the TensorFlow version and missing cudnn/cusolver libraries as reported [here](https://github.com/deepmind/alphafold/pull/28).

Our current solution is:

- keep CUDA version at 11.0;
- downgrade Python to 3.8.10;
- downgrade TensorFlow to 2.4.1;
- add `libcudnn8` and `libcusolver-11-0` in production stage.

We did not use TensorFlow 2.5.0 with CUDA 11.2 because currently our [NVIDIA driver version does not support that](/userinfo/rivanna/software/tensorflow/#can-i-install-my-own-tensorflow-that-works-on-a-gpu).

For further details see [here](https://github.com/uvarc/rivanna-docker/tree/master/alphafold/2.0.0).

## AlphaFold launch command

The full Singularity command to launch AlphaFold looks like this:

```
singularity run -B $ALPHAFOLD_DATA_PATH:/data -B .:/etc --pwd /app/alphafold --nv $CONTAINERDIR/alphafold-2.0.0.sif \
    --fasta_paths=/full/path/to/fasta \
    --output_dir=/full/path/to/outdir \
    --model_names= \
    --preset=[full_dbs|casp14] \
    --max_template_date= \
    --data_dir=/data \
    --uniref90_database_path=/data/uniref90/uniref90.fasta \
    --mgnify_database_path=/data/mgnify/mgy_clusters.fa \
    --uniclust30_database_path=/data/uniclust30/uniclust30_2018_08/uniclust30_2018_08 \
    --bfd_database_path=/data/bfd/bfd_metaclust_clu_complete_id30_c90_final_seq.sorted_opt \
    --pdb70_database_path=/data/pdb70/pdb70 \
    --template_mmcif_dir=/data/pdb_mmcif/mmcif_files \
    --obsolete_pdbs_path=/data/pdb_mmcif/obsolete.dat
```

### Explanation of Singularity flags

1. The database and models are stored in `$ALPHAFOLD_DATA_PATH`.
1. A cache file `ld.so.cache` will be written to `/etc`, which is not allowed on Rivanna. The workaround is to bind-mount e.g. the current working directory to `/etc` inside the container. `[-B .:/etc]`
1. You must launch AlphaFold from `/app/alphafold` inside the container due to [this issue](https://github.com/deepmind/alphafold/issues/32). `[--pwd /app/alphafold]`
1. The `--nv` flag enables GPU support.

### Explanation of AlphaFold flags

1. The default command of the container is `/app/run_alphafold.sh`. *All flags shown above are required* and are passed to `/app/run_alphafold.sh`.
1. As a consequence of the Singularity `--pwd` flag, the fasta and output paths must be *full paths* (e.g. `/scratch/$USER/mydir`, not *relative paths* (e.g. `./mydir`).
1. The `model_names` should be a comma-separated list of `model_*`. See `$ALPHAFOLD_DATA_PATH/params` for the complete set of model names. In [`run_docker.py`](https://github.com/deepmind/alphafold/blob/main/docker/run_docker.py) `model_1,model_2,model_3,model_4,model_5` is used.
1. The `max_template_date` is of the form `YYYY-MM-DD`.
1. For further explanations and additional options please see [`run_alphafold.py`](https://github.com/deepmind/alphafold/blob/main/run_alphafold.py).

## Launch script `run`

For your convenience, we have prepared a launch script `run` that takes care of the Singularity command and the database paths, since these are unlikely to change. If you do need to customize anything please use the full Singularity command in the previous section.

# SLURM Script

Copy and paste the following as a template for your SLURM script. 

```
#!/bin/bash
#SBATCH -A mygroup      # your allocation account
#SBATCH -p gpu          # partition
#SBATCH --gres=gpu:1    # number of GPUs
#SBATCH -N 1            # number of nodes
#SBATCH -c 8            # number of cores
#SBATCH -t 10:00:00     # time

module purge
module load singularity alphafold

# version 2.0
run --fasta_paths=/full/path/to/fasta \
    --output_dir=/full/path/to/outdir \
    --model_names= \
    --preset= \
    --max_template_date=
```

For version 2.1+, use the following `run` command (`model_names` -> `model_preset`; `preset` -> `db_preset`):

```
# version 2.1
run --fasta_paths=/full/path/to/fasta \
    --output_dir=/full/path/to/outdir \
    --model_preset = \
    --db_preset= \
    --max_template_date=
```

Please refer to [`run_alphafold.py`](https://github.com/deepmind/alphafold/blob/main/run_alphafold.py) for details.

You may need at least 8 CPU cores due to this line printed in the output:
```
Launching subprocess "/usr/bin/jackhmmer -o /dev/null -A /tmp/tmpys2ocad8/output.sto --noali --F1 0.0005 --F2 5e-05 --F3 5e-07 --incE 0.0001 -E 0.0001 --cpu 8 -N 1 ./seq.fasta /share/resources/data/alphafold/mgnify/mgy_clusters.fa"
```
