import { JSDOM } from "jsdom";

type Params = {
  htmlString: string;
};

const MAX_DESCRIPTION_LENGTH = 120;

export const generateDescription = ({ htmlString }: Params): string => {
  const html = new JSDOM(htmlString);

  const headings = html.window.document.body.querySelectorAll("h1,h2,h3,h4");
  headings.forEach((heading) => {
    heading.remove();
  });

  const description = html.window.document.body.textContent?.replaceAll(
    "\n",
    "",
  );

  if (!description) {
    return "";
  }

  if (description.length <= MAX_DESCRIPTION_LENGTH) {
    return description;
  }

  const suffix = "...";
  return (
    description.substring(0, MAX_DESCRIPTION_LENGTH - suffix.length) + suffix
  );
};
