import { generateMetadata } from "../generateMetadata";
import Head from "next/head";

// Funkcja do pobierania danych pojedynczego posta
async function fetchPostBySlug(slug) {
  const response = await fetch(`https://api.example.com/posts/${slug}`);
  const post = await response.json();
  return post;
}

export default function BlogPostPage({ post }) {
  const metadata = generateMetadata(post);

  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        {/* Dodaj inne metadane, np. dla mediów społecznościowych */}
      </Head>
      <article>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        {/* ... reszta kodu ... */}
      </article>
    </>
  );
}

// Funkcja do generowania statycznych ścieżek
export async function getStaticPaths() {
  const response = await fetch("https://api.example.com/posts");
  const posts = await response.json();

  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
}

// Funkcja do pobierania danych dla każdej ścieżki
export async function getStaticProps({ params }) {
  const post = await fetchPostBySlug(params.slug);
  return {
    props: {
      post,
    },
  };
}
