#!/bin/bash
# Ask the user for their name
read -p 'blog title: ' titlevar
read -p 'language: ' langvar
#langvar=${langvar:-en}
bundle exec rake post title="$titlevar" lang=$langvar

