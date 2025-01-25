import { CircleHelp, Eye, EyeOff, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import BuyingPower from "./BuyingPower";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useStocks } from "@/context/StocksContext";

const StockData = () => {
  const [eyeVisible, setEyeVisible] = useState<boolean>(true);
  const [totalInvested, setTotalInvested] = useState<number>(0);
  const { purchaseInput } = useStocks();

  const toggleEyeVisiblity = () => {
    setEyeVisible((prev) => !prev);
  };

  const fetchTotalInvested = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_SERVER_URL
        }/api/v1/investment/get-total-invested`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch total deposit");
      }
      const data = await response.json();
      setTotalInvested(data.totalInvested);
    } catch (error) {
      console.error("Error while fetching Total Deposit", error);
    }
  };

  useEffect(() => {
    fetchTotalInvested();
  }, [purchaseInput]);

  return (
    <>
      <section className="mt-8 pl-5 border-b border-dark-gray">
        <div className="pb-6">
          <h1 className="text-gray text-sm font-semibold mb-1">
            TOTAL INVESTING
          </h1>
          <div className="flex items-center gap-2">
            <div className="text-[1.8rem] text-white">
              {eyeVisible ? (
                <span>
                  <AnimatedCounter amount={totalInvested} />
                </span>
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
            <span className="text-dark-green">
              <span className="text-dark-green">100%</span>
            </span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CircleHelp className="fill-current hover:text-menu-lyrics"  color="#8d8e90" size={18} />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="font-medium">Total Investment Change Info</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </section>
      <BuyingPower />
    </>
  );
};

export default StockData;
