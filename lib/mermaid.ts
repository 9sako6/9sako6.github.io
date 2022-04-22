import util from "util";
import { exec } from "child_process";
import fs from "fs";
import { readdir } from "fs/promises";
import { v4 as uuidv4 } from "uuid";

const execPromise = util.promisify(exec);

const svgFiles = async (dirPath: string) => {
  const fileNames = await readdir(dirPath);

  return fileNames.filter((fileName) => fileName.match(/\.svg$/));
};

export const withMermaid = (
  markdownToHtml: (markdown: string) => Promise<string>
) => {
  return async (originalMarkdown: string) => {
    // Create a working directory.
    if (!fs.existsSync("tmp")) fs.mkdirSync("tmp");
    const workDir = fs.mkdtempSync("tmp/mermaid");

    try {
      const inputPath = `${workDir}/input.md`;
      const outputFileId = uuidv4();
      const outputPath = `${workDir}/${outputFileId}.md`;

      fs.writeFileSync(inputPath, originalMarkdown);

      // Generate mermaid light svgs and markdowns that reference these svgs.
      await execPromise(
        `yarn -p @mermaid-js/mermaid-cli mmdc -i ${inputPath} -o ${outputPath} -t default -b transparent`
      );

      const lightSVGs = (await svgFiles(workDir)).map((svgPath) =>
        fs.readFileSync(`${workDir}/${svgPath}`).toString()
      );

      // Generate mermaid dark svgs and markdowns that reference these svgs.
      await execPromise(
        `yarn -p @mermaid-js/mermaid-cli mmdc -i ${inputPath} -o ${outputPath} -t dark -b transparent`
      );

      const darkSVGs = (await svgFiles(workDir)).map((svgPath) =>
        fs.readFileSync(`${workDir}/${svgPath}`).toString()
      );

      const markdown = fs.readFileSync(outputPath).toString();
      const html = await markdownToHtml(markdown);
      let mermaidedHtml = html;
      const svgPaths = await svgFiles(workDir);

      // Replace the img tag in HTML to svg.
      svgPaths.forEach((svgPath, index) => {
        const svgTag = `<div class="mermaid"><div class="mermaid-light">${lightSVGs[index]}</div><div class="mermaid-dark">${darkSVGs[index]}</div></div>`;
        const svgInMarkdownRegexp = new RegExp(
          `<img src="\\.\\/${svgPath}" alt="\\w+">`
        );
        mermaidedHtml = mermaidedHtml.replace(svgInMarkdownRegexp, svgTag);
      });

      return mermaidedHtml;
    } finally {
      // Remove the working directory.
      if (fs.existsSync(workDir)) {
        fs.rmSync(workDir, { recursive: true, force: true });
      }
    }
  };
};
