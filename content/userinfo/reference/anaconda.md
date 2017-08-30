+++
author = "SOMRC Staff"
description = ""
title = "Anaconda (Python)"
draft = true
date = "2017-03-01T15:28:51-05:00"
tags = ["anaconda","python"]
categories = ["reference"]
images = [""]
type = "reference"
project = "Anaconda Home"
projecturl = "https://docs.continuum.io/"
+++

{{< define "Anaconda" "Anaconda is a distribution of Python geared toward data science. It includes a package manager, environment manager, and over 700 supplementary packages. Within the Ivy Secure Environment, Anaconda is available on both Linux and Windows VMs." >}}

# Basic Usage

For both Linux and Windows VMs, both Anaconda 2 and 3 are installed.

For **Linux** users in Ivy, run Python in one of two ways:

    /opt/anaconda2/bin/python2.7   # Ver 2.7
    /opt/anaconda3/bin/python3.5   # Ver 3.5

For **Windows** users in Ivy, 

- - -

# Installing packages

A full mirror of the Anaconda package repository is available to Ivy users. To browse packages, see the [Anaconda package list](https://docs.continuum.io/anaconda/pkg-docs).

Packages can be installed using the `conda` utility that ships with Anaconda:

    # General format
    /opt/anaconda2/bin/conda install <package-name>
    
    # Real examples
    /opt/anaconda2/bin/conda install pyyaml
    /opt/anaconda2/bin/conda install simplejson

To make this command simpler, depending upon the version of Anaconda you prefer, add an alias to your `.bashrc` file:

    alias conda='/opt/anaconda2/bin/conda'  # For Anaconda2
    alias conda='/opt/anaconda3/bin/conda'  # For Anaconda3

[See below](#confusion-about-python-versions) for more information about `.bashrc`.

- - -

# Confusion about Python versions

The following versions of Python are available in Ivy's Linux VMs:

    /usr/bin/python2.6
    /usr/bin/python 
    /usr/lib/python2.6 
    /usr/lib64/python2.6 
    /opt/anaconda2/bin/python2.7 
    /opt/anaconda2/bin/python 
    /opt/anaconda3/bin/python3.5 
    /opt/anaconda3/bin/python 
    /opt/anaconda3/bin/python3.5m 

This means at least three versions of Python are available to you: 2.6, 2.7, and 3.5. If your code
has specific requirements for a Python version (usually there are differences in how you write against
2.x versus 3.x) find the version that suits your needs.

In order to run a Python script against a specific version, simply declare the path at the head of your
script with a "shebang" like this:

    #!/opt/anaconda2/bin/python2.7

Then be sure to `chmod 755 myscript.py` to make it executable. Run your script with `./myscript.py` and your it will 
execute against the specified version of Python.

In order to make a specific choice of Python more convenient when you are writing and executing code in the console, 
you may want to edit your `~/.bashrc` file and add an alias like this. While you're there, set an alias for `conda` too:

    alias python='/opt/anaconda2/bin/python2.7'   # set a new default ver of Python
    alias conda='/opt/anaconda2/bin/conda'        # conda for Anaconda2

Finally, issue a `source ~/.bashrc` command to re-read your file to the session, and test with `python -V`. 
Subsequent logins will use the new value as well.
