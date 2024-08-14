import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <Navbar/>
          {children}
        <Footer />
      </body>
    </html>
  );
}
