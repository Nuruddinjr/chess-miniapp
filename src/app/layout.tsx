"use client";

import { RecoilRoot } from "recoil";

import "@telegram-apps/telegram-ui/dist/styles.css";
import "normalize.css/normalize.css";
import "./index.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className="min-h-screen bg-bgMain text-textMain">
        <RecoilRoot>{children}</RecoilRoot>
      </body>
    </html>
  );
}
