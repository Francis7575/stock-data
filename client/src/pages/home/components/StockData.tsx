import { Eye, EyeOff, TrendingUp } from "lucide-react";
import { useState } from "react";
import { formatAmount } from "@/lib/utils";

const StockData = () => {
  const [eyeVisible, setEyeVisible] = useState<boolean>(false);

  const toggleEyeVisiblity = () => {
    setEyeVisible((prev) => !prev);
  };

  return (
    <section className="mt-8 mb-12 pl-5 border-b border-dark-gray">
      <div className="pb-6  ">
        <h1 className="text-gray text-sm font-semibold mb-1">
          TOTAL INVESTING
        </h1>
        <div className="flex items-center gap-2">
          <div className="text-white text-[1.8rem]">
            {eyeVisible ? (
              <span>{formatAmount(5000)}</span>
            ) : (
              <span>******</span>
            )}
          </div>
          <button
            onClick={toggleEyeVisiblity}
            className="bg-dark-gray hover:bg-menu-lyrics p-[.4rem] rounded-full"
          >
            {eyeVisible ? (
              <EyeOff color="#8d8e90" size={20} />
            ) : (
              <Eye color="#8d8e90" size={20} />
            )}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp color="rgb(49, 139, 86)" className="size-6" />
          <span className="text-dark-green">+32.5 (0.48%)</span>
        </div>
      </div>
    </section>
  );
};

export default StockData;
