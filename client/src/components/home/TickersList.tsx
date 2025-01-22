import { useEffect, useState } from "react";
import { TickersType } from "../../types/types";
import { Loader } from "lucide-react";
import { truncateText } from "../../lib/utils";

const TickersList = () => {
  const [tickerList, setTickerList] = useState<TickersType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchTickers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/stock/tickers`
        );
        const jsonData = await response.json();
        if (!response.ok) {
          throw new Error("There was an error fetching the data");
        }
        setTickerList(jsonData.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTickers();
  }, []);

  return (
    <section>
      {isLoading ? (
        <div className="flex justify-center mt-20">
          <Loader className="text-center size-12 text-emerald-500 animate-spin" />
        </div>
      ) : (
        tickerList.map((ticker) => (
          <div key={ticker.ticker} className="flex gap-2">
            <span className="text-white">Img</span>
            <div className="text-white flex flex-col max-w-[120px]">
              <span>{ticker.ticker}</span>
              <span>{truncateText(ticker.name, 20)}</span>
            </div>
          </div>
        ))
      )}
    </section>
  );
};

export default TickersList;
