import { useEffect, useState } from "react";
import { useQuery } from "@/hooks/useQuery";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "axios";

import LoadingScreen from "@/pages/LoadingScreen";
import AuthorBio from "../post/AuthorBio";
import Comment from "../post/Comment";
import Share from "../post/Share";
import NotFoundPage from "@/pages/NotFoundPage";

const ViewPost = () => {
  const [img, setImg] = useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [likes, setLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const params = useParams();
  const postId = params.id;
  const { data: post } = useQuery(`posts/${params.id}`, [params.id]);

  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://orathai-personal-blog-backend.vercel.app/posts/${params.id}`
      );
      console.log(response);

      if (!response.data || Object.keys(response.data).length === 0) {
        setNotFound(true);
      }

      setImg(response.data.thumbnail_image);
      setTitle(response.data.title);
      setDate(response.data.created_at);
      setDescription(response.data.description);
      setCategory(response.data.category);
      setContent(response.data.content);
      setLikes(response.data.likes);
      setIsLoading(false);
    } catch (error) {
      console.log(error);

      if (error.response && error.response.status === 404) {
        setNotFound(true);
      }
      setIsLoading(false);
    }
  };
  if (notFound) return <NotFoundPage />;
  if (isLoading || !post) return <LoadingScreen />;
  return (
    <div className="max-w-7xl mx-auto space-y-8 container md:px-8 pb-20 md:pb-28 md:pt-8 lg:pt-16">
      <div className="space-y-4 md:px-4">
        <img
          src={img}
          alt={title}
          className="md:rounded-lg object-cover w-full h-[260px] sm:h-[340px] md:h-[587px]"
        />
      </div>
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="xl:w-3/4 space-y-8">
          <article className="px-4">
            <div className="flex">
              <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600 mb-2">
                {category}
              </span>
              <span className="px-3 py-1 text-sm font-normal text-muted-foreground">
                {new Date(date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="mt-4 mb-10">{description}</p>

            <div className="markdown">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </article>

          <div className="xl:hidden px-4">
            <AuthorBio post={post} />
          </div>

          <Share likesAmount={likes} postId={postId} />
          <Comment />
        </div>

        <div className="hidden xl:block xl:w-1/4">
          <div className="sticky top-4">
            <AuthorBio post={post} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
