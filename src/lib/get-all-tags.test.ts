import { buildPost } from "@/mocks";
import { describe, expect, it, vi } from "vitest";
import { getAllPosts } from "./get-all-posts";
import { getAllTags } from "./get-all-tags";

vi.mock("./get-all-posts", () => ({
  getAllPosts: vi.fn(),
}));

describe("getAllTags", () => {
  it("should return a unique sorted list of tags from all posts", async () => {
    vi.mocked(getAllPosts).mockResolvedValue([
      buildPost({ topics: ["tag9", "tag2"] }),
      buildPost({ topics: ["tag2", "tag3"] }),
      buildPost({ topics: ["tag1", "tag4"] }),
    ]);

    const tags = await getAllTags({ draft: false });

    expect(tags).toEqual(["tag1", "tag2", "tag3", "tag4", "tag9"]);
  });

  it("should return an empty array if there are no posts", async () => {
    vi.mocked(getAllPosts).mockResolvedValue([]);

    const tags = await getAllTags({ draft: false });

    expect(tags).toEqual([]);
  });
});
