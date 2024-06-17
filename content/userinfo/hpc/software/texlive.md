+++
type = "rivanna"
categories = [
  "HPC",
  "software"
]
date = "2019-06-22T08:37:46-05:00"
tags = [
  "multi-core",
  "chem"
]
draft = false
modulename = "texlive"
softwarename = "TeX Live"
title = "TeX Live on Rivanna"
author = "RC Staff"
+++

# Description
TeX Live is TeX Live is intended to be a straightforward way to get up and running with the TeX document production system. It provides a comprehensive TeX system with binaries for most flavors of Unix, including GNU/Linux, macOS, and also Windows. It includes all the major TeX-related programs, macro packages, and fonts that are free software, including support for many languages around the world.

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

# Add Local Package
We do not support user-requested packages in our module. If you need a package that is not included, please install it locally by following these instructions.

```
module load texlive
mkdir -p ~/texmf/tex/latex
```

The directory structure of `~/texmf/tex/latex` should be the same as

```
ls $EBROOTTEXLIVE/texmf-dist/tex/latex
```

Each package should reside in its own directory. Create a subdirectory for your package under `~/texmf/tex/latex` and copy the `*.sty` file from [ctan.org](http://ctan.org) into the subdirectory. (If the package does not provide a `*.sty`, please follow the installation instructions. Typically, `latex *.dtx` or `latex *.ins` should produce the `*.sty` file.)

Then run:

```
$ texhash ~/texmf
texhash: Updating /home/mst3k/texmf/ls-R...
texhash: Done.
```

You should now be able to use the new package locally.

# `dvipng`

If you encounter this error:
```
FileNotFoundError: [Errno 2] No such file or directory: 'dvipng'
```
please use our `dvipng` container. Go through all the steps in https://hub.docker.com/r/uvarc/dvipng.
