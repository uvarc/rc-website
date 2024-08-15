+++
title = "Preinstalled Java SDK on Ivy Windows VM"
description = ""
author = "RC Staff"
date = "2018-01-29T15:45:12-05:00"
images = [""]
categories = ["userinfo"]
tags = [
    "ivy", 
    "windows"
]
draft = false
+++

# Java SDK Overview

Ivy Windows VMs are installed with Java SDK 1.8. Java is a popular Object-Oriented programming
language and is used in a multitude of scenarios. It is available under the GNU General Public
License for all users. The SDK consists of a large number of tools such as ```javac``` that 
help in application development. 

## Running Java commands from the Command Prompt

Open a Windows Command Prompt and enter ```java``` followed by the desired command. E.g. to find
the version of the SDK

	java -version

## Running your code

To compile java code, first ```cd``` to the location of your ```.java``` file and then do
	
	javac <your_class_name>.java

After the java compiler runs and gives no errors, a ```.class``` file would be created. Run the following command to see the output:

	java <your_class_name>

## Important Note

While Ivy VMs have full support for the Java SDK, certain aspects of programming full-scale Java on Ivy may not work without running into issues.
In order to execute Java programs correctly, please load the entire package into the VM's storage instead of compiling it on the VM. 

## More Information

Please visit the official Oracle documentation to learn more about Java at [this web address](http://www.oracle.com/technetwork/java/javase/documentation/jdk8-doc-downloads-2133158.html).
