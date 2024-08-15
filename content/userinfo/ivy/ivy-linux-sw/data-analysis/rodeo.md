+++
title = "Preinstalled Rodeo on Ivy Linux VM"
date = "2018-01-29T15:45:12-05:00"
description = ""
author = "RC Staff"
images = [""]
categories = ["userinfo"]
tags = [
    "rodeo", 
    "Ivy",
    "linux"
]
draft = false
+++

# Rodeo Overview

Our Linux VMs are installed with Rodeo version 2.5, as of the last update. Rodeo is a lightweight, Python based, IDE for data science.
It has a very streamlined code-to-plot workflow, with easily extensible packages that make it simple to 
analyze difficult patterns in data. It includes many data analysis features under one roof, and adopts features from 
iPython Notebook (it actually runs atop the iPython kernel). Like most Python projects, 
it is open source and available for free. 

## Launching Rodeo

You can launch Rodeo from the Applications menu. It is a self-contained IDE that would not require any knowledge of the command line.
Rodeo can be used in the same manner as any other Python IDE such as iPython Notebook or Jupyter Notebook. 

## Basic Rodeo Usage

It is important to understand that all Python code, such as lists, Dataframes, etc. are saved to the 
*Environment*. We then use the Environment tab to view our data. 

E.g. if you create a Dataframe
 
	df = pd.DataFrame(np.random.rand(50,3),columns=['col1','col2','col3'])

You can then open the ```Environment``` tab to view this in tabular form. 

## Command History in Rodeo

All commands can be viewed under the ```History``` tab


## More Information

For more information, please visit the official [Rodeo website] (https://github.com/yhat/rodeo)



