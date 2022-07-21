#!/bin/bash
#SBATCH -A mygroup
#SBATCH -p gpu
#SBATCH --gres=gpu:1
#SBATCH -c 1
#SBATCH -t 01:00:00
#SBATCH -J tftest
#SBATCH -o tftest-%A.out
#SBATCH -e tftest-%A.err

module purge
module load singularity tensorflow/2.8.0

singularity run --nv $CONTAINERDIR/tensorflow-2.8.0.sif tf_example.py
