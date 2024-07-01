+++
type = "howto"
date = "2023-06-10T00:00:00-05:00" 
tags = [ "rivanna", "databases", "howto", "rdbms", "data", "mysql" ]
category = ["howto"]
draft = true 
title = "MySQL - A basic relational database" 
description = "Basic usage of MySQL" 
author = "RC Staff"
+++

<a style="font-size:85%;text-decoration:none;" href="/userinfo/howtos/general/databases/">&laquo; Return to Databases</a>

{{<top-of-page >}}

{{% callout %}}
<p>
<img src="/images/logos/mysql-logo.png" align="right" style="padding:1rem;" />
MySQL is an open-source relational database management system. It supports standard SQL syntax and models. Some important
concepts are:
<ul>
  <li>Tables
  <li>Rows
  <li>Keys
  <li>Schemas
  <li>Data types
  <li>Selects
  <li>Joins
  <li>Indexes
  <li>Other CRUD operations
</ul>
</p>
{{% /callout %}}


# Getting Started

After submitting a request for a MySQL database, a username and password be created for you, this information along with your endpoint name will be sent
to you via our ticketing system. Store this information somewhere secure, and do not share this information with others.
```
User: <your-db-username>
Pass: <your-db-password>
Host: <mysql-shared-endpoint-name>
Port: 3306
```
The MySQL service is backed by a pair of servers in HA replication mode. One serves as the primary for READS and WRITES, and
the read-replica can be used for READ queries only. These endpoints are available only within the HPC networks and cannot be accessed 
from elsewhere in the UVA WAN. You cannot use MySQL tools remotely (from University offices, labs, or home offices over VPN).

To use MySQL from the command-line, use the `mysqlclient` module on the HPC system:
```
$  module load mysqlclient
```
Or use the appropriate library for the language you are coding in to establish a connected client.

You can now create a connection to the server. Use port `3306` (the default port):
```
$  mysql -h <mysql-endpoint-name> -u <your-username> -p
Password: ***********
```
