import { assertFails, assertSucceeds } from "@firebase/rules-unit-testing";
import { initializeFirebaseTestEnv } from "../setup";

const testEnv = await initializeFirebaseTestEnv();

afterEach(async () => {
  await testEnv.clearFirestore();
});

afterAll(async () => {
  await testEnv.cleanup();
});

describe("userId", () => {
  test("Authenticated user can create a comment", async () => {
    const context = testEnv.authenticatedContext("authed-uid");
    const db = context.firestore();

    await assertSucceeds(
      db.collection("comments").add({
        userId: "authed-uid",
        text: "hello, world!",
        displayName: "Jane Doe",
        photoURL: "https://placedog.net/500",
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        slug: "how-to-test-firestore",
      })
    );
  });

  test("Unauthenticated user can not create a comment", async () => {
    const context = testEnv.unauthenticatedContext();
    const db = context.firestore();

    await assertFails(
      db.collection("comments").add({
        userId: "unauthed-uid",
        text: "hello, world!",
        displayName: "Jane Doe",
        photoURL: "https://placedog.net/500",
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        slug: "how-to-test-firestore",
      })
    );
  });

  test("Unauthenticated user can not create a comment with empty userId", async () => {
    const context = testEnv.unauthenticatedContext();
    const db = context.firestore();

    await assertFails(
      db.collection("comments").add({
        userId: null,
        text: "hello, world!",
        displayName: "Jane Doe",
        photoURL: "https://placedog.net/500",
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        slug: "how-to-test-firestore",
      })
    );
  });
});

describe("displayName", () => {
  it("should fail with missing displayName", async () => {
    const context = testEnv.authenticatedContext("authed-uid");
    const db = context.firestore();

    await assertFails(
      db.collection("comments").add({
        text: "hello, world!",
        userId: "authed-uid",
        photoURL: "https://placedog.net/500",
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        slug: "how-to-test-firestore",
      })
    );
  });
});

describe("photoURL", () => {
  it("should fail with missing photoURL", async () => {
    const context = testEnv.authenticatedContext("authed-uid");
    const db = context.firestore();

    await assertFails(
      db.collection("comments").add({
        text: "hello, world!",
        userId: "authed-uid",
        displayName: "Jane Doe",
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        slug: "how-to-test-firestore",
      })
    );
  });
});

describe("published", () => {
  it("should fail with missing published", async () => {
    const context = testEnv.authenticatedContext("authed-uid");
    const db = context.firestore();

    await assertFails(
      db.collection("comments").add({
        text: "hello, world!",
        userId: "authed-uid",
        displayName: "Jane Doe",
        photoURL: "https://placedog.net/500",
        createdAt: new Date(),
        updatedAt: new Date(),
        slug: "how-to-test-firestore",
      })
    );
  });
});

describe("slug", () => {
  it("should fail with missing slug", async () => {
    const context = testEnv.authenticatedContext("authed-uid");
    const db = context.firestore();

    await assertFails(
      db.collection("comments").add({
        text: "hello, world!",
        userId: "authed-uid",
        displayName: "Jane Doe",
        photoURL: "https://placedog.net/500",
        published: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    );
  });
});

describe("text", () => {
  it("should fail with missing text", async () => {
    const context = testEnv.authenticatedContext("authed-uid");
    const db = context.firestore();

    await assertFails(
      db.collection("comments").add({
        userId: "authed-uid",
        displayName: "Jane Doe",
        photoURL: "https://placedog.net/500",
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        slug: "how-to-test-firestore",
      })
    );
  });

  it("should fail with wrong typed text", async () => {
    const context = testEnv.authenticatedContext("authed-uid");
    const db = context.firestore();

    await assertFails(
      db.collection("comments").add({
        text: 99,
        userId: "authed-uid",
        displayName: "Jane Doe",
        photoURL: "https://placedog.net/500",
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        slug: "how-to-test-firestore",
      })
    );
  });

  it("should fail with 0 length text", async () => {
    const context = testEnv.authenticatedContext("authed-uid");
    const db = context.firestore();

    await assertFails(
      db.collection("comments").add({
        userId: "authed-uid",
        text: "",
        displayName: "Jane Doe",
        photoURL: "https://placedog.net/500",
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        slug: "how-to-test-firestore",
      })
    );
  });

  it("should fail with over 400 length text", async () => {
    const context = testEnv.authenticatedContext("authed-uid");
    const db = context.firestore();

    await assertSucceeds(
      db.collection("comments").add({
        userId: "authed-uid",
        text: "a".repeat(400),
        displayName: "Jane Doe",
        photoURL: "https://placedog.net/500",
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        slug: "how-to-test-firestore",
      })
    );

    await assertFails(
      db.collection("comments").add({
        userId: "authed-uid",
        text: "a".repeat(401),
        displayName: "Jane Doe",
        photoURL: "https://placedog.net/500",
        createdAt: new Date(),
        updatedAt: new Date(),
        published: true,
        slug: "how-to-test-firestore",
      })
    );
  });
});

describe("createdAt", () => {
  it("should fail with missing createdAt", async () => {
    const context = testEnv.authenticatedContext("authed-uid");
    const db = context.firestore();

    await assertFails(
      db.collection("comments").add({
        text: "hello, world!",
        userId: "authed-uid",
        displayName: "Jane Doe",
        photoURL: "https://placedog.net/500",
        published: true,
        slug: "how-to-test-firestore",
        updatedAt: new Date(),
      })
    );
  });
});

describe("updatedAt", () => {
  it("should fail with missing updatedAt", async () => {
    const context = testEnv.authenticatedContext("authed-uid");
    const db = context.firestore();

    await assertFails(
      db.collection("comments").add({
        text: "hello, world!",
        userId: "authed-uid",
        displayName: "Jane Doe",
        photoURL: "https://placedog.net/500",
        published: true,
        slug: "how-to-test-firestore",
        createdAt: new Date(),
      })
    );
  });
});
