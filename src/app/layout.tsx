import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layouts/navbar";
import Footer from "@/components/layouts/footer";
import { epicene, epiceneText, sohne } from "@/lib/fonts";
import CookiePopUpBox from "@/lib/cookiePopup";
import Google from "@/lib/gaHandler";
import ClientLayout from "@/components/layouts/clientLayout";
import Notice from "@/components/notice";
import Link from "next/link";
import BottomRightPopup from "@/components/popup";

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
        <Notice>Zift Solutions is now Unifyr.</Notice>
        <ClientLayout>
          <div className="px-4 md:px-5">
            <Navbar />
            {children}
          </div>
          <BottomRightPopup
            title="20%+ Discount"
            description="Transition from your current PRM: Receive help migrating content and 20% off your current contract."
            linkText="Start"
            imageUrl="/images/promo.jpg"
            linkUrl="/lp/promo/"
          />
          <Google />
          <CookiePopUpBox />
        </ClientLayout>
        <Footer />
      </body>
    </html>
  );
}
