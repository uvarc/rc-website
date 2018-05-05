+++
categories = [
  "services",
]
tags = [
  "image-processing",
  "hpc",
  "services",
  "matlab",
  "omero",
]
draft = false
date = "2018-01-26T14:18:18-05:00"
title = "Image Processing"
description = ""
author = "SOMRC Staff"
images = [""]

+++

<p class=lead>Automatic image processing allows researchers to perform their work faster for large quantities of data. From image denoising to registration to segmentation, SOM Research Computing can help researchers utilize image processing tools to streamline their analyses.</p>

<hr size=1 style="padding-bottom:10px;" />

# Applications for Researchers

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

<hr size=1 style="padding-bottom:10px;" />

# Commonly Used Software

* **ImageJ/Fiji** - ImageJ is a Java-based image processing program developed at the NIH. ImageJ can be used interactively through a graphical user interface or automatically with Java. Fiji is ImageJ with common plugins pre-installed for scientific image analysis.

* **MATLAB** - Matlab is a numerical computing environment with its own proprietary programming language. Matlab provides an extensive Image Processing Toolbox for with built-in functions for image registration, segmentation, and analysis.

* **Python** - Python is a powerful high-level programming language for general purpose programming. There are several open source packages available in Python for image processing, including: OpenCV, scikit-image, and Python Imaging Library.

* **ANTs** - ANTs, or Advanced Normalization Tools, is a state-of-the-art medical image registration and segmentation toolkit. ANTs works in conjunction with Insight Toolkit (ITK) to read and visualize multidimensional imaging data.

* **R** - R is an open source programming language and computing environment for statistical analysis and data visualization. There are a variety of R packages available for image processing, such as ANTsR, EBImage, and magick.

<hr size=1 style="padding-bottom:10px;" />

# Choosing a Computing Environment

Depending on the amount of data you have, running automatic image processing pipelines on your local machine still might be too slow. In this case, you may be interested in using Rivanna, UVA's High-Performance Computing (HPC) system, or Ivy, UVA's secure HIPAA-compliant computing environment for highly sensitive data.

<hr size=1 style="padding-bottom:10px;" />

# Consulting

SOM Research Computing has experience with image processing and developing pipelines to expedite processing for large datasets. If you have an image processing project and would like to discuss potential solutions and implementation, SOM Research Computing is available for consultation. 

[<button class="btn btn-primary">Request a Consultation</button>](/service/consult/)

<hr size=1 style="padding-bottom:10px;" />

# Training

SOM Research Computing offers interactive workshops for learning image processing and data management techniques. To learn more and register for workshops, please visit the CADRE Academy education platform.

[<button class="btn btn-primary">Find a Workshop</button>](/education/workshops/)
