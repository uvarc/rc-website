#!/bin/bash
#SBATCH --nodes=1
#SBATCH --cpus-per-task
#SBATCH --time=12:00:00
#SBATCH --partition=standard
#SBATCH -J myCFXrun
#SBATCH -A mygroup
#SBATCH --mem=96000
#SBATCH --output=myCFXrun.txt

mkdir /scratch/$USER/myCFXrun
cd /scratch/$USER/myCFXrun

module load ansys/19.2
ansys192 -np ${SLURM_CPUS_PER_TASK} -def /scratch/yourpath/yourdef.def -ini-file/scratch/yourpath/yourresfile.res
