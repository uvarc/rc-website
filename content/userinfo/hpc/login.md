+++
description = ""
title = "Logging in to the UVA HPC systems"
draft = false
date = "2019-05-28T17:45:12-05:00"
tags = ["hpc","rivanna","supercomputer","login","ssh","openondemand"]
categories = ["userinfo"]
images = [""]
author = "Staff"  
type = "rivanna"

+++

<p class=lead>The UVA HPC systems (Rivanna and Afton) are accessible through a web portal, secure shell terminals, or a remote desktop environment.  For of all of these access points, your login is your UVA computing ID and your password is your Eservices password.  If you do not know your Eservices password you must change it through ITS.</p>

{{< off-campus >}}

# Web-based Access

<img alt="OpenOnDemand" src="/images/ood.png" align="right" style="max-width:30%;">

Open OnDemand is a graphical user interface that allows access to HPC via a web browser.  The Open OnDemand access point is ood.hpc.virginia.edu.  Within the Open OnDemand environment users have access to a file explorer; interactive applications like JupyterLab, RStudio Server & FastX Web; a command line interface; and a job composer and job monitor to submit jobs to the Rivanna and Afton clusters.  Detailed instructions can be found on our [Open OnDemand documentation](/userinfo/hpc/ood/overview) page.

[<button class="btn btn-primary">Launch Open OnDemand</button>](https://ood.hpc.virginia.edu/)
[<button class="btn btn-primary">Learn more about Open OnDemand</button>](/userinfo/hpc/ood/overview/)
- - -

# Secure Shell Access (SSH)

UVA HPC is accessible through **ssh** (Secure Shell) connections using the hostname `login.hpc.virginia.edu`.

## <i class="fab fa-windows fa-1x"></i> Windows

Windows users must install an ssh client application. We recommend [MobaXterm](/userinfo/hpc/logintools/mobaxterm/), but you may also use other clients such as [PuTTY](https://www.putty.org/).

[<button class="btn btn-primary">Install MobaXterm</button>](/userinfo/hpc/logintools/mobaxterm/)

## <i class="fab fa-apple fa-1x"></i> Mac OSX and Linux

OSX and Linux users may connect through a terminal using the command

```
ssh -Y mst3k@login.hpc.virginia.edu  
```

[SSH key authentication](/userinfo/hpc/logintools/rivanna-ssh) is also permissible. 

## <i class="fas fa-terminal"></i> Using X11 Applications with `ssh`

X11 applications can be run via an `ssh` connection as long as it is configured correctly.  The `-Y` option specifies this for the command-line application run in a terminal.

Windows users who install MobaXterm do not need to add `-Y` in an `ssh` session since this is the default for MobaXterm.  Other clients such as PuTTY must be configured to allow X11 packets to be transferred. 

Mac users must install [XQuartz](https://xquartz.org) in order to be able to run graphical (X11) applications locally.  

Graphical X11 applications may be slow through a standard `ssh` login. For extensive use of graphical applications we recommend [FastX](/userinfo/hpc/logintools/fastx).

For more details and for troubleshooting information, please see our [`ssh`](/userinfo/hpc/logintools/rivanna-ssh) page.

- - -

# Remote Desktop Access

Users who wish to run X11 graphical applications may prefer the [FastX](/userinfo/hpc/logintools/fastx) remote desktop web interface.  The FastX web client is accessible at `fastx.hpc.virginia.edu`. Your login credentials are your UVA computing ID and your Eservices password.

[<button class="btn btn-primary">Connect to FastX via Web</button>](https://fastx.hpc.virginia.edu:8000/auth/ssh)
[<button class="btn btn-primary">Learn more about FastX Web</button>](/userinfo/hpc/logintools/fastx/)
