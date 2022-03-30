#!/bin/bash
#SBATCH --account my_acct
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=16
#SBATCH --time=3-00:00:00
#SBATCH --output=thermo.out
#SBATCH --partition=parallel

module purge
module load intel/16.0
module load intelmpi/16.0_16.0
module load {{% module-firstversion %}}

srun lmp_iimpi -in run.in.npt
