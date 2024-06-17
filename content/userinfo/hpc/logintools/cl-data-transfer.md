+++
date = "2022-02-14T11:45:12-05:00"
tags = [
        "data-transfer",
        "sftp"
        ]
categories = ["userinfo"]
images = [""]
author = "Staff"
description = ""
title = "Command Line Data Transfer"
draft = false
+++

<p class="lead">Standard Linux tools can efficiently transfer a small to moderate quantity of data to or from Rivanna.</p>

- - -

# `scp`

`scp` uses the secure shell (SSH) protocol to transfer files between your local machine and a remote host, or between two remote hosts.

The following syntax enables copying from local to remote or vice versa. In both cases we are starting from the _local_ system.  
By default, `scp` works from the level of the directory in which it is invoked.

- Copying from local to remote: `scp source_file mst3k@hostaddress:target_file`
- Copying from remote to local: `scp mst3k@hostaddress:source_file target_file`

The following examples detail how to transfer data between your local computer and /project storage on Rivanna. In these examples

- `my_file` is the file you would like to transfer
- `mst3k` is your computing ID
- `mygroup_name` is the name of your `/project` directory.
- `my_directory` is the directory to which you wish to copy the file.

## To copy a file

From your computer to `/project` storage:

```
scp my_file mst3k@login.hpc.virginia.edu:/project/mygroup_name
```

From `/project` storage to `my_directory` on your computer:

```
scp mst3k@login.hpc.virginia.edu:/project/mygroup_name/my_file /my_directory
```

`scp` accepts wildcards.  In this example, the mycode directory must exist in your scratch directory.

```
scp *cxx mst3k@login.hpc.virginia.edu:/scratch/mst3k/mycode
```

## `scp` Options

The `-r` option recursively copies directories.

From your computer to /project storage:

```
scp -r my_directory mst3k@login.hpc.virginia.edu:/project/mygroup_name
```

From `/project` storage to your computer:

```
scp -r mst3k@login.hpc.virginia.edu:/project/mygroup_name /target_directory
```

The `-p` option preserves modification time, access time, and ownership from the original file.

The `-q` option suppresses the progress and debugging messages. Useful for scripts.

# `sftp`

Secure FTP or `sfpt` is an interface built on top of `scp` to mimic the behavior of `ftp`.

To connect to Rivanna with `sftp`, execute the following in the command line interface:

```
sftp mst3k@login.hpc.virginia.edu
```

When prompted, enter your password. Once the connection succeeds, you will see the `sftp` prompt:

```
sftp>
```

## Navigating Directories

You can access both your local and remote file systems with `sftp`. The following table lists how to execute the following commands for both your local and remote systems.

| Action                    |On Remote System  | On Local System |
| :-------                  |:----------:      |   :-----:       |
|Print Working Directory    |    pwd           |     lpwd        |
|List Contents of Directory |    ls            |     lls         |
|Change Directory           |    cd            |     lcd         |

## File Transfer from Local to Remote

To transfer files from your computer to the Rivanna file system, use the put command:

```
sftp> put my_file
```

To transfer a folder from your computer to Rivanna, use `put -r`. A folder with the same name must also exist on Rivanna. An example is shown below:

```
sftp> mkdir /project/mygroup_name/my_folder
sftp> cd /project/mygroup_name
sftp> put -r my_folder
```

## File Transfer from Remote to Local

To transfer files from Rivanna to your computer, use the get command:

```
sftp> get my_file
```

To transfer a folder from Rivanna to your computer, use `get -r`:

```
sftp> get my_folder
```

## Terminating the Connection

To terminate the `sftp` connection, use `exit`.

```
sftp> exit
```

# `rsync`

Remote sync is a powerful tool for copying files.  It is most widely used to transfer multiple files and/or directories.

In this example, we have a local directory `ldir` and a remote directory `rdir` and we wish to copy the contents of ldir to rdir. 

```
rsync -r ldir/ mst3k@login.hpc.virginia.edu:rdir
```

The trailing `/` after ldir is important.  Without it, ldir and its contents would be placed under `rdir`.

Unlike `scp`, if the target directory does not exist, `rsync` will create it.  

It is more common to use the `-a` (archive) option.  This option preserves symbolic links, special files, ownership, permissions, and timestamps.

```
rsync -a ldir/ mst3k@login.hpc.virginia.edu:rdir
```

Show a progress bar and keep partially transferred files

```
rsync -Pa ldir/ mst3k@login.hpc.virginia.edu:rdir
```

Delete files not present on the source directory if they are present on the target directory

```
rsync -Pa --delete ldir/ mst3k@login.hpc.virginia.edu:rdir
```

Have rsync print the list it will transfer without carrying out the tranfers.  Especially important when using `--delete`.

```
rsync -Pa --delete --dry-run ldir/ mst3k@login.hpc.virginia.edu:rdir
```

# AWS CLI

The AWS Command Line Interface (CLI) is a unified tool to manage your AWS services, including data transfer.

[Learn more about the AWS CLI tools](/userinfo/howtos/storage/aws-s3/).

# Globus CLI

The Globus command-line interface can also be used to orchestrate the transfer of large datasets, or to script regular transfers in or out of systems.

[Read more](/userinfo/howtos/storage/globus-cli/) about the Globus CLI.

# Usage from Off Grounds

{{< off-campus >}}

