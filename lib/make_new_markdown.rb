require "date"
require "json"

categories = []
File.open("site.config.json", "r") do |f|
  categories = JSON.parse(f.read)["categories"]
end

title = ""
category = ""
date = Date.today.strftime("%Y-%m-%d")
path = "./md"

if ARGV.size != 2
  puts "Please input the title:"
  title = gets.chomp
  puts "Select the category:"
  puts "  0: blog"
  puts "  1: tech_blog"
  puts "  2: competitive_programming"
  category = categories[gets.to_i]
else
  title = ARGV[0]
  category = ARGV[1]
end

template = <<"EOS"
---
title: #{title}
description: ""
tags:
  - ""
created_at: #{date}
updated_at: ""
draft: true
---
EOS

File.open("#{path}/#{category}/#{date}-#{title}.md", "w") do |file|
  file.puts template
end

img_path = "./static/posts_images"

Dir.mkdir("#{img_path}/#{date}-#{title}")
