import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePostsData } from "@/hooks/usePostsData";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useCategoryData } from "@/hooks/useCategoryData";

const ArticleNavbarMobile = () => {
  // const categories = [
  // { value: "highlight", label: "Highlight" },
  // { value: "dev", label: "Dev" },
  // { value: "hobbies", label: "Hobbies" },
  // { value: "art", label: "Art" },
  // ];

  const [selectedCategory, setSelectedCategory] = useState("highlight");

  const { posts, loading } = usePostsData();
  const { categories } = useCategoryData();
  const [query, setQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim === "") {
      setFilteredPosts([]);
    } else {
      const matches = posts.filter((post) =>
        post.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPosts(matches);
    }
  };

  const handleSelectedPost = (id) => {
    setQuery("");
    setFilteredPosts([]);
    navigate(`/post/${id}`);
  };

  return (
    <div className="bg-[#efeeeb] px-4 py-6 md:hidden">
      {/* Search Bar */}
      <form className="mb-6 relative">
        <Input
          type="text"
          placeholder={loading ? "Loading posts" : "Search posts..."}
          value={query}
          onChange={handleSearchChange}
          disabled={loading}
          className="bg-white border border-[#d6d3cb] focus:ring-0 pr-12 text-base placeholder:text-[#75716B]"
        />
        <Search className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-[#75716B] pointer-events-none" />
        {/* Dropdown Search Result */}
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

      {/* Category Dropdown */}
      <div className="mb-2 text-[#75716B] text-lg">Category</div>
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger className="w-full h-14 border border-[#d6d3cb] bg-white text-[#75716B] px-4">
          <SelectValue placeholder="Highlight" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-[#d6d3cb] text-[#75716B]">
          {categories.map((cat) => (
            <SelectItem
              key={cat.id}
              value={cat.value}
              className="hover:bg-gray-100 cursor-pointer"
            >
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ArticleNavbarMobile;
