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
import { formatCurrency } from "@/lib/utils";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useStocks } from "@/context/StocksContext";

const BuyingPower = () => {
  const [depositInput, setDepositInput] = useState<number>(0);
  const [totalDeposit, setTotalDeposit] = useState<number>(0);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const {purchaseInput} = useStocks()

  const fetchTotalDeposit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/deposit/get-deposit`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch total deposit");
      }
      const data = await response.json();
      setTotalDeposit(data.total_deposit);
    } catch (error) {
      console.error("Error while fetching Total Deposit", error);
    }
  };

  const handleAddDeposit = async () => {

    const response = await fetch(
      `${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/deposit/add-deposit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buying_power: depositInput,
        }),
      }
    );
    if (response.ok) {
      setDepositInput(0);
      await fetchTotalDeposit();
      setIsDialogOpen(false);
      toast.success("Deposit added successfully!");
    } else {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchTotalDeposit();
  }, [purchaseInput]);

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
                <CircleHelp className="fill-current hover:text-menu-lyrics" color="#8d8e90" size={18} />
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="font-medium">
                  Amount Available to Purchase Stocks
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <AnimatedCounter amount={totalDeposit} />
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
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
            <DialogDescription>
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
          <button
            onClick={handleAddDeposit}
            className="mx-auto w-full bg-red-500 hover:bg-red-400 text-white py-2 px-6 rounded-full max-w-[180px]"
          >
            Deposit
          </button>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BuyingPower;
