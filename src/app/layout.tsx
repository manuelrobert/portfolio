import type { Metadata } from "next";
import { Inter, Raleway, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-raleway",
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-source-code",
});

export const metadata: Metadata = {
  title: "Manuel Robert | Developer Resume",
  description: "Senior Software Engineer & DevOps Expert specialized in Node.js, TypeScript, and cloud infrastructure",
  keywords: "Manuel Robert, Resume, Node.js, TypeScript, AWS CDK, DevOps, Cloud, Infrastructure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${raleway.variable} ${sourceCodePro.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
