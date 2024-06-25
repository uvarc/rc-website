+++
description = ""
title = "MobaXterm"
draft = false
date = "2019-05-28T17:45:12-05:00"
tags = ["hpc","rivanna","supercomputer","login","ssh","mobaxterm","sftp"]
categories = ["userinfo"]
images = [""]
author = "Staff"  
type = "rivanna"

+++

<p class=lead><a href="https://mobaxterm.mobatek.net/">MobaXterm</a> is the recommended login tool for Windows users.  It bundles a tabbed ssh client, a graphical drag-and-drop sftp client, and an X11 window server for Windows, all in one easy-to-use package.  Some other tools included are a simple text editor with syntax coloring and several useful Unix utlities such as cd, ls, grep, and others, so that you can run a lightweight Linux environment on your local machine as well as use it to log in to a remote system.</p>

# Download

To download MobaXterm, click the link below. Select the "Home" version, "Installer" edition, 

[<button class="btn btn-primary">Download MobaXterm</button>](https://mobaxterm.mobatek.net/download-home-edition.html)

Run the installer as directed.

# Connecting

- When you start MobaXterm you can create a new session, restart a saved one, or attach to an existing one. To start a new one, begin with `ssh`. 

    ![alt text](/images/rivanna/mobax-2.png)

- Remember to connect to `login.hpc.virginia.edu` with your Eservices username and password. SSH key authentication is also supported.

- You can prevent premature ssh timeouts by accessing Settings->SSH and making sure the box labeled "SSH keepalive" is checked.

    ![alt text](/images/rivanna/mobax-3.png)

- When you start an ssh session, MobaXterm will automatically start an sftp session with a file browser.  You can double click files on the remote host and they will open if the appropriate application is found on your local computer.

    ![alt text](/images/rivanna/mobax-4.png)

- MobaXterm by default automatically allows X11 to pass through ssh; no special options are required when you log in.  You can run individual X11 (graphical) applications simply by starting them.  Remember to type an ampersand (&) at the end of the command.  For example, to edit a simple text file using gedit, type

    ```gedit &```

    ![alt text](/images/rivanna/mobax-5.png)

- This can be slow, especially off Grounds, so for extensive work with graphical applications you may prefer [FastX](/userinfo/hpc/login/#remote-desktop-access).

- When you are logged in to a Unix system (like the UVA HPC system), MobaXterm will utilize the Unix X11 convention for cut and paste.  Hightlighting text with the left mouse button selects it automatically.  Clicking the middle mouse button pastes it.  If you do not have a middle mouse button or scroll wheel, such as on a laptop, clicking both left and right buttons simultaneously emulates a middle mouse button.

# Access from Off Grounds

{{< off-campus >}}

