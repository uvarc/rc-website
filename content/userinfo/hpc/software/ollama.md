+++
type = "rivanna"
date = "2025-12-08T00:00:00-05:00"
tags = [
  "rivanna", "software", "machine-learning","deep-learning"
]
draft = false
modulename = "ollama"
softwarename = "Ollama"
title = "Ollama and UVA HPC"
description = "Ollama and UVA HPC"
author = "RC Staff"
+++

# Description
{{% module-description %}}

**Software Category:** {{% module-category %}}

For detailed information, visit the [{{% software-name %}} website]({{< module-homepage >}}).

# Available Versions
To find the available versions and learn how to load them, run:

```
module spider {{< module-name >}}
```

The output of the command shows the available {{% software-name %}} module versions.

For detailed information about a particular {{% software-name %}} module, including how to load the module, run the `module spider` command with the module's full version label. __For example__:
```
module spider {{% module-firstversion %}}
```

{{< module-versions >}}

# Ollama Command Line
You can run the container directly if you are familiar with the ollama commands. For most users we recommend the Open OnDemand interactive app as detailed in the next section.

## Download model
We have prepared a script `pullm` to simplify the model download process. Open a terminal, load the module, and run:
```bash
pullm LLM
```
where `LLM` is the name of the large language model that can be found on the [Ollama Models page](https://ollama.com/search).

# Ollama Open OnDemand Interactive App

## Request a session

To get to the interactive app:
1. Open a web browser and go to:  [https://ood.hpc.virginia.edu](https://ood.hpc.virginia.edu).
2. Use your “Netbadge” credentials to log in.
3. On the top right of the menu bar of the Open OnDemand dashboard, click on `Interactive Apps`.
4. In the drop-down box, click on `Ollama`.

To fill out the form:
1. Choose a model directory. Select "Predownloaded" if you wish to use the listed models. Otherwise, select "Home" to use your own models.
2. You can only select partitions that contain GPUs. The session will run on one GPU device.
3. Under Optional GPU Type, choose a GPU type or leave it as "default" (first available).
Click `Launch` to start the session.

This will start Ollama inside a JupyterLab session. The Ollama server is backed by an Apptainer container instance. The python API is included in a separate module, `ollama-python`.

## Sample code

Copy and paste the following to a notebook. You may modify the prompt and the model. The model name must match exactly with those listed in the OOD form.

```python
from ollama import chat
from IPython.display import display, Markdown, clear_output

prompt = "Why is the sky blue?"

response_stream = chat(
    model='gemma3:27b',
    messages=[{'role': 'user', 'content': prompt}],
    stream=True
)

streamed_response = ""

for token in response_stream:
    streamed_response += token['message']['content']
    clear_output(wait=True)
    display(Markdown(f"**LLM Response (Streaming):**\n\n{streamed_response}"))
```
