import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from 'sonner'
import Footer from "@/components/component/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hosting html file",
  description: "Hosting html file via upload",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster richColors />
        <main className="relative w-full min-h-screen flex flex-col justify-center items-center bg-black text-white">
            {children}
            <Footer/>
        </main>
        </body>
    </html>
  );
}
