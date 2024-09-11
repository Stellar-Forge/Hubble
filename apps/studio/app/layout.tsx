import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "../provider";
import { Toaster } from "sonner";

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
                <Providers>{children}</Providers>
                <Toaster position="top-center" duration={2000} />
            </body>
        </html>
    );
}
