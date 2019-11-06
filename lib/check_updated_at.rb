# 必要があればmarkdownファイルのupdated_atを更新する
Dir.glob("./md/*.md").each do |path|
  updated_date = File.mtime(path).strftime("%Y-%m-%d")
  original_date = ""
  text = ""
  File.open(path, "r") do |f|
    text = f.read
    original_date = text.match(/^updated_at:\s*(\d\d\d\d-\d\d-\d\d)/)&.[](1)
  end

  if original_date != updated_date
    text.gsub!(/^updated_at:.*/, "updated_at: #{updated_date}")
    File.open(path, "w") do |f|
      f.puts(text)
    end
  end
end
