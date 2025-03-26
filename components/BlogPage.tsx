"use client";
import { useState } from "react";
import BlogList from "@/components/BlogList";
import LoadMoreButton from "@/components/LoadMoreButton";
import { useParams } from "next/navigation";

interface BlogContent {
  slug: string;
  title: string;
  content: string;
  lang: string;
}

interface BlogPost {
  id: number;
  imgUrl: string;
  alt: string;
  pl: BlogContent;
  en: BlogContent;
  de: BlogContent;
}

const BlogPage = ({ initialPosts }: { initialPosts: BlogPost[] }) => {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const locale = params?.locale as keyof BlogPost;

  // Funkcja do ładowania nowych postów
  const loadMorePosts = async () => {
    setLoading(true);
    const newPage = page + 1;
    const res = await fetch(`/api/blog?lang=${locale}&page=${newPage}&limit=5`);
    const data = await res.json();
    setPosts((prevPosts) => [...prevPosts, ...(data?.posts || [])]);
    setPage(newPage);
    setLoading(false);
  };

  return (
    <>
      <BlogList posts={posts} />
      <LoadMoreButton loadMorePosts={loadMorePosts} loading={loading} />
    </>
  );
};

export default BlogPage;
