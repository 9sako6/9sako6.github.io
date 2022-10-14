const { readdirSync, readFileSync, writeFileSync } = require("fs");
const matter = require("gray-matter");
const colors = require("colors/safe");

const allTopics = readdirSync("posts").flatMap((fileName) => {
  const file = readFileSync(`posts/${fileName}`, "utf-8");
  const metadata = matter(file).data;

  return metadata.topics;
});

const topics = Array.from(new Set(allTopics)).sort((a, b) =>
  a.localeCompare(b)
);

writeFileSync("./data/topics.json", JSON.stringify(topics));

console.log(colors.magenta("info - topics JSON was generated."));
