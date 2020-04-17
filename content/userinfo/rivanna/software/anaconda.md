+++
title = "Anaconda on Rivanna"
description = ""
author = "SOMRC Staff"
images = [""]
date = "2018-01-18T17:45:12-05:00"
categories = ["userinfo"]
tags = [
    "HPC",
    "software"
]
modulename = "anaconda"
softwarename = "Anaconda"
draft = false
+++

# Overview
Built to complement the rich, open source Python community, the Anaconda platform provides an
enterprise-ready data analytics platform that empowers companies to adopt a modern open data science
analytics architecture.

Rivanna has Python 2 and 3 available as part of the Anaconda 
distribution. Anaconda comes installed with many packages best suited 
for scientific computing, data processing, and data analysis, while making deployment
very simple. Its package manager **conda** installs and updates python packages and 
dependencies, keeping different package versions isolated on a project-by-project basis.
Anaconda is available as open source under the New BSD license. It also ships 
with **pip**, the common python package manager. 

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

# Installing packages 

Packages could be installed via the `pip` or `conda` package managers

## Using `conda` 

Open the bash terminal, and type:

1. `conda search package_name` (search for a package by name)
2. `conda install package_name` (install a package)
3. `conda update package_name --upgrade` (upgrade the package to latest stable version)
4. `conda list` (list all installed packages)

## Using `pip`

Open the bash terminal, and type:

1. `pip search package_name` (search for a package by name)
2. `pip install package_name` (install a package)
3. `pip update package_name --upgrade` (upgrade the package to latest stable version)
4. `pip list` (list all installed packages)

### **Do not upgrade pip**
If you see the following message asking you to upgrade your pip version, it is usually safe to ignore it.
```
You are using pip version x.x.x, however version y.y.y is available.
You should consider upgrading via the 'pip install --upgrade pip' command.
```
Doing so may result in broken dependencies.

(As of 01/10/2020, this error message is suppressed.)

However, if you must upgrade pip, please do so in a virtual environment, as discussed below.

# Running Python2 and Python3 using Virtual Environments

You can specify which version of Python you want to run using conda. This can be done 
on a project-by-project basis, and is part of what is called a "Virtual Environment". 
A Virtual Environment is simply your isolated copy of Python in which you maintain your
own version of files and directories. It enables you to keep other projects unaffected.
With projects that have similar dependencies, you can freely install different versions
of the same package without worry on two different Virtual Environments. In order to jump
between two VE's, you simply activate or deactivate your environment. Follow the steps below:

1. Update Conda:

	`conda update conda` 

2.  Set up your Virtual Environment:

	`conda create -n your_env_name_goes_here` (default Python version: use `conda info` to find out)

	OR 

	`conda create -n your_env_name_goes_here python=version_goes_here` (This command will automatically upgrade pip to the latest version in the environment. To find specific Python versions, use `conda search "^python$"`.)

3. If it asks you for `y/n`, hit `y` to proceed. It will start the installation
4. Activate your newly created environment `source activate your_env_name_goes_here`
5. Install a package in your activated environment

	`conda install -n your_env_name_goes_here your_package_name_goes_here`

	OR 

	`conda install -n your_env_name_goes_here \ your_package_name_goes_here=version_goes_here`

	OR (even better)

	In your home directory or Conda installation folder, create a file called `.condarc` (if not already there)
	Inside the file write the following:
	```
	create_default_packages
		- your_package_name_goes_here
		- your_package_name_goes_here
		- your_package_name_goes_here
		...
	```
	Now everytime you create a new environment, all those packages listed in `.condarc` will be installed.
6. To end the current environment session:
	`source deactivate`
7. Remove an environment:
`conda remove -n your_env_name_goes_here -all`

# More Information
Please visit the official [Anaconda website] (https://www.anaconda.com/distribution/).
