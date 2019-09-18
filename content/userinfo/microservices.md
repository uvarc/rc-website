+++
author = "RC Staff"
description = ""
title = "Microservices"
date = "2019-09-16T10:08:29-05:00"
draft = false
tags = ["compute","cloud","hpc","containers","dcos"]
categories = ["userinfo"]
images = [""]
+++

<img src="/images/cargo_container.png" align="left" alt="container" style="max-width:7rem;margin-right:1.4rem;" />
<p class=lead>
  Containers are portable, efficient, and disposable. Containerized microservices typically run a single process, rather than an entire stack within the same computing environment. 
  This allows portions of your application to be replaced or scaled as needed. 
</p>

<p class=lead>
  Research Computing runs containers in an orchestration environment named DCOS (Distributed Cloud Operating System), based on Apache Mesos and Apache Marathon. This cluster has >1000 cores and ~1TB of memory allocated to running containerized services. DCOS can also attach to project storage.
</p>

- - -

# Typical Use Cases

<ul>
  <li>Independent applications - Such as static HTML websites, interactive or data-driven web applications and databases.</li>
  <li>Applications in support of HPC jobs - Some workflows in HPC jobs require supplemental services in order to run, such as relational databases, key-value stores, or reference APIs.</li>
</ul>

- - -

# Eligibility

{{% highlight %}}
Custom containers must be for **research purposes only** and must pass basic security checks. Containers may not contain passwords, SSH keys, API keys, or other sensitive information.
{{% /highlight %}}

- - -

# Common Scenarios

<table class="table">
  <thead>
    <tr>
      <th scope="col">Service</th>
      <th scope="col"></th>
      <th scope="col">Accessibility</th>
      <th scope="col" style="width:40%;">Details</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row" style="text-align:center;"><img style="max-width:4rem;" src="https://dcos.uvasomrc.io/images/nginx-500x500.png" /></th>
      <td>NGINX Web Server</td>
      <td>Public</td>
      <td>A fast web server that can run
        <ul>
          <li>Static HTML [<a target="_new" href="http://bioterms.org/">demo</a>]
          <li>Flask or Django apps [<a target="_new" href="http://bartweb.org/">demo</a>] 
          <li>RESTful APIs
          <li>Expose Project storage [<a target="_new" href="http://big.databio.org/">demo</a>]
        </ul>
      </td>
    </tr>
    <tr>
      <th scope="row" style="text-align:center;"><img style="max-width:6rem;" src="/images/apache_logo.jpg" /></th>
      <td>Apache Web Server</td>
      <td>Public</td>
      <td>An extremely popular web server that can run your static HTML, Flask or Django apps, or expose files stored in Project storage.</td>
    </tr>
    <tr>
      <th scope="row" style="text-align:center;"><img style="max-width:4rem;" src="/images/shiny-server.png" /></th>
      <td>Shiny Server</td>
      <td>Public</td>
      <td>Runs R-based web applications and offers a dynamic, data-driven user interface. <a href="https://www.rstudio.com/products/shiny/shiny-user-showcase/" target="_new">See a <b>demo</b></a> or try using <a target="_new" href="http://lolaweb.databio.org/"><b>LOLAweb</b></a></td>
    </tr>
    <tr>
      <th scope="row" style="text-align:center;"><img style="max-width:4.5rem;" src="/images/mysql_PNG9.png" /></th>
      <td>MySQL Database</td>
      <td>Grounds only</td>
      <td>A stable, easy to use relational database. Run MySQL in support of your HPC projects in Rivanna or web containers.</td>
    </tr>
    <tr>
      <th scope="row" style="text-align:center;"><img style="max-width:6rem;" src="https://dcos.uvasomrc.io/images/mongodb.png" /></th>
      <td>mongoDB Database</td>
      <td>Grounds only</td>
      <td>A popular NoSQL database. Use mongo in support of your Rivanna jobs or web containers.</td>
    </tr>
    <tr>
      <th scope="row" style="text-align:center;"><img style="max-width:4rem;" src="https://dcos.uvasomrc.io/images/redis.svg" /></th>
      <td>Redis Database</td>
      <td>Grounds only</td>
      <td>An extremely fast, durable, key-value database. Use Redis in support of Rivanna jobs or other processes you run.</td>
    </tr>
    <tr>
      <th scope="row" style="text-align:center;"><img style="max-width:4rem;" src="/images/bash_512x512.png" /></th>
      <td>Recurring Tasks</td>
      <td>n/a</td>
      <td>Schedule or automate tasks or data staging using the language of your choice (bash, Python, R, C, Ruby).</td>
    </tr>
  </tbody>
</table>

- - - 

# Pricing

Currently our microservices cluster is in beta testing. We welcome any single-container applications for free, 
either as a deployment listed above or a ready-to-run container that you bring.

Have a more complicated design? [Contact us](http://uvarc.io/support).

- - -

# Singularity

<img align="right" style="max-width:20%;" src="/images/rivanna/singularity-logo.png" alt="Singularity" />

Want to run your container within an HPC environment? It can be done, using Singularity! 

Singularity is a container application targeted to multi-user, high-performance computing systems. It interoperates well with SLURM and with the Lmod modules system. Singularity can be used to create and run its own containers, or it can import Docker containers.

[Read more](/userinfo/rivanna/software/containers/).

- - -

# Requests

Please contact us to discuss your microservice implementation.

{{< button button-url="http://uvarc.io/support" button-class="success" button-text="Submit a Request">}}
