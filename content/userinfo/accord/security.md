+++
title = "ACCORD Security"
draft = false
date = "2022-08-11"
images = [""]
author = "Staff"
categories = ["accord"]
tags = ["accord","security","nsf","hipaa","sensitive-data"]
+++

***

<a href="../" style="float:right;width:100%;text-align:right;margin-bottom:2rem;" class="small">Back to Overview</a>

ACCORD is appropriate for de-identified PII, FERPA, de-identified HIPAA, business confidential, and other types of de-identified sensitive data. ACCORD cannot be used to process highly-restricted data such as CUI, FISMA, iTAR, and PCI data.

![Security](/images/accord/security.png)

# Authentication

ACCORD does not have its own user identity store but instead relies upon authentication via your home institution's single sign-on tool.

# Authorization

All members of a project have equal access to the data storage for that project, without sudo or root privileges. 

# Closed Environments

ACCORD environments have no outbound connectivity to the Internet other than approved library and tool 
repositories (PyPi, CPAN, CRAN, etc.). Connections to tools such as GitHub and external APIs are not allowed.

# Encryption

All connectivity to ACCORD environments is encrypted using SSL over HTTPS. 

Data transfers in/out via the Globus DTN meet FIPS 140-2 compliance.

# Isolation

ACCORD environments cannot have any access to other environments. Environments run within isolated Kubernetes pods and their
network connectivity is isolated and encrypted.

# Private Environment URLs

When you request an ACCORD environment, a unique HTTPS endpoint is created for you and 
*can only be used by you*. For example:

    https://jupyter-notebook-1a2b3c4d5e-mst3k.uvarc.io/

These environments cannot be shared.

# Logging

All user interactions with ACCORD are logged including account creation, approval, project creation, changes in group membership, the creation of/changes to environments, and file uploads/downloads using a browser or the Globus DTN.

# Client Posture-Checks

Access to ACCORD is restricted to computers that are sufficiently updated and meet minimum security requirements. To verify this, ACCORD uses <b>OPSWAT</b>, a small piece of software that users install on their local computers.

## Step 1: Install the VPN Assessment Application (Opswat)

Opswat will be installed during the onboarding process for ACCORD.

## Step 2: Resolve Security Requirement Issues

### Requirement 1: Operating System

<div id="accordion">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
          <b>Update Operating System for Mac (version 10.14.0 or higher)</b>
        </button>
      </h5>
    </div>
    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">
      <div class="card-body">
        <br>
        <ol>
          <li>Open <b>System Preferences</b></li>
          <li>Click on <i>Software Update</i></li>
          <li>Click <i>Update Now</i></li>
        </ol>
        <br>
        <b>Note</b>: Updating the Operating System may take up to a couple of hours. Do not shut down your computer or allow it to run out of battery during the update process. A restart of your computer may occur after the updates are complete.
        <br>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          <b>Update Operating System for Windows 10</b>
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
      <div class="card-body">
        <br>
        <ol>
          <li>Open <b>Windows Update</b> by clicking the <b>Start</b> button in the lower left corner. In the search box, type "Update", and then, in the list of results, click either <i>Windows Update</i> or <i>Check for updates</i>.</li>
          <li>Click the <i>Check for updates</i> button and then wait while Windows looks for the latest updates for your computer.</li>
          <li>If you see a message telling you that important updates are available, or telling you to review important updates, click the message to view and select the important updates to install.</li>
          <li>In the list, click the important updates for more information. Select the checkboxes for any updates that you want to install, and then click "OK".</li>
          <li>Click <i>Install</i> updates.</li>
        </ol>
        <br>
        <b>Note</b>: Updating the Operating System may take up to a couple of hours. Do not shut down your computer or allow it to run out of battery during the update process. A restart of your computer may occur after the updates are complete. If you encounter issues while trying to update your Windows computer, visit the <a href="https://support.microsoft.com/en-us/sbs/windows/fix-windows-update-errors-18b693b5-7818-5825-8a7e-2a4a37d6d787?ui=en-US&rs=en-US&ad=US">Fix Windows Update Issues Windows Support</a> webpage
        <br>
      </div>
    </div>
  </div>
</div>

### Requirement 2: Host-Based Firewall

Host-based firewall software must be installed and enabled.

<div id="accordion">
  <div class="card">
    <div class="card-header" id="headingThree">
      <h5 class="mb-0">
        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          <b>Enable Firewall for macOS (All Versions)</b>
        </button>
      </h5>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
      <div class="card-body">
        <br>
        <ol>
          <li>Open <b>System Preferences</b></li>
          <li>Select <i>Security and Privacy</i></li>
          <li>Select <i>Firewall</i></li>
          <li>Click the lock in the lower-left corner and enter your credentials.</li>
          <li>Select <i>Turn On Firewall</i></li>
          <li>Close <b>System Preferences</b></li>
        </ol>
        <br>
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingFour">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
          <b>Enable Firewall for Windows 10</b>
        </button>
      </h5>
    </div>
    <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordion">
      <div class="card-body">
        <br>
        <ol>
          <li>Select the <b>Start</b> button, then select <i>Settings</i> (the gear icon).</li>
          <li>Select <i>Windows Security</i> from the menu on the left.</li>
          <li>Select <i>Firewall & network protection</i>.</li>
          <li>You may then see several networks (i.e., <i>Domain network</i>, <i>Private network</i>). Select each network one at a time and set the <b>Windows Defender Firewall</b> to <i>On</i>.</li>
        </ol>
        <br>
      </div>
    </div>
  </div>
</div>

### Requirement 3: Antivirus / Antimalware Software

At least one antimalware software must be installed and enabled. We recommend the following:

<table class="table table-striped">
  <tbody>
    <tr>
      <th scope="row" style="width:25%;font-weight:bold;">Antivirus for Mac</th>
      <td>
        We recommend using either <b>Gatekeeper</b> or <b>Microsoft Defender for Endpoint</b> for Macs.
      </td>
    </tr>
    <tr>
      <th scope="row" style="width:25%;font-weight:bold;">Antivirus for Windows</th>
      <td>
        We recommend using either <b>Microsoft Defender</b> or <b>Microsoft Defender for Endpoint</b> for Windows.
      </td>
    </tr>
  </tbody>
</table>

Most common antivirus software is acceptable, except those made by Kaspersky Labs.

### Requirement 4: Device Password

The device must be password protected, and it must lock automatically if there is no activity detected for at least 10 minutes. Configure your device to require a password to log in. Also, set your device’s screensaver or security settings to automatically lock after 10 minutes of no activity.

### Requirement 5: Whole-Disk Encryption

Whole-disk encryption software must be installed and enabled. Accepted applications include <i>BitLocker</it>, <i>Dell Data Protection</i>, and <i>FileVault</i>.
