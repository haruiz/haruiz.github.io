# encoding: UTF-8
require "rubygems"
require "tmpdir"
require "bundler/setup"
require "jekyll"
require 'uri'
require 'securerandom'
require 'open3'
require 'enumerator'
require 'nokogiri'
require 'redcarpet'
require 'fileutils'

# Change your GitHub reponame
GITHUB_REPONAME    = "haruiz/haruiz.github.io"
GITHUB_REPO_BRANCH = "master"
SOURCE = "source/"
DEST   = "_site"
CONFIG = {
  'layouts' => File.join(SOURCE, "_layouts"),
  'posts' => File.join(SOURCE, "_posts"),
  'images' => File.join(SOURCE, "img"),
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
  abort("title field is required!") if title.nil? || title.empty?
  if lang.empty? || lang.nil?
    create_post(title, "en", tags="", categories="")
    create_post(title, "es", tags="", categories="")
  else
    create_post(title, lang, tags="", categories="")
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
    # validate parameters
    abort("file field is required!") if notebook.nil? || notebook.empty?
    abort("title field is required!") if title.nil? || title.empty?
    abort("lang field is required!") if lang.nil? || lang.empty?

    # convert notebook to markdown
    markdown = notebook_to_markdown(notebook)
    # wrap code blocks with the custom code tag
    markdown = wrap_code_blocks(markdown, language="python")
    # convert markdown to html
    slug_title = mount_slug(title)
    # create images folder
    post_images_folder = File.join(CONFIG["images"], title)
    unless File.exist?(post_images_folder)
      Dir.mkdir post_images_folder
    end

    # extract images from markdown (html format)
    doc = Nokogiri::HTML(markdown)
    notebook_folder = File.dirname(notebook)
    doc.search("img").each { |img|
      image_file = File.join(notebook_folder, img["src"])
      if File.exist?(image_file)
        # copy file into the images folder
        FileUtils.cp(image_file, post_images_folder)
        markdown = markdown.gsub(img["src"],File.join(post_images_folder[6..-1], File.basename(image_file)))
      end
    }

    # extract images from markdown (markdown format)
    markdown.scan(/(?:!\[(.*?)\]\((.*?)\))/).each { |str|
      if str.size > 0
        img_desc , image_path =  str
        image_file = File.join(notebook_folder, image_path)
        if File.exist?(image_file)
          # copy file into the images folder
          FileUtils.cp(image_file, post_images_folder)
          markdown = markdown.gsub(image_path,File.join(post_images_folder[6..-1], File.basename(image_file)))
        end
      end
    }


    create_post(title, lang, body=markdown)

  rescue => e
    puts "Error - converting the jupyter notebook" + e
    exit -1
  end
end # task :page


def wrap_code_blocks(markdown, language="python")
  # extract blocks
  blocks = markdown.enum_for(:scan, /```#{language}(.*?)```/m).map { [Regexp.last_match.begin(0),Regexp.last_match.end(0)] }
  index = 0
  output_markdown = ""
  (0..blocks.length - 1).each { |i|

    block_indices = blocks[i]
    start_block_index = block_indices[0]
    end_block_index = block_indices[1]

    if start_block_index > 0
      output_markdown += markdown[index...start_block_index]
      index = end_block_index # moveto the next block
    end
    # replace text
    block_text = markdown[start_block_index...end_block_index]
    block_lines = block_text.split("\n")
    # enclose code block with code tag block
    block_lines[0] = "{% code %}"
    block_lines[block_lines.length - 1] = "{% endcode %}\n"
    block_text = block_lines.join("\n")

    output_markdown += block_text
  }
  if index < markdown.length
    output_markdown+= markdown[index...markdown.length]
  end
  output_markdown
end

def notebook_to_markdown(notebook)
  cmd = "jupyter nbconvert --to markdown \"#{notebook}\" --stdout"
  stdin, stdout, stderr, wait_thr = Open3.popen3(cmd)
  stderr.gets(nil)
  stderr.close
  markdown = stdout.read
  stdout.close
  markdown
end

def create_post(title, lang, body="", tags="", categories="")
  folder = File.join(CONFIG['posts'],lang)
  slug =  mount_slug(title) #URI::encode(str).to_s
  begin
    date = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%Y-%m-%d')
    time = (ENV['date'] ? Time.parse(ENV['date']) : Time.now).strftime('%T')
  rescue => e
    puts "Error - date format must be YYYY-MM-DD, please check you typed it correctly!"
    exit -1
  end
  # output file
  filename = File.join(folder, "#{date}-#{slug}.#{CONFIG['post_ext']}")
  # if File.exist?(filename)
  #   abort("rake aborted!") if ask("#{filename} already exists. Do you want to overwrite?", ['y', 'n']) == 'n'
  # end

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
    post.puts body
  end
end

def mount_slug(title)
  slug = str_clean(title)
  slug.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
end

def str_clean(title)
  title.tr("ÀÁÂÃÄÅàáâãäåĀāĂăĄąÇçĆćĈĉĊċČčÐðĎďĐđÈÉÊËèéêëĒēĔĕĖėĘęĚěĜĝĞğĠġĢģĤĥĦħÌÍÎÏìíîïĨĩĪīĬĭĮįİıĴĵĶķĸĹĺĻļĽľĿŀŁłÑñŃńŅņŇňŉŊŋÒÓÔÕÖØòóôõöøŌōŎŏŐőŔŕŖŗŘřŚśŜŝŞşŠšſŢţŤťŦŧÙÚÛÜùúûüŨũŪūŬŭŮůŰűŲųŴŵÝýÿŶŷŸŹźŻżŽž", "AAAAAAaaaaaaAaAaAaCcCcCcCcCcDdDdDdEEEEeeeeEeEeEeEeEeGgGgGgGgHhHhIIIIiiiiIiIiIiIiIiJjKkkLlLlLlLlLlNnNnNnNnnNnOOOOOOooooooOoOoOoRrRrRrSsSsSsSssTtTtTtUUUUuuuuUuUuUuUuUuUuWwYyyYyYZzZzZz")
end

def strtag(str_tags)
  tags = ""
  unless str_tags.nil?
    arr_tags = str_tags.split(",")
    arr_tags.each do |t|
      tags = tags + "- " + t.delete(' ') + "\n"
    end
  end
  tags
end
