import { SmilePlus, Copy } from "lucide-react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import AlertDialog from "../sub-components/AlertDialog";
import { useState } from "react";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useAuth } from "@/context/authentication";
import axios from "axios";

function Share({ postId, likesAmount }) {
  const shareLink = encodeURI(window.location.href);
  const { isAuthenticated } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [likes, setLikes] = useState(likesAmount);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = async () => {
    if (!isAuthenticated) {
      setIsDialogOpen(true);
      return;
    }

    try {
      // Prevent multiple likes
      if (hasLiked) {
        toast.custom((t) => (
          <div className="bg-yellow-500 text-white p-4 rounded-sm flex justify-between items-start max-w-md w-full">
            <div>
              <h2 className="font-bold text-lg mb-1">Already liked!</h2>
              <p className="text-sm">You've already liked this article.</p>
            </div>
            <button
              onClick={() => toast.dismiss(t)}
              className="text-white hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
        ));
        return;
      }

      // Call API to increase like count
      const response = await axios.post(
        `https://orathai-personal-blog-backend.vercel.app/posts/${postId}/likes`
      );

      if (response.status === 200) {
        setLikes(likes + 1);
        setHasLiked(true);
        toast.custom((t) => (
          <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start max-w-md w-full">
            <div>
              <h2 className="font-bold text-lg mb-1">Liked!</h2>
              <p className="text-sm">Thank you for liking this article.</p>
            </div>
            <button
              onClick={() => toast.dismiss(t)}
              className="text-white hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>
        ));
      }
    } catch (error) {
      console.error("Error liking post:", error);
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start max-w-md w-full">
          <div>
            <h2 className="font-bold text-lg mb-1">Error!</h2>
            <p className="text-sm">
              Failed to like the article. Please try again.
            </p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    }
  };

  return (
    <div className="md:px-4">
      <div className="bg-[#EFEEEB] py-4 px-4 md:rounded-sm flex flex-col space-y-4 md:gap-16 md:flex-row md:items-center md:space-y-0 md:justify-between mb-10">
        {/* Like Article Button */}
        <button
          className={`bg-white flex items-center justify-center space-x-2 px-11 py-3 rounded-full border transition-colors group cursor-pointer ${
            hasLiked
              ? "bg-[#26231E] border-muted-foreground"
              : "text-foreground border-foreground hover:bg-[#26231E] hover:border-muted-foreground hover:text-white"
          }`}
          onClick={handleLike}
        >
          <SmilePlus
            className={`w-5 h-5 transition-colors ${
              hasLiked
                ? "text-muted-foreground"
                : "text-foreground group-hover:text-muted-foreground"
            }`}
          />
          <span
            className={`font-medium transition-colors ${
              hasLiked
                ? "text-muted-foreground"
                : "text-foreground group-hover:text-muted-foreground"
            }`}
          >
            {likes}
          </span>
        </button>

        {/* Alert Dialog when not logged in */}
        <AlertDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          message="Create an account to continue"
        />
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              navigator.clipboard.writeText(shareLink);
              toast.custom((t) => (
                <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start max-w-md w-full">
                  <div>
                    <h2 className="font-bold text-lg mb-1">Copied!</h2>
                    <p className="text-sm">
                      This article has been copied to your clipboard.
                    </p>
                  </div>
                  <button
                    onClick={() => toast.dismiss(t)}
                    className="text-white hover:text-gray-200"
                  >
                    <X size={20} />
                  </button>
                </div>
              ));
            }}
            className="bg-white flex flex-1 items-center justify-center space-x-2 px-11 py-3 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-white hover:bg-[#26231E] transition-colors group cursor-pointer"
          >
            <Copy className="w-5 h-5 text-foreground transition-colors group-hover:text-muted-foreground" />
            <span className="text-foreground font-medium transition-colors group-hover:text-muted-foreground">
              Copy
            </span>
          </button>
          <a
            href={`https://www.facebook.com/share.php?u=${shareLink}`}
            target="_blank"
            className="bg-white p-3 rounded-full border text-foreground border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
          >
            <FaFacebook className="h-6 w-6" />
          </a>

          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareLink}`}
            target="_blank"
            className="bg-white p-3 rounded-full border text-foreground border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
          >
            <FaLinkedin className="h-6 w-6" />
          </a>

          <a
            href={`https://www.twitter.com/share?&url=${shareLink}`}
            target="_blank"
            className="bg-white p-3 rounded-full border text-foreground border-foreground hover:border-muted-foreground hover:text-muted-foreground transition-colors"
          >
            <FaSquareXTwitter className="h-6 w-6" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Share;
