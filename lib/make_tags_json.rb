require 'json'
require 'pp'

tags_count = Hash.new(0)

tags_list = []
tags_map = {}

File.open("./contents/posts/summary.json", "r") do |file|
  summary_json = JSON.load(file)
  summary_json["fileMap"].each do |url, hash|
    # count each tag and make TagsMap
    hash["tags"].each do |tag| 
      tags_count[tag] += 1 if !hash["draft"] # count each tag
      tags_map[tag] ||= []
      tags_map[tag] << { url => hash } if !hash["draft"]
    end
  end
end

# sort
tags_map.each do |tag_name, articles|
  articles.sort_by! do |article|
    info = article.values[0]
    (info["created_at"] + info["title"])
  end.reverse!
end

# make TagsList
tags_count.each do |tag_name, tag_count|
  tags_list << { "name" => tag_name, "count" => tag_count }
end

File.open("./contents/posts/tags_list.json", "w") do |file|
  file.puts(JSON.pretty_generate({ "TagsList" => tags_list }))
end
File.open("./contents/posts/tags_map.json", "w") do |file|
  file.puts(JSON.pretty_generate({ "TagsMap" => tags_map }))
end