+++
description = ""
title = "ACCORD"
draft = false
date = "2020-06-25T17:45:12-05:00"
tags = ["supercomputer","storage","infrastructure"]
categories = ["userinfo"]
images = [""]
author = "Staff"
type = "accord"
+++

![Security](/images/accord/security.png)

# Security

ACCORD is appropriate for de-identified PII, FERPA, business confidential, and other types of de-identified sensitive data. ACCORD cannot be used to process highly-restricted data such as CUI, FISMA, and PCI data.

## Authentication

ACCORD does not have its own user identity store but instead relies upon authentication via your home institution's single sign-on tool.

## Authorization

All members of a project have equal access to the data storage for that project, without sudo or root privileges. 

## Closed Environments

ACCORD environments have no outbound connectivity to the Internet other than approved library and tool 
repositories (PyPi, CPAN, CRAN, etc.). Connections to tools such as GitHub and external APIs are not allowed.

## Encryption

All connectivity to ACCORD environments is encrypted using SSL over HTTPS. 

Data transfers in/out via the Globus DTN meet FIPS 140-2 compliance.

## Isolation

ACCORD environments cannot have any access to other environments. Environments run within isolated Kubernetes pods and their
network connectivity is isolated and encrypted.

## Private Environment URLs

When you request an ACCORD environment, a unique HTTPS endpoint is created for you and 
*can only be used by you*. For example:

    https://jupyter-notebook-1a2b3c4d5e-mst3k.uvarc.io/

These environments cannot be shared.

## Client Posture-Checks

Access to ACCORD is restricted to computers that are sufficiently
updated and meet minimum security requirements. To verify this, ACCORD uses [OPSWAT client](https://www.opswat.com/), a small piece of software that users install on their local computers. 

## Logging

All user interactions with ACCORD are logged including account creation, approval, project creation, changes in group membership, the creation of/changes to environments, and file uploads/downloads using a browser or the Globus DTN.

