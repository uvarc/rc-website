+++
type = "howto"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "howto",
  "storage",
]
date = "2022-09-06T08:37:46-05:00"
tags = ["howto","storage","mapping"]
draft = false
shorttitle = "Drive Mapping"
title = "Drive Mapping on Windows or Mac OSX"
description = "Mapping Research Standard or Research Project Storage to your Desktop"
author = "RC Staff"

+++

_Research Standard_ and _Research Project_ storage can be mapped to your Windows or Mac computer as a remote drive.  If you are off Grounds you must be running a VPN, such as the UVA Anywhere or the More Secure VPN from [ITS](https://virginia.service-now.com/its?id=itsweb_kb_article&sys_id=f24e5cdfdb3acb804f32fb671d9619d0).  We recommend the More Secure VPN if that is available to you.

# Windows

* Open a File Explorer page.  In the left column, right click on *This PC*.  In the drop-down box that appears, look for the *Map Network Drive* option. If you do not see this option, click on *Show more Options*, and then click on *Map network drive...*. 
* When the *Map Network Drive* dialog box appears, select a letter for the drive.This will be the location on your PC where you will be able to access your storage.
* Also in the *Map Network Drive* dialog box, type the path for your storage location in the Folder field. 
    * For **Research Standard** storage, the path starts with `\\standard.hpc.virginia.edu\` followed by your storage share name, for example `\\standard.hpc.virginia.edu\mylab-storage`
      * If you have `ceph` storage (`standard.hpc.virginia.edu`) you may have to enter `ESERVICES\mst3k` (with your own user ID) rather than your user ID alone.
    * For **Research Project** storage, the path starts with `\\project.hpc.virginia.edu` followed by your storage share name, for example `\\project.hpc.virginia.edu\mylab-storage`. 
    
* If you want the mapped drive to remain after a shut-down or reboot, check the box for *Reconnect at sign-in*
* If your laptop does not use you UVA ID and password for logging in, check the box for *Connect using different credentials*.  When it asks you to authenticate, use your UVA id (e.g. `mst3k`) and your Eservices password.
* Select *Finish*.
        
{{% callout %}}
Note that you must use backslashes even if the path provided to you used forward slashes.
{{% /callout %}}


---

# Mac OSX

* From the Finder menu, select *Go*->*Go To Folder*->*Connect To Server*.  A dialog box should appear with `smb://` filled in. 
* Type the path you were given.
    * For **Research Standard** storage the path starts with `//standard.hpc.virginia.edu/` followed by your storage share name, for example `smb://standard.hpc.virginia.edu/mylab-storage`
    * For **Research Project** storage the path starts with `//project.hpc.virginia.edu` followed by your storage share name, for example `smb://project.hpc.virginia.edu/mylab-storage`.  
            
* Enter your Eservices credentials when prompted, then click *Connect*.

{{% callout %}}
Note that for Mac OSX we use forward slashes. 
{{% /callout %}} 

---

# Linux

Special arrangements must be made with Research Computing to export shares to a Linux workstation.

