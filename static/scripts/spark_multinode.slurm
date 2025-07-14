#!/bin/bash
#SBATCH -A myaccount  # your allocation
#SBATCH -p parallel   # must be parallel
#SBATCH -N 3          # number of nodes
#SBATCH -c 96         # cores per executor
#SBATCH --mem=100G    # memory per node
#SBATCH -t 10:00:00   # time

SPARK_VERSION=4.0.0
#---------------------------
# do not modify this section
TEC=$(((SLURM_NNODES-1)*SLURM_CPUS_PER_TASK))
EM=$((SLURM_MEM_PER_NODE/1024))
module purge
module load spark/$SPARK_VERSION
spark-start
source ${HOME}/.spark-local/${SLURM_JOB_ID}/spark/conf/spark-env.sh
#---------------------------

spark-submit --master $SPARK_MASTER_URL --executor-memory ${EM}G --total-executor-cores $TEC pi.py
