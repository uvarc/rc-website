+++
description = ""
title = "FastX Web Portal"
draft = false
date = "2019-06-28T17:45:12-05:00"
tags = ["hpc","rivanna","parallel-computing","gpu","allocations","queues"]
categories = ["userinfo"]
images = [""]
author = "Staff" 
type = "rivanna"

+++

# Overview
FastX is a commercial solution that enables users to start an X11 desktop environment on a remote system. It is available on the Rivanna frontends. Using it is equivalent to logging in at the console of the frontend.

# Using FastX for the Web
We recommend that most users access FastX through its Web interface. To connect, point a browser to:

[<button class="btn btn-success">https://fastx.hpc.virginia.edu</button>](https://fastx.hpc.virginia.edu)

{{< off-campus >}}

---

# Login Screen

<img src="/images/rivanna/fastxweb-login.png" alt="FastX Web Login" class="project-inset" style="float:center;max-width:100%;" />

After entering your computing ID and Netbadge password, you will see a launch screen.

---
# Launch
In this example, we have no pre-existing sessions so we must create one. Click the `Launch Session` button. This will bring up a screen showing the options.

<img src="/images/rivanna/fastxweb-launch.png" alt="FastX Web Launch" class="project-inset" style="float:center;max-width:100%;" />

---
# Launch MATE
Most users will choose the MATE desktop. 

1. Click on the green `MATE` icon. Text showing the choice will appear in the box below it.
2. Click the `Launch` button to start your session. 

If you are running a popup blocker in your browser, a request will appear that you unblock this site. Once you do so, you can click the button to continue to your session. After a short wait, your desktop will appear.

<img src="/images/rivanna/fastxweb-session-opts.png" alt="FastX Web Session Options" class="project-inset" style="float:center;max-width:100%;" />

---
# Desktop
The toolbar at the top controls FastX behavior. If the desktop does not automatically expand to the browser screen, the user can click the double arrow. The pushpin pins the toolbar to the screen.

<img src="/images/rivanna/fastxweb-desktop.png" alt="FastX Web Desktop Environment" class="project-inset" style="float:center;max-width:100%;" />

- - -
# Logout
When you are done, you can log out by selecting `Logout` from the `System` menu. This will terminate your FastX Web session.

<img src="/images/rivanna/fastxweb-logout.png" alt="FastX Web Logout" class="project-inset" style="float:center;max-width:100%;" />

- - -
# Resume
If you close the browser tab with the desktop, your session will be suspended rather than terminated. You can go back to the launch tab and click the thumbnail of your desktop. To resume the session, click the arrow (play) button.

<img src="/images/rivanna/fastxweb-resume.png" alt="FastX Web Resume Session" class="project-inset" style="float:center;max-width:100%;" />

- - -
# Terminate Session
To terminate the session, either select Terminate from the Actions dropdown menu, or click the close symbol. Please terminate sessions if you do not plan to use them in the near future.
