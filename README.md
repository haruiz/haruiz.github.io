# Lora - free Jekyll theme

> :warning:
  This theme requires ruby and rubygems installed

---

### Install

```terminal
- pip install nbconvert #or
- conda install nbconvert
```

### Start in 4 steps

1. Download or clone repo `git clone git@github.com:nandomoreirame/lora.git`
2. Enter the folder: `cd lora/`
3. Install Ruby gems: `bundle install`
4. Start Jekyll server: `bundle exec jekyll serve --livereload --host `

Access, [localhost:4000](http://localhost:4000/)

### Deploy in Github pages in 2 steps

1. Change the variables `GITHUB_REPONAME` and `GITHUB_REPO_BRANCH` in `Rakefile`
2. Run `rake` or `bundle exec rake publish` for build and publish on Github
3. For installing dependencies: `bundle install` 
---

### Using Rake tasks


* Create a new page: `bundle exec rake page name="contact.md"`
* Create a new post: `bundle exec rake post title="TITLE OF THE POST"`
* create a new post from a jupyter notebook: ``
---
