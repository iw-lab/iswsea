"use client";

import { useEffect } from "react";
import { useContentStore } from "@/stores/adminStore";

/** 마운트 시 한 번 D1(/api/content)에서 최신 공지·이벤트를 받아 스토어에 반영한다. UI 없음. */
export default function ContentSync() {
  const syncFromServer = useContentStore((s) => s.syncFromServer);
  useEffect(() => {
    void syncFromServer();
  }, [syncFromServer]);
  return null;
}
