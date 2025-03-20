"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const BlogPostPage = () => {
  const { slug, locale } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/blog/${slug}?lang=${locale}`);
      const data = await res.json();
      setPost(data);
    };
    fetchPost();
  }, [slug, locale]);

  if (!post) return <p>Ładowanie...</p>;

  return (
    <article>
      {/* <h1>{post.title}</h1>
      <p>{post.content}</p> */}
    </article>
  );
};

export default BlogPostPage;
