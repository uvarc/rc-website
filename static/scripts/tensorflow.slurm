#!/usr/bin/env bash
#SBATCH -J tftest
#SBATCH -o tftest-%A.out
#SBATCH -e tftest-%A.err
#SBATCH -p gpu
#SBATCH --gres=gpu:1
#SBATCH -c 1
#SBATCH -t 00:01:00
#SBATCH -A mygroup

module purge
module load singularity

# Assuming that the container has been copied to the user's /scratch directory
containerdir=/scratch/$USER
singularity run --nv $containerdir/tensorflow-2.1.0-py37.sif tf_example.py
