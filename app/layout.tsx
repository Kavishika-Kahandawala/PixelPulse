import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer"
import "./globals.css";

export const metadata = {
  title: 'Pixel Pulse',
  description: 'Designed and developed a Dribble-inspired social platform for creative professionals to showcase their artwork and connect with a global community of designers and artists',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <NavBar />
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
