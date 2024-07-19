+++
images = [""]
author = "Staff"
description = ""
date = "2020-04-26T10:18:25-05:00"
title = "RC Acquires New Accounting Management Software for Rivanna"
draft = false
tags = ["rivanna","accounting"]
categories = ["feature"]
+++

Research Computing will be activating a new accounting management package for Rivanna on June 17, 2020. The software was purchased from Adaptive Computing, which specializes in advanced management applications for high-performance systems. Rivanna users can expect to see more accurate reporting on their Service Unit (SU) balances and burn rates. Information on usage by individual members of an allocation group will also be available.

Commands such as `allocations` will remain but will reflect the new accounting. Users should be aware that the new accounting system implements "liens" on running jobs, and that the SUs requested for each job will be held in a reserved pool until the job completes. When the job completes the lien is released and the _actual_ SUs consumed
are deducted from the allocation balance. That means that fewer SUs will be available while jobs are running. Details are explained in our [FAQ](/userinfo/faq/rivanna-faq/#allocations) section.

Learn more:
- [HPC Overview](/userinfo/hpc)
