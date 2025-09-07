import ArticleNavbarMobile from "./ArticleNavbarMobile";
import ArticleNavbarDesktop from "./ArticleNavbarDesktop";
import BlogCard from "./BlogCard";


import { useEffect, useState } from "react";
import { fetchPosts } from "@/api/posts";

const ArticleSection = () => {

  const categories = ["Highlight", "Dev", "Hobbies", "Art"];
  const [category, setCategory] = useState("Highlight");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getPosts = async () => {
      try {
        const data = await fetchPosts({ page, category }); 
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
        setIsLoading(false);
        if (data.currentPage >= data.totalPages) {
          setHasMore(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    getPosts();
  }, [page, category])

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  }

  return (
    <section className="w-full bg-[#f7f6f3] py-8 px-0">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-semibold text-2xl md:text-xl mb-4 px-4 md:px-0text-[#23211c] md:text-[#43403B]">
          Latest articles
        </h2>
        <div className="block md:hidden">
          <ArticleNavbarMobile />
        </div>
        <div className="hidden md:block">
          <ArticleNavbarDesktop />
        </div>
      </div>

      {/* Blog/Article Cards Section */}
      <div className="max-w-5xl mx-auto px-4 mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {
         posts.map((blog, index) => 
          <BlogCard 
            key={index}
            id={blog.id}
            image={blog.image}
            category={blog.category}
            title={blog.title}
            description={blog.description}
            author={blog.author}
            date={new Date(blog.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })} 
          />

        ) 
        }
      </div>
      {hasMore && (
        <div className="text-center mt-8">
          <button 
          onClick={handleLoadMore}
          className="cursor-pointer hover:text-muted-foreground font-medium underline"
          >
            {isLoading ? "Loading..." : "View more"}
          </button>
        </div>
      )}
    </section>
  );
};

export default ArticleSection;
