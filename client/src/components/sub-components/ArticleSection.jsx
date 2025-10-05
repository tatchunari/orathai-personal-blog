import ArticleNavbarMobile from "./ArticleNavbarMobile";
import ArticleNavbarDesktop from "./ArticleNavbarDesktop";
import BlogCard from "./BlogCard";
import { useState, useMemo } from "react";
import { usePostsData } from "@/hooks/usePostsData";
import { InlineLoadingScreen } from "./InlineLoadingScreen";

const ArticleSection = () => {
  const { posts, loading } = usePostsData();
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter posts based on selected category
  const filteredPosts = useMemo(() => {
    if (selectedCategory === "All") {
      return posts; // Show all posts
    }
    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  return (
    <section className="w-full bg-[#f7f6f3] py-8 px-0">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-semibold text-2xl md:text-xl mb-4 px-4 md:px-0text-[#23211c] md:text-[#43403B]">
          Latest articles
        </h2>
        <div className="block md:hidden">
          <ArticleNavbarMobile
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
        <div className="hidden md:block">
          <ArticleNavbarDesktop
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </div>

      {/* Blog/Article Cards Section */}
      {/* Blog/Article Cards Section */}
      <div className="max-w-5xl mx-auto px-4 mt-6">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <InlineLoadingScreen />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  id={post.id}
                  image={post.thumbnail_image}
                  category={post.category}
                  title={post.title}
                  description={post.content}
                  author={post.author}
                  authorImage={post.profiles?.avatar_url}
                  date={new Date(post.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                />
              ))
            ) : (
              <p className="col-span-2 text-center text-muted-foreground">
                No articles found in this category
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticleSection;
