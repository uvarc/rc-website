#!/bin/bash
#SBATCH --nodes=1
#SBATCH --cpus-per-task=20
#SBATCH --partition=standard
#SBATCH -J myCFXrun
#SBATCH -A mygroup
#SBATCH --mem=12000
#SBATCH --output=myCFXrun.txt

cfx5solve -double -def /scratch/yourpath/mydef.def -par-local -partition "$SLURM_CPUS_PER_TASK"
