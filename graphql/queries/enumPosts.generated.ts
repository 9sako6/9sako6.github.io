import * as Types from '../graphql.d';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type EnumPostsQueryVariables = Types.Exact<{
  where?: Types.InputMaybe<Types.BlogPostFilter>;
}>;


export type EnumPostsQuery = { __typename?: 'Query', blogPostCollection?: { __typename?: 'BlogPostCollection', items: Array<{ __typename?: 'BlogPost', body?: string | null | undefined, title?: string | null | undefined, description?: string | null | undefined, slug?: string | null | undefined, eyeCatchImage?: { __typename?: 'Asset', url?: string | null | undefined } | null | undefined, sys: { __typename?: 'Sys', id: string, publishedAt?: any | null | undefined, firstPublishedAt?: any | null | undefined } } | null | undefined> } | null | undefined };


export const EnumPostsDocument = gql`
    query enumPosts($where: BlogPostFilter) {
  blogPostCollection(where: $where, order: sys_firstPublishedAt_DESC) {
    items {
      body
      title
      description
      slug
      eyeCatchImage {
        url
      }
      sys {
        id
        publishedAt
        firstPublishedAt
      }
    }
  }
}
    `;

/**
 * __useEnumPostsQuery__
 *
 * To run a query within a React component, call `useEnumPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEnumPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEnumPostsQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useEnumPostsQuery(baseOptions?: Apollo.QueryHookOptions<EnumPostsQuery, EnumPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EnumPostsQuery, EnumPostsQueryVariables>(EnumPostsDocument, options);
      }
export function useEnumPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EnumPostsQuery, EnumPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EnumPostsQuery, EnumPostsQueryVariables>(EnumPostsDocument, options);
        }
export type EnumPostsQueryHookResult = ReturnType<typeof useEnumPostsQuery>;
export type EnumPostsLazyQueryHookResult = ReturnType<typeof useEnumPostsLazyQuery>;
export type EnumPostsQueryResult = Apollo.QueryResult<EnumPostsQuery, EnumPostsQueryVariables>;