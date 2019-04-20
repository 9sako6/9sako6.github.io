export type contentfulBlogPost = {
  sys: any;
  items: any;
}

export type contentfulItems = {
  fields: any;
}

export type contentfulBlogPostFields = {
  slug: string;
  tags?: any;
}
export type contentfulTagFields = {
  fields: {
    slug: string;
    name: string;
  };
}
