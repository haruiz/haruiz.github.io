# encoding: UTF-8
require "rubygems"
require "tmpdir"
require "bundler/setup"
require "jekyll"
require 'uri'
require 'securerandom'
require 'open3'
require 'enumerator'

# Change your GitHub reponame
GITHUB_REPONAME    = "haruiz/haruiz.github.io"
GITHUB_REPO_BRANCH = "master"

SOURCE = "source/"
DEST   = "_site"
CONFIG = {
  'layouts' => File.join(SOURCE, "_layouts"),
  'posts' => File.join(SOURCE, "_posts"),
  'post_ext' => "md",
  'categories' => File.join(SOURCE, "categories"),
  'tags' => File.join(SOURCE, "tags")
}

task default: %w[publish]
desc "Generate blog files"
task :generate do
  Jekyll::Site.new(Jekyll.configuration({
    "source"      => "source/",
    "destination" => "_site",
    "config"      => "_config.yml"
  })).process
end

desc "Generate and publish blog to gh-pages"
task :publish => [:generate] do
  Dir.mktmpdir do |tmp|
    cp_r "_site/.", tmp
    pwd = Dir.pwd
    Dir.chdir tmp
    system "git init"
    system "git checkout --orphan #{GITHUB_REPO_BRANCH}"
    system "git add ."
    message = "Site updated at #{Time.now.utc}"
    system "git commit -am #{message.inspect}"
    system "git remote add origin git@github.com:#{GITHUB_REPONAME}.git"
    system "git push origin #{GITHUB_REPO_BRANCH} --force"
    Dir.chdir pwd
  end
end

desc "Begin a new post in #{CONFIG['posts']}"
task :post do
  abort("rake aborted: '#{CONFIG['posts']}' directory not found.") unless FileTest.directory?(CONFIG['posts'])
  title =  ENV['title'].to_s
  lang = ENV['lang'].to_s
  folder = File.join(CONFIG['posts'],lang)
  abort("title field is required!") if title.nil? || title.empty?
  abort("lang field is required!") if lang.nil? || lang.empty?
  tags = ""
  categories = ""
  # tags
  env_tags = ENV["tags"] || ""
  tags = strtag(env_tags)
  # categorias
  env_cat = ENV["category"] || ""
  categories = strtag(env_cat)
  # slug do post
  slug =  mount_slug(title) #URI::encode(str).to_s
  begin
    date = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d')
    time = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%T')
  rescue => e
    puts "Error - date format must be YYYY-MM-DD, please check you typed it correctly!"
    exit -1
  end

  filename = File.join(folder, "#{date}-#{slug}.#{CONFIG['post_ext']}")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end

  puts "Creating new post: #{filename}"
  open(filename, 'w') do |post|
    post.puts "---"
    post.puts "layout: post"
    post.puts "title: \"#{title.gsub(/-/,' ')}\""
    post.puts "lang: \"#{lang}\""
    post.puts "permalink: \"#{File.join(lang,slug)}\""
    post.puts "date: #{date} #{time}"
    post.puts "comments: true"
    post.puts "description: \"#{title}\""
    post.puts 'keywords: ""'
    post.puts "categories:"
    post.puts "#{categories}"
    post.puts "tags:"
    post.puts "#{tags}"
    post.puts "---"
  end
  exit
end # task :post

desc "Create a new page."
task :page do
  title =  ENV['title'].to_s
  lang = ENV['lang'].to_s
  abort("title field is required!") if title.nil? || title.empty?
  abort("lang field is required!") if lang.nil? || lang.empty?
  slug = mount_slug(title)
  filename = File.join(SOURCE,lang, "#{slug}.html")
  if File.exist?(filename)
    abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  end
  # mkdir_p File.dirname(filename)
  puts "Creating new page: #{filename}"
  open(filename, 'w') do |page|
    page.puts "---"
    page.puts "layout: page"
    page.puts "title: \"#{title}\""
    page.puts "lang: \"#{lang}\""
    page.puts 'description: ""'
    page.puts 'keywords: ""'
    page.puts "permalink: \"#{File.join(lang,slug)}\""
    page.puts "slug: \"#{slug}\""
    page.puts "---"
  end

end # task :page



desc "Create a new post from ajupyter notebook."
task :n2post do
  begin
    title =  ENV['title'].to_s
    notebook =  ENV['file'].to_s
    lang = ENV['lang'].to_s
    abort("file field is required!") if notebook.nil? || notebook.empty?
    abort("title field is required!") if title.nil? || title.empty?
    abort("lang field is required!") if lang.nil? || lang.empty?
    cmd = "jupyter nbconvert --to markdown \"#{notebook}\" --stdout"
    stdin, stdout, stderr, wait_thr = Open3.popen3(cmd)
    stderr.gets(nil)
    stderr.close
    markdown = stdout.read
    stdout.close
    blocks = markdown.enum_for(:scan, /```python(.*?)```/m).map { [Regexp.last_match.begin(0),Regexp.last_match.end(0)] }
    #extract blocks of code
    index = 0
    outputMarkdown = ""
    for i in 0..blocks.length-1 do
      block_indices = blocks[i]
      start_block_index = block_indices[0]
      end_block_index = block_indices[1]
      if start_block_index > 0
        outputMarkdown += markdown[index...start_block_index]
        # jump code text
        index = end_block_index
      end
      # replace text
      block_text =  markdown[start_block_index...end_block_index]
      block_lines = block_text.split("\n")
      block_lines[0] = "{% code %}"
      block_lines[block_lines.length-1] = "{% endcode %}\n"
      block_text = block_lines.join("\n")
      outputMarkdown+= block_text
    end
    if index < markdown.length
      outputMarkdown+= markdown[index...markdown.length]
    end

    # create filename
    slug = mount_slug(title)
    begin
      date = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d')
      time = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%T')
    rescue => e
      puts "Error - date format must be YYYY-MM-DD, please check you typed it correctly!"
      exit -1
    end
    folder = File.join(CONFIG['posts'],lang)
    filename = File.join(folder, "#{date}-#{slug}.#{CONFIG['post_ext']}")
    # if File.exist?(filename)
    #   abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
    # end
    puts "Creating new post: #{title}"

    # tags
    env_tags = ENV["tags"] || ""
    tags = strtag(env_tags)
    # categorias
    env_cat = ENV["category"] || ""
    categories = strtag(env_cat)

    open(filename, 'w') do |post|
      post.puts "---"
      post.puts "layout: post"
      post.puts "title: \"#{title.gsub(/-/,' ')}\""
      post.puts "lang: \"#{lang}\""
      post.puts "permalink: \"#{File.join(lang,slug)}\""
      post.puts "date: #{date} #{time}"
      post.puts "comments: true"
      post.puts "description: \"#{title}\""
      post.puts 'keywords: ""'
      post.puts "categories:"
      post.puts "#{categories}"
      post.puts "tags:"
      post.puts "#{tags}"
      post.puts "---"
      post.puts outputMarkdown
    end
  rescue => e
    puts "Error - converting the jupyter notebook" + e
    exit -1
  end
end # task :page




def mount_slug(title)
  slug = str_clean(title)
  slug = slug.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  return slug
end

def str_clean(title)
  return title.tr("ÀÁÂÃÄÅàáâãäåĀāĂăĄąÇçĆćĈĉĊċČčÐðĎďĐđÈÉÊËèéêëĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħÌÍÎÏìíîïĨĩĪīĬĭĮįİıĴĵĶķĸĹĺĻļĽľĿŀŁłÑñŃńŅņŇňŉŊŋÒÓÔÕÖØòóôõöøŌōŎŏŐőŔŕŖŗŘřŚśŜŝŞşŠšſŢţŤťŦŧÙÚÛÜùúûüŨũŪūŬŭŮůŰűŲųŴŵÝýÿŶŷŸŹźŻżŽž", "AAAAAAaaaaaaAaAaAaCcCcCcCcCcDdDdDdEEEEeeeeEeEeEeEeEeGgGgGgGgHhHhIIIIiiiiIiIiIiIiIiJjKkkLlLlLlLlLlNnNnNnNnnNnOOOOOOooooooOoOoOoRrRrRrSsSsSsSssTtTtTtUUUUuuuuUuUuUuUuUuUuWwYyyYyYZzZzZz")
end

def strtag(str_tags)
  tags = "";

  if !str_tags.nil?
    arr_tags = str_tags.split(",")
    arr_tags.each do |t|
      tags = tags + "- " + t.delete(' ') + "\n"
    end
  end

  return tags
end
