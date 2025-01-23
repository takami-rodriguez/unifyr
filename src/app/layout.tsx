import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layouts/navbar";
import Footer from "@/components/layouts/footer";
import { epicene, epiceneText, sohne } from "@/lib/fonts";
import CookiePopUpBox from "@/lib/cookiePopup";
import GAHandler from "@/lib/gaHandler";
import ClientLayout from "@/components/layouts/clientLayout";

export const metadata: Metadata = {
  title: "Unifyr",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const noIndex = process.env.NO_INDEX === "true";
  return (
    <html lang="en">
      <head>{noIndex && <meta name="robots" content="noindex" />}</head>
      <body
        className={`${epicene.variable} ${epiceneText.variable} ${sohne.variable} font-sans`}
      >
        <ClientLayout>
          <div className="px-4 md:px-5">
            <Navbar />
            {children}
          </div>
        </ClientLayout>
        <Footer />
        <GAHandler />
        <CookiePopUpBox />
      </body>
    </html>
  );
}
