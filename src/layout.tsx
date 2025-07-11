import AppLayOut from "./components/app-layout/app-layout";
import { NotifyProvider } from "./components/notife/notife";
import AppProvider from "./redux/provider/app-provider";

export default function RootLayout() {
  return (
    <AppProvider>
      <NotifyProvider>
        <AppLayOut />
      </NotifyProvider>
    </AppProvider>
  );
}
