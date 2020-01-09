def md2json(category)
  `processmd ./md/#{category}/*.md --stdout --outputDir contents/posts/#{category} > contents/posts/#{category}/summary.json`
  `ruby lib/make_tags_json.rb -c #{category}`
end

categories = ["competitive_programming", "tech_blog", "blog"]
categories.map { |category| md2json(category) }
