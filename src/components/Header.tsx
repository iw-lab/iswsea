"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, Moon, Sun, Instagram } from "lucide-react";
import { navItems, pensionInfo } from "@/data/pension";
import { cn } from "@/lib/utils";

function Wordmark({ onImage }: { onImage: boolean }) {
  return (
    <Link href="/" className="flex flex-col leading-none" aria-label="숲속의바다 홈">
      <span className={cn("font-serif text-[22px] font-semibold tracking-tight", onImage ? "text-on-image" : "text-foreground")}>
        숲속의바다
      </span>
      <span className={cn("eyebrow mt-1 text-[10px] tracking-[0.34em]", onImage ? "text-on-image-muted" : "text-muted-foreground")}>
        Sea in the Forest
      </span>
    </Link>
  );
}

export function ThemeToggle({ onImage, className }: { onImage?: boolean; className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  // 하이드레이션 전에는 아이콘을 고정(서버=false) — setState-in-effect 없이 마운트 여부 판별
  const mounted = useSyncExternalStore(() => () => {}, () => true, () => false);
  const dark = mounted && resolvedTheme === "dark";
  return (
    <button
      type="button"
      aria-label={dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
        onImage
          ? "border-on-image/35 text-on-image hover:bg-on-image/15"
          : "border-border text-foreground hover:bg-accent",
        className
      )}
    >
      {dark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
    </button>
  );
}

export default function Header({ transparent = true }: { transparent?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // 메뉴를 연 채 데스크톱 폭(lg)으로 넓어지면 시트는 숨겨지는데 스크롤 잠금만 남는다 → 강제로 닫는다
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const onImage = transparent && !scrolled && !open;
  const linkHref = (href: string) => (isHome ? href : `/${href}`);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 transition-[background-color,border-color,box-shadow] duration-300",
          // 메뉴 시트(z-overlay)가 헤더를 덮어 닫기 버튼이 가려지지 않도록, 열린 동안엔 헤더를 시트 위(z-modal)로 올린다
          open ? "z-[var(--z-modal)]" : "z-[var(--z-sticky)]",
          onImage ? "border-b border-transparent" : "border-b border-border bg-background/85 backdrop-blur-md"
        )}
      >
        <div className="container-x flex h-[72px] items-center justify-between gap-4">
          <Wordmark onImage={onImage} />

          <nav className="hidden items-center gap-7 lg:flex" aria-label="주요 메뉴">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={linkHref(item.href)}
                className={cn(
                  "text-[15px] font-medium tracking-tight transition-opacity hover:opacity-70",
                  onImage ? "text-on-image" : "text-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${pensionInfo.phone}`}
              className={cn(
                "hidden h-10 items-center gap-2 rounded-full border px-4 text-sm font-semibold md:inline-flex",
                onImage ? "border-on-image/35 text-on-image hover:bg-on-image/15" : "border-border text-foreground hover:bg-accent"
              )}
            >
              <Phone className="h-4 w-4" />
              {pensionInfo.phone}
            </a>
            <ThemeToggle onImage={onImage} />
            <a
              href={pensionInfo.yapenBookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "hidden h-10 items-center rounded-full px-5 text-sm font-semibold transition-colors sm:inline-flex",
                onImage ? "bg-on-image text-scrim hover:bg-on-image/90" : "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
            >
              실시간 예약
            </a>
            <button
              type="button"
              aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full border lg:hidden",
                onImage ? "border-on-image/35 text-on-image" : "border-border text-foreground"
              )}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="sheet"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[var(--z-overlay)] bg-background lg:hidden"
          >
            <div className="container-x flex h-full flex-col pt-[88px] pb-8">
              <ul className="flex flex-col divide-y divide-border">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <Link
                      href={linkHref(item.href)}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline justify-between py-4"
                    >
                      <span className="font-serif text-2xl font-medium text-foreground">{item.name}</span>
                      <span className="eyebrow text-[11px] text-muted-foreground">{item.nameEn}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto grid grid-cols-2 gap-3 pt-6">
                <a
                  href={`tel:${pensionInfo.phone}`}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border text-[15px] font-semibold"
                >
                  <Phone className="h-4 w-4" /> 전화 문의
                </a>
                <a
                  href={pensionInfo.yapenBookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-primary text-[15px] font-semibold text-primary-foreground"
                >
                  실시간 예약
                </a>
                <a
                  href={pensionInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-2 inline-flex h-11 items-center justify-center gap-2 text-sm text-muted-foreground"
                >
                  <Instagram className="h-4 w-4" /> @{pensionInfo.instagram}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
