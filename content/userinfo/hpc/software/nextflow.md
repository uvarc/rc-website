+++
type = "rivanna"
categories = [
  "HPC",
  "software",
  "bio"
]
date = "2021-07-08T08:37:46-05:00"
tags = [
  "multi-core",
  "workflow managers",
  "bioinformatics",
  "nextflow",
]
draft = false
modulename = "nextflow"
softwarename = "Nextflow"
title = "Nextflow and UVA HPC"
author = "RC Staff"
+++

# Description
<img src="/images/nextflow.png" style="float:right;" class="project-inset" />
{{% module-description %}}

<br>
<strong>Software Category:</strong> {{% module-category %}}

For detailed information, visit the [{{% software-name %}} website]({{< module-homepage >}}).

---

# Available Versions
The current installation of {{% software-name %}} incorporates the most popular packages. To find the available versions and learn how to load them, run:

```
module spider {{< module-name >}}
```

The output of the command shows the available {{% software-name %}} module versions.

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
```
module spider {{% module-firstversion %}}
```

{{< module-versions >}}


---

# Nextflow workflow:

- Nextflow is a workflow management system used to create reproducible and scalable data analyses
- Workflows are written in Groovy and can be deployed in parallel on the HPC system
- Workflows can be executed with modules or containerized environments: Conda or Apptainer

<!--# Nextflow processes:

![Nextflow DAG](/images/nextflow-dag.png)
<img src="/images/nextflow-dag.png" alt="Nextflow DAG" style="width:10%;">
- Workflows are defined in processes
- Dependencies between the processes are determined when defining a workflow, creating a DAG (directed acyclic graph) of jobs that can be parallelized -->

<div style="display: flex; flex-wrap: wrap; align-items: flex-start; gap: 20px;">

  <div style="flex: 1; min-width: 250px;">
    <h1>Nextflow processes:</h1>
    <ul>
      <li>Workflows are defined in processes</li>
      <li>Dependencies between the processes are determined when defining a workflow, creating a DAG (directed acyclic graph) of jobs that can be parallelized</li>
    </ul>
  </div>

  <div>
    <img src="/images/nextflow-dag.png" alt="Nextflow DAG" style="width:200px; margin-top: 30px;">
  </div>

</div>

# nextflow.config file:
Config files are generally for
- params: workflow parameters (like input filenames, paths, job settings) processes to define global or process-specific options, or profiles.
- processes: additional processes specifying global and/or per-process settings, software environments, profiles, and job settings
- profiles: specify a frequently used collection of settings and/or parameters

```

params {
    reads   = 'sample1.fastq'
    adapter = 'AACCGGTT'
    ref     = 'GCF_000005845.2_ASM584v2_genomic.fna'
    outdir  = 'results'
}

process {
    executor = 'slurm'
    queue = 'standard'
    clusterOptions = '--account=my-hpc-allocation'

    withName: CUTADAPT {
        cpus = 2
        time = '4h'
        mem = '8 GB'
        beforeScript = '''
        module purge
        module load cutadapt
        '''
    }

    withName: BWA_ALIGN {
        cpus = 2
        time = '4h'
        mem = '8 GB'
        beforeScript = '''
        module purge
        module load bwa
        module load samtools
        '''
    }

    withName: FREEBAYES {
        cpus = 2
        time = '4h'
        mem = '8 GB'
        beforeScript = '''
        module purge
        module load freebayes
        '''
    }
}
```

# main.nf:

- The main.nf contains the processes of your workflow (the steps)
- Your workflow will determine the order of the processes in order to create that output
- Each process generally has at least a script, input, output consists of 3 required parts: the input files, the output files, and the shell (command)
- Below is an example of a process to align sequences using hisat. The log and threads options are optional, but included for reference
- The target output is a gene count matrix in a csv format

```
process CUTADAPT {

    publishDir params.outdir, mode: 'copy'

    input:
    path reads

    output:
    path "${reads.simpleName}_trimmed.fastq"

    script:
    """
    cutadapt -a ${params.adapter} -o ${reads.simpleName}_trimmed.fastq $reads
    """
}

process BWA_ALIGN {

    publishDir params.outdir, mode: 'copy'

    input:
    path reads
    path ref

    output:
    path "${reads.simpleName}.bam"

    script:
    """
    bwa index $ref
    bwa mem $ref $reads | samtools sort -o ${reads.simpleName}.bam
    """
}

process FREEBAYES {

    publishDir params.outdir, mode: 'copy'

    input:
    path bam
    path ref

    output:
    path "${bam.simpleName}.vcf"

    script:
    """
    freebayes -f $ref $bam > ${bam.simpleName}.vcf
    """
}

workflow {
    reads_ch = Channel.fromPath(params.reads, checkIfExists: true)
    ref_ch   = Channel.fromPath(params.ref, checkIfExists: true)

    trimmed_ch = CUTADAPT(reads_ch)
    bam_ch     = BWA_ALIGN(trimmed_ch, ref_ch)
    FREEBAYES(bam_ch, ref_ch)
}
```
# Slurm for Nextflow:

- The Nextflow pipeline can be executed using a `SLURM` script on the HPC system
- Below is an example script to submit your main controller script to the standard partition with 1 core


{{< pull-code file="/static/scripts/nextflow.slurm" lang="no-highlight" >}}

# Dry Runs:

- Dry-runs are a great way to check your commands before running them
- The code is printed, but not actually run
- For a dry run, use `nextflow run main.nf -dry-run`
