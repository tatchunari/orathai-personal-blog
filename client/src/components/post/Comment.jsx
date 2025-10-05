import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useAuth } from "@/context/authentication";
import AlertDialog from "../sub-components/AlertDialog";
import axios from "axios";
import supabase from "@/lib/supabaseClient";
import { toast } from "sonner";
import { X } from "lucide-react";

const Comment = ({ postId, comments = [], onCommentAdded }) => {
  const { isAuthenticated, state } = useAuth();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleComment = async () => {
    if (!isAuthenticated) {
      setIsDialogOpen(true);
      return;
    }

    if (!commentText.trim()) {
      toast.custom((t) => (
        <div className="bg-yellow-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Empty comment</h2>
            <p className="text-sm">Please write something before submitting.</p>
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

    setIsSubmitting(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const response = await axios.post(
        `https://orathai-personal-blog-backend.vercel.app/posts/${postId}/comments`,
        { content: commentText },
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      if (response.status === 201) {
        setCommentText("");
        onCommentAdded(response.data.comment); // Callback to update parent
        toast.custom((t) => (
          <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
            <div>
              <h2 className="font-bold text-lg mb-1">Comment posted!</h2>
              <p className="text-sm">Your comment has been added.</p>
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
      console.error("Failed to post comment:", error);
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Error!</h2>
            <p className="text-sm">Failed to post comment. Please try again.</p>
          </div>
          <button
            onClick={() => toast.dismiss(t)}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
      ));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const response = await axios.delete(
        `https://orathai-personal-blog-backend.vercel.app/posts/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        }
      );

      if (response.status === 200) {
        onCommentAdded(); // Refresh comments list
        toast.custom((t) => (
          <div className="bg-green-500 text-white p-4 rounded-sm flex justify-between items-start">
            <div>
              <h2 className="font-bold text-lg mb-1">Deleted!</h2>
              <p className="text-sm">Comment has been removed.</p>
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
      console.error("Failed to delete comment:", error);
      toast.custom((t) => (
        <div className="bg-red-500 text-white p-4 rounded-sm flex justify-between items-start">
          <div>
            <h2 className="font-bold text-lg mb-1">Error!</h2>
            <p className="text-sm">Failed to delete comment.</p>
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
    <div>
      {/* Comment Input Section */}
      <div className="space-y-4 px-4 mb-16">
        <h3 className="text-lg font-semibold">Comment</h3>
        <div className="space-y-2">
          <Textarea
            placeholder="What are your thoughts?"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            disabled={isSubmitting}
            className="w-full p-4 h-24 resize-none py-3 rounded-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-muted-foreground"
          />
          <div className="flex justify-end">
            <button
              className="px-8 py-2 bg-[#26231E] hover:bg-[#43403B] text-white rounded-full transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleComment}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>

      {/* Comments List Section */}
      <div className="space-y-6 px-4">
        <h3 className="text-lg font-semibold">
          {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
        </h3>

        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment, index) => (
            <div key={comment.id} className="flex flex-col gap-2 mb-4">
              <div className="flex space-x-4">
                <div className="flex-shrink-0">
                  <img
                    src={comment.profiles?.avatar_url || "/default-avatar.png"}
                    alt={comment.profiles?.name}
                    className="rounded-full w-12 h-12 object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">
                        {comment.profiles?.name}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.created_at).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    {isAuthenticated &&
                      state.profile?.id === comment.user_id && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-red-500 hover:text-red-700 text-sm"
                        >
                          Delete
                        </button>
                      )}
                  </div>
                  <p className="text-gray-600 mt-2">{comment.content}</p>
                </div>
              </div>
              {index < comments.length - 1 && (
                <hr className="border-gray-300 my-4" />
              )}
            </div>
          ))
        )}
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
