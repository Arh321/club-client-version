import { createBrowserRouter } from "react-router";

import RootLayout from "./layout";
import Home from "./pages/home/page";
import LoginPage from "./pages/login/page";
import LevelsPage from "./pages/mylevel/page";
import InvoicesPage from "./pages/invoices/page";
import ProfilePage from "./pages/profile/page";
import GiftsPage from "./pages/gifts/page";
import CouponsPage from "./pages/coupons/page";
import MemoizedContactUs from "./pages/contact-us/page";
import MemoizedAboutUsPage from "./pages/about-us/page";

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
      {
        path: "mylevel",
        element: <LevelsPage />,
      },
      {
        path: "invoices",
        element: <InvoicesPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "gifts",
        element: <GiftsPage />,
      },
      {
        path: "coupons",
        element: <CouponsPage />,
      },
      {
        path: "contact-us",
        element: <MemoizedContactUs />,
      },
      {
        path: "about-us",
        element: <MemoizedAboutUsPage />,
      },
    ],
  },
]);

export default router;
