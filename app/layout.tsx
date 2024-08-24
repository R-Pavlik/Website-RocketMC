import "./globals.css";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cz">

      <body>
        {children}
      </body>
    </html>
  )
}
