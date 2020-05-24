#!/bin/bash
# Ask the user for their name
read -p 'page title: ' titlevar
read -p 'language: ' langvar
langvar=${langvar:-en}
bundle exec rake page title="$titlevar" lang=$langvar
