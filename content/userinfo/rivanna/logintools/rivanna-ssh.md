+++
description = ""
title = "`ssh` on Rivanna"
draft = false
date = "2022-08-30T11:45:12-05:00"
tags = ["rivanna","login","hpc","ssh","cli"]
categories = ["userinfo"]
images = [""]
author = "Staff"
type = "rivanna"

+++

<p class="lead">The secure shell <code>ssh</code> is the primary application used to access Rivanna from the command line.</p>

# Connecting to a Remote Host

For Windows, [MobaXterm](/userinfo/rivanna/logintools/mobaxterm) is our recommended `ssh` client; this package also provides an SFTP client and an X11 server in one bundle.

Mac OSX and Linux users access the cluster from a terminal through OpenSSH, which are preinstalled on these operating systems. Open a terminal (on OSX, the Terminal application) and type
```
ssh -Y mst3k@login.hpc.virginia.edu
```

where `mst3k` should be replaced by your user ID. You will generally need to use this format unless you set up your user account on your Mac or Linux system with your UVA ID. 

Please note that `ssh` *will not* echo your password or move your cursor as you type.

Mac users will need to install [XQuartz](https://xquartz.org) in order to use graphical applications through a shell (the -Y option will permit this).

# Passwordless `ssh` using keys

Sometimes you will need to enable passwordless `ssh`. We allow passwordless `ssh` to frontend nodes from UVA IP addresses. Key 
authentication works by matching two halves of an encrypted keypair. The "public" key is placed within your home directory on the 
remote server and the "private" key is kept safely on your own workstation. **You should treat private keys as securely as you would
any password.**

## Windows

In MobaXterm, click the Tools icon or menu and select MobaKeyGen. Keep it as RSA and leave the passphrase blank. Save the public key under a name of your choice. MobaXterm will display the public key. Copy this key to your clipboard. Continue as for "All Operating Systems."

## Mac OSX and Linux

Open a terminal and type
```
ssh-keygen
```

Accept all defaults. When it asks for a passphrase, hit Enter to keep it blank. Open the file `id_rsa.pub` and copy its contents to your clipboard.

## Graphical Installation, All Operating Systems

Log in to Rivanna,
```
cd .ssh
```

Note the period in front of `ssh`. Then, using a text editor, open the file `authorized_keys`. Append the key you copied previously. Use the _middle_ mouse button or scroll wheel to paste it into the authorized_keys file if you are using MobaXterm. Otherwise right-click and select paste.  Be sure there are no line breaks in the key.

## Command-Line Transfer (Mac and Linux)

Transfer the `id_rsa.pub` file to Rivanna with scp:
```
scp ~/.ssh/id_rsa.pub mst3k@login.hpc.virginia.edu:~/.ssh/mykey.pub
```

Log in to Rivanna through a terminal, then type
```
cat ~/.ssh/mykey.pub >> ~/.ssh/authorized_keys
```

## Passwordless `ssh` Between Nodes

If you are permitted to use passwordless `ssh` between Rivanna compute nodes, such as for ANSYS, follow the instructions for Mac and Linux but generate the key directly on a Rivanna frontend. Use the cat command to append the key to your authorized_keys file.</p>

# Troubleshooting

- When you log in to a new host, `ssh` will ask whether you wish to accept the host key. You must answer yes explicitly in order to procede.

- When off Grounds, you must use the [UVA Anywhere](https://virginia.service-now.com/its?id=itsweb_kb_article&sys_id=f24e5cdfdb3acb804f32fb671d9619d0) client in order to connect to on-Grounds resources. If you do not, your attempt to use `ssh` will hang with no messages.

- A relatively short period of inactivity may cause `ssh` connections to time out.  Mac OSX and Linux users can reduce this by setting a configuration value. At the terminal change to your `~/.ssh` directory
```
cd ~/.ssh
```
Use a text editor to create a file called `config`. Place the following lines in it:
```
Host *
   ServerAliveInterval 60
```
There should be one or more spaces at the beginning of the second line.

- MobaXterm users should see the [documentation](/userinfo/rivanna/logintools/mobaxterm) for instructions to enable KeepAlive.

- When in doubt, you can obtain more information by running `ssh` with the -v (verbose) flag.
```
ssh -v -Y mst3k@login.hpc.virginia.edu
```
- A common error message from `ssh` is when a host key changes, such as after an upgrade. This will appear as a message containing lines such as
```
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@ WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED! @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
```
MobaXterm will typically detect this and ask whether you want to change the host key; you may answer `yes`. On Mac OSX or Linux, from a terminal go to your `~/.ssh` directory and use a text editor to open the file `known_hosts`. Remove all lines that might refer to Rivanna. Alternatively, just delete the entire file; it will be recreated as you log in to different hosts. If you are unfamiliar with using a command line on Mac, you must
```
cd 
cd .ssh
```
After that you must either edit the known_hosts file with a text editor to remove the invalid lines, either through a command-line editor or with
```
open known_hosts
```
(The above command only works on Macs, not Linux.)
