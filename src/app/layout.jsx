// root layout - sprint 10
// added ReduxProvider so entire app can access the global store
// added Navbar which has theme toggle and favorites count

import ReduxProvider from "@/components/ReduxProvider";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata = {
  title: "CineStream",
  description: "Browse popular movies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* ReduxProvider wraps everything - this is the store provider setup */}
        <ReduxProvider>
          <Navbar />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
