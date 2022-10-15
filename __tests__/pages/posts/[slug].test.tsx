import PostPage from "@/pages/posts/[slug]";
import { render } from "@testing-library/react";
import { createFirebaseApp } from "@/firebase/client-app";
import { buildPost } from "@/mocks";

vi.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: "/posts/test",
    };
  },
}));

beforeAll(() => {
  createFirebaseApp();
});

test("PostPage", () => {
  const post = buildPost();
  const { getByText } = render(
    <PostPage {...post} commitHistory={[]} url={""} bodyHtml={"hello, world"} />
  );

  expect(getByText("hello, world")).toBeInTheDocument();
});
