import { AppbarClient } from "@hubble/ui/AppbarClient";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <AppbarClient />
            {children}
        </div>
    );
}
