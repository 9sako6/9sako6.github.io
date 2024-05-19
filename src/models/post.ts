export type PostMetadata = {
  title: string;
  description: string;
  date: string;
  topics: string[];
  category: string;
  published: boolean;
  eyecatch?: string;
  slug: string;
};

export type Post = PostMetadata & {
  bodyHtml: string;
  url: string;
};
