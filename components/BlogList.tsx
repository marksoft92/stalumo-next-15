import Image from "next/image";
import Link from "next/link";
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  lang: string;
  imgUrl: string;
  alt: string;
}

const BlogList = ({ posts }: { posts: BlogPost[] }) => {
  return (
    <div className="my-[2rem]">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/${post?.lang}/blog/${post?.slug}`}
          className="opacity-100 hover:opacity-50 transition duration-300"
        >
          <div className="flex gap-5 my-[2rem] border-b-[1px] border-[rgb(165 165 165)] p-[1rem]">
            <Image
              src={post?.imgUrl}
              width={300}
              height={300}
              alt={post?.alt}
              loading="lazy"
            />
            <div className="flex flex-col gap-5">
              <h2 className="text-[rgb(235,64,54)]">{post.title}</h2>
              <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogList;
