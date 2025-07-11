import { createBrowserRouter } from "react-router";

import RootLayout from "./layout";
import Home from "./pages/home/page";
import LoginPage from "./pages/login/page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;
