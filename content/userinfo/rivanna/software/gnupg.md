+++
type = "rivanna"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "HPC",
  "software",
]
date = "2020-03-06T00:00:00-05:00"
tags = []
draft = false
shorttitle = "GnuPG"
modulename = "gnupg"
softwarename = "GnuPG"
title = "GnuPG on Rivanna"
author = "RC Staff"

+++

# Description
{{% module-description %}}
<br>
**Software Category:** {{% module-category %}}

For detailed information, visit the [{{% software-name %}} website]({{< module-homepage >}}).

# Available Versions
To find the available versions and learn how to load them, run:
```
module spider {{% module-name %}}
```

The output of the command shows the available {{% software-name %}} module versions.

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
```
module spider {{% module-firstversion %}}
```

{{< module-versions >}}

# Generate a key
To generate a key, execute the following command:
```
gpg --full-generate-key
```
and follow the on-screen instructions.

If it ends abruptly with this message:
```
gpg: agent_genkey failed: No pinentry
Key generation failed: No pinentry
```
please follow these steps:

1. Kill your current gpg-agent
```
gpgconf --kill gpg-agent
```
2. Start the agent with pinentry
```
gpg-agent --daemon --pinentry-program /usr/bin/pinentry
```
3. Run GnuPG
```
gpg --full-generate-key
```
It will ask you to “perform some other action” but just wait. After a few seconds you will be asked to create a passphrase in a popup window. Again, wait for a few seconds and retype your passphrase in another popup window. At the end you should see something like this:
```
gpg: /home/mst3k/.gnupg/trustdb.gpg: trustdb created
gpg: key **************** marked as ultimately trusted
gpg: directory '/home/mst3k/.gnupg/openpgp-revocs.d' created
gpg: revocation certificate stored as '/home/mst3k/.gnupg/openpgp-revocs.d/***.rev'
public and secret key created and signed.

pub   rsa4096 2020-03-06 [SC] [expires: 2020-03-07]
      ****************************************
uid                      MST3K <mst3k@virginia.edu>
sub   rsa4096 2020-03-06 [E] [expires: 2020-03-07]
```
