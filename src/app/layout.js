import "./globals.css";
import "animate.css";
import { Toaster } from "react-hot-toast";
import Navbar from "./_components/Navbar";
import Footer from "./_components/Footer";

export const metadata = {
  title: "QurbaniHat – Livestock Booking Platform",
  description: "Browse and book quality livestock for Qurbani.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-body bg-stone-50 text-stone-800 min-h-screen flex flex-col">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#1e3f17",
              color: "#f2f7f0",
              borderRadius: "8px",
              fontFamily: "Georgia, serif",
            },
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}