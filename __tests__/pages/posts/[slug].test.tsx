import PostPage from "@/pages/posts/[slug]";
import { render } from "@testing-library/react";
import { buildPost } from "@/mocks";

vi.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: "/posts/test",
    };
  },
}));

test("PostPage", () => {
  const post = buildPost();
  const { getByText } = render(
    <PostPage {...post} commitHistory={[]} url={""} bodyHtml={"hello, world"} />
  );

  expect(getByText("hello, world")).toBeInTheDocument();
});
