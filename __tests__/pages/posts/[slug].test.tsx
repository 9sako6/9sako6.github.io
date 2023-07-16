// import PostPage from "@/app/posts/[slug]/page";
// import { render } from "@testing-library/react";
// import { buildPost } from "@/mocks";

vi.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: "/posts/test",
    };
  },
}));

test.skip("PostPage", () => {
  // const post = buildPost();
  // const { getByText } = render(
  //   <PostPage {...post} commitHistory={[]} url={""} bodyHtml={"hello, world"} />
  // );
  // expect(getByText("hello, world")).toBeInTheDocument();
});
