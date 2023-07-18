#SBATCH -A mygroup
#SBATCH -p standard
#SBATCH --nodes=1
#SBATCH --ntasks=1
#SBATCH --cpus-per-task=8
#SBATCH --mem-per-cpu=9000
#SBATCH --time=06:00:00

module purge
module load smrtlink/5.1.0.26412
ngmlr -t $SLURM_CPUS_PER_TASK -r <reference> -q <reads> [-o <output>]
