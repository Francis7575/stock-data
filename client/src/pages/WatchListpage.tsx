import { useEffect, useState } from "react";
import { TickersType } from "@/types/types";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AllTickersSkeleton from "@/components/skeletons/AllTickersSkeleton";
import { truncateText } from "@/lib/utils";

const WatchListpage = () => {
  const [tickerList, setTickerList] = useState<TickersType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAllTickers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_REACT_SERVER_URL}/api/v1/tickers/all-tickers`
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
    fetchAllTickers();
  }, []);

  return (
    <section className="p-6 pb-12">
      <Link to="/" className="flex items-center gap-2 mb-4">
        <MoveLeft color="#8d8e90" />
        <h2 className="text-xl text-light-gray">All Watchlist</h2>
      </Link>
      {isLoading ? (
        <AllTickersSkeleton />
      ) : (
        <div className="flex flex-col gap-3">
          {tickerList.map((ticker, idx) => (
            <div key={idx} className="flex gap-2">
              <span className="text-white">Img</span>
              <div className="text-white flex flex-col max-w-[190px]">
                <span>{ticker.ticker}</span>
                <span className="text-watchlist-lyrics">
                  {truncateText(ticker.name, 15)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default WatchListpage;
