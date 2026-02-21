import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { GTProvider } from "gt-next";
import { getGT } from "gt-next/server";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const gt = await getGT();
  const title = gt("Museum Guide | General Translation");
  const description = gt("A multilingual museum visitor guide demonstrating internationalization with General Translation. Browse exhibitions, explore the collection, and discover artworks from around the world.");
  return {
    title,
    description,
    openGraph: { title, description, locale, type: "website", siteName: "General Translation" },
    twitter: { card: "summary", title, description },
    alternates: {
      canonical: "https://museum-guide.generaltranslation.dev",
      languages: { en: "/en", es: "/es", fr: "/fr", ja: "/ja", zh: "/zh" },
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} antialiased bg-[#1A1A1A] text-[#F5F5F5]`}>
        <GTProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </GTProvider>
      </body>
    </html>
  );
}
