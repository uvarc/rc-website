#!/bin/bash
#SBATCH --nodes=1
#SBATCH --cpus-per-task=8
#SBATCH --time=12:00:00
#SBATCH --partition=standard
#SBATCH -J myCFXrun
#SBATCH -A mygroup
#SBATCH --output=myANSYSrun.txt

mkdir /scratch/$USER/myANSYSrun
cd /scratch/$USER/myANSYSrun

module load ansys/2023r1

ansys231 -np ${SLURM_CPUS_PER_TASK} -def /scratch/yourpath/yourdef.def -ini-file/scratch/yourpath/yourresfile.res
