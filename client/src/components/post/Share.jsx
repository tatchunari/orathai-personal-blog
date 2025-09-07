import { SmilePlus, Copy } from "lucide-react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import AlertDialog from "../AlertDialog";
import { useState } from "react";

function Share({ postId, likesAmount }) {
  const shareLink = encodeURI(window.location.href);
  console.log(shareLink);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isLoggedIn = false;

  const handleLike = () => {
    if (!isLoggedIn) {
      setIsDialogOpen(true);
      return;
    }
  }
  return (
    <div className="md:px-4">
      <div className="bg-[#EFEEEB] py-4 px-4 md:rounded-sm flex flex-col space-y-4 md:gap-16 md:flex-row md:items-center md:space-y-0 md:justify-between mb-10">
        <button 
        className="bg-white flex items-center justify-center space-x-2 px-11 py-3 rounded-full text-foreground border border-foreground hover:bg-[#26231E] hover:border-muted-foreground hover:text-white transition-colors group cursor-pointer"
        onClick={handleLike}
        >
          <SmilePlus className="w-5 h-5 text-foreground group-hover:text-muted-foreground transition-colors" />
          <span className="text-foreground group-hover:text-muted-foreground font-medium transition-colors">
            {likesAmount}
          </span>
        </button>
         <AlertDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        message="Create an account to continue" />
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              navigator.clipboard.writeText(shareLink);
            }}
            className="bg-white flex flex-1 items-center justify-center space-x-2 px-11 py-3 rounded-full text-foreground border border-foreground hover:border-muted-foreground hover:text-white hover:bg-[#26231E] transition-colors group"
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