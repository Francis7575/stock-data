import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const StockData = () => {
  const [eyeVisible, setEyeVisible] = useState<boolean>(false);

  const toggleEyeVisiblity = () => {
    setEyeVisible((prev) => !prev);
  };

  return (
    <div className="mt-12 ml-8">
      <h1 className="text-gray text-sm font-semibold mb-2">TOTAL INVESTING</h1>
      <span>3223</span>
      <button onClick={toggleEyeVisiblity}>
        {eyeVisible ? (
          <EyeOff color="#8d8e90" size={20} />
        ) : (
          <Eye color="#8d8e90" size={20} />
        )}
      </button>
    </div>
  );
};

export default StockData;
