import Navbar from "@/components/sub-components/Navbar";
import Footer from "@/components/sub-components/Footer";

import ViewPost from "@/components/sub-components/ViewPost";

const ViewPostPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ViewPost />
      <Footer />
    </div>
  );
};

export default ViewPostPage;
