import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import FilterProvider from "./FilterProvider";
import { GoogleAnalytics } from "@next/third-parties/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CompMart",
  description: "If you want any computers, they exist in our shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Providers>
          <FilterProvider>
            {children}
          </FilterProvider>
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-1C1R6D73YD" />
    </html>
  );
}
