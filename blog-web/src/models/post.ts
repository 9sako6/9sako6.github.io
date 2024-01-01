export type Post = {
  title: string;
  description: string;
  date: string;
  topics: string[];
  category: string;
  published: boolean;
  eyecatch?: string;
  slug: string;
};
