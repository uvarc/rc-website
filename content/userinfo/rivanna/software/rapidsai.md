+++
type = "rivanna"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "HPC",
  "software",
]
date = "2021-06-15T00:00:00-05:00"
tags = []
draft = false
shorttitle = "RAPIDS"
modulename = "rapidsai"
softwarename = "RAPIDS"
title = "RAPIDS on Rivanna"
author = "RC Staff"

+++

# Description
{{% module-description %}}
<br>
**Software Category:** {{% module-category %}}

For detailed information, visit the [{{% software-name %}} website]({{< module-homepage >}}).

# Available Versions
To find the available versions and learn how to load them, run:
```
module spider {{% module-name %}}
```

The output of the command shows the available {{% software-name %}} module versions.

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
```
module spider {{% module-firstversion %}}
```

{{< module-versions >}}

# Exclude K80 GPU nodes

RAPIDS requires compute capability 6.0+, which means it cannot work on K80 nodes. To exclude them from JupyterLab,
fill out the form as you normally would and under
```
Optional: Slurm Option
```
put
{{< code-snippet >}}
-C "p100|v100|rtx2080"
{{< /code-snippet >}}

If you are using a SLURM script, add this line:
{{< code-snippet >}}
#SBATCH -C "p100|v100|rtx2080"
{{< /code-snippet >}}
