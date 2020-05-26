+++
type = "rivanna"
categories = [
  "HPC",
  "software",
  "math"
]
date = "2019-06-22T08:37:46-05:00"
tags = [
  "multi-core",
]
draft = false
modulename = "julia"
softwarename = "julia"
title = "Julia on Rivanna"
author = "RC Staff"
+++

# Description
Julia is a high-level programming language designed for high-performance numerical analysis and computational science. Distinctive aspects of Julia's design include a type system with parametric polymorphism and types in a fully dynamic programming language and multiple dispatch as its core programming paradigm. It allows concurrent, parallel and distributed computing, and direct calling of C and Fortran libraries without glue code. A just-in-time compiler that is referred to as "just-ahead-of-time" in the Julia community is used. [Ref: Wikipedia](https://en.wikipedia.org/wiki/Julia_(programming_language))

There are several website resources for Julia.

* [Intro to Julia](https://www.youtube.com/watch?v=4igzy3bGVkQ)
* [Intro to Julia for data science](https://www.youtube.com/watch?v=SLE0vz85Rqo)
* [Julia vs. Python: Which is best for data science?](https://www.infoworld.com/article/3241107/julia-vs-python-which-is-best-for-data-science.html)
* [Julia Language Research and Development at MIT](https://julia.mit.edu/)


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

# Installing Julia Packages

Julia wants to update any existing packages whenever a user tries to add a package. Of course, the basic packages were installed in a system directory that is not writable by the users.

One work-around is to force Julia to see only my local directory the first time that I add a package. For example:
```
> deleteat!(DEPOT_PATH, 2:length(DEPOT_PATH))
> using Pkg
> Pkg.add("Plots")
```
Julia will update the registry only in my local directory, /home/$USER/.julia. After that first time, it should aways default to /home/$USER/.julia – there would be no need to do the `deleteatat!` command after that first time.

This approach can be done either at the Julia prompt or in a Jupyter notebook. The only assumption is that that first path in the DEPOT_PATH list is your local directory.
