+++
images = [""]
author = "Staff"
description = ""
date = "2019-09-02T15:18:25-05:00"
title = "Changes to `/scratch` September 2019"
draft = false
tags = ["maintenance","storage","scratch"]
categories = ["feature"]
summary = "As part of the September 2019 maintenance for Rivanna, the Research Computing team replaced the `/scratch` file system with new, faster hardware."
+++

{{% callout %}}
As part of the September 2019 maintenance for Rivanna, the Research Computing team replaced the `/scratch` file system with newer hardware.

The Research Computing systems engineers did transfer files that were no older than 90 days to the new system.  If you are missing files, you will be able to retrieve them until the next maintenance (planned for December 2019).

As a reminder, `/scratch` is temporary storage and **files older than 90 days are subject to purging**.
{{% /callout %}}

#  Transferring your files


The path to the old scratch file system is

``` /oldscratch/$USER ```

To transfer your files, we recommend using the `rsync` command within a shell (i.e., Terminal Window).

If you normally use Open on-Demand or JupyterLab, you can open a Terminal Window by

- logging into Open on-Demand (https://rivanna-portal.hpc.virginia.edu);

- clicking on Files > Home Directory ;

- clicking on >_ Open in Terminal


## Transferring a single file
To copy a file from /oldscratch to /scratch, you can type (for example):

> ```
rsync -av /oldscratch/$USER/somefolder/myFile /scratch/$USER/somefolder
```

## Transferring a folder
To copy a folder and its contents from /oldscratch to /scratch, you can type (for example):

> ```
rsync -av /oldscratch/$USER/somefolder/ /scratch/$USER/somefolder
```

Notice the trailing slash at the end of the first `somefolder`, and the lack of a slash at the end of the second `somefolder`.  The placement of the slash is important for how the transfer is done.




# Need Help?

If you have questions or need help with transferring your files, Research Computing will hold a "Clinic on Scratch" on Wednesday, September 18 in Brown Library, room 145 from 3 to 5 pm.  

[<button class="btn btn-success">More about scratch</button>](/userinfo/storage/non-sensitive-data/#scratch)
