import { create } from "zustand";
import { persist } from "zustand/middleware";
import { notices as siteNotices, events as siteEvents } from "@/data/pension";

export interface NoticeItem {
  id: string;
  title: string;
  content: string;
  date: string;
  important: boolean;
  active: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  period: string;
  description: string;
  highlight?: string;
  conditions: string[];
  badge?: string;
  color: string;
  active: boolean;
}

export interface RoomPrice {
  roomId: string;
  weekday: number;
  friday: number;
  weekend: number;
  peak: number;
}

interface AdminState {
  // 인증
  isAuthenticated: boolean;
  adminPassword: string;

  // 공지사항
  notices: NoticeItem[];

  // 이벤트
  events: EventItem[];

  // 객실 가격
  roomPrices: RoomPrice[];

  // 팝업 설정
  popupEnabled: boolean;

  // Actions
  login: (password: string) => boolean;
  logout: () => void;
  setAdminPassword: (password: string) => void;

  // Notice actions
  addNotice: (notice: Omit<NoticeItem, "id">) => void;
  updateNotice: (id: string, notice: Partial<NoticeItem>) => void;
  deleteNotice: (id: string) => void;

  // Event actions
  addEvent: (event: Omit<EventItem, "id">) => void;
  updateEvent: (id: string, event: Partial<EventItem>) => void;
  deleteEvent: (id: string) => void;

  // Popup actions
  setPopupEnabled: (enabled: boolean) => void;

  // Room price actions
  updateRoomPrice: (roomId: string, prices: Partial<RoomPrice>) => void;
}

const defaultNotices: NoticeItem[] = siteNotices;
const defaultEvents: EventItem[] = siteEvents;

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      adminPassword: "",
      notices: defaultNotices,
      events: defaultEvents,
      roomPrices: [],
      popupEnabled: true,

      login: (password: string) => {
        const storedPassword = get().adminPassword;
        const envPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "woodinsea2024";
        const isValid = password === (storedPassword || envPassword);
        if (isValid) {
          set({ isAuthenticated: true });
        }
        return isValid;
      },

      logout: () => {
        set({ isAuthenticated: false });
      },

      setAdminPassword: (password: string) => {
        set({ adminPassword: password });
      },

      addNotice: (notice) => {
        const newNotice: NoticeItem = {
          ...notice,
          id: Date.now().toString(),
        };
        set((state) => ({
          notices: [newNotice, ...state.notices],
        }));
      },

      updateNotice: (id, notice) => {
        set((state) => ({
          notices: state.notices.map((n) =>
            n.id === id ? { ...n, ...notice } : n
          ),
        }));
      },

      deleteNotice: (id) => {
        set((state) => ({
          notices: state.notices.filter((n) => n.id !== id),
        }));
      },

      addEvent: (event) => {
        const newEvent: EventItem = {
          ...event,
          id: Date.now().toString(),
        };
        set((state) => ({
          events: [newEvent, ...state.events],
        }));
      },

      updateEvent: (id, event) => {
        set((state) => ({
          events: state.events.map((e) =>
            e.id === id ? { ...e, ...event } : e
          ),
        }));
      },

      deleteEvent: (id) => {
        set((state) => ({
          events: state.events.filter((e) => e.id !== id),
        }));
      },

      setPopupEnabled: (enabled) => {
        set({ popupEnabled: enabled });
      },

      updateRoomPrice: (roomId, prices) => {
        set((state) => {
          const existing = state.roomPrices.find((r) => r.roomId === roomId);
          if (existing) {
            return {
              roomPrices: state.roomPrices.map((r) =>
                r.roomId === roomId ? { ...r, ...prices } : r
              ),
            };
          }
          return {
            roomPrices: [
              ...state.roomPrices,
              { roomId, weekday: 0, friday: 0, weekend: 0, peak: 0, ...prices },
            ],
          };
        });
      },
    }),
    {
      name: "woodinsea-admin-storage",
      version: 2,
      // v1 = 원본 사이트 이관 전 placeholder 공지/이벤트 → 실제 데이터로 리셋
      migrate: (persisted, version) => {
        const state = (persisted ?? {}) as Partial<AdminState>;
        if (version < 2) {
          return { ...state, notices: defaultNotices, events: defaultEvents } as AdminState;
        }
        return state as AdminState;
      },
    }
  )
);
