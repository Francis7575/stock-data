import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import TickersList from "./TickersList";

const HomeWatchList = () => {
  return (
    <section className="bg-dark-gray p-5 overflow-y-auto max-h-[420px] md:max-h-[500px]">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl text-light-gray">Watchlist</h2>
        <Link to="/watchlist" className="text-medium-gray hover:text-menu-lyrics flex gap-2">
          All
          <MoveRight color="#8d8e90" />
        </Link>
      </div>
      <TickersList />
    </section>
  );
};

export default HomeWatchList;
