import { formatCurrency } from "@/lib/utils";
import { useEffect, useState } from "react";

type PurchaseModalProps = {
  setIsModalOpen: (value: boolean) => void;
};

const PurchaseModal = ({ setIsModalOpen }: PurchaseModalProps) => {
  const [purchaseInput, setPurchaseInput] = useState<number>(0);

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
        <h1 className="font-semibold text-center">Invest In Stocks</h1>
        <p className="text-center">
          Enter the amount you want to invest in stocks
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
        <div className="flex justify-center mt-4">
          <button className="bg-red-500 hover:bg-red-400 min-w-[140px] text-white py-2 px-6 rounded-full">
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
