import { Loader } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="text-[1.3em] flex flex-col justify-center items-center min-h-screen ">
      <Loader className="text-center size-12 text-emerald-500 animate-spin " />
      <p className="text-white uppercase text-lg font-bold text-center px-6 mt-4">
        The server may take up to 50 seconds to become active. Thank you for
        your patience.
      </p>
    </div>
  );
};

export default LoadingPage;
