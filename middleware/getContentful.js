export default async ({ store }) => {
  if (!store.state.posts.length) { await store.dispatch('fetchPosts'); }
};
