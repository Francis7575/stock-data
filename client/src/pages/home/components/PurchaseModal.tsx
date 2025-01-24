import { useStocks } from "@/context/StocksContext";
import { formatCurrency } from "@/lib/utils";
import { useEffect } from "react";
import { toast } from "react-toastify";

type PurchaseModalProps = {
  setIsModalOpen: (value: boolean) => void;
};

const PurchaseModal = ({ setIsModalOpen }: PurchaseModalProps) => {
  const { purchaseInput, setPurchaseInput } = useStocks();

  const fetchTotalDeposit = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/deposit/get-deposit`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch total deposit");
      }
      const data = await response.json();
      setPurchaseInput(data.totalDeposit);
    } catch (error) {
      console.error("Error while fetching Total Deposit", error);
    }
  };

  const handleOverlayClick = () => {
    setIsModalOpen(false);
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // Remove any non-numeric characters (excluding commas)
    value = value.replace(/[^0-9]/g, "");

    // Convert the value to a number and limit to 8 digits
    if (value.length <= 8 && !isNaN(Number(value))) {
      setPurchaseInput(Number(value));
    }
  };

  const handleAddInvestment = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_SERVER_URL
      }/api/v1/investment/add-investment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          total_investing: purchaseInput,
        }),
      }
    );
    if (response.ok) {
      setPurchaseInput(0);
      await fetchTotalDeposit();
      setIsModalOpen(false);
      toast.success("Investment added successfully!");
    } else {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchTotalDeposit();
  }, []);

  return (
    <div
      className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 z-[1000] px-2.5"
      onClick={handleOverlayClick}
    >
      <div
        onClick={handleModalClick}
        className="bg-white py-4 px-4 rounded-md max-w-[300px]"
      >
        <h1 className="font-semibold text-center text-[1.12rem]">Invest In Stocks</h1>
        <p className="text-center">
          Enter the amount you wish to invest in stocks
        </p>
        <div className="flex justify-center mt-4">
          <input
            type="text"
            name="deposit"
            onChange={handleInputChange}
            value={formatCurrency(purchaseInput)}
            className="border-none outline-none max-w-[150px] text-center"
          />
        </div>
        <p className="mt-1 text-center text-gray">This is your buying power</p>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleAddInvestment}
            className="bg-red-500 hover:bg-red-400 min-w-[180px] text-white py-2 px-6 rounded-full"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
