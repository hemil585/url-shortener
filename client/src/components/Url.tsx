import { useState } from "react";
import axios from "axios";
import { Link, Scissors } from "lucide-react";
import toast from "react-hot-toast";
import Shortened from "./Shortened";
import { isValidUrl } from "../utils/validUrl";
import { formatUrl } from "../utils/formatUrl";

export default function Url() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const onSubmitHandler = async () => {
    if (!originalUrl) {
      toast.error("Please enter a URL");
      return;
    }

    try {
      setIsLoading(true);
      const validateUrl = isValidUrl(originalUrl);
      if (validateUrl) {
        const encodedUrl = formatUrl(originalUrl);
        const response = await axios(
          `import.meta.env.VITE_API_URL/check-url?url=${encodedUrl}`
        );
        const data = response.data;
        if (data.success === false) {
          toast.error(data.error);
          return;
        }
        setOriginalUrl(data.url);
      } else {
        toast.error("Invalid URL. Please try again.");
        return;
      }

      const encodedUrl = formatUrl(originalUrl);
      const res = await axios.post("import.meta.env.VITE_API_URL/getUrl", {
        encodedUrl,
      });
      setShortenedUrl(res.data.shortenedUrl);
    } catch (err) {
      toast.error("Failed to shorten URL. Please try again.");
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setOriginalUrl("");
      }, 3000);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-12 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <div className="text-center mb-8 sm:mb-10">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            <Scissors className="w-8 h-8 sm:w-10 sm:h-10 text-blue-400 mr-2" />
            <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              URL Shortener
            </h1>
          </div>
          <p className="text-sm font-semibold sm:text-base text-gray-400 max-w-sm mx-auto">
            Transform your long URLs into short, manageable links with just a
            click.
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg border border-gray-700">
          <div className="mb-5 sm:mb-6">
            <label
              htmlFor="url-input"
              className="block text-sm font-semibold text-gray-300 mb-2"
            >
              Enter your long URL
            </label>
            <div className="flex items-center bg-gray-700 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              <Link className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-2 flex-shrink-0" />
              <input
                id="url-input"
                type="text"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                placeholder="https://example.com/long/url"
                className="bg-transparent border-none outline-none flex-1 text-md sm:text-base text-white placeholder-gray-500 w-full"
              />
            </div>
          </div>

          <button
            onClick={onSubmitHandler}
            disabled={isLoading}
            className="w-full font-semibold bg-gradient-to-r cursor-pointer from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 sm:py-2.5 px-4 rounded-lg transition-all duration-200 flex items-center justify-center disabled:opacity-70 text-sm sm:text-base"
          >
            {isLoading ? (
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            ) : (
              <Scissors className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            )}
            {isLoading ? "Shortening..." : "Shorten URL"}
          </button>
        </div>

        {shortenedUrl && (
          <Shortened
            shortenedUrl={shortenedUrl}
            copied={copied}
            copyToClipboard={copyToClipboard}
          />
        )}
      </div>
    </div>
  );
}
