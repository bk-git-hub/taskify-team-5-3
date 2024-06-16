import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "Taskify",
  description: "스마트하게 나의 일정을 관리해보자!",
  icons: {
    icon: "/taskify-logo.png",
  },
};

const pretendard = localFont({
  src: "./fonts/pretendard-variable.woff2",
  display: "swap",
  weight: "45 920",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}
