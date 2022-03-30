#!/bin/bash
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=40
#SBATCH --time=12:00:00
#SBATCH --partition=parallel
#SBATCH -J myFluentrun
#SBATCH -A mygroup
#SBATCH --mem=96000
#SBATCH --output=myFluentrun.txt

for host in $SLURM_JOB_NODELIST; do
    scontrol show hostname $host >> hosts
done

IFS=' '

module load intel/18.0
module load ansys/19.2
fluent 3ddp -g -t${SLURM_NPROCS} -cnf=hosts -srun -pinfiniband -mpi=intel -ssh -i myjournalfile.jou
