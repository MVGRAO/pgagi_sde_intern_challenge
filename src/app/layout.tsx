import "./globals.css";
import Providers from "./providers";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex">
        <Providers>
          <Sidebar />
          <main className="flex-1">
            <Header />
            <div className="p-6">{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
