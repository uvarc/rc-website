#!/bin/bash
#
#SBATCH --ntasks=1
#SBATCH --partition=standard
#SBATCH --time=3:00:00
#SBATCH --array=1-1000

OPTS=$(sed -n "${SLURM_ARRAY_TASK_ID}"p options.txt)

./myprogram $OPTS
