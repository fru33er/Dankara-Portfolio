import type { Metadata } from "next";
import "./globals.css";
import { ScrollReveal } from "@/components/sites/charbeltannous/ScrollReveal";

export const metadata: Metadata = {
  title: "Raka Andhika — Software Engineer",
  description:
    "Software engineer in Montreal, Canada (Concordia B.Eng. '26, incoming McGill M.Eng.), open to roles in Canada and the Middle East. Builds full-stack web, mobile and applied-ML products; technical co-founder of StreetCore, maker of Spolio.",
  openGraph: {
    title: "Raka Andhika — Software Engineer",
    description:
      "Software engineer in Montreal, Canada (Concordia B.Eng. '26, incoming McGill M.Eng.), open to roles in Canada and the Middle East. Builds full-stack web, mobile and applied-ML products; technical co-founder of StreetCore, maker of Spolio.",
    url: "https://charbeltannous.com/",
    siteName: "Raka <Andhika>p</Andhika>",
    type: "website",
  },
  icons: {
    icon: "/sites/charbeltannous/Group 4.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased"
      data-theme="yellow"
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("raka_theme");if(t==="yellow"||t==="mono"||t==="blue"){document.documentElement.setAttribute("data-theme",t);}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-page text-heading selection:bg-heading selection:text-page font-body">
        <ScrollReveal />
        {children}
      </body>
    </html>
  );
}
