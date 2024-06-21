+++
type = "rivanna"
categories = [
  "HPC",
  "software",
  "bio"
]
date = "2019-06-22T08:37:46-05:00"
tags = [
  "multi-core",
]
draft = false
modulename = "cromwell"
softwarename = "Cromwell"
title = "Cromwell on Rivanna"
author = "RC Staff"
+++

# Description
{{% module-description %}}

<br>
**Software Category:** {{% module-category %}}

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

# The Backend Configuration

In order to allow Cromwell to interact with Rivanna (via [SLURM](/userinfo/hpc/slurm/)), we need to define a backend to dispatch jobs. A Cromwell configuration file, written in HOCON syntax, can be used to define the execution behavior of the pipeline and its integration with a job scheduler, in this case [SLURM](/userinfo/hpc/slurm/).

The following configuration can be used as a base, you can save it as `cromwell-rivanna.conf` in your Rivanna home directory.

```
# include statement
# this ensures defaults from application.conf
include required(classpath("application"))

backend {
    default = "SLURM"
    providers {
        SLURM {
            actor-factory = "cromwell.backend.impl.sfs.config.ConfigBackendLifecycleActorFactory"
            config {
                run-in-background = false
                root = "workdir"
                filesystems {
                    local {
                        localization : ["copy", "hard-link", "soft-link"]
                        caching {
                            duplication-strategy: ["copy", "hard-link", "soft-link"]
                            hashing-strategy: "file"
                        }
                    }					
                }
                runtime-attributes = """
                    Int runtime_minutes = 600
                    Int cpu = 1
                    Int requested_memory_mb = 8000
                    String queue = "standard"
                    String allocation = "uvarc"
                """
                submit = """
                    sbatch -J ${job_name} -D ${cwd} -o ${out} -e ${err} \
                        -t ${runtime_minutes} \
                        -p ${queue} \
                        -A ${allocation} \
                        -c ${cpu} \
                        --mem=${requested_memory_mb} \
                        --wrap "/bin/bash ${script}"
                """
                job-id-regex = "Submitted batch job (\\d+).*"
                check-alive = "squeue -j ${job_id}"
                kill = "scancel ${job_id}"
			}
		}
	}
}
```

**The include statement:** The default Cromwell configuration values are set via Cromwell’s `application.conf` file that is part of the Cromwell installation. To ensure that you always have the defaults from the application.conf, you must include it at the top of your new configuration file.
```
include required(classpath("application"))
...
```

## Slurm backend

In our customized `cromwell-rivanna.conf`file, the Slurm backend is specified via the `actor-factory` field and should be set to `ConfigBackendLifecycleActorFactory`. 
```
backend {
    default = "SLURM"
    providers {
        SLURM {
            actor-factory = "cromwell.backend.impl.sfs.config.ConfigBackendLifecycleActorFactory"
            config {
                ...
            }
        }
    }
}
```
The `config` field contains custom configurations defined in the following subfields:

* `root`: defines the working directory
* `filesystems`: defines file copying and duplication strategies
* `runtime-attributes`: defines job scheduler parameters
* `submit, job-id-regex, check-alive, kill`: define key job scheduler commands 

## The `root` field

This backend assumes that the Cromwell process and the jobs both have read/write access to the current working directory of the job.
```
...
            config {
                root = "workdir"
                ...
            }
...
```
When Cromwell runs a workflow, it will create a directory `./workdir/<workflow_uuid>`. This is called the workflow_root and it is the root directory for all activity in this workflow.

## The `filesystems` field

This block defines the filesystem to store the directory structure and results of an executed workflow.
```
...
            config {
                ...
                filesystems {
                    local {
                        localization : ["copy", "hard-link", "soft-link"]
                        caching {
                            duplication-strategy: ["copy", "hard-link", "soft-link"]
                            hashing-strategy: "file"
                        }
                    }
                }
            }
...
```

Each call has its own subdirectory located at `<workflow_root>/call-<call_name>`. This is the `<call_dir>`. Any input files to a call need to be localized into the `<call_dir>/inputs` directory. The above stanza defines the localization strategy - `copy / hard-link / soft-link`, in that order, until one works.

The caching block defines Cromwell’s behavior if call caching is enabled.

## The `runtime-attributes` field

The next code-block defines default runtime attributes for each call.
```
...
            config {
                ...
                runtime-attributes = """
					Int runtime_minutes = 600
					Int cpu = 1
					Int requested_memory_mb = 8000
					String queue = "standard"
					String allocation = "MY_ALLOCATION"
                """
            }
...
```

Here, we are initializing various runtime variables: `runtime_minutes`, `cpu`, `requested_memory_mb`, `queue`, `allocation` with default values, i.e. we are defining our workflow environment.  **You can keep the defaults but must update the `allocation` field with the name of your specific allocation.**

{{% callout %}}
Note: The runtime attributes defined in your WDL task will override these defaults. This is useful to customize the environment for each call!
{{% /callout %}}

## The `submit` field

The `<workflow_root>/call-<call_name>/execution/` directory for each call will contain a script file, which will have the Slurm job submission command formed by the submit code-block, using the runtime attributes defined earlier.
```
...
            config {
                ...
                submit = """
                    sbatch -J ${job_name} -D ${cwd} -o ${out} -e ${err} \
                    -t ${runtime_minutes} \
                    -p ${queue} \
                    -A ${allocation} \
                    ${"-c " + cpu} \
                    --mem=${requested_memory_mb} \
                    --wrap "/bin/bash ${script}"
                """
		
                job-id-regex = "Submitted batch job (\\d+).*"
                check-alive = "squeue -j ${job_id}"
                kill = "scancel ${job_id}"
            }
...
```

The `job-id-regex`, `check-alive`, and  `kill` configuration values define how to capture the job identifier from the stdout of the submit command, how to check if the job is still running, and how to kill the job.

# Running Cromwell

The path to your custom Cromwell backend configuration file is passed as `-Dconfig.file` command line option. To submit and run the pipeline as defined in the `myWorkflow.inputs.json` and `myWorkflow.wdl` files, execute these command:
<pre>
module load {{% module-firstversion %}}
</pre>
```
java -Dconfig.file=~/cromwell-rivanna.conf \
    -jar /path/to/cromwell-[VERSION].jar \
    run myWorkflow.wdl \
    -i myWorkflow.inputs.json
```  

An example of how to run a bioinformatis pipeline is documented [here](/userinfo/howtos/rivanna/wdl-bioinformatics).
 
# Additional Documentation

Please refer the [Cromwell Backends documentation](http://cromwell.readthedocs.io/en/develop/backends/Backends/) for additional details.

