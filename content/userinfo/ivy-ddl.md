+++
title = "Ivy Domino Data Lab User Guide"
draft = false
tags = ["R","python", "Ivy", "Domino", "DDL"]
date = "2017-05-01T12:35:54-04:00"
categories = ["userinfo"]
images = [""]
author = "SOMRC Staff"
description = ""

+++

# Features

## Project Structure

DDL is organized into projects, which automatically provision a folder hierarchy to store your code, data, and output. Users can create new projects, and can also invite other Ivy DDL users to collaboratively view, edit, or run files in an existing project. 

Collaborators can "fork" (copy the contents of) projects, leave comments, and use built-in version control utilities to store / revert changes to files as necessary.

## Uploading Files

To upload a script, dataset or other file, users can navigate to a project and select the "files" menu item. DDL includes a drag-and-drop interface for uploading files less than 550 MB.

<img class="img-fluid" src="/images/ivyddl_uploadfiles.png" alt="Uploading files via Domino Data Lab web interface" align="center">

## Running code

The DDL platform allows users to run Python and R scripts. To issue a run, navigate to the file you would like to execute and click `Run`. Alternatively you can can use the `Runs` window to start a run by entering the filename. Note that if code is associated with data, it should be written relative to the location of that dataset in the project directory. 

## Using Notebook Sessions

In addition to scheduling and executing scripts that have been uploaded, DDL provides an interactive notebook session feature. 

Available notebooks include:

- [RStudio](https://www.rstudio.com/products/rstudio/)
- [Jupyter](http://jupyter.org/)

Scripts and data generated in an interactive notebook session can be saved ("synced") to the DDL project from which they were initiated. To do so, click on the DDL icon on the right side of the screen.

<img class="img-fluid" src="/images/ivyddl_notebooksync.png" alt="Syncing notebook session contents with DDL project" align="center">


## Selecting Hardware Tiers

Ivy DDL includes several tiers of hardware to choose from. 

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
      <td>1 core</td>
      <td>6GB</td>
    </tr>
    <tr>
      <td>Medium</td>
      <td>4 cores</td>
      <td>16GB</td>
    </tr>
    <tr>
      <td>Dedicated</td>
      <td>20 cores</td>
      <td>120GB</td>
    </tr>
  </tbody>
</table>

To specify the tier you would like to use, navigate to the project settings:

<img class="img-fluid" src="/images/ivyddl_hardwaretier.png" alt="Selecting a hardware tier for a Domino Data Lab project on Ivy" align="center">

## Using the Command Line Interface (CLI)

Domino Data Lab (DDL) on Ivy is equipped with a command line interface (CLI) tool. This can be especially helpful for syncing local files, uploading large datasets (> 500 mb) and efficiently interacting with projects outside of the graphical environment.

To install and configure the CLI:

1. Download and run the CLI installer appropriate for your computer's operating system

	- [Mac](https://app.dominodatalab.com/download/client/mac)
	- [Windows](https://app.dominodatalab.com/download/client/win) 
	- [Linux/Unix](https://app.dominodatalab.com/download/client/unix)

2. Once the CLI software is installed, open a terminal and run:

`domino login https://domino.hpc.virginia.edu`

3. You will be prompted for your Domino account user name and password, which is your Eservices credentials

4. After logging in you'll be returned to your console prompt in your terminal, but from there will be able to use the DDL CLI to:
	
	- [upload](https://somrc.virginia.edu/userinfo/ivy-ddl/#uploading-large-files-550-mb) / download files
	- run jobs
	- create a new project
	
For more information on use-cases for the DDL CLI visit the [Domino use cases documentation](https://support.dominodatalab.com/hc/en-us/articles/204842905--How-to-CLI-reference).

## Installing Packages

# Troubleshooting 

## Uploading Large files (> 550 MB)

Ivy DDL prevents files larger than 550 MB from being uploaded through the web interface. However, if you need to upload large files, you can use the DDL command line interface (CLI).

Once [logged into the DDL CLI](https://somrc.virginia.edu/userinfo/ivy-ddl/#using-the-command-line-interface-cli), you are able to upload and download files to and from your project. 

To sync files between `domino.hpc.virginia.edu` and a directory on your local computer, you must first initiate that folder as a Domino project:

`domino init`

From there, to upload the entire contents of that folder on your local computer to DDL use:

`domino upload`

You can upload an individual file by specifying the file name as follows:

`domino upload file.txt`

Note that if the DDL project includes files or revisions that are not present on your local computer, you will need to synchronize with `domino download` (download all changes *from* DDL *to* your local machine) or `domino sync` (download all changes *from* DDL *to* your local machine AND upload all changes *from* your local machine *to* DDL).

<img class="img-fluid" src="/images/ivyddl_clisync.png" alt="Synchronizing changes with Ivy DDL command line interface" align="center">

## Identifying Resource Usage Issues

DDL includes an interactive dashboard for viewing CPU and memory usage per run within a given project. This can be especially helpful for diagnosing performance issues in your code. To access this feature, navigate to `Runs`, select a run and view the resource usage tab.

<img class="img-fluid" src="/images/ivyddl_resourceusage.png" alt="Resource usage on Domino Data Lab session" align="center">