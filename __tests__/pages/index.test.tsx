import { render } from "@testing-library/react";
import Home from "@/app/page";
import { createFirebaseApp } from "@/firebase/client-app";
import { buildPost } from "@/mocks";

vi.mock("@/lib/all-posts", () => {
  const allPostsSync = () => [
    buildPost({
      title: "How to test Next.js with Vitest",
    }),
  ];

  return { allPostsSync };
});

beforeAll(() => {
  createFirebaseApp();
});

test("home", () => {
  const { getByText } = render(<Home />);

  expect(getByText("How to test Next.js with Vitest")).toBeInTheDocument();
});
