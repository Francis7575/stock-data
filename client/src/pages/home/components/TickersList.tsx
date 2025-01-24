import { useEffect, useState } from "react";
import { TickersType } from "@/types/types";
import { truncateText } from "@/lib/utils";
import TickerListSkeleton from "@/components/skeletons/TickerListSkeleton";
import FirstTicker from "/image-agilent.jpeg";
import SecondTicker from "/image-alcoa.png";
import ThirdTicker from "/image-goldman.ico";
import Fourthicker from "/image-american-airlines.jpeg";
import AnimatedCounter from "@/components/common/AnimatedCounter";
import { TrendingDown, TrendingUp } from "lucide-react";

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
          {tickerList.map((ticker, idx) => {
            const firstPrice = ticker.prices?.[0]?.high;
            const secondPrice = ticker.prices?.[1]?.high;

            let priceChange = "N/A";
            let percentageChange = "N/A";

            if (firstPrice !== undefined && secondPrice !== undefined) {
              const priceDiff = secondPrice - firstPrice;
              const percentage = (priceDiff / firstPrice) * 100;

              // Format the price change (absolute and percentage)
              priceChange = priceDiff.toFixed(2);
              percentageChange = `${percentage >= 0 ? "+" : "-"}${Math.abs(
                percentage
              ).toFixed(2)}%`;
            }

            return (
              <div key={ticker.ticker} className="flex justify-between">
                <div className="flex gap-2">
                  <img
                    src={images[idx]}
                    alt={ticker.ticker}
                    className="size-10 object-cover rounded-full mr-2"
                  />
                  <div className="text-white flex flex-col max-w-[190px]">
                    <span>{ticker.ticker}</span>
                    <span className="text-watchlist-lyrics">
                      {truncateText(ticker.name, 15)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="self-end">
                    <AnimatedCounter amount={ticker.prices[0].high} />
                  </span>
                  <div className="flex items-center gap-1">
                    {percentageChange.includes("-") ? (
                      <TrendingDown size={16} className="text-red-600" />
                    ) : (
                      <TrendingUp size={16} className="text-dark-green" />
                    )}
                    <span
                      className={`text-sm ${
                        percentageChange.includes("-")
                          ? "text-red-600"
                          : "text-dark-green"
                      }`}
                    >
                      {priceChange} ({percentageChange})
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default TickersList;
