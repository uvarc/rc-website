+++
images = [""]
author = "Staff"
description = ""
date = "2023-10-23T00:00:00-05:00"
title = "Rivanna Maintenance: December 18, 2023"
# url = "/maintenance"
draft = false
tags = ["rivanna"]
categories = ["feature"]
+++

{{< alert-green >}}Rivanna will be down for maintenance on <strong>Monday, December 18, 2023</strong> beginning at 6 a.m.{{< /alert-green >}}

You may continue to submit jobs until the maintenance period begins, but if the system determines your job will not have time to finish, it will not start until Rivanna is returned to service.

All systems are expected to return to service by **6 a.m. on Tuesday, December 19**.

## IMPORTANT MAINTENANCE NOTES

The operating system will be upgraded to Rocky 8.7 with system glibc 2.28 and GCC 8.5.0. Due to fundamental changes in system libraries, the entire software stack is rebuilt. **Users should rebuild all self-compiled codes and R packages.** Starting Nov 21, users who want early access to the development environment to rebuild/test codes against the new software stack can log in by running `ssh udc-ba33-36` on the frontend. (Please be sure not to overwrite your existing codes for the production environment.) Contact us [here](https://www.rc.virginia.edu/form/support-request/) if you need assistance.

### Modules

1. Compilers and toolchains have been consolidated to the following:
    - GCC: `gcc/11.4.0`, `goolf/11.4.0_4.1.4` 
    - Intel: `intel/2023.1` (default), `intel/2024.0` (experimental), `intel/18.0` (legacy)
    - NVIDIA: `nvhpc/23.7`, `nvompi/23.7_4.1.5`

1. Singularity has been renamed to Apptainer. Load the `apptainer/1.2.2` module for containers. (The `singularity` command is provided as an alias.) All users can now build containers directly on Rivanna; see [here](/userinfo/hpc/software/apptainer) for details.

1. There are many module version upgrades and deprecation of older versions. Run `module spider NAME` to check the available versions and the corresponding load command. Contact us [here](https://www.rc.virginia.edu/form/support-request/) if you need a different version. Only the most important changes are listed below:

{{< table title="Replacements" class="table table-striped" >}}
|Name       |Default version|Other versions|Removed|
|---|---|---|---|
|OOD JupyterLab | 3.6.3  | - | 2.2.9 |
|OOD RStudio Server | 2023.06.2 | - | 1.0.143, 1.1.463, 1.3.1073, 2023.03.0 |
|anaconda   |2023.07-py3.11 | - | 2019.10-py2.7, 2020.11-py3.8|
|clang      |15.0.7  | - | 10.0.1 |
|cuda       |12.2.2  |10.2.89, 11.4.2| 10.1.168, 11.0.228 |
|gcc        |11.4.0  | - | 7.1.0, 9.2.0, 11.2.0 |
|go         |1.21.4  | - | 1.18.4, 1.19.4 |
|intel      |2023.1  | 18.0, 2024.0 | 20.0, 2022.11 |
|julia      |1.9.2   | - | 1.5.3, 1.6.0 |
|llvm       |15.0.7  | - | 4.0.0 |
|netcdf     |4.9.2   | - | 4.6.2, 4.7.3, 4.7.4 |
|nvhpc      |23.7    | - | 21.9 |
|perl       |5.36.0  | - | 5.24.0 |
|python     |3.11.4  | 2.7.18, 3.9.16 | 2.7.16, 3.6.6, 3.6.8, 3.7.7, 3.8.8 |
|pytorch    |2.0.1   | 1.12.0 | 1.8.1 |
|R          |4.3.1   | - | 3.5.3, 3.6.3, 4.0.3, 4.1.1, 4.2.1 |
|ruby       |3.1.2   | - | 2.3.4 |
|rust       |1.66.1  | - | 1.38.0, 1.41.0 |
|spark      |3.4.1   | - | 3.1.2 |
|tensorflow |2.13.0  | - | 2.7.0, 2.10.0 |
|texlive    |2023    | - | 2020  |
{{< /table >}}

#### Special reminders

- **C/C++/Fortran** users who must build code with GCC 7 or older should containerize the application starting with the [official GCC base image](https://hub.docker.com/_/gcc). Contact us if you need assistance.
- **Intel 18.0** modules are either migrated to the newer version (2023.1) or dropped. Intel users should rebuild code with `intel/2023.1` if possible.
- **RStudio Server** is now backed by a native module with R as a dependency. R packages installed via the `R` module will be detected automatically in RStudio Server, and vice versa. **All R packages will need to be rebuilt.**
- **Python 2.7**-dependent modules are completely removed from the software stack. Users of legacy Python code can create a custom environment using the `anaconda` or `mamba` (recommended) module.
- **Code Server** is backed by a native module instead of a container. This allows usage of compilers and interpreters on Rivanna. Python users please see instructions [here](https://www.rc.virginia.edu/userinfo/hpc/software/code-server/#python-setup).
- **Mamba** is separated from `anaconda` into its own module.
- **Java** module versions are standardized to 7, 8, 11, 12 (previously 1.7.0, etc.).

#### Rebuilding R Libraries

Due to changes in the operating system and compilers on Rivanna, your existing R libraries will not work. We have created a command that will help you to rebuild your library for the new version of R.
The command is ```updateRlib``` and requires two pieces of information:

i) How you run your R code

ii) The version of R that you have been using.


For example, if you have been using with RStudio 1.3.1073 - R 4.1.1, you can type:
```updateRlib OOD 4.1.1```
This command will capture your packages that were used in your R/4.1 library for Open OnDemand and rebuild to a new library.
The three options for how you run your code are: OOD, goolf, or intel. Rebuilt libraries will be installed in ```~/R/goolf/4.3``` for both module and OOD versions.
