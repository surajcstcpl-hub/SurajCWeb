import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import AgeCalculator from "./pages/AgeCalculator";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/age-calculator",
    Component: AgeCalculator,
  },
]);
