interface BlogPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  lang: string;
  imgUrl: string;
}

const BlogList = ({ posts }: { posts: BlogPost[] }) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
