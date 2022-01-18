import { EnumPostsQuery } from "../graphql/queries/enumPosts.generated";

export type Post = NonNullable<
  NonNullable<
    NonNullable<EnumPostsQuery["blogPostCollection"]>["items"]
  >[number]
>;
