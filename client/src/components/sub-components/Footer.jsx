import { FaGithub, FaGoogle, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-[#EFEEEB] py-8 px-18">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-between">
        {/* Left: Get in touch and icons */}
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
          <div className="flex flex-row items-center justify-center gap-5">
          <span className="font-medium text-[#43403B] text-center">Get in touch</span>
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/orathai-saengsoemsap-8b5790343/" aria-label="LinkedIn">
              <FaLinkedin className="w-6 h-6 text-[#35332e] hover:text-[#75716B] transition" />
            </a>
            <a href="https://github.com/tatchunari" aria-label="GitHub">
              <FaGithub className="w-6 h-6 text-[#35332e] hover:text-[#75716B] transition" />
            </a>
            <a href="mayom.orathai@gmail.com" aria-label="Google">
              <FaGoogle className="w-6 h-6 text-[#35332e] hover:text-[#75716B] transition" />
            </a>
          </div>
          </div>
        </div>
        {/* Right: Home page link */}
        <div className="mt-4 md:mt-0">
          <a href="/" className="font-medium text-[#43403B] hover:underline hover:text-black transition">Home page</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer