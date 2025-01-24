import { useEffect, useState } from "react";
import { TickersType } from "@/types/types";
import { truncateText } from "@/lib/utils";
import TickerListSkeleton from "@/components/skeletons/TickerListSkeleton";
import FirstTicker from "/image-agilent.jpeg";
import SecondTicker from "/image-alcoa.png";
import ThirdTicker from "/image-goldman.ico";
import Fourthicker from "/image-ares.jpg";

const TickersList = () => {
  const [tickerList, setTickerList] = useState<TickersType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const images = [FirstTicker, SecondTicker, ThirdTicker, Fourthicker];

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
          {tickerList.map((ticker, idx) => (
            <div key={ticker.ticker} className="flex gap-2">
              <img
                src={images[idx]} // Link image based on index
                alt={ticker.ticker}
                className="size-10 object-cover rounded-full mr-2"
              />
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
