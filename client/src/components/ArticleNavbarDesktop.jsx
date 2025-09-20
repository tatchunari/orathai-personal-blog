import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostsData } from "@/hooks/usePostsData";
import { useCategoryData } from "@/hooks/useCategoryData";

const ArticleNavbarDesktop = () => {

  const { categories } = useCategoryData();
  const [selectedCategory, setSelectedCategory] = useState("Highlight");


  const { posts, loading } = usePostsData();
  const [query, setQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  
  if (value.trim === "") {
    setFilteredPosts([]);
  } else {
    const matches = posts.filter(
      (post) => post.title.toLowerCase().includes(value.toLowerCase())
      )
      setFilteredPosts(matches)
    }
  };

  // console.log(posts);

  const handleSelectedPost = (id) => {
    setQuery("");
    setFilteredPosts([]);
    navigate(`/post/${id}`);
  }

  return (
    <div className="hidden md:flex bg-[#efeeeb] rounded-xl p-4 items-center justify-between">
      {/* Category buttons */}
      <nav className="flex gap-4 flex-wrap">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;

          return (
            <Button
              key={cat.id}
              onClick={() => setSelectedCategory(cat)}
              disabled={isActive} // ปุ่มที่ถูกเลือกแล้วกดไม่ได้
              className={`rounded-lg px-6 py-2 font-medium transition-colors
                ${
                  isActive
                    ? "bg-[#75716B] text-white cursor-not-allowed" // active button
                    : "bg-white text-[#75716B] hover:text-[#43403B] hover:bg-[#d8d6d1]"
                }
              `}
            >
              {cat.name}
            </Button>
          );
        })}
      </nav>

      {/* Search input */}
      <form className="w-72 relative">
        <Input
          type="text"
          placeholder={loading ? "Loading posts" : "Search posts..."}
          value={query}
          onChange={handleSearchChange}
          disabled={loading}
          className="rounded-lg bg-white border border-[#e2e1de] focus:ring-0 pr-10"
        />
        <Search className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-[#43403B]" />
      {/* Drop-down Search Results */}
      {filteredPosts.length > 0 && (
        <ul className="absolute z-20 w-full mt-2 bg-white border border-gray-200 roundedlg shadow-lg max-h-60 overflow-y-auto">
          {filteredPosts.map((post) => (
            <li
            key={post.id}
            onClick={() => handleSelectedPost(post.id)}
            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {post.title}
            </li>
          ))}
        </ul>
      )}
      </form>
    </div>
  );
};

export default ArticleNavbarDesktop;
