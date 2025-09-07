import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import LoadingScreen from '@/pages/LoadingScreen';
import ReactMarkdown from 'react-markdown';
import AuthorBio from './post/AuthorBio';
import Comment from './post/Comment';
import Share from './post/Share';

const ViewPost = () => {

  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [likes, setLikes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    getPost();
  }, [])

  const getPost = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://blog-post-project-api.vercel.app/posts/${params.id}`);

      setImg(response.data.image);
      setTitle(response.data.title);
      setDate(response.data.date);
      setDescription(response.data.description);
      setCategory(response.data.category);
      setContent(response.data.content);
      setLikes(response.data.likes);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingScreen />;
  }
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
            <AuthorBio />
          </div>

          <Share likesAmount={likes} />
          <Comment />
        </div>

        <div className="hidden xl:block xl:w-1/4">
          <div className="sticky top-4">
            <AuthorBio />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewPost