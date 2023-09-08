+++
type = "rivanna"
categories = [
  "HPC",
  "software",
]
date = "2023-09-08T00:00:00-05:00"
tags = [
  "lang",
]
draft = false
shorttitle = "Code Server"
modulename = "code-server"
softwarename = "Code Server"
title = "Code Server on Rivanna"
author = "RC Staff"

+++

# Description
{{< module-description >}}

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

# Interactive Sessions through Rivanna's Web Portal

Interactive sessions of {{% software-name %}} can be launched through Rivanna's web portal, [Open OnDemand](/userinfo/rivanna/ood/overview).
To launch an instance of {{% software-name %}}, you will begin by connecting to our Open OnDemand portal. Your {{% software-name %}} session will run on a Rivanna GPU node. In addition, you need to specify required resources, e.g. time, your Rivanna allocation, etc.. If you are new to Rivanna, you may want to read the [Getting Started Guide](/userinfo/rivanna/queues/) to learn more about the partitions.

## Starting an Interactive Session
1. Open a web browser and go to URL:  https://rivanna-portal.hpc.virginia.edu.
2. Use your Netbadge credentials to log in. This will open the Open OnDemand web portal.
3. On the top banner of the Open OnDemand dashboard, click on `Interactive Apps`.
4. In the drop-down box, click on `{{% software-name %}}`.
5. After connecting to {{% software-name %}} through Open OnDemand, a form will appear where you can fill in the resources for {{% software-name %}}. {{% software-name %}} supports GPUs and should be run in the `GPU` partition.
6. When done filling in the resources, click on the blue `Launch` button at the bottom of the form. **Do not click the button multiple times**.
7. It may take a few minutes for the system to gather the resources for your instance of {{% software-name %}}. When the resources are ready a `Launch {{% software-name %}}` button will appear. Click on the button to start {{% software-name %}}.


## Using {{% software-name %}}
When {{% software-name %}} opens in your web browser, it will appear just like the {{% software-name %}} that you have on your laptop or desktop.

Python users should select an appropriate interpreter, unless you wish to use the system python (2.7):

1. Press F1
1. Search for “python: select interpreter”
1. Choose the anaconda python or any other python in your custom environments.

## Closing the Interactive Session
When you are done, quit the {{% software-name %}} application. The interactive session will be closed and the allocated resources will be released.
