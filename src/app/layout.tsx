import type { Metadata } from "next";
import { Poppins, Montserrat, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
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
        className={`${poppins.variable} ${montserrat.variable} ${sourceCodePro.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
