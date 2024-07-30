#!/bin/bash
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=40
#SBATCH --time=12:00:00
#SBATCH --partition=parallel
#SBATCH -J myFluentrun
#SBATCH -A mygroup
#SBATCH --output=myFluentrun.txt

NODEFILE="$(pwd)/slurmhosts.$SLURM_JOB_ID.txt"
srun hostname -s >> $NODEFILE

module load ansys/2023r1

fluent 3ddp -g -t${SLURM_NTASKS} -cnf=$FLUENTNODES -srun -pinfiniband -mpi=intel -i myjournalfile.jou
