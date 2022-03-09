+++
type = "rivanna"
categories = [
  "HPC",
  "software",
  "bio"
]
date = "2022-03-09T00:00:00-05:00"
draft = false
modulename = "cellranger"
softwarename = "Cell Ranger"
title = "Cell Ranger on Rivanna"
author = "RC Staff"
+++

# Description

{{% module-description %}}

**Software Category:** {{% module-category %}}

For detailed information, visit the [{{% software-name %}} website]({{< module-homepage >}}).

# Available Versions
To find the available versions and learn how to load them, run:

```
module spider {{< module-name >}}
```

The output of the command shows the available {{% software-name %}} module versions.

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
```
module spider {{% module-firstversion %}}
```

{{< module-versions >}}

# Important note on `mkfastq`

If you are using the `mkfastq` subcommand, please do not load the `bcl2fastq2` module. Cell Ranger requires a statically linked binary of `bcl2fastq`, whereas the `bcl2fastq2` module provides a dynamically linked binary. We have prepared a separate statically linked `bcl2fastq`, which will be made available to you automatically upon loading the `cellranger-atac` module.
