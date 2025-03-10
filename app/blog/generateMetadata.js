export function generateMetadata(post) {
  return {
    title: post.title,
    description: post.excerpt || "Default description if none is provided",
    keywords: post.tags ? post.tags.join(", ") : "default, keywords",
    // Możesz dodać więcej pól, takich jak og:image dla mediów społecznościowych
  };
}
