import { CommentForm } from "@/components/organisms";
import { UserContext } from "@/contexts/user-context";
import { createFirebaseApp } from "@/firebase/client-app";
import { render } from "@testing-library/react";
import type { User } from "firebase/auth";

beforeAll(() => {
  createFirebaseApp();
});

it("should show sign in button for an unauthorized user", async () => {
  const { getByText, getByTestId } = render(
    <UserContext.Provider value={{ user: undefined, loading: false }}>
      <CommentForm slug="slug" />
    </UserContext.Provider>
  );

  expect(getByText("Please sign in to leave comments.")).toBeInTheDocument();
  expect(getByTestId("sign-in-button")).toBeInTheDocument();
});

it("should show a comment form for an authorized user", async () => {
  const { getByText } = render(
    <UserContext.Provider
      value={{
        user: { uid: "authed-uid", displayName: "Jane Doe" } as User,
        loading: false,
      }}
    >
      <CommentForm slug="slug" />
    </UserContext.Provider>
  );

  expect(getByText("Sign out")).toBeInTheDocument();
  expect(getByText("Send")).toBeInTheDocument();
});
