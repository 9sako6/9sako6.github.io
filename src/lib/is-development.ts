export const isDevelopment =
  // In browser
  (typeof location !== "undefined" && location.hostname === "localhost") ||
  // In Node.js
  process.env.NODE_ENV === "development";
