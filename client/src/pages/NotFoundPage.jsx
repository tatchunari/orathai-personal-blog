import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <MdErrorOutline className="w-30 h-30" />
      <img
        className="w-50 h-50 sm:w-auto sm:h-auto"
        src="/crying-capy-nobg.gif"
        alt="crying-capy"
      />

      <p className="font-bold text-4xl mb-7">Page Not Found</p>
      <button
        className="w-40 py-3 active:scale-95 transition text-sm text-white bg-[#26231E] hover:bg-brown-500 rounded-full"
        onClick={() => navigate("/")}
      >
        Go To Homepage
      </button>
    </div>
  );
};

export default NotFoundPage;
