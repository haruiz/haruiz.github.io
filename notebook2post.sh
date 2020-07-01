#!/bin/bash
# Ask the user for their name
read -p 'notebook path: ' notebookvar
read -p 'blog title: ' titlevar
read -p 'language: ' langvar
langvar=${langvar:-en}
titlevar=${titlevar:-test}
notebookvar=${notebookvar:-/home/haruiz/workspace/deep-learning-v2-pytorch/project-dog-classification/dog_app.ipynb}
bundle exec rake n2post file=$notebookvar  lang=$langvar title="$titlevar" --trace
