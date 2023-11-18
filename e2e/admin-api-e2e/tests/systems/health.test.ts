import { expect, test } from "vitest";
import { apiPath } from "../../config/api";

test("GET /systems/health", async () => {
  const res = await fetch(apiPath + "/systems/health");

  expect(res.status).toBe(200);
  expect(await res.json()).toEqual({
    status: "healthy",
  });
});
