import Image from "next/image";
import Link from "next/link";
interface Article {
  id: number;
  slug: string;
  title: string;
  content: string;
  lang: string;
  imgUrl: string;
  alt: string;
}

const BlogList = ({ article }: { article: Article }) => {
  return (
    <div className="my-[2rem]">
      <div className="flex flex-col gap-5 my-[2rem] border-b-[1px] border-[rgb(165 165 165)] p-[1rem]">
        <Image
          src={article?.imgUrl}
          width={300}
          height={300}
          alt={article?.alt}
          loading="lazy"
          layout="responsive"
          className="max-h-[300px] object-cover rounded-[6px]"
        />
        <div className="flex flex-col gap-5">
          <h2 className="text-[rgb(235,64,54)] text-[2.5rem]">{article.title}</h2>
          <p dangerouslySetInnerHTML={{ __html: article.content }}></p>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
