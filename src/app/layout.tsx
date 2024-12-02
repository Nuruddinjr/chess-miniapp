import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { RecoilRoot } from "recoil";
import { ThemesProvider } from "@/context/themeContext";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "normalize.css/normalize.css";
import "./index.css";

export const metadata: Metadata = {
  title: "Your Application Title Goes Here",
  description: "Your application description goes here",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body className="min-h-screen bg-bgMain text-textMain">
        <RecoilRoot>
          <ThemesProvider>{children}</ThemesProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
