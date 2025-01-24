import { CircleHelp, Eye, EyeOff, TrendingUp } from "lucide-react";
import { FormEvent, useState } from "react";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import BuyingPower from "./BuyingPower";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "react-toastify";

const StockData = () => {
  const [eyeVisible, setEyeVisible] = useState<boolean>(true);
  const [depositInput, setDepositInput] = useState<number>(0.0);

  const toggleEyeVisiblity = () => {
    setEyeVisible((prev) => !prev);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch(
      `${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/stock/add-deposit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }
    );

    if (response.ok) {
      toast.success("Deposit added successfully!");
    } else {
      toast.error("Something went wrong!");
    }
  };

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
                  <AnimatedCounter amount={0} />
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
            <span className="text-dark-green">0</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <CircleHelp color="#8d8e90" size={18} />
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p className="font-medium">
                    Total Investment Change Percentage
                  </p>
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
