#!/bin/bash
#SBATCH --nodes=1
#SBATCH --cpus-per-task=20
#SBATCH --partition=standard
#SBATCH -J myCFXrun
#SBATCH -A mygroup
#SBATCH --output=myCFXrun.txt

module load ansys/2023r1

cfx5solve -double -def /scratch/yourpath/mydef.def -par-local -partition "$SLURM_CPUS_PER_TASK"
