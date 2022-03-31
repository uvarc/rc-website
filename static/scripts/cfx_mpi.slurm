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

for host in $SLURM_JOB_NODELIST; do
    echo -n $(scontrol show hostname $host)>> hostfile
done

read -a hosts < hostfile

hostlist=${hosts[0]}","

for (( i=1; i<${#hosts[@]}-1; i++)); do
    hostlist+=${hosts[$i]}","
done

hostlist+=${hosts[${#hosts[@]}-1]}

rm hostfile
module load intel/18.0
module load ansys/19.2

cfx5solve -double -def /scratch/yourpath/mydef.def -par-dist "$hostlist" -partition "$NPARTS" -start-method "Intel MPI Distributed Parallel"
