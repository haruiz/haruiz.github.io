#!/bin/bash
# Ask the user for their name
read -p 'notebook path: ' notebookvar
read -p 'blog title: ' titlevar
read -p 'language: ' langvar
langvar=${langvar:-en}
bundle exec rake n2post file=$notebookvar  lang=$langvar title="$titlevar" --trace
