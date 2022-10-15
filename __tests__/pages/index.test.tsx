import { render } from "@testing-library/react";
import Home from "@/pages/index";
import { createFirebaseApp } from "@/firebase/client-app";
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

createFirebaseApp();

test("home", () => {
  const posts = [
    buildPost({
      title: "How to test Next.js with Vitest",
    }),
  ];
  const { getByText } = render(<Home posts={posts} />);

  expect(getByText("How to test Next.js with Vitest")).toBeInTheDocument();
});
