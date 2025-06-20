#!/bin/bash
#SBATCH --account=my_acct
#SBATCH --partition=parallel
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=96
#SBATCH --time=1-00:00:00
#SBATCH --output=thermo.out

module load intel

srun ~/bin/vasp_std
