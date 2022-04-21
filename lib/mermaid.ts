import util from "util";
import { exec } from "child_process";
import fs from "fs";
import { readdir } from "fs/promises";
import { v4 as uuidv4 } from "uuid";

const execPromise = util.promisify(exec);

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

      // Generate mermaid svgs and markdowns that reference these svgs.
      await execPromise(
        `yarn -p @mermaid-js/mermaid-cli mmdc -i ${inputPath} -o ${outputPath}`
      );

      const markdown = fs.readFileSync(outputPath).toString();
      const html = await markdownToHtml(markdown);

      let marmaidedHtml = html;
      const generatedFiles = await readdir(workDir);

      // Replace the img tag in HTML to svg.
      for (const generatedFile of generatedFiles) {
        if (generatedFile.match(/\.svg$/)) {
          const svg = fs.readFileSync(`${workDir}/${generatedFile}`).toString();
          const svgInMarkdownRegexp = new RegExp(
            `<img src="\\.\\/${generatedFile}" alt="\\w+">`
          );
          marmaidedHtml = marmaidedHtml.replace(svgInMarkdownRegexp, svg);
        }
      }

      return marmaidedHtml;
    } finally {
      // Remove the working directory.
      if (fs.existsSync("tmp")) {
        fs.rmSync("tmp", { recursive: true, force: true });
      }
    }
  };
};
