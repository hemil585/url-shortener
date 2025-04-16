import Redirect from "./components/Redirect";
import Url from "./components/Url";

export default function App() {
  const url = window.location.pathname;  

  if (url === "/") {
    return (
      <div className="font-quicksand min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <Url />
      </div>
    );
  } else {
    return <Redirect />;
  }
}
