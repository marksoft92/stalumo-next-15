interface LoadMoreButtonProps {
  loadMorePosts: () => void;
  loading: boolean;
}

const LoadMoreButton = ({ loadMorePosts, loading }: LoadMoreButtonProps) => {
  return (
    <div>
      <button
        onClick={loadMorePosts}
        disabled={loading}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        {loading ? "Ładowanie..." : "Załaduj więcej"}
      </button>
    </div>
  );
};

export default LoadMoreButton;
