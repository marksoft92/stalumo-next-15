import { useTranslations } from "next-intl";

interface LoadMoreButtonProps {
  loadMorePosts: () => void;
  loading: boolean;
}

const LoadMoreButton = ({ loadMorePosts, loading }: LoadMoreButtonProps) => {
  const t = useTranslations("Blog");
  return (
    <div>
      <button
        onClick={loadMorePosts}
        disabled={loading}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        {loading ? t("loading") : t("loadMore")}
      </button>
    </div>
  );
};

export default LoadMoreButton;
