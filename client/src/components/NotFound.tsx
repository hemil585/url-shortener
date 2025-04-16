import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-9xl font-extrabold text-white tracking-widest">
          404
        </h1>
        <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
          Page Not Found
        </div>
        <div className="mt-8">
          <div className="text-gray-300 text-xl font-medium">
            Oops! The URL you're looking for doesn't exist
          </div>
          <div className="text-gray-400 mt-4">
            The link might be broken, or the URL may have been shortened
            incorrectly.
          </div>
        </div>

        <div className="mt-12">
          <button className="cursor-pointer relative inline-block px-8 py-3 text-white bg-[#FF6A3D] rounded-lg group overflow-hidden font-medium">
            <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 ease-out bg-white group-hover:h-full"></span>
            <button
              onClick={() => navigate(0)}
              className="relative cursor-pointer group-hover:text-[#FF6A3D]"
            >
              Back to Homepage
            </button>
          </button>
        </div>

        <div className="mt-12">
          <p className="text-gray-500">
            Want to shorten a new URL?
            <button
              onClick={() => navigate(0)}
              className="text-[#FF6A3D] cursor-pointer ml-2 hover:underline"
            >
              Get Started
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
