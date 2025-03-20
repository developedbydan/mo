import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mateja - Portfolio",
  description:
    "A portfolio showcasing dynamic and creative video edits, demonstrating skillful storytelling through editing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-inter bg-black" data-theme="dark">
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
