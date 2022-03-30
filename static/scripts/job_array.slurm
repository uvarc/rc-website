#!/bin/bash
#SBATCH --ntasks=1
#SBATCH --time=1:00:00
#SBATCH --output=result_%a.out
#SBATCH --partition=standard

/myprogram < input_${SLURM_ARRAY_TASK_ID}.dat
