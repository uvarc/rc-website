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

DDL is organized into projects, which automatically provision a folder hierarchy to store your code, data, and output. Individuals are able to create new projects, and can also invite other Ivy DDL users to collaboratively view, edit, or run files in an existing project. 

Collaborators can "fork" (copy the contents of) projects, leave comments, and use built-in version control utilities to store / revert changes to files as necessary.

## Uploading Files

To upload a script, dataset or other file, users can navigate to a project and select the "files" menu item. DDL includes a drag-and-drop interface for uploading files less than 550 MB.

<img class="img-fluid" src="/images/ivyddl_uploadfiles.png" alt="Uploading files via Domino Data Lab web interface" align="center">

## Running code

The DDL platform allows users to run Python and R scripts. To issue a run, navigate to the file you would like to execute and click `Run`. Alternatively you can can use the `Runs` window to start a run by entering the filename. Note that if code is associated with data, it should be written relative to the location of that dataset in the project directory. 

## Scheduling Jobs

## Using Notebook Sessions

In addition to scheduling and executing scripts that have been uploaded, DDL provides an interactive notebook session feature. 

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

## Installing Packages

# Troubleshooting 

## Uploading Large files (> 550 MB)

## Identifying Resource Usage Issues

DDL includes an interactive dashboard for viewing CPU and memory usage per run within a given project. This can be especially helpful for diagnosing performance issues in your code. To access this feature, navigate to `Runs`, select a run and view the resource usage tab.

<img class="img-fluid" src="/images/ivyddl_resourceusage.png" alt="Resource usage on Domino Data Lab session" align="center">

## Updating Existing Packages
