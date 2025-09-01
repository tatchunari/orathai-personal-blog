import ArticleNavbarMobile from "./ArticleNavbarMobile";
import ArticleNavbarDesktop from "./ArticleNavbarDesktop";
import BlogCard from "./BlogCard";
import { blogPosts } from "@/data/blogPost";

const ArticleSection = () => {
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
         blogPosts.map((post) => 
          <BlogCard 
            key={post.id}
            image={post.image}
            category={post.category}
            title={post.title}
            description={post.description}
            author={post.author}
            date={post.date} 
          />

        ) 
        }
      </div>
    </section>
  );
};

export default ArticleSection;
