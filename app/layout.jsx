import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Inter } from "next/font/google";
import ToastProvider from "@/components/providers/toast-provider";
// import ThemeProviders from "@/components/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Leaning Management System",
  description: "Presented by CS Aamir Rashid",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body className={inter.className}>
        <ClerkProvider>
          {/* <ThemeProviders> */}
          <ToastProvider />
          {children}
          {/* </ThemeProviders> */}
        </ClerkProvider>
      </body>
    </html>
  );
}
