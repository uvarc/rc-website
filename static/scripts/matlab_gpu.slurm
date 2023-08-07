#!/bin/bash

#SBATCH --partition=gpu
#SBATCH --gres=gpu:4
#SBATCH -A hpc_build
#SBATCH --time=4:00:00
#SBATCH --output=gpuTest_%A.out
#SBATCH --error=gpuTest_%A.err
#SBATCH --mail-type=end
#SBATCH --mail-user=teh1m@virginia.edu
#SBATCH --ntasks-per-node=4 # allocate one cpu for each gpu
#SBATCH --mem=60000

echo 'slurm allocates gpus ' $CUDA_VISIBLE_DEVICES

# Load Matlab environment
module load matlab/R2020a

ndim=12000;
nloop=1000;
# Run Matlab parallel program program
 matlab -nodisplay -r  \
  "gpuTest1(${ndim},${nloop},'${SLURM_JOB_ID}');exit;"
