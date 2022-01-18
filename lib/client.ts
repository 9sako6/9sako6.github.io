import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const httpLink = createHttpLink({
  uri: `https://graphql.contentful.com/content/v1/spaces/${process.env.CTF_SPACE_ID}?access_token=${process.env.CTF_CDA_ACCESS_TOKEN}`,
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
});
