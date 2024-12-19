+++
type = "rivanna"
categories = [
  "HPC",
  "software",
]
date = "2024-12-19T00:00:00-05:00"
tags = [
  "bio",
  "multi-core",
  "gpu"
]
draft = false
modulename = "alphafold"
softwarename = "AlphaFold"
title = "AlphaFold and UVA HPC"
author = "RC Staff"
+++

# Description
{{% module-description %}}

**Software Category:** {{% module-category %}}

For detailed information, visit the [{{% software-name %}} website]({{< module-homepage >}}).

# Available Versions
To find the available versions, run:
```
module spider {{< module-name >}}
```

For detailed information about a particular version, including the load command, run `module spider <name/version>`. __For example__:
```
module spider {{% module-firstversion %}}
```

{{< module-versions >}}

# AlphaFold 3

## Model Parameters

The AlphaFold 3 model parameters are subject to the Terms of Use defined [here](https://github.com/google-deepmind/alphafold3/blob/main/WEIGHTS_TERMS_OF_USE.md). **Our module does not contain the model parameters; instead, each user must submit their own request to DeepMind.** Visit [here](https://github.com/google-deepmind/alphafold3?tab=readme-ov-file#obtaining-model-parameters) for further instructions.

Upon approval you will receive a download url for the file `af3.bin.zst` (~1 GB). Place it in a directory that is not shared with others, e.g. `~/af3`.

```bash
DIR=~/af3
mkdir $DIR
cd $DIR
wget <your_download_url>
unzstd af3.bin.zst
```

The last command will extract the file into `af3.bin`.

## Slurm Script

{{< pull-code file="/static/scripts/alphafold3.slurm" lang="no-highlight" >}}

If you put the model parameters in a different location, change the value of `--model_dir`. To see the complete list of flags run:
```
python $EBROOTALPHAFOLD/app/alphafold/run_alphafold.py --help
```

Refer to the [official documentation](https://github.com/google-deepmind/alphafold3) for more information.

# AlphaFold 2

## Installation details

We prepared a Docker image based on the official Dockerfile with some modifications. 

- AlphaFold does not use TensorFlow on the GPU (instead it uses JAX). See [issue](https://github.com/deepmind/alphafold/issues/88). Changed `tensorflow` to `tensorflow-cpu`.
- There is no need to have system CUDA libraries since they are already included in the conda environment.
- Switched to micromamba instead of Miniconda.

With a three-stage build, our Docker image is only 5.4 GB on disk (2.1 GB compressed on DockerHub), almost half the size using the official Dockerfile (10.1 GB).

For further details see [here](https://github.com/uvarc/rivanna-docker/tree/master/alphafold/2.1.1).

## AlphaFold launch command

Please refer to [run_alphafold.py](https://github.com/deepmind/alphafold/blob/main/run_alphafold.py) for all available options.

### Launch script `run`

For your convenience, we have prepared a launch script `run` that takes care of the Apptainer command and the database paths, since these are unlikely to change. If you do need to customize anything please use the full Apptainer command.

### Explanation of Apptainer flags

1. The database and models are stored in `$ALPHAFOLD_DATA_PATH`.
1. A cache file `ld.so.cache` will be written to `/etc`, which is not allowed on the HPC system. The workaround is to bind-mount e.g. the current working directory to `/etc` inside the container. `[-B .:/etc]`
1. You must launch AlphaFold from `/app/alphafold` inside the container due to [this issue](https://github.com/deepmind/alphafold/issues/32). `[--pwd /app/alphafold]`
1. The `--nv` flag enables GPU support.

### Explanation of AlphaFold flags

1. The default command of the container is `/app/run_alphafold.sh`.
1. As a consequence of the Apptainer `--pwd` flag, the fasta and output paths must be *full paths* (e.g. `/scratch/$USER/mydir`, not *relative paths* (e.g. `./mydir`). You may use `$PWD` as demonstrated.
1. The `max_template_date` is of the form `YYYY-MM-DD`.
1. Only the database paths in `mark_flags_as_required` of [run_alphafold.py](https://github.com/deepmind/alphafold/blob/main/run_alphafold.py) are included because the optional paths depend on `db_preset` (`full_dbs` or `reduced_dbs`) and `model_preset`.

## Slurm Script

Below are some Slurm script templates for version 2.3.

### Monomer with `full_dbs`

{{< pull-code file="/static/scripts/alphafold_monomer.slurm" lang="no-highlight" >}}

### Multimer with `reduced_dbs`

{{< pull-code file="/static/scripts/alphafold_multimer.slurm" lang="no-highlight" >}}

### Notes

1. Before upgrading to a newer version, please always check the [official repo](https://github.com/deepmind/alphafold) for details, especially on any changes to the parameters, databases, and flags.

1. You may need to request 8 CPU cores due to this line printed in the output:
    ```
    Launching subprocess "/usr/bin/jackhmmer -o /dev/null -A /tmp/tmpys2ocad8/output.sto --noali --F1 0.0005 --F2 5e-05 --F3 5e-07 --incE 0.0001 -E 0.0001 --cpu 8 -N 1 ./seq.fasta /share/resources/data/alphafold/mgnify/mgy_clusters.fa"
    ```
1. You must provide a value for `--max_template_date`. If you are predicting the structure of a protein that is already in PDB and you wish to avoid using it as a template, then `max_template_date` must be set to be before the release date of the structure. If you do not need to specify a date, by default you can set today’s date. For example, if you are running the simulation on August 7th 2021, set `-–max_template_date = 2021-08-07`. See [here](https://nostrumbiodiscovery.github.io/nbd_central_docs/software/alphafold/alphafold.html).
1. You are not required to use the `run` wrapper script. You can always provide the full apptainer command.
