import Image from "next/image";
import Link from "next/link";
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

const BlogList = ({ posts }: { posts: BlogPost[] }) => {
  const params = useParams();
  const locale = params?.locale as keyof BlogPost;

  return (
    <div className="my-[2rem]">
      {posts.map((post) => {
        const postContent = post[locale] as BlogContent;

        return (
          <Link
            key={post.id}
            href={`/${locale}/blog/${postContent.slug}`}
            className="opacity-100 hover:opacity-50 transition duration-300"
          >
            <div className="flex gap-5 my-[2rem] border-b-[1px] border-[rgb(165 165 165)] p-[1rem] max-lg:flex-col">
              <Image
                src={post.imgUrl}
                width={300}
                height={300}
                alt={post.alt}
                loading="lazy"
                className="max-h-[300] rounded-[6px]"
              />
              <div className="flex flex-col gap-5">
                <h2 className="text-[rgb(235,64,54)]">{postContent.title}</h2>
                <p
                  dangerouslySetInnerHTML={{
                    __html: postContent?.content?.slice(0, 300) + "...",
                  }}
                ></p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default BlogList;
