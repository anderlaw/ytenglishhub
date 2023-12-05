import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { LeftMenu } from "@/components/leftmenu";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://cdn.jsdelivr.net/npm/dayjs@1/dayjs.min.js"></script>
        <script src="https://d3js.org/d3.v7.min.js" />
        <script src="https://unpkg.com/cal-heatmap/dist/cal-heatmap.min.js" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/cal-heatmap/dist/cal-heatmap.css"
        ></link>
        <script src="https://unpkg.com/cal-heatmap/dist/plugins/Legend.min.js" />
        <script src="https://unpkg.com/cal-heatmap/dist/plugins/LegendLite.min.js" />

        <script src="https://unpkg.com/@popperjs/core@2" />
        <script src="https://unpkg.com/cal-heatmap/dist/plugins/Tooltip.min.js" />

        <script src="https://unpkg.com/cal-heatmap/dist/plugins/CalendarLabel.min.js" />
      </head>
      <body>
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          {children}
          {/* <footer className="w-full flex items-center justify-center py-3">
                <Link
                  isExternal
                  className="flex items-center gap-1 text-current"
                  href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                  title="nextui.org homepage"
                >
                  <span className="text-default-600"> by</span>
                  <p className="text-primary">NextUI</p>
                </Link>
              </footer> */}
        </Providers>
      </body>
    </html>
  );
}
