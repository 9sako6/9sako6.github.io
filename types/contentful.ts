export interface contentfulBlogPost {
  sys: any;
  items: any;
}

export interface contentfulItems {
  fields: any;
}

export interface contentfulBlogPostFields {
  slug: string;
  tags?: any;
}

export interface contentfulTagFields {
  fields: {
    slug: string;
    name: string;
  };
}
