import { describe, it, expect } from "vitest";
import { generateDescription } from "./generate-description";

describe("generateDescription", () => {
  it("extracts plain text from HTML without tags", () => {
    const description = generateDescription({
      htmlString: "<p>Simple text</p>",
    });
    expect(description).toBe("Simple text");
  });

  it("removes h1, h2, h3, h4headings", () => {
    const htmlString =
      "<h1>Title</h1><p>Text</p><h2>Subtitle</h2><h3>Subsubtitle</h3><h4>Subsubsubtitle</h4>";
    const description = generateDescription({ htmlString });
    expect(description).toBe("Text");
  });

  it("truncates text to 120 characters", () => {
    const longText = "a".repeat(150);
    const htmlString = `<p>${longText}</p>`;
    const description = generateDescription({ htmlString });
    expect(description).toHaveLength(120);
    expect(description).toContain("...");
  });

  it("returns an empty string for empty HTML", () => {
    const description = generateDescription({ htmlString: "" });
    expect(description).toBe("");
  });
});
