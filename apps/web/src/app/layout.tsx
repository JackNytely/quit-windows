import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "QuitWindows.org — move to Linux with your eyes open",
    template: "%s | QuitWindows.org",
  },
  description:
    "Honest guidance for leaving Microsoft Windows: modern Linux desktops, gaming, migration steps, and a compatibility-first questionnaire.",
  metadataBase: new URL("https://quitwindows.org"),
  openGraph: {
    title: "QuitWindows.org",
    description:
      "Independent, open-source guidance for switching from Windows to Linux.",
    url: "https://quitwindows.org",
    siteName: "QuitWindows.org",
    locale: "en_US",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${manrope.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground min-h-full flex flex-col">{children}</body>
    </html>
  );
}
