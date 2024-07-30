#!/bin/bash

#SBATCH -A mygroup
#SBATCH -p standard
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=1
#SBATCH --array=1-100
#SBATCH --time=06:00:00
#SBATCH --mem-per-cpu=9000

module purge
module load apptainer cellprofiler

FIRST_IMG_INDEX=$SLURM_ARRAY_TASK_ID
LAST_IMG_INDEX=$SLURM_ARRAY_TASK_ID
BATCH_FILE=/scratch/$USER/pipelines/Batch_data.h5

apptainer exec /scratch/$USER/cellprofiler-4.2.5.sif cellprofiler -c -r -p $BATCH_FILE -f $FIRST_IMG_INDEX -l $LAST_IMG_INDEX
