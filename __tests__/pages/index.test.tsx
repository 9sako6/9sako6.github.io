import { render } from "@testing-library/react";
import Home from "@/app/page";
import { buildPost } from "@/mocks";

// How to mock.
// https://github.com/vercel/next.js/issues/7479#issuecomment-533657701
vi.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
    };
  },
}));

vi.mock("@/lib/all-posts", () => {
  return {
    allPosts: async () => {
      return [
        buildPost({
          title: "How to test Next.js with Vitest",
        }),
      ];
    },
  };
});

test.skip("home", () => {
  // const { getByText } = render(<Home />);
  // expect(getByText("How to test Next.js with Vitest")).toBeInTheDocument();
});
