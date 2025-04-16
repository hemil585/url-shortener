import { ArrowRight, Copy } from "lucide-react";

interface ShortenedProps {
  shortenedUrl: string;
  copied: boolean;
  copyToClipboard: () => void;
}

export default function Shortened({
  shortenedUrl,
  copied,
  copyToClipboard,
}: ShortenedProps) {
  return (
    <>
      <div className="mt-6 sm:mt-8 bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg border border-gray-700 animate-fade-in">
        <h2 className="text-base sm:text-lg font-medium text-gray-200 mb-2 sm:mb-3 flex items-center">
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-400" />
          Your shortened URL
        </h2>
        <div className="font-sans flex items-center bg-gray-700 rounded-lg px-3 py-2 sm:py-2.5 mb-3 sm:mb-4">
          <p className="text-sm sm:text-sm md:text-base text-blue-400 flex-1 truncate">
            {shortenedUrl}
          </p>
          <button
            onClick={copyToClipboard}
            className="ml-2 p-1 sm:p-1.5 cursor-pointer rounded-md hover:bg-gray-600 transition-colors flex-shrink-0"
            title="Copy to clipboard"
          >
            <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
          </button>
        </div>
        {copied && (
          <p className="text-green-400 text-xs sm:text-sm text-center">
            Copied to clipboard!
          </p>
        )}
        <div className="mt-3 sm:mt-4 text-center">
          <a
            href={shortenedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold underline sm:text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Open shortened URL →
          </a>
        </div>
      </div>
    </>
  );
}
