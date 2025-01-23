import { Loader } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="text-[1.3em] flex flex-col justify-center items-center min-h-screen">
      <p className="mb-10 text-white font-medium">Loading, please wait...</p>
      <Loader className="text-center size-12 text-emerald-500 animate-spin" />
    </div>
  );
};

export default LoadingPage;
