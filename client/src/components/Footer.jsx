import { Github, Linkedin, Twitter, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-6 md:gap-0 items-center justify-between">
        
        {/* LEFT */}
        <div className="text-center md:text-left">
          <h2 className="text-pink-400 text-lg font-semibold">
            Cine<span className="text-white">Stack</span> 
          </h2>
          <p className="text-sm mt-1">
            Built with hot Cofee, bugs & dedication.
          </p>
        </div>

        {/* CENTER */}
        <div className="flex gap-6 text-sm">
          <a href="/" className="hover:text-pink-500 transition">Home</a>
          <a href="/search" className="hover:text-pink-500 transition">Search</a>
          <a href="/watchlist" className="hover:text-pink-500 transition">Watchlist</a>
          <a href="/favourite" className="hover:text-pink-500 transition">Favourite</a>
        </div>

        {/* RIGHT */}
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition">
            <Github size={20} />
          </a>
          <a href="#" className="hover:text-white transition">
            <Linkedin size={20} />
          </a>
          <a href="#" className="hover:text-white transition">
            <Twitter size={20} />
          </a>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="text-center text-xs py-4 border-t border-white/10">
        <p className="flex justify-center items-center gap-1">
          © {new Date().getFullYear()} Made by Harsh-Raaz and Yaman
        </p>
      </div>
    </footer>
  );
};

export default Footer;
