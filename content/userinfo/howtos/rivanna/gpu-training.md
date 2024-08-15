+++
type = "howto"
date = "2022-06-27T15:15:46-05:00"
tags = [
  "rivanna", "software", "gpu", "machine learning"
]
categories = ["howto"]
draft = true
title = "Running python ML models on gpu"
description = "Running ML models on gpu"
author = "RC Staff"

+++

# Training Deep learning models on GPU(s)

Running large scale machine learning models typically requires the user leverage GPU's to speed up 
computation. In this how-to we overview how to use gpu's , and in particular multiple gpu's, to run large
tensorflow and pytorch machine learning models more efficiently.

## Tensorflow

Tensorflow is capable of automatically detecting if there are GPU devices available, and will run on them by default.
To check what devices, including GPU's, are available to tensorflow in a given computing environment,
you can run  

```
device_list = tf.config.list_physical_devices(device_type=None)
```
Then specify which device you want to run computations on, merely set the 
environment variable `CUDA_VISIBLE_DEVICES` to the index of the device 
you want to run on in the devices list. ex: 
```
device_list = [PhysicalDevice(name='/physical_device:CPU:0', device_type='CPU'),
 PhysicalDevice(name='/physical_device:GPU:0', device_type='GPU')]

CUDA_VISIBLE_DEVICES = "0" # to run on CPU:0
CUDA_VISIBLE_DEVICES = "1" # to run on CPU:1
CUDA_VISIBLE_DEVICES = "0,1" # will run on GPU by default since both available
```
### Tensorflow multi-gpu with Tf.distribute

Tensorflow GPU paralellization is principally handled through the [Tf.distribute](https://www.tensorflow.org/api_docs/python/tf/distribute) API.
We overview how to modify a tensorflow script to run on multiple GPU's.The below code defines a simple NN with 1 hidden layer for classification.

```
from keras.models import Sequential 
from keras.layers import Dense, Dropout 
from keras.utils import to_categorical 
from keras.optimizers import SGD

def define_model():
    model = Sequential() 

    model.add(Dense(30, activation='relu', input_dim=30)) 
    model.add(Dropout(0.5)) 
    model.add(Dense(60, activation='relu')) 
    model.add(Dropout(0.5)) 
    model.add(Dense(2, activation='softmax')) 
    return model
```

In order to distribute this model onto multiple GPU's it suffices to wrap our model definition in the 
mirrored_strategy.scope() class provided by Tf.distribute, as below:


```
mirrored_strategy = tf.distribute.MirroredStrategy()
with mirrored_strategy.scope():
    def define_parallel_model():

        model = Sequential() 

        model.add(Dense(30, activation='relu', input_dim=30)) 
        model.add(Dropout(0.5)) 
        model.add(Dense(60, activation='relu')) 
        model.add(Dropout(0.5)) 
        model.add(Dense(2, activation='softmax')) 
        return model
```

To run on selected GPU's pass a list containing those device names into the Mirrored_Strategy invocation, 


Ex: `mirrored_strategy = tf.distribute.MirroredStrategy([["GPU:0", "GPU:1"]])`
 
The 'strategy' in `MirroredStrategy` refers to a particular way of distributing computations between devices.
mirror_strategy will be the most common used in mutli_gpu training, it creates a version of each model variable
on each device, and assigns some subset of the data to each. All mirror versions of each variable are used collectively 
to update the aggregate 'full model' version of the variable.
There are other such strategies available through the API, including `TPUStrategy` for training on TPU's
`MultiWorkerMirroredStrategy`, which is like `MirroredStrategy` except every worker can be assigned to more than 1 GPU,
and others. `tf.distribute` is typically used with the `model.fit` training functionality from
keras, but also provides supports custom training loops thought this 
requires more extensive code modification. For instruction on using `tf.distribute` with custom 
 training loops, as well as other additional docs, see : [tf.distribute docs](https://www.tensorflow.org/guide/distributed_training)


## Pytorch

Unlike tensorflow, pytorch does not automatically detect GPU devices and set models run on 
them preferentially. In order to get pytorch models onto GPU(s) one must manually assign the model
and all related tensors, to a GPU device. Example code is given below:


```
def train_model(epochs = 5):
    net = My_NN()
    optimizer = optim.Adam(net.parameters(), lr = 0.001)
    for epoch in range(epochs):
        for data in trainset:
            #data is batch of image tensor and label tensor
            X, y = data
            
            net.zero_grad()
            output = net(X.view(-1, 28*28))
            loss = F.nll_loss(output, y)
            loss.backward()
            optimizer.step() 
```

We detect if a GPU device are available, and if so assign it to the 'device' variable

```
if torch.cuda.is_available():
    device = torch.device("cuda:0")
    print('Running on GPU')
else: 
    device = torch.device("cpu")
    print('Running on CPU')

```

Now we assign the model and all relevant tensors to the device with the `.to` method:

```
def train_model(epochs = 5):
    net = My_NN().to(device)                    # model assigned to cuda device
    optimizer = optim.Adam(net.parameters(), lr = 0.001)
    for epoch in range(epochs):
        for data in trainset:
            #data is batch of image tensor and label tensor
            X, y = data
            X, y = X.to(device), y.to(device)   # model assigned to  cuda device
            
            net.zero_grad()
            output = net(X.view(-1, 28*28))
            loss = F.nll_loss(output, y)
            loss.backward()
            optimizer.step() 
```


### Pytorch multi-gpu with Pytorch_Lightning

The easiest way to parallelize training of pytorch models to multiple GPU's and even multiple nodes is to 
use the Pytorch lighting API. This is a wrapper on top of pytorch which automates a lot of the boiler and 
facilitates parallelization. We explain the structure of Pytorch lighting code below.
 

```
import torch
import torch.nn as nn
import torchvision
import torchvision.transforms as transforms
import torch.utils.data as data
import torch.nn.functional as F
import matplotlib.pyplot as plt
import pytorch_lightning as pl
from pytorch_lightning import Trainer

class My_NN(pl.LightningModule):
    
    def __init__(self, input_size, hidden_size, num_classes): 
        super(LitNeuralNet, self).__init__()
        self.input_size = input_size
        self.l1 = nn.Linear(input_size, hidden_size)
        self.relu = nn.ReLU()
        self.l2 = nn.Linear(hidden_size, num_classes)

    def forward(self, x):
        out = self.l1(x)
        out = self.relu(out)
        out = self.l2(out)
        # no activation and no softmax at the end
        return out

```

The basis for the code is to create our model as a derived class of the pl.LightningModule class we include the standard init and forward methods, as well as other methods delineated by pytorch lightning.

```
    def training_step(self, batch, batch_idx):  
        images, labels = batch
        images = images.reshape(-1, 28 * 28)

        # Forward pass
        outputs = self(images)
        loss = F.cross_entropy(outputs, labels)
        
        tensorboard_logs = {'train_loss': loss}
        # use key 'log'
        return {"loss": loss, 'log': tensorboard_logs}

    # define what happens for testing here
```

The above training step would correspond to this training loop:

```
def train_model(epochs = 5):
    
    optimizer = optim.Adam(net.parameters(), lr = 0.001)
     #learning rate, improves convergence rate and regularization
    for epoch in range(epochs):
        t_0 = datetime.now()
        for data in trainset:
            #data is batch of image tensor and label tensor
            X, y = data
            
            X = X.to(device)
            y = y.to(device)
            
            net.zero_grad()
            output = net(X.view(-1, 28*28))
            loss = F.nll_loss(output, y)
            loss.backward()
            optimizer.step()

```


The training_step method delineates the content of the training loop, including last minute pre-processing
the forward pass of a batch of data through the model, and calculation of loss. The backward pass is taken care of
automatically.


```
    def prepare_data(self):
        torchvision.datasets.MNIST('data', train=True, transform=transforms.ToTensor(), download=True)
        # Takes place on 1 gpu, do 1 time operations here
        
    
    def setup(self, stage=None):
        train_data  = torchvision.datasets.MNIST('data', train=True, transform=transforms.ToTensor(), download=False)
        self.train_split, self.val_split = data.random_split(train_data, [55000, 5000])
        # Takes place on all gpu's

```
The setup and prepare_data methods are used in paralellization. prepare_data is called once, on one device. This should
be used for any computationally intensive data preprocessing or acquisition which should not be repeated on all devices/gpu's.
The setup method is called on every GPU. Its function is to set up that gpu's instance of the data. 

```
    def train_dataloader(self):
       # Data loader
        train_loader = torch.utils.data.DataLoader(dataset=self.train_split, batch_size=batch_size, shuffle=False)
        return train_loader

    def val_dataloader(self):
        val_loader = torch.utils.data.DataLoader(dataset=self.val_split, batch_size=batch_size,  shuffle=False)
        return val_loader
   

```

The dataloader methods function to load the data into batches, both for training and validation.

```
    def validation_step(self, batch, batch_idx):
        images, labels = batch
        images = images.reshape(-1, 28 * 28)

        # Forward pass
        outputs = self(images)
                        
        loss = F.cross_entropy(outputs, labels)
        return {"val_loss": loss}
```

The validation step method is the analog to training_step, but for the validation loop.

```
    def validation_epoch_end(self, outputs):
        # outputs = list of dictionaries
        avg_loss = torch.stack([x['val_loss'] for x in outputs]).mean()
        tensorboard_logs = {'avg_val_loss': avg_loss}
        # use key 'log'
        return {'val_loss': avg_loss, 'log': tensorboard_logs}

    def configure_optimizers(self):
        return torch.optim.Adam(self.parameters(), lr=learning_rate)
```

The validation_epoch_end method is called at the end of a validation epoch, calculates metrics such as loss 
returns in dict. The configure_optimizers method sets the optimizer, in this case Adam.

```
class My_NN(pl.LightningModule):
    def __init__(self, ...

    def forward(self, ...

    def training_step(self, ...

    def prepare_data(self, ...        # if doing mutli gpu

    def setup(self, ...               # if doing mutli gpu
    
    def train_dataloader(self, ...

    def val_dataloader(self, ...

    def validation_step(self, ...

    def validation_epoch_end(self, ...

    def configure_optimizers(self, ...
    
    def <additioanl method 1>(self, ...
    
    def <additioanl method n>(self, ...



if __name__ == '__main__':
    model = LitNeuralNet(input_size, hidden_size, num_classes)
    trainer = Trainer(max_epochs=num_epochs, gpus=2, nodes = 1, accelerator='dp')
    trainer.fit(model)

```


After defining the pl.LightningModule class with the methods above, and whatever other custom or pl.LightningModule
are needed, the model is trained using the `pytorch_lightning.Trainer` class. This class allows one to automate
parellelization to as many gpus and nodes as one has available.

See additional docs at: [pytorch-lightning docs](https://pytorch-lightning.readthedocs.io/en/stable/)
