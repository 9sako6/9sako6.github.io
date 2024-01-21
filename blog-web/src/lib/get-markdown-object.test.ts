import { describe, it, expect, vi } from "vitest";
import { getMarkdownObject } from "./get-markdown-object";

vi.mock("fs/promises", () => ({
  default: {
    readFile: vi.fn().mockResolvedValue(`---
title: "Test Title"
description: "Test Description"
date: "2024-01-01"
topics: ["topic1", "topic2"]
category: "Test"
published: true
eyecatch: "path/to/image.jpg"
---
Content of the post`),
  },
}));

describe("getMarkdownObject", () => {
  it("should parse markdown file content correctly", async () => {
    const result = await getMarkdownObject({ filePath: "path/to/markdown.md" });

    expect(result).toEqual({
      content: "Content of the post",
      data: {
        title: "Test Title",
        description: "Test Description",
        date: "2024-01-01",
        topics: ["topic1", "topic2"],
        category: "Test",
        published: true,
        eyecatch: "path/to/image.jpg",
      },
    });
  });
});
