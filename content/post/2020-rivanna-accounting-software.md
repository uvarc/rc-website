+++
images = [""]
author = "Staff"
description = ""
date = "2020-04-26T10:18:25-05:00"
title = "RC Acquires New Accounting Management Software for Rivanna"
draft = false
tags = ["Rivanna","accounting"]
categories = ["feature"]
+++

Research Computing will be activating a new accounting management package for Rivanna on June 17, 2020. The software was purchased from Adaptive Computing, which specializes in advanced management applications for high-performance systems. Rivanna users can expect to see more accurate reporting on their Service Unit (SU) balances and burn rates. Information on usage by individual members of an allocation group will also be available.

Commands such as `allocations` will remain but will reflect the new accounting. Users should be aware that the new accounting system implements "liens" on running jobs, and that the SUs requested for each job will be held "in escrow" until the job completes. After a job completes, the actual SUs used will be deducted from the allocation and any unused SUs will be released from escrow. This will prevent balances from becoming negative, but means that fewer SUs will be available while jobs are running.

Learn more:
- [Rivanna Allocations](/userinfo/rivanna/allocations/)
- [Rivanna Overview](/userinfo/rivanna/overview/)
