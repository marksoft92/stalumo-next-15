"use client";
import { useState, useEffect } from "react";
import BlogList from "@/components/BlogList";
import LoadMoreButton from "@/components/LoadMoreButton";

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  lang: string;
  imgUrl: string;
}

const BlogPage = ({ initialPosts }: { initialPosts: BlogPost[] }) => {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Funkcja do ładowania nowych postów
  const loadMorePosts = async () => {
    setLoading(true);
    const newPage = page + 1;
    const res = await fetch(`/api/blog?page=${newPage}&limit=5`);
    const data = await res.json();
    setPosts((prevPosts) => [...prevPosts, ...data.posts]);
    setPage(newPage);
    setLoading(false);
  };

  return (
    <div>
      <h1>Blog</h1>
      <BlogList posts={posts} />
      <LoadMoreButton loadMorePosts={loadMorePosts} loading={loading} />
    </div>
  );
};

export default BlogPage;
