import axios from "axios";
import { useState } from "react";
import NotFound from "./NotFound";
import { useNavigate } from "react-router-dom";

export default function Redirect() {
  const navigate = useNavigate();
  const shortCode = window.location.pathname.split("/")[1];
  const [found, setFound] = useState<boolean>(true);

  const redirect = async () => {
    try {
      const res = await axios.get(`import.meta.env.VITE_API_URL/${shortCode}`);
      if (res.data.success === false) throw new Error("response undefined");
      window.location.replace(res.data.redirectUrl);
      setFound(true);
    } catch (error: unknown) {
      setFound(false);
      navigate("/");
    }
  };

  if (shortCode !== "") {
    redirect();
  }

  return (
    <>
      {!found ? <NotFound /> : <div className="w-full h-screen bg-black"></div>}
    </>
  );
}
