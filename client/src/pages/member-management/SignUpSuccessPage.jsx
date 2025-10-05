import Navbar from "@/components/sub-components/Navbar";
import Footer from "@/components/sub-components/Footer";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SignUpSuccessPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4 my-4">
        <div className="flex flex-col space-y-8 items-center w-full max-w-xl bg-[#EFEEEB] rounded-sm shadow-md px-3 sm:px-20 py-14">
          <div className="relative">
            <img
              className="w-50 h-50"
              src="/success-capy-nobg.gif"
              alt="success-capy"
            />
          </div>
          <div className="flex flex-row gap-3 items-center">
            <h1 className="mt-4 text-2xl font-bold">Registration Successful</h1>
            <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="h-5 w-5 text-white" strokeWidth={3} />
            </div>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 bg-black text-white rounded-full hover:bg-muted-foreground cursor-pointer hover:bg-gray-700 transition-colors"
          >
            Continue
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
