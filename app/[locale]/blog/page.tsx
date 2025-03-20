"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Container from "@/components/ui/container";
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Blog | My Website",
//   description: "Najświeższe artykuły na temat X, Y, Z.",
//   alternates: {
//     canonical: "/blog",
//   },
//   openGraph: {
//     title: "Blog | My Website",
//     description: "Najświeższe artykuły na temat X, Y, Z.",
//     url: "/blog",
//     siteName: "My Website",
//     type: "website",
//   },
// };

const BlogPage = () => {
  const { locale } = useParams(); // Pobiera język z URL-a
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch(`/api/blog?lang=${locale}&page=${page}`);
      const data = await res.json();
      setPosts(data.posts);
      setTotal(data.total);
    };
    fetchPosts();
  }, [locale, page]);

  return (
    <Container>
      <div>
        <h1>Blog ({locale})</h1>
        {/* <BlogList posts={posts} /> */}
        {posts.length < total && (
          <button onClick={() => setPage(page + 1)}>Załaduj więcej</button>
        )}
      </div>
    </Container>
  );
};

export default BlogPage;
