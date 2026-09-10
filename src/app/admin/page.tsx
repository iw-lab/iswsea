"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Bell, Check, Eye, EyeOff, Gift, Loader2, LogOut, Pin, Plus, Settings, Trash2 } from "lucide-react";
import * as api from "@/lib/adminApi";
import type { EventItem, NoticeItem } from "@/lib/adminApi";
import { Badge, Button } from "@/components/ui";
import { ThemeToggle } from "@/components/Header";
import { cn } from "@/lib/utils";

type Tab = "notices" | "events" | "settings";
const TABS: { key: Tab; label: string; icon: typeof Bell }[] = [
  { key: "notices", label: "공지사항", icon: Bell },
  { key: "events", label: "이벤트", icon: Gift },
  { key: "settings", label: "설정", icon: Settings },
];

const EVENT_COLORS = ["#4f8a8b", "#c8a97e", "#3d6b4f", "#b5533c", "#5a6fa8"];

const emptyNotice = (): Omit<NoticeItem, "id"> => ({ title: "", content: "", date: todayLabel(), important: false, active: true });
const emptyEvent = (): Omit<EventItem, "id"> => ({ title: "", period: "", description: "", highlight: "", conditions: [], badge: "", color: EVENT_COLORS[0], active: true });

function todayLabel() {
  const d = new Date();
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

function errMsg(e: unknown): string {
  return e instanceof Error ? e.message : "알 수 없는 오류";
}

/* ---------- 공용 폼 요소 ---------- */
const inputCls =
  "w-full rounded-md border border-input bg-card px-3.5 py-2.5 text-[15px] text-foreground placeholder:text-muted-foreground/70 focus-visible:border-ring";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="inline-flex items-center gap-2.5 text-sm font-medium"
    >
      <span className={cn("relative inline-block h-6 w-11 rounded-full transition-colors", checked ? "bg-primary" : "bg-muted-foreground/30")}>
        <span className={cn("absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-card shadow-sm transition-transform", checked && "translate-x-5")} />
      </span>
      {label}
    </button>
  );
}

function InlineNotice({ children, tone = "info" }: { children: React.ReactNode; tone?: "info" | "error" | "success" }) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "rounded-md border px-4 py-3 text-sm",
        tone === "error" && "border-destructive/40 bg-destructive/10 text-destructive",
        tone === "success" && "border-success/40 bg-success/10 text-success",
        tone === "info" && "border-border bg-muted text-muted-foreground"
      )}
    >
      {children}
    </p>
  );
}

/** 2단계 삭제 버튼(브라우저 confirm 대신) */
function DeleteButton({ onConfirm, busy }: { onConfirm: () => void; busy?: boolean }) {
  const [arm, setArm] = useState(false);
  useEffect(() => {
    if (!arm) return;
    const t = window.setTimeout(() => setArm(false), 4000);
    return () => window.clearTimeout(t);
  }, [arm]);
  return arm ? (
    <span className="inline-flex items-center gap-1.5">
      <Button variant="accent" size="md" onClick={onConfirm} disabled={busy} className="h-9 bg-destructive text-destructive-foreground hover:bg-destructive/90">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />} 정말 삭제
      </Button>
      <Button variant="ghost" size="md" onClick={() => setArm(false)} className="h-9">
        취소
      </Button>
    </span>
  ) : (
    <Button variant="ghost" size="md" onClick={() => setArm(true)} className="h-9 text-muted-foreground hover:text-destructive" aria-label="삭제">
      <Trash2 className="h-4 w-4" /> 삭제
    </Button>
  );
}

/* ---------- 로그인 ---------- */
function LoginCard({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await api.login(password);
      setPassword("");
      onSuccess();
    } catch (err) {
      setError(errMsg(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="container-x flex min-h-[100svh] items-center justify-center py-16">
      <form onSubmit={submit} className="w-full max-w-sm rounded-xl border border-border bg-card p-8 shadow-md">
        <p className="eyebrow text-muted-foreground">ADMIN</p>
        <h1 className="mt-2 font-serif text-2xl font-semibold">관리자 로그인</h1>
        <p className="mt-2 text-sm text-muted-foreground">공지사항·이벤트·팝업을 관리합니다.</p>
        <div className="mt-6">
          <Field label="비밀번호">
            <span className="relative block">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className={cn(inputCls, "pr-11")}
              />
              <button
                type="button"
                onClick={() => setShow((s) => !s)}
                aria-label={show ? "비밀번호 숨기기" : "비밀번호 보기"}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:text-foreground"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </span>
          </Field>
        </div>
        {error && (
          <div className="mt-4">
            <InlineNotice tone="error">{error}</InlineNotice>
          </div>
        )}
        <Button type="submit" size="lg" disabled={busy || !password} className="mt-6 w-full">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null} 로그인
        </Button>
        <Link href="/" className="mt-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> 홈으로
        </Link>
      </form>
    </main>
  );
}

/* ---------- 공지 ---------- */
function NoticeForm({ initial, onSave, onCancel, busy }: { initial: Omit<NoticeItem, "id">; onSave: (v: Omit<NoticeItem, "id">) => void; onCancel: () => void; busy: boolean }) {
  const [v, setV] = useState(initial);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave(v);
      }}
      className="space-y-4 rounded-lg border border-primary/30 bg-card p-5"
    >
      <Field label="제목">
        <input value={v.title} onChange={(e) => setV({ ...v, title: e.target.value })} required maxLength={120} className={inputCls} />
      </Field>
      <Field label="내용" hint="줄바꿈이 그대로 표시됩니다.">
        <textarea value={v.content} onChange={(e) => setV({ ...v, content: e.target.value })} rows={8} maxLength={4000} className={cn(inputCls, "leading-relaxed")} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-[1fr_auto_auto] sm:items-end">
        <Field label="날짜">
          <input value={v.date} onChange={(e) => setV({ ...v, date: e.target.value })} maxLength={40} placeholder="2026.09.10" className={inputCls} />
        </Field>
        <Toggle checked={v.important} onChange={(important) => setV({ ...v, important })} label="상단 고정(중요)" />
        <Toggle checked={v.active} onChange={(active) => setV({ ...v, active })} label="게시" />
      </div>
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="ghost" onClick={onCancel} disabled={busy}>
          취소
        </Button>
        <Button type="submit" disabled={busy || !v.title.trim()}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} 저장
        </Button>
      </div>
    </form>
  );
}

function NoticesTab() {
  const [items, setItems] = useState<NoticeItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [busy, setBusy] = useState<ReadonlySet<string>>(() => new Set());
  const loadSeq = useRef(0);

  // 늦게 도착한 옛 목록 응답이 최신 상태를 덮지 않도록 요청 번호로 가드
  const load = useCallback(async () => {
    const seq = ++loadSeq.current;
    try {
      const res = await api.listNotices();
      if (seq !== loadSeq.current) return;
      setItems(res.notices);
      setError(null);
    } catch (e) {
      if (seq === loadSeq.current) setError(errMsg(e));
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);

  // 항목별로 진행 중 작업을 추적한다 — 다른 항목을 눌러도 저장 중인 버튼이 다시 살아나지 않는다
  const run = async (key: string, fn: () => Promise<unknown>) => {
    if (busy.has(key)) return false;
    setBusy((s) => new Set(s).add(key));
    setError(null);
    try {
      await fn();
      await load();
      return true;
    } catch (e) {
      setError(errMsg(e));
      return false;
    } finally {
      setBusy((s) => {
        const n = new Set(s);
        n.delete(key);
        return n;
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{items ? `${items.length}건 · 게시 ${items.filter((n) => n.active).length}건` : "불러오는 중…"}</p>
        <Button onClick={() => setAdding(true)} disabled={adding}>
          <Plus className="h-4 w-4" /> 새 공지
        </Button>
      </div>
      {error && <InlineNotice tone="error">{error}</InlineNotice>}
      {adding && (
        <NoticeForm
          initial={emptyNotice()}
          busy={busy.has("new")}
          onCancel={() => setAdding(false)}
          onSave={(v) => void run("new", () => api.createNotice(v)).then((ok) => ok && setAdding(false))}
        />
      )}
      <ul className="space-y-3">
        {items?.map((n) => (
          <li key={n.id}>
            {editing === n.id ? (
              <NoticeForm
                initial={n}
                busy={busy.has(n.id)}
                onCancel={() => setEditing(null)}
                onSave={(v) => void run(n.id, () => api.updateNotice(n.id, v)).then((ok) => ok && setEditing(null))}
              />
            ) : (
              <div className={cn("rounded-lg border border-border bg-card p-5", !n.active && "opacity-60")}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {n.important && (
                        <Badge tone="gold">
                          <Pin className="h-3 w-3" /> 고정
                        </Badge>
                      )}
                      {!n.active && <Badge>비공개</Badge>}
                      <span className="text-xs text-muted-foreground">{n.date}</span>
                    </div>
                    <h3 className="mt-2 font-semibold leading-snug">{n.title}</h3>
                    <p className="prose-pre mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{n.content}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <Button variant="secondary" onClick={() => void run(n.id, () => api.updateNotice(n.id, { active: !n.active }))} disabled={busy.has(n.id)} className="h-9">
                      {n.active ? "숨기기" : "게시"}
                    </Button>
                    <Button variant="secondary" onClick={() => setEditing(n.id)} className="h-9">
                      수정
                    </Button>
                    <DeleteButton busy={busy.has(n.id)} onConfirm={() => void run(n.id, () => api.deleteNotice(n.id))} />
                  </div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      {items && items.length === 0 && !adding && <InlineNotice>등록된 공지가 없습니다. 「새 공지」로 추가하세요.</InlineNotice>}
    </div>
  );
}

/* ---------- 이벤트 ---------- */
function EventForm({ initial, onSave, onCancel, busy }: { initial: Omit<EventItem, "id">; onSave: (v: Omit<EventItem, "id">) => void; onCancel: () => void; busy: boolean }) {
  const [v, setV] = useState(initial);
  const [cond, setCond] = useState(initial.conditions.join("\n"));
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ ...v, conditions: cond.split("\n").map((s) => s.trim()).filter(Boolean) });
      }}
      className="space-y-4 rounded-lg border border-primary/30 bg-card p-5"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="제목">
          <input value={v.title} onChange={(e) => setV({ ...v, title: e.target.value })} required maxLength={120} className={inputCls} />
        </Field>
        <Field label="기간 / 대상">
          <input value={v.period} onChange={(e) => setV({ ...v, period: e.target.value })} maxLength={200} placeholder="퇴실 기준 월요일 ~ 금요일" className={inputCls} />
        </Field>
      </div>
      <Field label="설명">
        <textarea value={v.description} onChange={(e) => setV({ ...v, description: e.target.value })} rows={3} maxLength={2000} className={inputCls} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="강조 문구" hint="예: 2일째 50% 할인">
          <input value={v.highlight ?? ""} onChange={(e) => setV({ ...v, highlight: e.target.value })} maxLength={80} className={inputCls} />
        </Field>
        <Field label="뱃지" hint="예: 평일 · 연박">
          <input value={v.badge ?? ""} onChange={(e) => setV({ ...v, badge: e.target.value })} maxLength={20} className={inputCls} />
        </Field>
        <div>
          <span className="mb-1.5 block text-sm font-semibold">색상</span>
          <div className="flex gap-2" role="group" aria-label="색상 선택">
            {EVENT_COLORS.map((c) => (
              <button
                key={c}
                type="button"
                aria-label={c}
                aria-pressed={v.color === c}
                onClick={() => setV({ ...v, color: c })}
                className={cn("h-9 w-9 rounded-full border-2", v.color === c ? "border-foreground" : "border-transparent")}
                style={{ background: c }}
              />
            ))}
          </div>
        </div>
      </div>
      <Field label="조건 (한 줄에 하나)">
        <textarea value={cond} onChange={(e) => setCond(e.target.value)} rows={3} className={inputCls} />
      </Field>
      <div className="flex items-center justify-between gap-3 pt-2">
        <Toggle checked={v.active} onChange={(active) => setV({ ...v, active })} label="진행 중(게시)" />
        <div className="flex gap-2">
          <Button variant="ghost" onClick={onCancel} disabled={busy}>
            취소
          </Button>
          <Button type="submit" disabled={busy || !v.title.trim()}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} 저장
          </Button>
        </div>
      </div>
    </form>
  );
}

function EventsTab() {
  const [items, setItems] = useState<EventItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [busy, setBusy] = useState<ReadonlySet<string>>(() => new Set());
  const loadSeq = useRef(0);

  const load = useCallback(async () => {
    const seq = ++loadSeq.current;
    try {
      const res = await api.listEvents();
      if (seq !== loadSeq.current) return;
      setItems(res.events);
      setError(null);
    } catch (e) {
      if (seq === loadSeq.current) setError(errMsg(e));
    }
  }, []);
  useEffect(() => {
    void load();
  }, [load]);

  const run = async (key: string, fn: () => Promise<unknown>) => {
    if (busy.has(key)) return false;
    setBusy((s) => new Set(s).add(key));
    setError(null);
    try {
      await fn();
      await load();
      return true;
    } catch (e) {
      setError(errMsg(e));
      return false;
    } finally {
      setBusy((s) => {
        const n = new Set(s);
        n.delete(key);
        return n;
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">{items ? `${items.length}건 · 진행 중 ${items.filter((e) => e.active).length}건` : "불러오는 중…"}</p>
        <Button onClick={() => setAdding(true)} disabled={adding}>
          <Plus className="h-4 w-4" /> 새 이벤트
        </Button>
      </div>
      {error && <InlineNotice tone="error">{error}</InlineNotice>}
      {adding && (
        <EventForm initial={emptyEvent()} busy={busy.has("new")} onCancel={() => setAdding(false)} onSave={(v) => void run("new", () => api.createEvent(v)).then((ok) => ok && setAdding(false))} />
      )}
      <ul className="space-y-3">
        {items?.map((ev) => (
          <li key={ev.id}>
            {editing === ev.id ? (
              <EventForm initial={ev} busy={busy.has(ev.id)} onCancel={() => setEditing(null)} onSave={(v) => void run(ev.id, () => api.updateEvent(ev.id, v)).then((ok) => ok && setEditing(null))} />
            ) : (
              <div className={cn("flex gap-4 rounded-lg border border-border bg-card p-5", !ev.active && "opacity-60")}>
                <span className="mt-1 h-10 w-1.5 shrink-0 rounded-full" style={{ background: ev.color }} aria-hidden />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {ev.badge && <Badge tone="solid">{ev.badge}</Badge>}
                    {ev.highlight && <span className="font-display text-sm text-accent-strong">{ev.highlight}</span>}
                    {!ev.active && <Badge>비공개</Badge>}
                  </div>
                  <h3 className="mt-2 font-semibold leading-snug">{ev.title}</h3>
                  <p className="text-xs text-muted-foreground">{ev.period}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{ev.description}</p>
                  {ev.conditions.length > 0 && (
                    <ul className="mt-2 space-y-0.5 text-xs text-muted-foreground/80">
                      {ev.conditions.map((c, i) => (
                        <li key={`${ev.id}-${i}`}>* {c}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <Button variant="secondary" onClick={() => void run(ev.id, () => api.updateEvent(ev.id, { active: !ev.active }))} disabled={busy.has(ev.id)} className="h-9">
                    {ev.active ? "숨기기" : "게시"}
                  </Button>
                  <Button variant="secondary" onClick={() => setEditing(ev.id)} className="h-9">
                    수정
                  </Button>
                  <DeleteButton busy={busy.has(ev.id)} onConfirm={() => void run(ev.id, () => api.deleteEvent(ev.id))} />
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      {items && items.length === 0 && !adding && <InlineNotice>등록된 이벤트가 없습니다.</InlineNotice>}
    </div>
  );
}

/* ---------- 설정 ---------- */
function SettingsTab() {
  const [popup, setPopup] = useState<boolean | null>(null);
  const [msg, setMsg] = useState<{ tone: "error" | "success"; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [cur, setCur] = useState("");
  const [next, setNext] = useState("");
  const [next2, setNext2] = useState("");

  useEffect(() => {
    api
      .getSettings()
      .then((s) => setPopup(s.popupEnabled))
      .catch((e) => setMsg({ tone: "error", text: errMsg(e) }));
  }, []);

  const togglePopup = async (v: boolean) => {
    setBusy(true);
    setMsg(null);
    try {
      setPopup((await api.setPopupEnabled(v)).popupEnabled);
      setMsg({ tone: "success", text: v ? "첫 화면 팝업을 켰습니다." : "첫 화면 팝업을 껐습니다." });
    } catch (e) {
      setMsg({ tone: "error", text: errMsg(e) });
    } finally {
      setBusy(false);
    }
  };

  const submitPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (next !== next2) {
      setMsg({ tone: "error", text: "새 비밀번호 확인이 일치하지 않습니다." });
      return;
    }
    setBusy(true);
    setMsg(null);
    try {
      await api.changePassword(cur, next);
      setCur("");
      setNext("");
      setNext2("");
      setMsg({ tone: "success", text: "비밀번호를 변경했습니다. 다음 로그인부터 새 비밀번호를 사용하세요." });
    } catch (err) {
      setMsg({ tone: "error", text: errMsg(err) });
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      {msg && <InlineNotice tone={msg.tone}>{msg.text}</InlineNotice>}
      <section className="rounded-lg border border-border bg-card p-5">
        <h3 className="font-semibold">첫 화면 팝업</h3>
        <p className="mt-1 text-sm text-muted-foreground">홈 접속 시 진행 중 이벤트와 고정 공지를 팝업으로 보여줍니다.</p>
        <div className="mt-4">
          {popup === null ? <span className="text-sm text-muted-foreground">불러오는 중…</span> : <Toggle checked={popup} onChange={(v) => void togglePopup(v)} label={popup ? "켜짐" : "꺼짐"} />}
        </div>
      </section>
      <form onSubmit={submitPassword} className="space-y-4 rounded-lg border border-border bg-card p-5">
        <h3 className="font-semibold">비밀번호 변경</h3>
        <Field label="현재 비밀번호">
          <input type="password" value={cur} onChange={(e) => setCur(e.target.value)} autoComplete="current-password" required className={inputCls} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="새 비밀번호" hint="8자 이상">
            <input type="password" value={next} onChange={(e) => setNext(e.target.value)} autoComplete="new-password" minLength={8} required className={inputCls} />
          </Field>
          <Field label="새 비밀번호 확인">
            <input type="password" value={next2} onChange={(e) => setNext2(e.target.value)} autoComplete="new-password" minLength={8} required className={inputCls} />
          </Field>
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={busy || !cur || next.length < 8}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null} 변경
          </Button>
        </div>
      </form>
    </div>
  );
}

/* ---------- 페이지 ---------- */
export default function AdminPage() {
  const [auth, setAuth] = useState<"checking" | "out" | "in">("checking");
  const [tab, setTab] = useState<Tab>("notices");

  useEffect(() => {
    api
      .me()
      .then(() => setAuth("in"))
      .catch(() => setAuth("out"));
  }, []);

  const [logoutError, setLogoutError] = useState<string | null>(null);
  // 서버가 쿠키를 지운 뒤에만 로그아웃 화면으로 — 네트워크 실패 시 세션이 남은 채 로그인 화면만 보이는 착시를 막는다
  const logout = async () => {
    setLogoutError(null);
    try {
      await api.logout();
      setAuth("out");
    } catch (e) {
      setLogoutError(`로그아웃 실패: ${errMsg(e)} — 다시 시도하세요`);
    }
  };

  if (auth === "checking") {
    return (
      <main className="flex min-h-[100svh] items-center justify-center text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
      </main>
    );
  }
  if (auth === "out") return <LoginCard onSuccess={() => setAuth("in")} />;

  return (
    <main className="min-h-[100svh] bg-background">
      <header className="sticky top-0 z-[var(--z-sticky)] border-b border-border bg-background/85 backdrop-blur-md">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground hover:bg-accent" aria-label="홈으로">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div>
              <p className="font-serif text-lg font-semibold leading-none">숲속의바다</p>
              <p className="eyebrow mt-1 text-[10px] text-muted-foreground">ADMIN</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button variant="secondary" onClick={() => void logout()} className="h-10" aria-label="로그아웃">
              <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">로그아웃</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="container-x py-8 lg:py-12">
        {logoutError && (
          <div className="mb-6">
            <InlineNotice tone="error">{logoutError}</InlineNotice>
          </div>
        )}
        <div className="flex gap-1 rounded-full border border-border bg-card p-1 sm:max-w-md" role="tablist" aria-label="관리 메뉴">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              role="tab"
              id={`admin-tab-${t.key}`}
              aria-selected={tab === t.key}
              aria-controls={`admin-panel-${t.key}`}
              tabIndex={tab === t.key ? 0 : -1}
              onClick={() => setTab(t.key)}
              className={cn(
                "inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full text-sm font-semibold transition-colors",
                tab === t.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <t.icon className="h-4 w-4" /> {t.label}
            </button>
          ))}
        </div>

        {/* exit 애니메이션을 기다리는 mode="wait" 는 쓰지 않는다 — rAF 가 멈춘 상태(백그라운드 탭)에서 패널 교체가 영영 안 끝난다 */}
        <motion.div
          key={tab}
          role="tabpanel"
          id={`admin-panel-${tab}`}
          aria-labelledby={`admin-tab-${tab}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-8 max-w-3xl"
        >
          {tab === "notices" && <NoticesTab />}
          {tab === "events" && <EventsTab />}
          {tab === "settings" && <SettingsTab />}
        </motion.div>
      </div>
    </main>
  );
}
