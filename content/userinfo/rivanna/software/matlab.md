### Matlab

MATLAB is an integrated technical computing environment from the MathWorks that combines array-based numeric computation, advanced graphics and visualization, and a high-level programming language. Separately licensed toolboxes provide additional domain-specific functionality.

Mathworks provides MATLAB examples and tutorials for all experience levels here.

#### Using MATLAB on Rivanna

You must always set up your environment in order to use MATLAB.  To load the most recent installed version run

```module load matlab ```

You can work in the MATLAB desktop on the Rivanna frontend nodes; we recommend [FastX](https://arcs.virginia.edu/fastx) for this application.  However, the time and memory that a job can use on the frontends are limited, so for longer jobs you should submit your job to compute nodes through SLURM.

If your Matlab job requires user interactions via the Matlab interface, you should use [ijob](https://arcs.virginia.edu/slurm#interactive_job) to request an interactive job.

#### Submitting a SLURM Batch Job using a single core

Once your program is debugged, we recommend running in batch mode when possible. This runs the job in the background on a compute node. Write a script similar to the following:

```
#!/bin/bash
#SBATCH --nodes 1   #Number of nodes
#SBATCH --ntasks-per-node 1   #Number of cores
#SBATCH -t 01:00:00
#SBATCH -o output_filename
#SBATCH -p standard
#SBATCH -A mygroup

module load matlab
matlab -nodisplay -singleCompThread -r "Mymain(myvar1s);exit"
```
The option `-nodisplay` suppresses the Desktop and any attempt to run a graphical display. The -singleCompThread option is to ensure that all MATLAB built-in functions use only one thread. Some MATLAB functions are capable of running on multiple cores, but may not do so very efficiently. To use them in multicore mode you must request the appropriate number of cores and parallelize your core as shown below, but you will be charged SUs for all cores whether they are used effectively or not. Unless you are sure you can use the cores effectively it's generally best to restrict your job to one core.

The `;exit` is very important to ensure that the job terminates when the computation is done.

##### Running Multiple Single-Core Matlab Jobs Using Slurm Job Arrays

The following slurm script shows how to run 10 single core Matlab jobs using slurm job arrays.

```
#!/bin/bash
# The slurm script file runParallelMultiple.slurm runs
# multiple single core Matlab jobs using s Slurm job array

#SBATCH --array=1-10
#SBATCH -p standard
#SBATCH -A hpc_build
#SBATCH --time=00:30:00
#SBATCH --mail-type=end
#SBATCH --mail-user=teh1m@virginia.edu
#SBATCH --job-name=runMultiple
#SBATCH --output=runMultiple_%A_%a.out
#SBATCH --error=runMultiple_%A_%a.err
#SBATCH --ntasks=1

# Load Matlab environment
module load matlab

# Create variable for slurm job and task ids
slurmArrayID="${SLURM_ARRAY_JOB_ID}${SLURM_ARRAY_TASK_ID}"
export slurmArrayID

% Create a temporary directory on scratch for any Job related files
mkdir -p /scratch/teh1m/slurmJobs/$slurmArrayID

# Run Matlab parallel program
matlab -nodisplay -singleCompThread -r "pcalc2(2000,${slurmArrayID});exit;"

# remove workspace
rm -rf /scratch/teh1m/slurmJobs/$slurmArrayID
```
where the example code `pcalc2.m` is shown below. Note that passing the `SLURM_ARRAY_JOB_ID` variable allows the function to save output to a job-specific filenames.
