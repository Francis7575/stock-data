import { useEffect, useState } from "react";
import { TickersType } from "@/types/types";
import { truncateText } from "@/lib/utils";
import TickerListSkeleton from "@/components/skeletons/TickerListSkeleton";

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
        <TickerListSkeleton />
      ) : (
        <div className="flex flex-col gap-3">
          {tickerList.map((ticker) => (
            <div key={ticker.ticker} className="flex gap-2">
              <span className="text-white">Img</span>
              <div className="text-white flex flex-col max-w-[190px]">
                <span>{ticker.ticker}</span>
                <span className="text-watchlist-lyrics">
                  {truncateText(ticker.name, 20)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default TickersList;
