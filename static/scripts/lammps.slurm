#!/bin/bash
#SBATCH --account my_acct
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=40
#SBATCH --time=3-00:00:00
#SBATCH --output=thermo.out
#SBATCH --partition=parallel

module purge
module load intel lammps

srun lmp_iimpi -in run.in.npt
