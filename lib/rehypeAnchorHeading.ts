import { Plugin } from "unified";
import { visit } from "unist-util-visit";
import { Element, Literal } from "hast";

function unshiftAnchor(node: Literal & Partial<Element>) {
  if (
    node.type === "element" &&
    node.tagName === "h1" &&
    node.properties &&
    node.children
  ) {
    const headingId = node.properties.id;

    // Add anchor before a H1 tag.
    node.children.unshift({
      type: "element",
      tagName: "a",
      properties: {
        href: `#${headingId}`,
        class: "anchor-of-heading",
      },
      children: [
        {
          type: "text",
          value: "#",
        },
      ],
    });
  }
  return true;
}

const rehypeAnchorHeader: Plugin = () => {
  return (tree) => {
    visit(tree, "element", unshiftAnchor);
  };
};

export default rehypeAnchorHeader;
