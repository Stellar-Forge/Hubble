import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "../provider";
import { AppbarClient } from "@hubble/ui/AppbarClient";


export const metadata: Metadata = {
    title: "Studio",
    description:
        "A Studio To Generate And Edit AI Content From The Most Popular AI Models Today",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
        <AppbarClient/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
