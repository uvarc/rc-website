+++
type = "rivanna"
date = "2025-01-28T00:00:00-05:00"
tags = [
  "rivanna", "software", "machine-learning","deep-learning"
]
draft = true
modulename = "ollama"
softwarename = "Ollama"
title = "Ollama and UVA HPC"
description = "Ollama and UVA HPC"
author = "RC Staff"
+++

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

# Ollama Open OnDemand Interactive App

## Request a session

To get to the interactive app:
1. Open a web browser and go to:  [https://ood.hpc.virginia.edu](https://ood.hpc.virginia.edu).
2. Log in with your Netbadge credentials.
3. Click on "Interactive Apps" on the top bar.
4. In the drop-down menu, click "Ollama."

To fill out the form:
1. Choose a model directory. Select "Predownloaded" if you wish to use the listed models. Otherwise, select "Home" to use your own models.
2. You can only select partitions that contain GPUs. The session will run on one GPU device.
3. Under "Optional GPU Type," choose a GPU type or leave it as "default" (first available).
Click `Launch` to start the session.

This will start Ollama inside a JupyterLab session. The Ollama server is backed by an Apptainer container instance. The python API is provided by a separate module, `ollama-python`.

## Download model

If you selected "Home" for the model directory and wish to download a new LLM, click on File&rarr;New&rarr;Terminal to open a terminal window. Run:
```bash
module load ollama
ollama pull <LLM>
```
where `<LLM>` is the name of the large language model that can be found on the [Ollama Models page](https://ollama.com/search). "Cloud" models require an API key. (Note: For your convenience, we set up an alias `ollama` for the actual Apptainer command. The module load command is necessary to activate the alias.)

To list all available models, run:
```bash
ollama list
```

To remove a model, run:
```bash
ollama rm <LLM>
```

To remove all models, you may simply wipe the directory:
```bash
rm -rf ~/.ollama/models
```

## Sample code

Copy and paste the following to a notebook. You may modify the prompt and the model. The model name must match exactly with those listed in the OOD form.

**Ollama API example**

```python
from ollama import chat
from IPython.display import display, Markdown, clear_output

prompt = "Why is the sky blue?"
model = 'gemma3:27b'

response_stream = chat(
    model=model,
    messages=[{'role': 'user', 'content': prompt}],
    stream=True
)

streamed_response = ""

for token in response_stream:
    streamed_response += token['message']['content']
    clear_output(wait=True)
    display(Markdown(f"**LLM Response (Streaming):**\n\n{streamed_response}"))
```

**OpenAI API example**

```python
import os
from openai import OpenAI
client = OpenAI(base_url=f'http://{os.environ['OLLAMA_HOST']}/v1', api_key='ollama')

response = client.chat.completions.create(
    model = 'gemma3:27b',
    messages = [
        {"role": "system", "content": "You are a friendly dog."},
        {"role": "user", "content": "Do you want a bone?"}
    ]
)
print(response.choices[0].message.content)
```
