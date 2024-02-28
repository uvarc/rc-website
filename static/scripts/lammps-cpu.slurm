#!/bin/bash
#SBATCH --account=my_acct
#SBATCH --partition=parallel
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=40
#SBATCH --time=3-00:00:00

module purge
module load goolf lammps/2Aug2023-cpu

srun lmp -in run.in.npt
