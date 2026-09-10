import type { Metadata, Viewport } from "next";
import { Providers } from "@/components/providers";
import { pensionInfo } from "@/data/pension";
import "./globals.css";

const SITE_URL = "https://www.woodinsea.com";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f6f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1412" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "숲속의바다 펜션 | 태안 가로림만 전 객실 오션뷰 목조 펜션",
    template: "%s | 숲속의바다 펜션",
  },
  description:
    "태안 이원면 언덕 위 클래식 목조 펜션. 전 객실 오션뷰·개별 월풀형 욕조·오션뷰 실내 바베큐 테라스, 워터 슬라이드 야외 수영장과 사계절 바다꽃정원. 일출과 월출을 객실에서.",
  keywords:
    "태안펜션, 이원면펜션, 가로림만, 오션뷰펜션, 월풀펜션, 수영장펜션, 바베큐펜션, 갯벌체험, 숲속의바다, 숲속의바다펜션, 꾸지나무골, 만대포구",
  authors: [{ name: pensionInfo.name }],
  manifest: "/manifest.json",
  alternates: { canonical: "/" },
  openGraph: {
    title: "숲속의바다 펜션 | 태안 가로림만 전 객실 오션뷰",
    description: "숲을 지나면, 바다가 열립니다. 전 객실 오션뷰 · 월풀형 욕조 · 실내 바베큐 테라스.",
    url: SITE_URL,
    siteName: "숲속의바다 펜션",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "숲속의바다 펜션 전경" }],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "숲속의바다 펜션 | 태안 가로림만 전 객실 오션뷰",
    description: "숲을 지나면, 바다가 열립니다.",
    images: ["/images/og.jpg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: { capable: true, statusBarStyle: "default", title: "숲속의바다" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap"
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
