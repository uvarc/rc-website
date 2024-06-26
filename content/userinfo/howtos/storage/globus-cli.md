+++
type = "howto"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "howto",
  "storage",
]
date = "2020-03-09T13:53:46-05:00"
tags = ["howto","storage","globus","cli"]
draft = false
shorttitle = "Globus CLI"
title = "Globus Command-Line Interface"
description = "Using Globus through its command-line interface."
author = "RC Staff"

+++

# Install the Globus CLI

The Globus CLI is available through the pip installer:

If you have administrator privileges type

{{< code >}}
pip install globus-cli
{{< /code >}}

Otherwise use

{{< code >}}
pip install --user globus-cli
{{< /code >}}

The project is open source, so you can also download the source at [https://github.com/globus/globus-cli](https://github.com/globus/globus-cli)

If you would like to use the CLI from UVA HPC, please follow these directions [below](#use-the-globus-cli-from-your-rivanna-account).

# Authenticate using the Globus CLI

Log in against your institutional authentication provider. In the case of UVA, we use NetBadge for signing in:

{{< code >}}
globus login
{{< /code >}}

This will open a page in your web browser where you select your institution and proceed to login:

<img alt="Globus CLI login" src="/images/globus-cli-login.png" align="right" style="max-width:20%;">

Select “University of Virginia” and then click **Continue**. You are then taken to an authorization page where you agree to allow the Globus CLI to access your Globus account. Click on **Allow**.

<img alt="Globus CLI authentication" src="/images/globus-cli-authenticate.png" align="right" style="max-width:20%;">

You may now close your browser window. Your command-line tools are now authenticated and ready to use.

# Basic Commands

Issue the base command for the tools and you will see the primary set of commands:

{{< code >}}
globus
{{< /code >}}

{{< code >}}
  --jmespath, --jq TEXT     A JMESPath expression to apply to json output.
                            Takes precedence over any specified '--format' and
                            forces the format to be json processed by this
                            expression
  --map-http-status TEXT    Map HTTP statuses to any of these exit codes:
                            0,1,50-99. e.g. "404=50,403=51"

Commands:
  bookmark        Manage endpoint bookmarks
  config          Manage your Globus config file. (Advanced Users)
  delete          Submit a delete task
  endpoint        Manage Globus endpoint definitions
  get-identities  Lookup Globus Auth Identities
  list-commands   List all CLI Commands
  login           Log into Globus to get credentials for the Globus CLI
  logout          Logout of the Globus CLI
  ls              List endpoint directory contents
  mkdir           Make a directory on an endpoint
  rename          Rename a file or directory on an endpoint
  task            Manage asynchronous tasks
  transfer        Submit a transfer task
  update          Update the Globus CLI to its latest version
  version         Show the version and exit
  whoami          Show the currently logged-in identity.
{{< /code >}}


For a full list of commands available:

{{< code >}}
globus list-commands
{{< /code >}}

# List/Search Endpoints using the Globus CLI

Find a Globus endpoint. Here is how you might find the UVA Main DTN:

{{< code >}}
globus endpoint search "uva#main"

ID                                   | Owner            | Display Name
------------------------------------ | ---------------- | ------------
c4d80096-7612-11e7-8b5e-22000b9923ef | uva@globusid.org | uva#main-DTN
{{< /code >}}

Or search more broadly for all UVA endpoints in Globus:

{{< code >}}
globus endpoint search "uva"

ID                                   | Owner                | Display Name     
------------------------------------ | -------------------- | -----------------
c4d80096-7612-11e7-8b5e-22000b9923ef | uva@globusid.org     | uva#main-DTN     
67b9cb38-301c-11e7-bcac-22000b9a448b | uva@globusid.org     | uva#portable-DTN 
e1c6b195-6d04-11e5-ba46-22000b92c6ec | uvastro@globusid.org | uvastro#almuhit  
31a68704-2422-11e6-bfeb-22000b1701d1 | uvastro@globusid.org | uvastro#scandium 
7bb92d80-6d04-11e5-ba46-22000b92c6ec | uvacse@globusid.org  | uvacse#fir       
de463ced-6d04-11e5-ba46-22000b92c6ec | uvastro@globusid.org | uvastro#tupungato
de463ce4-6d04-11e5-ba46-22000b92c6ec | uvastro@globusid.org | uvastro#helix    
a9a9ae5d-6d04-11e5-ba46-22000b92c6ec | uvacse@globusid.org  | uvacse#cooper    
df70ec7d-6d04-11e5-ba46-22000b92c6ec | uvastro@globusid.org | uvastro#cavi     
24b0ca0c-3013-11e7-bcab-22000b9a448b | ars9ac@virginia.edu  | UVA Portable DTN 
{{< /code >}}

For transfers and file operations, reference endpoints by their unique ID. Names are only convenient tags to help humans differentiate between endpoints.

## Traverse Directory Trees using the Globus CLI

Once you know the ID of a specific endpoint, you can list directories visible to you. Here are some paths open to users of the HPC cluster:

{{< code >}}
globus ls c4d80096-7612-11e7-8b5e-22000b9923ef

home/
nv/
scratch/
{{< /code >}}

To drill deeper, append directories to the endpoint ID with a colon `:` 

{{< code >}}
globus ls c4d80096-7612-11e7-8b5e-22000b9923ef:home/mst3k/

directory1/
directory2/
archive1.tar.gz
file1.txt
file2.txt
my-file.txt
{{< /code >}}

If we would like to transfer a file, we will need the full Globus ID and path of the source file:

{{< code >}}
c4d80096-7612-11e7-8b5e-22000b9923ef:home/mst3k/archive1.tar.gz
{{< /code >}}

# Transfer Files using the Globus CLI

To transfer a file you will also need the ID and path to a destination directory and new filename – the place to which you would like to copy the remote file from above. It should look something like this:

{{< code >}}
39e0bf8a-3037-11e7-bcae-22000b9a448b:/home/user1/archive1.tar.gz
{{< /code >}}

With the full path to a source file and a full path to a destination, we can now request a transfer. The simplest form of a transfer request looks like this:

{{< code >}}
globus transfer c4d80096-7612-11e7-8b5e-22000b9923ef:home/mst3k/my-file.txt c4d80096-7612-11e7-8b5e-22000b9923ed:nv/vol179/staff/my-new-file.txt

Message: The transfer has been accepted and a task has been created and queued for execution
Task ID: 94d15980-9c94-11e7-acbc-22000a92523b
{{< /code >}}

Note: If you wish to encrypt your transfer, add the --encrypt flag:

{{< code >}}
globus transfer --encrypt c4d80096-7612-11e7-8b5e-22000b9923ef:home/mst3k/my-file.txt c4d80096-7612-11e7-8b5e-22000b9923ed:nv/vol179/staff/my-new-file.txt
{{< /code >}}

# Get the Status of a Transfer

Using the Task ID returned from a request, you can get the status of a task:

{{< code >}}
globus task show 94d15980-9c94-11e7-acbc-22000a92523b

Label:                   None
Task ID:                 94d15980-9c94-11e7-acbc-22000a92523b
Is Paused:               False
Type:                    TRANSFER
Directories:             0
Files:                   1
Status:                  SUCCEEDED
Request Time:            2017-09-18 17:12:43+00:00
Faults:                  0
Total Subtasks:          1
Subtasks Succeeded:      1
Subtasks Pending:        0
Subtasks Retrying:       0
Subtasks Failed:         0
Subtasks Canceled:       0
Subtasks Expired:        0
Completion Time:         2017-09-18 17:12:44+00:00
Source Endpoint:         uva#main-DTN
Source Endpoint ID:      c4d80096-7612-11e7-8b5e-22000b9923ef
Destination Endpoint:    uva#main-DTN
Destination Endpoint ID: c4d80096-7612-11e7-8b5e-22000b9923ed
Bytes Transferred:       2812
Bytes Per Second:        2468
{{< /code >}}

# Script Transfers Against the Globus CLI

Using the commands above, automated file transfers should not be difficult if run under a user account that has already authenticated. A simple bash script run via cron should work well for automated file shipments. Each shipment will trigger an automatic success/failure email, so there is no need to set up additional notifications.

## Single file transfers

Transfer a single file at a time to another DTN, via script:

{{< gist nmagee d9f606ff7edfe1710ce81f1eb23ca654 >}}


## Folder sync transfers

Synchronize an entire folder and all contents with another DTN, via script:

{{< gist nmagee 6f4ad4d32dbd0415528d1fb11242fd09 >}}


Run your script:

{{< code >}}
user@host$ ./sync-directories.sh 
{{< /code >}}

Either operation should result in a confirmation message like this:

{{< code >}}
Message: The transfer has been accepted and a task has been created and queued for execution
Task ID: 5ffe3058-5543-11e8-90ce-0a6d4e044368
{{< /code >}}

## Automating your scripts

* In a Unix/Linux/MacOS environment, you can set any script or application to run on any schedule using cron.
* In Windows, we recommend writing the above into a PowerShell script, which can then be scheduled using the “Task Scheduler” tool from the Windows menu.

# More Information

* See our main [page](/userinfo/globus) introducing Globus Connect
* See the in-depth [Globus CLI Documentation](https://docs.globus.org/cli/) or [Globus CLI Reference](https://docs.globus.org/cli/reference/)
* Globus also has an [API](https://docs.globus.org/api/transfer/) and [Python SDK](https://globus-sdk-python.readthedocs.io/en/latest/).
* For other technical details, see Globus [Documentation](https://docs.globus.org/how-to/).


# Use the Globus-CLI from your UVA HPC

1. Load the globus-cli module and its dependencies:

{{< code >}}
module load gcc openmpi globus_cli
{{< /code >}}

2. Authorize globus-cli

Run this command:

{{< code >}}
globus login
{{< /code >}}

You will then be given an Oauth2 login URL. Start a Web browser, either through [FastX](/userinfo/hpc/logintools/fastx) or through an X11 server on your local computer.  Copy and paste this URL into the web browser, and authorize your connection as instructed in the topic above.

Be sure to give your authorization a useful name, such as <userid>-rivanna, i.e. mst3k-rivanna. This will help you distinguish it in your list of Globus authorizations.

{{% callout %}}
Return to the top of the page for information about using the Globus CLI generally.
{{% /callout %}}

When referencing the globus binary in scripts, you may want to issue a `which globus` command to find its path as that may change over time with new versions. If used with backticks this can be used to populate a variable in a script:

{{< code >}}
globus=`which globus`
{{< /code >}}

Please note that users are not permitted to run cron jobs on the HPC system.  Scheduling should be done from another system.
