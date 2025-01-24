import { CircleHelp, Plus } from "lucide-react";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const BuyingPower = () => {
  return (
    <section className="mt-6 flex items-center justify-between px-5 mb-6">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="text-gray text-sm">BUYING POWER</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CircleHelp color="#8d8e90" size={18} />
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="font-medium">Amount Available to Purchase Stocks</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <AnimatedCounter amount={7000} />
      </div>
      <button className="text-white flex items-center gap-2 bg-second-dark-gray hover:bg-dark-gray py-2 px-6 rounded-full">
        <Plus size={18} />
        Deposit
      </button>
    </section>
  );
};

export default BuyingPower;
