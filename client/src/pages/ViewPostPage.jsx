import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import ViewPost from "@/components/ViewPost";


const ViewPostPage = () => {
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ViewPost />
      <Footer />
    </div>
  )
}

export default ViewPostPage;