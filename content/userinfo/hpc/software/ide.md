+++
type = "rivanna"
images = [
  "/2016/10/image.jpg",
]
categories = [
  "HPC",
  "software",
]
date = "2024-01-02T00:00:00-05:00"
tags = []
draft = false
shorttitle = "IDEs and Editors"
title = "IDEs and Editors"
description = "Integrated Development Environments (IDEs) and Editors in the HPC environment"
author = "RC Staff"

+++

# Editors

Several text editors are available on the HPC system.  Most provide features such as syntax coloring.  

## Vim (Vi iMproved)

[Vim](https://www.vim.org) is an updated version of the early Unix text editor _vi_ (for "visual").  It provides many extensions over plain vi.  On the HPC system, the `vi` command is equivalent to the `vim` command.  Vim is primarily utilized through keyboard commands.  Once learned, it is extremely efficient to use.  Many tutorials can be found online such as [https://vim.fandom.com/wiki/Tutorial](https://vim.fandom.com/wiki/Tutorial).

## Emacs

[Emacs](https://www.gnu.org/software/emacs/) is another well-known Unix text editor. Like vim, it is largely operated through the keyboard.  It can run a compiler and debugger so has some of the capabilities of an IDE.  An introduction can be found [here](https://www.gnu.org/software/emacs/tour/index.html).

## Nano

[Nano](https://www.nano-editor.org/) is a simplified version of Emacs. It is easy to use and mostly self-explanatory.  An introduction is available at its homepage.

## Pluma

[Pluma](https://en.wikipedia.org/wiki/Pluma_\(editor\)) is a simple WYSIWYG text editor provided by the MATE desktop.  It is a variant of gedit and we provide an alias to it, so either name should work. It is very similar to Notepad++ on Windows and can do syntax coloring.

# IDEs

An Integrated Development Environment (IDE) provides more features than a text editor.  They are nearly all graphical in nature and so must be used through a graphics-capable frontend.  On the HPC system we recommend using them via [FastX](/userinfo/hpc/logintools/fastx).

## Geany

[Geany](https://geany.org/) is a lightweight IDE.  In some respects it is intermediate between a text editor such as pluma and a full-featured IDE. It is capable of managing building C/C++/Fortran programs, including through make.  It provides syntax coloring for many languages other than the three compiled languages.  It is accessed through a module:
```
module load geany
```

{{% module-versions module="geany" %}}


## Code Server

See [here](/userinfo/hpc/software/code-server)

{{% module-versions module="code-server" %}}
