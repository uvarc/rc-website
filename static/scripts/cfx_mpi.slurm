#!/bin/bash
#SBATCH --nodes=2
#SBATCH --ntasks-per-node=20
#SBATCH --time=12:00:00
#SBATCH --partition=parallel
#SBATCH -J myCFXrun
#SBATCH -A mygroup
#SBATCH --mem=12000
#SBATCH --output=myCFXrun.txt

NPARTS=`expr $SLURM_NTASKS_PER_NODE \* $SLURM_NNODES`
hostlist=$(scontrol show hostname $SLURM_JOB_NODELIST | paste -s -d,)

module load intel/18.0
module load ansys/19.2

cfx5solve -double -def /scratch/yourpath/mydef.def -par-dist "$hostlist" -partition "$NPARTS" -start-method "Intel MPI Distributed Parallel"
