+++
date = "2017-02-21T13:43:32-05:00"
description = ""
title = "AWS Command Line (PowerShell)"
draft = true
tags = ["cli","powershell","windows"]
categories = ["reference"]
images = [""]
author = "RC Staff"
type = "reference"
project = "AWS CLI for PowerShell"
projecturl = "https://aws.amazon.com/powershell/"

+++

<div class="bd-callout bd-callout-warning">
<h4>AWS Command Line for PowerShell</h4>
All the functionality of the Linux-based AWSCLI tools are also available for Windows users. 
Install the AWS Tools for Windows PowerShell if you need to script against AWS or automate repetitive tasks.
</div>

# Installation

[Download](http://sdk-for-net.amazonwebservices.com/latest/AWSToolsAndSDKForNet.msi) and run the AWS Tools for Windows PowerShell.

Requirements:

* Microsoft Windows XP or later
* Windows PowerShell 2.0 or later

Refer to http://docs.aws.amazon.com/powershell/latest/userguide/pstools-getting-set-up.html for more information.

# Configure with Credentials

Your should either receive (from an admin) or generate an access key and secret key using the IAM service. These will serve to authenticate and 
authorize your command-line requests. To configure the AWS CLI for PowerShell to use these credentials, use the `Set-AWSCredentials` cmdlet:

    PS C:\> Set-AWSCredentials -AccessKey {AKIAIOSFODNN7EXAMPLE} -SecretKey {wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY} -StoreAs {MyProfileName}

* `-AccessKey` - Your access key.
* `-SecretKey` - Your secret key.
* `-StoreAs` - The profile name, which must be unique. Leave to `default` if you want to give credentials to a default profile.

You can then check your credentials (and profiles) issue this command:

    PS C:\> Get-AWSCredentials -ListStoredCredentials

# Basic Usage

The easiest way to begin using the AWS CLI for PowerShell is to begin to automate simple tasks, and then build up in complexity. This one-line command starts an EC2 instance:

    PS C:\> Start-EC2Instance -InstanceIds i-1a2b3c4d5e6f

The following example loops through a log directory, finds files older than one week, and then archives any non-empty ones to Amazon S3 before deleting the log file:

    foreach ($i in Get-ChildItem C:\Logs)
    {
        if ($i.CreationTime -lt ($(Get-Date).AddDays(-7)))
        {
            if ($i.Length -gt 0)
            {
                Write-S3Object -BucketName mylogbucket -Key Logs/$i -File $i.FullName
            }
            Remove-Item $i.FullName
        }
    }


# Real-world Examples

