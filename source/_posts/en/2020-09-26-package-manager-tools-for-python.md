---
layout: post
title: "Package manager tools for Python"
lang: "en"
permalink: "en/package-manager-tools-for-python"
date: 2020-09-26 22:45:24
comments: true
description: "Package manager tools for Python"
keywords: ""
categories:

tags:

---
 

A package manager is a software tool that automates the process of installing, upgrading, configuring, and removing computer programs/libraries from our machines. For python specifically, we have different alternatives, such as conda, virtualenv, pip, etc. The video below provides us more information about these kind of tools, and highlight the aspects that we should consider when choosing the most appropriate:
<center>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/3J02sec99RM" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</center>
In particular, this blog post will show how to use poetry, an open-source packaging-dependency management tool that gives us all we need to create, build, and publish our python applications. So lets started.

First, we need to install pyenv, a command-line tool that enables us to run multiple python versions in our development machines. It is extremely useful since sometimes we need to check if there are any compatibility issues across different versions. If you come from a javascript background, pyenv is quite similar to NVM( Node version manager). 
I will explain how to do this in Ubuntu, but you can find the instruction for windows in the Github repository. In general, this process is straight-forward:

Run the install command:

`curl https://pyenv.run | bash`

Then, restart your shell, so the path changes take effect:

`exec $SHELL`

You can now begin using pyenv.

```
pyenv install 2.7.15 3.8.0 3.7.0
pyenv local 2.7.15  # Activate Python 2.7 for the current project
```

Another essential aspect of the development process is the scaffolding. Sometimes, it is tricky to determine the best folder structure for our projects. Here it's where poetry comes to the rescue. With a few commands, we can create our project, install and remove dependencies, and perform other actions such as building and packaging our software.
For create our new projects, we just execute the next command in the terminal:

`poetry new mypackage`

Then we install the initial dependencies and set up our project using the pyenv  environment previously activated:

`poetry install`

Building our project and publishing it is just running the `poetry build` and `poetry publish` commands, so it is pretty intuitive. The publish command will submit our application to pip, so other developers can easily install it.

**Some useful resource**
- [Poetry Documentation](https://python-poetry.org/)
- [Pyenv Documentation](https://github.com/pyenv/pyenv)
- [Great talk about poetry](https://www.youtube.com/watch?v=QX_Nhu1zhlg&ab_channel=PyGotham2019)

<center style="margin: 20px">
If you enjoyed this post, I’d be very grateful if you’d help it spread by emailing it to a friend, or sharing it on Twitter or Facebook. 
Thank you!
</center>


