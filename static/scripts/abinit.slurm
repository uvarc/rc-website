#!/bin/bash
#SBATCH --job-name=abinit
#SBATCH -N 5
#SBATCH --mem-per-cpu=9000
#SBATCH --ntasks-per-node=20
#SBATCH -t 10:00:00
#SBATCH -p parallel
#SBATCH -A mygroup

module purge
module load intel/16.0 openmpi/2.1.1 abinit/8.2.2

# assumes that the textfile “files” is present in the current directory
# pseudopotentials need to be in directory as defined in “files"

srun abinit <files>& gw-$SLURM_JOBID.log
