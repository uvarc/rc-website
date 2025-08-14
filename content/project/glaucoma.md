+++
title = "Deep Learning for Glaucoma Patient Risk Stratification"
description = ""
author = "RC Staff"
date = "2025-08-14"
images = "/images/projects/glaucoma.png"
categories = ["projects"]
tags = [
  "data",
  "hpc",
  "data-science",
  "machine-learning"
]
draft = false
projecttype = ["hpc-computing", "dac", "data-science"]
+++

Glaucoma is a chronic eye disease that can lead to irreversible vision loss if not properly managed. Effectively stratifying patient risk is a major clinical challenge, as clinicians need tools to identify patients at high risk of progression from sparse and irregularly-sampled electronic health records. Traditional forecasting methods struggle with the irregular time-series data typical of EHRs, where features vary with visits and occur at different intervals. Towards developing these critical risk identification tools, DAC consultants collaborated with Dr. Heman Shakeri’s lab from the School of Data Science as well as with advice from clinicians to develop a novel deep kernel learning architecture that leverages a Gaussian Process backend with a transformer-based feature extractor to model glaucoma patient trajectories from multimodal EHR data.
Using pre-trained clincal-BERT embeddings and multi-modal features (NLP, tabular, etc) to improve predictive calibration, this collaboration led to the following key outcomes:
* Development of a model that successfully identified three clinically distinct patient subgroups by decoupling current disease severity from future progression risk
* Discovery that patients with moderate vision but high trajectory variance represent a high-risk group requiring intensive monitoring, despite having better average visual acuity than chronically poor but stable patients
* Achievement of high accuracy within 0.1 logMAR with calibrated uncertainty estimates that correctly identify patients with volatile disease courses
* Creation of deep kernel learning models that either matched or outperformed traditional recurrent neural network and transformer-based forecasting methods
This collaboration demonstrates the model's ability to identify progression risk rather than just current disease state, offering a powerful tool for clinical decision support that enables targeted interventions for high-risk individuals and improved management of glaucoma care.
PI: Dr. Heman Shakeri, PhD (School of Data Science)
  
**PI: Heman Shakeri, PhD (School of Data Science)**

