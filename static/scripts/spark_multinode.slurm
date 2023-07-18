#!/bin/bash
#SBATCH -p parallel   # do not modify
#SBATCH --exclusive   # do not modify
#SBATCH -A myaccount  # your allocation
#SBATCH -N 3          # number of nodes
#SBATCH -c 36         # number of cores per node
#SBATCH -t 3:00:00    # time

module purge
module load spark

#---------------------------
# do not modify this section
export PARTITIONS=$(( (SLURM_NNODES-1) * SLURM_CPUS_PER_TASK ))
export MASTERSTRING="spark://$(hostname):7077"
$SPARK_HOME/scripts/spark-cluster-init.sh &
sleep 10
#---------------------------

spark-submit --master $MASTERSTRING script.py
