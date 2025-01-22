import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { Markets, More, Portfolio, Homepage, WatchListpage } from "./components";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/watchlist" element={<WatchListpage />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/more" element={<More />} />
      </Route>
    </Routes>
  );
};

export default App;
