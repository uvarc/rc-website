+++
description = ""
title = "Logging In"
draft = false
date = "2019-05-28T17:45:12-05:00"
tags = ["hpc","rivanna","supercomputer","login","ssh","openondemand"]
categories = ["userinfo"]
images = [""]
author = "Staff"  
type = "rivanna"

+++

<p class=lead>Rivanna is accessible through a web portal, secure shell terminals, or a remote desktop environment.  For of all of these access points, your login is your UVA computing ID and your password is your Eservices password.  If you do not know your Eservices password you must change it through ITS.</p>

{{< off-campus >}}

# Web-based Access

<img alt="OpenOnDemand" src="/images/ood.png" align="right" style="max-width:30%;">
Open OnDemand is a graphical user interface that allows access to Rivanna via a web browser.  The Open OnDemand access point is rivanna-portal.hpc.virginia.edu.  Within the Open OnDemand environment users have access to a file explorer; interactive applications like JupyterLab, RStudio Server & FastX Web; a command line interface; and a job composer and job monitor to submit jobs to the Rivanna cluster.  Detailed instructions can be found on our [Open OnDemand documentation](/userinfo/rivanna/ood/overview) page.

[<button class="btn btn-primary">Launch Open OnDemand</button>](https://rivanna-portal.hpc.virginia.edu/)

- - -

# Secure Shell Access (SSH)

Rivanna is accessible through `ssh` (Secure Shell) connections using the hostname `rivanna.hpc.virginia.edu`.

## <i class="fab fa-windows fa-1x"></i> Windows

Windows users must install an ssh client application. We recommend [MobaXterm](/userinfo/rivanna/mobaxterm/), but you may also use other clients such as [SecureCRT](https://www.vandyke.com/products/securecrt/) or [PuTTY](https://www.putty.org/).

[<button class="btn btn-primary">Install MobaXterm</button>](/userinfo/rivanna/mobaxterm/)

## <i class="fab fa-apple fa-1x"></i> Mac OSX and Linux

OSX and Linux users may connect through a terminal using the command

```
ssh -Y mst3k@rivanna.hpc.virginia.edu  
```

[SSH key authentication](https://discuss.rc.virginia.edu/t/ssh-key-authentication/200) is also permissible. Mac users must install XQuartz in order to be able to run graphical (X11) applications.  Keep in mind that graphical X11 applications may be slow through a standard ssh login.  For extensive use of graphical applications you may prefer the FastX remote desktop environment.

For more details and for troubleshooting information, please see our ssh page.

- - -

# Remote Desktop Access

Users who wish to run X11 graphical applications may prefer the FastX remote desktop web interface.  The FastX web client is accessible at `rivanna-desktop.hpc.virginia.edu`. Your login credentials are your UVA computing ID and your Eservices password.

[<button class="btn btn-primary">Connect to FastX via Web</button>](https://rivanna-gpu.hpc.virginia.edu:8000/auth/ssh)

Additional FastX documentation can be found [here](/userinfo/rivanna/logintools/fastx/).
