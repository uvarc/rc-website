+++
type = "howto"
date = "2020-03-20T00:00:00-05:00" 
tags = [ "Rivanna", "login", "howto" ] 
category = ["howto"]
draft = false 
title = "SSH Keys" 
description = "Authentication with SSH Keys" 
author = "RC Staff"
+++

{{% callout %}}
Users can authenticate their SSH sessions using either a password or an ssh key. The instructions below describe how to create a key and use it for password-less authentication to your Linux instances.
{{% /callout %}}

# About SSH Keys

SSH keys are a pair of encrypted files that are meant to go together. One half of the pair is called the “private” key, and the other half is the “public” key. When users use the private key to connect to a server that is configured with the public key, the match can be verified and the user is signed in. Or, put it more simply, when data is encrypted using one half of the key, it can be decrypted using the other half.

The most important thing to remember about SSH key pairs is to NEVER share or distribute the private half. That should remain safely and securely with you. Anyone with possession of that key can potentially sign into other systems as you.

Public keys, by contrast, can be shared widely.

# Create an SSH keypair

From a terminal or command prompt (Linux and MacOS) issue this command:

```
ssh-keygen
```

If you receive an error, you may need to install the `openssl` package.

This command will prompt you for a name and location of the key pair. By default, the key is usually named id_rsa and is placed within a hidden .ssh folder within your personal directory.

When creating the key, you will be asked if you would also like to secure it with a password. This is optional, but should be used in high security environments.

After key generation you will find two new files in your .ssh directory:
```
id_rsa
id_rsa.pub
```
The .pub file is your public key. Note that the private key has restricted permissions,
`-rw------- (600)`.

# Authenticate SSH using keys

To use your SSH keypair for authentication, you need to do two things:

**Copy the public key to your destination server** - First, `cat` out your public key, and copy it to your clipboard. Then SSH into your destination server using a password as normal. Within the `.ssh/` folder on the remote server, you should find a file named `authorized_keys`. (If you do not, create one.) And then paste your public key into that file. Be sure the key is entirely on only one line. Then log out.

**Use key authentication for SSH connections** - Second, when you invoke the ssh client from your local workstation, use the -i flag to specify your identity file (i.e. ssh key). So while a normal SSH connection looks like this (prompting you for a password):

```
ssh foo9b@login.hpc.virginia.edu
```
You should now instead use something like this (that requires no password):

```
ssh -i ~/path/to/file foo9b@login.hpc.virginia.edu
```

You can add an alias in as a new line in your .bashrc file for easy logins, for example:
```
rivanna='ssh -i ~/path/to/file foo9b@login.hpc.virginia.edu'
```

# Key Expiration

One risk of SSH keys is that they have no expiration date or specific lifespan. Be sure to rotate out older keys on a regular basis. We suggest swapping out keys every 90-180 days.

# Windows Users

1. GitBash - Download and install GitBash 1, which allows you to run Linux-style commands such as ssh (for secure shell connections) and ssh-keygen to generate keypairs.

2. SSH in Chrome Browser - Run an SSH client within the Chrome browser. Install the extension here 2 and launch. Works with Linux-compatible SSH keys, and profiles can be saved.

3. PuTTY - Download the full PuTTy package and generate an RSA keypair at least 2048 bits in size using the PuTTYGen. The files it creates are in a unique format but work perfectly well when used with the PuTTY SSH client.
