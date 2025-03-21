"use client";
import { useState } from "react";
import BlogList from "@/components/BlogList";
import LoadMoreButton from "@/components/LoadMoreButton";
import Link from "next/link";
import BackgroundSlider from "./BackgroundSilder";
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

const images: string[] = [
  "/assets/images/spawanie1.jpg",
  "/assets/images/spawanie2.jpg",
  "/assets/images/spawanie3.jpg",
  "/assets/images/spawanie4.jpg",
  "/assets/images/spawanie5.jpg",
];
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
    setPosts((prevPosts) => [...prevPosts, ...data?.posts]);
    setPage(newPage);
    setLoading(false);
  };

  return (
    <div>
      <BackgroundSlider images={images} maxHeight={"500px"} />
      <div className="flex flex-col items-center relative min-h-[500px] justify-center">
        <h2 className="text-[6rem] font-semibold uppercase">Blog</h2>
        <h3>
          <Link
            className="text-[1.6rem] font-semibold uppercase text-[#EB4036]"
            href="/"
          >
            Strona Główna
          </Link>
          <span className="text-[1.6rem] font-semibold uppercase ">/BLOG</span>
        </h3>
      </div>
      <BlogList posts={posts} />
      <LoadMoreButton loadMorePosts={loadMorePosts} loading={loading} />
    </div>
  );
};

export default BlogPage;
