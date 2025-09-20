import ArticleNavbarMobile from "./ArticleNavbarMobile";
import ArticleNavbarDesktop from "./ArticleNavbarDesktop";
import BlogCard from "./BlogCard";


import { useEffect, useState } from "react";
import { usePostsData } from "@/hooks/usePostsData";

const ArticleSection = () => {

  const { posts, loading } = usePostsData();
  const categories = ["Highlight", "Dev", "Hobbies", "Art"];
  const [category, setCategory] = useState("Highlight");
  const [isLoading, setIsLoading] = useState(false);

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
         posts.map((post) => 
          <BlogCard 
            key={post.id}
            id={post.id}
            image={post.thumbnail_image}
            category={post.category}
            title={post.title}
            description={post.content}
            author={post.author}
            date={new Date(post.created_at).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })} 
          />

        ) 
        }
      </div>
    </section>
  );
};

export default ArticleSection;
