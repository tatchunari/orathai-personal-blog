import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { useParams } from "react-router-dom";


const ViewPostPage = () => {

  const { postId } = useParams();
  return (
    <div>
      <h1>{postId}</h1>
      <Navbar />
      <Footer />
    </div>
  )
}

export default ViewPostPage;