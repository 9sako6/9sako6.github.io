import { style } from "@vanilla-extract/css";

export const imageContainer = style({
  display: "grid",
  gridColumn: "span 2 / span 2",
  placeContent: "center",
});

export const image = style({
  borderRadius: "2px",
  objectFit: "cover",
  width: "256px",
  height: "144px",
  "@media": {
    "screen and (max-width: 768px)": {
      width: "320px",
      height: "auto",
      maxHeight: "180px",
    },
  },
});
