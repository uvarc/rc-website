+++
categories = ["services"]
images = []
description = ""
title = "Image Processing & Scientific Visualization"
author = "Christina Gancayco"
tags = [
  "vizlab",
  "imaging",
  "image-processing",
  "omero",
  "radiology",
]
date = "2019-06-24"
draft = false
toc = true

+++

<p class="lead">
<b>Image Processing</b> and <b>Scientific Visualization</b> are two separate processes 
within the scientific research lifecycle, yet the two concepts often play off of one 
another. Image processing refers to the enhancement and transformation of images to 
prepare them for quantitative analysis. Scientific visualization is the graphical communication 
of data so that trends and anomalies can be more easily recognized. UVa Research Computing 
offers many services and resources to help researchers augment their work with image 
processing and scientific visualization techniques.
</p>

- - -

# Image Processing

## Overview

<img src="/images/image-processing.jpg" style="float:right;" class="project-inset" />

Image processing encompasses a variety of techniques to prepare images for analysis. 
Researchers often need to remove noise artifacts from their imaging data, or they need to 
analyze particular regions of interest. While manual image manipulation can easily yield 
the desired results, this can be time-consuming or even impossible with the amount of data 
we are able to collect with high throughput screening. By automating image processing steps 
such as noise filtering and segmentation, researchers are able to perform their work faster 
and for larger quantities of data.

## Common Image Processing Techniques

The following techniques are commonly employed in imaging research. All of these processes 
can be automated and run locally on your computer or on Rivanna, UVa's high performance 
computing (HPC) cluster. With the parallelization capabilities of HPC, it is possible to 
fully process and analyze a large imaging data set in a few hours or less!

<table class="table table-striped">
	<tbody>
		<tr>
		<th scope="row" style="width:25%;font-weight:bold;">Preprocessing</th>
			<td>
				<img src="/images/preprocessing.png" alt="Workflows" align="right" style="max-width:40%;padding:10px;" />
				Image preprocessing can help enhance the quality of your images. Common preprocessing techniques include adjusting brightness and contrast, removing noise, sharpening images, and performing geometric and color transformations.
			</td>
		</tr>
		
		<tr>
		<th scope="row" style="width:25%;font-weight:bold;">Segmentation</th>
			<td>
				<img src="/images/segmentation.png" alt="Workflows" align="right" style="max-width:40%;padding:10px;" />
				Image segmentation is useful for determining one or multiple regions of interest. Segmentation can be used to identify foreground objects, cell boundaries, or tissue types. 
			</td>
		</tr>
		
		<tr>
		<th scope="row" style="width:25%;font-weight:bold;">Registration</th>
			<td>
				<img src="/images/register.png" alt="Workflows" align="right" style="max-width:40%;padding:10px;" />
				Image registration is useful when comparing two or more objects of differing size or morphological features. Registration can be used to align 2D or 3D images through linear or non-linear algorithms.
			</td>
		</tr>
		
		<tr>
		<th scope="row" style="width:25%;font-weight:bold;">Analysis</th>
			<td>
				Image analysis is the measurement and statistical analysis of meaningful features in your imaging data, such as area or volume of a region of interest and mean intensity value throughout an image.
			</td>
		</tr>
		
	</tbody>
</table>

## Popular Software

* **ImageJ/Fiji** - ImageJ is a Java-based image processing program developed at the NIH. 
ImageJ can be used interactively through a graphical user interface or automatically with 
Java. Fiji is ImageJ with common plugins pre-installed for scientific image analysis.

* **MATLAB** - Matlab is a numerical computing environment with its own proprietary 
programming language. Matlab provides an extensive Image Processing Toolbox for with 
built-in functions for image registration, segmentation, and analysis.

* **Python** - Python is a powerful high-level programming language for general purpose 
programming. There are several open source packages available in Python for image 
processing, including: OpenCV, scikit-image, and Python Imaging Library.

* **ANTs** - ANTs, or Advanced Normalization Tools, is a state-of-the-art medical image 
registration and segmentation toolkit. ANTs works in conjunction with Insight Toolkit 
(ITK) to read and visualize multidimensional imaging data.

* **R** - R is an open source programming language and computing environment for 
statistical analysis and data visualization. There are a variety of R packages available 
for image processing, such as ANTsR, EBImage, and magick.

## Additional Resources

We currently offer online tutorials for image processing with Fiji/ImageJ. 

* [Introduction to Scientific Image Processing with Fiji/ImageJ](https://workshops.rc.virginia.edu/lesson/intro-fiji-imagej/)
* [Fiji/ImageJ: Script Development for Image Processing](https://workshops.rc.virginia.edu/lesson/fiji-scripting/)

Stay tuned for additional online tutorials as well as in-person workshops listed on our education 
platform, [CADRE Academy!](https://education.cadre.virginia.edu/#/home)

{{< education-track "278" >}}

- - -

# Visualization

## Overview

Visualization is the conversion of data into plots or images in order to view various 
features of the data. As humans, we are able to absorb large amounts of information through 
sight. We can use visualizations as an exploratory tool to gain insight into the data we 
collect and to create hypotheses for relationships. We can also use visualizations to 
communicate ideas to others.

## Popular Software

<!-- * **R** - R is popular among data scientists for its plethora of data manipulation and 
analysis packages, but it is also widely used for its visualization tools such as **ggplot2**. 
**ggplot2** is part of the R tidyverse, a collection of packages dedicated to data science. 

* **Python** - Python has a variety of popular data visualization packages including **matplotlib**, 
**seaborn**, and **bokeh**. These packages work well Python's other data science packages, such as 
**pandas** for data manipulation and **TensorFlow** for machine learning. -->

* **MATLAB** - MATLAB contains many built-in functions for data visualization, including those 
for 3D surfaces and meshes. MATLAB is also capable of medical image visualization and is 
compatible with DICOM and NIFTI filetypes.

* **ParaView** - ParaView is an open-source application for visualization and analysis of 
data defined on meshes or grids. It allows for visualization of 2D or 3D data and is good 
for general purpose, rapid visualization.

* **VisIt** - VisIt is software for the visualization of data defined on meshes or grids. It is 
compatible with file types that have an underlying HDF5 format.

* **Blender** - Blender is a 3D graphics software that can be used for creating 3D objects and 
animations. It can be used for 3D modeling, rendering, motion tracking, and video 
editing.

* **Unity** - Unity is a cross-platform software application for the creation of visualizations 
in augmented and virtual reality. 


## Additional Resources

We currently offer several online tutorials for data visualization.

* [MATLAB Data Processing and Visualization](https://workshops.rc.virginia.edu/lesson/matlab-data-visualization/)

Stay tuned for additional online tutorials as well as our workshops posted on [CADRE Academy!](https://education.cadre.virginia.edu/#/home)

{{< education-track "283" >}}

- - -

# Viz Lab

The Viz Lab is a facility designed to help UVA faculty, staff, and students explore the 
power of visualization in research and education.

By allowing researchers to interactively view data, the Viz Lab helps them find 
innovative ways of translating data into images and see stacks of images as 
three-dimensional models. Discoveries can be made and visual results shared with remote 
collaborators through a Cisco system.

Find out what your data are telling you!

## Systems and Resources

### Virtual Reality Environment (Touch Table II & HTC Vive)      
<div class="bd-callout bd-callout-warning">
  Touch Table II is a 65" ultra high-definition monitor with capacitative touch that is 
  driven by a computer with 64GB RAM and two NVidia GeForce 970 Graphics cards. It interacts 
  with an HTC Vive headset which allows users to experience the wonders of virtual reality.
</div>

### Visualization Environment (Touch Table I & the Viz Wall)
<div class="bd-callout bd-callout-warning">
  Touch Table I consists of a 55" monitor with touch capability that can be used to interact 
  with images on the Viz Wall. It is driven by a computer with 64GB RAM and one NVidia Quadro 
  2000 Graphics card. The Viz Wall is a 4' X 7.5' MicroTile system with a resolution of 7.76 
  Mpixels developed by Christie Digital.
</div>

### GPU Environment (Escher)
<div class="bd-callout bd-callout-warning">
  Escher is a high-end graphics workstation with 64 GB RAM and two NVidia GeForce Titan 
  Graphics cards.  This machine is available to researchers upon request.
</div>

## Training

The Viz Lab is conveniently located in Rice Hall on the south end of UVA's historic Grounds. 
To request a tour of the Viz Lab or to receive training on the equipment, simply fill out 
and submit [this form](https://arcs.virginia.edu/viz-lab-contact-form).

<iframe width="100%" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJNVN8Z1uGs4kR7JcEE4iqkGQ&key=AIzaSyDlPVTTX5CpSjoyzqXOpHxxV3xBNbiC2nI" allowfullscreen></iframe>

## Viz Lab Calendar

The Viz Lab is open to UVA researchers Monday-Friday during normal business hours. Extended 
access is available to those with longer-term research projects. The calendar below is updated 
regularly and shows the days/times the Viz Lab is unavailable. To reserve your time slot(s), 
please contact us through [this form](https://arcs.virginia.edu/viz-lab-contact-form).

<!-- google calendar embedded here-->

<iframe frameborder="0" height="600" scrolling="no" src="https://calendar.google.com/calendar/embed?src=dvndpkvnloa8bvt5nre3d5n9as%40group.calendar.google.com&amp;ctz=America/New_York" style="border: 0" width="800"></iframe>
