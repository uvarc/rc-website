#!/bin/bash
#SBATCH --job-name=abinit
#SBATCH -N 3
#SBATCH --ntasks-per-node=40
#SBATCH -t 10:00:00
#SBATCH -p parallel
#SBATCH -A mygroup

module purge
module load intel abinit

# assumes that the textfile “files” is present in the current directory
# pseudopotentials need to be in directory as defined in “files"

srun abinit <files>& gw-$SLURM_JOBID.log
