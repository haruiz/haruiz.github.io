"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[477],{10:e=>{e.exports=JSON.parse('{"blogPosts":[{"id":"package-manager-tools-for-python","metadata":{"permalink":"/blog/package-manager-tools-for-python","editUrl":"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/blog/2022-07-29T18:34:13.162Z-Package-manager-tools-for-Python.md","source":"@site/blog/2022-07-29T18:34:13.162Z-Package-manager-tools-for-Python.md","title":"Package manager tools for Python","description":"A package manager is a software tool that automates the process of installing, upgrading, configuring, and removing computer programs/libraries from our machines. For python specifically, we have different alternatives, such as conda, virtualenv, pip, etc.  The video below provides us more information about these kind of tools, and highlight the aspects that we should consider when choosing the most appropriate:","date":"2022-07-29T00:00:00.000Z","formattedDate":"July 29, 2022","tags":[{"label":"python","permalink":"/blog/tags/python"},{"label":"data-science","permalink":"/blog/tags/data-science"}],"readingTime":2.31,"hasTruncateMarker":true,"authors":[{"name":"Henry Ruiz","title":"Blog Author","url":"https://github.com/haruiz","imageURL":"https://github.com/haruiz.png","key":"haruiz"}],"frontMatter":{"slug":"package-manager-tools-for-python","title":"Package manager tools for Python","authors":["haruiz"],"tags":["python","data-science"]}},"content":"import TermynalReact from \\"@site/src/components/Termynal\\";\\n\\nA package manager is a software tool that automates the process of installing, upgrading, configuring, and removing computer programs/libraries from our machines. For python specifically, we have different alternatives, such as conda, virtualenv, pip, etc. \x3c!--truncate--\x3e The video below provides us more information about these kind of tools, and highlight the aspects that we should consider when choosing the most appropriate:\\n<p align=\\"center\\">\\n<iframe width=\\"100%\\" height=\\"400px\\" src=\\"https://www.youtube.com/embed/3J02sec99RM\\" frameborder=\\"0\\" allow=\\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\\" allowfullscreen></iframe>\\n</p>\\nIn particular, this blog post will show how to use poetry, an open-source packaging-dependency management tool that gives us all we need to create, build, and publish our python applications.\\n\\nSo lets started!!.\\n\\nFirst, we need to install pyenv, a command-line tool that enables us to run multiple python versions in our development machines. It is extremely useful since sometimes we need to check if there are any compatibility issues across different versions. If you come from a javascript background, pyenv is quite similar to NVM( Node version manager). I will explain how to do this in Ubuntu, but you can find the instruction for windows in the Github repository. In general, this process is straight-forward:\\n\\nRun the install command:\\n\\n[//]: # (```bash)\\n\\n[//]: # (curl https://pyenv.run | bash)\\n\\n[//]: # (```)\\n\\n<TermynalReact lines ={{\\n    lineData: [\\n        { type: \'input\', value: \'curl https://pyenv.run | bash\' }\\n    ]}}\\n    style={{\\n    minHeight: 100,\\n    marginTop: 20,\\n    marginBottom: 20\\n    }}\\n/>\\n\\n\\nThen, restart your shell, so the path changes take effect:\\n\\n```bash\\nexec $SHELL\\n```\\n\\nYou can now start using pyenv.\\n\\ninstall python 2.7, 3.8 and 3.7 in the same machine:\\n```bash\\npyenv install 2.7.15 3.8.0 3.7.0\\n```\\n\\nActivate Python 2.7 on the current folder\\n```bash\\npyenv local 2.7.15\\n```\\n\\nAnother essential aspect of the development process is the scaffolding. Sometimes, it is tricky to determine the best folder structure for our projects. Here it\u2019s where poetry comes to the rescue. With a few commands, we can create our project, install and remove dependencies, and perform other actions such as building and packaging our software. For create our new projects, we just execute the next command in the terminal:\\n```bash\\npoetry new mypackage\\n```\\n\\nThen we install the initial dependencies and set up our project using the pyenv environment previously activated:\\n\\n```bash\\npoetry install\\n```\\n:::tip\\nBuilding our project and publishing it is just running the ```poetry build``` and ```poetry publish``` commands, so it is pretty intuitive. The publish command will submit our application to pip, so other developers can easily install it.\\n:::\\n**Some useful resource**\\n- [Poetry Documentation](https://python-poetry.org/)\\n- [Pyenv Documentation](https://github.com/pyenv/pyenv)\\n- [Great talk about poetry](https://www.youtube.com/watch?v=QX_Nhu1zhlg&ab_channel=PyGotham2019)\\n\\nIf you enjoyed this post, I\u2019d be very grateful if you\u2019d help it spread by emailing it to a friend, or sharing it on Twitter or Facebook. \\nThank you!"}]}')}}]);