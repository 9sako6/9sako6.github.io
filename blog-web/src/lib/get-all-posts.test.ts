import { describe, it, expect, vi } from "vitest";
import { getAllPosts } from "./get-all-posts";
import { getMarkdownObject } from "./get-markdown-object";

vi.mock("fs/promises", () => ({
  default: {
    readdir: vi.fn().mockResolvedValue(["post1.md", "post2.md"]),
  },
}));

vi.mock("./get-markdown-object", () => ({
  getMarkdownObject: vi.fn(),
}));

describe("getAllPosts", () => {
  it("should return a list of posts", async () => {
    vi.mocked(getMarkdownObject).mockImplementation((params) => {
      if (params.filePath.includes("post1.md")) {
        return Promise.resolve({
          content: "Content 1",
          data: {
            title: "Post 1",
            description: "Description 1",
            date: "2024-01-01",
            topics: ["topic1"],
            category: "Category 1",
            published: true,
          },
        });
      } else {
        return Promise.resolve({
          content: "Content 2",
          data: {
            title: "Post 2",
            description: "Description 2",
            date: "2024-01-02",
            topics: ["topic2"],
            category: "Category 2",
            published: false,
          },
        });
      }
    });

    const posts = await getAllPosts({ draft: false });

    expect(posts).toEqual([
      {
        slug: "post1",
        title: "Post 1",
        description: "Description 1",
        date: "2024-01-01",
        topics: ["topic1"],
        category: "Category 1",
        published: true,
      },
    ]);
  });
});
