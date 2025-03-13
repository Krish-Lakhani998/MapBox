import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: "Address Map Viewer",
  description: "Enter your address and view it on an interactive map",
  keywords: ["map", "address", "location", "mapbox", "nextjs"],
  authors: [{ name: "Address Map Viewer" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} font-sans antialiased bg-white`}
      >
        {children}
      </body>
    </html>
  );
}
