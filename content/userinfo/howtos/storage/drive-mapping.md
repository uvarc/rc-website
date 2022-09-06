+++
type = "howto"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "howto",
  "storage",
]
date = "2020-02-25T08:37:46-05:00"
tags = ["howto","storage","mapping"]
draft = false
shorttitle = "Drive Mapping"
title = "Drive Mapping on Windows or Mac OSX"
description = "Mapping Research Standard or Research Project Storage to your Desktop"
author = "RC Staff"

+++

_Research Standard_ and _Research Project_ storage can be mapped to your Windows or Mac computer as a remote drive.  If you are off Grounds you must be running a VPN, such as the UVA Anywhere or the More Secure VPN from [ITS](https://virginia.service-now.com/its?id=itsweb_kb_article&sys_id=f24e5cdfdb3acb804f32fb671d9619d0).  We recommend the More Secure VPN if that is available to you.

# Windows

* Open a File Explorer page.  In Windows 10 first select *This PC*. This is not necessary for earlier versions of Windows. When you see the *Computer* tab, select that, then select  *Map Network Drive*.
* When the dialog box appears, the default drive letter will be *Z*.  You can change this to any other available letter if you wish.
* In the Folder textbox, type the path you were given when the storage was set up. 
    * For **Research Standard** storage the path starts with `\\qumulo.rc.virginia.edu\` followed by your storage share name, for example `\\qumulo.rc.virginia.edu\mylab-storage`
    * For **Research Project** storage the path starts with `\\qumulo.rc.virginia.edu\` or `\\gpfs.hpc.virginia.edu` followed by your storage share name, for example `\\gpfs.hpc.virginia.edu\mylab-storage`. 
    
* When it asks you to authenticate, use your UVA id (e.g. `mst3k`) and your Eservices password.
* Select *Finish*.
        
{{% callout %}}
Note that you must use backslashes even if the path provided to you used forward slashes.
{{% /callout %}}

If you have `sammas` storage you may have to enter `ESERVICES\mst3k` (with your own user ID) rather than your user ID alone.

---

# Mac OSX

* From the Finder menu, select *Go*->*Go To Folder*->*Connect To Server*.  A dialog box should appear with `smb://` filled in. 
* Type the path you were given.
    * For **Research Standard** storage the path starts with `//qumulo.rc.virginia.edu/` followed by your storage share name, for example `//qumulo.rc.virginia.edu/mylab-storage`
    * For **Research Project** storage the path starts with `//qumulo.rc.virginia.edu/` or `//gpfs.hpc.virginia.edu` followed by your storage share name, for example `smb://gpfs.hpc.virginia.edu/mylab-storage`.  
            
* Enter your Eservices credentials when prompted, then click *Connect*.

{{% callout %}}
Note that for Mac OSX we use forward slashes. 
{{% /callout %}} 

---

# Linux

Special arrangements must be made with Research Computing to export shares to a Linux workstation.

