#!/bin/bash
#SBATCH --nodes=1
#SBATCH --cpus-per-task=20
#SBATCH --partition=standard
#SBATCH -J myCFXrun
#SBATCH -A mygroup
#SBATCH --output=myCFXrun.txt

module load ansys/2023r1

#Convert the node information into format for CFX host list
nodes=$(srun -s hostname | sort | \
uniq -c | \
awk '{print $2 "*" $1}' | \
paste -sd, -)

cfx5solve -batch -def /scratch/yourpath/mydef.def  -par-dist $nodes -start-method "Intel MPI Distributed Parallel"
