import { Suspense } from "react";
import LoadingPage from "./pages/Loadingpage";
import { RouterProvider } from "react-router-dom";
import { PAGE_DATA } from "./utils/pageData";

const App = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <RouterProvider router={PAGE_DATA} />
    </Suspense>
  );
};

export default App;
