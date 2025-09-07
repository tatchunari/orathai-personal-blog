import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";



const NotFoundPage = () => {

  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center mx-10 gap-10 min-h-screen">
      <MdErrorOutline className="w-30 h-30"/>

      <p className="font-bold text-2xl">Page Not Found</p>
      <button 
      className="w-40 py-3 active:scale-95 transition text-sm text-white bg-[#26231E] hover:bg-brown-500 rounded-full"
      onClick={() => navigate('/')}
     >
        Go To Homepage
      </button>
    </div>
  )
}

export default NotFoundPage