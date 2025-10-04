import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import AlertDialog from "../sub-components/AlertDialog";

const Comment = ({ comments = [] }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const isLoggedIn = false;

  const handleComment = () => {
    if (!isLoggedIn) {
      setIsDialogOpen(true);
      return;
    }
  };
  return (
    <div>
      <div className="space-y-4 px-4 mb-16">
        <h3 className="text-lg font-semibold">Comment</h3>
        <div className="space-y-2">
          <Textarea
            placeholder="What are your thoughts?"
            className="w-full p-4 h-24 resize-none py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
          />
          <div className="flex justify-end">
            <button
              className="px-8 py-2 bg-[#26231E] hover:bg-[#43403B] text-white rounded-full transition-colors cursor-pointer"
              onClick={handleComment}
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-6 px-4">
        {comments.map((comment, index) => (
          <div key={index} className="flex flex-col gap-2 mb-4">
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <img
                  src={comment.image}
                  alt={comment.name}
                  className="rounded-full w-12 h-12 object-cover"
                />
              </div>
              <div className="flex-grow">
                <div className="flex flex-col items-start justify-between">
                  <h4 className="font-semibold">{comment.name}</h4>
                  <span className="text-sm text-gray-500">{comment.date}</span>
                </div>
              </div>
            </div>
            <p className=" text-gray-600">{comment.comment}</p>
            {index < comments.length - 1 && (
              <hr className="border-gray-300 my-4" />
            )}
          </div>
        ))}
      </div>
      <AlertDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        message="Create an account to continue"
      />
    </div>
  );
};

export default Comment;
