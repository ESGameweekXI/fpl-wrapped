import { Bebas_Neue, IBM_Plex_Mono, Special_Elite } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-mono",
});

const specialElite = Special_Elite({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-stamp",
});

export const metadata = {
  title: "FPL Wrapped",
  description: "Your Fantasy Premier League season in review",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${ibmPlexMono.variable} ${specialElite.variable} paper-grain`}
      >
        {children}
      </body>
    </html>
  );
}
