+++
description = ""
title = "Open OnDemand: File Explorer"
draft = false
date = "2019-06-28T17:45:12-05:00"
tags = ["hpc","rivanna","parallel-computing","gpu","allocations","queues"]
categories = ["userinfo"]
images = [""]
author = "Staff"
type = "rivanna"

+++

[Open OnDemand](/userinfo/rivanna/ood/overview) provides an integrated file explorer to browse and manage small files. Rivanna has multiple locations to store your files with different limits and policies. Specifically, each user has a relatively small amount of permanent storage in his/her home directory and a large amount of temporary storage ([/scratch](/userinfo/storage/non-sensitive-data/#scratch)) where large data sets can be staged for job processing. Researchers can also lease storage that is accessible on Rivanna. [Contact Research Computing](/support) or visit the [storage website](/userinfo/storage) for more information.

The file explorer provides these basic functions:

+ Renaming of files
+ Viewing of text and small image files
+ Editing text files
+ Downloading & uploading small files

To see the storage locations that you have access to from within Open OnDemand, click on the `Files` menu. The drop-down list will show your Rivanna `/home` directory and possibly other leased storage volumes like `/project` that your group has access to. Clicking on any of them will open a new tab with a file browser for that storage location. The user interface is divided into two panes:

+ The left pane shows the directory tree at the current storage location.
+ The right pane shows the content of a particular directory that has been selected in the left window pane. Above the right window pane are rows of buttons that allow you to execute specific file operations.

# Renaming Files
To rename an existing file or directory, click on it in the right window pane and click the `Rename` button. In the pop-up window, modify the file/directory name and click `OK`.

# Viewing Files
To view existing text and image files (.png, .tif, etc.), select the file in the right window pane and clicking on the `View` button. The file content or image is shown in a pop-up window.

# Editing Files
To edit an existing text file, e.g. source code file or a job script, select the file in the right window pane and click the `Edit` button. The file is opened in a new browser tab labelled as Editor. The editor shows line numbers and supports syntax highlighting for common programming languages (e.g. Python, R, Matlab, XML, markdown, Bash, etc.). A specific syntax highlighting can be chosen under the `Mode` drop-down menu. To save any changes, click on the `Save` button in the top left corner of the Editor tab.

# Opening Files in Terminal
Clicking on the `Open Files in Terminal` button opens a terminal window in a new web browser tab. The current directory is set to the location directory or file that was selected in the File Explorer's left or right window pane.  Note that this terminal is not able to start graphical applications such as the Matlab desktop; for applications such as those you must use [FastX](/userinfo/rivanna/logintools/fastx).

# Navigating to other Storage Locations
To navigate to other file locations on Rivanna, you can use the `Go To` button to enter a specific storage volume and directory path. For example, if you are in your home directory and want to go to your /project directory, enter `/project/` and click `OK`. This will show a list of all project directories including those of other research groups.  You can also enter the full path to your Project storage, e.g. `/project/my-storage`, to go straight to your group's storage. To find out about the full path of all your leased storage locations, run the `hdquota` command in a Rivanna terminal window.

**You can only access project directories associated with your leased storage and MyGroup.**

# File Transfer
The Open OnDemand file explorer should only be used to transfer small files such as your source code and job scripts.

## File Upload to Rivanna
To upload files from your current workstation (i.e. the computer that the web browser runs on) to Rivanna, choose the directory on Rivanna to which the files should be uploaded. Then click on the `Upload` button at the top of the File Explorer window. This will produce a small pop-up window with a `Choose Files` button. Clicking the `Choose Files` button opens a file browser window showing the storage locations accessible on your local workstation.  Select a single file or multiple files and click the `Choose` or `OK` button. This will initiate the file transfer and close the file browser window on your local workstation. The uploaded files will appear as new or updated files in the current directory shown in the right pane of the Open OnDemand File Explorer.

## File Download from Rivanna
To download files from Rivanna to your local workstation, select the files or directories from download in the main (right) window pane of the Open OnDemand File Explorer and click the `Download` button. The selected files and directories are immediately downloaded in the usual way depending on your Web browser; typically it will copy the files to your Download directory.

## Alternative File Transfer Tools
Large files (> 2GB) should be transferred with scp/sftp either from a standard shell or from an application such as MobaXterm (Windows), or Cyberduck or Filezilla (Windows, Mac, Linux), or via the [Globus transfer tool](https://www.globus.org). Globus is a browser-based file transfer tool optimized for fast, fault-tolerant file transfers that run in the background once started. To use Globus with Rivanna please follow the instructions at our [Globus documentation](/userinfo/globus) page.
