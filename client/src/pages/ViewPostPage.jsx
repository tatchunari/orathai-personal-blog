import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";


const ViewPostPage = () => {

  const { postId } = useParams();
  const blog = posts.find((post) => post.id.toString() === postId);
  if (!blog) return <NotFoundPage/>

  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <Footer />
    </div>
  )
}

export default ViewPostPage;