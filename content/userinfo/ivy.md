+++
description = ""
title = "Ivy - Secure Environment"
draft = false
date = "2017-02-26T17:45:12-05:00"
tags = ["hpc","ivy","hipaa","linux","windows"]
categories = ["userinfo"]
images = [""]
author = "SOMRC Staff"

+++

<div class="bd-callout bd-callout-warning">
<h4>Ivy</h4>
Ivy is a secure computing environment for researchers consisting of virtual machines (Linux and Windows), Domino Data Lab, and the Hadoop/Spark mapreduce environment.
</div>

# Obtaining Access

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt viverra elit vitae mollis. Donec ipsum erat, ornare id suscipit non, lobortis in orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed ac ante eget purus ultrices cursus. Vivamus pretium erat in mattis feugiat. Nullam accumsan dignissim erat non auctor. Quisque elementum faucibus lacus pretium pretium. Mauris luctus, sapien id suscipit semper, eros ipsum fringilla odio, in scelerisque diam sem a libero. Ut accumsan non nibh in gravida. Pellentesque non ornare ipsum. Sed sed tellus eu arcu consectetur convallis. Aenean feugiat turpis id ex pretium ornare. Morbi sed odio sodales lorem tempus egestas ac at magna.

- - -

# Connecting and Signing In

## <span class="badge badge-default">1</span> Authentication

You will sign in to all Ivy resources using your UVA computing ID and Eservices password. Because of Ivy's high security requirements, your Eservices password must be changed every 60 days.

## <span class="badge badge-default">2</span> Identity Token

To connect to the Ivy environment with VPN you will need a physical USB identity token, issued to you by the ISPRO Access Management Office. Tokens must be requested, approved, and may take 
from 1-2 weeks for delivery. In addition, your token will have its own password in order to be used. 

[<button class="btn btn-sm btn-warning">Request a UVA Identity Token</button>](http://its.virginia.edu/identity/token/distribution.html)

## <span class="badge badge-default">3</span> Joint VPN

With your UVA computing ID, Eservices password, and USB identity token in hand, you must run the Cisco AnyConnect software to start a JointVPN connection every time you use any Ivy resource. AnyConnect
will authenticate to the UVA network using a digital certificate installed on your workstation. More information about how to [create, install, and use digital certificates](http://itc.virginia.edu/identity/certificate/) is available from ITS.

[<button class="btn btn-sm btn-warning">AnyConnect VPN Instructions</button>](http://its.virginia.edu/vpn/)

- - -

# Virtual Machines

A virtual machine (VM) is a computing instance dedicated to your project. 

Virtual machines come in two platforms, CentOS7 Linux and Windows Server 2012R2. Each platform is available in three instance types. Refer to the grid below for specifics.

<table class="table table-sm" style="width:50%;border:solid 1px #ccc;margin-left:4rem;">
  <thead class="thead-inverse">
    <tr>
      <th>Type</th>
      <th>CPU</th>
      <th>Memory</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Small</td>
      <td>2 cores</td>
      <td>4GB</td>
    </tr>
    <tr>
      <td>Medium</td>
      <td>8 cores</td>
      <td>16GB</td>
    </tr>
    <tr>
      <td>Large</td>
      <td>16 cores</td>
      <td>64GB</td>
    </tr>
  </tbody>
</table>

## Connecting to your VM

To connect to your VM, follow the platform-specific steps below:

<div class="row" style="margin-bottom:2rem;">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-header">
        <b>CentOS 7 Linux</b>
      </div>
      <div class="card-block">
        <ul>
          <li>Open your JointVPN connection</li>
          <li>Reference the IP address of your Ivy VM.</li>
          <li>For SSH access:<br />&nbsp;&nbsp;<code>ssh uva-id@ip-address</code></li>
          <li>For Remote Desktop access: Start the x2goclient to the IP address of your VM and sign in.</li>
        </ul>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-header">
        <b>Windows</b>
      </div>
      <div class="card-block">
        <ul>
          <li>Open your JointVPN connection</li>
          <li>Reference the IP address of your Ivy VM.</li>
          <li>For Remote Desktop access: Start an RDP client to the IP address of your VM and sign in.</li>
        </ul>
      </div>
    </div>
  </div>
</div>

 
## Software

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt viverra elit vitae mollis. Donec ipsum erat, ornare id suscipit non, lobortis in orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed ac ante eget purus ultrices cursus. Vivamus pretium erat in mattis feugiat. Nullam accumsan dignissim erat non auctor. Quisque elementum faucibus lacus pretium pretium. Mauris luctus, sapien id suscipit semper, eros ipsum fringilla odio, in scelerisque diam sem a libero. Ut accumsan non nibh in gravida. Pellentesque non ornare ipsum. Sed sed tellus eu arcu consectetur convallis. Aenean feugiat turpis id ex pretium ornare. Morbi sed odio sodales lorem tempus egestas ac at magna.

<div class="row" style="margin-bottom:2rem;">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-header">
        <b>CentOS 7 Linux Software</b>
      </div>
      <div class="card-block">
        <p class="card-text">A traditional high performance cluster with job scheduler, large file system, modules, and MPI processing. Please see the ARCS page for how to begin working in Rivanna.</p>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-header">
        <b>Windows Software</b>
      </div>
      <div class="card-block">
        <p class="card-text">A multi-platform, HIPAA-compliant system for secure data that includes dedicated virtual machines (Linux and Windows), Domino Data Lab, and Hadoop/Spark.</p>
      </div>
    </div>
  </div>
</div>

Donec fermentum eu tortor eu dignissim. Curabitur elit diam, tempor in dui non, tincidunt rhoncus risus. Praesent pharetra nisl elit, vitae commodo odio rutrum et. Praesent ac ligula pharetra, mollis lorem tristique, convallis leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla facilisi. Cras sit amet euismod elit, et iaculis ipsum. Fusce aliquet mauris sit amet elit euismod, in varius justo suscipit.

## Storage

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt viverra elit vitae mollis. Donec ipsum erat, ornare id suscipit non, lobortis in orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed ac ante eget purus ultrices cursus. Vivamus pretium erat in mattis feugiat. Nullam accumsan dignissim erat non auctor. Quisque elementum faucibus lacus pretium pretium. Mauris luctus, sapien id suscipit semper, eros ipsum fringilla odio, in scelerisque diam sem a libero. Ut accumsan non nibh in gravida. Pellentesque non ornare ipsum. Sed sed tellus eu arcu consectetur convallis. Aenean feugiat turpis id ex pretium ornare. Morbi sed odio sodales lorem tempus egestas ac at magna.

Donec fermentum eu tortor eu dignissim. Curabitur elit diam, tempor in dui non, tincidunt rhoncus risus. Praesent pharetra nisl elit, vitae commodo odio rutrum et. Praesent ac ligula pharetra, mollis lorem tristique, convallis leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla facilisi. Cras sit amet euismod elit, et iaculis ipsum. Fusce aliquet mauris sit amet elit euismod, in varius justo suscipit.

- - -

# Domino Data Lab

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt viverra elit vitae mollis. Donec ipsum erat, ornare id suscipit non, lobortis in orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed ac ante eget purus ultrices cursus. Vivamus pretium erat in mattis feugiat. Nullam accumsan dignissim erat non auctor. Quisque elementum faucibus lacus pretium pretium. Mauris luctus, sapien id suscipit semper, eros ipsum fringilla odio, in scelerisque diam sem a libero. Ut accumsan non nibh in gravida. Pellentesque non ornare ipsum. Sed sed tellus eu arcu consectetur convallis. Aenean feugiat turpis id ex pretium ornare. Morbi sed odio sodales lorem tempus egestas ac at magna.

Donec fermentum eu tortor eu dignissim. Curabitur elit diam, tempor in dui non, tincidunt rhoncus risus. Praesent pharetra nisl elit, vitae commodo odio rutrum et. Praesent ac ligula pharetra, mollis lorem tristique, convallis leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla facilisi. Cras sit amet euismod elit, et iaculis ipsum. Fusce aliquet mauris sit amet elit euismod, in varius justo suscipit.

- - -

# Mapreduce

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt viverra elit vitae mollis. Donec ipsum erat, ornare id suscipit non, lobortis in orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed ac ante eget purus ultrices cursus. Vivamus pretium erat in mattis feugiat. Nullam accumsan dignissim erat non auctor. Quisque elementum faucibus lacus pretium pretium. Mauris luctus, sapien id suscipit semper, eros ipsum fringilla odio, in scelerisque diam sem a libero. Ut accumsan non nibh in gravida. Pellentesque non ornare ipsum. Sed sed tellus eu arcu consectetur convallis. Aenean feugiat turpis id ex pretium ornare. Morbi sed odio sodales lorem tempus egestas ac at magna.

Donec fermentum eu tortor eu dignissim. Curabitur elit diam, tempor in dui non, tincidunt rhoncus risus. Praesent pharetra nisl elit, vitae commodo odio rutrum et. Praesent ac ligula pharetra, mollis lorem tristique, convallis leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla facilisi. Cras sit amet euismod elit, et iaculis ipsum. Fusce aliquet mauris sit amet elit euismod, in varius justo suscipit.

- - -

# Data Transfer In/Out of Ivy

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt viverra elit vitae mollis. Donec ipsum erat, ornare id suscipit non, lobortis in orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed ac ante eget purus ultrices cursus. Vivamus pretium erat in mattis feugiat. Nullam accumsan dignissim erat non auctor. Quisque elementum faucibus lacus pretium pretium. Mauris luctus, sapien id suscipit semper, eros ipsum fringilla odio, in scelerisque diam sem a libero. Ut accumsan non nibh in gravida. Pellentesque non ornare ipsum. Sed sed tellus eu arcu consectetur convallis. Aenean feugiat turpis id ex pretium ornare. Morbi sed odio sodales lorem tempus egestas ac at magna.

Donec fermentum eu tortor eu dignissim. Curabitur elit diam, tempor in dui non, tincidunt rhoncus risus. Praesent pharetra nisl elit, vitae commodo odio rutrum et. Praesent ac ligula pharetra, mollis lorem tristique, convallis leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla facilisi. Cras sit amet euismod elit, et iaculis ipsum. Fusce aliquet mauris sit amet elit euismod, in varius justo suscipit.

- - -

# HIPAA Compliance

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tincidunt viverra elit vitae mollis. Donec ipsum erat, ornare id suscipit non, lobortis in orci. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed ac ante eget purus ultrices cursus. Vivamus pretium erat in mattis feugiat. Nullam accumsan dignissim erat non auctor. Quisque elementum faucibus lacus pretium pretium. Mauris luctus, sapien id suscipit semper, eros ipsum fringilla odio, in scelerisque diam sem a libero. Ut accumsan non nibh in gravida. Pellentesque non ornare ipsum. Sed sed tellus eu arcu consectetur convallis. Aenean feugiat turpis id ex pretium ornare. Morbi sed odio sodales lorem tempus egestas ac at magna.

Donec fermentum eu tortor eu dignissim. Curabitur elit diam, tempor in dui non, tincidunt rhoncus risus. Praesent pharetra nisl elit, vitae commodo odio rutrum et. Praesent ac ligula pharetra, mollis lorem tristique, convallis leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla facilisi. Cras sit amet euismod elit, et iaculis ipsum. Fusce aliquet mauris sit amet elit euismod, in varius justo suscipit.
