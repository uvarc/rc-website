#!/bin/bash
#SBATCH -A <allocation> 	# allocation name
#SBATCH -p gpu				# partition name
#SBATCH --gres=gpu:1		# request one gpu
#SBATCH -C "v100|a100"		# constrain to a100 or v100 gpus
#SBATCH -N 1				# request 1 node
#SBATCH -c 8				# request 8 cores
#SBATCH -t 24:00:00			# set time limit of 24 hours

# prepare the environment
module purge
module load apptainer clara-parabricks

# run parabricks fq2bam pipeline
apptainer run --nv \
      -B $PWD:/workdir \
      -B $PWD:/outputdir \
    $CONTAINERDIR/clara-parabricks-4.1.1.sif \
    pbrun fq2bam \
      --ref /workdir/parabricks_sample/Ref/Homo_sapiens_assembly38.fasta \
      --in-fq /workdir/parabricks_sample/Data/sample_1.fq.gz /workdir/parabricks_sample/Data/sample_2.fq.gz \
      --out-bam /outputdir/fq2bam_output.bam
