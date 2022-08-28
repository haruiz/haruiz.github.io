---
title: Python for Data Science - Part 1
slug: python-for-data-science-part-1
description: Thinking about jumping into a data science role, but you don't know why you should learn how to program and which programming language to choose? In this post, I will show you how to use python and discuss why this programming language is considered one of the top used in data science. 
authors: [haruiz]
tags: [python, data-science]
---
<!--truncate-->

import TermynalReact from "@site/src/components/Termynal";
import ReactPlayer from 'react-player'

## Introduction

Programming is an essential skill for data scientists. If you are considering starting a data science career, the sooner you learn how to code, the better it will be. Most data sciences jobs rely on programming to automate cleaning and organizing data sets, design databases, fine-tune machine learning algorithms, etc. Therefore, having some experience in programming Languages such as Python, R, and SQL makes your life easier and will allow you to automate your analysis pipelines.

In this week's post, we will focus on Python. A general-purpose programming language that allows us to work with data and explore different algorithms and techniques that would be extremely useful to add to our analysis toolbox.

### Why should I learn how to program?


To help organizations make better decisions,  a data scientist is a technical expert who uses mathematical and statistical techniques to manipulate, analyze and extract patterns from raw/noisy data to produce information. Those tools include but are not limited to statistical inference, pattern recognition, machine learning, deep learning, etc. 

Data Scientist's responsibilities involve:

- Work closely with business stakeholders to understand their goals and determine how data can be used to achieve them.  
- Fetching information from various sources and analyzing it to get a clear understanding of how an organization performs
- Undertaking data collection, preprocessing, and analysis
- Building models to address business problems
-  Presenting information in a way that your audience can understand using different data visualization techniques

Although programming is not required to be a data scientist, taking advantage of the power of computers, most of these tasks can be automated. So, programming skills provide data scientists with the superpowers to manipulate, process, and analyze big datasets, automate and develop computational algorithms to produce results (faster and more effectively), and create neat visualizations to present the data more intuitively.

<iframe width="100%" height="400" src="https://www.youtube.com/embed/dU1xS07N-FA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Programming languages for data science

There are hundreds of programming languages out there, built for diverse purposes. Some are better suited for web or mobile development, others for data analysis, etc. Choosing the correct language to use will depend on your level of experience, role, and/or project goals. In the last few years, Python has been ranked as one of the top programming languages data scientists use to manipulate, process, and analyze big datasets.

But why is Python so popular? Well, I will list some reasons why data scientists love Python and what makes this language suitable for high productivity and performance in processing large amounts of data.

### Why Python?

- Python is **open source**, so is freely available to everyone.You can even use it to develop commercial applications.
- Python is **Multi-Platform**. It can be run on any platform, including Windows, Mac, Linux, and Raspberry Pi.
- Python is a **Multi-paradigm** language, which means it can be used for both object-oriented and functional programming. It comes from you writing code in a way that is easy to read and understand.
- Python is **Multi-purpose**, so you can use it to develop almost any kind of application. You can use it to develop web applications, game development, data analysis, machine learning, and much more.
- Python syntax is **easy to read** and **easy to write**. So the learning curve is low in comparison to other languages.
- Data Science **packages ecosystem**: Python also has [PyPI package index,a python package repository](https://pypi.org/), where you can find many useful packages (Tensorflow, pandas, NumPy, etc.), which facilitates and speeds up your project's development. In PyPI, you can also publish your packages and share them with the community. The ecosystem keeps growing fast, and big companies like Google, Facebook, and IBM contribute by adding new packages.Some of the most used libraries for data science and machine learning are:

  - [Tensorflow](https://www.tensorflow.org/), a high-performance numerical programming library for deep learning.
  - [Pandas](https://pandas.pydata.org/), a Python library for data analysis and manipulation.
  - [NumPy](https://www.numpy.org/), a Python library for scientific computing ( that offers an extensive collection of advanced mathematical functions, including linear algebra, Fourier transforms, random number generation, etc.)
  - [Matplotlib](https://matplotlib.org/), a Python library for plotting graphs and charts.
  - [Scikit-learn](https://scikit-learn.org/stable/index.html), a Python library for machine learning.
  - [Seaborn](https://seaborn.pydata.org/), a Python library for statistical data visualization.

- **High performance:** Although some people complain about performance in Python (see [Why Python is so slow and how to speed it up](https://towardsdatascience.com/why-is-python-so-slow-and-how-to-speed-it-up-485b5a84154e)), mainly caused by some features such as dynamic typing, it is also simple to extend developing modules in other compiled languages like C++ or C which could [speed up your code by 100x.](https://towardsdatascience.com/write-your-own-c-extension-to-speed-up-python-x100-626bb9d166e7)
  
The following section will introduce you to the Python programming language, and we will start learning its syntax.

## Hands-on Tutorial

:::tip
To set up our python environment, we will use `pyenv` and `poetry.` You can learn more about these tools in the previous post.
[Python environments with pyenv and poetry](/blog/python-environments-with-pyenv-and-poetry)
:::

We will start with a simple program that prints "Hello World" on the screen, and from there, we will begin navigating into the python syntax, learning some of its keywords and essential building blocks. Start creating a folder called "python_demo" and a file called "hello_world.py." To do so, run the following commands in the terminal:

<TermynalReact lines ={[
{ type: 'input', value: 'cd workspace' , comment: "moving into the workspace directory. It could be any folder in your machine where you want to have your python_demo folder"},
{ type: 'input', value: 'mkdir python_demo' , comment: "creating the python_demo folder inside the workspace folder" },
{ type: 'input', value: 'cd python_demo' , comment: "going into the python_demo folder" },
{ type: 'input', value: 'touch hello_world.py' , comment: "creating the hello_world.py file inside the python_demo folder, in windows use the command type" },
{ type: 'input', value: "pyenv version", comment: "checking the python version being used by pyenv to create the Python environment"},
{ type: "output", value: "python 3.10.0"},
{ type: "input", value: "poetry init", comment: "initialize poetry project into the python_demo directory"},
{ type: "input", value: "poetry install", comment: "create python environment within the folder"}
]} />

If all the command runs successfully, you should see the following folder structure:

    ├── python_demo
    │   ├── hello_world.py
    │   ├── poetry.lock
    │   └── pyproject.toml

And the `pyproject.toml` file should look like this:

    [tool.poetry]
    name = "python_demo"
    version = "0.1.0"
    description = ""
    authors = ["Henry Ruiz  <henryruiz22@gmail.com>"]
    
    [tool.poetry.dependencies]
    python = "^3.10"
    
    [tool.poetry.dev-dependencies]
    
    [build-system]
    requires = ["poetry-core>=1.0.0"]
    build-backend = "poetry.core.masonry.api"

You can see that the Python version was set to 3.10.0. that will depend on the version of Python you are using with pyenv.

:::tip
To check the python version run the command `pyenv version` in the terminal.
:::

To open our python_demo folder in pycharm check the animation below.

<ReactPlayer playing controls url={require("./open-folder-pycharm.mp4").default} />

At this point, you should know how to create and run python files. So, in the coming tutorials, we will be working on the hello_world.py file, exploring the python syntax and learn cool things about python, and data science.

Thanks for reading!, and I hope this tutorial helped you to get started with Python.
