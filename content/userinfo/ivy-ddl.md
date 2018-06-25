+++
title = "Ivy Domino Data Lab (DDL) Quick Start"
draft = false
tags = ["R","python", "Ivy", "Domino", "DDL"]
date = "2017-05-01T12:35:54-04:00"
categories = ["userinfo"]
images = [""]
author = "SOMRC Staff"
description = ""

+++

<p class=lead><a href = "https://www.dominodatalab.com/">Domino Data Lab (DDL)</a> provides a central environment and features for data science projects including project management, collaboration with team members, and setting up hardware configuration for a project.</p>

- - -

# Account Request

Access to DDL to Ivy is managed through the [Ivy account request process](https://somrc.virginia.edu/userinfo/ivy/#requesting-access). Accounts are issued on a per project basis, with PIs (and any project members) being granted individual accounts to log into the DDL platform. 

Once the request has been approved and all associated members have completed the necessary documentation, each individual project member can sign into DDL with his / her UVa Eservices user name and password. 

- - -

# Project Structure

DDL is organized into projects, which automatically provision a folder hierarchy to store code, data, and output. Users can create new projects, and can also invite other Ivy DDL users to collaboratively view, edit, or run files in an existing project. 

Collaborators can "fork" (copy the contents of) projects, leave comments, and use built-in version control utilities to store / revert changes to files as necessary.

## Uploading Files

To upload a script, dataset or other file, users can navigate to a project and select the "files" menu item. DDL includes a drag-and-drop interface for uploading files less than 550 MB.

To upload files larger that 550 MB refer to the following:

- [How do I upload large files to Domino Data Lab through the CLI?](https://discuss.rc.virginia.edu/t/how-do-i-upload-large-files-to-domino-data-lab-through-the-cli/74)

- - -

# Running Code

## Runs

The DDL platform allows users to run Python and R scripts that have been either uploaded to a project or written in one of the DDL editors or notebooks. To issue a run, navigate to the file you would like to execute and click `Run`. Alternatively you can can use the `Runs` window to start a run by entering the filename. 

Note that if code is associated with data, it should be written relative to the location of that dataset in the project directory. 

## Notebooks

In addition to scheduling and executing scripts that have been uploaded, DDL provides an interactive notebook session feature. 

Available notebooks include:

- [RStudio](https://www.rstudio.com/products/rstudio/)
- [Jupyter](http://jupyter.org/)

Scripts and data generated in an interactive notebook session can be saved ("synced") to the DDL project from which they were initiated. 

- - -

# Compute Environments

## Choosing a Base Environment

Depending on what analysis tools (i.e. R or Python) you plan on using, you may need to adjust the default computing environment. For example, if your code is written to run with Python 2.x (and not Python 3.x), you can choose a base environment that uses that version. Note that these configurations are on a per project basis, and can managed by visiting **Settings >> Compute environment**.

## Installing Packages

Each compute environment comes with a number of popular packages / modules pre-installed. 
Users are able to install additional packages as necessary via standard package management tools.

For specifics related to R or Python package installation refer to the following:

- [How do I install R packages on Ivy DDL?](https://discuss.rc.virginia.edu/t/how-do-i-install-r-packages-on-ivy-ddl/393)
- [Installing Python Modules on Ivy DDL](https://discuss.rc.virginia.edu/t/installing-python-modules-on-ivy-ddl/382)

## Selecting Hardware Tiers

Ivy DDL currently has a single hardware tier available. This tier is selected by default and currently is the only option available on Ivy DDL.

<table class="table table-sm" style="width:50%;border:solid 1px #ccc;margin-left:4rem;">
  <thead class="thead-inverse">
    <tr>
      <th>Type</th>
      <th>CPU</th>
      <th>Memory</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Free</td>
      <td>18 cores</td>
      <td>120GB</td>
    </tr>
  </tbody>
</table>

In the future additional tiers may be specified; to specify the tier you would like to use, navigate to **Settings >> Hardware tier**.

- - -

# More Features

DDL includes a number of additional features. Use the resources below to find specific topics:

[<button class="btn btn-success">Ivy DDL FAQ</button>](https://discuss.rc.virginia.edu/c/ivy/ddl)
[<button class="btn btn-success">General DDL Support Articles</button>](https://support.dominodatalab.com/)

Please note that because Ivy is designed to be a secure environment, certain DDL features are **not** available in Ivy DDL. Examples include the following:

- [Github integration](https://support.dominodatalab.com/hc/en-us/articles/115000148846-Adding-a-Git-repository-to-a-Domino-Project)
- Email notifications
