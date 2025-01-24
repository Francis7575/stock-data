import { CircleHelp, Plus } from "lucide-react";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils";


const BuyingPower = () => {
  const [depositInput, setDepositInput] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Remove any non-numeric characters (excluding commas)
    value = value.replace(/[^0-9]/g, "");

    // Convert the value to a number and limit to 8 digits
    if (value.length <= 8 && !isNaN(Number(value))) {
      setDepositInput(Number(value));
    }
  };

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
                <p className="font-medium">
                  Amount Available to Purchase Stocks
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <AnimatedCounter amount={0} />
      </div>

      <Dialog >
        <DialogTrigger asChild >
          <button
            className="text-white flex items-center gap-2 bg-second-dark-gray 
          hover:bg-dark-gray py-2 px-6 rounded-full"
          >
            <Plus size={18} />
            Deposit
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-[300px] ">
          <DialogHeader className="mt-4">
            <DialogTitle>Account Deposit</DialogTitle>
            <DialogDescription className="text-[1.12rem]">
              Enter the amount you wish to deposit
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <input
              type="text"
              name="deposit"
              onChange={handleInputChange}
              value={formatCurrency(depositInput)}
              className="border-none outline-none max-w-[150px] text-center"
            />
          </div>
          <button className="bg-red-500 hover:bg-red-400 text-white py-2 px-6 rounded-full">
            Deposit
          </button>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BuyingPower;
